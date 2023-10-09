/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.raw("PRAGMA foreign_key=ON")
    await knex.schema.createTable("accountUser", table => {
        table.increments("id")
        table.integer("amount")
        table.integer("invoice_amount")
        table.integer("payment_data")
        table.integer("invoice_closing")
        table.integer("credit_card")
        table.integer("loan")
        table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
