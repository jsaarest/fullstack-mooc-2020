import React from 'react'
import NumberListItem from './NumberListItem'

const NumbersList = ({persons, handleFilter, handleDelete}) => {
  return persons.filter(handleFilter).map((person) => (<NumberListItem person={person} key={person.name} handleDelete={handleDelete} />))
}

export default NumbersList