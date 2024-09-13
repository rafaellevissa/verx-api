import Producer from '#models/producer'
import Factory from '@adonisjs/lucid/factories'
import FarmFactory from './farm_factory.js'
import { DateTime } from 'luxon'

export const ProducerFactory = Factory.define(Producer, ({ faker }) => {
  return {
    document: faker.string.numeric(11),
    name: faker.person.fullName(),
    createdAt: DateTime.fromJSDate(faker.date.past()).startOf('second'),
    updatedAt: DateTime.fromJSDate(faker.date.recent()).startOf('second'),
  }
})
  .relation('farm', () => FarmFactory)
  .build()
