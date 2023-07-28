import Image from "next/image";

import { useEffect, useState } from "react";


const NewsFeed = () => {
    const [photos, setPhotos] = useState([]);
    const [page, setPage] = useState(1);

    // console.log(process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY);

    const fetchRandomPhotos = async () => {
        try {
            const response = await fetch(
                // `https://api.unsplash.com/photos/random?count=10&page=${page}`,
                `https://api.unsplash.com/photos/random/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&count=10&page=${page}`,
                // {
                //     headers: {
                //         Authorization: `${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}`,
                //     },
                // }
            );
            if (!response.ok) {
                throw new Error("Failed to fetch photos");
            }
            const data = await response.json();
            console.log(">>>", data)
            setPhotos((prevPhotos) => [...prevPhotos, ...data]);
        } catch (error) {
            console.error(error);
        }
    };
    

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop ===
            document.documentElement.offsetHeight
        ) {
            setPage((prevPage) => prevPage + 1);
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    useEffect(() => {
        fetchRandomPhotos();
    }, [page]);

    return (
        <div>
            <h2>News Feed</h2>
            <div>
                {/* Display photos here */}
                {photos.map((photo) => (
                    //   <img
                    //     key={photo.id}
                    //     src=
                    //     alt=
                    //     />
                    <Image
                        key={photo.id}
                        src={photo.urls.regular}
                        width={500}
                        height={500}
                        alt={photo.alt_description}
                    />
                ))}
            </div>
        </div>
    );
};

export default NewsFeed;
