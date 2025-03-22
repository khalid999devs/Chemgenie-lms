import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getQuesClient } from '../../../axios/fetchExams';
import { reqImgWrapper } from '../../../assets/requests';

export default function ViewQuestion() {
  const [exam, setExam] = useState(null);
  const { examid } = useParams();
  const [tm, setmt] = useState(0);
  useEffect(() => {
    getQuesClient(examid, 'question', setExam, 'server');
  }, [examid]);
  useEffect(() => {
    if (Array.isArray(exam)) setmt(exam?.reduce((p, c) => p + c?.mark || 0, 0));
  }, [exam]);

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0 });
  }, [exam]);

  return (
    <div className='p-2'>
      <h1 className='w-fit mx-auto my-10 font-bold uppercase text-xl'>
        Question Paper for practice
      </h1>
      <p className='bg-yellow-100 border border-yellow-400 text-yellow-700 font-medium rounded-lg text-sm p-3 my-5'>
        NB:- If you haven't take the exam, you can practice from the question.
      </p>
      <div>
        <p>{exam && `Total questions: ${exam?.length}`}</p>
        <p>{exam && `Total Mark: ${tm}`}</p>
        {exam &&
          exam?.map((ele, i) => {
            if (ele?.ansType === 'options')
              return (
                <div
                  key={`jq_${i}`}
                  className='p-5 w-full my-5 rounded-md ring ring-yellow-300'
                >
                  <div className='font-semibold'>
                    {i + 1}.
                    <div
                      className='inline-flex ml-3'
                      dangerouslySetInnerHTML={{ __html: ele?.title }}
                    ></div>
                  </div>
                  <div className='w-full flex flex-wrap gap-2'>
                    {ele?.images?.map((item, key) => (
                      <img
                        src={reqImgWrapper(item.url)}
                        alt='quesImage'
                        key={key}
                        className='w-auto max-h-[180px] cursor-pointer hover:scale-[101%] transition-all duration-300'
                        onClick={() =>
                          window.open(`${reqImgWrapper(item.url)}`, '_blank')
                        }
                      />
                    ))}
                  </div>
                  <ul className='pl-3'>
                    {ele?.quesOptions?.map((opt, oi) => (
                      <li
                        key={`op_${oi}`}
                        className='bg-white rounded-md my-2 shadow-md p-3 text-sm'
                      >
                        {opt?.id}.
                        <section
                          className='inline-flex ml-3'
                          dangerouslySetInnerHTML={{ __html: opt?.title }}
                        ></section>
                      </li>
                    ))}
                  </ul>
                </div>
              );

            return (
              <div
                key={`jq_${i}`}
                className='p-5 w-full my-5 rounded-md ring ring-yellow-300'
              >
                <p className='font-semibold'>
                  {i + 1}.
                  <div
                    className='inline-flex ml-3'
                    dangerouslySetInnerHTML={{ __html: ele?.title }}
                  ></div>
                </p>
                <ul className='pl-3'>
                  {ele?.images
                    ? ele?.images?.map((opt, oi) => (
                        <li
                          key={`op_${oi}`}
                          className='bg-white rounded-md my-2 mr-2 shadow-md p-3 text-sm'
                        >
                          <img
                            className='aspect-auto max-w-full'
                            src={reqImgWrapper(opt?.url)}
                            alt='image file'
                            width={500}
                          />
                        </li>
                      ))
                    : 'No Image'}
                </ul>
              </div>
            );
          })}
      </div>
    </div>
  );
}
