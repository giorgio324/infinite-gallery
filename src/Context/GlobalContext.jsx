import React, { useState } from 'react';
import { createContext } from 'react';

export const GlobalContext = createContext();
export const GlobalProvider = ({ children }) => {
  // user galery states
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  // single user states
  const [user, setUser] = useState(null);
  const [friends, setFriends] = useState([]);
  const [friendsPage, setFriendsPage] = useState(1);
  const [friendsLoading, setFriendsLoading] = useState(false);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);
  const fetchUser = async (id) => {
    try {
      const response = await fetch(
        `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`
      );
      const data = await response.json();
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };
  const fetchFriends = async (id) => {
    setFriendsLoading(true);
    try {
      let url;
      if (typeof friendsPage === 'object' && friendsPage.nextPage) {
        url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${friendsPage.nextPage}/20`;
      } else {
        url = `http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${friendsPage}/20`;
      }
      const response = await fetch(url);

      const { pagination, list } = await response.json();

      setFriends((prevfriends) => [...prevfriends, ...list]);
      setFriendsPage(pagination);
      if (
        friendsPage.current * friendsPage.pageSize >=
        friendsPage.total - friendsPage.pageSize
      ) {
        setHasMoreFriends(false);
      }
    } catch (error) {
      console.log(error);
    }
    setFriendsLoading(false);
  };
  const clearForNewUser = (id) => {
    setFriends([]);
    setFriendsPage(1);
    setHasMoreFriends(true);
    fetchFriends(id);
    fetchUser(id);
  };
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

  return (
    <GlobalContext.Provider
      value={{
        photos,
        isLoading,
        hasMore,
        fetchPictures,
        user,
        fetchUser,
        fetchFriends,
        friends,
        friendsPage,
        friendsLoading,
        hasMoreFriends,
        clearForNewUser,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
