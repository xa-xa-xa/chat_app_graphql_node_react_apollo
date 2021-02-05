function Message(props) {
  const { user, content, currUser } = props;

  return (
    <div
      className={`flex pb-2 px-4
              ${user === currUser ? 'justify-end' : 'justify-start'}`}
    >
      {user !== currUser && (
        <div className='-mb-2 shadow-md w-9 h-9 mr-2 rounded-full pt-1 text-center self-center text-white border-gray-300 border bg-blue-400'>
          {user.slice(0, 2).toUpperCase()}
        </div>
      )}
      <div
        className={`max-w-xl px-4 rounded-2xl shadow-md p-2 
                      ${
                        user === currUser
                          ? 'bg-green-500 text-black rounded-br-none'
                          : ' bg-blue-700 text-white rounded-bl-none'
                      }`}
      >
        {content}
      </div>
    </div>
  );
}

export default Message;
