import { NextRequest } from "next/server";
import User from "../../api/models/User";
import { ObjectId } from "mongodb";
import { connectToMongoose } from "@/lib/mongodb";

export async function DELETE(_req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToMongoose();
        const { id } = await params
        const result = await User.deleteOne({
            _id: new ObjectId(id)
        })
        
        if (result.deletedCount === 0) {
            return Response.json({ message: "User not found" }, { status: 404 })
        }
        
        return Response.json({ message: "Deleted Successfully" }, { status: 200 })
    } catch (error) {
        return Response.json({ 
            message: "Failed to delete user",
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
    try {
        await connectToMongoose();
        const body: { name: string, email: string } = await req.json()
        const { id } = await params
        
        const updatedUser = await User.findOneAndUpdate(
            { _id: new ObjectId(id) },
            { $set: { name: body.name, email: body.email } },
            { new: true }
        )

        if (!updatedUser) {
            return Response.json({ message: "User not found" }, { status: 404 })
        }

        return Response.json({
            message: "User updated successfully",
            user: updatedUser
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            message: "Failed to update user",
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}

export async function GET(_request: NextRequest, {params}: {params: Promise<{id: string}>}) {
    try {
        await connectToMongoose();  
        const {id} = await params
        const user = await User.findOne({
            _id: new ObjectId(id)
        })
        
        if (!user) {
            return Response.json({ message: "User not found" }, { status: 404 })
        }
        
        return Response.json({
            user,
            message: "User fetched successfully"
        }, { status: 200 })
    } catch (error) {
        return Response.json({
            message: "Failed to fetch user",
            error: error instanceof Error ? error.message : 'Unknown error'
        }, { status: 500 })
    }
}