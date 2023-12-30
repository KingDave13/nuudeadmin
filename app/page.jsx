'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { slideIn } from '@utils/motion';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { signIn } from "next-auth/react";
import SectionWrapperAlt from '@hoc/SectionWrapperAlt';

const Modal = ({ onClose }) => {
  const modalRef = useRef(null);

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
    document.body.style.top = '0';
  };

  const handleClick = () => {
      onClose();
      enableScroll();
  };

  return (
      <div className="fixed inset-0 flex items-center justify-center
      bg-black bg-opacity-80 z-50">
        <div ref={modalRef} 
        className="bg-primaryalt md:p-8 ss:p-8 p-6 rounded-md shadow-xl 
        flex flex-col justify-center w-auto h-auto font-manierRegular
        items-center">
          <div className='flex flex-col w-full justify-center 
          items-center'>
            <h1 className='text-white md:text-[16px] ss:text-[20px]
            text-[17px] text-center md:mb-4 ss:mb-4 mb-3'>
              Incorrect username or password.
            </h1>

            <button
            onClick={handleClick}
            className='grow4 bg-secondary border-none
            md:text-[13px] ss:text-[14px] text-[13px] md:py-2
            ss:py-3 py-3 md:px-7 ss:px-7 px-5 text-primary 
            md:rounded-[3px] ss:rounded-[3px] rounded-[3px] 
            font-manierMedium cursor-pointer'
            >
              OK
            </button>
          </div>
        </div>
      </div>
  );
};

const Login = () => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const disableScroll = () => {
    setScrollPosition(window.pageYOffset);
    document.body.style.overflow = 'hidden';
    document.body.style.top = `-${scrollPosition}px`;
  };

  const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
      },

      validationSchema: Yup.object({
        email: Yup.string().email('Invalid email address.').required('Email is required.'),
        password: Yup.string().required('Password is required.'),
      }),

      onSubmit: async (values) => {
        try {
          const res = await signIn("credentials", {
            email: values.email,
            password: values.password,
            redirect: false,
          })
          if(res.error) {
            console.log(res.error, 'invalid credentials');
            setModalOpen(true);
            disableScroll();
            return;
          }
          router.replace('/requests');
        } catch (error) {
          console.log(error, 'Could not log in');
        }
      },
  });

  return (
    <section className="flex w-full items-center justify-center 
    md:h-[70vh] ss:h-[80vh]">
      {modalOpen && (
        <Modal onClose={() => setModalOpen(false)} />
      )}

      <motion.div variants={slideIn('down', 'tween', 0.2, 1)}
        className='md:w-1/2 ss:w-2/3 font-manierRegular flex items-center
        justify-center flex-col bg-primaryalt rounded-xl md:p-10
        ss:p-10 p-8 shadow-xl ss:mb-60'
      >
        <p className='text-white md:text-[20px] ss:text-[20px] 
        text-[17px] border-b-[1px] border-textalt w-full text-center
        md:pb-6 ss:pb-6'>
          Please enter your login details
        </p>

        <form onSubmit={formik.handleSubmit} 
        className='flex flex-col w-full md:mt-10 ss:mt-6 mt-6 md:gap-4
        ss:gap-4 gap-3'>
          <div className="flex flex-col">
              <label className="text-white md:mb-3 ss:mb-2 mb-2 
              md:text-[16px] ss:text-[15px] text-[13px]">
                Email
              </label>
              <input
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your email"
              className="md:py-3 ss:py-2 py-2 px-4 border-none 
              outline-none text-white md:rounded-[5px] 
              ss:rounded-[3px] rounded-[3px]
              placeholder:text-textalt focus:outline-none
              md:placeholder:text-[14px] 
              ss:placeholder:text-[12px] 
              placeholder:text-[12px] bg-primary"
              />
              <p className="text-mainRed md:text-[12px] 
              ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
              >
                {formik.touched.email && formik.errors.email}
              </p>
          </div>

          <div className="flex flex-col">
              <label className="text-white md:mb-3 ss:mb-2 mb-2 
              md:text-[16px] ss:text-[15px] text-[13px]">
                Password
              </label>
              <input
              type="text"
              name="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Enter your password"
              className="md:py-3 ss:py-2 py-2 px-4 border-none 
              outline-none text-white md:rounded-[5px] 
              ss:rounded-[3px] rounded-[3px]
              placeholder:text-textalt
              md:placeholder:text-[14px] 
              ss:placeholder:text-[12px] 
              placeholder:text-[12px] bg-primary"
              />
              <p className="text-mainRed md:text-[12px] 
              ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
              >
                {formik.touched.password && formik.errors.password}
              </p>
          </div>

          <div className="md:mt-2 ss:mt-2 w-full flex items-center 
          justify-center md:gap-10 ss:gap-8">
            <button
            type='submit'
            className="bg-secondary grow2 shadow-md md:text-[16px] 
            ss:text-[14px] text-[13px] md:py-3 ss:py-3 py-2 md:px-20 
            ss:px-14 text-primary md:rounded-[5px] ss:rounded-[3px] 
            border-none cursor-pointer"
            > 
              Login
            </button>

            <a 
              href=""
              className='text-secondary md:text-[16px] ss:text-[15px]
              text-[13px] grow2'
            >
              Forgot password?
            </a>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default SectionWrapperAlt(Login, '');