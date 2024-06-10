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

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDb();

    const formData = await FormData.findByIdAndDelete(id);
    if (!formData) {
      return new Response(JSON.stringify({ success: false, message: 'Form data not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Form data deleted successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error deleting form data:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
      status: 500,
    });
  }
};

export const PATCH = async (req, { params }) => {
  const { id } = params;

  try {
      await connectToDb();
      const { paymentType } = await req.json();
      const formData = await FormData.findById(id);

      if (!formData) {
          return new Response(JSON.stringify({ success: false, message: 'Request not found' }), {
              status: 404,
          });
      }

      const NewModel = paymentType === 'Guest Ticket' ? Guest : Member;
      const newRecord = new NewModel(formData.toObject());
      await newRecord.save();
      await FormData.findByIdAndDelete(id);

      return new Response(JSON.stringify({ success: true, message: 'Request approved' }), {
          status: 200,
      });
  } catch (error) {
      console.error('Error approving request:', error);
      return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
          status: 500,
      });
  }
};