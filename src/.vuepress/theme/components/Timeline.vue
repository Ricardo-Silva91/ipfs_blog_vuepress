<template>
  <div class="grid-margins">
    <div class="max-w-2xl mx-auto">
      <div v-if="img && img.src" class="mb-10">
        <LazyImage :alt="img.alt" :src="img.src" />
      </div>
      <ul class="timeline relative pb-12">
        <li
          v-for="group in items"
          :key="group.title"
          class="timeline-group pl-8"
        >
          <header v-if="group.title" class="flex items-center mb-2">
            <p
              class="timeline-group-title type-p1-serif text-deepBlue font-semibold"
            >
              {{ group.title }}
            </p>
          </header>
          <ul class="timeline-entries">
            <li
              v-for="entry in group.items"
              :key="entry.title"
              class="timeline-entry"
            >
              <p
                v-if="entry.title"
                class="timeline-entry-title type-p3 text-gray-dark font-semibold leading-8"
              >
                <a
                  :id="getHash(group.title, entry.title)"
                  :href="'#' + getHash(group.title, entry.title)"
                  >{{ entry.title }}</a
                >
              </p>
              <div class="timeline-entry-text type-rich">
                <p class="type-p1" v-html="entry.text"></p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import LazyImage from '@theme/components/base/LazyImage'

export default {
  name: 'Timeline',
  components: {
    LazyImage,
  },
  props: {
    img: {
      type: Object,
      default: null,
    },
    items: {
      type: Array,
      default: null,
    },
  },
  methods: {
    getHash(title, entry) {
      const hash = `timeline-${title}-${entry}`
      return encodeURIComponent(hash.toLowerCase())
    },
  },
}
</script>

<style lang="postcss" scoped>
@keyframes blip {
  0% {
    @apply bg-white border-deepBlue;
  }
  100% {
    @apply bg-deepBlue border-deepBlue;
  }
}

@screen lg {
  .timeline {
    @apply ml-16;
  }
  .timeline-group-title {
    @apply -ml-16;
  }
  .timeline-group {
    @apply relative;
    & header {
      @apply absolute top-0 left-0;
    }
  }
}

.timeline::after {
  content: '';
  background-image: linear-gradient(
    theme('colors.gray.default') 98%,
    theme('colors.gray.light')
  );
  @apply absolute;
  width: 2px;
  top: 0;
  bottom: 0;
}

.timeline-group:first-child {
  top: -10px;
  margin-bottom: -10px;
  @apply relative;
}
.timeline-entry + .timeline-entry,
.timeline-group + .timeline-group {
  @apply mt-8;
}
.timeline-group header::before {
  content: '';
  left: -4px;
  width: 10px;
  height: 10px;
  border-width: 3px;
  @apply absolute z-10;
  @apply bg-gray-dark border-solid border-gray-dark rounded-full;
}
.timeline-group:last-child {
  .timeline-group-title {
    font-size: 1.4em;
  }
  header::before {
    animation: blip 3s ease-in-out 2s infinite;
  }
}
</style>
