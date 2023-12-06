'use client';

import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { motion } from 'framer-motion';
import { slideIn, textVariant } from '@utils/motion';
import { useFormik } from "formik";
import * as Yup from 'yup';
import SectionWrapperAlt from '@hoc/SectionWrapperAlt';

const Login = () => {
    const router = useRouter();

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },

        validationSchema: Yup.object({
            email: Yup.string().email('Email is required.'),
            password: Yup.string().required('Password is required.'),
        }),

        onSubmit: async (values) => {
            
        },
    });
    

  return (
    <section className="mx-auto flex">
      <div className='w-full mx-auto font-manierRegular'>
          <motion.div variants={slideIn('down', 'tween', 0.2, 1)}
            className='w-full'
          >
            <p className='text-white md:text-[17px] ss:text-[15px] 
            text-[14px]'>
              Please enter your login details
            </p>

            <form onSubmit={formik.handleSubmit} 
            className='flex md:flex-row flex-col w-full md:mt-12 md:gap-20
            ss:gap-8 gap-12'>
              <div className="md:gap-8 ss:gap-4 gap-5">
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
                    outline-none text-white md:rounded-[3px] 
                    ss:rounded-[3px] rounded-[3px]
                    placeholder:text-textalt focus:outline-none
                    md:placeholder:text-[14px] 
                    ss:placeholder:text-[12px] 
                    placeholder:text-[12px] bg-primaryalt"
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
                    outline-none text-white md:rounded-[3px] 
                    ss:rounded-[3px] rounded-[3px]
                    placeholder:text-textalt
                    md:placeholder:text-[14px] 
                    ss:placeholder:text-[12px] 
                    placeholder:text-[12px] bg-primaryalt"
                    />
                    <p className="text-mainRed md:text-[12px] 
                    ss:text-[12px] text-[11px] md:mt-2 ss:mt-2 mt-1"
                    >
                        {formik.touched.password && formik.errors.password}
                    </p>
                </div>

                <div className="md:mt-3 ss:mt-3">
                  <button
                  type="submit"
                  className="bg-secondary grow2 w-fit shadow-md 
                  md:text-[16px] ss:text-[14px] text-[13px] 
                  md:py-4 ss:py-3 md:px-20 ss:px-8
                  text-primary md:rounded-[6px] ss:rounded-[3px] 
                  border-none cursor-pointer"
                  > 
                      Login
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
      </div>
    </section>
  );
};

export default SectionWrapperAlt(Login, '');