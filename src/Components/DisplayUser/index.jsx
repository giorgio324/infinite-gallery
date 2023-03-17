import React from 'react';

const DisplayUser = ({ array }) => {
  if (array.length === 0) {
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
          {array.map((photo, index) => {
            if (array.length === index + 1) {
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

export default DisplayUser;
