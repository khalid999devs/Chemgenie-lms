import { FaArrowRight } from 'react-icons/fa6';
import Star from './Star';
import { reqImgWrapper } from '../../assets/requests';

const Coursecard = ({
  cardDetails: { title, description, price, id, ratings, image },
  onClick,
  hasEnrolled,
  classes,
}) => {
  const descriptionLengthLimit = 100;
  return (
    <div
      className={`w-[370px] h-[455px] border mx-auto rounded-xl shadow-lg bg-onPrimary-main hover:scale-[101%] duration-500 transition-transform cursor-pointer flex flex-col overflow-hidden ${classes}`}
      onClick={onClick}
    >
      <img
        className='w-full h-[200px] object-cover'
        src={reqImgWrapper(image)}
        alt='course image'
      />

      <div className='p-5 flex flex-col flex-grow text-Text'>
        <h5 className='text-xl font-semibold'>{title || 'Course Title'}</h5>

        <p className='text-primary-dark text-sm mt-3 line-clamp-3 flex-grow'>
          {(description?.length > descriptionLengthLimit
            ? description.slice(0, descriptionLengthLimit) + '...'
            : description) || 'A brief description of the course goes here...'}
        </p>

        {/* Ratings */}
        <div className='flex items-center mt-4'>
          {Array.from({ length: parseInt(ratings) || 0 }, (_, i) => (
            <Star key={i} />
          ))}
          {ratings && (
            <span className='text-xs font-semibold ml-3 px-3 py-1 rounded-full bg-secondary-main text-darkText'>
              {ratings}.0
            </span>
          )}
        </div>

        {/* Price & Button */}
        <div className='flex items-center justify-between mt-6'>
          <span className='text-xl font-bold'>{price || '2000'} TK</span>
          <button className='text-darkText font-medium rounded-lg text-sm px-5 py-2.5 bg-secondary-main opacity-90 hover:opacity-100 flex items-center gap-2'>
            <span>{hasEnrolled ? 'Enter Course' : 'See details'}</span>
            <FaArrowRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Coursecard;
