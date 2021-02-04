import React from 'react';
import Message from './Message';

function Messages({ user, data, currUser }) {
  if (!data) return <>loading...</>;

  return (
    <div className='container flex-col flex-grow'>
      {data.messages.map(({ user, id, content }) => (
        <Message user={user} content={content} currUser={currUser} key={user + id} />
      ))}
    </div>
  );
}

export default Messages;
