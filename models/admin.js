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
			min: 5
		},
        username: {
            type: String,
            required: [true, 'Username is required!'],
            match: [/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/, "Username invalid, it should contain 8-20 alphanumeric letters and be unique!"]
        },
    },

    { timestamps: true }
);

const Admin = models.Admin || model("Admin", AdminSchema);

export default Admin;