'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import SectionWrapper from "@hoc/SectionWrapper";
import { AiOutlineInfoCircle, AiOutlineMail, AiOutlineDelete } from 'react-icons/ai';

const RequestsPage = () => {
  const [formData, setFormData] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchFormData = async () => {
      try {
        const response = await fetch('/api/requests');
        if (!response.ok) {
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
    flex items-center md:px-16 px-6">
      <div className="items-center w-full flex flex-col md:gap-12
      font-manierRegular">
        <div className='w-full'>
          <h1 className='text-secondary font-manierMedium md:text-[25px]
          ss:text-[25px] text-[19px]'>
            Membership/Guest Requests
          </h1>
        </div>
        
        <div className="w-full">
          <table className="w-full text-white">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b border-gray-700">Full Name</th>
                <th className="px-4 py-2 border-b border-gray-700">Payment Status</th>
                <th className="px-4 py-2 border-b border-gray-700">Payment Type</th>
                <th className="px-4 py-2 border-b border-gray-700">Email</th>
                <th className="px-4 py-2 border-b border-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {formData.map(data => (
                <tr key={data._id} className="hover:bg-gray-800">
                  <td className="border-t border-gray-700 px-4 py-2">{`${data.firstName} ${data.lastName}`}</td>
                  <td className="border-t border-gray-700 px-4 py-2">{data.paymentStatus}</td>
                  <td className="border-t border-gray-700 px-4 py-2">{data.paymentType}</td>
                  <td className="border-t border-gray-700 px-4 py-2">{data.email}</td>
                  <td className="border-t border-gray-700 px-4 py-2 flex justify-around">
                    <button className="text-blue-500"><AiOutlineInfoCircle /></button>
                    <button className="text-blue-500"><AiOutlineMail /></button>
                    <button className="text-red-500"><AiOutlineDelete /></button>
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

export default RequestsPage;