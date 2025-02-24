"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"

const tailWindBtnClasses = "px-4 py-2 mx-2 bg-blue-500 text-white rounded hover:bg-blue-600 active:bg-blue-700 focus:outline-none focus:ring focus:ring-blue-300"
const tailWindInputClasses = "px-1 py-1 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"

const apiUrl = process.env.NEXT_PUBLIC_API_URL

export default function EditUser() {
    const params = useParams()
    const router = useRouter()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")

    useEffect(() => {
        if (params.id) {
            getUser()
        }
    }, [params.id])

    const getUser = async () => {
        const { id } = params
        const res = await fetch(`${apiUrl}/users/${id}/api`, {
            cache: 'no-store'
        })
        if (res.ok) {
            const {user} = await res.json()
            setName(user.name)
            setEmail(user.email)
        }
    }

    const handleSubmit = async(e: React.FormEvent) => {
        try {
        e.preventDefault()
        const data = {
            name,
            email
        }
        const { id } = params;
        const res = await fetch(`${apiUrl}/users/${id}/api`,  {
            method: "PATCH",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (res.ok) {
            router.back()       
        }
        } catch (error) {
            console.error(error)
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="my-2">
                <label className="me-2" id="name">Name</label>
                <input className={tailWindInputClasses} type="text" name="name" value={name} onChange={e => setName(e.target.value)} />
            </div>
            <div className="my-2">
                <label className="me-2" id="email">Email</label>
                <input className={tailWindInputClasses} type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} />
            </div>
            <button type="submit" className={tailWindBtnClasses}>Update</button>
        </form>
    )
}