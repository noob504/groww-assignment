import React from "react";
import { useRouter } from "next/router";

import NavBar from "../../components/NavBar/NavBar";
import UserProfile from "../../components/UserProfile/UserProfile";

const UserPage = () => {
  const router = useRouter();
  const { userName } = router.query;

  return (
    <>
      <NavBar />
      <UserProfile username={userName} />
    </>
  );
};

export default UserPage;
