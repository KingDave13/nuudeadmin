import { connectToDb } from "@utils/database";
import FormData from "@models/formData";

export const GET = async (req) => {
    try {
        await connectToDb();

        const formDataList = await FormData.find({});
        
        return new Response(JSON.stringify({ success: true, data: formDataList }), {
            status: 200,
        });
    } catch (error) {
        console.error('Error fetching data:', error); // Log the error for debugging
        return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
            status: 500,
        });
    }
};