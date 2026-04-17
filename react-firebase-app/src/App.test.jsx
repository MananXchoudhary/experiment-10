import { render } from '@testing-library/react'
import React from 'react'
import { greet, add } from './utils'
import App from './App'

describe('Utility Functions', () => {
  it('greet returns correct greeting', () => {
    expect(greet('World')).toBe('Hello, World!')
  })

  it('add returns correct sum', () => {
    expect(add(2, 3)).toBe(5)
  })
})

describe('App Component', () => {
  it('renders heading text', () => {
    const { container } = render(<App />)
    expect(container.innerHTML).toContain('React App on Firebase')
  })
})
