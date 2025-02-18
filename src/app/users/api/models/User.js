import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, unique: true, required: true },
    },
    { timestamps: true },
    { collection: "users" } // Explicitly set collection name
);

export default mongoose.models.User || mongoose.model("User", UserSchema);
