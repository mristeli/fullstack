import React, { useState } from 'react'
import Filter from './components/Filter'
import AddContact from './components/AddContact'
import Contacts from './components/Contacts'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456' },
    { name: 'Ada Lovelace', number: '39-44-5323523' },
    { name: 'Dan Abramov', number: '12-43-234345' },
    { name: 'Mary Poppendieck', number: '39-23-6423122' }
  ])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  const findByName = (name) => 
    (entry) => entry.name === name  

  const handleNameChange = (event) => 
    setNewName(event.target.value)
  const handleNumberChange = (event) => 
    setNewNumber(event.target.value)
  const handleFilterChange = (event) => 
    setFilter(event.target.value.toLowerCase())

  const addNewContact = (event) => {
    event.preventDefault();
    if(persons.find(findByName(newName))) {
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat({ 
        name: newName, 
        number: newNumber
      }))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter value={filter} onChange={handleFilterChange} />
      <h3>Add a new</h3>
      <AddContact
        newName={newName} handleNameChange={handleNameChange}
        newNumber={newNumber} handleNumberChange={handleNumberChange}
        addNewContact={addNewContact}
      />
      <h3>Contacts</h3>
      <Contacts filter={filter} contacts={persons} />
    </div>
  )

}

export default App