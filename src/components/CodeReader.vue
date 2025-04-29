<script setup>
import PiezaView from '@/components/Pieza/PiezaView.vue';
import { reactive, ref } from 'vue';
import { QrcodeStream } from 'vue-qrcode-reader';

const facingMode = ref('environment');
const torchEnabled = ref(false);
const detectedBarcodes = reactive([]);
const lastDetectedBarcode = ref(null);

const switchCamera = () => {
    facingMode.value = facingMode.value === 'environment' ? 'user' : 'environment';
};

const toggleTorch = () => {
    torchEnabled.value = !torchEnabled.value;
};

const onDetect = (barcodes) => {
    detectedBarcodes.splice(0, detectedBarcodes.length, ...barcodes);
    lastDetectedBarcode.value = barcodes[0];
};

/*** track functons ***/

function paintOutline(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = 'red';

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
            ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
    }
}
function paintBoundingBox(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const {
            boundingBox: { x, y, width, height }
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = '#007bff';
        ctx.strokeRect(x, y, width, height);
    }
}
function paintCenterText(detectedCodes, ctx) {
    for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode;

        const centerX = boundingBox.x + boundingBox.width / 2;
        const centerY = boundingBox.y + boundingBox.height / 2;

        const fontSize = Math.max(12, (50 * boundingBox.width) / ctx.canvas.width);

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = 'center';

        ctx.lineWidth = 3;
        ctx.strokeStyle = '#35495e';
        ctx.strokeText(detectedCode.rawValue, centerX, centerY);

        ctx.fillStyle = '#5cb984';
        ctx.fillText(rawValue, centerX, centerY);
    }
}
const trackFunctionOptions = [
    { text: 'nothing (default)', value: undefined },
    { text: 'outline', value: paintOutline },
    { text: 'centered text', value: paintCenterText },
    { text: 'bounding box', value: paintBoundingBox }
];
const trackFunctionSelected = ref(trackFunctionOptions[2]);
</script>

<template>
    <div class="flex w-full flex-col items-center justify-center">
        <div class="w-1/2 flex justify-center items-center">
            <qrcode-stream :formats="['qr_code', 'itf']" :constraints="{ facingMode, torch: torchEnabled }" :track="trackFunctionSelected.value" @detect="onDetect">
                <template #overlay>
                    <div v-for="barcode in detectedBarcodes" :key="barcode.rawValue" class="barcode-box" :style="getBarcodeStyle(barcode)">
                        <span>{{ barcode.rawValue }}</span>
                    </div>
                </template>
            </qrcode-stream>
        </div>
        <div class="flex w-full justify-center items-center">
            <Button class="m-2" @click="switchCamera">Rotar Camara</Button>
            <Button class="m-2" @click="toggleTorch">Linterna</Button>
        </div>
        <div class="flex w-full">
            <PiezaView :cdgNumeroPieza="lastDetectedBarcode.rawValue" v-if="lastDetectedBarcode?.rawValue" />
        </div>
    </div>
</template>

<style scoped>
.barcode-box {
    position: absolute;
    border: 2px solid red;
    pointer-events: none;
    transform: translate(-50%, -50%);
}
</style>
