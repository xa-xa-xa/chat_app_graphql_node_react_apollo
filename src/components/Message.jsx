import React from 'react';

function Message(props) {
  const { user, content, currUser } = props;
  return (
    <div
      className={`flex pb-2 px-4 
              ${user === currUser ? 'justify-end' : 'justify-start'}`}
    >
      {user !== currUser && (
        <div className=' w-8 h-8 mr-2 rounded-full pt-1 text-center self-center text-white border-gray-300 border bg-blue-400'>
          {currUser.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div
        className={`rounded-md p-2 max-w-2xl w-auto
                      ${
                        user === currUser
                          ? 'bg-green-500 text-black'
                          : ' bg-blue-700 text-white'
                      }`}
      >
        {content}
      </div>
    </div>
  );
}

export default Message;
