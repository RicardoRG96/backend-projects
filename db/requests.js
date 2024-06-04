const db = require('./config');

function requestAll(table, callbakc) {
    const sql = `SELECT * FROM ${table}`;
    db.any(sql)
        .then(result => {
            callbakc(null, result);
        })
        .catch(err => console.log(err));
};

function requestOne(table, id, callbakc) {
    const sql = `SELECT * FROM ${table} WHERE id = ${id}`;
    db.any(sql)
        .then(result => {
            callbakc(null, result);
        })
        .catch(err => console.log(err));
};

module.exports = {
    requestAll,
    requestOne
}