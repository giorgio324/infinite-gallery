import { useEffect, useContext, useRef, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import GlobalContext from '../Context/GlobalContext';
import loadingImg from '../images/loading.gif';
function ImagePage() {
  const { id } = useParams();
  const {
    user,
    fetchUser,
    fetchFriends,
    friends,
    friendsPage,
    friendsLoading,
    hasMoreFriends,
    clearForNewUser,
  } = useContext(GlobalContext);

  useEffect(() => {
    clearForNewUser(id);
  }, [id]);
  const observer = useRef();
  const lastElement = useCallback(
    (node) => {
      if (friendsLoading || friends.length === 0) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            if (hasMoreFriends) {
              fetchFriends(id);
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
    [friendsLoading]
  );
  if (!user) {
    return <div>No User</div>;
  }

  return (
    <Wrapper>
      <header>
        <img
          src={`${user.imageUrl}?v=${id}`}
          alt={`${user.name} ${user.lastName}`}
        />
        <fieldset className='field-info'>
          <legend>Info</legend>
          <div>
            <strong>{`${user.prefix} ${user.name} ${user.lastName}`}</strong>
          </div>
          <div>{user.title}</div>
          <br />
          <div>
            <span>Email</span>: {user.email}
          </div>
          <div>
            <span>Ip Adress</span>: {user.ip}
          </div>
          <div>
            <span>Job Description</span>: {user.jobDescriptor}
          </div>
          <div>
            <span>Job Area</span>: {user.jobArea}
          </div>
          <div>
            <span>Job Type</span>: {user.jobType}
          </div>
        </fieldset>
        <fieldset className='field-adress'>
          <legend>Adress</legend>
          <div>
            <strong>{`${user.company.name} ${user.company.suffix}`}</strong>
          </div>
          <div>
            <span>City</span>: {user.address.city}
          </div>
          <div>
            <span>Country</span>: {user.address.country}
          </div>
          <div>
            <span>State</span>: {user.address.state}
          </div>
          <div>
            <span>Street Adress</span>: {user.address.streetAdress}
          </div>
          <div>
            <span>ZIP</span>: {user.address.zipCode}
          </div>
        </fieldset>
      </header>
      <div>
        <div className='history-container'>
          {/* TODO: loop over the array that stores all clicked photo names and display them */}
          <Link
            href={`/user/${id}`}
          >{`${user.prefix} ${user.name} ${user.lastName}`}</Link>
        </div>
        <h2 className='friends-title'>Friends:</h2>

        <div className='list'>
          {friends.map((friend, index) => {
            return (
              <div
                className='list-item'
                key={friend.id}
                ref={index === friends.length - 1 ? lastElement : null}
              >
                <div className='list-item-content'>
                  <Link to={`/user/${friend.id}`}>
                    <img
                      src={`${friend.imageUrl}?v=${friend.id}`}
                      alt={friend.name}
                    />
                    <div className='list-item-text'>
                      <p className='name'>{`${friend.prefix} ${friend.name} ${friend.lastName}`}</p>
                      <p className='title'>{friend.title}</p>
                    </div>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
        <div className='loading'>
          <img src={loadingImg} alt='' />
        </div>
      </div>
    </Wrapper>
  );
}

export default ImagePage;

const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  border: 1px solid #ccc;
  header {
    display: flex;
    justify-content: space-between;
    padding: 20px;
    align-items: center;
  }
  header img {
    height: 200px;
    width: 280px;
  }
  .field-info {
    margin-left: 20px;
    width: 100%;
  }
  .history-container {
    padding: 20px;
  }
  .history-container a {
    color: unset;
    text-decoration: underline;
  }
  header fieldset div span {
    text-decoration: underline;
  }
  .friends-title {
    margin-left: 10px;
    padding: 10px;
  }
  @media only screen and (max-width: 990px) {
    header {
      flex-direction: column;
      align-items: unset;
    }
    .field-info {
      margin-left: 0;
    }
    header img {
      margin: 0 auto;
    }
  }
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
