import React, { useState } from 'react'

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '6666-6666' }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')

  const findByName = (name) => 
    (entry) => entry.name === name  

  const handleNameChange = (event) => setNewName(event.target.value)
  const handleNumberChange = (event) => setNewNumber(event.target.value)

  const addNewEntry = (event) => {
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

  const rows = () => 
    persons.map(p => <p key={p.name}>{p.name} {p.number}</p>)

  return (
    <div>
      <h2>Phonebook</h2>
      <form>
        <div>
          name: <input 
            value={newName} 
            onChange={handleNameChange} 
              />
        </div>
        <div>
          number: <input 
            value={newNumber} 
            onChange={handleNumberChange} 
              />
        </div>
        <div>
          <button type="submit" onClick={addNewEntry}>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {rows()}
    </div>
  )

}

export default App