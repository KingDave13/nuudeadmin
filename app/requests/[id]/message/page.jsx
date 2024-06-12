'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { HiArrowNarrowLeft } from "react-icons/hi";
import emailjs from '@emailjs/browser';
import { useFormik } from "formik";
import * as Yup from 'yup';

const Modal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center
       bg-black bg-opacity-50 z-50 font-manierRegular">
        <div className="bg-white p-6 rounded-md shadow-xl flex flex-col
        items-center justify-center md:w-[400px] ss:w-[400px] w-[330px]
        md:h-[150px] ss:h-[150px] h-[100px]">
          <p className="text-center mb-4 text-primary">
            Message Sent
          </p>
        </div>
      </div>
    );
};

const MessagePage = ({ params }) => {
    const router = useRouter();
    const { id } = params;
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [loading2, setLoading2] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

    const disableScroll = () => {
        setScrollPosition(window.pageYOffset);
        document.body.style.overflow = 'hidden';
        document.body.style.top = `-${scrollPosition}px`;
    };

    const enableScroll = () => {
        document.body.style.overflow = 'auto';
        document.body.style.top = '0';
    };

    const formik = useFormik({
        initialValues: {
            subject: '',
            message: '',
        },

        validationSchema: Yup.object({
            subject: Yup.string().required('Subject is required.'),
            message: Yup.string().required('Message is required.'),
        }),

        onSubmit: (values) => {
            setLoading2(true);

            emailjs.send(
                process.env.NEXT_PUBLIC_EMAIL_SERVICE,
                process.env.NEXT_PUBLIC_EMAIL_TEMPLATE,
                {
                    from_name: 'Nuude!',
                    to_name: userData.firstName,
                    from_email: 'contact@nuude.club',
                    to_email: userData.email,
                    subject: values.subject,
                    message: values.message,
                },
                process.env.NEXT_PUBLIC_EMAIL_KEY,
                )
                .then(
                () => {
                    setLoading2(false);
                    setModalOpen(true);
                    disableScroll();
            
                    setTimeout(() => {
                    setModalOpen(false);
                    enableScroll();
                    }, 2000);
            
                    values = initialValues
                },
                
                (error) => {
                    setLoading2(false);
                    console.log(error);
                }
            );
        },
    });

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
    <section className="flex items-center md:px-16 px-6 md:mt-60 ss:mt-60
    mt-56 pb-20">
        <div className="items-center w-full flex flex-col md:gap-10 
        ss:gap-10 gap-8 font-manierRegular">
            <div className='w-full flex justify-between items-center'>
                <div className='flex flex-col md:gap-2 ss:gap-2 gap-1'>
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
                    text-[13px]'>
                    Go Back
                    </p>
                </div>
            </div>

            <div className='w-full'>
                <h1 className='text-white md:text-[17px] ss:text-[17px] 
                text-[14px]'>
                    Send Message
                </h1>
            </div>

            <div className='w-full'>
                <form onSubmit={formik.handleSubmit}
                className="flex flex-col md:w-1/2 ss:w-3/4 md:gap-8 ss:gap-6 gap-4">
                    <div className="flex flex-col">
                        <label className="text-white md:mb-3 ss:mb-2 mb-2 
                        md:text-[16px] ss:text-[15px] text-[14px]">
                            Subject
                        </label>

                        <input
                        type="text"
                        name="subject"
                        value={formik.values.subject}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Subject of the message"
                        className="md:py-3 ss:py-3 py-2 px-4 border-none 
                        outline-none text-white md:rounded-[3px]
                        ss:rounded-[3px] rounded-[3px]
                        md:placeholder:text-[14px] placeholder:text-textalt
                        ss:placeholder:text-[13px] 
                        placeholder:text-[12px] bg-primaryalt"
                        />

                        <p className="text-mainRed md:text-[12px] 
                        ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
                        >
                            {formik.touched.subject && formik.errors.subject}
                        </p>
                    </div>

                    <div className="flex flex-col">
                        <label className="text-white md:mb-3 ss:mb-2 mb-2 
                        md:text-[16px] ss:text-[15px] text-[14px]">
                            Message
                        </label>

                        <textarea
                        rows="5"
                        name="message"
                        value={formik.values.message}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        placeholder="Your Message"
                        className="md:py-3 ss:py-3 py-2 px-4 border-none 
                        outline-none text-white md:rounded-[3px]
                        ss:rounded-[3px] rounded-[3px]
                        md:placeholder:text-[14px] placeholder:text-textalt
                        ss:placeholder:text-[13px] 
                        placeholder:text-[12px] bg-primaryalt"
                        />

                        <p className="text-mainRed md:text-[12px] 
                        ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
                        >
                            {formik.touched.message ? formik.errors.message : ''}
                        </p>
                    </div>

                    <div className="col-span-2 md:mt-0 ss:mt-0 mt-3">
                        <button
                        type="submit"
                        className="bg-secondary grow4 cursor-pointer rounded-md
                        md:text-[16px] ss:text-[14px] text-[14px] md:py-3.5 
                        ss:py-3 py-3 md:px-16 ss:px-12 px-10
                        "
                        >
                            {loading2 ? 'Sending...' : 'Send Message'}
                        </button>
                    </div>
                </form>
            </div>
            
        </div>


        {modalOpen && (
            <Modal />
        )}
    </section>
  );
};

export default MessagePage;