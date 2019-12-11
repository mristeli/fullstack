import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog component', () => {

  test('at first shows only title and auther', () => {
    const blog = {
      title: 'Test from Blog.test.js',
      author: 'Tester From.Blog.test.js',
      likes: 11
    }

    const blogEntry = render(
      <Blog blog={blog}
        addLike={ () => {} }
        removeBlog={ () => {} }
        loggedInUser={{}}
      />
    )

    const basicVisible = blogEntry.container.querySelector('.basicInfo')
    expect(basicVisible).toHaveStyle('display: block')
    const detailsHidden = blogEntry.container.querySelector('.details')
    expect(detailsHidden).toHaveStyle('display: none')

    fireEvent.click(blogEntry.container.querySelector('.blogEntry'))

    const detailsVisible = blogEntry.container.querySelector('.details')
    expect(detailsVisible).toHaveStyle('display: block')
  })
})