import Culture from '#models/culture'
import Factory from '@adonisjs/lucid/factories'
import { DateTime } from 'luxon'

export const CultureFactory = Factory.define(Culture, ({ faker }) => {
  return {
    name: faker.helpers.arrayElement([
        'Soja', 
        'Milho', 
        'Algodão', 
        'Café', 
        'Cana-de-açúcar'
    ]),
    createdAt: DateTime.fromJSDate(faker.date.past()).startOf('second'),
    updatedAt: DateTime.fromJSDate(faker.date.recent()).startOf('second'),
  }
})
  .build()

        
    