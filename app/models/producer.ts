import { DateTime } from 'luxon'
import { BaseModel, column, hasOne } from '@adonisjs/lucid/orm'
import type { HasOne } from '@adonisjs/lucid/types/relations'
import Farm from './farm.js'

export default class Producer extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare document: string

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasOne(() => Farm)
  declare farm: HasOne<typeof Farm>
}
