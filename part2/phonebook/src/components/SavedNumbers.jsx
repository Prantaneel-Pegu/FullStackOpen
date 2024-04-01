/* eslint-disable no-unused-vars */
import serverDB from '../services/communication'

const SavedNumbers = ({people, setPersons, setMessage}) => {

    return (
    <>
        {people.map((contact, id) => 
        <div key={contact.name + id + 'container'} style={{margin: '.75em 0'}}>
            <p key={contact.name + id} style={{display: "inline"}}>{contact.name}&nbsp;&nbsp;{contact.number}&nbsp;&nbsp;&nbsp;&nbsp;</p> 
            <button key={contact.name + id + 'deleteButton'} onClick={() => {
                if (confirm(`Delete ${contact.name}?`)){
                    let updatedPeople = [...people];
                    updatedPeople.splice(id, 1)
                    serverDB.deleteContact(contact.id).then(() => {
                        setPersons(updatedPeople)
                        setMessage(`Deleted ${contact.name}`)
                    }).catch(() => {
                        setMessage(`Error: ${contact.name}'s information was not found on server`)
                      }) 
                }
            }}>delete</button>
        </div>
        )}
    </>
    )
  
}

export default SavedNumbers