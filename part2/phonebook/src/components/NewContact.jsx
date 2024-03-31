import serverDB from '../services/communication'

const NewContact = ({persons, newName, newNumber, setPersons, setNewName, setNewNumber}) => {

    return (
      <>
        <form onSubmit={(e) => {
          e.preventDefault()
          // Remove multiple spaces with single space
          newName = newName.replace(/\s+/g, ' ');
          // Remove trailing spaces before and after name
          newName = newName.trim()
          let addedContacts = persons.map((contact) => contact.name.toLowerCase()) //Also checks if same name is given in Lowercase letters
          let addedNumbers = persons.map((contact) => contact.number)
          let addedIDs = persons.map((contact) => contact.id)
          if (!(addedContacts.includes(newName.toLowerCase()))) {
            const newContact = {
              name: newName,
              number: newNumber
            }
            serverDB
              .createContact({...newContact})
              .then((response) => {newContact.id = response.id})
              .then(() => {
                setPersons(persons.concat(newContact)) 
                setNewName('a new contact...')
                setNewNumber(0)
              })                                   
          } else if(addedContacts.includes(newName.toLowerCase()) && !(addedNumbers.includes(newNumber))) {
              if (confirm(`${newName} is already added to phonebook, replace the old name and number with the new ones?`)) {
                const newContact = {
                  name: newName,
                  number: newNumber
                }
                serverDB
                  .updateContact(addedIDs[addedContacts.indexOf(newName.toLowerCase())], newContact)
                  .then((response) => {newContact.id = response.id})
                  .then(() => {
                    let updatedPersons = [...persons]
                    updatedPersons[addedContacts.indexOf(newName.toLowerCase())] = newContact
                    setPersons(updatedPersons) 
                    setNewName('a new contact...')
                    setNewNumber(0)
                  })   
              }
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

const Button = ({text}) => <button>{text}</button>

export default NewContact