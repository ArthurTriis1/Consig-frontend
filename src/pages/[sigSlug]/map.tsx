import { Permission, Security } from 'enums/security'
import { GeoJsonObject } from 'geojson'
import { sigBySlug } from 'graphql/generated/sigBySlug'
import { QUERY_BY_SLUG } from 'graphql/queries/sigBySlug'
import { useSigContext } from 'hooks/SigContext'
import { GetServerSidePropsContext } from 'next'
import { getSession } from 'next-auth/client'
import dynamic from 'next/dynamic'
import { useCallback, useEffect } from 'react'
import { SigBasicInfo } from 'types/SigTypes'
import { initializeApollo } from 'utils/apollo'
import { getSigDataCookie } from 'utils/getSigDataCookie'
import { protectedRoutes } from 'utils/protectedRoutes'

type MapPageProps = {
  geojsons: GeoJsonObject[]
  sigData: SigBasicInfo
}

const Map = dynamic(() => import('components/Map'), { ssr: false })

export default function Home({ geojsons, sigData }: MapPageProps) {
  const { setSigBasicInfo } = useSigContext()

  const changeSigBasicInfo = useCallback(() => {
    sigData && setSigBasicInfo(sigData)
  }, [setSigBasicInfo, sigData])

  useEffect(() => {
    changeSigBasicInfo()
  }, [changeSigBasicInfo])

  return <Map geojsonLayers={geojsons} />
}

export async function getServerSideProps(ctx: GetServerSidePropsContext) {
  const sigSlug = ctx?.params?.sigSlug
  const sigData = await getSigDataCookie(ctx)
  const sessionBool = await protectedRoutes(
    ctx,
    sigData?.data?.security as Security,
    Permission.VIEW
  )

  if (!sessionBool) return {}

  const session = await getSession(ctx)

  const apolloClient = initializeApollo(null, session)

  const { data } = await apolloClient.query<sigBySlug>({
    query: QUERY_BY_SLUG,
    variables: {
      slug: sigSlug
    }
  })

  return {
    props: {
      sigData,
      geojsons: data.sigBySlug?.Layers?.geo_json_layers.map((l) => l.GeoJSON)
    }
  }
}
