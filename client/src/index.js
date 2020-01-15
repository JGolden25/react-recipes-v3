import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import './index.css';
import App from './components/App';
import Navbar from './components/Navbar';
import withSession from './components/withSession';
import Signin from './components/Auth/Signin';
import Signup from './components/Auth/Signup';
import Search from './components/Recipe/Search';
import AddRecipe from "./components/Recipe/AddRecipe";
import RecipePage from "./components/Recipe/RecipePage";

import Profile from "./components/Profile/Profile";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

const client = new ApolloClient({
    uri: "http://recirvoir-apollo-gql.herokuapp.com/graphql",
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
            localStorage.setItem("token", "");
        }
    }
});

const Root = ({ refetch, session }) => (
    <Router>
        <Navbar session={session} />
        <Fragment>
        <Switch>
            <Route exact  path="/" component={App} />
            <Route exact  path="/search" component={Search} />
            <Route path="/signin" render={() => <Signin refetch={refetch} />}/>
            <Route path="/signup" render={() => <Signup refetch={refetch} />}/>
            <Route path="/recipe/add" render={() => <AddRecipe session={session} />}/>
        <Route path="/recipes/:_id" component={RecipePage} />
        <Route path="/profile" render={() => <Profile session={session} />} />
            <Redirect to="/"/>
        </Switch>
        </Fragment>
    </Router>

);

const RootWithSession = withSession(Root);

ReactDOM.render(
    <ApolloProvider client={client}>
        <RootWithSession />
    </ApolloProvider>,

    document.getElementById("root")
);



// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA

