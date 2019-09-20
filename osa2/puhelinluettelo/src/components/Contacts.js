import React from 'react'

const Contact = ({name, number, onClick }) => (
  <p>{name} {number} <button onClick={onClick}>delete</button></p>
)

const toShow = (filter, contacts) => contacts.filter(({name, number}) => 
  name.toLowerCase().search(filter) !== -1
  || number.search(filter) !== -1)

const rows = (filter, contacts, deleteRef) => 
  toShow(filter, contacts).map(c => <Contact 
      key={c.id} 
      name={c.name} 
      number={c.number} 
      onClick={() => deleteRef(c)} />)
   
const Contacts = ({filter, contacts, deleteRef}) => {
  return <div> 
      {rows(filter, contacts, deleteRef)}
    </div>
}

export default Contacts