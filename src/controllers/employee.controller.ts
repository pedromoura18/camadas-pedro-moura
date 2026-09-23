import { Request, Response, NextFunction } from 'express'
import { EmployeeService } from '../services/employee.service'
import { employeeDTO } from '../dtos/employee.dto'

export class EmployeeController {
  constructor(private service: EmployeeService) {}

  async create(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const dto = employeeDTO(req.body)
      const created = this.service.create(dto)

      res.status(201).json(created)
    } catch (error) {
      next(error)
    }
  }

  async findByCompany(
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    try {
      const companyId = Number(req.params.id)
      const employees = this.service.findByCompany(companyId)

      res.status(200).json(employees)
    } catch (error) {
      next(error)
    }
  }
}