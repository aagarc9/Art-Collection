const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        name: String!
        email: String
        artwork: [Art]
    }

    type Art {
        _id: ID!
        title: String!
        image: String
        description: String      
        likesCount: Int
        viewsCount: Int
        evokesCount: Int
    }

    type Auth {
        token: ID!
        user: User
    }

    type Query {
        me: User
        Art: [Art]
        Comment: [Comment]
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        addUser(username: String!, email: String!, password: String!): Auth
        addArtwork(title: String!, image: String!, description: String!, likesCount: Int!, viewsCount: Int!, evokesCount: Int!): User
        removeArtwork(artworkId: ID!): User
        addComment(comment: String!): Art
        removeComment(commentId: ID!): Art
    }
`;

module.exports = typeDefs