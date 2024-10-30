import React, {createContext, useState, useEffect} from 'react'
import ReactDOM from 'react-dom'
import UserTable from './UserTable'
import axios from 'axios'
import './index.css'

export const UserContext = createContext(undefined)

function App() {
  const [data, setData] = useState()
  const [filteredData, setFilteredData] = useState()
  const [filterString, setFilterString] = useState('')
  const [isErr, setIsErr] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isLight, setIsLight] = useState(true)

  const createFilteredData = () => {
    if (filterString === '') {
      setFilteredData(data)
    } else {
      let outPutData = filteredData?.filter(
        (val) =>
          val.name.includes(filterString) || val.email.includes(filterString),
      )
      setFilteredData(outPutData)
    }
  }

  const getData = async () => {
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        setData(res.data)
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err)
        setIsLoading(false)
        setIsErr(true)
      })
  }

  useEffect(() => {
    getData()
  }, [])

  useEffect(() => {
    if (data?.length > 1) {
      createFilteredData()
    }
  }, [data])

  return (
    <>
      <input type="text" onChange={(e) => setFilterString(e.target.value)} />
      <button onClick={createFilteredData}>Search</button>
      <input type="radio" name="theme" onChange={() => setIsLight(true)} />
      <label>Light</label>
      <input type="radio" name="theme" onChange={() => setIsLight(false)} />
      <label>Dark</label>
      <UserContext.Provider value={{filteredData, isErr, isLight}}>
        {isLoading ? <>Loading...</> : <UserTable />}
      </UserContext.Provider>
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
