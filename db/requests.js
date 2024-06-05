const db = require('./config');

function requestAll(table, callbakc) {
    const sql = `SELECT * FROM ${table}`;
    db.any(sql)
        .then(result => {
            callbakc(null, result);
        })
        .catch(err => {
            callbakc(err);
        });
};

function requestOne(table, id, callbakc) {
    const sql = `SELECT * FROM ${table} WHERE id = ${id}`;
    db.any(sql)
        .then(result => {
            callbakc(null, result);
        })
        .catch(err => {
            callbakc(err);
        });
};

function create(table, item, callbakc) {
    const keys = Object.keys(item);
    const properties = keys.join(', ');
    const values = keys.map(key => `'${item[key]}'`).join(', ');
    const sql = `INSERT INTO ${table} (${properties}) VALUES (${values}) RETURNING *`;

    db.any(sql)
        .then(([result]) => {
            callbakc(null, result);
        })
        .catch(err => {
            callbakc(err);
        });
}

function update(table, id, item, callbakc) {
    const keys = Object.keys(item);
    const updates = keys.map(key => `${key} = '${item[key]}'`).join(', ');
    const sql = `UPDATE ${table} SET ${updates} WHERE id = ${id} RETURNING *`;

    db.any(sql)
        .then(([result]) => {
            callbakc(null, result);
        })
        .catch(err => {
            callbakc(err);
        })
}

function deleteItem(table, id, callbakc) {
    const sql = `DELETE FROM ${table} WHERE id = ${id}`;

    db.any(sql)
        .then(() => {
            callbakc(null);
        })
        .catch(err => {
            callbakc(err);
        })
}

module.exports = {
    requestAll,
    requestOne,
    create,
    update,
    deleteItem
};