import { useNavigate } from 'react-router-dom';
import Star from '../Courses/Star';
import { useEffect, useState } from 'react';
import { clientFCourse } from '../../axios/global';
import { reqImgWrapper } from '../../assets/requests';

const CourseProCard = ({ id }) => {
  const navigate = useNavigate();
  const [courseInfo, setCInfor] = useState({
    id: 0,
    title: '',
    image: '',
    price: 0,
    schedule: '',
    ratings: 5,
  });

  useEffect(() => {
    clientFCourse(id, setCInfor);
  }, [id]);

  return (
    <div
      key={`cid${id}`}
      className='overflow-hidden rounded-md cursor-pointer duration-500 transition-transform hover:scale-[101%] shadow-sm hover:shadow-md bg-onPrimary-main border max-w-[280px] min-h-[310px] w-full'
      onClick={() => navigate(`/courses/onClientReq/${id}`)}
    >
      <div className='w-full grid'>
        <img
          className='w-full h-[180px] object-cover max-w-sm'
          width={300}
          height={300}
          src={reqImgWrapper(courseInfo.image)}
          alt={courseInfo.title}
        />
      </div>
      <div className='grid p-3 gap-3 md:gap-2 py-5 md:py-4'>
        <div className='flex flex-row gap-2'>
          {Array.from({ length: parseInt(courseInfo.ratings) }, (_, value) => (
            <Star key={value} />
          ))}
        </div>

        <h1 className='text-md text-primary-main min-h-[40px] overflow-hidden text-ellipsis line-clamp-3'>
          {courseInfo.title}
        </h1>
      </div>
    </div>
  );
};

export default CourseProCard;
