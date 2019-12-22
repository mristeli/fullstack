import React, { useState } from 'react'

const Authors = (props) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  const submit = async (e) => {
    e.preventDefault()
    
    await props.setBirth({
      variables: { name, born: parseInt(born) }
    })

    setName('')
    setBorn('')
  }

  if (!props.show) {
    return null
  }
  if(props.result.loading) {
    return <div>loading...</div>
  }
  const authors = props.result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <select
            onChange={({ target }) => setName(target.value)}>
            {authors.map(a => 
              <option value={a.name}  
                key={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born
          <input
            value={born} type="number"
            onChange={({ target }) => setBorn(target.value)}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors