import { DateTime } from 'luxon'
import { BaseModel, column, HasOne, hasOne } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Episode from './Episode'

export default class Avaliation extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public rate: number

  @column()
  public episode_id: number

  @column()
  public user_id: number

  @hasOne(() => User, {localKey: 'user_id', foreignKey: 'id'})
  public user: HasOne<typeof User>

  @hasOne(() => Episode, {localKey: 'episode_id', foreignKey: 'id'})
  public episode: HasOne<typeof Episode>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
