<template>
  <div class="grid grid-cols-12 grid-margins" :class="classList">
    <div class="col-span-10 md:col-span-8 col-start-2 md:col-start-2">
      <TextBlock v-transition v-bind="$props" />
    </div>
  </div>
</template>

<script>
import TextBlock from '@theme/components/TextBlock.vue'

export default {
  name: 'TextLayout',
  components: { TextBlock },
  props: {
    classList: {
      type: String,
      default: 'my-20 md:my-180px',
    },
    ...TextBlock.props,
  },
}
</script>
