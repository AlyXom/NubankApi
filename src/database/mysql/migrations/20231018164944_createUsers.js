/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("users", table => {
        table.increments("id")
        table.text("name")
        table.text("email")
        table.text("password")
        table.text("avatar")
        table.timestamp("created_at").defaultTo(knex.raw('CURRENT_TIMESTAMP'))
        table.timestamp("updated_at").defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  
};
