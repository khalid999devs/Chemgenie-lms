import { Helmet } from 'react-helmet-async';
import { AiOutlineSchedule } from 'react-icons/ai';
import { GoDiscussionClosed } from 'react-icons/go';
import { HiOutlineAcademicCap } from 'react-icons/hi2';
import { MdOutlineSlowMotionVideo } from 'react-icons/md';
import { PiNotePencil, PiNotebook, PiVideoBold } from 'react-icons/pi';

const CourseInfo = ({
  courseInfo = {
    id: '',
    title: '',
    desc: '',
    schedule: '',
    demoLink: '',
    instruct: {},
    img: '',
    tags: '',
  },
}) => {
  return (
    <div className='left-side mt-12 md:mt-20 pb-14 md:w-[56%]'>
      <Helmet>
        {/* Open Graph (OG) meta tags */}
        <meta
          property='og:title'
          content={courseInfo?.title + ' | ChemGenie'}
        />
        <meta property='og:description' content={courseInfo?.desc} />
        <meta property='og:url' content={`/courses/${courseInfo?.id}`} />
        <meta property='og:image' content={courseInfo?.img} />
        <meta property='og:type' content='website' />

        {/* Twitter meta tags */}
        <meta name='twitter:card' content='summary_large_image' />
        <meta
          name='twitter:title'
          content={courseInfo?.title + ' | ChemGenie'}
        />
        <meta name='twitter:description' content={courseInfo?.desc} />
        <meta name='twitter:image' content={courseInfo?.img} />

        {/* page metas */}
        <title>{courseInfo?.title + ' | ChemGenie'}</title>
        <meta name='description' content={courseInfo?.desc} />
        <link rel='canonical' href={`/courses/${courseInfo?.id}`} />
        <meta
          name='keywords'
          content={`${courseInfo?.tags} ChemGenie,chemgenie,Afnan,chemistry with
    afnan,bd chemistry,Chemistry, Chemistry Giant,Chemistry Classes, Chemistry Notes, Online MCQs, Written Model Tests, ZOOM Live Solutions, FB Live Solutions, Chemistry Education, Study Tips, Learning Chemistry, Interactive Chemistry Classes, Chemistry Resources`}
        />
      </Helmet>
      <h1 className='hidden md:block text-left text-[2.6rem] font-bold mb-6 '>
        {courseInfo.title}
      </h1>
      <p className='text-left mb-10'>{courseInfo.desc}</p>
      <div className='flex flex-col gap-6 mb-16 mt-14 md:mt-16'>
        <h4 className=' text-left text-xl border-l-4 border-secondary-dark px-5  flex items-center'>
          <AiOutlineSchedule className='inline-block text-4xl text-secondary-dark mr-5' />
          Schedule: {courseInfo.schedule}
        </h4>

        <h4 className=' text-left text-xl border-l-4 border-violet-400 px-5 flex items-center '>
          <PiVideoBold className='inline-block text-4xl text-onPrimary-main opacity-75 mr-5' />
          Free demo class
          <a
            href={courseInfo.demoLink}
            target='_blank'
            className='px-11 py-2.5 ml-6 bg-primary-dark outline-none opacity-80 transition-all duration-500 hover:opacity-100 hover:outline-none hover:text-black text-black  font-medium rounded-lg text-base text-center  '
          >
            Watch video <MdOutlineSlowMotionVideo className='inline-block' />{' '}
          </a>
        </h4>
      </div>
      <div>
        <h1 className='font-bold text-left text-4xl text-onPrimary-main mb-5'>
          <span className='text-yellow-500'>Course</span>{' '}
          <span className='text-secondary-main underline underline-offset-4'>
            {' '}
            <span className='text-onPrimary-main'>components</span>
          </span>
        </h1>{' '}
        <hr className='mb-5 ' />
        <div className='border-gray-700 bg-onPrimary-main rounded-lg p-5 mb-16 flex flex-col gap-2 '>
          <h4 className='text-white text-left'>
            <HiOutlineAcademicCap className='inline-block text-3xl text-yellow-300' />{' '}
            Live classes & recorded previous classes.
          </h4>
          <h4 className='text-white text-left'>
            <PiNotebook className='inline-block text-3xl text-lime-300' /> Notes
            made by the Instructor
          </h4>
          <h4 className='text-white text-left'>
            <PiNotePencil className='inline-block text-3xl text-pink-600' />{' '}
            Online exams
          </h4>
          <h4 className='text-white text-left'>
            <GoDiscussionClosed className='inline-block text-3xl text-cyan-400' />{' '}
            Discussion forum to solve your problems
          </h4>
        </div>
      </div>
      {/* instructor section ..................*/}
      <h1 className='font-bold text-left text-4xl text-onPrimary-main mb-5'>
        Instructor
      </h1>{' '}
      <hr className='mb-5' />
      <div className='flex flex-col items-center border  rounded-lg shadow md:flex-row   border-gray-700 bg-onPrimary-main hover:bg-gray-700 mb-16'>
        <img
          className='w-24 h-24 m-5 rounded-full shadow-lg '
          src={'/Images/bannerPic.jpg'}
          alt=''
        />
        <div className='flex flex-col justify-between p-4 leading-normal'>
          <h5 className='mb-2 text-2xl font-bold tracking-tight text-left text-white max-[767px]:text-center'>
            {courseInfo.instruct?.name}
          </h5>
          <p className='mb-3 font-normal text-gray-400 text-left max-[767px]:text-center'>
            {courseInfo.instruct?.desc}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CourseInfo;
