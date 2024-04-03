const express = require('express')
var morgan = require('morgan')

const app = express()

app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST-data'))

morgan.token('POST-data', (req, res) => JSON.stringify(req.body))

const PORT = 3005

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    },
    { 
      "id": 5,
      "name": "Mary IS NOT Poppendieck", 
      "number": "3913123-23-6423122"
    }
]

const generateId = () => Math.round(Math.random() * Math.random() * Math.random() * Math.random() * 1000000)


app.get('/api/persons', (req, res) => {
  res.json(persons)
})


app.get('/info', (req, res) => {
  const date = new Date()
  res.send(`<p>Phonebook has info for ${persons.length} people</p>
              <br/>
              ${date}`)
})


app.get('/api/persons/:id', (req, res) => {
  const id = Number(req.params.id)
  const requestedId = persons.find((contact) => contact.id === id)

  if ( requestedId === undefined) {
    res.status(404).end('<p>The requested resource was not found on the server.</p><p style="color: red">Status code: 404</p>')
  } else {
    res.json(requestedId)
  } 
})


app.post('/api/persons/', (req, res) => {

  let newPerson = {...req.body, id: generateId()} 
  let personNames = persons.map((person) => person.name.toLowerCase())

  if (Object.hasOwn(newPerson, 'name') && Object.hasOwn(newPerson, 'number') && !personNames.includes(newPerson.name.toLowerCase())) {   
    persons.push(newPerson)
    res.send('<p style="color: green">The requested resource was added successfully.</p>')
  } else {
    res.status(400).end('<p>The received request was malformed. Ensure your request object contains the "name" and "number" properties, and the name is not already present in /api/persons.</p><p style="color: red">Status code: 204</p>')
  }
})


app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id

  if (id > persons.length) {
    res.status(404).end('<p>The requested resource was not found on the server.</p><p style="color: red">Status code: 404</p>')
  }  

  persons.splice(id - 1, 1)
  res.send('<p style="color: green">The requested delete operation completed successfully.</p>')
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})