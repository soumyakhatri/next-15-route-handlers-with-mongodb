"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

const tailWindBtnClasses = "px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
const tailWindDeleteBtnClasses = "px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-pink-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
const tailWindInputClasses = "px-1 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function UsersPage() {
  const [users, setUsers] = useState<{_id: string, name: string, email: string}[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [searchText, setSearchText] = useState("")

  const getUsers = async () => {
    try {
      const res = await fetch(`${apiUrl}/users/api?query=${searchText}`)
      if (res.ok) {
        const users = await res.json()
        if(users && Array.isArray(users)){
          setUsers(users)
        } else {
          setUsers([])
        }
      }
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getUsers()
  }, [searchText])

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      const data = {
        name,
        email
      }
      const res = await fetch(`${apiUrl}/users/api`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
      if (res.ok) {
        setEmail("")
        setName("")
        getUsers()
      } else {
        throw new Error("Somthing went wrong")
      }
    } catch (error) {
      console.log("Error:", error)
    }
  }

  const handleDeleteUser = async (id: string) => {
    try {
      const res = await fetch(`${apiUrl}/users/${id}/api`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
      if (res.ok) {
        getUsers()
      } else {
        throw new Error("Somthing went wrong")
      }
    } catch (error) {
      console.log("Error:", error)
    }
  }

  return (
    <div className="ms-2 mt-4">
      <h1 className="font-bold" >Users</h1>
      <input type="search" className={tailWindInputClasses}  value={searchText} onChange={e=> setSearchText(e.target.value)}/>
      <ul>
        {users.map((user) => (
          <li key={user._id} className="my-2">
            {user.name} - {user.email}
            <button onClick={() => handleDeleteUser(user._id)} className={tailWindDeleteBtnClasses}>Delete</button>
            <Link href={`/users/${user._id}`} className={tailWindBtnClasses}>Edit</Link>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <div className="my-2">
          <label className="me-2" id="name">Name</label>
          <input className={tailWindInputClasses} type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
        </div>
        <div className="my-2">
          <label className="me-2" id="email">Email</label>
          <input className={tailWindInputClasses} type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
        </div>
        <button type="submit" className={tailWindBtnClasses}>Add</button>
      </form>
    </div>
  );
}
