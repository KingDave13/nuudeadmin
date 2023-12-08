import { connectToDb } from "@utils/database";
import Admin from "@models/admin";
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

export const POST = async (req) => {
    try {
        await connectToDb();

        const { email, password } = await req.json();

        const salt = await bcrypt.genSalt();
		const passwordHash = await bcrypt.hash(password, salt);

        const newAdminData = {
            userId: new mongoose.Types.ObjectId(),
            email: email,
            password: passwordHash,
        };

        const newAdmin = new Admin(newAdminData);
        await newAdmin.save();

        return new Response(JSON.stringify(newAdmin), {
            status: 201,
        });
    } catch (error) {
        console.error('Error creating admin:', error);
        return new Response('Failed to create admin.', {
            status: 500,
        });
    }
};
