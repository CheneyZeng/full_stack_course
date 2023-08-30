const _ = require('lodash');

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce(
        (accumulator, blog) => accumulator + blog.likes, 0
      );
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return {}
    }
    const {title, author, likes, ...others} = blogs.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
    return {title, author, likes}
}

const mostBlogs = (blogs) => {
    const output =
    _(blogs)
      .groupBy('author')
      .map((objs, key) => ({
          'author': key,
          'blogs': objs.length }))
      .value();
    return output.reduce((prev, current) => {
        return (prev.blogs > current.blogs) ? prev : current
    })
}

const mostLikes = (blogs) => {
    const output =
    _(blogs)
    .groupBy('author')
    .map((objs, key) => ({
        'author': key,
        'likes': _.sumBy(objs, 'likes') }))
    .value();
    return output.reduce((prev, current) => {
        return (prev.likes > current.likes) ? prev : current
    })
}
  
  module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
  }