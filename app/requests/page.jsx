'use client';

import { getSession, useSession } from "next-auth/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

const RequestsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const session = await getSession();
      if (session) {
        setLoading(false);
      } else {
        // Redirect to login if there is no active session
        window.location.href = "/";
      }
    };

    fetchSession();
  }, []);

  return (
    <div>
      <h1 className="text-white">Requests Page</h1>
      {/* Your content for authenticated users */}
    </div>
  );
};

export default RequestsPage;