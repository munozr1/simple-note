import { gql } from "@apollo/client";

export const ME = gql`
    query Me {
        me {
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
