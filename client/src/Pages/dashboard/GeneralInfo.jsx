import IconNumCard from '../../Components/ClientDashboard/IconNumCard';
import { ProfileContextConsumer } from './Dashboard';
import { GiGraduateCap } from 'react-icons/gi';
import CourseProCard from '../../Components/ClientDashboard/CourseProCard';

const GeneralInfo = () => {
  const { userProfile } = ProfileContextConsumer();

  return (
    <div className='w-full'>
      <div className='flex flex-col gap-5 mb-6 w-full'>
        <h1 className='text-xl font-medium '>Dashboard</h1>
        <div className='flex flex-col lg:flex-row gap-4 lg:gap-5 w-full'>
          <IconNumCard
            icon={<GiGraduateCap />}
            text={'Active Courses'}
            number={userProfile?.clientcourses?.length}
          />
          {/* <IconNumCard
            icon={<BsBookFill />}
            text={"Enrolled Courses"}
            number={userProfile?.enrolledCourses?.length}
          /> */}
        </div>
      </div>

      <div className='flex flex-col gap-5 mb-6 w-full'>
        <h1 className='text-xl font-medium mt-4 sm:mt-0'>
          In Progress Courses
        </h1>
        <div className='flex flex-row flex-wrap gap-4 justify-center sm:justify-start w-full'>
          {userProfile?.clientcourses?.length > 0 ? (
            userProfile?.clientcourses?.map((course, value) => {
              if (course?.id !== null)
                return (
                  <CourseProCard
                    key={value}
                    img={course?.img || '/Images/cardPH.jpg'}
                    id={course?.courseId}
                  />
                );
            })
          ) : (
            <p className='text-center text-xl text-slate-800 font-extrabold tracking-wider mt-4 opacity-90'>
              Empty
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default GeneralInfo;
