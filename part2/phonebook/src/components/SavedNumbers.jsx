/* eslint-disable no-unused-vars */
import { useEffect } from 'react';
import serverDB from '../services/communication'

const SavedNumbers = ({people, setPersons}) => {

    return (
    <>
        {people.map((contact, id) => 
        <div key={contact.name + id + 'container'} style={{margin: '.75em 0'}}>
            <p key={contact.name + id} style={{display: "inline"}}>{contact.name} {contact.number}&nbsp;&nbsp;&nbsp;&nbsp;</p> 
            <button key={contact.name + id + 'deleteButton'} onClick={() => {
                let updatedPeople = [...people];
                updatedPeople.splice(id, 1)
                serverDB.deleteContact(contact.id).then(() => {setPersons(updatedPeople)})
                setPersons(updatedPeople)
            }}>delete</button>
        </div>
        )}
    </>
    )
  
}

export default SavedNumbers