var express = require('express');
var router = express.Router();
var db = require('../models/index');

// /* GET mappublisher listing. */
// router.get('/world-viewer', function (req, res, next) {
//     console.log('###################')
//     db.map_publisher.findAll({
//         attributes: ['id', 'mapname','createdAt']
//     })
//         .then(function(maps){
//             console.log('###################')
//             res.render('world-view',{maps:maps})
//         })
//         .catch((error) => { 
//             console.log(error)
//             //return 
//             res.json({
//             error: true,
//             data: [],
//             error: error})})
//             })
 
/* POST map */
router.post('/postmap', function (req, res, next) {
    const {
        mapname,
        mapfile,
        mh,
        mw
    } = req.body;
    console.log(req.body)
    console.log('Updated')
    db.map_publishers.create({
            mapname: mapname,
            mapfile: mapfile,
            mh:mh,
            mw:mw
        })
        .then(todo => res.status(201).json({
            error: false,
            data: mappublisher,
            message: 'New map has been published.'
        }))
        .catch(error => res.json({
            error: true,
            data: [],
            error: error
        }));
});

router.put('/map/:id', function (req, res, next) {
    const map_id = req.params.id;
    const { mapname, mapfile } = req.body;
    model.map_publisher.update({
            mapname: mapname,
            mapfile: mapfile
        }, {
            where: {
                id: map_id
            }
        })
        .then(todo => res.status(201).json({
            error: false,
            message: 'Map has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

/* Delete map */
router.delete('/map/:id', function (req, res, next) {
    const map_id = req.params.id;
 
    model.map_publisher.destroy({ where: {
        id: map_id
    }})
        .then(status => res.status(201).json({
            error: false,
            message: 'Map has been delete.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

router.get('/map/:id', function (req, res, next) {
    const map_id = req.params.id;
    const { mapname, mapfile } = req.body;
    model.map_publisher.update({
            mapname: mapname,
            mapfile: mapfile
        }, {
            where: {
                id: map_id
            }
        })
        .then(todo => res.status(201).json({
            error: false,
            message: 'Map has been updated.'
        }))
        .catch(error => res.json({
            error: true,
            error: error
        }));
});

// router.get('/map/:id', function (req, res) {
//     console.log('###################')
//     var mapid = req.params.id
//     db.map_publisher.findOne({
//         where : [ id = mapid ]
//     })
//         .then(function(maps){
//             console.log('###################')
//             res.render('world-view',{maps:maps})
//         })
//         .catch((error) => { 
//             console.log(error)
//             //return 
//             res.json({
//             error: true,
//             data: [],
//             error: error})})
//             })

module.exports = router;