/* eslint-disable no-unused-vars */
import { useEffect, useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: 9123456789}
  ]) 
  const [newName, setNewName] = useState('a new contact...')
  const [newNumber, setNewNumber] = useState(0)
  const [filterName, setFilterName] = useState('')
  const [filteredContacts, setFilteredContacts] = useState([])

  return (
    <div>
      <h2>Phonebook</h2>
      <SearchContact persons={persons} filterName={filterName} setFilterName={setFilterName} filteredContacts={filteredContacts} setFilteredContactsFunc={(x) => setFilteredContacts(x)} />
      <h2>Add a new Contact</h2>
      <NewContact persons={persons} newName={newName} newNumber={newNumber}  setPersons={setPersons} setNewName={setNewName} setNewNumber={setNewNumber}/>
      <h2>Numbers</h2>
      <SavedNumbers people={persons} />
      <div>debug: {newName}</div>
    </div>
  )
}

const SearchContact = ({persons, filterName, setFilterName, filteredContacts}) => {

  let filteredContactsNew = persons.map((contact) => {
    if (filterName !== '' && contact.name.toLowerCase().includes(filterName.toLowerCase())) {
      return contact
    } else {
      return ''
    }
  })

  console.log(persons, filterName, filteredContactsNew, filteredContacts, filteredContactsNew === filteredContacts); 
  // debugger
  if (!filteredContactsNew[0]) {filteredContactsNew = filteredContacts}
  console.log(persons, filterName ,filteredContactsNew, filteredContacts, filteredContactsNew === filteredContacts);
  // debugger
  return (
    <>
      <div>
        search contacts: <input value={filterName} onChange={(e) => {          
          setFilterName(e.target.value)}} />
        {filteredContactsNew.map((contact, id) => <p key={contact.name + id}>{contact.name} {contact.number}</p>)}
      </div>
      
    </>
  )
}

const NewContact = ({persons, newName, newNumber, setPersons, setNewName, setNewNumber}) => {
  return (
    <>
      <form onSubmit={(e) => {
        e.preventDefault()
        let addedContacts = persons.map((contact) => contact.name.toLowerCase()) //Also checks if same name is given in Lowercase letters
        if (!(addedContacts.includes(newName.toLowerCase()))) {
          const newContact = {
            name: newName,
            number: newNumber
          }
          setPersons(persons.concat(newContact))
          setNewName('a new contact...')
          setNewNumber(0)
        } else {
          alert(`${newName} is already added to phonebook`)
        }

      }} >

        <div>
          name: <input value={newName} onChange={(e) => {
            setNewName(e.target.value)
          }} />
        </div>

        <div>
          number: <input type="tel" value={newNumber} onChange={(e) => {
            setNewNumber(e.target.value)
          }} />
        </div>

        <div>
          <Button text='add' />
        </div>
        </form>
    </>
  )
}

const SavedNumbers = ({people}) => {
 
  return (<>{people.map((contact, id) => <p key={contact.name + id}>{contact.name} {contact.number}</p>)}</>)

}


const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>


export default App