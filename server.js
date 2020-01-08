const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require("dotenv").config({ path: 'variables.env' });

const Recipe = require('./models/Recipe');

const User = require("./models/User");

//bring in graph ql i express middleware

const { graphiqlExpress, graphqlExpress } = require('apollo-server-express');

const { makeExecutableSchema } = require('graphql-tools');

const { typeDefs } = require('./schema');

const { resolvers } = require('./resolvers');

const schema = makeExecutableSchema({

    typeDefs,

    resolvers
});

// Connects to database

mongoose

 .connect(process.env.MONGO_URI)
 .then(() => console.log('DB connected'))
 .catch(err => console.log(err));

 // Initialize application

const app = express();

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true

};

app.use(cors(corsOptions))

// create graphiql app

app.use(

    '/graphiql', 
    graphiqlExpress
    ({ endpointURL: '/graphql'}
    ));

app.use(
    '/graphql', 
    bodyParser.json(),
    graphqlExpress({
    schema,
    context: {
       Recipe,
       User
    }
}));

const PORT = process.env.PORT || 4444;

app.listen(PORT, () => {
    console.log(`server listening on PORT ${PORT}`);
});