<script setup lang="ts">
const { status, signOut } = useAuth();

const signOutHandler = async () => {
  await signOut();
};
</script>

<template>
  <ul>
    <!-- <li v-if="status !== 'authenticated'">
      <NuxtLink to="/login">login</NuxtLink>
    </li> -->
    <button v-if="status === 'authenticated'" @click="signOutHandler">
      logout
    </button>
    <li><NuxtLink to="/">index</NuxtLink></li>
    <li><NuxtLink to="/private">private</NuxtLink></li>
  </ul>
</template>
