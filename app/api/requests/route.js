import { connectToDb } from "@utils/database";
import formData from "@models/formData";

export default async function handler(req, res) {
    await connectToDb();
  
    try {
      const FormData = await formData.find({});
      res.status(200).json({ success: true, data: FormData });
    } catch (error) {
      res.status(400).json({ success: false });
    }
  }