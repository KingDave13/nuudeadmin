import mongoose, { Schema, model, models } from 'mongoose';

const FormDataSchema = new Schema(
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
        email: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        birthdate: {
            type: String,
            required: true,
        },
        gender: {
            type: String,
            required: true,
        },
        employer: {
            type: String,
            required: true,
        },
        occupation: {
            type: String,
            required: true,
        },
        instagram: {
            type: String,
            required: true,
        },
        twitter: {
            type: String,
            required: true,
        },
        facebook: {
            type: String,
            required: true,
        },
        turnons: {
            type: String,
            required: true,
        },
        trait: {
            type: String,
            required: true,
        },
        contribution: {
            type: String,
            required: true,
        },
        mode: {
            type: String,
            required: true,
        },
        paymentType: {
            type: String,
            enum: ['Guest Ticket', 'Membership'],
            required: true,
        },
        reference: {
            type: String,
            required: true,
        },
    },

    { timestamps: true }
);

const FormData = models.FormData || model("FormData", FormDataSchema);

export default FormData;