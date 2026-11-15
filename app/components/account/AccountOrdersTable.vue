<template>
  <div class="account-table-wrap">
    <table class="account-table">
      <thead>
        <tr>
          <th scope="col">Order number</th>
          <th scope="col">Date</th>
          <th scope="col">Status</th>
          <th scope="col">Total</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in tableRows" :key="row.orderNumber">
          <td data-label="Order number">{{ row.orderNumber }}</td>
          <td data-label="Date">{{ row.dateLabel }}</td>
          <td data-label="Status">{{ row.status }}</td>
          <td data-label="Total">{{ formatPrice(row.total) }}</td>
          <td data-label="Actions">
            <NuxtLink :to="row.orderTo" class="account-table__action"> View Order </NuxtLink>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  import type { AccountOrderRow } from '~/data/accountMock'
  import { orderPath } from '~/utils/routes'

  const props = defineProps<{
    rows: AccountOrderRow[]
  }>()

  const { formatPrice } = useFormatPrice()

  type AccountOrderTableRow = AccountOrderRow & { orderTo: string }

  const tableRows = computed<AccountOrderTableRow[]>(() =>
    props.rows.map((row) => ({
      ...row,
      orderTo: orderPath(row.orderNumber),
    })),
  )
</script>
