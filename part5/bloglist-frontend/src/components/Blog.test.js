import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'

describe('<Blog /> test block', () => {
  let component

  const blog = {
    title: 'Blog post for test',
    author: 'Muhammad Fathi',
    likes: 10,
    url: 'http://localhost:3003/blog/21',
    user: {
      name: 'Muhammad Fathi',
    },
  }

  const user = {
    username: 'fathisiddiqi',
  }

  describe('render content', () => {
    beforeEach(() => {
      component = render(<Blog blog={blog} user={user} />)
    })

    test('blog render title and author', () => {
      const blogTitle = component.container.querySelector('.blog-title')
      expect(blogTitle).toHaveTextContent('Blog post for test Muhammad Fathi')
    })

    test('blog render content of the blog post after click view', () => {
      const button = component.getByText('view')
      fireEvent.click(button)

      const style = component.container.querySelector('.blog-content')
      expect(style).not.toHaveStyle('display: none')

      const url = component.container.querySelector('.blog-url')
      expect(url).toHaveTextContent('http://localhost:3003/blog/21')

      const likes = component.container.querySelector('.blog-likes')
      expect(likes).toHaveTextContent('10')
    })
  })

  test('if button likes clicked twice', () => {
    const mockHandler = jest.fn()

    component = render(
      <Blog blog={blog} user={user} handleLike={mockHandler} />
    )

    const buttonView = component.getByText('view')
    fireEvent.click(buttonView)

    const buttonLike = component.getByText('like')
    fireEvent.click(buttonLike)
    fireEvent.click(buttonLike)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })
})
