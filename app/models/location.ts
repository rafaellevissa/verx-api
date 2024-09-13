import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import Farm from './farm.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Location extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare city: string

  @column()
  declare state: string

  @column({ columnName: 'farm_id' })
  declare farmId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Farm)
  declare farm: BelongsTo<typeof Farm>
}
