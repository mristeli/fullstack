import React from 'react'


const Contact = ({name, number}) => (
  <p>{name} {number}</p>
)

const toShow = (filter, contacts) => contacts.filter(({name, number}) => 
  name.toLowerCase().search(filter) !== -1
  || number.search(filter) !== -1)

const rows = (filter, contacts) => 
  toShow(filter, contacts).map(c => <Contact 
      key={c.name} name={c.name} number={c.number} />)
   
const Contacts = ({filter, contacts}) => {
  return <div> 
      {rows(filter, contacts)}
    </div>
}

export default Contacts