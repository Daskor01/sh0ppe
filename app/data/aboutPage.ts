export type AboutSection = {
  id: string
  title: string
  image: string
  imageAlt: string
  paragraphs: string[]
  bullets?: string[]
}

const lorem =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.'

export const aboutPageIntro = {
  title: 'About',
  subtitle: 'Who we are and why we do what we do!',
  lead: lorem,
}

export const aboutPageSections: AboutSection[] = [
  {
    id: 'top-trends',
    title: 'Top trends',
    image: '/images/product-necklace.webp',
    imageAlt: 'Hands holding a delicate pearl necklace',
    paragraphs: [
      lorem,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa.',
    ],
    bullets: [
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      'Aenean commodo ligula eget dolor aenean massa.',
    ],
  },
  {
    id: 'produced-with-care',
    title: 'Produced with care',
    image: '/images/hero-gold-hoops.webp',
    imageAlt: 'Gold jewelry styled with care and attention to detail',
    paragraphs: [lorem],
  },
]
