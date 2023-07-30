import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

// import { useDispatch, useSelector } from "react-redux";
// import { fetchUser } from "../../app/reducers/userSlice.js";

import GridView from "../Posts/GridView/GridView";
import ListView from "../Posts/ListView/ListView";

import styles from "./UserProfile.module.css";

import GridIcon from "../../../public/assets/icons/grid-icon.svg";
import ListIcon from "../../../public/assets/icons/list-icon.svg";


const UserProfile = ({ username }) => {
  const [viewType, setViewType] = useState("grid");
  const [user, setUser] = useState(null);

  const handleViewChangeType = (type) => {
    setViewType(type);
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await fetch(`https://api.unsplash.com/users/${username}/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);

        if (!response.ok) {
          throw new Error('Failed to fetch user profile');
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (username) {
      fetchUserProfile();
    }
  }, [username]);


  /* ============ RTK Implementation ============ */
  // TODO: RTK Implementation

  // const { user } = useSelector((state) => state.user);
  // const dispatch = useDispatch();

  // const handleViewChangeType = (type) => {
  //   setViewType(type);
  // };

  // useEffect(() => {
  //   if (username) {
  //     dispatch(fetchUser(username));
  //   }
  // }, [username])

  // console.log(user)

  return (
    <>
      {user && (
        <div className={styles.userProfile}>
          <div className={styles.userProfileCard}>
            <div className={styles.userProfileCardImage}>
              <Image
                src={user.profile_image.large}
                alt={user.name}
                width={200}
                height={200}
                style={{
                  borderRadius: "50%",
                }}
              />
            </div>
            <div className={styles.userProfileCardDetails}>
              <h3>{user.name}</h3>
              <p>
                <b>{user.total_photos}</b> Posts
              </p>
              <p>
                <b>{user.total_collections}</b> Collections
              </p>
              <p>{user.bio}</p>
            </div>
          </div>

          <span className={styles.divider} />

          <div className={styles.viewToggler}>
            <Image
              src={GridIcon}
              onClick={() => handleViewChangeType("grid")}
              className={viewType === "grid" ? styles.buttonActive : ""}
              alt="Grid"
            />
            <Image
              src={ListIcon}
              onClick={() => handleViewChangeType("list")}
              className={viewType === "list" ? styles.buttonActive : ""}
              alt="List"
            />
          </div>

          {viewType === "grid" ? (
            <GridView user={user} />
          ) : (
            <ListView user={user} userProfile={true} />
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
