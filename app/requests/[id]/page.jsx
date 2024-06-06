'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const UserDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    <div className="container mx-auto p-4 text-white">
      <button onClick={() => router.back()} className="bg-yellow-500 p-2 rounded">← Go Back</button>
      <h1 className="text-2xl font-bold mt-4">{userData.firstName} {userData.lastName}</h1>
      <p className="text-lg">Payment Status: {userData.paymentStatus}</p>
      <div className="mt-4">
        <div><strong>Email Address:</strong> {userData.email}</div>
        <div><strong>Phone Number:</strong> {userData.phoneNumber}</div>
        <div><strong>Date of Birth:</strong> {userData.dob}</div>
        <div><strong>Gender:</strong> {userData.gender}</div>
        <div><strong>Employer:</strong> {userData.employer}</div>
        <div><strong>Occupation:</strong> {userData.occupation}</div>
        <div><strong>Twitter Handle:</strong> {userData.twitterHandle}</div>
        <div><strong>Instagram Handle:</strong> {userData.instagramHandle}</div>
        <div><strong>Facebook Handle:</strong> {userData.facebookHandle}</div>
        <div><strong>What turns you on the most?</strong> {userData.turnOn}</div>
        <div><strong>If you could amplify an erotic trait within yourself, what would it be?</strong> {userData.eroticTrait}</div>
        <div><strong>What would you contribute to the Nuude! community?</strong> {userData.contribution}</div>
        <div><strong>And finally, how did you find us?</strong> {userData.referral}</div>
      </div>
    </div>
  );
};

export default UserDetails;