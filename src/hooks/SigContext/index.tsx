import React, { createContext, useContext, useEffect, useState } from 'react'
import { ThemeProvider } from 'styled-components'
import cookie from 'js-cookie'
import { SigBasicInfo } from 'types/SigTypes'

export type SigProviderProps = {
  children: React.ReactNode
}

export type SigContext = {
  setSigBasicInfo: (sigData: SigBasicInfo) => void
} & SigBasicInfo

const SigContextDefaultValues: SigContext = {
  data: {},
  theme: {},
  setSigBasicInfo: () => null
}

const SigContext = createContext<SigContext>(SigContextDefaultValues)

const SigProvider = ({ children }: SigProviderProps) => {
  const [sigBasicInfo, setSigBasicInfo] = useState<SigBasicInfo>({
    data: {},
    theme: {}
  })

  useEffect(() => {
    cookie.set('sig', sigBasicInfo, { expires: 1 / 24 })
  }, [sigBasicInfo])

  return (
    <SigContext.Provider value={{ setSigBasicInfo, ...sigBasicInfo }}>
      <ThemeProvider theme={sigBasicInfo.theme}>{children}</ThemeProvider>
    </SigContext.Provider>
  )
}

const useSigContext = () => useContext(SigContext)

export { SigProvider, useSigContext }
