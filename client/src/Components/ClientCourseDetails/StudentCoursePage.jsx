import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  AiFillExperiment,
  AiFillPlayCircle,
  AiFillWechat,
} from "react-icons/ai";
import { PiNotebook } from "react-icons/pi";

const StudentCoursePage = () => {
  const [currentTab, setCurTab] = useState(localStorage?.value);
  const navigate = useNavigate();

  function handleTab(e) {
    setCurTab(e);
    navigate(e);
  }
  return (
    <div
      className={`left-side ${currentTab == "chat" ? "h-[75vh] mb-10" : ""}`}
    >
      <nav
        className="bg-primary-main rounded-b-lg p-2 border border-t-transparent border-onPrimary-main shadow-lg shadow-onPrimary-main/20 my-8
      "
      >
        <ul className="capitalize flex gap-5 justify-center">
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                currentTab == "details" ? "bg-secondary-main" : ""
              }`}
              onClick={() => {
                handleTab("details");
              }}
            >
              <span className="hidden md:inline-block">Details</span>{" "}
              <PiNotebook className="text-lg" />
            </button>
          </li>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                currentTab == "record" ? "bg-secondary-main" : ""
              }`}
              onClick={() => {
                handleTab("record");
              }}
            >
              <span className="hidden md:inline-block">record</span>{" "}
              <AiFillPlayCircle className="text-lg" />
            </button>
          </li>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                currentTab == "exam" ? "bg-secondary-main" : ""
              }`}
              onClick={() => {
                handleTab("exam");
              }}
            >
              <span className="hidden md:inline-block">Exam</span>{" "}
              <AiFillExperiment className="text-lg" />
            </button>
          </li>
          <li>
            <button
              className={`px-2 flex gap-2 items-center hover:bg-secondary-main p-2 text-onPrimary-main rounded-md cursor-pointer transition-all ease-in hover:font-semibold ${
                currentTab == "chat" ? "bg-secondary-main" : ""
              }`}
              onClick={() => {
                handleTab("chat");
              }}
            >
              <span className="hidden md:inline-block">Discussion</span>{" "}
              <AiFillWechat className="text-lg" />
            </button>
          </li>
        </ul>
      </nav>

      <Outlet />
    </div>
  );
};

export default StudentCoursePage;
