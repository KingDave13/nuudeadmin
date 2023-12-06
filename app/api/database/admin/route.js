import { connectToDb } from "@utils/database";
import Admin from "@models/Admin";

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
            username: "Nuude@admin",
            email: "admin@nuude.club",
            password: "admin@nuudeclub23",
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
