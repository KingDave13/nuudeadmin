'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import { HiOutlineArrowTopRightOnSquare } from "react-icons/hi2";

const UserDetails = ({ params }) => {
  const router = useRouter();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { id } = params;

  useEffect(() => {
    if (id) {
      fetch(`/api/members/${id}`)
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

  const handleDeleteRequest = async () => {
    try {
      const response = await fetch(`/api/members/${id}`, {
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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <section className="md:min-h-[800px] ss:min-h-[620px] min-h-[650px] 
    flex items-center md:px-16 px-6 mt-28">
      <div className="items-center w-full flex flex-col md:gap-8 
      font-manierRegular">
        <div className='w-full flex justify-between items-center'>
          <div className='flex'>
            <h1 className='text-secondary md:text-[25px] ss:text-[20px] 
            text-[18px]'>
              {userData.firstName} {userData.lastName}
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
      </div>
    </section>
  );
};

export default UserDetails;