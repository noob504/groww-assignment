import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import formatDate from "../../../utils/dateUtil";

import styles from "./ListView.module.css";

const ListView = ({ photos, newsFeed, user, userProfile }) => {

  return (
    <>
      {newsFeed ? (
        photos && (
          <div className={styles.postsContainer}>
            {photos.map((photo) => (
              <div key={photo.id} className={styles.post}>
                <div className={styles.postHead}>
                  <Link href={`/user/${photo.user.username}`}>
                    <div className={styles.postHeadLeft}>
                      <Image
                        src={photo.user.profile_image.medium}
                        width={50}
                        height={50}
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                        alt={photo.user.name}
                      />
                      <p
                        style={{
                          fontWeight: "bold",
                          marginRight: "5px",
                        }}
                      >
                        {photo.user.name}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className={styles.postImage}>
                  <Image
                    src={photo.urls.regular}
                    width={500}
                    height={500}
                    alt={photo.alt_description}
                  />
                </div>
                <div className={styles.postBody}>
                  <div className={styles.postBodyData}>
                    <p>{photo.likes} likes</p>
                    <p>{formatDate(photo.created_at)}</p>
                  </div>
                  <p>
                    <span
                      style={{
                        fontWeight: "bold",
                        marginRight: "5px",
                      }}
                    >
                      {photo.user.name}
                    </span>
                    {photo.description || photo.alt_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      ) : null}

      {userProfile ? (
        user && (
          <div className={styles.postsContainer}>
            {user.photos.map((photo) => (
              <div key={photo.id} className={styles.post}>
                <div className={styles.postHead}>
                  <Link href={`/user/${user.username}`}>
                    <div className={styles.postHeadLeft}>
                      <Image
                        src={user.profile_image.medium}
                        width={50}
                        height={50}
                        style={{
                          borderRadius: "50%",
                          objectFit: "cover",
                          marginRight: "10px",
                        }}
                        alt={user.name}
                      />
                      <p
                        style={{
                          fontWeight: "bold",
                          marginRight: "5px",
                        }}
                      >
                        {user.username}
                      </p>
                    </div>
                  </Link>
                </div>
                <div className={styles.postImage}>
                <Image
                    src={photo.urls.regular}
                    width={500}
                    height={500}
                    alt={photo.alt_description}
                  />
                </div>
                <div className={styles.postBody}>
                  <div className={styles.postBodyData}>
                    {/* <p>{photo.likes} likes</p> */}
                    <p>{formatDate(photo.created_at)}</p>
                  </div>
                  <p>
                    <span
                      style={{
                        fontWeight: "bold",
                        marginRight: "5px",
                      }}
                    >
                      {user.username}
                    </span>
                    {photo.description || photo.alt_description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )
      ) : null}
    </>
  );
};

export default ListView;
