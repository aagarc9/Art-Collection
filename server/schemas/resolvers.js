const { AuthenticationError } = require('apollo-server-express');
const { User } = require('../models');
const { signToken } = require('../utils/auth');

const resolvers = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({ 
                    _id: context.user.id 
                })
                .select('-__v -password');

                return userData;
            }

            throw new AuthenticationError('Error logging in! ¯\_(ツ)_/¯')
        },
    },

    Mutation: {
        addUser: async (parent, args) => {
            const user = await User.create(args);
            const token = signToken(user);

            return { token, user };
        },

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

        addArtwork: async (parent, { artData }, context) => {
            if (context.user) {
                const updateUser = await User.findByIdAndUpdate(
                    { _id: context.user._id },
                    { $push: { savedArt: artData } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('Need to be logged in to add artwork!');
        },

        removeArtwork: async (parent, { artId }, context) => {
            if (context.user) {
                const updatedUser = await User.findOneAndUpdate(
                    { _id: context.user._id },
                    { $pull: { savedArt: { artId } } },
                    { new: true }
                );

                return updatedUser;
            }

            throw new AuthenticationError('Need to be logged in to remove artwork!');
        },
    },
};

module.exports = resolvers;