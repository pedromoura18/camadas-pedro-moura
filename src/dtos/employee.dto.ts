import { InvalidInput } from '../errors'
import { NewEmployee } from '../types'

export function employeeDTO(body: unknown): NewEmployee {
  const data = body as Record<string, unknown>

  const name = data.name
  const email = data.email
  const salary = data.salary
  const companyId = data.companyId

  if (typeof name !== 'string' || name.length < 3) {
    throw new InvalidInput(['name'])
  }

  if (typeof email !== 'string' || !email.includes('@')) {
    throw new InvalidInput(['email'])
  }

  if (typeof salary !== 'number' || !Number.isFinite(salary)) {
    throw new InvalidInput(['salary'])
  }

  if (typeof companyId !== 'number' || !Number.isInteger(companyId)) {
    throw new InvalidInput(['companyId'])
  }

  return {
    name,
    email,
    salary,
    companyId
  }
}