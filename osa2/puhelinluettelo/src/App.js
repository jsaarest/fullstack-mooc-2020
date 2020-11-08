import React, {useState, useEffect} from 'react'
import NewPersonForm from "./components/NewPersonForm";
import NumbersList from "./components/NumbersList";
import axios from 'axios'


const App = () => {

  // Default states
  const defaultValues = {
    name: '',
    number: ''
  }
  const [values, setValues] = useState(defaultValues)
  const [search, setSearch] = useState('')
  const [ persons, setPersons] = useState([])
  
  // Fetch data
  useEffect(() => {
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        setPersons(response.data)
      })
  }, [])


  // Handlers
  const handleFilter = (person) => {
    return person.name.toUpperCase().includes(search.toUpperCase())
  }
  const handleChange = (e) => {
    const {value, name} = e.target
    setValues({...values, [name]: value})
  }
  const handleReset = () => { // Reset to default state
    setValues(defaultValues)
  }
  const handleSubmit = (e) => {
    e.preventDefault() // Prevent default send of the form
    if(persons.find(({name}) => name === values.name)){ // Check possible duplicates
      alert(`${values.name} is already added to phonebook`) // Alert user
      handleReset()
    }
    else {
      const obj = {name: values.name, number: values.number} // Create person object
      setPersons([...persons, obj])   // Add element to array
      handleReset()
      }
    }

  return (
    <div>
      <h2>Phonebook</h2>
      filter shown with
      <input value={search} onChange={e => setSearch(e.target.value)}/>
      <h3>Add a new:</h3>
      <NewPersonForm
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        values={values}
      />
      <h2>Numbers</h2>
      <NumbersList
        persons={persons}
        handleFilter={handleFilter}
      />
    </div>
  )

}

export default App
