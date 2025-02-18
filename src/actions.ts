"use server"

import { revalidatePath } from "next/cache"
import User from "./app/users/api/models/User"

export const createUser = async (formData: FormData) => {
    try {
        const name = formData.get("name")
        const email = formData.get("email")
        const res = await User.insertOne({
            name,
            email
        })
        console.log("res==============", res)
        revalidatePath('/users')
        return
    } catch (error) {
        console.log("Something went wrong")
    }
}