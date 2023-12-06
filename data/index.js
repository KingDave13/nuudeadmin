import mongoose from "mongoose";

export const Admin = [
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
        },
      username: "Nuude@admin",
      email: "admin@nuude.club",
      password: "admin@nuudeclub23",
    },
];