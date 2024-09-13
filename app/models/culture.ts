import { DateTime } from 'luxon'
import Farm from './farm.js'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import type { ManyToMany } from '@adonisjs/lucid/types/relations'

export default class Culture extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Farm, {
    pivotForeignKey: 'culture_id',
    pivotRelatedForeignKey: 'farm_id',
    pivotTable: 'farm_cultures',
  })
  declare farms: ManyToMany<typeof Farm>
}
