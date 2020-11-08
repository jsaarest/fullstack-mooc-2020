import React from 'react'

const NewPersonForm = ({values, handleChange, handleSubmit}) => {
  return(
    <form onSubmit={(e) => handleSubmit(e)}>
      <div>
        name: <input value={values.name} name='name' onChange={handleChange} />
        <br/>
        number: <input value={values.number} name='number' onChange={handleChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default NewPersonForm