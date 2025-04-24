<script>
import { QrcodeStream } from 'vue-qrcode-reader';

export default {
    components: { QrcodeStream },

    data() {
        return {
            isValid: undefined,
            paused: false,
            result: null
        };
    },

    computed: {
        validationPending() {
            return this.isValid === undefined && this.paused;
        },

        validationSuccess() {
            return this.isValid === true;
        },

        validationFailure() {
            return this.isValid === false;
        }
    },

    methods: {
        switchCamera() {
            switch (this.facingMode) {
                case 'environment':
                    this.facingMode = 'user';
                    break;
                case 'user':
                    this.facingMode = 'environment';
                    break;
            }
        },

        resetValidationState() {
            this.isValid = undefined;
        },

        async onDetect([firstDetectedCode]) {
            this.result = firstDetectedCode.rawValue;
            this.paused = true;

            // pretend it's taking really long
            await this.timeout(1000);
            this.isValid = this.result.startsWith('http');

            // some more delay, so users have time to read the message
            await this.timeout(2000);
            this.paused = false;
        },

        timeout(ms) {
            return new Promise((resolve) => {
                window.setTimeout(resolve, ms);
            });
        },

        onError(error) {
            const triedFrontCamera = this.facingMode === 'user';
            const triedRearCamera = this.facingMode === 'environment';

            const cameraMissingError = error.name === 'OverconstrainedError';

            if (triedRearCamera && cameraMissingError) {
                this.noRearCamera = true;
            }

            if (triedFrontCamera && cameraMissingError) {
                this.noFrontCamera = true;
            }

            console.error(error);
        },

        withBase
    }
};
</script>

<template>
    <div>
        <p class="border-2">
            Ultimo resultado: <b>{{ result }}</b>
        </p>

        <!-- half width div-->
        <div class="w-1/4 h-1/4">
            <qrcode-stream :paused="paused" :formats="['qr_code', 'code_128']" @detect="onDetect" @error="onError" @camera-on="resetValidationState">
                <div v-if="validationSuccess" class="validation-success">URL</div>

                <div v-if="validationFailure" class="validation-failure">No es una URL</div>

                <div v-if="validationPending" class="validation-pending">Validación en Curso</div>

                <button @click="switchCamera">Alternar Cámara</button>
            </qrcode-stream>
        </div>

        <p class="error" v-if="noFrontCamera">You don't seem to have a front camera on your device</p>

        <p class="error" v-if="noRearCamera">You don't seem to have a rear camera on your device</p>
    </div>
</template>

<style scoped>
.validation-success,
.validation-failure,
.validation-pending {
    position: absolute;
    width: 100%;
    height: 100%;

    background-color: rgba(255, 255, 255, 0.8);
    padding: 10px;
    text-align: center;
    font-weight: bold;
    font-size: 1.4rem;
    color: black;

    display: flex;
    flex-flow: column nowrap;
    justify-content: center;
}
.validation-success {
    color: green;
}
.validation-failure {
    color: red;
}
</style>
