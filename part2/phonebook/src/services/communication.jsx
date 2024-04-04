import axios from 'axios'

const personsUrl = 'http://localhost:3001/api/persons'

const getPersons = () => {
    return axios.get(personsUrl).then(response => response.data)
}
  
const createContact = (newPerson) => {
    return axios.post(personsUrl, newPerson).then(response => response.data)
}
  
const updateContact = (id, newPerson) => {
    return axios.put(`${personsUrl}/${id}`, newPerson).then(response => response.data)
}

const deleteContact = (id) => {
    return axios.delete(`${personsUrl}/${id}`)
}
  
export default {getPersons, createContact, updateContact, deleteContact}