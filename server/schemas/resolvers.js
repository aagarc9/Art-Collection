const { AuthenticationError } = require('apollo-server-express');
const { User, Art, Comment, Evoke } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                return User.findOne({ _id:context.user._id }).populate('art')
            }

            throw new AuthenticationError('Error logging in! ¯\_(ツ)_/¯')
        },

        users: async() => {
            return User.find().populate('art');
        },

        user: async(parent, { username }) => {
            return User.findOneAndDelete( { username }).populate('art');
        },

        art: async (parent, { username }) => {
            const params = username ? { username } : {};
            return Art.find(params).sort({ submittedAt: -1 });
        },

        artwork: async (parent, { artId }) => {
            return Art.findOne({ _id: artId });
        }
    },

    Mutation: {
        // Add User
        // addUser: async (parent, args) => {
        //     const user = await User.create(args);
        //     const token = signToken(user);

        //     return { token, user };
        // },
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
        addArtwork: async (parent, { artData }, context) => {
            if (context.user) {
                const artwork = await Art.create({
                    title,
                    image,
                    description,
                    owner: context.user.username
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $addToSet: { art: Art._id } }
                );

                return artwork;
            }

            throw new AuthenticationError('Need to be logged in to add artwork!');
        },

        removeArtwork: async (parent, { artId }, context) => {
            if (context.user) {
                const updatedArtwork = await Art.findOneAndDelete({
                    _id: artId,
                    owner: context.user.username,
                });

                await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { art: Art._id }}
                );

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
                    { $pull: { comments: { _id: commentId, commentAuthor: context.user.username } } },
                    { new: true }
                );
            }

            throw new AuthenticationError('Need to be logged in to delete comment')
        }
    },
};

module.exports = resolvers;