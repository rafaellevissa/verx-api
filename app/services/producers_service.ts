import Farm from '#models/farm'
import Location from '#models/location'
import Producer from '#models/producer'
import db from '@adonisjs/lucid/services/db'

export default class ProducerService {
  public async getAllProducers() {
    return await Producer.query().preload('farm', (farmsQuery) => {
      farmsQuery.preload('location').preload('cultures')
    })
  }

    public async getProducerById(id: string) {
      return await Producer.query()
        .where('id', id)
        .preload('farm', (farmsQuery) => farmsQuery.preload('location').preload('cultures'))
        .firstOrFail()
    }

  public async createProducer(
    producerData: Partial<Producer>,
    farmData: Partial<Farm>,
    addressData: Partial<Location>,
    culturesData: number[]
  ) {
    const trx = await db.transaction()

    try {
      const producer = await Producer.create(producerData, { client: trx })
      const newFarm = await producer.related('farm').create(farmData, { client: trx })

      const location = await Location.create(addressData, { client: trx })
      await location.related('farm').associate(newFarm)

      await newFarm.related('cultures').attach(culturesData)

      await producer.load('farm', (farmsQuery) => {
        farmsQuery.preload('location').preload('cultures')
      })

      await trx.commit()

      return producer
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

  public async updateProducer(
    producerId: number,
    producerData: Partial<Producer> | null,
    farmData: Partial<Farm> | null,
    locationData: Partial<Location> | null,
    culturesData: number[] | null
  ) {

    const trx = await db.transaction()

    try {
      const producer = await Producer.findOrFail(producerId)

      await producer.merge(producerData ?? {}).save()

      const existingFarm = await producer.related('farm').firstOrCreate({}, farmData ?? {})
      await existingFarm.merge(farmData ?? {}).save()

      if (locationData) {
        await existingFarm.related('location').updateOrCreate({}, locationData)
      }

      if (culturesData) {
        await existingFarm.related('cultures').sync(culturesData)
      }

      await producer.load('farm', (farmsQuery) => {
        farmsQuery.preload('location').preload('cultures')
      })

      return producer
    } catch (error) {
      await trx.rollback()
      throw error
    }
  }

    public async deleteProducer(producerId: string) {
      const producer = await Producer.findOrFail(producerId)
      await producer.related('farm').query().delete()
      await producer.delete()
    }

  public async getDashboardData() {
    const totalFarms = await Farm.query().count('* as total')
    const totalArea = await Farm.query().sum('total_area_hectares as total')
    const stateDistribution = await Location.query()
      .select('state')
      .count('* as count')
      .groupBy('state')
    const cultureDistribution = await db.from('cultures')
      .select('cultures.name')
      .count('farm_cultures.farm_id as count')
      .leftJoin('farm_cultures', 'cultures.id', 'farm_cultures.culture_id')
      .groupBy('cultures.id', 'cultures.name')
    const landUseDistribution = await Farm.query()
      .sum('arable_area_hectares as arableAreaHectares')
      .sum('vegetation_area_hectares as vegetationAreaHectares')
      .firstOrFail()

    return {
      totalFarms: Number(totalFarms[0].$extras.total),
      totalArea: Number(totalArea[0].$extras.total),
      stateDistribution,
      cultureDistribution,
      landUseDistribution: {
        arableArea: Number(landUseDistribution.$extras.arableAreaHectares),
        vegetationArea: Number(landUseDistribution.$extras.vegetationAreaHectares),
      },
    }
  }
}
