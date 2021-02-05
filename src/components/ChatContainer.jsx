import {useState} from 'react';
import Messages from './Messages';

import {
  useSubscription,
  gql,
  useMutation,
} from '@apollo/client';


//GraphQL
// subscription
const GET_MESSAGES = gql`
  subscription {
    messages {
      id
      content
      user
    }
  }
`;

// Send message
const POST_MESSAGES = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const ChatContainer = () => {
  const [state, setState] = useState({ user: '', content: '' });
  const [postMessage, { data }] = useMutation(POST_MESSAGES);
  const messagesData = useSubscription(GET_MESSAGES)?.data;

  const onSend = () => {
    if (state.content.length) postMessage({ variables: state });
    setState({ ...state, content: '' });
  };

  //render
  return (
    <div className='flex p-8 flex-col' style={{height: "100vh"}}>
      <Messages user={state.user} data={messagesData} currUser={state.user} />
      <form
        className='relative bg-gray-500 p-2 flex py-4 rounded-b-md shadow-lg px-4'
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <input
          className='rounded-sm w-36 mr-2 px-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          name='User'
          placeholder='Enter user name'
          value={state.user}
          required
          onChange={(e) => {
            setState({ ...state, user: e.target.value });
          }}
        />
        <input
          className='border border-gray-600 rounded-sm flex flex-grow pl-2 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent'
          type='text'
          required
          value={state.content}
          placeholder='Enter a message'
          onChange={(e) => setState({ ...state, content: e.target.value })}
          onKeyUp={(e) => {
            if (e?.key === 'Enter') onSend();
          }}
        />

        <button
          className=' bg-green-500 rounded-sm px-2 ml-2 w-20 text-white hover:bg-green-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50'
          type='submit'
        >
          send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
