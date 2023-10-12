import React from 'react'
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { render } from '@testing-library/react'
import TogglableBlog from './TogglableBlog'

describe('Blog render', () => {
  const blog = {
    'title': 'title',
    'author': 'me',
    'url': 'anything',
    'likes': 3,
    'user': {
      'username': 'username',
      'name': 'name',
    },
  }

  const onLikeAdd = jest.fn()
  const onRemove = jest.fn()

  let component

  beforeEach(() => {
    component = render(<TogglableBlog blog={blog} onLikeAdd={onLikeAdd} onRemove={onRemove} />)
  })

  test('renders title and author but not url or likes by default', () => {
    expect(component.container.querySelector('.title')).toHaveTextContent(
      blog.title
    )
    expect(component.container.querySelector('.author')).toHaveTextContent(
      blog.author
    )
    expect(component.queryByText(blog.url)).toBeNull()
    expect(component.queryByText('like')).toBeNull()
  })

  test('at start the children are not displayed', () => {
    const details = component.container.querySelector('.blog-details')
    expect(details).toBeNull()
  })

  test('renders blog details when view button is clicked', async () => {
    const button = component.container.querySelector('button')
    const user = userEvent.setup()
    await user.click(button)

    const blogDetails = component.container.querySelector('.blog-details')
    expect(blogDetails).toBeInTheDocument()
  })

  test('onLikeAdded func get called twice when like button is clicked', async () => {
    const button = component.container.querySelector('#view-btn')
    const user = userEvent.setup()
    await user.click(button)

    const likeButton = component.container.querySelector('#like-btn')
    await user.click(likeButton)
    await user.click(likeButton)

    expect(onLikeAdd.mock.calls).toHaveLength(2)
  })

})