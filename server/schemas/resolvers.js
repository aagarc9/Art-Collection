const { AuthenticationError } = require('apollo-server-express');
const { User, Art, Comment, Evoke } = require('../models');
const { signToken } = require('../utils/auth');
const { GraphQLUpload, graphqlUploadExpress } = require('graphql-upload')
const { finished } = require('stream/promises');


const resolvers = {
    Upload: GraphQLUpload,

    Query: {
        me: async (parent, args, context) => {
            console.log('QUERY me resolver ran')
            if (context.user) {
              const userData = await User.findOne({ _id: context.user._id }).select('-__v -password')
        
              return userData;
            }

            throw new AuthenticationError('Error logging in! ¯\_(ツ)_/¯')
        },

        users: async() => {
            return User.find().populate('art');
        },

        user: async(parent, { username }) => {
            return User.findOneAndDelete( { username }).populate('art');
        },

        multipleArt: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Art.find(params).sort({ submittedAt: -1 });
        },

        singleArt: async (parent, { artId }) => {
            return Art.findOne({ _id: artId });
        }
    },

    Mutation: {
        addUser: async (parent, { username, email, password }) => {
            const user = await User.create({ username, email, password });
            const token = signToken(user);

            return { token, user };
        },

        // Login
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });

            if (!user) {
                throw new AuthenticationError('Email or User not matched! ಠ╭╮ಠ')
            }

            const correctPW = await user.isCorrectPassword(password);

            if (!correctPW) {
                throw new AuthenticationError('Password does not match! ◉_◉')
            }

            const token = signToken(user);
            return { token, user };
        },

        // Related to Artwork
        saveART: async (parent, { title, image, description }, context) => {
            if (context.user) {
                const artwork = await Art.create({
                    title,
                    image,
                    description,
                    owner: context.user._id
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { art: artwork._id } }
                );
                
                console.log('Artwork added')
                return artwork;
            }

            throw new AuthenticationError('Need to be logged in to add artwork!');
        },

        removeART: async (parent, { artId }, context) => {
            if (context.user) {
                const updatedArtwork = await Art.findOneAndDelete({
                    _id: artId,
                    owner: context.user._id,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { art: updatedArtwork._id }}
                );
                
                console.log('Artwork deleted')
                return updatedArtwork;
            }

            throw new AuthenticationError('Need to be logged in to remove artwork!');
        },

        // Related to Comments
        addComment: async (parent, { artId, commentText }, context) => {
            if (context.user) {
                return Art.findOneAndUpdate(
                        { _id: artId },
                        { $addToSet: { comments: { commentText, commentAuthor: context.user.username } } },
                        { new: true}
                    );
            }

            throw new AuthenticationError('Need to be logged in to make a comment')
        },

        removeComment: async (parent, { artId, commentId }, context) => {
            if (context.user) {
              return Art.findOneAndUpdate(
                { _id: artId },
                {
                  $pull: {
                    comments: {
                      _id: commentId,
                      commentAuthor: context.user.username,
                    },
                  },
                },
                { new: true }
              );
            }
            throw new AuthenticationError('You need to be logged in!');
        },
    },
};

module.exports = resolvers;