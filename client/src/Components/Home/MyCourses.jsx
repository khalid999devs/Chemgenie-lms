import { BiBookReader } from 'react-icons/bi';
import { FaChevronRight } from 'react-icons/fa';
import Coursecard from '../Courses/CourseCard';
import PrimaryButton from '../Buttons/PrimaryButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchCourses } from '../../axios/fetchCourses';

// flex flex-row m-auto items-center justify-center lg:justify-start flex-wrap lg:flex-nowrap

const MyCourses = ({ user }) => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    fetchCourses(setCourses);
  }, []);

  return (
    <div
      id='courses'
      className='mt-[100px] grid place-items-center w-full m-auto gap-5'
    >
      <h1 className='inline-flex items-center text-onPrimary-main font-bold text-[2.4rem] pb-2'>
        <span className='underline underline-offset-4 text-secondary-main'>
          <span className='text-onPrimary-main'>Explore</span>
        </span>
        &nbsp;Courses &nbsp; <BiBookReader className='text-secondary-main ' />
      </h1>
      <div className='flex flex-wrap flex-row m-auto items-center justify-center py-6 gap-5 w-full'>
        {courses
          .reverse()
          .slice(0, 3)
          .map((course, value) => {
            const hasEnrolled = user?.enrolledCourses?.findIndex(
              (ele) => ele?.courseId === course?.id
            );
            if (value < 5)
              return (
                <div key={value}>
                  <Coursecard
                    cardDetails={course}
                    // classes={'!h-full'}
                    onClick={(_) => {
                      if (hasEnrolled === -1) navigate(`/courses/${course.id}`);
                      else navigate(`/courses/onClientReq/${course.id}`);
                    }}
                    hasEnrolled={hasEnrolled !== -1}
                  />
                </div>
              );
          })}
      </div>

      <PrimaryButton
        text={'See all'}
        icon={<FaChevronRight fontSize={'1rem'} />}
        classes={'bg-secondary-main py-3 mt-2 px-10'}
        textClasses={'text-[1.05rem]'}
        onClick={() => {
          navigate('/courses');
        }}
      />
    </div>
  );
};

export default MyCourses;
