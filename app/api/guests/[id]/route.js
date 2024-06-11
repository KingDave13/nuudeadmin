import { connectToDb } from '@utils/database';
import Guest from '@models/guests';

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDb();

    const guest = await Guest.findById(id);
    if (!guest) {
      return new Response(JSON.stringify({ success: false, message: 'Guest not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, data: guest }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching Guest:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDb();

    const guest = await Guest.findByIdAndDelete(id);
    if (!guest) {
      return new Response(JSON.stringify({ success: false, message: 'Guest not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Guest deleted successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error deleting guest:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
      status: 500,
    });
  }
};