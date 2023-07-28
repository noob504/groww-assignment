import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import formatDate from "../../../utils/dateUtil"

import styles from './GridView.module.css'

const GridView = ({ user }) => {
    // console.log(user)
    return (
        <div>
            <div className={styles.gridContainer}>
                {user.photos.map((photo) => (
                    <div key={user.photos.id} className={styles.post}>
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
                            <p style={{
                                fontWeight: "bold",
                                marginRight: "5px",
                            }}>
                                {user.name}
                            </p>
                        </div>
                        </Link>

                    </div>
                    <div className={styles.postImage}>
                        <Image
                            src={photo.urls.regular}
                            // width={500}
                            // height={500}
                            width={500}
                            height={500}
                            alt={photo.alt_description}
                        />
                    </div>
                        <div className={styles.postBody}>
                        <p>
                            <span style={{
                                fontWeight: "bold",
                                marginRight: "5px",
                            }}>{user.name}</span>
                            {photo.description || photo.alt_description}
                        </p>
                        <div className={styles.postBodyData}>
                            <p>{formatDate(photo.created_at)}</p>
                        </div>
                        
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default GridView
