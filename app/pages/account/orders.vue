<template>
  <AccountShell>
    <div class="account-section">
      <AccountEmptyBanner v-if="showEmptyState" message="No order has been made yet." />
      <AccountOrdersTable v-else :rows="ACCOUNT_MOCK_ORDER_ROWS" />
    </div>
  </AccountShell>
</template>

<script setup lang="ts">
import { ACCOUNT_MOCK_ORDER_ROWS } from '~/data/accountMock'

definePageMeta({
  middleware: 'account-protected',
})

/** Переключите на `true`, чтобы показать пустое состояние из макета. */
const showEmptyState = false

useSeoMeta({
  title: 'Orders — My account — SHOPPE',
})
</script>

<style scoped lang="scss">
.account-section {
  width: 100%;
}
</style>
