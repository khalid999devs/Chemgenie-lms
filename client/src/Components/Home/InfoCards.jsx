import { BsFillPeopleFill } from 'react-icons/bs';
import { PiStudentBold } from 'react-icons/pi';
import { GiSandsOfTime } from 'react-icons/gi';

const InfoCard = ({ iconSrc, number, text }) => {
  return (
    <div className='flex items-center gap-4 p-5 bg-primary-main shadow-md rounded-xl w-full min-w-[300px] max-w-[320px] hover:shadow-xl transition-all duration-300'>
      <div className='p-3 rounded-lg text-3xl flex items-center justify-center'>
        <img src={iconSrc} alt={text} className='w-10 h-10' />
      </div>
      <div className='whitespace-nowrap'>
        <h1 className='text-lg font-semibold text-darkText'>{text}</h1>
        <p className='text-xl font-bold text-gray-600'>{number}</p>
      </div>
    </div>
  );
};

const InfoCards = () => {
  return (
    <div className='flex flex-wrap gap-6 justify-center py-10 mt-32 md:mt-20'>
      <InfoCard
        iconSrc='/icons/community.png'
        text='Community Members'
        number='24.6K+'
      />
      <InfoCard iconSrc='/icons/students.png' text='Students' number='6000+' />
      <InfoCard iconSrc='/icons/hours.png' text='Hours' number='300+' />
    </div>
  );
};

export default InfoCards;
