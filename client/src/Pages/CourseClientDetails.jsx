import FixedCard from '../Components/CourseDetails/FixedCard';
import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState, createContext, useContext } from 'react';
import { clientFCourse } from '../axios/fetchCourses';
import { ContextConsumer } from '../App';
import PrimaryButton from '../Components/Buttons/PrimaryButton';
import StudentCoursePage from '../Components/ClientCourseDetails/StudentCoursePage';

const CourseContext = createContext('');

const CourseClientdetails = () => {
  const { cid } = useParams();
  const { user } = ContextConsumer();
  const [courseInfo, setCourse] = useState({});
  const navigate = useNavigate();

  // console.log(courseInfo);

  useEffect(() => {
    clientFCourse(cid, setCourse);
  }, [cid]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }, [courseInfo]);

  if (!user?.enrolledCourses?.find(() => ({ courseId: cid })))
    return (
      <div className='min-h-screen'>
        <h1 className='text-red-600 text-center text-2xl font-bold mt-24'>
          You are not allowed to view this page.
        </h1>
        <section className='p-20'>
          <p>It seems you have not enrolled this course.</p>
          <PrimaryButton
            classes={'bg-yellow-400 text-black m-5 hover:bg-yellow-300'}
            text={'Visit now'}
            onClick={() => {
              navigate(`/courses/${cid}`);
            }}
          />
        </section>
      </div>
    );
  return (
    <CourseContext.Provider value={{ courseInfo, setCourse }}>
      <div className='w-full m-auto mb-20 mt-6 relative'>
        {!user?.enrolledCourses.find(() => ({ courseId: cid })) && (
          <FixedCard
            cardDetails={{
              id: courseInfo?.id,
              img: courseInfo?.image,
              rating: courseInfo?.ratings,
              price: courseInfo?.price,
            }}
          />
        )}
        {user?.enrolledCourses.find(() => ({ courseId: cid })) && (
          <StudentCoursePage />
        )}
      </div>
    </CourseContext.Provider>
  );
};
export const CourseContextConsumer = () => {
  return useContext(CourseContext);
};
export default CourseClientdetails;
