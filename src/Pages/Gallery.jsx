import React from 'react';
import styled from 'styled-components';
import { useEffect, useState, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';
import loadingImg from '../images/loading.gif';
const Gallery = () => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchPictures = async () => {
    setIsLoading(true);
    try {
      let url;
      if (typeof page === 'object' && page.nextPage) {
        url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page.nextPage}/20`;
      } else {
        url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/20`;
      }
      const response = await fetch(url);

      const { pagination, list } = await response.json();

      setPhotos((prevPhotos) => [...prevPhotos, ...list]);
      setPage(pagination);

      if (page.current * page.pageSize >= page.total - page.pageSize) {
        setHasMore(false);
      }
    } catch (error) {
      console.log(error);
    }
    setIsLoading(false);
  };
  // fetch photos when the page loads for the first time
  useEffect(() => {
    fetchPictures();
  }, []);
  // observer function
  const observer = useRef();
  const lastElement = useCallback(
    (node) => {
      if (isLoading || photos.length === 0) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (hasMore) {
              fetchPictures();
            }
          }
        },
        {
          rootMargin: '0px',
          threshold: 1.0,
        }
      );
      if (node) observer.current.observe(node);
    },
    [isLoading]
  );

  if (photos.length === 0) {
    return (
      <Wrapper>
        <p>No Users</p>
      </Wrapper>
    );
  }
  return (
    <Wrapper>
      <div className='users'>
        <div className='list'>
          {photos.map((photo, index) => {
            if (photos.length === index + 1) {
              return (
                <div className='list-item' key={photo.id} ref={lastElement}>
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
              );
            } else {
              return (
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
              );
            }
          })}
        </div>
        <div className='loading'>
          <img src={loadingImg} alt='' />
        </div>
      </div>
    </Wrapper>
  );
};

export default Gallery;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  .loading {
    text-align: center;

    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading img {
    width: 100px;
    height: 100px;
  }
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
