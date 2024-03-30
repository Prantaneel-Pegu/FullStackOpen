/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

import serverDB from './services/communication'
import NewContact  from './components/NewContact'
import SavedNumbers from './components/SavedNumbers'
import SearchContact from './components/SearchContact'

const App = () => {
  
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('a new contact...')
  const [newNumber, setNewNumber] = useState(0)
  const [filterName, setFilterName] = useState('')

  useEffect(() => { 
    serverDB
      .getPersons()
      .then(result => 
        setPersons(result)
        )
    console.log(serverDB.getPersons().then(result => console.log(result)))
  }, [])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchContact persons={persons} filterName={filterName} setFilterName={setFilterName} />
      <h2>Add a new Contact</h2>
      <NewContact persons={persons} newName={newName} newNumber={newNumber}  setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <SavedNumbers people={persons} setPersons={setPersons}/>
    </div>
  )
}

export default App