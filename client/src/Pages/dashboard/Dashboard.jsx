import { useState, createContext, useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import Nav from '../../Components/ClientDashboard/Nav';
import Header from '../../Components/ClientDashboard/Header';
import { getClient } from '../../axios/getClientInfo';
const ProfileContext = createContext('');

const Dashboard = () => {
  const [profileFetchTrigger, setProfileFetchTrigger] = useState(false);
  const [userProfile, setUserProfile] = useState({
    id: 0,
    userName: '',
    fullName: '',
    email: '',
    role: '',
    image: '',
    phone: '',
    clientcourses: [
      {
        id: null,
        courseId: null,
        clinetId: null,
      },
    ],
  });

  useEffect(() => {
    getClient(setUserProfile);
  }, [profileFetchTrigger]);

  return (
    <ProfileContext.Provider
      value={{
        userProfile,
        setUserProfile,
        setProfileFetchTrigger,
      }}
    >
      <div className='m-auto my-10 mt-16 md:mt-12 '>
        <Header />
        <div className='grid md:grid-cols-[auto,1fr]'>
          <Nav />
          <div className='pt-6 md:pl-6 w-full'>
            <Outlet context={userProfile} />
          </div>
        </div>
      </div>
    </ProfileContext.Provider>
  );
};

export const ProfileContextConsumer = () => {
  return useContext(ProfileContext);
};

export default Dashboard;
