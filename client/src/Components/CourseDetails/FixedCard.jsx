import { FaAngleRight } from 'react-icons/fa6';
import Star from '../Courses/Star';
import { reqImgWrapper } from '../../assets/requests';
import { Link } from 'react-router-dom';

const FixedCard = ({
  cardDetails: { id = 1, rating = 5, img, price, title, desc },
}) => {
  return (
    <div className='mt-20 md:mt-0 md:translate-y-3 md:sticky right-0 md:float-right lg:right-[5%] xl:right-[10%] md:top-3 z-30'>
      <div className='m-auto w-[100%] max-w-[500px] sm:w-[450px] md:w-80 lg:w-96 md:max-w-sm mb-10 rounded-lg shadow-lg bg-onPrimary-main hover:shadow-2xl transition-all ease-in-out duration-300'>
        <img
          className='w-full h-[225px] md:h-56 rounded-t-lg object-cover object-center origin-center'
          src={reqImgWrapper(img)}
          alt='product'
        />
        <div className='px-6 pb-6'>
          <div className='flex items-center mt-3 mb-4'>
            {Array.from({ length: parseInt(rating) }, (_, i) => (
              <Star key={i} />
            ))}
            {rating && (
              <span className='flex text-xs font-semibold mr-2 px-2.5 py-0.5 rounded bg-blue-200 text-blue-800 ml-3'>
                {rating}.0
              </span>
            )}
          </div>

          <span
            className='mb-5 block text-primary-dark font-bold 
                          text-2xl sm:text-3xl'
          >
            {price || `2000`} TK
          </span>

          <div className='block md:hidden mt-6'>
            <h2 className='text-3xl font-semibold text-primary-main mb-3'>
              {title}
            </h2>
          </div>

          <Link
            to={`/courses/${id}/enroll`}
            className='block text-center bg-gradient-to-r from-yellow-600 to-yellow-300 text-onPrimary-main font-semibold rounded-lg text-sm px-6 py-3 transition-transform transform hover:scale-[101%] hover:from-yellow-500 hover:to-yellow-600 mt-8'
          >
            Enroll now <FaAngleRight className='inline-block' />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FixedCard;
