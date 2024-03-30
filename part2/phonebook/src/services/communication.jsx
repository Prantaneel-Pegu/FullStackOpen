import axios from 'axios'

const personsUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    return axios.get(personsUrl).then(response => response.data)
}
  
const create = (newPerson) => {
    return axios.post(personsUrl, newPerson)
}
  
const deleteContact = (id) => {
    return axios.delete(`${personsUrl}/${id}`).then(response => response.data)
}
  
export default {getPersons, create, deleteContact}