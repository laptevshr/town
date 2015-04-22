var config = require('./config');
var log = require('./log')(module);

var mongoose = require('mongoose');

mongoose.connect(config.get('mongoose:uri'));


var db = mongoose.connection;


db.on('error', function (err) {
    log.error('connection error:', err.message);
});
db.once('open', function callback() {
    log.info("Connected to DB!");
});


// Type of organizations
var typeShema = new mongoose.Schema({
    name: String,
    descr: String,
    tags: String
});
var TypeModel = mongoose.model('Types', typeShema);





// Structure of organizations
var orgShema = new mongoose.Schema({
    orgName: String,
    descr: String,
    category: [{
        name: String
    }],
    latlang: {
        point: String
    },
    phone: [{
        main: Number,
        insNum: Number,
        title: String
    }],
    site: String,
    socialPage: String,
    email: String,
    modeWork: [{
        dayOfWeek: [Number],
        wh: String,
        break: [String]
    }],
    tags: String,
    personalPage: String,
    photo: [{
        fileName: String
    }]
});
var OrgsModel = mongoose.model('Organizations', orgShema);






// old model - delete me
var addressShema = new mongoose.Schema({
    typeAddress: [String],
    index: Number,
    name: String,
    descr: String,
    parent: String,
    latlang: [{
        point: String
    }],
    polygon: [{
        point: String
    }]
});
var AddressesModel = mongoose.model('Addresses', addressShema);


module.exports.TypeModel = TypeModel;
module.exports.AddressesModel = AddressesModel;
module.exports.OrgsModel = OrgsModel;