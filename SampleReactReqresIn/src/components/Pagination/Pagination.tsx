import React from 'react'
import { Pagination as BootstrapPagination } from 'react-bootstrap'

interface Props {
  total: number
  active: number,
  onChange: (val: number) => void
}

const Pagination = ({ total, active, onChange }: Props) => {
  const items = []

  for (let number = 1; number <= total; number++) {
    items.push(
      <BootstrapPagination.Item key={number} active={number === active} onClick={() => onChange(number)}>
        {number}
      </BootstrapPagination.Item>
    )
  }

  return (
    <BootstrapPagination className="justify-content-center">{items}</BootstrapPagination>
  )
}

export default Pagination
