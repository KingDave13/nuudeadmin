'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { TiArrowSortedDown } from "react-icons/ti";
import { HiOutlineInformationCircle, HiOutlineTrash } from "react-icons/hi2";
import { CiMail } from "react-icons/ci";
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { AiOutlineDoubleLeft, AiOutlineLeft, AiOutlineRight, AiOutlineDoubleRight } from 'react-icons/ai';


const DeleteModal = ({ isOpen, onClose, onDelete }) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 flex items-center justify-center
      bg-black bg-opacity-80 z-50">
        <motion.div 
        initial={{ y: 0, opacity: 0.7 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 10, opacity: 0 }}
        transition={{ duration: 0.1 }}
        className="bg-primaryalt md:p-12 ss:p-10 p-4 rounded-md shadow-xl 
        flex flex-col justify-center w-auto h-auto items-center gap-5">
          <HiOutlineInformationCircle
            className='text-[70px] text-secondary'
          />

          <div className='flex flex-col w-full justify-center 
          items-center gap-5'>
            <h1 className='text-white md:text-[30px] ss:text-[30px]
            text-[20px] text-center font-manierMedium'>
              Are you sure?
            </h1>

            <p className='text-white md:text-[16px] ss:text-[16px]
            text-[14px] text-center'>
              Are you sure you want to delete this member?
            </p>

            <div className='flex gap-5'>
              <button
              onClick={onDelete}
              className='grow4 bg-secondary border-none w-full
              md:text-[15px] ss:text-[15px] text-[13px] md:py-2.5
              ss:py-2.5 py-2 md:px-12 ss:px-10 px-6 text-primary 
              rounded-md cursor-pointer'
              >
                Delete
              </button>

              <button
              onClick={onClose}
              className='grow4 border-[1px] border-secondary w-full
              md:text-[15px] ss:text-[15px] text-[13px] md:py-2.5
              ss:py-2.5 py-2 md:px-12 ss:px-10 px-6 text-secondary 
              rounded-md cursor-pointer'
              >
                Cancel
              </button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};


const MembersPage = () => {
  const [membersData, setMembersData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState(null);
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const fetchMembersData = async () => {
      try {
        const response = await fetch('/api/members');
        if (!response.ok) {
          console.error('Failed to fetch:', response.status, response.statusText);
          return;
        }
        const result = await response.json();
        if (result.success) {
          setMembersData(result.data);
        } else {
          console.error('API returned an error:', result.message);
        }
      } catch (error) {
        console.error('Failed to fetch members data:', error);
      }
    };

    fetchMembersData();
  }, []);

  const totalRows = membersData.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const displayedRows = membersData.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage);

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
    router.push(`/members/${data._id}`);
  };

  const handleUserMail = (data) => {
    router.push(`/members/${data._id}/message`);
  };

  const handleOpenDeleteModal = (member) => {
    if (status === 'authenticated') {
      setSelectedMember(member);
      setIsDeleteModalOpen(true);
    } else {
      alert('You need to be authenticated to perform this action.');
    }
  };

  const handleCloseDeleteModal = () => {
    setSelectedMember(null);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteMember = async () => {
    if (!selectedMember) return;

    try {
      const response = await fetch(`/api/members/${selectedMember._id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Failed to delete:', response.status, response.statusText);
        return;
      }

      setMembersData((prevData) => prevData.filter(member => member._id !== selectedMember._id));
      handleCloseDeleteModal();
    } catch (error) {
      console.error('Failed to delete member:', error);
    }
  };

  return (
    <section className="md:min-h-[800px] ss:min-h-[620px] min-h-[650px] 
    flex items-center md:px-16 px-6">
      <div className="items-center w-full flex flex-col md:gap-8 
      font-manierRegular">
        <div className='w-full'>
          <h1 className='text-secondary md:text-[25px] 
          ss:text-[20px] text-[18px]'>
            Members
          </h1>
        </div>

        <div className="w-full">
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead className='text-textalt md:text-[17px] ss:text-[17px]
              text-[15px]'>
                <tr>
                  <th className="py-4 px-4 text-left w-1/6">Full Name</th>
                  <th className="py-4 px-4 text-left w-1/6">Membership Status</th>
                  <th className="py-4 px-4 text-left w-1/6">Email</th>
                </tr>
              </thead>

              <tbody className='md:text-[16px] ss:text-[16px] text-[14px]'>
                {displayedRows.map((data, index) => (
                  <tr key={data._id} 
                  className='hover:bg-gray-800 border-b border-textalt'>
                    <td className="px-4 py-3.5">{`${data.firstName} ${data.lastName}`}</td>
                    <td className="px-4 py-3.5 text-secondary">Active</td>
                    <td className="px-4 py-3.5">{data.email}</td>
                    
                    <td className="ml-32 mt-4 flex gap-4 text-[21px]
                    font-manierBold">
                      <button onClick={() => handleUserDetail(data)}>
                        <HiOutlineInformationCircle />
                      </button>
                      
                      <button onClick={() => handleUserMail(data)}>
                        <CiMail />
                      </button>

                      <button className='hover:text-brightRed navsmooth'
                      onClick={() => handleOpenDeleteModal(data)}>
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

        <DeleteModal 
          isOpen={isDeleteModalOpen}
          onClose={handleCloseDeleteModal}
          onDelete={handleDeleteMember}
        />
      </div>
    </section>
  );
};

export default MembersPage;