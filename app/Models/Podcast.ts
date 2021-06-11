import { DateTime } from 'luxon'
import { BaseModel, belongsTo, BelongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'


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

  @belongsTo(() => User)
  public user_id: BelongsTo<typeof User>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
