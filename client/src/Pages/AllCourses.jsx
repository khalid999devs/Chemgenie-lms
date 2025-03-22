import React, { useEffect, useState } from 'react';
import Coursecard from '../Components/Courses/CourseCard';
import { useNavigate } from 'react-router-dom';
import { fetchCourses } from '../axios/global';
import { ContextConsumer } from '../App';

const AllCourses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const { user } = ContextConsumer();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses(setCourses, setLoading);
  }, []);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [courses]);

  return (
    <div className='flex flex-row mx-auto items-center justify-center md:justify-start w-full flex-wrap py-10 mt-8 gap-5'>
      {courses.map((course, value) => {
        let hasEnrolled = user?.enrolledCourses?.findIndex(
          (ele) => ele?.courseId === course?.id
        );
        return (
          <div key={value}>
            <Coursecard
              onClick={(_) => {
                if (hasEnrolled === -1) navigate(`/courses/${course.id}`);
                else navigate(`/courses/onClientReq/${course.id}`);
              }}
              cardDetails={course}
              hasEnrolled={hasEnrolled !== -1}
            />
          </div>
        );
      })}
      {courses?.length === 0 && (
        <div className='w-full flex items-center justify-center min-h-[200px]'>
          {loading ? (
            <div className='w-[150px] m-auto my-6'>
              <img src='/Images/loading.gif' alt='Loading...' width={'100%'} />
            </div>
          ) : (
            <h1 className='text-rose-500 text-center font-medium text-xl'>
              Courses are not available right now.
            </h1>
          )}
        </div>
      )}
    </div>
  );
};

export default AllCourses;
