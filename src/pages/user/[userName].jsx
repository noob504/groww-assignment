import React from 'react';
import { useRouter } from 'next/router';
import UserProfile from '../../components/UserProfile/UserProfile';

const UserPage = () => {
  const router = useRouter();
  const { userName } = router.query; 

  return (
    <UserProfile username={userName} />
  );
};

export default UserPage;
