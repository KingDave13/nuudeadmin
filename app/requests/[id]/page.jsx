'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineArrowTopRightOnSquare, HiOutlineInformationCircle } from "react-icons/hi2";
import { motion, AnimatePresence } from 'framer-motion';
import { useSession } from 'next-auth/react';
import { GoCheckCircle } from "react-icons/go";


const ApproveModal = ({ isOpen, onClose, onApprove}) => {
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
              Are you sure you want to approve this request?
            </p>

            <div className='flex gap-5'>
              <button
              onClick={onApprove}
              className='grow4 bg-secondary border-none w-full
              md:text-[15px] ss:text-[15px] text-[13px] md:py-2.5
              ss:py-2.5 py-2 md:px-12 ss:px-10 px-6 text-primary 
              rounded-md cursor-pointer'
              >
                Approve
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

const NotificationModal = ({ isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(onClose, 5000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 flex items-center justify-center
        bg-black bg-opacity-50 z-50">
        <motion.div 
          initial={{ y: 0, opacity: 0.7 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 10, opacity: 0 }}
          transition={{ duration: 0.1 }}
          className="bg-primaryalt md:p-12 ss:p-10 p-4 rounded-md shadow-xl 
          flex flex-col justify-center w-auto h-auto items-center gap-5">
          <div className='flex flex-col w-full justify-center 
          items-center gap-5'>
            <GoCheckCircle
              className='text-[70px] text-secondary'
            />

            <h1 className='text-white md:text-[30px] ss:text-[30px]
            text-[20px] text-center font-manierMedium'>
              Request Approved
            </h1>

            <p className='text-white md:text-[16px] ss:text-[16px]
            text-[14px] text-center'>
              This user's request has been approved!
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

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
              Rejection deletes the request.<br></br>
              Are you sure you want to reject this request?
            </p>

            <div className='flex gap-5'>
              <button
              onClick={onDelete}
              className='grow4 bg-secondary border-none w-full
              md:text-[15px] ss:text-[15px] text-[13px] md:py-2.5
              ss:py-2.5 py-2 md:px-12 ss:px-10 px-6 text-primary 
              rounded-md cursor-pointer'
              >
                Reject
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

const UserDetails = ({ params }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isApproveModalOpen, setIsApproveModalOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const { data: session, status } = useSession();

  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`/api/requests/${id}`)
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            setUserData(data.data);
          } else {
            setError(data.message);
          }
          setLoading(false);
        })
        .catch(err => {
          setError(err.message);
          setLoading(false);
        });
    }
  }, [id]);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenApproveModal = (request) => {
    if (status === 'authenticated') {
      setSelectedRequest(request);
      setIsApproveModalOpen(true);
    } else {
      alert('You need to be authenticated to perform this action.');
    }
  };

  const handleCloseApproveModal = () => {
    setSelectedRequest(null);
    setIsApproveModalOpen(false);
  };

  const handleDeleteRequest = async () => {
    try {
      const response = await fetch(`/api/requests/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        console.error('Failed to delete:', response.status, response.statusText);
        return;
      }

      router.back();
    } catch (error) {
      console.error('Failed to delete request:', error);
    } finally {
      handleCloseModal();
    }
  };

  const handleApproveRequest = async () => {
    if (!selectedRequest) return;

    try {
      const response = await fetch(`/api/requests/${selectedRequest._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          paymentType: selectedRequest.paymentType,
        }),
      });

      if (!response.ok) {
        console.error('Failed to approve:', response.status, response.statusText);
        return;
      }

      setFormData((prevData) => prevData.filter(request => request._id !== selectedRequest._id));
      handleCloseApproveModal();
      setIsNotificationOpen(true);
    } catch (error) {
      console.error('Failed to approve request:', error);
    }
  };

  const handleCloseNotification = () => {
    setIsNotificationOpen(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="md:min-h-[800px] ss:min-h-[620px] min-h-[650px] 
    flex items-center md:px-16 px-6 mt-52">
      <div className="items-center w-full flex flex-col md:gap-8 
      font-manierRegular">
        <div className='w-full flex justify-between items-center'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-secondary md:text-[23px] ss:text-[20px] 
            text-[18px]'>
              {userData.firstName} {userData.lastName}
            </h1>

            <h1 className='text-white md:text-[17px] ss:text-[17px] 
            text-[14px]'>
              {userData.paymentType} Request
            </h1>
          </div>

          <div className='bg-secondary px-6 py-2 rounded-md flex gap-3
          items-center cursor-pointer grow4'
          onClick={() => router.back()}>
            <HiArrowNarrowLeft />

            <p className='text-primary md:text-[16px] ss:text-[16px]
            text-[14px]'>
              Go Back
            </p>
          </div>
        </div>

        <div className='w-full'>
          <h1 className='text-white md:text-[17px] ss:text-[17px] 
            text-[14px]'>
            Payment Status: <span className='text-secondary'>
              Successful
              </span>
          </h1>
        </div>
        
        <div className="w-full grid grid-cols-2 md:gap-5 ss:gap-5 gap-3">
          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              Full Name
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.firstName} {userData.lastName}
            </p>
          </div>
          
          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              Email Address
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.email}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              Phone Number
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              +{userData.phone}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              Date of Birth
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.birthdate}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              Gender
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.gender}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              Employer
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.employer}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              Occupation
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.occupation}
            </p>
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1'>
              <p className='text-textalt md:text-[16px] ss:text-16px]
              text-[13px]'>
                Instagram Handle
              </p>
              <p className='text-white md:text-[17px] ss:text-17px]
              text-[14px]'>
                instagram.com/{userData.instagram}
              </p>
            </div>

            <a href={`https://instagram.com/${userData.instagram}`}
            target='blank'
            className='mr-16'>
              <HiOutlineArrowTopRightOnSquare 
              className='text-secondary font-bold md:text-[20px]
              ss:text-[20px] text-[18px]'/>
            </a>
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1'>
              <p className='text-textalt md:text-[16px] ss:text-16px]
              text-[13px]'>
                X (Twitter) Handle
              </p>
              <p className='text-white md:text-[17px] ss:text-17px]
              text-[14px]'>
                x.com/{userData.twitter}
              </p>
            </div>

            <a href={`https://x.com/${userData.twitter}`}
            target='blank'
            className='mr-16'>
              <HiOutlineArrowTopRightOnSquare 
              className='text-secondary font-bold md:text-[20px]
              ss:text-[20px] text-[18px]'/>
            </a>
          </div>

          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1'>
              <p className='text-textalt md:text-[16px] ss:text-16px]
              text-[13px]'>
                Facebook Handle
              </p>
              <p className='text-white md:text-[17px] ss:text-17px]
              text-[14px]'>
                facebook.com/{userData.facebook}
              </p>
            </div>

            <a href={`https://facebook.com/${userData.facebook}`}
            target='blank'
            className='mr-16'>
              <HiOutlineArrowTopRightOnSquare 
              className='text-secondary font-bold md:text-[20px]
              ss:text-[20px] text-[18px]'/>
            </a>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              What turns you on the most?
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.turnons}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              If you could amplify an erotic trait within yourself? 
              What would it be?
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.trait}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              What would you contribute to the Nuude! community?
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.contribution}
            </p>
          </div>

          <div className='flex flex-col gap-1'>
            <p className='text-textalt md:text-[16px] ss:text-16px]
            text-[13px]'>
              And finally, how did you find us?
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              {userData.mode}
            </p>
          </div>
        </div>

        <div className='w-full flex gap-5 md:mt-5 ss:mt-5 mt-3'>
          <button className='bg-secondary px-10 py-3.5 rounded-md grow4
          cursor-pointer text-primary md:text-[15px] ss:text-[15px]
          text-[12px]'
          onClick={() => handleOpenApproveModal(userData)}
          >
            Approve {userData.paymentType}
          </button>

          <button className='bg-none border-secondary border-[1px] px-16
          py-3.5 rounded-md grow4 cursor-pointer text-secondary 
          md:text-[15px] ss:text-[15px] text-[12px]'
          onClick={handleOpenModal}
          >
            Reject Request
          </button>
        </div>

        <DeleteModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          onDelete={handleDeleteRequest}
        />

        <ApproveModal 
          isOpen={isApproveModalOpen}
          onClose={handleCloseApproveModal}
          onApprove={handleApproveRequest}
        />

        <NotificationModal
          isOpen={isNotificationOpen}
          onClose={handleCloseNotification}
        />
      </div>
    </section>
  );
};

export default UserDetails;