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

          <div className='flex justify-between items-center'>
            <div className='flex flex-col gap-1'>
              <p className='text-textalt md:text-[16px] ss:text-16px]
              text-[13px]'>
                X (Twitter) handle
              </p>
              <p className='text-white md:text-[17px] ss:text-17px]
              text-[14px]'>
                x.com/{userData.twitter}
              </p>
            </div>

            <a href={`x.com/${userData.twitter}`}
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
              Facebook Handle
            </p>
            <p className='text-white md:text-[17px] ss:text-17px]
            text-[14px]'>
              facebook.com/{userData.facebook}
            </p>
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

        <div className='w-full flex gap-6 md:mt-5 ss:mt-5 mt-3'>
          <button className='bg-secondary px-10 py-3.5 rounded-md grow4
          cursor-pointer text-primary md:text-[15px] ss:text-[15px]
          text-[12px]'
          onClick={() => router.back()}
          >
            Approve {userData.paymentType}
          </button>

          <button className='bg-none border-secondary border-[1px] px-16
          py-3.5 rounded-md grow4 cursor-pointer text-secondary 
          md:text-[15px] ss:text-[15px] text-[12px]'
          onClick={() => router.back()}
          >
            Reject Request
          </button>
        </div>
      </div>
    </section>
  );
};

export default UserDetails;