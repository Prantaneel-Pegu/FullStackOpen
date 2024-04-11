require('dotenv').config()
const mongoose = require('mongoose')

const url = process.env.MONGODB_URI

mongoose.set('strictQuery', false)

console.log('connecting to', url)
mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 3,
    required: true
  },
  number: {
    type: String,
    minLength: 8,
    validate: {
      validator: person => {
        return /\d\d-\d\d\d\d\d\d+/.test(person) || /\d\d\d-\d\d\d\d\d+/.test(person)
      }
  }}
})

personSchema.set('toJSON', {
  transform: (original, returnedDocument) => {
    returnedDocument.id = returnedDocument._id.toString()
    delete returnedDocument._id
    delete returnedDocument.__v
  }
})

module.exports = mongoose.model('Person', personSchema)