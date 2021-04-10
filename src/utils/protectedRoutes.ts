import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import { Security, Permission } from '../enums/security'

async function protectedRoutes(
  context: GetServerSidePropsContext,
  sigSecurity: Security,
  pagePermisson: Permission
) {
  //    Se não for se autenticar

  const session = await getSession(context)

  //    Se a pagina for pubica e se o sig for publico autoriza o acesso
  if (pagePermisson === Permission.VIEW && sigSecurity === Security.PUBLIC)
    return true

  const sigSlug = context?.params?.sigSlug

  const userSigSlug = session?.loggedSig?.slug
  const userSigPermissions = session?.loggedSig?.permissions

  if (
    // userSigSlug && Comentado para checar real necessidade
    userSigSlug === sigSlug &&
    userSigPermissions.includes(pagePermisson)
  ) {
    return true
  }

  context.res.writeHead(302, {
    Location: `/${sigSlug}/sign-in`
  })
  context.res.end()

  return false
}

export { protectedRoutes }
