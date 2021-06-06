const SqliteJsonExport = require('sqlite-json-export');
const exporter = new SqliteJsonExport('./src/data/database.db3');
const fs = require('fs');

exporter.json(`SELECT docs.date, docTypes.name AS type, docs.id, products.name, products.image, products.price, rows.quantity, products.removed FROM docs 
                   INNER JOIN docTypes ON docs.typeId = docTypes.id
                       INNER JOIN rows ON docs.id = rows.docId
                           INNER JOIN products ON rows.productId = products.id;`, (err, json) => {
    if (err) {
        console.error(err.message);
      }

      fs.writeFileSync("./src/data/database.json", `${json}`);
      
});