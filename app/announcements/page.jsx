'use client';

import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { useFormik } from "formik";
import * as Yup from 'yup';

const Modal = ({ onClose, onSendToMembers, onSendToBoth }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center
      bg-black bg-opacity-50 z-50 font-manierRegular">
      <div className="bg-primaryalt md:p-12 ss:p-10 p-6 rounded-md 
      shadow-xl flex flex-col items-center justify-center h-auto w-auto">
        <p className="text-center md:text-[20px] ss:text-[20px] text-[17px] 
        mb-6 text-white">
          Choose the recipients of your message
        </p>
        <div className="flex flex-col gap-3 w-full">
          <button
            onClick={onSendToMembers}
            className="bg-secondary grow4 cursor-pointer rounded-md
            md:text-[16px] ss:text-[14px] text-[14px] md:py-3.5 
            ss:py-3 py-3 md:px-16 ss:px-16 px-14"
          >
            Send to Members
          </button>
    
          <button
            onClick={onSendToBoth}
            className="bg-secondary grow4 cursor-pointer rounded-md
            md:text-[16px] ss:text-[14px] text-[14px] md:py-3.5 
            ss:py-3 py-3 md:px-16 ss:px-16 px-14"
          >
            Send to Members/Guests
          </button>
          <button
            onClick={onClose}
            className="border-[1px] border-secondary cursor-pointer 
            rounded-md md:text-[16px] ss:text-[14px] text-[14px] 
            md:py-3.5 ss:py-3 py-3 md:px-16 ss:px-16 px-14 mt-2 grow4
            text-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

const MessagePage = () => {
  const [loading, setLoading] = useState(false);
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
      setLoading(false);
      setModalOpen(true);
      disableScroll();
    },
  });

  const handleSendToMembers = async () => {
    try {
      const response = await fetch('/api/members');
      if (!response.ok) {
        throw new Error(`Failed to fetch members: ${response.status} ${response.statusText}`);
      }
      const result = await response.json();
      if (!result.success) {
        throw new Error(`API returned an error: ${result.message}`);
      }
      const membersEmails = result.data.map(member => member.email);
      const membersNames = result.data.map(member => member.name);

      handleEmailSend('members', membersEmails, membersNames);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleSendToBoth = async () => {

    const response = await fetch('/api/guests');
    if (!response.ok) {
      console.error('Failed to fetch guests:', response.status, response.statusText);
      return;
    }
    const result = await response.json();
    if (!result.success) {
      console.error('API returned an error:', result.message);
      return;
    }
    const guestsEmails = result.data.map(guest => guest.email);
    const guestsNames = guestsResult.data.map(guest => guest.name);
  
    handleEmailSend('both', guestsEmails, guestsNames);
  };
  
  const handleEmailSend = async (recipientType, emailList, nameList) => {
    setLoading(true);
    
    const sendEmailPromises = emailList.map((email, index) => {
      const toName = nameList[index];
      
      return emailjs.send(
        'service_skvhseu',
        'template_bu4q17u',
        {
          from_name: 'Nuude!',
          to_name: toName,
          from_email: 'contact@nuude.club',
          to_email: email,
          subject: formik.values.subject,
          message: `${formik.values.message} [Send to: ${recipientType}]`,
        },
        'u4mJjP_i8Ayoq1SU-'
      );
    });
  
    try {
      await Promise.all(sendEmailPromises);
      setLoading(false);
      setModalOpen(false);
      enableScroll();
      formik.resetForm();
    } catch (error) {
      setLoading(false);
      console.error(error);
    }
  };
  

  return (
    <section className="flex items-center md:px-16 px-6 md:mt-60 ss:mt-60 
    mt-60">
      <div className="items-center w-full flex flex-col md:gap-10 ss:gap-10
      gap-8 font-manierRegular">
        <div className='w-full flex justify-between items-center'>
          <div className='flex'>
            <h1 className='text-secondary md:text-[23px] ss:text-[20px] 
            text-[17px]'>
              Send messages to members, guests or both! 
            </h1>
          </div>
        </div>

        <div className='w-full'>
          <form onSubmit={formik.handleSubmit}
            className="flex flex-col md:w-1/2 ss:w-3/4 md:gap-8 ss:gap-6 
            gap-4">
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
                ss:py-3 py-3 md:px-16 ss:px-12 px-10"
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </div>
          </form>
        </div>
      </div>

      {modalOpen && (
        <Modal
          onClose={() => {
            setModalOpen(false);
            enableScroll();
          }}
          onSendToMembers={handleSendToMembers}
          onSendToBoth={handleSendToBoth}
        />
      )}
    </section>
  );
};

export default MessagePage;