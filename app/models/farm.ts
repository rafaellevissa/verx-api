import { BaseModel, belongsTo, column, hasOne, manyToMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Producer from './producer.js'
import type { BelongsTo, HasOne, ManyToMany } from '@adonisjs/lucid/types/relations'
import Location from './location.js'
import Culture from './culture.js'

export default class Farm extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare totalAreaHectares: number

  @column()
  declare arableAreaHectares: number

  @column()
  declare vegetationAreaHectares: number

  @column({ columnName: 'producer_id' })
  declare producerId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Producer)
  declare producer: BelongsTo<typeof Producer>

  @manyToMany(() => Culture, {
    pivotForeignKey: 'farm_id',
    pivotRelatedForeignKey: 'culture_id',
    pivotTable: 'farm_cultures',
  })
  declare cultures: ManyToMany<typeof Culture>

  @hasOne(() => Location)
  declare location: HasOne<typeof Location>
}