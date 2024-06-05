'use client';

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import SectionWrapper from "@hoc/SectionWrapper";

const RequestsPage = () => {
  
  const router = useRouter();

  return (
    <section className="md:min-h-[800px] ss:min-h-[620px] min-h-[650px] 
    mx-auto flex items-center">
      <div className='items-center w-full mx-auto flex flex-col 
      font-manierRegular'>
        <h1 className="text-white">Requests Page</h1>
        {/* Your content for authenticated users */}
      </div>
    </section>
  );
};

export default SectionWrapper(RequestsPage, '');