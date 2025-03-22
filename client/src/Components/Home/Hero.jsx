import { FaChevronDown } from 'react-icons/fa6';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useNavigate } from 'react-router-dom';
import {
  PiVideo,
  PiChalkboardTeacher,
  PiClock,
  PiExam,
  PiUsersThree,
} from 'react-icons/pi';

const Hero = () => {
  const navigate = useNavigate();
  return (
    <div className='relative w-full flex items-center pt-24 md:pt-20 min-h-[65vh]'>
      <div className='grid md:grid-cols-2 gap-10 items-center h-full w-full my-auto'>
        {/* Left Content */}
        <div className='flex flex-col gap-3 sm:gap-6 max-w-[100%] mx-auto md:mx-0'>
          <p className='text-secondary-dark font-semibold text-base uppercase'>
            Chemistry Online
          </p>
          <h1 className='font-bold text-[2.9rem] sm:text-5xl xl:text-6xl text-onPrimary-main leading-tight sm:leading-[3.5rem] xl:leading-[4.2rem]'>
            Learn <span className=''>Chemistry</span> with&nbsp;
            <span className='text-yellow-400'>Afnan</span>
          </h1>
          <p className='text-onPrimary-main text-md break-words mt-4 sm:mt-0'>
            Interactive classes designed for your success.
          </p>

          <div className='flex gap-5 mt-6 sm:mt-0'>
            <PrimaryButton
              text={'Start Learning'}
              icon={<FaChevronDown />}
              classes={'bg-secondary-main w-fit gap-4 text-xl shadow-lg'}
              textClasses={'text-base'}
              onClick={() => navigate('/courses')}
            />
          </div>

          {/* Online Class Benefits */}
          <div className='flex justify-between gap-4 md:gap-8 mt-10 sm:mt-6'>
            <div className='flex flex-col justify-center text-center sm:text-left sm:flex-row gap-1 sm:justify-start items-center sm:gap-3'>
              <PiVideo size={34} className='text-secondary-dark' />
              <span className='text-darkText text-sm sm:text-base font-medium'>
                Live Sessions
              </span>
            </div>
            <div className='flex flex-col justify-center text-center sm:text-left sm:flex-row gap-1 sm:justify-start items-center sm:gap-3'>
              <PiChalkboardTeacher size={34} className='text-secondary-dark' />
              <span className='text-darkText text-sm sm:text-base font-medium'>
                Expert Tutor
              </span>
            </div>
            <div className='flex flex-col justify-center text-center sm:text-left sm:flex-row gap-1 sm:justify-start items-center sm:gap-3'>
              <PiClock size={34} className='text-secondary-dark' />
              <span className='text-darkText text-sm sm:text-base font-medium'>
                Flexible Timing
              </span>
            </div>
          </div>
        </div>

        {/* Right Image & Floating Cards */}
        <div className='relative mt-12 w-full flex justify-center items-center'>
          <div className='relative w-[90%] sm:w-[85%] md:w-[75%] lg:w-[65%] rounded-2xl shadow-xl border-4 border-white  z-10'>
            <img
              src={'/Images/bannerPic.jpg'}
              className='w-full h-full object-cover rounded-2xl'
              alt='Chemistry Learning'
            />

            {/* Live Exams Card */}
            <div className='absolute bottom-[95%] right-[60%] md:right-[80%] bg-secondary-main py-2 gap-2 px-3 rounded-xl shadow-xl flex flex-row items-center w-max'>
              <PiExam className='text-onPrimary-main text-xl' />

              <span className='text-onPrimary-main text-xs md:text-sm font-medium mt-0.5'>
                Live Exams
              </span>
            </div>

            {/* Student Enrolls Card */}
            <div className='absolute top-[90%] left-[60%] md:left-[70%] lg:left-[80%] xl:left-[86%] md:top-1/2 bg-primary-main p-4 rounded-xl shadow-xl border w-[150px]'>
              <div className='flex flex-col items-center gap-2'>
                <div className='bg-[#FFFAF0] p-2 rounded-full'>
                  <PiUsersThree className='text-lg md:text-2xl' />
                </div>
                <div className='flex flex-col justify-center items-center'>
                  <span className='text-darkText text-xs md:text-sm font-medium'>
                    Students Enrolls
                  </span>
                  <span className='text-base md:text-xl font-bold text-primary'>
                    6K+
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Chemistry Elements */}
          <div className='absolute top-[100%] md:top-[80%] -translate-y-1/2 left-[0%] md:left-[10%] bg-secondary-main opacity-60 text-darkText px-4 py-2 rounded-xl shadow-lg text-sm font-semibold rotate-[-20deg]'>
            H₂O + CO₂
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
