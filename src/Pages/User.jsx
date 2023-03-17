import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
function ImagePage() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const fetchUser = async () => {
    try {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      const data = await response.json();
      setUser(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!user) {
    return <div>Loading...</div>;
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
        <div></div>
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
`;
