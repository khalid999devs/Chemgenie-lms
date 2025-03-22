import React, { useEffect, useState } from 'react';
import { FaChevronCircleLeft, FaChevronCircleRight } from 'react-icons/fa';
import { MdOutlineClose } from 'react-icons/md';
import { getImageGallery } from '../axios/gallery';
import { reqImgWrapper } from '../assets/requests';

const About = () => {
  return (
    <section className='px-4 lg:px-16 w-full mt-20 pb-32 min-h-[60vh]'>
      <h1 className='text-center text-4xl md:text-5xl font-semibold text-darkText mb-12'>
        <span className='text-secondary-main underline underline-offset-4'>
          <span className='text-onPrimary-main'>About</span>
        </span>{' '}
        <span className='text-yellow-400'>ChemGenie</span>
      </h1>

      <div className='bg-gradient-radial p-8 rounded-2xl shadow-sm max-w-5xl mx-auto text-onPrimary-main space-y-6'>
        <p className='text-lg leading-relaxed'>
          <span className='font-semibold text-secondary-dark'>ChemGenie</span>{' '}
          is a dynamic online chemistry education platform designed to make
          learning chemistry engaging and accessible for students of all levels.
          With interactive lessons, videos, and quizzes, we help students master
          complex concepts and excel academically.
        </p>
        <p className='text-lg leading-relaxed'>
          We believe understanding chemistry unlocks the mysteries of the
          natural world. Our platform combines theoretical knowledge with
          practical applications for a lasting grasp of chemical principles—all
          through an interactive and user-friendly experience.
        </p>
      </div>

      <Gallery />
    </section>
  );
};

const Gallery = () => {
  const [galleryImages, setGallery] = useState([{ img: '' }]);
  const [photoIndex, setPhotoIndex] = useState(0);
  const [openPhoto, setOpenPhoto] = useState(false);

  useEffect(() => {
    getImageGallery(setGallery);
  }, []);

  const prevPhoto = () => {
    setPhotoIndex(photoIndex === 0 ? galleryImages.length - 1 : photoIndex - 1);
  };

  const nextPhoto = () => {
    setPhotoIndex(photoIndex === galleryImages.length - 1 ? 0 : photoIndex + 1);
  };

  return (
    <>
      {/* Fullscreen Image Viewer */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center transition-all duration-300 ${
          openPhoto
            ? 'scale-100 opacity-100'
            : 'scale-75 opacity-0 pointer-events-none'
        }`}
      >
        <FaChevronCircleLeft
          onClick={prevPhoto}
          className='text-white text-3xl cursor-pointer absolute left-10 top-1/2 transform -translate-y-1/2 opacity-70 hover:opacity-100'
        />
        <FaChevronCircleRight
          onClick={nextPhoto}
          className='text-white text-3xl cursor-pointer absolute right-10 top-1/2 transform -translate-y-1/2 opacity-70 hover:opacity-100'
        />
        <MdOutlineClose
          onClick={() => setOpenPhoto(false)}
          className='text-white text-3xl cursor-pointer absolute top-10 right-10 opacity-70 hover:opacity-100'
        />

        <img
          src={reqImgWrapper(galleryImages[photoIndex]?.bigImage)}
          alt='Gallery'
          className='max-h-[80vh] rounded-lg shadow-2xl'
        />
      </div>

      {/* Gallery Grid */}
      <div className='mt-16 flex justify-center flex-wrap gap-2 mx-auto '>
        {galleryImages.map((slide, index) => (
          <div
            key={index}
            className='relative group w-full sm:w-auto cursor-pointer rounded-lg shadow-lg border-2 border-primary-dark'
            onClick={() => {
              setPhotoIndex(index);
              setOpenPhoto(true);
            }}
          >
            <img
              src={reqImgWrapper(slide?.bigImage)}
              alt='Gallery'
              className='w-full h-auto sm:h-[250px] object-cover rounded-lg group-hover:scale-[101%] transition-transform duration-300'
            />
            <div className='absolute inset-0 bg-black bg-opacity-30 opacity-0 group-hover:opacity-100 transition-all flex items-center justify-center text-white text-lg font-semibold'>
              View
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default About;
