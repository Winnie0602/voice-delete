<script setup lang="ts">
const { signIn } = useAuth();

// 預設帳密
const login = ref("winniechang@mirrormedia.mg");
const password = ref("Winnie6622");

// 谷歌登入
const googleLogin = async () => {
  const google = await signIn("google", { callbackUrl: "/private" });
  console.log(google);
};

// 一般帳密登入
const passwordLogin = async (e: Event) => {
  e.preventDefault();

  // 資料輸入錯誤顯示錯誤訊息，資料正確則跳轉至private頁
  const { error, url }: any = await signIn("credentials", {
    login: login.value,
    password: password.value,
    redirect: false,
    callbackUrl: "/private",
  });

  if (error) {
    console.log("wrong ID or password");
  } else {
    return navigateTo(url, { external: true });
  }
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
  </div>
</template>
