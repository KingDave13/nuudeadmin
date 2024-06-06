'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { AiOutlineInfoCircle, AiOutlineMail, AiOutlineDelete, AiOutlineDoubleLeft, AiOutlineLeft, AiOutlineRight, AiOutlineDoubleRight } from 'react-icons/ai';

const RequestsPage = () => {
  const [formData, setFormData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
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

  const totalRows = formData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const displayedRows = formData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handleFirstPage = () => {
    setCurrentPage(1);
  };

  const handleLastPage = () => {
    setCurrentPage(totalPages);
  };

  return (
    <section className="md:min-h-[800px] ss:min-h-[620px] min-h-[650px] 
    flex items-center md:px-16 px-6">
      <div className="items-center w-full flex flex-col md:gap-10 
      font-manierRegular">
        <div className='w-full'>
          <h1 className='text-secondary font-manierMedium md:text-[25px] 
          ss:text-[25px] text-[19px]'>
            Membership/Guest Requests
          </h1>
        </div>

        <div className="w-full">
          <div className="overflow-x-auto">
          <table className="w-full text-white">
              <thead className='text-textalt'>
                <tr>
                  <th className="py-4 px-4 text-left w-1/5">Full Name</th>
                  <th className="py-4 px-4 text-left w-1/5">Payment Status</th>
                  <th className="py-4 px-4 text-left w-1/5">Payment Type</th>
                  <th className="py-4 px-4 text-left w-1/5">Email</th>
                </tr>
              </thead>
              <tbody className=''>
                {displayedRows.map((data, index) => (
                  <tr key={data._id} 
                  className='hover:bg-gray-800 border-b border-textalt'>
                    <td className="px-4 py-3.5">{`${data.firstName} ${data.lastName}`}</td>
                    <td className="px-4 py-3.5">{data.paymentStatus}</td>
                    <td className="px-4 py-3.5">{data.paymentType}</td>
                    <td className="px-4 py-3.5">{data.email}</td>
                    
                    <td className="px-4 py-2 flex justify-around">
                      <button className="text-blue-500">
                        <AiOutlineInfoCircle />
                      </button>

                      <button className="text-blue-500">
                        <AiOutlineMail />
                      </button>

                      <button className="text-red-500">
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center mt-4">
            <div className="flex items-center">
              <span className="mr-2 text-white">Rows per page:</span>
              <select value={rowsPerPage} onChange={handleChangeRowsPerPage} className="bg-gray-800 text-white border border-gray-700 rounded-md px-2 py-1">
                {[10, 11, 12, 13, 14].map(num => (
                  <option key={num} value={num}>{num}</option>
                ))}
              </select>
            </div>
            <div className="flex items-center ml-6 text-white">
              <span>{`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, totalRows)} of ${totalRows}`}</span>
              <button onClick={handleFirstPage} className="ml-4 text-white"><AiOutlineDoubleLeft /></button>
              <button onClick={handlePreviousPage} className="ml-2 text-white"><AiOutlineLeft /></button>
              <button onClick={handleNextPage} className="ml-2 text-white"><AiOutlineRight /></button>
              <button onClick={handleLastPage} className="ml-2 text-white"><AiOutlineDoubleRight /></button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestsPage;