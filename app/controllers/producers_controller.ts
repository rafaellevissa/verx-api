import Farm from '#models/farm'
import Location from '#models/location'
import ProducerService from '#services/producers_service'
import { createProducerValidator, updateProducerValidator } from '#validators/producer_validator'
import type { HttpContext } from '@adonisjs/core/http'

export default class ProducersController {
  private producerService: ProducerService

  constructor() {
    this.producerService = new ProducerService()
  }

  public async index({ response }: HttpContext) {
    const producers = await this.producerService.getAllProducers()
    return response.json(producers)
  }

  /**
   * @store
   * @requestBody { "name": "string", "document": "string", "farm": { "name": "string", "arableAreaHectares": 100, "vegetationAreaHectares": 100, "totalAreaHectares": 1000, "address": { "city": "string", "state": "string" }, "cultures": [1, 2] } }
   * @responseBody 201 - Producer created
   */
  public async store({ request, response }: HttpContext) {
    const {
      farm: { address, cultures, ...farm },
      ...producer
    } = await createProducerValidator.validate(request.all())

    const result = await this.producerService.createProducer(producer, farm, address, cultures)

    return response.status(201).json(result)
  }

  public async show({ params, response }: HttpContext) {
    const producer = await this.producerService.getProducerById(params.id)
    return response.json(producer)
  }

  /**
   * @update
   * @requestBody { "name": "string", "document": "string", "farm": { "name": "string", "arableAreaHectares": 100, "vegetationAreaHectares": 100, "totalAreaHectares": 1000, "address": { "city": "string", "state": "string" }, "cultures": [1, 2] } }
   * @responseBody 200 - Producer updated
   */
  public async update({ params, request, response }: HttpContext) {
    const validatedData = await updateProducerValidator.validate(request.all())
    
    const { farm, ...producer } = validatedData

    let farmData: Partial<Farm> | null = null
    let address: Partial<Location> | null = null
    let cultures: number[] | null = null

    if (farm) {
      const { address: farmAddress, cultures: farmCultures, ...restFarm } = farm
      farmData = restFarm ?? null
      address = farmAddress ?? null
      cultures = farmCultures ?? null
    }

    const result = await this.producerService.updateProducer(
      params.id,
      producer,
      farmData,
      address,
      cultures
    )

    return response.json(result)
  }

  public async destroy({ params, response }: HttpContext) {
    await this.producerService.deleteProducer(params.id)
    return response.status(204)
  }

  public async dashboard({ response }: HttpContext) {
    const dashboardData = await this.producerService.getDashboardData()
    return response.json(dashboardData)
  }
}
