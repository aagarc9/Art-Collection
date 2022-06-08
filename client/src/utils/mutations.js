import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_ART = gql`
  mutation saveART($artData: ArtInput!) {
    saveART(artData: $artData) {
      _id
      username
      email
      artwork {
        artId
        owner
        image
        description
        title
      }
    }
  }
`;

export const REMOVE_ART = gql`
  mutation removeART($artId: ID!) {
    removeART(artId: $artId) {
      _id
      username
      email
      artwork {
        artId
        owner
        image
        description
        title
      }
    }
  }
`;