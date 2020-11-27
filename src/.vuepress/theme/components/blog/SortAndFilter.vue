<template>
  <div class="grid-margins opacity-85">
    <LinksAndSocial />
    <ActiveTags :number-of-posts="numberOfPosts" class="mt-4" />
  </div>
</template>

<script>
import LinksAndSocial from '@theme/components/blog/LinksAndSocial.vue'
import ActiveTags from '@theme/components/blog/ActiveTags.vue'

export default {
  name: 'SortAndFilter',
  components: {
    LinksAndSocial,
    ActiveTags,
  },
  props: {
    numberOfPosts: {
      type: Number,
      required: true,
    },
  },
}
</script>
