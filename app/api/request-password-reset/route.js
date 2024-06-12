import { connectToDb } from "@utils/database";
import Admin from "@models/admin";
import { v4 as uuidv4 } from 'uuid';

export const POST = async (req) => {
    try {
        await connectToDb();
        
        const { email } = await req.json();
        const admin = await Admin.findOne({ email });

        if (!admin) {
            return new Response(JSON.stringify({ message: 'Email not found' }), { status: 400 });
        }

        const resetToken = uuidv4();
        admin.resetToken = resetToken;
        await admin.save();

        return new Response(JSON.stringify({ resetToken }), { status: 200 });
    } catch (error) {
        console.error('Error generating reset token:', error);
        return new Response('Failed to generate reset token.', { status: 500 });
    }
};