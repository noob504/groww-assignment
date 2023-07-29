import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import ListView from "../Posts/ListView/ListView";

import { useSelector, useDispatch } from "react-redux";
import { setPhotos } from "../../app/reducers/photoSlice.js";
import { setPage } from "../../app/reducers/pageSlice.js";

import imageData from "../../dummy-data/image_data.json";

const NewsFeed = () => {
  // re-declared the state in the store
  // const [photos, setPhotos] = useState([]);
  // const [page, setPage] = useState(1);

  // const photos = useSelector((state) => state.photos);
  // const page = useSelector((state) => state.page);

  // const dispatch = useDispatch();

  // const fetchRandomPhotos = async (page) => {
  //     try {
  //       const response = await fetch(
  //         `https://api.unsplash.com/photos/random/?client_id=${process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY}&count=10&page=${page}`,
  //       );
  //       if (!response.ok) {
  //         throw new Error("Failed to fetch photos");
  //       }
  //         const data = await response.json();
  //         console.log(data)
  //       dispatch(setPhotos(data));
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

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

  // const fetchRandomPhotos = () => {
  //     const data = imageData;
  //     // setPhotos((prevPhotos) => [...prevPhotos, ...data]);
  //     dispatch(setPhotos((prevPhotos) => [...prevPhotos, ...data]));
  //     console.log(">>>api data: ", typeof(data))
  //     console.log(data)
  // };

  // const infiniteScrollHandler = async () => {

  //     try {
  //         if (
  //             window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight

  //         ) {
  //             dispatch(setPage((prevPage) => prevPage + 1));
  //             console.log("page: ", page)
  //         }
  //     } catch (error) {
  //         console.log(error)
  //     }
  // };

  // useEffect(() => {
  //     window.addEventListener("scroll", handleScroll);
  //     return () => {
  //         window.removeEventListener("scroll", handleScroll);
  //         console.log("1st useeffect called")
  //     };
  // }, [page]);

  // useEffect(() => {
  //     fetchRandomPhotos();
  //     console.log("2nd useeffect called")
  // }, [page]);

  // useEffect(() => {
  //     window.addEventListener("scroll", infiniteScrollHandler);

  //     // useEffect cleanup function
  //     return () => {
  //         window.removeEventListener("scroll", infiniteScrollHandler);
  //     }
  // }, []);

  /* ==================================================== */
  const [initialLoad, setInitialLoad] = useState(true);
  const photos = useSelector((state) => state.photos);
  const page = useSelector((state) => state.page);
  const dispatch = useDispatch();

  // Fetch the initial page of data using local state
  useEffect(() => {
    if (initialLoad) {
      fetchRandomPhotos(1);
      setInitialLoad(false);
    }
  }, [dispatch, initialLoad]);

  const infiniteScrollHandler = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      dispatch(fetchRandomPhotos(page + 1));
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollHandler);
    return () => {
      window.removeEventListener("scroll", infiniteScrollHandler);
    };
  }, [dispatch, page]);

  return <ListView photos={photos} />;
};

export default NewsFeed;
