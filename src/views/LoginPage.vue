<template>
  <ion-page>
    <ion-content class="auth-content">
      <div class="auth-card">
        <div class="brand-mark">V</div>
        <p class="eyebrow">SEJA BEM-VINDO</p>
        <h1>Violeta</h1>
        <p class="subtitle">Entre para continuar sua jornada.</p>
        <ion-list lines="none">
          <ion-item>
            <ion-input v-model="email" label="E-mail" label-placement="stacked" type="email" />
          </ion-item>
          <ion-item>
            <ion-input v-model="password" label="Senha" label-placement="stacked" type="password" />
          </ion-item>
        </ion-list>
        <ion-text v-if="error" color="danger"><p class="message">{{ error }}</p></ion-text>
        <ion-button expand="block" :disabled="loading" @click="submit">
          <ion-spinner v-if="loading" name="crescent" />
          <span v-else>Entrar</span>
        </ion-button>
        <ion-button fill="clear" size="small" @click="router.push('/forgot-password')">Esqueci minha senha</ion-button>
        <p class="switch">Ainda não tem conta? <a @click="router.push('/register')">Cadastre-se</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonSpinner, IonText } from '@ionic/vue';
import { login } from '../services/auth';

const router = useRouter();
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

async function submit() {
  error.value = '';
  if (!email.value || password.value.length < 6) {
    error.value = 'Informe um e-mail e uma senha com pelo menos 6 caracteres.';
    return;
  }
  loading.value = true;
  try {
    await login(email.value, password.value);
    await router.replace('/home');
  } catch {
    error.value = 'Não foi possível entrar. Verifique seus dados.';
  } finally {
    loading.value = false;
  }
}
</script>
