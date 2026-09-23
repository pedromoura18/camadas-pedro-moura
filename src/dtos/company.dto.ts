import { InvalidInput } from '../errors'
import { NewCompany } from '../types'

export function companyDTO(body: unknown): NewCompany {
  const data = body as Record<string, unknown>

  const name = data.name
  const cnpj = data.cnpj
  const state = data.state

  if (typeof name !== 'string' || name.length < 3) {
    throw new InvalidInput(['name'])
  }

  if (typeof cnpj !== 'string' || !/^\d{14}$/.test(cnpj)) {
    throw new InvalidInput(['cnpj'])
  }

  if (typeof state !== 'string' || !/^[A-Za-z]{2}$/.test(state)) {
    throw new InvalidInput(['state'])
  }

  return {
    name,
    cnpj,
    state
  }
}