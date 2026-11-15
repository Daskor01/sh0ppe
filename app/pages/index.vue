<template>
  <div class="home-page">
    <HomeHeroSlider />
    <HomeShopLatestSection />
  </div>
</template>

<script setup lang="ts">
  import HomeHeroSlider from '~/components/home/HeroSlider.vue'
  import HomeShopLatestSection from '~/components/home/ShopLatestSection.vue'

  useSeoMeta({
    title: 'SHOPPE — Shop The Latest',
    description: 'Discover gold jewelry and accessories at SHOPPE.',
  })
</script>
