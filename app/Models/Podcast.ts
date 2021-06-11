import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column, HasMany, hasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Episode from './Episode'


export default class Podcast extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public feed_rss_url: string

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public image: string

  @column()
  public link: string

  @column()
  public last_published: string

  @column()
  public author: string

  @column()
  public user_id: number

  @belongsTo(() => User, {foreignKey: 'user_id', localKey: 'id'})
  public user: BelongsTo<typeof User>

  @hasMany(() => Episode)
  public episodes: HasMany<typeof Episode>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
