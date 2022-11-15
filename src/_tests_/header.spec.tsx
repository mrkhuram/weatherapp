import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import Header from '../components/header'

test('Header is present', () => {
  render(<Header />)
  const linkElement = screen.getByText(/Weather App/i)
  expect(linkElement).toBeInTheDocument()
})
