import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Episodes extends BaseSchema {
  protected tableName = 'episodes'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.time('published')
      table.string('title')
      table.string('description')
      table.string('link')
      table.string('image')
      table
        .integer('podcast_id')
        .unsigned()
        .references('podcasts.id')
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
