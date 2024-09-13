import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'farms'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('name', 255)
      table.decimal('total_area_hectares', 10, 2).notNullable()
      table.decimal('arable_area_hectares', 10, 2).notNullable()
      table.decimal('vegetation_area_hectares', 10, 2).notNullable()
      table.integer('producer_id').unsigned().references('id').inTable('producers').onDelete('CASCADE')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })

    if (process.env.NODE_ENV !== 'test') {
    this.schema.raw(`
      ALTER TABLE ${this.tableName}
      ADD CONSTRAINT check_total_area
      CHECK (arable_area_hectares + vegetation_area_hectares <= total_area_hectares)
    `)
    }
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}