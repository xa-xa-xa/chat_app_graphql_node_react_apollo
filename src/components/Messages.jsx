import {useEffect} from 'react';
import Message from './Message';

function Messages({ user, data, currUser }) {


  const scrollToBottom = () => {
    const chat = document.getElementById("chatList");
    if (chat) {
      chat.scroll({ top: chat.scrollHeight, behavior: "smooth" });
    }
  };


  useEffect(() => {
    scrollToBottom();
  }, [data])

  if (!data) return <>loading...</>;



  return (
    <div id="chatList" className='overflow-scroll bg-white rounded-t-md shadow-lg'>
      {data.messages.map(({ user, id, content }, idx) => (
        <Message index={idx} user={user} content={content} currUser={currUser} key={id+idx+user} />
      ))}
    </div>
  );
}

export default Messages;
