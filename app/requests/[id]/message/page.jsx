'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";

const MessagePage = ({ params, data }) => {
  const router = useRouter();
  const { id } = params;

  return (
    <section className="md:min-h-[800px] ss:min-h-[620px] min-h-[650px] 
    flex items-center md:px-16 px-6 mt-52">
      <div className="items-center w-full flex flex-col md:gap-8 
      font-manierRegular">
        <div className='w-full flex justify-between items-center'>
          <div className='flex flex-col gap-2'>
            <h1 className='text-secondary md:text-[23px] ss:text-[20px] 
            text-[18px]'>
              {data.firstName} {data.lastName}
            </h1>

            <h1 className='text-white md:text-[17px] ss:text-[17px] 
            text-[14px]'>
              {data.paymentType} Request
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
      </div>
    </section>
  );
};

export default MessagePage;