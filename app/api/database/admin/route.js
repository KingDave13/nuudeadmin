import { connectToDb } from "@utils/database";
import Admin from "@models/admin";

let adminDataInserted = false;

export const POST = async (req) => {
    try {
        await connectToDb();

        if (adminDataInserted) {
            return new Response('Admin data already inserted.', {
                status: 400,
            });
        }

        const newAdminData = {
            userId: new mongoose.Types.ObjectId(),
            username: process.env.ADMIN_USERNAME,
            email: process.env.ADMIN_EMAIL,
            password: process.env.ADMIN_PASSWORD,
        };

        const newAdmin = new Admin(newAdminData);
        await newAdmin.save();

        adminDataInserted = true;

        return new Response(JSON.stringify(newAdmin), {
            status: 201,
        });
    } catch (error) {
        return new Response('Failed to create admin.', {
            status: 500,
        });
    }
};
