const sqlite3 = require('sqlite3').verbose();


/* Base de datos para el formulario */
let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite contact database.');

    db.run("CREATE TABLE IF NOT EXISTS contactos (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL, email TEXT NOT NULL, comment TEXT NOT NULL, date TEXT NOT NULL, myIP TEXT NOT NULL, pais TEXT NOT NULL)");
});


module.exports = {
    insert: function (name, email, comment, date, myIP, pais) {
        db.run("INSERT INTO contactos (name, email, comment, date, myIP, pais) VALUES (?, ?, ?, ?, ?, ?)", [name, email, comment, date, myIP, pais], function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    },
    select: function (callback) {
        db.all("SELECT * FROM contactos", [], (err, rows) => {
            if (err) {
                throw err;
            }
            callback(rows);
        });
    }
}

/* Base de datos para el login */
let db2 = new sqlite3.Database(':memory:', (err) => {
    if (err) {
        return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite user database.');

    db.run("CREATE TABLE IF NOT EXISTS usuarios (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, email TEXT NOT NULL, pwd TEXT NOT NULL)");
});

module.exports = {
    insert: function (username, email, pwd) {
        db.run("INSERT INTO usuarios (username, email, pwd) VALUES (?, ?, ?)", [username, email, pwd], function (err) {
            if (err) {
                return console.log(err.message);
            }
            // get the last insert id
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    },
    select: function (callback) {
        db.all("SELECT * FROM usuarios", [], (err, rows) => {
            if (err) {
                throw err;
           }
           callback(rows);
        });
    }
}
