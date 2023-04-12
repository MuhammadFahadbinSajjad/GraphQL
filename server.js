const express = require('express');
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const {GraphQLSchema,GraphQLObjectType,GraphQLString,GraphQLInt,GraphQLNonNull,GraphQLList} = require('graphql');
const app = express();
const port = 3000;

var Owners = [
    {
        id:1,
        name:'Muhammad Fahad',
        Age:12
    },
    {
        id:2,
        name:'Sajood',
        Age:20
    },
    {
        id:3,
        name:'Hassan',
        Age:21
    },
    {
        id:4,
        name:'Wajahat',
        Age:26
    },
    {
        id:5,
        name:'Ali',
        Age:29
    }
]

const ownerType = new GraphQLObjectType({
    name:"Owner",
    description:"This represents a webiste made by Owner",
    fields:()=>({
        id:{type:new GraphQLNonNull(GraphQLInt)},
        name:{type:new GraphQLNonNull(GraphQLString)},
        Age:{type:new GraphQLNonNull(GraphQLInt)}
    })
});

const RootQueryType = new GraphQLObjectType({
    name:'Query',
    description:'Root Query',
    fields:()=>({
        owners:{
            type:new GraphQLList(ownerType),
            description:"List of All owners",
            resolve:()=>Owners
        }
    })
});

const schema = new GraphQLSchema({
    query : RootQueryType
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
}),
);

mongoose.connect('mongodb://127.0.0.1:27017/product')
    .then(() => {
        console.log('Connected to MongoDB')
        app.listen(port, () => {
            console.log(`GraphQL application listening on port ${port}`)
        })
    }).catch((error) => {
        console.log(error)
    })