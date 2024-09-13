import Culture from '#models/culture'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Culture.createMany([
      { name: 'Soja' },
      { name: 'Milho' },
      { name: 'Algodão' },
      { name: 'Café' },
      { name: 'Cana-de-açúcar' },
    ])
  }
}