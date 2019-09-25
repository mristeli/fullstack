import React from 'react'

const Contact = ({name, number, onClick }) => (
  <li>{name} {number} <button onClick={onClick}>delete</button></li>
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
  return <ul> 
      {rows(filter, contacts, deleteRef)}
    </ul>
}

export default Contacts