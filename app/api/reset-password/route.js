
import { connectToDb } from "@utils/database";
import Admin from "@models/admin";
import bcrypt from 'bcrypt';

export const POST = async (req) => {
    try {
        await connectToDb();
        
        const { token, newPassword } = await req.json();
        const admin = await Admin.findOne({ resetToken: token });

        if (!admin) {
            return new Response(JSON.stringify({ message: 'Invalid or expired token' }), { status: 400 });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 10);
        admin.password = hashedPassword;
        admin.resetToken = null;
        await admin.save();

        return new Response(JSON.stringify({ message: 'Password reset successfully' }), { status: 200 });
    } catch (error) {
        console.error('Error resetting password:', error);
        return new Response('Failed to reset password.', { status: 500 });
    }
};