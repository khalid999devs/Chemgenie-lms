import { useEffect, useState } from "react";
import InputBox from "./inputBox";
import RootSms from "./rootsms";
import { client } from "../../../axios/discussion";
const fetchChat = (id, setChats) => {
  client.getDiscussion(id, setChats);
};

function ChatBox({ courseId, isAdmin }) {
  const [replyId, setReplyId] = useState(-1);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    fetchChat(courseId, setChats);
    setInterval(() => {
      fetchChat(courseId, setChats); 
    }, 15000);
  }, []);
  return (
    <div className="bg-trans_bluish/0 rounded-md py-1 max-w-6xl  mx-auto h-5/6 overflow-y-hidden">
      <div className="px-4 pb-0 flex flex-col h-full w-auto">
        <RootSms
          setReplyId={setReplyId}
          chats={chats.sort((a, b) => {
            let x = a.createdAt;
            let y = b.createdAt;
            if (x < y) return -1;
            else if (x > y) return 1;
            else return 0;
          })}
          isAdmin={isAdmin}
        />
        <InputBox
          replyId={replyId}
          setReplyId={setReplyId}
          cid={courseId}
          replyMsg={
            chats.sort((a, b) => {
              let x = a.createdAt;
              let y = b.createdAt;
              if (x < y) return -1;
              else if (x > y) return 1;
              else return 0;
            })[replyId]
          }
        />
      </div>
    </div>
  );
}

export default ChatBox;
