import mongoose, { Schema, model, models } from 'mongoose';

const GuestSchema = new Schema(
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
            enum: ['Annual Membership', 'Guest Ticket'],
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);

const Guest = models.Guest || model("Guest", GuestSchema);

export default Guest;