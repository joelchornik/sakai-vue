<script setup>
import FloatingConfigurator from '@/components/FloatingConfigurator.vue';
import api from '@/service/cprapi';
import { useMutation } from '@tanstack/vue-query';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const checked = ref(false);
const username = ref('');
const password = ref('');

const login = useMutation({
    mutationFn: () =>
        api.post('/login', {
            username: username.value,
            password: password.value
        }),
    onSuccess: (res) => {
        localStorage.setItem('accessToken', res.data.accessToken);
        localStorage.setItem('refreshToken', res.data.refreshToken);
        router.push('/');
    }
});

const handleLogin = () => login.mutate();
</script>

<template>
    <FloatingConfigurator />
    <div class="bg-surface-50 dark:bg-surface-950 flex items-center justify-center min-h-screen min-w-[100vw] overflow-hidden">
        <div class="flex flex-col items-center justify-center">
            <div style="border-radius: 56px; padding: 0.3rem; background: linear-gradient(180deg, var(--primary-color) 10%, rgba(33, 150, 243, 0) 30%)">
                <div class="w-full bg-surface-0 dark:bg-surface-900 py-20 px-8 sm:px-20" style="border-radius: 53px">
                    <div class="text-center mb-8">
                        <!--<img src="@/assets/images/logo.png" alt="Logo" class="w-32 h-32 mx-auto mb-4" />-->
                        <div class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4">CPR :: TEXCOM</div>
                        <span class="text-muted-color font-medium">Ingresa tus datos para continuar</span>
                    </div>

                    <div>
                        <label for="email1" class="block text-surface-900 dark:text-surface-0 text-xl font-medium mb-2">Usuario</label>
                        <InputText id="email1" type="text" placeholder="Tu usuario de acceso CPR" class="w-full md:w-[30rem] mb-8" v-model="username" />

                        <label for="password1" class="block text-surface-900 dark:text-surface-0 font-medium text-xl mb-2">Contraseña</label>
                        <Password id="password1" v-model="password" placeholder="" :toggleMask="true" class="mb-4" fluid :feedback="false"></Password>

                        <div class="flex items-center justify-between mt-2 mb-8 gap-8">
                            <div class="flex items-center">
                                <Checkbox v-model="checked" id="rememberme1" binary class="mr-2"></Checkbox>
                                <label for="rememberme1">Recordarme</label>
                            </div>
                            <span class="font-medium no-underline ml-2 text-right cursor-pointer text-primary">¿Olvidaste tu Clave?</span>
                        </div>
                        <Button label="Login" :loading="login.isPending.value" @click="handleLogin" />
                        <p v-if="login.isError.value" style="color: red">
                            Error de Login
                            <br />
                            {{ login.error.value }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.pi-eye {
    transform: scale(1.6);
    margin-right: 1rem;
}

.pi-eye-slash {
    transform: scale(1.6);
    margin-right: 1rem;
}
</style>
