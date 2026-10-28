<template>
  <ion-page><ion-content class="auth-content"><div class="auth-card">
    <div class="brand-mark">V</div><p class="eyebrow">RECUPERAÇÃO</p><h1>Redefinir senha</h1>
    <p class="subtitle">Enviaremos um link para o seu e-mail.</p>
    <ion-item lines="none"><ion-input v-model="email" label="E-mail" label-placement="stacked" type="email" /></ion-item>
    <ion-text v-if="message" :color="success ? 'success' : 'danger'"><p class="message">{{ message }}</p></ion-text>
    <ion-button expand="block" :disabled="loading" @click="submit"><ion-spinner v-if="loading" name="crescent" /><span v-else>Enviar link</span></ion-button>
    <ion-button fill="clear" @click="router.push('/login')">Voltar para o login</ion-button>
  </div></ion-content></ion-page>
</template>
<script setup lang="ts">
import { ref } from 'vue'; import { useRouter } from 'vue-router'; import { IonButton, IonContent, IonInput, IonItem, IonPage, IonSpinner, IonText } from '@ionic/vue'; import { resetPassword } from '../services/auth';
const router = useRouter(); const email = ref(''); const message = ref(''); const success = ref(false); const loading = ref(false);
async function submit() { if (!email.value) { message.value = 'Informe seu e-mail.'; success.value = false; return; } loading.value = true; try { await resetPassword(email.value); message.value = 'Link enviado! Verifique sua caixa de entrada.'; success.value = true; } catch { message.value = 'Não foi possível enviar o e-mail.'; success.value = false; } finally { loading.value = false; } }
</script>
