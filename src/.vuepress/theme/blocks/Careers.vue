<template>
  <FiftyFifty
    :background="{
      type: 'image',
      src: '/images/hexFooter.png',
      position: 'bg-left-bottom',
    }"
    :blocks="[
      {
        component: 'TextBlock',
        classList:
          'col-start-2 lg:col-start-2 col-span-10 lg:col-span-4 mb-24 m:mb-0',
        eyebrow: 'Get Involved',
        text:
          'Protocol Labs is a fully distributed, open-source organization. Our mission is to drive breakthroughs in computing to push humanity forward.',
        cta: {
          icon: 'arrow-right-icon',
          item: {
            text: 'Join Us',
            link: '/join/',
          },
        },
      },
      {
        component: 'FullWidthImage',
        classList: 'lg:col-start-7 col-span-12 lg:col-span-6',
        alt: 'Careers at Protocol Labs',
        inset: false,
        src: '/images/block-careers.jpg',
        srcset: {
          '1x': '/images/block-careers.jpg',
          '2x': '/images/block-careers@2x.jpg',
        },
      },
    ]"
  />
</template>

<script>
import FiftyFifty from '@theme/components/FiftyFifty'

export default {
  name: 'CareersBlock',
  components: { FiftyFifty },
}
</script>
