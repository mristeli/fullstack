import React from 'react'
import {
  render, waitForElement
} from '@testing-library/react'
jest.mock('./services/blogs')
import App from './App'

describe('<App />', () => {
  test('if no user logged, blogs are not rendered', async () => {
    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('login')
    )

    const blogListNull = component.container.querySelector('.blogList')
    expect(blogListNull).toBeNull()
  })

  test('when user is logged in, blogs are rendered', async () => {
    const user = {
      username: 'mtestaa',
      token: '00384984984948989',
      name: 'Mun Testaaja'
    }
    localStorage.setItem('loggedInUser', JSON.stringify(user))

    const component = render(
      <App />
    )
    component.rerender(<App />)

    await waitForElement(
      () => component.getByText('new blog')
    )

    const blogList = component.container.querySelectorAll('.blogEntry')
    expect(blogList.length).toBe(4)
  })
})
