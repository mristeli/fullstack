import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('SimpleBlog component', () => {
  test('renders blog content correctly', () => {
    const blog = {
      title: 'Blog jota testataan',
      author: 'Testi Bloggaaja',
      likes: 13
    }

    const component = render(
      <SimpleBlog blog={blog} />
    )

    expect(component.container).toHaveTextContent(
      'Blog jota testataan'
    )
    expect(component.container).toHaveTextContent(
      'Testi Bloggaaja'
    )
    expect(component.container).toHaveTextContent(
      `blog has ${blog.likes} likes`
    )
  })

  test('calls onClick handler when like button is clicked', () => {
    const blog = {
      title: 'Blog jota testataan',
      author: 'Testi Bloggaaja',
      likes: 13
    }

    const handler = jest.fn()
    const { getByText } = render(
      <SimpleBlog blog={blog} onClick={handler} />
    )
    const likeButton = getByText('like')
    fireEvent.click(likeButton)
    fireEvent.click(likeButton)

    expect(handler.mock.calls.length).toBe(2)
  })
})
