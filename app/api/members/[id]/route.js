import { connectToDb } from '@utils/database';
import Member from '@models/members';

export const GET = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDb();

    const member = await Member.findById(id);
    if (!formData) {
      return new Response(JSON.stringify({ success: false, message: 'Member not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, data: member }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error fetching Member:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
      status: 500,
    });
  }
};

export const DELETE = async (req, { params }) => {
  const { id } = params;

  try {
    await connectToDb();

    const member = await Member.findByIdAndDelete(id);
    if (!member) {
      return new Response(JSON.stringify({ success: false, message: 'Member not found' }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify({ success: true, message: 'Member deleted successfully' }), {
      status: 200,
    });
  } catch (error) {
    console.error('Error deleting member:', error);
    return new Response(JSON.stringify({ success: false, message: 'Internal Server Error', error: error.message }), {
      status: 500,
    });
  }
};