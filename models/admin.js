import mongoose, { Schema, model, models } from 'mongoose';

const AdminSchema = new Schema(
    {   
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
        email: {
			type: String,
			required: true,
			max: 50,
			unique: true
		},
		password: {
			type: String,
			required: true,
			min: 8
		},
		resetToken: {
			type: String,
			default: null,
		},
    },

    { timestamps: true }
);

const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;