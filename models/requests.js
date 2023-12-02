import mongoose, { Schema, model, models } from 'mongoose';

const RequestSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        status: {
            type: String,
            enum: ['Pending', 'Successful'],
            default: 'Pending',
        },
        paymentType: {
            type: String,
            enum: ['Annual Membership', 'Guest Ticket'],
            required: true,
        },
        paymentReference: {
            type: String,
        },
        email: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);

const Request = models.Request || model("Request", RequestSchema);

export default Request;