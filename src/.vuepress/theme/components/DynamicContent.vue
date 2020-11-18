<template>
  <div
    :class="[
      $page.frontmatter.slug,
      { 'relative overflow-auto': content.subnavigation },
    ]"
  >
    <Subnavigation
      v-if="content.subnavigation"
      v-bind="content.subnavigation"
    />
    <component
      :is="block.component"
      v-for="(block, index) in content.body"
      :key="index"
      v-bind="block"
    />
  </div>
</template>
<script>
// Import all components that can be rendered from frontmatter array
import CardList from '@theme/components/CardList.vue'
import Column from '@theme/components/base/Column.vue'
import ColumnText from '@theme/components/ColumnText.vue'
import Container from '@theme/components/base/Container.vue'
import FullWidthImage from '@theme/components/FullWidthImage.vue'
import Hexagon from '@theme/components/Hexagon.vue'
import HexagonSimple from '@theme/components/HexagonSimple.vue'
import HexagonGrid from '@theme/components/HexagonGrid.vue'
import LinkList from '@theme/components/LinkList.vue'
import Section from '@theme/components/Section.vue'
import Stats from '@theme/components/Stats.vue'
import TextLayout from '@theme/components/TextLayout.vue'
import Typography from '@theme/components/Typography.vue'
import FiftyFifty from '@theme/components/FiftyFifty.vue'
import Subnavigation from '@theme/components/Subnavigation.vue'
import Timeline from '@theme/components/Timeline.vue'

// layout compositions
import CareersBlock from '@theme/blocks/Careers'

export const components = {
  CardList,
  CareersBlock,
  ColumnText,
  Column,
  Container,
  FullWidthImage,
  LinkList,
  Hexagon,
  HexagonSimple,
  HexagonGrid,
  Section,
  Stats,
  TextLayout,
  Typography,
  FiftyFifty,
  Subnavigation,
  Timeline,
}

export default {
  name: 'DynamicContent',
  components,
  props: {
    content: {
      type: Object,
      default: () => ({}),
    },
  },
}
</script>
