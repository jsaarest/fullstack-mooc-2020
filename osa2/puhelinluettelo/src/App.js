import React, {useState, useEffect} from 'react'
import NewPersonForm from "./components/NewPersonForm";
import NumbersList from "./components/NumbersList";
import personService from "./services/personService"
import Notification from "./components/Notification";


const App = () => {

  // Default states
  const defaultValues = {
    name: '',
    number: ''
  }
  const [values, setValues] = useState(defaultValues)
  const [search, setSearch] = useState('')
  const [persons, setPersons] = useState([])
  const [fetchReady, setFetchReady] = useState(false) // Data fetch tracks changes of this value
  const [message, setMessage] = useState({message: '', severity: ''})

  // Fetch data
  useEffect(() => {
      personService.getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, [fetchReady]) // Fetch new data when handleAdd(), handleDelete() or handleUpdate() are called

  console.log(persons)

  const updateFetch = () => {
    setFetchReady(!fetchReady)
  }

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
    const existingUser = persons.find(person => person.name === values.name) // Look for duplicates
    const userData = {...existingUser, number: values.number}
    existingUser !== undefined ? handleUpdate(userData) : handleAdd()
  }

  const handleDelete = (id, name) => {
    if(window.confirm(`Delete ${name}`)){
        personService.deleteById(id)
        .then(res => {
          setPersons(persons.filter(person => id !== person.id))
          console.log("deleted user", res)
          setMessage({message: `Removed ${name}`, severity: 'error'})
          setTimeout(() => setMessage({message: '', severity: ''}), 2000)
          updateFetch()

        })
        .catch(err => {
          console.log(err)
          setMessage({message: `Information of ${name} has already been removed from server`, severity: 'error'})
          updateFetch()
          setTimeout(() => setMessage({message: '', severity: ''}), 2000)
        })
    }
  }
  const handleAdd = () => {
    const person = { name: values.name, number: values.number }
      personService.create(person)
      .then(res => {
        console.log("Succesfully added person",res)
        setMessage({message: `Added ${person.name}`, severity: 'success'})
        setTimeout(() => setMessage({message: '', severity: ''}), 2000)
        handleReset()
        updateFetch()
      })
  }

  const handleUpdate = (userData) => {
    //console.log(userData)
    if(window.confirm(`${userData.name} is already added to phonebook, replace the old number with a new one?`)){
        personService.update(userData.id, userData)
        .then(res => {
          console.log(res)
          setMessage({message: `Updated ${userData.name}`, severity: 'success'})
          setTimeout(() => setMessage({message: '', severity: ''}), 2000)
          handleReset()
          updateFetch()
        })
        .catch(err => {
          console.log(err)
          setMessage({message: `Information of ${userData.name} has already been removed from server`, severity: 'error'})
          updateFetch()
          setTimeout(() => setMessage({message: '', severity: ''}), 2000)
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message.message} severity={message.severity}/>
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
        handleDelete={handleDelete}
      />
    </div>
  )

}

export default App
