import {useState} from 'react';
import Messages from './Messages';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
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
    <div className='container justify-end mx-auto h-screen'>
      <Messages user={state.user} data={messagesData} currUser={state.user} />
      <form
        className='container bg-green-800 p-2 flex py-4'
        onSubmit={(e) => {
          e.preventDefault();
          onSend();
        }}
      >
        <input
          className='border border-gray-600 rounded-sm flex w-32'
          name='User'
          value={state.user}
          required
          onChange={(e) => {
            setState({ ...state, user: e.target.value });
          }}
        />
        <input
          className='border border-gray-600 rounded-sm flex flex-grow'
          type='text'
          value={state.content}
          placeholder='Enter a message'
          onChange={(e) => setState({ ...state, content: e.target.value })}
          onKeyUp={(e) => {
            if (e?.key === 'Enter') onSend();
          }}
        />

        <button
          className='border bg-green-500 rounded-sm px-2 ml-2 w-20 text-white hover:bg-green-400'
          type='submit'
        >
          send
        </button>
      </form>
    </div>
  );
};

export default ChatContainer;
