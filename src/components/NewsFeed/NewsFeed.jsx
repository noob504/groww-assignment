import React, { useEffect, useState, useCallback } from "react";

import { useSelector, useDispatch } from "react-redux";
import { fetchRandomPhotos } from "../../app/reducers/photoSlice.js";

import ListView from "../Posts/ListView/ListView";

const NewsFeed = () => {
  const { photos } = useSelector((state) => state.photos);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);

  const infiniteScrollHandler = useCallback(() => {
    if (
      window.innerHeight + document.documentElement.scrollTop + 1 >=
      document.documentElement.offsetHeight
    ) {
      setIsLoading(true);
      dispatch(fetchRandomPhotos());
      setIsLoading(false);
    }
  }, [dispatch]);
  useEffect(() => {
    window.addEventListener("scroll", infiniteScrollHandler);
    return () => {
      window.removeEventListener("scroll", infiniteScrollHandler);
    };
  }, [infiniteScrollHandler]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchRandomPhotos());
    setIsLoading(false);
  }, [dispatch]);

  return isLoading ? <div>Loading...</div> : <ListView photos={photos} newsFeed={true}/>;
};

export default NewsFeed;
