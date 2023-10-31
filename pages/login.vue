<script setup lang="ts">
const { signIn } = useAuth();

const account = ref("");
const password = ref("");

const googleLogin = () => {
  signIn("google", { callbackUrl: "/private" });
};
</script>

<template>
  <div>
    帳號<input v-model="account" type="text" /> 密碼<input
      v-model="password"
      type="text"
    />
    <br />

    <button>密碼登入</button>
    <button @click="googleLogin">Google登入</button>
  </div>
</template>
