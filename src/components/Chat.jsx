import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { WebSocketLink } from '@apollo/client/link/ws';

import ChatContainer from './ChatContainer';

// Apollo
const webSocketLink = new WebSocketLink({
  uri: 'ws://localhost:4000',
  options: { reconnect: true },
});

const client = new ApolloClient({
  link: webSocketLink,
  uri: 'http://localhost:4000',
  cache: new InMemoryCache(),
});

const Chat = () => (
  <div className="focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent">
    <ApolloProvider client={client}>
      <ChatContainer />
    </ApolloProvider>
  </div>
);

export default Chat;
