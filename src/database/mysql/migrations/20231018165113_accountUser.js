/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
    await knex.schema.createTable("accountUser", table => {
        table.increments("id")
        table.float("amount")
        table.float("invoice_amount")
        table.integer("payment_data")
        table.integer("invoice_closing")
        table.float("credit_card")
        table.float("loan")
        table.integer("user_id").references("id").inTable("users").onDelete("CASCADE")
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
