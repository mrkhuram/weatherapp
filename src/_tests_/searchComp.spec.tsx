import { screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import SearchComponent from '../components/searchComp'
import { render, fireEvent } from '../../test-utils'

describe('Search Component', () => {
  test('Search Component is present', () => {
    render(<SearchComponent />)
    let searchInput = screen.getByTestId('search_input')
    let searchBy = screen.getByTestId('search_by')
    expect(searchInput).toBeInTheDocument()
    expect(searchBy).toBeInTheDocument()
    fireEvent.change(searchInput, { target: { value: 'islamabad' } })
    fireEvent.change(searchBy, { target: { value: '1' } })
    userEvent.click(searchInput)
    expect(searchInput).toHaveValue("islamabad")
  })
})
