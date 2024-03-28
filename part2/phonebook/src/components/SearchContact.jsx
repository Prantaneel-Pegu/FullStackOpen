const SearchContact = ({persons, filterName, setFilterName}) => {

    let filteredContacts = persons.map((contact) => {
      if (filterName !== '' && contact.name.toLowerCase().includes(filterName.toLowerCase())) {
        return contact
      } else {
        return ''
      }
    })
  
    return (
      <>
        <div>
          search contacts: <input value={filterName} onChange={(e) => {          
            setFilterName(e.target.value)}} />
          {filteredContacts.map((contact, id) => <p key={contact.name + String(id)}>{contact.name} {contact.number} </p>)}
        </div>
        
      </>
    )
}

export default SearchContact