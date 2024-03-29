
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

const Button = ({text}) => <button>{text}</button>

export default NewContact