<template>
  <div class="account-dashboard">
    <p class="account-dashboard__intro">
      From your account dashboard you can view your
      <NuxtLink to="/account/orders">recent orders</NuxtLink>, view your
      <NuxtLink to="/account/wishlist">wishlist</NuxtLink>, manage your
      <NuxtLink to="/account/addresses">shipping and billing addresses</NuxtLink>, and edit your
      <NuxtLink to="/account/details">password and account details</NuxtLink>.
    </p>
  </div>
</template>

<style scoped lang="scss">
  .account-dashboard {
    max-width: 720px;

    &__intro {
      margin: 0;
      font-size: 15px;
      line-height: 1.7;
      color: var(--color-text-muted);

      a {
        color: var(--color-accent);
        text-decoration: none;

        &:hover {
          text-decoration: underline;
        }

        &:focus-visible {
          @include mixins.focus-ring;
        }
      }
    }
  }
</style>
