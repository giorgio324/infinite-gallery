import React from 'react';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // fetch photos when the page loads for the first time
  const fetchPictures = async () => {
    try {
      let url;
      setIsLoading(true);
      if (typeof page === 'object' && page.nextPage) {
        url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page.nextPage}/20`;
      } else {
        url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`;
      }
      const response = await fetch(url);

      const { pagination, list } = await response.json();

      setPhotos((prevPhotos) => [...prevPhotos, ...list]);
      setPage(pagination);
      console.log(photos);
      console.log(page);
      console.log(pagination);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error);
    }
  };
  useEffect(() => {
    fetchPictures();
  }, []);
  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight;
    const scrollTop = document.documentElement.scrollTop;
    const clientHeight = document.documentElement.clientHeight;

    if (scrollTop + clientHeight >= scrollHeight - 5 && !isLoading) {
      fetchPictures();
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isLoading]);

  return (
    <Wrapper>
      <div>
        {photos.map((photo) => (
          <Link key={photo.id} to={`/user/${photo.id}`}>
            <img src={photo.imageUrl} alt={photo.lastName} />
            <h2>{photo.name}</h2>
          </Link>
        ))}
      </div>

      {isLoading && <p>Loading...</p>}
    </Wrapper>
  );
};

export default Gallery;

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1200px;
  margin: 0 auto;
  div {
    width: 100%;
  }
  div a {
    width: 25%;
    display: inline-block;
  }
  div img {
    width: 100%;
  }
`;
