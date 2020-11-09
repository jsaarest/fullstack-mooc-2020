import React from 'react'

const NumberListItem = ({person, handleDelete}) => {
  return (
    <div>
      <span key={person.name}>{person.name}: {person.number}</span>
      <button onClick={() => handleDelete(person.id, person.name)}>Delete</button>
    </div>
    )
}
export default NumberListItem

