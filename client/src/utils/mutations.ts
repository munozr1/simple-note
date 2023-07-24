import { gql } from "@apollo/client";

export const LOGIN = gql`
    mutation Login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            token
            user {
                _id
                email
                username
            }
        }
    }
`;

export const SIGN_UP = gql`
    mutation SignUp($email: String!, $username: String!, $password: String!) {
        signUp(email: $email, username: $username, password: $password) {
            token
            user {
                _id
                email
                username
            }
        }
    }
`;

export const ADD_NOTE = gql`
    mutation AddNote($title: String!, $body: String!) {
        addNote(title: $title, body: $body) {
            notes {
                _id
                title
                body
            }
        }
    }
`;

export const UPDATE_NOTE = gql`
    mutation UpdateNote($title: String!, $body: String!, $noteId: String!) {
        updateNote(title: $title, body: $body, noteId: $noteId) {
            _id
            username
            email
            notes {
                _id
                title
                body
            }
        }
    }
`;

export const DELETE_NOTE = gql`
    mutation DeleteNote($noteId: String!) {
        deleteNote(noteId: $noteId) {
            _id
            username
            email
            notes {
                _id
                title
                body
            }
        }
    }
`;
