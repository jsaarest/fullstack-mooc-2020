import React from 'react'

const NumberListItem = ({person}) => {
  return <p key={person.name}>{person.name}: {person.number}</p>
}
export default NumberListItem

