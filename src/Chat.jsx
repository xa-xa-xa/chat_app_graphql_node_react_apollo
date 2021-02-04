import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery, 
  gql,
  useMutation,
} from '@apollo/client';
import { useState } from 'react';

const client = new ApolloClient({
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const ChatRoot = () => {
  const [state, setState] = useState({ user: '', content: '' });
  const [postMessage, { data }] = useMutation(POST_MESSAGES);

  const onSend = () => {
    if (state.content.length) {
      postMessage({ variables: state });
    }
    setState({ ...state, content: '' });
  };

  return (
    <div className='container justify-end mx-auto h-screen'>
      <Messages user={state.user}></Messages>
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

// Query
const GET_MESSAGES = gql`
  query {
    messages {
      id
      content
      user
    }
  }
`;
const POST_MESSAGES = gql`
  mutation($user: String!, $content: String!) {
    postMessage(user: $user, content: $content)
  }
`;

const Messages = ({ user }) => {
  const { data } = useQuery(GET_MESSAGES, { pollInterval: 500 });
  if (!data) return <>loading...</>;

  return (
    <div className='container flex-col flex-grow'>
      {data.messages.map(({ user: messageUser, id, content }) => (
        <div
          className={`flex pb-2 px-4 
          ${user === messageUser ? 'justify-end' : 'justify-start'}`}
        >
          {user !== messageUser && (
            <div className=' w-8 h-8 mr-2 rounded-full pt-1 text-center self-center text-white border-gray-300 border bg-blue-400'>
              {messageUser.slice(0, 2).toUpperCase()}
            </div>
          )}
          <div
            className={`rounded-md p-2 max-w-2xl w-auto
                  ${
                    user === messageUser
                      ? 'bg-green-500 text-black'
                      : ' bg-blue-700 text-white'
                  }`}
          >
            {content}
          </div>
        </div>
      ))}
    </div>
  );
};

//
const Chat = () => (
  <ApolloProvider client={client}>
    <ChatRoot />
  </ApolloProvider>
);

export default Chat;
