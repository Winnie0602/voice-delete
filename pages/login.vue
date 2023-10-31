<script setup lang="ts">
const { signIn } = useAuth();

const login = ref("winniechang@mirrormedia.mg");
const password = ref("Winnie6622");

const googleLogin = () => {
  signIn("google", { callbackUrl: "/private" });
};

const passwordLogin = async (e: Event) => {
  e.preventDefault();
  const { error, url }: any = await signIn("credentials", {
    login: login.value,
    password: password.value,
    redirect: false,
    callbackUrl: "/private",
  });
};

const loginAPI = async () => {
  const b = await $fetch("/api/login");
  console.log(b);
};
</script>

<template>
  <div>
    <form action="" @submit="passwordLogin">
      帳號<input v-model="login" type="text" /> 密碼<input
        v-model="password"
        type="text"
      />
      <button>密碼登入</button>
    </form>
    <br />

    <button @click="googleLogin">Google登入</button>
    <button @click="loginAPI">123</button>
  </div>
</template>
