import { gql } from '@apollo/client'

export const MUTATION_LOGIN = gql`
  mutation MutationLogin($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        sigsCanView {
          slug
        }
        sigsCanEdit {
          slug
        }
      }
    }
  }
`
