const { gql } = require('apollo-server-express');

const typeDefs = gql`
    type User {
        _id: ID!
        username: String
        email: String!
        password: String!
        artwork: [Art]
    }

    type Art {
        _id: ID!
        title: String
        image: String
        owner: User
        description: String
        submittedAt: String     
        likesCount: Int
        viewsCount: Int
        evokeFunnyCount: Int
        evokeBeautifulCount: Int
        evokeSadCount: Int
        evokeWholesomeCount: Int
        evokeMysteriousCount: Int
        evokeThoughtfulCount: Int
        evokeCalmingCount: Int
        comments: [Comment]
    }

    type Comment {
        _id: ID!
        commentText: String!
        commentAuthor: String!
        submittedAt: String
    }

    type Auth {
        token: ID!
        user: User!
    }

    type Query {
        me: User
        users: [User]
        user(username: String!): User
        multipleArt(username: String!): [Art]
        singleArt(artId: ID!): Art
        comment(commentId: ID!): Art
    }

    type Mutation {
        addUser(
            username: String!, 
            email: String!, 
            password: String!
        ): Auth

        login(
            email: String!, 
            password: String!
        ): Auth

        saveART(
            title: String, 
            image: String, 
            owner: String, 
            description: String, 
            likesCount: Int, 
            viewsCount: Int, 
            evokeFunnyCount: Int
            evokeBeautifulCount: Int
            evokeSadCount: Int
            evokeWholesomeCount: Int
            evokeMysteriousCount: Int
            evokeThoughtfulCount: Int
            evokeCalmingCount: Int
        ): User

        addComment(
            artId: ID!, 
            commentText: String, 
        ): Art

        removeART(
            artId: ID!
        ): User
        
        removeComment(
            artId: ID!
            commentId: ID!
        ): Art
    }
`;

module.exports = typeDefs