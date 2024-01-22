import React, { useEffect, useState } from "react";
import VdoUpload from "./videos/vdoCourse";
import Video from "./videos/video";
import { useParams } from "react-router-dom";
import PrimaryButton from "../../Buttons/PrimaryButton";
import { MdFileUpload, MdStickyNote2 } from "react-icons/md";
import { FcDatabase } from "react-icons/fc";
import { HiChevronRight, HiChevronDown } from "react-icons/hi2";

import { adminFCourse, updateCourse } from "../../../axios/global";
import reqs, { reqImgWrapper, reqPdfWrapper } from "../../../assets/requests";

import axios from "axios";
import Exam from "./exams/Exam";
function EachCourse() {
  const { id } = useParams();
  const [data, setData] = useState({});
  const [upImg, setUpImg] = useState(null);
  const [imgSrc, setImgSrc] = useState(null);

  //image handler to update image
  const handleImg = (e) => {
    setUpImg(e.target.files[0]);
  };
  useEffect(() => {
    adminFCourse(id, setData);
  }, [id]);
  // update image
  const updateImage = async () => {
    const imgData = new FormData();
    imgData.append("courseId", data?.id);
    imgData.append("title", data?.title);
    imgData.append("courses", upImg);
    try {
      axios
        .put(reqs.UPDATE_IMAGE, imgData, { withCredentials: true })
        .then((res) => {
          alert(res.data.msg);
        })
        .then(() => window.location.reload())
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

  //first time fetch data
  useEffect(() => {
    setImgSrc(reqImgWrapper(data?.image));
    if (upImg) setImgSrc(URL.createObjectURL(upImg));
  }, [data?.image, upImg]);

  return (
    <div className="w-auto h-full p-5 overflow-y-scroll overflow-x-hidden resize-y">
      {/* course id */}
      <h2 className=" text-center font-semibold capitalize mb-10 text-2xl sticky -top-5 bg-slate-100 backdrop-blur px-10 z-10 border-2 border-transparent border-b-black shadow-xl shadow-trans_bluish/20">
        course Title: {data?.title}
      </h2>
      {/* course basic info */}
      <div className="flex items-start gap-2 text-left w-4/5 mx-auto" id="info">
        <div className="grid grid-cols-3 items-start w-fit mx-auto">
          <label className="capitalize" htmlFor="">
            title:
          </label>
          <input
            className="adminInputBox"
            value={data?.title}
            type="text"
            onChange={(e) =>
              setData((pre) => ({ ...pre, title: e.target.value }))
            }
          />
          <label className="capitalize" htmlFor="">
            price:
          </label>
          <input
            className="adminInputBox"
            value={data?.price}
            type="number"
            onChange={(e) =>
              setData((pre) => ({ ...pre, price: e.target.value }))
            }
          />
          <label className="capitalize" htmlFor="">
            tags:
          </label>
          <input
            className="adminInputBox"
            value={data?.tags}
            onChange={(e) =>
              setData((pre) => ({ ...pre, tags: e.target.value }))
            }
          />
          <label className="capitalize" htmlFor="">
            description:
          </label>
          <textarea
            className="adminInputBox resize-none"
            rows={4}
            value={data?.description}
            type="text"
            onChange={(e) =>
              setData((pre) => ({ ...pre, description: e.target.value }))
            }
          />
          <label className="capitalize" htmlFor="">
            Schedule:
          </label>
          <input
            className="adminInputBox"
            value={data?.schedule}
            onChange={(e) =>
              setData((pre) => ({ ...pre, schedule: e.target.value }))
            }
          />
          <PrimaryButton
            text={"update"}
            textClasses={"bg-sky-500 text-white px-4 py-2 rounded-md"}
            type={"submit"}
            onClick={() => updateCourse(id, data)}
          />
        </div>
        <div className="relative w-max mx-auto">
          {imgSrc && (
            <img
              className="aspect-video"
              src={imgSrc}
              alt="image"
              width={350}
            />
          )}
          <input
            hidden
            type="file"
            name="upImg"
            id="upImg"
            accept="image/jpg,image/png,image/jpeg"
            onChange={handleImg}
          />
          <label
            className="text-center mx-auto w-full bg-sky-400 text-blue-900 flex items-center justify-center py-2 hover:bg-blue-900 hover:text-sky-200 font-semibold transition-colors duration-300 cursor-pointer"
            htmlFor="upImg"
          >
            <MdFileUpload /> Change image
          </label>
          {upImg && (
            <button
              className="bg-green-400 font-bold capitalize w-full text-center py-2"
              onClick={updateImage}
            >
              update
            </button>
          )}
        </div>
      </div>
      {/* map recorded video */}
      <div className="grid grid-cols-1 gap-1 justify-center mt-10">
        <h2 className="text-center text-lg underline font-bold">
          Recorded Videos
        </h2>
        <p className="inline-block text-left w-fit mx-0">
          Total Class: {data?.recordedclasses?.length}
        </p>
        {data?.recordedclasses?.length != 0 ? (
          <div className="grid grid-cols-3 gap items-center justify-between my-px p-1 border border-red-600 rounded-md text-base text-center">
            <b>Serial No.</b>
            <b className="border-l-2 border-blue-600">Class Title</b>
            <b className="border-l-2 border-blue-600">Class Link</b>
          </div>
        ) : null}
        {data?.recordedclasses?.length != 0 ? (
          <>
            {data?.recordedclasses
              ?.sort((a, b) => {
                let x = a.createdAt;
                let y = b.createdAt;
                if (x > y) return 1;
                else if (x < y) return -1;
                else if (x == y) return 0;
              })
              ?.map((vid, uid) => {
                return (
                  <Video
                    key={uid}
                    id={vid.id}
                    sl={uid + 1}
                    length={vid.videoLength}
                    link={vid.videoURL}
                    title={vid.videoTitle}
                    desc={vid.desc}
                  />
                );
              })}
          </>
        ) : null}
      </div>
      {/* upload recorded video */}
      <div>
        {/* form for video upload and exam link*/}
        <VdoUpload id={id} />
      </div>
      {/* exam section */}
      <div className="flex flex-col">
        <h1 className="text-center text-darkText font-semibold text-2xl mb-6">
          Exam Board{" "}
          <MdStickyNote2 className=" inline-block text-purple-600 " />
        </h1>
        <Exam />
      </div>
      {/* course resources */}
      <div>
        <h1 className="text-center text-darkText font-semibold text-2xl py-2">
          Course Resources{" "}
          <FcDatabase className=" inline-block text-purple-600 " />
        </h1>
        {data?.resources &&
          data?.resources?.map((ele, eid) => {
            return <Resource ele={ele} key={eid} />;
          })}
      </div>
    </div>
  );
}
const Resource = ({ ele }) => {
  const [drop, setDrop] = useState(false);

  return (
    <section
      key={ele?.id}
      className="text-sm grid items-start justify-normal gap-2 m-2 select-none"
    >
      <p
        className="flex gap-1 font-bold hover:underline cursor-default"
        onClick={() => {
          setDrop((pre) => !pre);
        }}
      >
        {!drop ? (
          <HiChevronRight className="font-bold text-lg " />
        ) : (
          <HiChevronDown />
        )}{" "}
        {ele?.Title}
      </p>
      {drop &&
        ele?.filesUrl?.map((val, uid) => {
          return (
            <a
              key={val?.id}
              className="underline mx-14 w-fit"
              href={`${reqPdfWrapper(val?.url)}`}
              target="_blank"
            >
              {val?.id}
            </a>
          );
        })}
    </section>
  );
};
export default EachCourse;
