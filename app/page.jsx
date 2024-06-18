'use client';

import { useEffect, useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from "next/navigation";
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useFormik } from "formik";
import * as Yup from 'yup';
import { signIn } from "next-auth/react";
import emailjs from '@emailjs/browser';
import SectionWrapperAlt from '@hoc/SectionWrapperAlt';

const Modal = ({ onClose, setModalContent, showOkButton }) => {
  const modalRef = useRef(null);

  const enableScroll = () => {
    document.body.style.overflow = 'auto';
    document.body.style.top = '0';
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      onClose();
      enableScroll();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);

  const handleClick = () => {
    onClose();
    enableScroll();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-80 z-50">
      <div ref={modalRef} className="bg-primaryalt md:p-8 ss:p-8 p-6 rounded-md shadow-xl flex flex-col justify-center w-auto h-auto font-manierRegular items-center">
        <div className='flex flex-col w-full justify-center items-center'>
          {setModalContent && setModalContent()}
          {showOkButton && (
            <button
              onClick={handleClick}
              className='grow4 bg-secondary border-none md:text-[13px] ss:text-[14px] text-[13px] md:py-2 ss:py-3 py-2 md:px-7 ss:px-7 px-5 text-primary md:rounded-[3px] ss:rounded-[3px] rounded-[3px] font-manierMedium cursor-pointer'
            >
              OK
            </button>
          )}
        </div>
      </div>
    </div>
  );
};


const ForgotPasswordModalContent = ({ onSubmit }) => (
  <>
    <h1 className='text-white md:text-[16px] ss:text-[20px] text-[15px] 
    text-center md:mb-5 ss:mb-4 mb-3'>
      Enter your email to reset password
    </h1>
    <form onSubmit={onSubmit} className='flex flex-col w-full'>
      <input 
      type="email" 
      name="email" 
      placeholder="Enter your email" 
      required 
      className="md:py-3 ss:py-2 py-2 px-4 border-none outline-none 
      text-white md:rounded-[5px] ss:rounded-[3px] rounded-[3px]
      placeholder:text-textalt focus:outline-none 
      md:placeholder:text-[14px] ss:placeholder:text-[12px] 
      placeholder:text-[12px] bg-primary mb-5" 
      />
      <button type="submit" 
      className="grow4 bg-secondary border-none md:text-[13px] 
      ss:text-[14px] text-[13px] md:py-2 ss:py-3 py-2 md:px-7 ss:px-7 
      px-5 text-primary md:rounded-[3px] ss:rounded-[3px] rounded-[3px] 
      font-manierMedium cursor-pointer">
        Send Reset Link
      </button>
    </form>
  </>
);

const Login = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalContent, setModalContent] = useState(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isIncorrectPasswordModal, setIsIncorrectPasswordModal] = useState(false);

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/requests');
    }
  }, [status, router]);

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

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
          if (res.error) {
            console.log(res.error, 'invalid credentials');
            setIsIncorrectPasswordModal(true);
            setModalContent(() => () => (
              <h1 className='text-white md:text-[16px] ss:text-[20px] 
              text-[15px] text-center md:mb-4 ss:mb-4 mb-3'>
                Incorrect username or password.
              </h1>
            ));
            setModalOpen(true);
            disableScroll();
            return;
          }
          router.push('/requests');
        } catch (error) {
          console.log(error, 'Could not log in');
        }
      },
  });

  const handleForgotPassword = async (event) => {
    event.preventDefault();
    const email = event.target.email.value;

    const response = await fetch('/api/request-password-reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });
    const data = await response.json();

    if (data.message === 'Email not found') {
      setModalContent(() => () => (
        <h1 className='text-white md:text-[16px] ss:text-[20px] text-[15px] text-center md:mb-4 ss:mb-4 mb-3'>
          Email not found.
        </h1>
      ));
      setModalOpen(true);
      disableScroll();
      return;
    }

    const resetToken = data.resetToken;
    const resetLink = `http://localhost:3001/password-reset?token=${resetToken}`;

    emailjs.send('your_service_id', 'your_template_id', {
      email,
      reset_link: resetLink,
    }).then((result) => {
      console.log('Password reset email sent:', result.text);
    }, (error) => {
      console.error('Failed to send password reset email:', error.text);
    });

    setModalContent(() => () => (
      <h1 className='text-white md:text-[16px] ss:text-[20px] text-[15px] 
      text-center md:mb-4 ss:mb-4 mb-3'>
        Password reset link has been sent to your email.
      </h1>
    ));
    setModalOpen(true);
    disableScroll();
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'authenticated') {
    return null;
  }

  return (
    <section className="flex w-full items-center justify-center 
    md:h-[70vh] ss:h-[80vh] h-[80vh] md:px-16 px-6 md:mt-40 ss:mt-52 mt-52">
      {modalOpen && (
        <Modal
        onClose={() => setModalOpen(false)}
        setModalContent={modalContent}
        showOkButton={!isIncorrectPasswordModal && modalContent === ForgotPasswordModalContent}
      />      
      )}

      <div
        className='md:w-1/2 ss:w-2/3 w-full font-manierRegular flex 
        items-center justify-center flex-col bg-primaryalt rounded-lg 
        md:p-10 ss:p-10 p-6 shadow-xl md:mb-0 ss:mb-60 mb-52'
      >
        <p className='text-white md:text-[20px] ss:text-[20px] 
        text-[16px] border-b-[1px] border-textalt w-full text-center
        md:pb-6 ss:pb-6 pb-4'>
          Please enter your login details
        </p>

        <form onSubmit={formik.handleSubmit} 
        className='flex flex-col w-full md:mt-10 ss:mt-6 mt-6 md:gap-4
        ss:gap-4 gap-3'>
          <div className="flex flex-col">
              <label className="text-white md:mb-3 ss:mb-2 mb-2 
              md:text-[16px] ss:text-[15px] text-[14px]">
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
              md:text-[16px] ss:text-[15px] text-[14px]">
                Password
              </label>
              <div className="relative">
                <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                placeholder="Enter your password"
                className="md:py-3 ss:py-2 py-2 px-4 border-none 
                outline-none text-white md:rounded-[5px] 
                ss:rounded-[3px] rounded-[3px]
                placeholder:text-textalt
                md:placeholder:text-[14px] w-full
                ss:placeholder:text-[12px] 
                placeholder:text-[12px] bg-primary"
                />
                <div className="absolute right-0 inset-y-0 flex pr-4
                items-center">
                  {showPassword ? (
                      <FaEyeSlash
                        className="text-gray-400 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                  ) : (
                      <FaEye
                        className="text-gray-400 cursor-pointer"
                        onClick={togglePasswordVisibility}
                      />
                  )}
                </div>
              </div>
              
              <p className="text-mainRed md:text-[12px] 
              ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
              >
                {formik.touched.password && formik.errors.password}
              </p>
          </div>

          <div className="md:mt-2 ss:mt-2 mt-3 w-full flex items-center 
          justify-center md:gap-10 ss:gap-8 gap-6">
            <button
            type='submit'
            className="bg-secondary grow2 shadow-md md:text-[16px] 
            ss:text-[14px] text-[13px] md:py-3 ss:py-3 py-2 md:px-20 
            ss:px-14 px-12 text-primary md:rounded-[5px] ss:rounded-[3px] 
            rounded-[3px] border-none cursor-pointer"
            > 
              Login
            </button>

            <button
              onClick={(event) => {
                event.preventDefault();
                setModalContent(() => () => 
                  <ForgotPasswordModalContent
                    onSubmit={handleForgotPassword} 
                  />);
                setModalOpen(true);
                disableScroll();
              }}
              className='text-secondary md:text-[16px] ss:text-[15px]
              text-[13px] grow2'
            >
              Forgot password?
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SectionWrapperAlt(Login, '');