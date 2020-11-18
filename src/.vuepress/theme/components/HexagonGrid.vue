<template>
  <div class="my-20 lg:mb-32 grid-margins">
    <div v-if="children">
      <div
        v-for="(row, i) in rows"
        :key="i"
        :class="[
          simpleGrid
            ? 'flex flex-wrap justify-center'
            : 'hexagon__row grid grid-cols-12 lg:flex lg:flex-wrap lg:justify-center',
        ]"
        :style="positionCalc(i)"
      >
        <div
          v-for="(child, index) in row"
          :key="index"
          :class="[
            'inline-block col-span-10 col-start-2 w-full box-border',
            simpleGrid
              ? 'px-1 md:px-2 mb-0 max-w-1/3 lg:max-w-1/6'
              : 'hexagon__wrap mb-20 md:col-span-4 lg:mb-0 lg:max-w-1/3 xl:max-w-1/4 lg:px-2',
            simpleGrid || index % 2 == 0 ? 'md:col-start-2' : 'md:col-start-8',
          ]"
        >
          <component
            :is="child.component === 'Hexagon' ? 'Hexagon' : 'HexagonSimple'"
            v-if="componentIsValid(child.component)"
            v-bind="child"
          />

          <div
            v-else
            :class="[
              'hidden lg:inline-block box-border lg:p-2',
              simpleGrid
                ? 'w-full md:px-2 max-w-1/3 lg:max-w-1/6'
                : 'hexagon__spacer-wrap lg:max-w-1/3 xl:max-w-1/4',
            ]"
          >
            <div class="spacer" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Hexagon from '@theme/components/Hexagon.vue'
import HexagonSimple from '@theme/components/HexagonSimple.vue'
export default {
  name: 'HexagonGrid',
  components: { Hexagon, HexagonSimple },
  props: {
    children: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      canHover: false,
    }
  },
  computed: {
    breakpointsEvenOdd() {
      const simpleGridBreakpoints = {
        xxl: {
          breakpointEven: 5,
          breakpointOdd: 6,
        },
        xl: {
          breakpointEven: 5,
          breakpointOdd: 4,
        },
        lg: {
          breakpointEven: 3,
          breakpointOdd: 2,
        },
        default: {
          breakpointEven: 2,
          breakpointOdd: 3,
        },
      }

      const fullGridBreakpoints = {
        xxl: {
          breakpointEven: 3,
          breakpointOdd: 4,
        },
        default: {
          breakpointEven: 3,
          breakpointOdd: 2,
        },
      }

      return this.simpleGrid
        ? simpleGridBreakpoints[this.$mq] || simpleGridBreakpoints.default
        : fullGridBreakpoints[this.$mq] || fullGridBreakpoints.default
    },

    simpleGrid() {
      return !this.children.find((child) => child.component === 'Hexagon')
    },
    rows() {
      // Break hexagons into rows
      const chunk = (array, size) => {
        const chunkedArray = []
        for (let i = 0; i < array.length; i++) {
          const last = chunkedArray[chunkedArray.length - 1]
          if (!last || last.length === size) {
            chunkedArray.push([array[i]])
            size =
              size === this.breakpointsEvenOdd.breakpointEven
                ? this.breakpointsEvenOdd.breakpointOdd
                : this.breakpointsEvenOdd.breakpointEven
          } else {
            last.push(array[i])
          }
        }
        return chunkedArray
      }

      // Removes spacers on small screen sizes
      const removeSpacers = (array) => {
        return array.filter((child) => {
          return child.component !== 'Spacer'
        })
      }
      // Add spacers to the last array for formatting
      const addSpacers = (array) => {
        const lastItem = array[array.length - 1]
        const lastItemIndex = array.indexOf(lastItem)
        const breakpoint =
          lastItemIndex % 2 === 0
            ? this.breakpointsEvenOdd.breakpointEven
            : this.breakpointsEvenOdd.breakpointOdd
        const difference = breakpoint - lastItem.length

        const filler = Array(Math.ceil(difference / 2)).fill({
          component: 'Spacer',
        })

        array[array.length - 1] = [
          ...filler.slice(difference % 2 === 0 ? 0 : 1),
          ...lastItem,
          ...filler,
        ]

        return array
      }

      let hexagons = this.children

      if (!this.simpleGrid && (this.$mq !== 'xxl' || !this.canHover)) {
        hexagons = removeSpacers(hexagons)
      }

      return this.simpleGrid ||
        ((this.$mq === 'xxl' || this.$mq === 'xl') && this.canHover)
        ? addSpacers(chunk(hexagons, this.breakpointsEvenOdd.breakpointOdd))
        : [hexagons]
    },
  },
  mounted() {
    this.canHover = window.matchMedia('(hover: hover)').matches
  },
  methods: {
    componentIsValid(component) {
      return component === 'Hexagon' || component === 'HexagonSimple'
    },
    positionCalc(i) {
      if (i === 0) {
        return 'margin-top: 0'
      }

      const simpleGridOffsets = {
        xxl: '-3.8%',
        xl: '-3.5%',
        lg: '-7.7%',
        default: '-9%',
      }

      const fullGridOffsets = {
        xxl: '-6%',
        xl: '-8%',
        default: '0',
      }

      const offset = this.simpleGrid
        ? simpleGridOffsets[this.$mq] || simpleGridOffsets.default
        : fullGridOffsets[this.$mq] || fullGridOffsets.default

      return `margin-top: ${offset}`
    },
  },
}
</script>
<style scoped lang="postcss">
@screen lg {
  .spacer {
    width: 97%;
    padding-top: 110.851%;
    @apply m-2;
  }
}

@media screen and (hover: none) {
  .hexagon__row {
    transform: translateY(0) !important;
    @apply grid grid-cols-12 mb-0;
  }
  .hexagon__wrap {
    @apply inline-block col-span-10 col-start-2 mb-20;
  }
  .hexagon__spacer-wrap {
    @apply hidden;
  }
}
@media screen and (hover: none) and (min-width: 768px) {
  .hexagon__wrap {
    @apply col-span-4 max-w-none;
  }
  .hexagon__wrap:nth-child(even) {
    @apply col-start-8;
  }
  .hexagon__wrap:nth-child(odd) {
    @apply col-start-2;
  }
}
</style>
