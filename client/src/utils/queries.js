import { gql } from '@apollo/client';

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      art {
        title
        description
        image
        owner
        likesCount
        viewsCount
        evokeSadCount
        evokeFunnyCount
        evokeCalmingCount
        evokeBeautifulCount
        evokeWholesomeCount
        evokeInspiringCount
        evokeThoughtfulCount
        evokeMysteriousCount
      }
    }
  }
`;
