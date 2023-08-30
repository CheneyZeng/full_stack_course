import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import CreateNewForm from './CreateNewForm'
import userEvent from '@testing-library/user-event'

test('<CreateNewForm /> updates parent state and calls onSubmit', async () => {
  const createForm = jest.fn()
  const user = userEvent.setup()

  render(<CreateNewForm handleCreate={createForm} title={'myTitle'} handleTitleChange={jest.fn()} author={'myAuthor'} handleAuthorChange={jest.fn()} url={'myUrl'} handleUrlChange={jest.fn()} />)

  const button = screen.getByText('create')

  await user.click(button)

  expect(createForm.mock.calls).toHaveLength(1)
  const html = createForm.mock.calls[0][0].target
  expect(html.outerHTML).toContain('myTitle')
  expect(html.outerHTML).toContain('myAuthor')
  expect(html.outerHTML).toContain('myUrl')
})