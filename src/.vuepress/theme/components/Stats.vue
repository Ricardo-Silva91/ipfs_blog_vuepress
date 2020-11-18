<template>
  <div v-transition class="grid grid-cols-12 gap-8">
    <div
      v-for="(stat, index) in stats"
      :key="index"
      :class="[
        'col-span-10',
        'mb-8 last:mb-0',
        'lg:mb-0',
        stats.length > 4 ? 'lg:col-span-2' : 'lg:col-span-3',
      ]"
    >
      <h3
        :class="['type-h1', theme === 'dark' ? 'text-deepBlue' : 'text-white']"
      >
        {{ stat.title }}
      </h3>
      <p
        :class="[
          'type-p1',
          theme === 'dark' ? 'text-deepBlue' : 'text-white opacity-60',
        ]"
      >
        {{ stat.text }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Stats',
  props: {
    theme: {
      type: String,
      default: 'dark',
    },
    stats: {
      type: Array,
      required: true,
      validator: function (props) {
        return props.length > 1 && props.length < 6
      },
    },
  },
}
</script>
