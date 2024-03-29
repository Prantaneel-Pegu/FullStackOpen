/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'
import axios from 'axios'

import NewContact  from './components/NewContact'
import SavedNumbers from './components/SavedNumbers'
import SearchContact from './components/SearchContact'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('a new contact...')
  const [newNumber, setNewNumber] = useState(0)
  const [filterName, setFilterName] = useState('')

  useEffect(() => { 
    axios
    .get('http://localhost:3001/persons')
    .then(response => setPersons(response.data))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchContact persons={persons} filterName={filterName} setFilterName={setFilterName} />
      <h2>Add a new Contact</h2>
      <NewContact persons={persons} newName={newName} newNumber={newNumber}  setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <SavedNumbers people={persons} />
    </div>
  )
}

export default App