const listHelper = require('../utils/list_helper')

const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  }
]

const listWithMultipleBlogs = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W.',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 10,
      __v: 0
    },
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
]


test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
    test('of empty list is zero', () => {
        const result = listHelper.totalLikes([])
        expect(result).toBe(0)
    })
    
      test('when list has only one blog, equals the likes of that', () => {
        const result = listHelper.totalLikes(listWithOneBlog)
        expect(result).toBe(5)
      })

    test('of a bigger list is calculated right', () => {
        const result = listHelper.totalLikes(listWithMultipleBlogs)
        expect(result).toBe(20)
    })
})

describe('favorite blog', () => {
  test('of empty blog lists return empty', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

  test('of a bigger list return right', () => {
      const result = listHelper.favoriteBlog(listWithMultipleBlogs)
      expect(result).toEqual({
        "author": "Edsger W. Dijkstra",
        "likes": 10,
        "title": "Go To Statement Considered Harmful",
        })
  })

  describe('most blogs', () => {
    test('of a bigger list return correct blogs number', () => {
      const result = listHelper.mostBlogs(listWithMultipleBlogs)
      expect(result).toEqual({
        "author": "Edsger W. Dijkstra",
        "blogs": 2,
        })
    })
  })

  describe('most likes', () => {
    test('of a bigger list return most like author', () => {
      const result = listHelper.mostLikes(listWithMultipleBlogs)
      expect(result).toEqual({
        "author": "Edsger W. Dijkstra",
        "likes": 15,
        })
    })
  })
})