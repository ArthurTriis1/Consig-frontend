import { Security } from 'enums/security'

export type SigData = {
  name?: string
  security?: Security
  id?: number
}

export type SigBasicInfo = {
  data: SigData
  theme?: {
    primary?: string
    secondary?: string
  }
}
