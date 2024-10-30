import React, {useContext} from 'react'
import ReactDOM from 'react-dom'
import {UserContext} from './index.js'

export default function UserTable() {
  const {filteredData, isErr, isLight} = useContext(UserContext)

  return (
    <>
      <table className={`c-table-container ${isLight ? 'light' : 'dark'}`}>
        <thead>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Company Name</th>
        </thead>
        <tbody>
          {filteredData &&
            filteredData?.map((val) => {
              return (
                <>
                  <tr key={val.id}>
                    <td>{val?.id}</td>
                    <td>{val?.name}</td>
                    <td>{val?.email}</td>
                    <td>{val?.company?.name}</td>
                  </tr>
                </>
              )
            })}
        </tbody>
      </table>
    </>
  )
}
