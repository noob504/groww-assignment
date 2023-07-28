import React from 'react'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import GridView from '../Posts/GridView/GridView';
import ListView from '../Posts/ListView/ListView';

import styles from "./UserProfile.module.css";
import userData from '../../dummy-data/user_data.json';

const UserProfile = ({ username }) => {
    const [viewType, setViewType] = useState('grid');

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                const response = await fetch(
                    `https://api.unsplash.com/users/:username/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
                );
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

    // const user = userData;
    // console.log(user)

    const handleViewChangeType = (type) => {
        setViewType(type);
    };

    console.log(">>> user image array", user.photos)

    return (
        <div className={styles.userProfile}>

            <div className={styles.userProfileCard}>
                <div className={styles.userProfileCardImage}>
                    <Image
                        src={user.profile_image.large}
                        alt={user.name}
                        width={200}
                        height={200}
                        style={{
                            borderRadius: '50%',
                        }}
                    />
                </div>
                <div className={styles.userProfileCardDetails}>
                    <h3>{user.name}</h3>
                    <p>{user.total_photos} <span>Posts</span>&nbsp;&nbsp;&nbsp;&nbsp; {user.total_collections} <span>Collections</span></p>
                    <p>{user.bio}</p>
                    {/* need to find the size of the array returned by the links to determine the number */}
                    {/* <p>{user.links.following}Following</p> */}
                    {/* <p>{user.links.followers}Followers</p> */}

                </div>
            </div>

            <span className={styles.divider} />

            <div className={styles.viewToggler}>
                <button
                    onClick={() => handleViewChangeType('grid')}
                    className={viewType === 'grid' ? styles.buttonActive : ''}
                >
                    Grid View
                </button>
                <button
                    onClick={() => handleViewChangeType('list')}
                    className={viewType === 'list' ? styles.buttonActive : ''}
                >
                    List View

                </button>
            </div>

            {viewType === 'grid' ? (
        <GridView user={user} />
      ) : (
        <ListView user={user} />
      )}
        </div>
    );
};

export default UserProfile;
