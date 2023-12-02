import mongoose, { Schema, model, models } from 'mongoose';

const MemberSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            unique: true,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        paymentType: {
            type: String,
            enum: ['Annual Membership'],
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);

const Member = models.Member || model("Member", MemberSchema);

export default Member;