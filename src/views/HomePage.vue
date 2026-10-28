<template>
  <ion-page>
    <ion-header><ion-toolbar><ion-title>Violeta</ion-title><ion-buttons slot="end"><ion-button @click="editProfile">Perfil</ion-button><ion-button @click="exit">Sair</ion-button></ion-buttons></ion-toolbar></ion-header>
    <ion-content class="page-content"><div class="welcome">
      <div class="avatar large"><img v-if="profile?.photoUrl" :src="profile.photoUrl" alt="Foto de perfil" /><span v-else>{{ initial }}</span></div>
      <p class="eyebrow">SEU ESPAÇO</p><h1>Olá, {{ profile?.nickname || 'visitante' }}!</h1>
      <p class="subtitle">Que bom ter você aqui. Mantenha seu perfil sempre atualizado.</p>
      <ion-button expand="block" @click="editProfile">Editar meu perfil</ion-button>
    </div></ion-content>
  </ion-page>
</template>
<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'; import { useRouter } from 'vue-router'; import { IonButton, IonButtons, IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/vue'; import { logout } from '../services/auth'; import { auth } from '../services/firebase'; import { getProfile, type Profile } from '../services/profile';
const router = useRouter(); const profile = ref<Profile | null>(null); const initial = computed(() => profile.value?.nickname?.charAt(0).toUpperCase() || 'V');
onMounted(async () => { if (auth.currentUser) profile.value = await getProfile(auth.currentUser.uid); });
function editProfile() { router.push('/profile'); } async function exit() { await logout(); await router.replace('/login'); }
</script>
