import Farm from '#models/farm'
import Factory from '@adonisjs/lucid/factories'
import { LocationFactory } from './location_factory.js'
import { CultureFactory } from './culture_factory.js'
import { ProducerFactory } from './producer_factory.js'
import { DateTime } from 'luxon'

export const FarmFactory = Factory.define(Farm, ({ faker }) => {
  const totalArea = faker.number.float({ min: 100, max: 1000, precision: 0.01 })
  const arableArea = faker.number.float({ min: 50, max: totalArea * 0.8, precision: 0.01 })
  const vegetationArea = totalArea - arableArea

  return {
    name: faker.company.name(),
    total_area_hectares: totalArea,
    arable_area_hectares: arableArea,
    vegetation_area_hectares: vegetationArea,
    createdAt: DateTime.fromJSDate(faker.date.past()).startOf('second'),
    updatedAt: DateTime.fromJSDate(faker.date.recent()).startOf('second'),
  }
})
  .relation('producer', () => ProducerFactory)
  .relation('location', () => LocationFactory)
  .relation('cultures', () => CultureFactory)
  .build()

export default FarmFactory