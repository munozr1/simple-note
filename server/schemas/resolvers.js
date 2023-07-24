const { User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

module.exports = {
    Query: {
        me: async (parent, args, context) => {
            if (context.user) {
                const userData = await User.findOne({
                    _id: context.user._id,
                }).select("-__v");
                return userData;
            }
            throw new AuthenticationError("Not logged in");
        },
        // notes: async (parent, args, context) => {
        //     if (context.user) {
        //         const { data: notes } = await User.findOne({
        //             _id: context.user._id,
        //         }).select("-__v");
        //         return notes;
        //     }
        //     throw new AuthenticationError("Not logged in");
        // },
    },
    Mutation: {
        signUp: async (parent, args) => {
            const input = {
                ...args,
                notes: [],
            };
            const user = await User.create(input);
            const token = signToken(user);
            return { token, user };
        },
        login: async (parent, { email, password }) => {
            const user = await User.findOne({ email });
            if (!user) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const correctPw = await user.isCorrectPassword(password);
            if (!correctPw) {
                throw new AuthenticationError("Incorrect credentials");
            }
            const token = signToken(user);
            return { token, user };
        },
        addNote: async (parent, { title, body }, context) => {
            const user = await User.findOne({
                _id: context.user._id,
            }).select("-__v");
            user.notes.push({ title, body });
            const newUser = await user.save();
            return newUser;
        },
        updateNote: async (parent, { title, body, noteId }, context) => {
            const user = await User.findOne({
                _id: context.user._id,
            }).select("-__v");
            user.notes = user.notes.map((current, i) => {
                if (current._id != noteId) return current;
                return { title, body };
            });
            const newUser = await user.save();
            return newUser;
        },
        deleteNote: async (parent, { noteId }, context) => {
            const user = await User.findOne({
                _id: context.user._id,
            }).select("-__v");
            user.notes = user.notes.filter(
                (current, i) => current._id != noteId
            );
            const newUser = await user.save();
            return newUser;
        },
    },
};
