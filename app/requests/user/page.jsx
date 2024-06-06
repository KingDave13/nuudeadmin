'use client';



const UserDetails = () => {
 

  // useEffect(() => {
  //   if (id) {
  //     fetch(`/api/requests/${id}`)
  //       .then(response => response.json())
  //       .then(data => {
  //         if (data.success) {
  //           setUserData(data.data);
  //         } else {
  //           setError(data.message);
  //         }
  //         setLoading(false);
  //       })
  //       .catch(err => {
  //         setError(err.message);
  //         setLoading(false);
  //       });
  //   }
  // }, [id]);

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error}</div>;

  return (
    <div className="container mx-auto p-4 text-white">
     hello
    </div>
  );
};

export default UserDetails;