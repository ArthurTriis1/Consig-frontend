import { GetServerSidePropsContext } from 'next'
import { SigService } from 'services/SigService'
import { SigBasicInfo } from 'types/SigTypes'

async function getSigDataCookie(
  ctx: GetServerSidePropsContext
): Promise<SigBasicInfo | null> {
  let sigData
  const { params } = ctx

  if (params?.sigSlug == 'worker.js') return null
  try {
    sigData = JSON.parse(ctx.req.cookies.sig) as SigBasicInfo
  } catch {
    sigData = {}
  } finally {
    if (!sigData?.data?.security) {
      const { data: resSigData } = await SigService.get<SigBasicInfo>(
        `/sigs/basic/${params?.sigSlug}`
      )
      sigData = resSigData
    }
  }

  return sigData as SigBasicInfo
}

export { getSigDataCookie }
