import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      artwork {
        _id
        title
        description
        image
        likesCount
        viewsCount
        evokeSadCount
        evokeFunnyCount
        evokeCalmingCount
        evokeBeautifulCount
        evokeWholesomeCount
        evokeMysteriousCount
        evokeThoughtfulCount
      }
    }
  }
`;

export const singleArt = gql`
  query singleArt ($artId: ID!) {
    artwork (artId: $artId) {
      title
      image
      description
      submittedAt
      owner {
        username
      }
      viewsCount
      likesCount
      evokeSadCount
      evokeFunnyCount
      evokeCalmingCount
      evokeBeautifulCount
      evokeWholesomeCount
      evokeMysteriousCount
      evokeThoughtfulCount
      comments {
        commentText
        commentAuthor
      }
    }
  }
`;

export const multipleArt = gql`
  query multipleArt ($username: String!) {
    multipleArt (username: $username) {
      _id
      title
      image
      submittedAt
    }
  }
`;
