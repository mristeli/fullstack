import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import AddContact from './components/AddContact'
import Contacts from './components/Contacts'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([])

  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filter, setFilter] = useState('')

  useEffect(() => {
    contactService.getAll()
      .then(data => setPersons(data))
  }, [])

  const findByName = (name) => 
    (entry) => entry.name === name  

  const handleNameChange = (event) => 
    setNewName(event.target.value)
  const handleNumberChange = (event) => 
    setNewNumber(event.target.value)
  const handleFilterChange = (event) => 
    setFilter(event.target.value.toLowerCase())

  const createOrUpdateContact = (event) => {
    event.preventDefault();
    const contactToUpdate = persons.find(findByName(newName))
    if (!contactToUpdate) {
      contactService.create({ 
        name: newName, 
        number: newNumber
      }).then(returnedContact => {
        setPersons(persons.concat(returnedContact))
        setNewNumber('')
        setNewName('')
      })
    } else if (window.confirm(`${newName} is already added to phonebook, 
      replace the old number with the new one?`)) {
      contactService.update(contactToUpdate.id, {
        name: newName,
        number: newNumber 
      }).then(updatedContact => {
        setPersons(persons.map(e => e.id !== contactToUpdate.id 
          ? e : updatedContact))
      })
    } 
  }
  
  const deleteContact = contact => {
    if(window.confirm(`Delete ${contact.name}?`)) {
      contactService
        .delete(contact.id)
        .then(setPersons(persons.filter(e => e.id !== contact.id)))
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
        addNewContact={createOrUpdateContact}
      />
      <h3>Contacts</h3>
      <Contacts filter={filter} contacts={persons} deleteRef={deleteContact}/>
    </div>
  )

}

export default App