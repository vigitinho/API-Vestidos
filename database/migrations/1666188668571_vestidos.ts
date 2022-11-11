import BaseSchema from '@ioc:Adonis/Lucid/Schema'

/*  Reflete o model em tabelas no Banco de dados */
export default class extends BaseSchema {
  protected tableName = 'vestidos'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title')
      table.string('description')
      table.string('color')
      table.integer('value')
      table.string('style')
      table.string('image')

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
