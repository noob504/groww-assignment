import Image from "next/image";

import { useEffect, useState } from "react";

import imageData from "../../dummy-data/image_data.json";
import formatDate from '../../utils/dateUtil'
import styles from "./NewsFeed.module.css";

const NewsFeed = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);



    // console.log(process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY);

    // const fetchRandomPhotos = async () => {
    //     try {
    //         const response = await fetch(
    //             `https://api.unsplash.com/photos/random/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&count=10&page=${page}`,
    //         );
    //         if (!response.ok) {
    //             throw new Error("Failed to fetch photos");
    //         }
    //         const data = await response.json();
    //         console.log(">>>", data)
    //         setPhotos((prevPhotos) => [...prevPhotos, ...data]);
    //     } catch (error) {
    //         console.error(error);
    //     }
    // };

    const fetchRandomPhotos = () => {
        const data = imageData;
        setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        console.log(">>>api data: ", data)
    };

    const infiniteScrollHandler = async () => {

        try {
            if (
                window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight

            ) {
                setPage((prevPage) => prevPage + 1);
                console.log("page: ", page)
            }
        } catch (error) {
            console.log(error)
        }
    };

    // useEffect(() => {
    //     window.addEventListener("scroll", handleScroll);
    //     return () => {
    //         window.removeEventListener("scroll", handleScroll);
    //         console.log("1st useeffect called")
    //     };
    // }, [page]);

    useEffect(() => {
        fetchRandomPhotos();
        console.log("2nd useeffect called")
    }, [page]);

    useEffect(() => {
        window.addEventListener("scroll", infiniteScrollHandler);

        // useEffect cleanup function
        return () => {
            window.removeEventListener("scroll", infiniteScrollHandler);
        }
    }, []);

    return (
        <div>
            <div className={styles.postsContainer}>
                {photos.map((photo) => (
                    <div key={photo.id} className={styles.post}>
                        <div className={styles.postHead}>
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
                                <p style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                }}>
                                    {photo.user.name}
                                </p>
                            </div>

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
                            <div className={styles.postBodyData}>
                                <p>{photo.likes} likes
                                </p>
                                <p>{formatDate(photo.created_at)}</p>
                            </div>
                            <p>
                                <span style={{
                                    fontWeight: "bold",
                                    marginRight: "5px",
                                }}>{photo.user.name}</span>
                                {photo.description || photo.alt_description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default NewsFeed;
