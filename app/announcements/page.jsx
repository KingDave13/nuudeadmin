'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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

const MessagePage = ( ) => {
    const router = useRouter();
    const [formData, setFormData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);

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
            setLoading(true);

            emailjs.send(
                'service_skvhseu',
                'template_bu4q17u',
                {
                    from_name: values.firstname,
                    to_name: 'Anayo Okpala Global Concept',
                    from_email: values.email,
                    to_email: 'contact@anayookpalaglobalconcept.com',
                    subject: values.subject,
                    message: values.message,
                },
                'u4mJjP_i8Ayoq1SU-'
                )
                .then(
                () => {
                    setLoading(false);
                    setModalOpen(true);
                    disableScroll();
            
                    setTimeout(() => {
                    setModalOpen(false);
                    enableScroll();
                    }, 2000);
            
                    values = initialValues
                },
                
                (error) => {
                    setLoading(false);
                    console.log(error);
                }
            );
        },
    });

  return (
    <section className="md:min-h-[500px] ss:min-h-[600px] min-h-[500px] 
    flex items-center md:px-16 px-6 mt-56">
        <div className="items-center w-full flex flex-col md:gap-10 
        font-manierRegular">
            <div className='w-full flex justify-between items-center'>
                <div className='flex'>
                    <h1 className='text-secondary md:text-[23px] ss:text-[20px] 
                    text-[18px]'>
                        Send messages to members, guests or both! 
                    </h1>
                </div>
            </div>

            <div className='w-full'>
                <form onSubmit={formik.handleSubmit}
                className="flex flex-col md:w-1/2 md:gap-8 ss:gap-6 gap-4">
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

                    <div className="col-span-2 md:mt-0 ss:mt-0 mt-5">
                        <button
                        type="submit"
                        className="bg-secondary grow4 cursor-pointer rounded-md
                        md:text-[16px] ss:text-[14px] text-[14px] md:py-3.5 
                        ss:py-3 py-3 md:px-16 ss:px-16 px-14
                        "
                        >
                            {loading ? 'Sending...' : 'Send Message'}
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