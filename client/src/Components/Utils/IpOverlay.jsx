import React from 'react';

const IpOverlay = ({ ip, color = 'white' }) => {
  return (
    <div className='fixed bottom-6 md:bottom-14 right-6 z-50 pointer-events-none select-none'>
      <h2
        className={`m-0 text-xs font-medium ${
          color === 'white' ? 'opacity-50' : 'opacity-30'
        } tracking-wide text-${color} drop-shadow-sm mix-blend-difference`}
      >
        Your Network IP
      </h2>
      <p
        className={`m-0 mt-0.5 text-sm md:text-base font-bold ${
          color === 'white' ? 'opacity-50' : 'opacity-30'
        } tracking-wide text-${color} drop-shadow mix-blend-difference`}
      >
        {ip}
      </p>
    </div>
  );
};

export default IpOverlay;
