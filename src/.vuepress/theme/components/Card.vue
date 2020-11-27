<template>
  <component :is="link ? 'router-link' : 'div'" :to="link" v-bind="props">
    <div
      class="card group rounded relative p-8 md:p-10 text-white flex flex-col justify-end z-10"
      :class="{
        offset: !!offset,
        [gradient]: !img,
        'overflow-hidden': transitionBackground,
      }"
    >
      <p v-if="category" class="type-p1 flex-grow">{{ category }}</p>
      <div class="card__content-wrapper">
        <p v-if="eyebrow" class="type-p3 text-gray-pale mb-3 md:mb-4">
          {{ eyebrow }}
        </p>
        <h3 v-if="heading" class="type-h3 mb-4 md:mb-10">
          {{ heading }}
        </h3>
        <p v-if="text" class="type-p1" :class="{ 'mb-5': cta }">
          <span v-html="text" />
          <SVGIcon
            v-if="link"
            class="link-icon inline-block w-4 h-4 sm:w-5 sm:h-5 group-hover:opacity-100"
            :name="isExternal(link) ? 'arrow-up-icon' : 'arrow-right-icon'"
            title="iconTitle"
          />
        </p>
        <CTA
          v-if="cta"
          link-color="text-white border-b border-transparent hover:border-white"
          v-bind="cta"
        />
      </div>
      <LazyImage
        v-if="img && img.src"
        :class="[
          'card__image absolute inset-0 -z-10 bg-gradient-4 rounded',
          {
            'transform transition-transform scale-100 duration-2000': transitionBackground,
          },
        ]"
        :alt="img.alt"
        :img-class="[position, 'h-full w-full object-cover rounded']"
        :src="img.src"
        :srcset="img.srcset"
      />
    </div>
  </component>
</template>

<script>
import CTA from '@theme/components/CTA.vue'
import { isExternal } from '@theme/util'
import LazyImage from '@theme/components/base/LazyImage'
import SVGIcon from '@theme/components/base/SVGIcon.vue'

export default {
  name: 'Card',
  components: {
    CTA,
    LazyImage,
    SVGIcon,
  },
  props: {
    link: {
      type: String,
      default: null,
      required: false,
    },
    gradient: {
      type: String,
      default: 'bg-gradient-1',
    },
    category: {
      type: String,
      default: null,
    },
    text: {
      type: String,
      default: null,
    },
    eyebrow: {
      type: String,
      default: null,
    },
    heading: {
      type: String,
      default: null,
    },
    cta: {
      type: Object,
      default: null,
    },
    img: {
      type: Object,
      default: null,
    },
    transitionBackground: {
      type: Boolean,
      default: false,
    },
    offset: {
      type: Boolean,
      default: false,
    },
    position: {
      type: String,
      default: 'object-center',
    },
  },
  computed: {
    rel() {
      return isExternal(this.link) ? 'noopener noreferrer' : ''
    },
    target() {
      return isExternal(this.link) ? '_blank' : ''
    },
    props() {
      if (this.link) {
        return {
          to: this.link,
          href: this.link,
          target: this.target,
          rel: this.rel,
        }
      }
      return {}
    },
  },
  methods: {
    isExternal,
  },
}
</script>

<style lang="postcss">
.card {
  height: calc((100vw - 30px) * 1.02);
}
@screen md {
  .card {
    height: calc((50vw - 30px) * 1.02);
  }
}
@screen lg {
  .card {
    /* Take 100vw minus outside grid gutters and general 3up gutters*/
    height: calc(((100vw - 180px) / 3) * 1.19);
    max-height: 550px;
  }

  .card.offset {
    /* Take 100vw minus outside grid gutters and general 2up gutters */
    height: calc(((100vw - 148px) * 0.67) * 0.57);
  }
  .card__image.transform:hover {
    @apply rotate-5 scale-110;
  }
}
@media screen and (hover: hover) {
  .link-icon {
    @apply opacity-0 transition duration-300;
  }
}
</style>
