import React from 'react'
import NumberListItem from './NumberListItem'

const NumbersList = ({persons, handleFilter}) => {
  return persons.filter(handleFilter).map((person) => (<NumberListItem person={person} key={person.name}/>))
}

export default NumbersList