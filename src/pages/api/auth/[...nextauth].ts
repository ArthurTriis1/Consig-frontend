import {
  MutationLogin,
  MutationLoginVariables
} from 'graphql/generated/MutationLogin'
import { MUTATION_LOGIN } from 'graphql/mutations/login'
import NextAuth, { InitOptions } from 'next-auth'
import Providers from 'next-auth/providers'
import {
  GenericObject,
  NextApiRequest,
  NextApiResponse
} from 'next-auth/_utils'
import { initializeApollo } from 'utils/apollo'
import { checkLoginPermission } from 'utils/checkLoginPermission'

const options: InitOptions = {
  pages: {
    signIn: '/sign-in'
  },
  providers: [
    Providers.Credentials({
      name: 'Sign-in',
      credentials: {},
      async authorize({ email, password, sigSlug }) {
        const apolloClient = initializeApollo()

        const { data } = await apolloClient.mutate<
          MutationLogin,
          MutationLoginVariables
        >({
          mutation: MUTATION_LOGIN,
          variables: {
            input: {
              identifier: email,
              password: password
            }
          }
        })

        if (data?.login) {
          const sigsCanView = data.login.user.sigsCanView.map((sig) => sig.slug)
          const sigsCanEdit = data.login.user.sigsCanEdit.map((sig) => sig.slug)

          const permissions = checkLoginPermission(
            sigsCanView,
            sigsCanEdit,
            sigSlug
          )
          if (permissions.length) {
            return {
              ...data.login.user,
              jwt: data.login.jwt,
              loggedSig: {
                permissions,
                slug: sigSlug
              }
            }
          }
        }

        return null
      }
    })
  ],
  callbacks: {
    session: async (session: GenericObject, user: GenericObject) => {
      session.jwt = user.jwt
      session.id = user.id
      session.loggedSig = user.loggedSig

      return Promise.resolve(session)
    },
    jwt: async (token: GenericObject, user: GenericObject) => {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.username
        token.jwt = user.jwt
        token.loggedSig = user.loggedSig
      }

      return Promise.resolve(token)
    }
  }
}

const Auth = (req: NextApiRequest, res: NextApiResponse) =>
  NextAuth(req, res, options)

export default Auth
