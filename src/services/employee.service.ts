import { NotFound, RuleViolation } from '../errors'
import { CompanyRepository } from '../repositories/company.repository'
import { EmployeeRepository } from '../repositories/employee.repository'
import { NewEmployee, Employee } from '../types'

const MINIMUM_WAGE = 1518
const INSS_RATE = 0.11

export class EmployeeService {
  constructor(
    private employees: EmployeeRepository,
    private companies: CompanyRepository
  ) {}

  create(data: NewEmployee): Employee {
    const company = this.companies.findById(data.companyId)

    if (!company) {
      throw new NotFound('company')
    }

    if (data.salary < MINIMUM_WAGE) {
      throw new RuleViolation('salary below minimum wage')
    }

    const grossSalary = data.salary
    const netSalary = grossSalary - grossSalary * INSS_RATE

    return this.employees.save(data, grossSalary, netSalary)
  }

  findByCompany(companyId: number): Employee[] {
    return this.employees.findByCompany(companyId)
  }
}