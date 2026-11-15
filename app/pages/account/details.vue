<template>
  <AccountShell>
    <AccountDetailsForm />
  </AccountShell>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: 'account-protected',
})

useSeoMeta({
  title: 'Account details — SHOPPE',
})
</script>
