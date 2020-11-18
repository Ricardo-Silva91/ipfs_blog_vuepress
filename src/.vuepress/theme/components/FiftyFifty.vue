<template>
  <div
    class="bg-no-repeat py-24 md:py-140px"
    :class="[background.size, background.position]"
    :style="computedStyles()"
  >
    <div v-transition class="grid grid-margins grid-cols-12">
      <component
        :is="block.component"
        v-for="(block, index) in blocks"
        :key="index"
        v-bind="block"
        :component-index="index"
        :class="block.classList"
      ></component>
    </div>
  </div>
</template>

<script>
import TextBlock from '@theme/components/TextBlock.vue'
import FullWidthImage from '@theme/components/FullWidthImage.vue'
import Section from '@theme/components/Section.vue'
import requireAsset from '@theme/components/mixins/requireAsset'

export default {
  name: 'FiftyFifty',
  components: { Section, TextBlock, FullWidthImage },
  mixins: [requireAsset],
  props: {
    blocks: {
      type: Array,
      required: true,
    },
    background: {
      type: Object,
      default: null,
    },
  },
  methods: {
    computedClasses(index) {
      let classList = ['md:col-start-7 col-span-12 md:col-span-6']
      if (index === 0) {
        classList = [
          'col-span-10',
          'md:col-start-2',
          'md:col-span-4',
          'mb-24',
          'm:mb-0',
        ]
      }
      return classList
    },
    computedStyles() {
      const mediaQueries = ['sm', 'md']
      if (
        this.background.type === 'image' &&
        !mediaQueries.includes(this.$mq)
      ) {
        return {
          'background-image': `url(${this.requireAsset(this.background.src)})`,
        }
      }
      return {}
    },
  },
}
</script>
