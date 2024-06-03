'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SectionWrapper from "@hoc/SectionWrapper";

const RequestsPage = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <div className="md:min-h-[800px] mt-20">
      <h1 className="text-white">Requests Page</h1>
      {/* Your content for authenticated users */}
    </div>
  );
};

export default SectionWrapper(RequestsPage, '');