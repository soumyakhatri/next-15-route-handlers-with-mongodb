"use client"
import Link from "next/link"
import { useEffect, useState } from "react"

const tailWindBtnClasses = "px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
const tailWindDeleteBtnClasses = "px-4 py-2 mx-2 bg-red-500 text-white rounded hover:bg-pink-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
const tailWindInputClasses = "px-1 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"

export default function UsersPage() {
  const [users, setUsers] = useState<{_id: string, name: string, email: string}[]>([])
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")

  useEffect(() => {
    getUsers()
  }, [])

  const getUsers = async () => {
    const res = await fetch("http://localhost:3001/users/api")
    if (res.ok) {
      const users = await res.json()
      setUsers(users)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault()
      const data = {
        name,
        email
      }
      const res = await fetch("http://localhost:3001/users/api", {
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
      const res = await fetch(`http://localhost:3001/users/${id}/api`, {
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
    <div>
      <h1 className="font-bold" >Users</h1>
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
