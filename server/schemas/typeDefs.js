const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        art: [Art]
    }

    type Art {
        _id: ID!
        title: String!
        image: String
        owner: [User]
        description: String
        comment: [Comment]      
        likesCount: Int!
        viewsCount: Int!
        evokesCount: Int!
    }

    type Comment {
        _id: ID!
        comment: String!
    }

    type Auth {
        token: ID!
        user: User!
    }

    type Evoke {
        emotion: String!
        art: [Art]
    }

    type Query {
        me: [User]!
        comments: [Comment]!
        art: [Art]!
        users: [User]!
        evokes: [Evoke]!
    }

    type Mutation {
        login(email: String!, password: String!): Auth

        addUser(username: String!, email: String!, password: String!): Auth
        addArtwork(title: String!, image: String!, owner: String!, description: String!, likesCount: Int!, viewsCount: Int!, evokesCount: Int!): User
        addComment(comment: String!, owner: String!): Art
        addEvoke(emotion: String!): Art

        removeArtwork(artworkId: ID!): User
        removeComment(commentId: ID!): Comment
        removeEvoke(evokeId: ID!): Evoke
    }
`;

module.exports = typeDefs