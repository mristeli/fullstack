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

  const [ message, setMessage ] = useState(null)

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

  const showSuccessMessage = text => {
    setMessage({
      text,
      className: 'success'
    })
    setTimeout(setMessage, 5000, null)
  }
  const showErrorMessage = text => {
    setMessage({
      text,
      className: 'error'
    })
    setTimeout(setMessage, 5000, null)
  }

  const createOrUpdateContact = (event) => {
    event.preventDefault();
    const contactToUpdate = persons.find(findByName(newName))
    if (!contactToUpdate) {
      contactService.create({ 
        name: newName, 
        number: newNumber
      }).then(returnedContact => {
        showSuccessMessage(`Added ${newName}`)
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
        showSuccessMessage(`Updated ${newName}`)
        setPersons(persons.map(e => e.id !== contactToUpdate.id 
          ? e : updatedContact))
      }).catch(error => {
        showErrorMessage(`Note ${newName} was already removed from server`)
        setPersons(persons.filter(p => p.id !== contactToUpdate.id))
      })
    } 
  }
  
  const deleteContact = contact => {
    if(window.confirm(`Delete ${contact.name}?`)) {
      contactService
        .delete(contact.id)
        .then(setPersons(persons.filter(e => e.id !== contact.id)))
        .catch(error => {
          showErrorMessage(`Note ${newName} was already removed from server`)
          setPersons(persons.filter(e => e.id !== contact.id))
      })
    }
  }

  const Notification = ({ message }) => {
    if(message === null) return null
    return (
      <div className={message.className}>
        {message.text}
      </div>
    )
  }  

  return (
    <div>
      <h2>Phonebook</h2>
      
      <Notification message={message} />
      
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