import { Link } from 'react-router-dom';
import LoginForm from '../Components/Account/Client/LoginForm';
import { useEffect } from 'react';

function ClientLogin() {
  useEffect(() => {
    window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
  }, []);
  return (
    <div className=' signin min-h-[60vh] max-w-[700px] m-auto p-4 mb-24 mt-14'>
      <div className='mb-5'>
        <h1 className='text-center '>
          Don't have an account?{' '}
          <Link
            to={'/signup'}
            className='text-blue-500 text-center transition-color hover:text-blue-700'
          >
            Register now
          </Link>
        </h1>
      </div>
      <LoginForm />
    </div>
  );
}

export default ClientLogin;
