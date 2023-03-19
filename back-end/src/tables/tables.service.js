const knex = require("../db/connection");

async function list() {
  return knex("tables").select("*").orderBy("table_name");
}

function read(table_id) {
  return knex("tables").select("*").where({ table_id }).first();
}

function create(newTable) {
  return knex("tables")
    .insert(newTable, "*")
    .then((createdRecords) => createdRecords[0]);
}



//this function uses transactions -- get good at these
function finishTable(table_id, reservation_id) {
  return knex.transaction(function (trx) {
    return trx("tables")
      .where({ table_id: table_id })
      .update({ reservation_id: null })
      .then(() => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "finished" });
      });
  });
}
// -------------------------------------------

function seatTable(reservation_id, table_id) {
  return knex.transaction(function (trx) {
    return knex("tables")
      .where({ table_id: table_id })
      .update({ reservation_id })
      .returning("*")
      .then((updatedTable) => updatedTable[0])
      .then(() => {
        return trx("reservations")
          .where({ reservation_id })
          .update({ status: "seated" });
      });
  });
}



module.exports = {
  list,
  read,
  create,
  seatTable,
  finishTable,
};
