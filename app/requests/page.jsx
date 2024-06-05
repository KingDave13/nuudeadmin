'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import SectionWrapper from "@hoc/SectionWrapper";

const RequestsPage = () => {
  const [formData, setFormData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch('/api/formdata');
        const result = await response.json();
        if (result.success) {
          setFormData(result.data);
        }
      } catch (error) {
        console.error('Failed to fetch form data:', error);
      }
    };

    fetchFormData();
  }, []);

  
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