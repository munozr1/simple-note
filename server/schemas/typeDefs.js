const { gql } = require("apollo-server-express");

module.exports = gql`
    type User {
        _id: ID!
        username: String!
        email: String!
        notes: [Note]
    }

    type Note {
        _id: ID!
        title: String!
        body: String!
    }

    type Auth {
        user: User
        token: String!
    }

    type Query {
        me: User
    }

    type Mutation {
        login(email: String!, password: String!): Auth
        signUp(email: String!, username: String!, password: String!): Auth
        addNote(title: String!, body: String!): User
        updateNote(title: String!, body: String!, noteId: String!): User
        deleteNote(noteId: String!): User
    }
`;
