import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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
    <div>
      <img src={user.imageUrl} alt='Lorem Picsum' />
      <h1>{user.name}</h1>
      <h1>{user.title}</h1>
    </div>
  );
}

export default ImagePage;
