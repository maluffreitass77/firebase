<template>
  <ion-page>
    <ion-content class="auth-content">
      <div class="auth-card">
        <div class="brand-mark">V</div><p class="eyebrow">NOVO POR AQUI?</p><h1>Criar conta</h1>
        <p class="subtitle">Comece seu perfil em poucos passos.</p>
        <ion-list lines="none">
          <ion-item><ion-input v-model="email" label="E-mail" label-placement="stacked" type="email" /></ion-item>
          <ion-item><ion-input v-model="password" label="Senha" label-placement="stacked" type="password" /></ion-item>
          <ion-item><ion-input v-model="confirmation" label="Confirme a senha" label-placement="stacked" type="password" /></ion-item>
        </ion-list>
        <ion-text v-if="error" color="danger"><p class="message">{{ error }}</p></ion-text>
        <ion-button expand="block" :disabled="loading" @click="submit"><ion-spinner v-if="loading" name="crescent" /><span v-else>Criar conta</span></ion-button>
        <p class="switch">Já possui uma conta? <a @click="router.push('/login')">Entrar</a></p>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { IonButton, IonContent, IonInput, IonItem, IonList, IonPage, IonSpinner, IonText } from '@ionic/vue';
import { register } from '../services/auth';
const router = useRouter(); const email = ref(''); const password = ref(''); const confirmation = ref(''); const error = ref(''); const loading = ref(false);
async function submit() {
  error.value = '';
  if (!email.value || password.value.length < 6 || password.value !== confirmation.value) { error.value = 'Confira o e-mail e as senhas (mínimo de 6 caracteres).'; return; }
  loading.value = true;
  try { await register(email.value, password.value); await router.replace('/profile'); } catch { error.value = 'Não foi possível criar a conta. Talvez o e-mail já esteja em uso.'; } finally { loading.value = false; }
}
</script>
