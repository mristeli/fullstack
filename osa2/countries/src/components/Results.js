import React from 'react'

const match = (filter, countries) => countries.filter((c) =>
  c.name.toLowerCase().search(filter.toLowerCase()) !== -1)
   
const Results = ({filter, countries, showCountry}) => {
  const matched = (filter.trim() !== '') ? match(filter, countries) : []  

  if(matched.length > 10) {
    return <p>
      Too many matches, specify another filter
    </p>
  } else if (matched.length > 1) {
    return <div>
      {matched.map((m) => <p key={m.alpha3Code}>{m.name} <button 
        onClick={() => showCountry(m)}>show</button></p>)}
    </div>
  } else if (matched.length === 1) {
    showCountry(matched[0])
  }
  
  return <div></div>
}

export default Results