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
        const response = await fetch('/api/requests');
        if (!response.ok) {
          // Handle HTTP errors
          console.error('Failed to fetch:', response.status, response.statusText);
          return;
        }
        const result = await response.json();
        if (result.success) {
          setFormData(result.data);
        } else {
          console.error('API returned an error:', result.message);
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
       <div className="overflow-x-auto">
        <table className="min-w-full bg-gray-800 text-white">
          <thead>
            <tr>
              <th className="px-4 py-2">Full Name</th>
              <th className="px-4 py-2">Payment Status</th>
              <th className="px-4 py-2">Payment Type</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {formData.map(data => (
              <tr key={data._id}>
                <td className="border px-4 py-2">{`${data.firstName} ${data.lastName}`}</td>
                <td className="border px-4 py-2">{data.paymentStatus}</td>
                <td className="border px-4 py-2">{data.paymentType}</td>
                <td className="border px-4 py-2">{data.email}</td>
                <td className="border px-4 py-2">
                  {/* Replace the following buttons with actual action handlers */}
                  <button className="text-blue-500">Info</button>
                  <button className="text-blue-500">Contact</button>
                  <button className="text-red-500">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </section>
  );
};

export default SectionWrapper(RequestsPage, '');