'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const ResetPassword = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState(null);
    const router = useRouter();
    const { token } = router.query;

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const formik = useFormik({
        initialValues: {
            newPassword: '',
            confirmPassword: '',
        },
        validationSchema: Yup.object({
            newPassword: Yup.string()
                .min(6, 'Password must be at least 6 characters long.')
                .required('New password is required.'),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('newPassword'), null], 'Passwords must match.')
                .required('Confirm password is required.'),
        }),
        onSubmit: async (values) => {
            try {
                const response = await fetch('/api/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        token,
                        newPassword: values.newPassword,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    setMessage('Password reset successfully. You can now log in with your new password.');
                } else {
                    setMessage(data.message || 'Failed to reset password.');
                }
            } catch (error) {
                setMessage('An error occurred while resetting your password. Please try again.');
            }
        },
    });

    return (
        <section className="flex w-full items-center justify-center 
        min-h-screen p-6 bg-primaryalt">
            <div className="w-full max-w-md p-8 bg-primary rounded-lg 
            shadow-lg">
                <h2 className="text-2xl font-bold text-center text-white 
                mb-6">
                    Reset Password
                </h2>

                {message && <p className="text-center text-white mb-6">{message}</p>}

                <form onSubmit={formik.handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-white">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="newPassword"
                                value={formik.values.newPassword}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                placeholder="Enter your new password"
                                className="w-full px-4 py-2 bg-primary border border-gray-300 rounded-md text-white placeholder-text-textalt focus:outline-none"
                            />
                            <div className="absolute inset-y-0 right-0 flex items-center pr-4">
                                {showPassword ? (
                                    <FaEyeSlash className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                                ) : (
                                    <FaEye className="text-gray-400 cursor-pointer" onClick={togglePasswordVisibility} />
                                )}
                            </div>
                        </div>
                        {formik.touched.newPassword && formik.errors.newPassword ? (
                            <p className="mt-2 text-sm text-mainRed">{formik.errors.newPassword}</p>
                        ) : null}
                    </div>

                    <div>
                        <label className="block text-white">
                            Confirm New Password
                        </label>
                        <input
                            type={showPassword ? 'text' : 'password'}
                            name="confirmPassword"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Confirm your new password"
                            className="w-full px-4 py-2 bg-primary border
                             border-gray-300 rounded-md text-white 
                             placeholder-text-textalt focus:outline-none"
                        />
                        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
                            <p className="mt-2 text-sm text-mainRed">
                                {formik.errors.confirmPassword}
                            </p>
                        ) : null}
                    </div>

                    <button
                        type="submit"
                        className="w-full py-2 px-4 bg-secondary 
                        text-primary rounded-md font-manierMedium 
                        cursor-pointer"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ResetPassword;