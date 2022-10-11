const Mongoose = require('mongoose');
const Config = require('../../config/.env');
const uriFormat = require('mongodb-uri');

function encodeMongoURI (urlString) {
    if (urlString) {
      let parsed = uriFormat.parse(urlString)
      urlString = uriFormat.format(parsed);
    }
    return urlString;
}

let connectionString = 'mongodb://';
if ( Config.database.username && Config.database.password ) {
	connectionString += Config.database.username + ':' + Config.database.password + '@';
}

connectionString += Config.database.host + ':' + Config.database.port + '/' + Config.database.db; 

if ( Config.database.authSource ) {
	connectionString += '?authSource='+Config.database.authSource;
}

console.log("Connection String:",connectionString);

Mongoose.connect( encodeMongoURI(connectionString), {
});

const db = Mongoose.connection;

db.on('error', function(err){
	console.log("Error in connecting with MongoDB");
	console.log(err);
	process.exit(0);
});
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});

exports.Mongoose = Mongoose;
exports.db = db;