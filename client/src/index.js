import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/App';

import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';


import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: "http://localhost:4444/graphql",
    fetchOptions: {
        credentials: 'include'
    },
    request: operation => {
        const token = localStorage.getItem('token');
        operation.setContext({
            headers: {
                authorization: token
            }
        })
    },
    onError:({ networkError }) => {
        if(networkError) {
            console.log('Network Error', networkError);

        }
    }
});

const Root = () => (
    <Router>
        <Switch>
            <Route exact  path="/" component={App} />
            <Route path="/signin" component={Signin} />
            <Route path="/signup" component={Signup} />
            <Redirect to="/"/>
        </Switch>
    </Router>

);

ReactDOM.render(
    <ApolloProvider client={client}>
        <Root />
    </ApolloProvider>,

    document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

