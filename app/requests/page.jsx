'use client';


import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const RequestsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session) {
    router.replace("/");
    return null;
  }

  return (
    <div>
      <h1 className="text-white">Requests Page</h1>
      {/* Your content for authenticated users */}
    </div>
  );
};

export default RequestsPage;