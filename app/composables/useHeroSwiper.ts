import { Autoplay, Pagination } from 'swiper/modules'
export const HERO_SWIPER_MODULES = [Autoplay, Pagination]

export const HERO_AUTOPLAY_DELAY_MS = 6000

export function useHeroSwiperOptions() {
  return {
    modules: HERO_SWIPER_MODULES,
    loop: true,
    speed: 450,
    autoplay: {
      delay: HERO_AUTOPLAY_DELAY_MS,
      disableOnInteraction: false,
      pauseOnMouseEnter: true,
    },
    pagination: {
      clickable: true,
      bulletClass: 'hero__dot',
      bulletActiveClass: 'hero__dot--active',
    },
  }
}
