<template>
  <div>
    <a
      class="rss-link flex items-center text-gray-dark transition-filter duration-700 ease-in-out"
      href="/rss.xml"
      rel="noopener noreferrer"
    >
      <SVGIcon
        class="rss-icon w-6 h-6 fill-current mr-2"
        name="rss"
        title="rss"
      />
      <h3 class="text-webBlue text-sm">Available as RSS</h3>
    </a>
  </div>
</template>
<script>
import SVGIcon from '@theme/components/base/SVGIcon'
export default {
  name: 'RSSSubscription',
  components: { SVGIcon },
}
</script>

<style lang="postcss" scoped>
.rss-link {
  filter: grayscale(1);

  &:hover {
    filter: grayscale(0);
  }
}
</style>
