'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineInformationCircle, HiOutlineTrash } from "react-icons/hi2";
import { BsPersonCheck } from "react-icons/bs";
import { CiMail } from "react-icons/ci";
import { AiOutlineDoubleLeft, AiOutlineLeft, AiOutlineRight, AiOutlineDoubleRight } from 'react-icons/ai';

const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-md shadow-md">
        <h2 className="text-lg mb-4">Confirm Deletion</h2>
        <p className="mb-6">Are you sure you want to delete this request?</p>
        <div className="flex justify-end">
          <button onClick={onClose} className="mr-4 px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={onDelete} className="px-4 py-2 bg-red-500 text-white rounded">Proceed to Delete</button>
        </div>
      </div>
    </div>
  );
};

const RequestsPage = () => {
  const [formData, setFormData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
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

  const handleUserDetail = (data) => {
    router.push(`/requests/${data._id}`);
  };

  const handleOpenModal = (request) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedRequest(null);
    setIsModalOpen(false);
  };

  const handleDeleteRequest = async () => {
    if (!selectedRequest) return;

    try {
      const response = await fetch(`/api/requests/${selectedRequest._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Failed to delete:', response.status, response.statusText);
        return;
      }

      setFormData((prevData) => prevData.filter(request => request._id !== selectedRequest._id));
      handleCloseModal();
    } catch (error) {
      console.error('Failed to delete request:', error);
    }
  };

  return (
    <section className="md:min-h-[800px] ss:min-h-[620px] min-h-[650px] 
    flex items-center md:px-16 px-6">
      <div className="items-center w-full flex flex-col md:gap-8 
      font-manierRegular">
        <div className='w-full'>
          <h1 className='text-secondary md:text-[22px] 
          ss:text-[20px] text-[18px]'>
            Membership/Guest Requests
          </h1>
        </div>

        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead className='text-textalt md:text-[17px] ss:text-[17px]
              text-[15px]'>
                <tr>
                  <th className="py-4 px-4 text-left w-1/6">Full Name</th>
                  <th className="py-4 px-4 text-left w-1/6">Payment Status</th>
                  <th className="py-4 px-4 text-left w-1/6">Payment Type</th>
                  <th className="py-4 px-4 text-left w-1/6">Email</th>
                </tr>
              </thead>

              <tbody className='md:text-[16px] ss:text-[16px] text-[14px]'>
                {displayedRows.map((data, index) => (
                  <tr key={data._id} 
                  className='hover:bg-gray-800 border-b border-textalt'>
                    <td className="px-4 py-3.5">{`${data.firstName} ${data.lastName}`}</td>
                    <td className="px-4 py-3.5">Successful</td>
                    <td className="px-4 py-3.5">{data.paymentType}</td>
                    <td className="px-4 py-3.5">{data.email}</td>
                    
                    <td className="ml-32 mt-4 flex gap-4 text-[21px]
                    font-manierBold">
                      <button onClick={() => handleUserDetail(data)}>
                        <HiOutlineInformationCircle />
                      </button>
                      
                      <button>
                        <BsPersonCheck />
                      </button>

                      <button>
                        <CiMail />
                      </button>

                      <button className='hover:text-brightRed navsmooth'
                      onClick={() => handleOpenModal(data)}>
                        <HiOutlineTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center mt-6 text-textalt
          md:text-[15px] ss:text-[14px] text-[12px]">
            <div className="flex items-center">
              <span className="mr-2">Rows per page:</span>

              <div className='relative flex items-center'>
                <select 
                  value={rowsPerPage} 
                  onChange={handleChangeRowsPerPage} 
                  className="bg-transparent mr-3 py-1 custom-select
                  cursor-pointer px-2">
                  {[10, 11, 12, 13, 14].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <div className='absolute right-0'>
                  <TiArrowSortedDown 
                    className='text-main text-[15px]'
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center ml-10 mr-5">
              <span>{`${(currentPage - 1) * rowsPerPage + 1}-${Math.min(currentPage * rowsPerPage, totalRows)} 
                of ${totalRows}`}
              </span>

              <button onClick={handleFirstPage} 
              className="ml-10">
                <AiOutlineDoubleLeft />
              </button>

              <button onClick={handlePreviousPage} 
              className="ml-3">
                <AiOutlineLeft />
              </button>

              <button onClick={handleNextPage} 
              className="ml-3">
                <AiOutlineRight />
              </button>

              <button onClick={handleLastPage} 
              className="ml-3">
                <AiOutlineDoubleRight />
              </button>
            </div>
          </div>
        </div>
      </div>

      <DeleteModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onDelete={handleDeleteRequest}
      />
    </section>
  );
};

export default RequestsPage;