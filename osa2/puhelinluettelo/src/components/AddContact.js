import React from 'react'

const AddContact = (
  {
    newName, handleNameChange,
    newNumber, handleNumberChange,
    addNewContact
  }) =>
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
      <button type="submit" onClick={addNewContact}>add</button>
    </div>
  </form>

export default AddContact