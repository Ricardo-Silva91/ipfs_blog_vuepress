<template>
  <LazyImage
    v-transition
    :class="[{ 'grid-margins': inset }, { image__full: !inset }]"
    v-bind="$props"
    :img-class="['md:w-full']"
  />
</template>

<script>
import LazyImage from '@theme/components/base/LazyImage'
export default {
  name: 'FullWidthImage',
  components: { LazyImage },
  props: {
    alt: {
      type: String,
      required: true,
    },
    inset: {
      type: Boolean,
      default: false,
    },
    caption: {
      type: String,
      default: null,
    },
    src: {
      type: String,
      required: true,
    },
    srcset: {
      type: Object,
      default: null,
    },
    sizes: {
      type: String,
      default: null,
    },
  },
}
</script>
<style lang="postcss">
.image__full img {
  height: 360px;
  @apply max-w-none;
}
.image__full {
  @apply w-auto flex justify-center overflow-hidden;
}
@screen md {
  .image__full img {
    @apply min-h-0 h-auto;
  }
  .image__full {
    @apply w-full block;
  }
}
</style>
