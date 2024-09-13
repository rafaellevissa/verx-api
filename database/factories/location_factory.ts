import Location from '#models/location'
import Factory from '@adonisjs/lucid/factories'
import FarmFactory from './farm_factory.js'
import { DateTime } from 'luxon'

export const LocationFactory = Factory.define(Location, ({ faker }) => {
  return {
    city: faker.location.city(),
    state: faker.location.state({ abbreviated: true }),
    createdAt: DateTime.fromJSDate(faker.date.past()).startOf('second'),
    updatedAt: DateTime.fromJSDate(faker.date.recent()).startOf('second'),
  }
})
  .relation('farm', () => FarmFactory)
  .build()
