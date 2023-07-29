import React from "react";
import { useEffect, useState } from "react";
import Image from "next/image";

import GridView from "../Posts/GridView/GridView";
import ListView from "../Posts/ListView/ListView";

import styles from "./UserProfile.module.css";

import GridIcon from "../../../public/assets/icons/grid-icon.svg";
import ListIcon from "../../../public/assets/icons/list-icon.svg";

import userData from "../../dummy-data/user_data.json";

const UserProfile = ({ username }) => {
  const [viewType, setViewType] = useState("grid");
  // const [user, setUser] = useState(null);

  // useEffect(() => {
  //   const fetchUserProfile = async () => {
  //     try {
  //       const response = await fetch(`https://api.unsplash.com/users/${username}/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`);

  //       if (!response.ok) {
  //         throw new Error('Failed to fetch user profile');
  //       }

  //       const data = await response.json();
  //       // console.log(data);
  //       setUser(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   if (username) {
  //     fetchUserProfile();
  //   }
  // }, [username]);

  const user = userData;
  console.log(user);

  const handleViewChangeType = (type) => {
    setViewType(type);
  };

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
              {/* need to find the size of the array returned by the links to determine the number */}
              {/* <p>{user.links.following}Following</p> */}
              {/* <p>{user.links.followers}Followers</p> */}
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
            <ListView user={user} />
          )}
        </div>
      )}
    </>
  );
};

export default UserProfile;
