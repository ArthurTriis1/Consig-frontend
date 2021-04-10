import { GetServerSidePropsContext } from 'next'
import { protectedRoutes } from 'utils/protectedRoutes'
import { ParsedUrlQuery } from 'querystring'
import { useSigContext } from 'hooks/SigContext'
import { useCallback, useEffect } from 'react'
import { Permission, Security } from 'enums/security'
import { getSigDataCookie } from 'utils/getSigDataCookie'
import { SigBasicInfo } from 'types/SigTypes'
import { Text } from './styles'

type SigIndexParams = {
  sigSlug: string
  sigData: SigBasicInfo
}

const SigIndex = ({ sigSlug, sigData }: SigIndexParams) => {
  const { data, setSigBasicInfo } = useSigContext()

  const changeSigBasicInfo = useCallback(() => {
    sigData && setSigBasicInfo(sigData)
  }, [setSigBasicInfo, sigData])

  useEffect(() => {
    changeSigBasicInfo()
  }, [changeSigBasicInfo])

  return (
    <>
      <Text>{JSON.stringify(data)}</Text>
      <h1>SigIndex: {sigSlug}</h1>
    </>
  )
}

export default SigIndex

export const getServerSideProps = async (
  ctx: GetServerSidePropsContext<ParsedUrlQuery>
) => {
  const sigSlug = ctx?.params?.sigSlug
  const sigData = await getSigDataCookie(ctx)
  const session = await protectedRoutes(
    ctx,
    sigData?.data?.security as Security,
    Permission.EDIT
  )

  if (!session) return {}

  return {
    props: {
      sigSlug,
      sigData
    }
  }
}
