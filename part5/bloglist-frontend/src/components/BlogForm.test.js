import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'

describe('<BlogForm /> test block', () => {
  test('test form props when input a new blog', () => {
    const handleSubmit = jest.fn()
    const component = render(<BlogForm createBlog={handleSubmit} />)

    const title = component.container.querySelector('#title')
    const author = component.container.querySelector('#author')
    const url = component.container.querySelector('#url')
    const form = component.container.querySelector('form')

    fireEvent.change(title, {
      target: { value: 'new blog for test' },
    })

    fireEvent.change(author, {
      target: { value: 'Muhammad Fathi' },
    })

    fireEvent.change(url, {
      target: { value: 'http://localhost:3003/blog-post/1' },
    })

    fireEvent.submit(form)

    expect(handleSubmit.mock.calls[0][0].title).toBe('new blog for test')
    expect(handleSubmit.mock.calls[0][0].author).toBe('Muhammad Fathi')
    expect(handleSubmit.mock.calls[0][0].url).toBe(
      'http://localhost:3003/blog-post/1'
    )
  })
})
