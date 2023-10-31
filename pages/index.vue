<script setup lang="ts">
const { status, data, getCsrfToken, getProviders, getSession } = useAuth();

const session = await getSession();
const providers = await getProviders();
const csrfToken = await getCsrfToken();
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
  </div>
</template>
