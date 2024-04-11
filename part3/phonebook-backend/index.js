require('dotenv').config()
const express = require('express')
const cors = require('cors')
const Person = require('./models/Person')
const morgan = require('morgan')

const app = express()

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :POST-data'))

morgan.token('POST-data', (req, res) => JSON.stringify(req.body))

const PORT = process.env.PORT || 3001

const getPersons = async () => await Person.find({})

const generateId = () => Math.round(Math.random() * Math.random() * Math.random() * Math.random() * 1000000)

const errorHandler = (err, req, res, next) => {
  console.log(err.message);
  if (err.name === 'CastError') {
    return res.status(400).send({ Error: 'Malformatted or wrong id' })
  } else if (err.name === 'ValidationError') {
    return res.status(400).json({ error: err.message })
  }

  next(err)
}


app.get('/api/persons', (req, res, next) => {
  getPersons()
    .then(persons => res.json(persons))
    .catch(err => next(err))
})


app.get('/info', (req, res, next) => {
  getPersons()
    .then(persons => {
      const date = new Date()
      res.send(`<p>Phonebook has info for ${persons.length} people</p>
                  <br/>
                  ${date}`)
    .catch(err => next(err))
  })
})


app.get('/api/persons/:id', (req, res, next) => {
  getPersons()
    .then(persons => {
      const id = req.params.id
      const requestedId = persons.find((contact) => {console.log(contact.id, id);;return contact.id === id})
    
      if ( requestedId === undefined) {
        res.status(404).end('<p>The requested resource was not found on the server.</p><p style="color: red">Status code: 404</p>')
      } else {
        res.json(requestedId)
      }
    })
    .catch(err => next(err))
  } 
)


app.post('/api/persons/', (req, res, next) => {
  getPersons()
  .then(persons => {

    let newPerson = {...req.body, id: generateId()} // Generate an id as failsafe, normally mongodb will auto generate for us
    let personNames = persons.map((person) => person.name.toLowerCase())
  
    if (Object.hasOwn(newPerson, 'name') && Object.hasOwn(newPerson, 'number') && !personNames.includes(newPerson.name.toLowerCase())) {   
      const savePerson = new Person({...newPerson})
      savePerson.save().then(updatedNewPerson => {
        updatedNewPerson.id = updatedNewPerson._id.toString()
        delete updatedNewPerson._id
        delete updatedNewPerson.__v

        persons.push(updatedNewPerson)
        res.json(updatedNewPerson)
      })
      .catch(err => next(err))

    } else {
      res.status(400).end('<p>The received request was malformed. Ensure your request object contains the "name" and "number" properties, and the name is not already present in /api/persons.</p><p style="color: red">Status code: 400</p>')
    }

  })
  .catch(err => next(err))
})


app.put('/api/persons/:id', (req, res, next) => {
  getPersons()
    .then(persons => {
      const id = req.params.id
      let updatedContactToSend = req.body

      Person.findByIdAndUpdate(id, updatedContactToSend, {new: true, runValidators: true})
        .then(updatedContact => {
          res.json(updatedContact)
        })
        .catch(err => next(err))
    })
    .catch(err => next(err))
})


app.delete('/api/persons/:id', (req, res, next) => {
  getPersons()
  .then(persons => {
    const id = req.params.id

    let personIds = persons.map((person) => person.id)
    if (!personIds.includes(id)) {
      res.status(404).end('<p>The requested resource was not found on the server.</p><p style="color: red">Status code: 404</p>')
    }
  
    let personToDelete = personIds.indexOf(id)
  
    if (personToDelete !== -1) {
      Person.findByIdAndDelete(id).then(result => {
        persons.splice(personToDelete, 1)
        res.send('<p style="color: green">The requested delete operation completed successfully.</p>')
      })
    } else {
      res.status(404).end('<p>The requested resource was not found on the server.</p><p style="color: red">Status code: 404</p>')
    }
  })
  .catch(err => next(err))
})


app.use(errorHandler)


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})