import { useState } from 'react';
import { MdClose, MdPhoto, MdSend } from 'react-icons/md';
import { FaFileAlt } from 'react-icons/fa';
import { client } from '../../../axios/discussion';
import { IoMdClose } from 'react-icons/io';

function InputBox({
  replyId,
  setReplyId,
  cid,
  replyMsg,
  setChats,
  chatContainerRef,
  setOwnInput,
}) {
  const [inputValue, setInputValue] = useState('');
  const [rows, setRows] = useState(1);
  const [selectedImage, chooseImgs] = useState([]);

  function handleInputChange(event) {
    setInputValue((pre) => event.target.value);
    const lines = event.target.value.split('\n');
    setRows(Math.min(5, lines.length));
  }

  function sendChat(e) {
    e.preventDefault();
    const fData = new FormData();
    fData.append('question', inputValue);
    fData.append('courseId', cid);
    if (selectedImage.length > 0)
      selectedImage.forEach((img) => {
        fData.append('discussions', img);
      });
    client.addDiscussion(fData).then((data) => {
      setChats((chats) => [...chats, data.discussion]);
      setInputValue('');
      setRows(1);
      chooseImgs([]);
      setOwnInput((ownInput) => !ownInput);
    });
  }

  function replyChat(e) {
    e.preventDefault();
    const fData = new FormData();
    fData.append('reply', inputValue);
    fData.append('courseId', cid);
    fData.append('discussionId', replyMsg?.id);

    if (selectedImage.length > 0)
      selectedImage.forEach((img) => {
        fData.append('discussions', img);
      });
    client.reply(fData).then((data) => {
      // alert('REPLY sent!!');
      setChats((chats) =>
        chats.map((item) => {
          if (item.id === data.discussion.id) {
            item.commentreplies = data.discussion.commentreplies;
          }
          return item;
        })
      );
      setInputValue('');
      setRows(1);
      chooseImgs([]);
      setReplyId(-1);
    });
  }

  return (
    <div className='flex flex-col items-start px-2 w-full md:px-4 pt-3 text-center relative h-fit tracking-wide text-sm rounded-xl font-normal'>
      {/* photo viewer */}
      <div
        className={`w-full p-2 bg-white ring-1 ring-blue-500/70 mb-5 rounded-xl flex flex-wrap ${
          !selectedImage.length && 'hidden'
        }`}
      >
        {/* show selected images */}
        {selectedImage.length
          ? selectedImage.map((image) => {
              return (
                <div className='relative m-2 w-auto group' key={image?.name}>
                  {/* cross handler */}
                  <span
                    className='absolute right-1 top-1 bg-rose-400 hover:bg-rose-600 text-white rounded-full p-1 z-10 opacity-0 group-hover:opacity-100 cursor-pointer'
                    onClick={() => {
                      chooseImgs(
                        selectedImage.filter((newImage) => newImage != image)
                      );
                    }}
                  >
                    <MdClose />
                  </span>
                  {image?.type?.includes('image') ? (
                    <img
                      className='aspect-video size w-20 rounded-md overflow-hidden shadow-lg shadow-slate-900'
                      width={200}
                      height={100}
                      src={image && URL.createObjectURL(image)}
                      alt='photo'
                    />
                  ) : (
                    <button className='relative flex items-center gap-1 w-auto h-fit left-0 text-black whitespace-nowrap p-2 size max-w-sm rounded-md shadow-lg shadow-[rgba(0,0,0,.2)]'>
                      <FaFileAlt fill='#25fa' /> {image?.name}
                    </button>
                  )}
                </div>
              );
            })
          : null}
      </div>
      {/* msg input part */}
      <form
        className='w-full flex items-center gap-2'
        onSubmit={replyId > -1 ? replyChat : sendChat}
      >
        <div
          className={`flex flex-1 items-center gap-3 p-2.5 bg-slate-800 text-slate-200 border-gray-300 flex-grow outline-none border-0 ring-[1.5px] ring-blue-500 ${
            rows > 1 ? 'rounded-lg' : 'rounded-full'
          }`}
        >
          <textarea
            className={`w-4/5 flex-grow outline-none border-0 bg-transparent placeholder-slate-200 placeholder:opacity-50 font-medium px-2`}
            value={inputValue}
            rows={rows}
            onChange={handleInputChange}
            required
            placeholder='Write something...'
            style={{
              resize: 'none',
              overflow: 'auto',
            }}
          />
          {/* divider */}
          <hr className='h-5 w-1 bg-slate-500 rounded-full ' />
          {/* photo choose */}
          <label
            className='hover:bg-trans_bluish rounded-full w-fit text-blue-500 p-2 cursor-pointer duration-300 ease-out'
            htmlFor='choosePhoto'
          >
            <MdPhoto />
          </label>
          <input
            className='hidden'
            type='file'
            name='choosePhoto'
            id='choosePhoto'
            multiple={true}
            onChange={(e) => {
              chooseImgs([...e.target.files]);
            }}
          />
        </div>
        <button
          className='transition-colors ease-out w-10 h-10 p-2 bg-blue-700 hover:bg-blue-500 text-white rounded-full flex justify-center items-center '
          type='submit'
        >
          <MdSend size={20} />
        </button>
      </form>
      {/* reply box */}
      {replyId >= 0 ? (
        <div className='max-w-[80%] w-max md:max-w-[60%] md:w-min absolute left-5 border-l-4 border-l-root_bluish/70 rounded-lg bottom-full backdrop-blur-md z-0 bg-blue-500/60 bg-opacity-50 dark:text-white min-h-[2rem] text-left p-2 text-xs text-opacity-20 overflow-hidden max-h-20 break-words truncate flex gap-10 justify-between items-center'>
          <div className='h-full w-full flex flex-col'>
            <span className='font-bold'>
              {JSON.parse(replyMsg?.user ? replyMsg?.user : '')?.fullName}
            </span>{' '}
            <br />
            <span className='font-extralight'>{replyMsg?.question}</span>
          </div>
          <div
            onClick={() => {
              setReplyId(-1);
            }}
            className='bg-onPrimary-main inline p-0.5 rounded-md cursor-pointer opacity-75 transition-all duration-300 hover:opacity-100'
          >
            <IoMdClose className='text-xl' />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default InputBox;
