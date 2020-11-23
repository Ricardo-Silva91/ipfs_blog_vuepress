<template>
  <Layout>
    <Section
      :title="$frontmatter.description"
      :component-index="0"
      :background="{ type: 'gradient', gradient: 'bg-gradient-3' }"
    />
    <div class="pt-8 bg-white">
      <RSSSubscription class="flex justify-end grid-margins" />
      <div
        class="grid-margins pt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8"
        itemscope
        itemtype="http://schema.org/Blog"
      >
        <Card
          v-for="page in publicPages"
          :key="page.key"
          class="mb-4"
          v-bind="page"
        />
      </div>
      <div>
        <router-link v-if="$pagination.hasPrev" :to="$pagination.prevLink"
          >Prev</router-link
        >
        <router-link v-if="$pagination.hasNext" :to="$pagination.nextLink"
          >Next</router-link
        >
      </div>
    </div>
  </Layout>
</template>

<script>
import Layout from '@theme/layouts/Layout.vue'
import Section from '@theme/components/Section.vue'
import RSSSubscription from '@theme/components/RSSSubscription.vue'

import Card from '@theme/components/blog/Card'

export default {
  name: 'BlogIndex',
  components: {
    Layout,
    Section,
    Card,
    RSSSubscription,
  },
  data: function () {
    return {
      delayValues: [0, 0.15, 0.3],
    }
  },
  computed: {
    publicPages: function () {
      return this.$pagination.pages.filter(
        (page) =>
          page.frontmatter &&
          (page.frontmatter.sitemap ? !page.frontmatter.sitemap.exclude : true)
      )
    },
  },
  methods: {
    delayVal: function () {
      this.current =
        this.current < this.delayValues.length - 1 ? this.current : -1
      return this.delayValues[++this.current]
    },
  },
}
</script>
