exports.up = function (knex) {
  return knex.schema
    .createTable("users", (tbl) => {
      tbl.increments();
      tbl.text("email", 128).notNullable();
      tbl.text("password", 128).notNullable();
      tbl.timestamps(true, true);
    })
    .createTable("requests", (tbl) => {
      tbl.increments();
      tbl.text("text").notNullable();
      tbl.timestamps(true, true);

      tbl
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users").dropTableIfExists("requests");
};
