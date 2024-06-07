'use client';

import { useRouter } from 'next/navigation';

const MessagePage = ({ params }) => {
  const router = useRouter();
  const { id } = params;

  return (
    <div>
      <h1>Send a message to user {id}</h1>
      {/* Add your message form or component here */}
    </div>
  );
};

export default MessagePage;