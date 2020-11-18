<template>
  <div v-transition class="grid grid-margins grid-cols-12 my-20 lg:my-140px">
    <div
      class="col-span-10 col-start-2 lg:col-span-11 lg:col-start-2 lg:grid lg:grid-cols-10 lg:gap-8"
    >
      <h3 class="type-p1 text-deepBlue mb-4 lg:col-span-3">{{ title }}</h3>
      <div class="lg:col-span-7">
        <div
          v-for="(link, index) in linkList"
          :key="index"
          class="border-gray-30 border-b pb-2 mb-4 lg:flex justify-between"
        >
          <Link
            class="type-p2 text-deepBlue block mb-2 lg:mr-2 transition duration-300 ease-out hover:opacity-75"
            v-bind="link"
          />
          <p
            v-if="link.meta"
            class="type-p3 py-1 lg:py-2 text-gray-dark lg:text-right flex-shrink-0"
          >
            {{ link.meta }}
          </p>
        </div>
        <CTA v-if="cta" v-bind="cta" class="mt-6 lg:mt-4" />
      </div>
    </div>
  </div>
</template>

<script>
import Link from '@theme/components/base/Link'
import CTA from '@theme/components/CTA'
export default {
  name: 'LinkList',
  components: { CTA, Link },
  props: {
    title: {
      type: String,
      required: true,
    },
    links: {
      type: Array,
      required: true,
      validator: function (props) {
        return props.length > 2
      },
    },
    cta: {
      type: Object,
      default: null,
    },
    limit: {
      type: Number,
      default: null,
    },
  },
  computed: {
    linkList() {
      const withLimit = parseInt(this.limit)
      return withLimit ? this.links.slice(0, withLimit) : this.links
    },
  },
}
</script>
