<template>
  <component
    :is="link ? 'UnstyledLink' : 'div'"
    :to="link"
    target="_blank"
    rel="noopener noreferrer"
    :class="[
      'hexagon',
      'group relative w-full lg:overflow-hidden max-w-full text-deepBlue lg:text-white inline-block',
      classList,
      link && 'transform hover:scale-105 duration-500 ease-in-out',
    ]"
  >
    <div class="hexagon__inner">
      <div v-if="backgroundImage" class="hexagon__bg">
        <LazyImage
          v-bind="backgroundImage"
          class="hexagon_image h-full flex justify-center mx-auto mb-5 lg:mb-0"
          :img-class="[
            'absolute h-full w-full object-cover inset-0',
            backgroundImage.imgClass,
          ]"
        />
        <SVGIcon
          v-if="link"
          :class="[
            'hexagon__link-icon',
            'absolute w-5 opacity-0 duration-500 ease-in-out',
          ]"
          name="arrow-up-icon"
          title=""
        />
      </div>
    </div>
  </component>
</template>

<script>
import LazyImage from '@theme/components/base/LazyImage.vue'
import UnstyledLink from '@theme/components/UnstyledLink.vue'
import SVGIcon from '@theme/components/base/SVGIcon.vue'

export default {
  name: 'HexagonSimple',
  components: { LazyImage, UnstyledLink, SVGIcon },
  props: {
    backgroundImage: {
      type: Object,
      required: true,
    },
    link: {
      type: String,
      default: null,
    },
    classList: {
      type: String,
      default: null,
    },
  },
}
</script>

<style>
/* patch to fix rendering issue in firefox where clip-paths fail clear correctly on router transitions */
/* see: https://github.com/protocol/protocol.ai/issues/288 */
@supports (-moz-appearance: none) {
  .fade-leave-active .hexagon__bg,
  .fade-enter-active .hexagon__inner {
    visibility: hidden;
  }
}
</style>

<style lang="postcss" scoped>
.hexagon {
  &:hover .hexagon__link-icon {
    opacity: 100;
  }
}

.hexagon__bg {
  padding-top: 110.851%;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  @apply w-full relative h-0;
}

.hexagon__link-icon {
  right: 50%;
  bottom: 1rem;
  transform: translateX(50%);
  color: black;
}

@screen lg {
  .hexagon__bg {
    clip-path: none;
    @apply h-full static pt-0;
  }
  .hexagon__inner {
    padding-top: 110.851%;
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  }
}
</style>
