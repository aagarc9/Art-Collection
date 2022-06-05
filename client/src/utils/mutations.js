import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
        email
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
        email
      }
    }
  }
`;

export const SAVE_ART = gql`
  mutation saveART($title: String, $image: String, $description: String) {
    saveART (title: $title, image: $image, description: $description) {
      username
      artwork {
        _id
        title
        image
        description
        submittedAt
        likesCount
        viewsCount
        evokeSadCount
        evokeFunnyCount
        evokeCalmingCount
        evokeInspiringCount
        evokeBeautifulCount
        evokeWholesomeCount
        evokeMysteriousCount
        evokeThoughtfulCount
      }
    }
  }
`;

export const REMOVE_ART = gql`
  mutation removeART($artId: ID!) {
    removeART(artId: $artId) {
      username
      artwork {
        _id
        title
        image
        description
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation addComment ($artId: ID!, $commentText: String) {
    addComment(artId: $artId, commentText: $commentText) {
      _id
      title
      comments {
        _id
        commentText
        commentAuthor
        submittedAt
      }
    }
  }
`;

export const REMOVE_COMMENT = gql`
  mutation removeComment ($artId: ID!, $commentId: ID!) {
    removeComment (artId: $artId, commentId: $commentId) {
      title
      comments {
        commentText
        commentAuthor
      }
    }
  }
`;