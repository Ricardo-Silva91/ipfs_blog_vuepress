<template>
  <router-link
    class="card-post group bg-white rounded overflow-hidden flex flex-col transform hover:scale-105 duration-100 ease-in-out"
    itemprop="mainEntityOfPage"
    :to="path"
  >
    <article
      itemprop="blogPost"
      itemscope
      itemtype="https://schema.org/BlogPosting"
    >
      <div class="cover embed-responsive embed-responsive-og bg-gradient-5">
        <router-link :to="path" class="embed-responsive-item">
          <LazyImage
            v-if="frontmatter.image"
            class="transform duration-500 ease-in-out group-hover:scale-105"
            itemprop="image"
            :alt="title"
            src-placeholder="/images/blog/og/default.png"
            :src="frontmatter.image"
            :ctx="regularPath"
          />
        </router-link>
      </div>
      <div class="p-8 flex flex-grow flex-col">
        <header>
          <h1 class="type-h5 font-bold text-primary hover:underline">
            {{ title }}
          </h1>
        </header>
        <div class="my-4">
          <PostMeta
            :author="frontmatter.author"
            :date="frontmatter.date"
            :tags="frontmatter.tags"
            class="type-p4 text-primary"
          />
        </div>
        <footer class="flex-grow">
          <p
            v-if="frontmatter.description || frontmatter.description"
            class="type-p1-serif text-primary"
            itemprop="description"
          >
            {{ frontmatter.description || frontmatter.description }}
          </p>
        </footer>
      </div>
    </article>
  </router-link>
</template>

<script>
import LazyImage from '@theme/components/base/LazyImage'
import PostMeta from '@theme/components/blog/PostMeta'

export default {
  name: 'BlogCard',
  components: { LazyImage, PostMeta },

  inheritAttrs: false,
  props: {
    title: {
      type: String,
      required: true,
    },
    frontmatter: {
      type: Object,
      default: () => ({}),
      validator: function (frontmatter) {
        return frontmatter.description
          ? frontmatter.description.length <= 200
          : true
      },
    },
    regularPath: {
      type: String,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
  },
}
</script>
