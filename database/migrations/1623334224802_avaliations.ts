import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Avaliations extends BaseSchema {
  protected tableName = 'avaliations'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').primary()
      table.float('rate').defaultTo(0)
      table
        .integer('episode_id')
        .unsigned()
        .references('episodes.id')
        .onDelete('CASCADE')
      table
        .string('user_id')
        .unsigned()
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
