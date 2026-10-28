<template>
  <ion-page><ion-header><ion-toolbar><ion-buttons slot="start"><ion-back-button default-href="/home" /></ion-buttons><ion-title>Meu perfil</ion-title></ion-toolbar></ion-header>
  <ion-content class="page-content"><div class="profile-form">
    <div class="avatar"><img v-if="form.photoUrl" :src="form.photoUrl" alt="Foto de perfil" /><span v-else>{{ form.nickname.charAt(0).toUpperCase() || 'V' }}</span></div>
    <ion-button fill="clear" @click="fileInput?.click()">Escolher foto</ion-button><input ref="fileInput" class="hidden-input" type="file" accept="image/*" @change="changePhoto" />
    <ion-list lines="none"><ion-item><ion-input v-model="form.fullName" label="Nome completo" label-placement="stacked" /></ion-item><ion-item><ion-input v-model="form.birthDate" label="Data de nascimento" label-placement="stacked" type="date" /></ion-item><ion-item><ion-input v-model="form.nickname" label="Nickname" label-placement="stacked" /></ion-item></ion-list>
    <ion-text v-if="message" :color="success ? 'success' : 'danger'"><p class="message">{{ message }}</p></ion-text>
    <ion-button expand="block" :disabled="loading" @click="save"><ion-spinner v-if="loading" name="crescent" /><span v-else>Salvar perfil</span></ion-button>
  </div></ion-content></ion-page>
</template>
<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'; import { useRouter } from 'vue-router'; import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonInput, IonItem, IonList, IonPage, IonSpinner, IonText, IonTitle, IonToolbar } from '@ionic/vue'; import { auth } from '../services/firebase'; import { getProfile, readImageAsBase64, saveProfile, type Profile } from '../services/profile';
const router = useRouter(); const fileInput = ref<HTMLInputElement>(); const loading = ref(false); const message = ref(''); const success = ref(false); const form = reactive<Profile>({ fullName: '', birthDate: '', nickname: '', photoUrl: '' });
onMounted(async () => { if (auth.currentUser) { const saved = await getProfile(auth.currentUser.uid); if (saved) Object.assign(form, saved); } });
async function changePhoto(event: Event) { const file = (event.target as HTMLInputElement).files?.[0]; if (!file || !auth.currentUser) return; loading.value = true; try { form.photoUrl = await readImageAsBase64(file); message.value = 'Foto carregada. Salve o perfil para confirmar.'; success.value = true; } catch (error) { message.value = error instanceof Error ? error.message : 'Não foi possível ler a foto.'; success.value = false; } finally { loading.value = false; } }
async function save() { message.value = ''; if (!form.fullName.trim() || !form.nickname.trim() || !auth.currentUser) { message.value = 'Preencha nome completo e nickname.'; success.value = false; return; } loading.value = true; try { await saveProfile(auth.currentUser.uid, form); message.value = 'Perfil salvo com sucesso!'; success.value = true; setTimeout(() => router.replace('/home'), 700); } catch { message.value = 'Não foi possível salvar o perfil.'; success.value = false; } finally { loading.value = false; } }
</script>
