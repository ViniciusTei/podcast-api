import { DateTime } from 'luxon'
import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Podcast from './Podcast'

export default class Episode extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public published: Date

  @column()
  public title: string

  @column()
  public description: string

  @column()
  public link: string

  @column()
  public image: string

  @column()
  public podcast_id: number

  @belongsTo(() => Podcast, {localKey: 'id', foreignKey: 'podcast_id'})
  public podcast: BelongsTo<typeof Podcast>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
