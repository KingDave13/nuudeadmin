import { connectToDb } from '@utils/database';
import FormData from '@models/formData';

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDb();

    const formData = await FormData.findById(id);
    if (!formData) {
      return new Response(JSON.stringify({ success: false, message: 'Form data not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, data: formData }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching form data:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
      status: 500,
    });
  }
};