import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'


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
  public user_id: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
