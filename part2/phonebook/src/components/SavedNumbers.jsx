const SavedNumbers = ({people}) => {
 
    return (<>{people.map((contact, id) => <p key={contact.name + id}>{contact.name} {contact.number}</p>)}</>)
  
}

export default SavedNumbers