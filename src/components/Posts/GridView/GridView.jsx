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
                    <div key={user.photos.id} className={styles.gridItem}>
                    <div className={styles.postImage}>
                        <Image
                            src={photo.urls.regular}
                            width={500}
                            height={500}
                            alt={photo.alt_description}
                        />
                    </div>
                </div>
                ))}
            </div>
        </div>
    )
}

export default GridView
