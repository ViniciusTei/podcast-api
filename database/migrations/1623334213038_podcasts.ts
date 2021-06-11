import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Podcasts extends BaseSchema {
  protected tableName = 'podcasts'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.string('feed_rss_url').notNullable()
      table.string('title')
      table.string('description')
      table.string('image')
      table.string('link')
      table.string('last_published')
      table.string('author')
      table
        .integer('user_id')
        .references('users.id')
        .onDelete('CASCADE')
      /**
       * Uses timestampz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
