var express = require('express');
var app = express();

var bodyParser = require('body-parser');

var multer = require('multer');

var config = require('./libs/config');

var log = require('./libs/log')(module);

var AddressesModel = require('./libs/mongoose').AddressesModel;
var TypeModel = require('./libs/mongoose').TypeModel;
var OrgsModel = require('./libs/mongoose').OrgsModel;


app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({
    extended: true
})); // for parsing application/x-www-form-urlencoded



app.use(multer()); // for parsing multipart/form-data


// cache control
//var oneDay = 86400000;

app.use(express.static(__dirname + '/public'));
// cache control
//app.use(express.static(__dirname + '/public', {maxAge: oneDay}));


app.listen(config.get('port'), function () {
    log.info('Express server listening on port ' + config.get('port'));
});

/*app.listen(process.env.PORT || cfg.get('port'));*/





// routing >>
var router = express.Router();

router.get('/api', function (req, res) {
    res.send('API is running');
});



router.post('/addAddress', function (req, res) {
    console.log('addAddress');
    console.log(req.body.indexAddress);

    res.end;
});



app.use('/', router);


app.get('/api/addresses', function (req, res) {
    return AddressesModel.find(function (err, addresses) {
        if (!err) {
            return res.send(addresses);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({
                error: 'Server error'
            });
        }
    });
});









app.get('/api/TypeModel', function (req, res) {
    return TypeModel.find(function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({
                error: 'Server error'
            });
        }
    });
});



app.get('/api/deleteTypeModel/:id', function (req, res) {
    return TypeModel.findById(req.params.id, function (err, data) {
        if (!err) {
            data.remove(function (err, todo) {
                res.send({
                    status: 'OK'
                });
            })
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({
                error: 'Server error'
            });
        }
    });
});



app.post('/api/updateTypeModel/:id', function (req, res) {
    return TypeModel.findById(req.params.id, function (err, types) {
        if (!err) {
            var jsondata = JSON.parse(req.body.data);

            types.name = jsondata.nameType;
            types.descr = jsondata.descrType;
            types.tags = jsondata.tagsType;

            types.save(function (err, types, count) {
                res.send({
                    status: 'OK'
                });
            })
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({
                error: 'Server error'
            });
        }

    });
});






// insert type of organization
app.post('/api/addTypeOrg', function (req, res) {

    var jsondata = JSON.parse(req.body.data);

    var typeM = new TypeModel({
        name: jsondata.nameType,
        descr: jsondata.descrType,
        tags: jsondata.tagsType
    });


    typeM.save(function (err) {
        if (!err) {
            log.info("type created");
            return res.send({
                status: 'OK'
            });
        } else {
            console.log(err);
            if (err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;
                res.send({
                    error: 'Server error'
                });
            }
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
});




// insert type of organization
app.post('/api/addOrg', function (req, res) {

    var jsondata = JSON.parse(req.body.data);


    var orgM = new OrgsModel({
        orgName: jsondata.orgName,
        descr: jsondata.descr,
        category: jsondata.category,
        latlang: jsondata.latlang,
        phone: jsondata.phone,
        site: jsondata.site,
        socialPage: jsondata.socialPage,
        email: jsondata.email,
        modeWork: jsondata.modeWork,
        tags: jsondata.tags,
        personalPage: jsondata.personalPage,
        photo: jsondata.photo
    });


    orgM.save(function (err) {
        if (!err) {
            log.info("type created");
            return res.send({
                status: 'OK'
            });
        } else {
            console.log(err);
            if (err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;
                res.send({
                    error: 'Server error'
                });
            }
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
});




app.get('/api/OrgsModel', function (req, res) {
    return OrgsModel.find(function (err, orgs) {
        if (!err) {
            return res.send(orgs);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({
                error: 'Server error'
            });
        }
    });
});



app.get('/api/streets', function (req, res) {
    return AddressesModel.find({
        typeAddress: 'Street'
    }, function (err, streets) {
        if (!err) {
            return res.send(streets);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({
                error: 'Server error'
            });
        }
    });
});




app.post('/api/addAddress', function (req, res) {


    log.info('indexAddress = ' + req.body.mydata);

    var jsondata = JSON.parse(req.body.mydata);
    log.info('indexAddress = ' + jsondata.indexAddress);
    log.info('nameAddress = ' + jsondata.nameAddress);
    log.info('descrAddress = ' + jsondata.descrAddress);
    log.info('parentAddress = ' + jsondata.parentAddress);
    log.info('typeAddress = ' + jsondata.typeAddress);


    /*   var address = new AddressesModel({
           index: jsondata.indexAddress,
           name: jsondata.nameAddress,
           descr: jsondata.descrAddress,
           parent: jsondata.parentAddress,
           typeAddress: jsondata.typeAddress
       });*/

    var address = new AddressesModel({
        index: jsondata.indexAddress,
        name: jsondata.nameAddress,
        descr: jsondata.descrAddress,
        parent: jsondata.parentAddress,
        typeAddress: jsondata.typeAddress
    });




    address.save(function (err) {
        if (!err) {
            log.info("address created");
            return res.send({
                status: 'OK',
                address: address
            });
        } else {
            console.log(err);
            if (err.name == 'ValidationError') {
                res.statusCode = 400;
                res.send({
                    error: 'Validation error'
                });
            } else {
                res.statusCode = 500;
                res.send({
                    error: 'Server error'
                });
            }
            log.error('Internal error(%d): %s', res.statusCode, err.message);
        }
    });
});







/*Block for engine errors*/

app.use(function (req, res, next) {
    res.status(404);
    log.debug('Not found URL: %s', req.url);
    res.send({
        error: 'Not found'
    });
    return;
});

app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    log.error('Internal error(%d): %s', res.statusCode, err.message);
    res.send({
        error: err.message
    });
    return;
});



// routing <<