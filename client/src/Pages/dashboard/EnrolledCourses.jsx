import React from 'react';
import CourseProCard from '../../Components/ClientDashboard/CourseProCard';
import { ProfileContextConsumer } from './Dashboard';

const EnrolledCourses = () => {
  const { userProfile } = ProfileContextConsumer();

  return (
    <div className='flex flex-col gap-5 mb-6 w-full pt-5 md:pt-0'>
      <h1 className='text-2xl md:text-xl font-medium text-center md:text-left'>
        Enrolled Courses
      </h1>
      <div className='flex flex-wrap gap-4 w-full justify-center md:justify-start'>
        {/* {userProfile?.clientcourses?.map((course, value) => {
          return (
            <CourseProCard
              key={value}
              img={course.img || '/Images/cardPH.jpg'}
              title={course.name}
              id={course.id}
              rating={course.rating}
              progress={course.progress}
            />
          );
        })} */}
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
  );
};

export default EnrolledCourses;
