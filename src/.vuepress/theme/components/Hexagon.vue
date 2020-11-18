<template>
  <div
    v-transition
    class="hexagon group relative w-full lg:overflow-hidden max-w-full text-deepBlue lg:text-white inline-block"
    :class="classList"
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
      </div>
      <div
        v-if="logoWhite || logoColor || title"
        class="hexagon__logos lg:absolute flex top-0 lg:flex-col justify-start lg:justify-end items-center lg:h-full lg:w-full lg:py-16 lg:px-8"
      >
        <LazyImage
          v-if="logoWhite"
          v-bind="logoWhite"
          class="hexagon__logo-white w-10 mb-2 hidden lg:block"
        />
        <LazyImage
          v-if="logoColor"
          v-bind="logoColor"
          class="hexagon__logo-color w-10 mb-2 mr-2 lg:hidden"
        />
        <p
          v-if="title"
          :class="[
            'hexagon__title font-sans text-22 lg:text-18 lg:w-full text-center lg:px-10',
            { 'pt-3 md:pt-0': !logoColor },
            titleClassList,
          ]"
        >
          {{ title }}
        </p>
      </div>
      <div
        v-if="ctas"
        :class="[
          'hexagon__overlay lg:absolute inset-0 lg:flex flex-col justify-center lg:h-full w-full lg:bg-webBlue duration-200 ease-out lg:py-24 lg:px-6 lg:opacity-0 group-hover:opacity-100',
        ]"
      >
        <p v-if="description" class="hexagon__description type-p3 mt-5 lg:mt-0">
          {{ description }}
        </p>
        <div v-if="ctas" class="mt-6 flex">
          <div v-for="(item, index) in ctas" :key="index">
            <CTA
              class="mr-8"
              v-bind="item"
              link-color="hexagon__cta text-inherit hover:text-webBlue lg:hover:text-white lg:text-white border-b border-transparent lg:hover:border-white"
              type="link"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import LazyImage from '@theme/components/base/LazyImage.vue'
import CTA from '@theme/components/CTA.vue'

export default {
  name: 'Hexagon',
  components: { LazyImage, CTA },
  props: {
    backgroundImage: {
      type: Object,
      required: true,
    },
    ctas: {
      type: Array,
      default: null,
    },
    description: {
      type: String,
      default: null,
      validator: function (description) {
        return description.length < 200
      },
    },
    logoColor: {
      type: Object,
      default: null,
    },
    logoWhite: {
      type: Object,
      default: null,
    },
    title: {
      type: String,
      default: null,
    },
    classList: {
      type: String,
      default: null,
    },
    titleClassList: {
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
.hexagon__bg {
  padding-top: 110.851%;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  @apply w-full relative h-0;
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
  /* TODO: this fixes #320 but should be refactored in the future */
  /* see: https://github.com/protocol/protocol.ai/issues/320 */
  .hexagon__logos {
    padding-bottom: 19%;
  }
}

/* TODO: this fixes #429 but should be refactored in the future */
@media (min-width: 1280px) and (max-width: 1350px) {
  .hexagon__description {
    @apply text-14;
  }
}

@media screen and (hover: none) {
  .hexagon__inner {
    clip-path: none;
    @apply pt-0 text-deepBlue overflow-visible;
  }
  .hexagon__bg {
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    @apply mb-5 max-w-full h-0;
  }
  .hexagon__overlay {
    @apply bg-transparent static opacity-100 p-0 h-auto;
  }
  .hexagon__logo-color {
    @apply block;
  }
  .hexagon__logo-white {
    @apply hidden;
  }
  .hexagon__logos {
    @apply static p-0 flex-row items-center justify-start h-auto;
  }
  .hexagon__title {
    @apply inline-block w-auto pl-0;
  }
  .hexagon__cta:hover {
    @apply text-deepBlue;
  }
  .hexagon__cta {
    @apply text-deepBlue;
  }
}
@media screen and (hover: none) and (min-width: 768px) {
  .hexagon__bg {
    padding-top: 110.851%;
    @apply w-full relative;
  }
  .hexagon-inner {
    @apply pt-0;
  }
  .hexagon__title {
    @apply pb-5;
  }
}
</style>
