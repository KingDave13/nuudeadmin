import { connectToDb } from "@utils/database";
import Member from "@models/members";

export const GET = async (req) => {
    try {
        await connectToDb();

        const membersList = await Member.find({}).sort({ _id: -1 });
        
        return new Response(JSON.stringify({ success: true, data: membersList }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
        });
    }
};