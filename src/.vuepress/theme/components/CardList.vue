<template>
  <div
    class="cardlist grid gap-8 grid-cols-1"
    :class="[
      { 'lg:grid-cols-3': !offset },
      { [`${offsets[offset]}`]: !!offset },
    ]"
  >
    <Card
      v-for="(card, index) in cards"
      :key="index"
      v-transition="{ transition: 'transformY', delay: `${0.15 * index}s` }"
      v-bind="card"
      :offset="!!offset"
    />
  </div>
</template>

<script>
import Card from '@theme/components/Card.vue'
export default {
  name: 'CardList',
  components: { Card },
  props: {
    cards: {
      type: Array,
      required: true,
    },
    offset: {
      type: String,
      default: null,
    },
  },
  data: function () {
    return {
      // print calculated col classes to ensure PurgeCSS includes them in the production bundle
      offsets: {
        left: 'lg:grid-cols-2-offset-left',
        right: 'lg:grid-cols-2-offset-right',
      },
    }
  },
}
</script>
