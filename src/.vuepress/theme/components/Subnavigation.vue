<template>
  <div ref="subnav">
    <div
      :class="[
        'subnav__mobile w-full lg:hidden z-20 border-t border-gray-default bg-gray-light bottom-0',
        stickToFooter ? 'absolute' : 'fixed',
      ]"
    >
      <select
        v-model="activeLink"
        aria-label="Jump to section navigation"
        class="subnav__select bg-gray-light block py-5 px-15px w-full type-p1 appearance-none focus:outline-none md:px-58px"
        @change="scroll($event.target.value)"
      >
        <option v-for="link in links" :key="link.anchor" :value="link.anchor">
          {{ link.text }}
        </option>
      </select>
      <SVGIcon
        class="subnav__mobile-icon absolute right-0 w-6 h-6 pointer-events-none"
        name="chevron-down-icon"
      />
    </div>
    <nav
      aria-label="In-Page Navigation"
      :class="[
        'subnav w-full hidden lg:block z-10 border-t border-gray-default bg-gray-light bottom-0 z-20',
        stickToFooter ? 'absolute' : 'fixed',
      ]"
    >
      <ul class="grid-margins grid grid-cols-12 gap-8">
        <li
          v-for="link in links"
          :key="link.anchor"
          class="col-span-2 text-center"
        >
          <button
            :class="[
              'nav__button text-deepBlue w-full duration-300 ease-out border-t-2 border-transparent hover:border-gray-dark focus:border-gray-dark focus:outline-none',
              { 'border-deepBlue': link.anchor === activeLink },
            ]"
            :href="'#' + link.anchor"
            :title="'Skip to ' + link.text"
            @keyup.enter="scroll(link.anchor)"
            @click="scroll(link.anchor)"
          >
            {{ link.text }}
          </button>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
import SVGIcon from '@theme/components/base/SVGIcon'

export default {
  name: 'Subnavigation',
  components: { SVGIcon },
  props: {
    links: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      activeLink: this.links[0].anchor,
      anchorMap: {},
      observer: null,
      stickToFooter: false,
      footerElement: null,
      pageHeight: 0,
      footerTop: 0,
      offset: 0,
    }
  },
  mounted() {
    this.footerElement = document.querySelector('footer')
    // Adds & removes fixed positioning to subnav
    window.addEventListener('scroll', this.handlePageScroll)

    // Handle Sticky positioning
    this.handlePageScroll()

    // Handle Sticky positioning after resize
    window.addEventListener('resize', this.handlePageScroll)

    // Controls active class on subnav
    this.setUpObservers()
  },
  destroyed() {
    window.removeEventListener('scroll', this.handlePageScroll)
    window.removeEventListener('resize', this.handlePageScroll)
    this.observer.disconnect()
  },
  methods: {
    handlePageScroll() {
      this.position = window.pageYOffset + window.innerHeight

      if (this.position >= this.footerElement.offsetTop) {
        this.stickToFooter = true
      } else {
        this.stickToFooter = false
      }
    },
    scroll(anchor) {
      const target = this.anchorMap[anchor]
      if (target) {
        window.scrollTo({
          // Clear the nav, add some nice padding
          top: target.offsetTop - 110,
        })
      }
    },
    setUpObservers() {
      // Controls active class on subnav
      this.observer = new IntersectionObserver((entries, options) => {
        entries.forEach((entry) => {
          if (entry.intersectionRatio > 0) {
            this.activeLink = entry.target.id
          }
        })
      })

      const options = {
        rootMargin: '0 0 60% 0',
      }

      this.links.forEach((link) => {
        const el = document.getElementById(link.anchor)
        if (el) {
          this.observer.observe(el, options)
          this.anchorMap[link.anchor] = el
        }
      })
    },
  },
}
</script>

<style lang="postcss" scoped>
.subnav__mobile-icon {
  top: 27px;
  right: 15px;
}
.nav__button {
  padding: 27px 0;
}
.subnav__select {
  padding-top: 28px;
  padding-bottom: 28px;
}
@screen md {
  .subnav__mobile-icon {
    right: 58px;
  }
}
.subnav,
.subnav__mobile {
  backface-visibility: hidden;
  -webkit-transform: translate3d(0, 0, 0);
}
</style>
