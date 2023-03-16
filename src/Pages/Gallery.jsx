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
      <div className='users'>
        <div className='list'>
          {photos.map((photo) => (
            <div className='list-item' key={photo.id}>
              <div className='list-item-content'>
                <Link to={`/user/${photo.id}`}>
                  <img
                    src={`${photo.imageUrl}?v=${photo.id}`}
                    alt={photo.name}
                  />
                  <div className='list-item-text'>
                    <p className='name'>{`${photo.prefix} ${photo.name} ${photo.lastName}`}</p>
                    <p className='title'>{photo.title}</p>
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className='loading'>{isLoading && <p>Loading...</p>}</div>
      </div>
    </Wrapper>
  );
};

export default Gallery;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;

  .list {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .list-item {
    width: 50%;
  }
  .list-item-content {
    margin: 10px;
    border: 1px solid #ccc;
    cursor: pointer;
  }
  .list-item-text .name {
    padding: 2px 10px;
    font-weight: bold;
  }
  .list-item-text .title {
    padding: 2px 10px;
  }
  img {
    width: 100%;
  }
  @media screen and (min-width: 990px) {
    .list-item {
      width: 25%;
    }
  }
`;
