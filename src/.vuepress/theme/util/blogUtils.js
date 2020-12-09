export const parseProtectedPost = (post) => {
  if (!post.frontmatter.data) {
    return []
  }

  return post.frontmatter.data.map((item) => ({
    type: post.frontmatter.type,
    date: item.date,
    title: item.title,
    path: item.path,
    ...item,
    frontmatter: {
      date: item.date,
      title: item.title,
      path: item.path,
      ...item,
    },
  }))
}
