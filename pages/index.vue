<script setup lang="ts">
const { status, data, getCsrfToken, getProviders, getSession } = useAuth();

const session = await getSession();
const providers = await getProviders();
const csrfToken = await getCsrfToken();

const headers = useRequestHeaders(["cookie"]) as HeadersInit;
const { data: token } = await useFetch("/api/token", { headers });
</script>

<template>
  <div>
    this is index page status: {{ status }}
    <br />
    data: {{ data }}
    <br />
    session: {{ session }}
    <br />
    providers:
    {{ providers }}
    <br />
    csrfToken: {{ csrfToken }}
    <hr />
    <div>token:{{ token || "no token present, are you logged in?" }}</div>
  </div>
</template>
