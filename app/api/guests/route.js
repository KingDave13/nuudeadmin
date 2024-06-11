import { connectToDb } from "@utils/database";
import Guest from "@models/guests";
import Member from "@models/members";

export const GET = async (req) => {
    try {
        await connectToDb();

        const guestsList = await Guest.find({}).sort({ _id: -1 });
        const membersList = await Member.find({}).sort({ _id: -1 });

        const combinedList = [...membersList, ...guestsList];

        return new Response(JSON.stringify({ success: true, data: combinedList }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching data:', error);
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
        });
    }
};