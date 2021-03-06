var Movie = require('../models/movie');
var Actor = require('../models/actor');
var shared = require('../lib/shared');
var elasticClient = require('../lib/elastic');

module.exports = {

    getAll: function (req, res, next) {
        Movie.find(function (err, movies) {
            if (err) return res.status(400).json(err);
            res.status(200).json(movies);
        }).populate('actors');
    },


    createOne: function (req, res, next) {
        req.body.id = shared.makeId();
        Movie.create(req.body, function (err, movie) {
            if (err) return res.status(400).json(err);

            var client = elasticClient.ElasticClient().getInstance();
            client.index({
                index: 'film-store',
                type: 'movie',
                body: {
                    "title": movie.title,
                    "id": movie.id
                }
            }, function (error, response) {
                if (!error)
                    console.log("Movie created in ElasticSearch Cluster");
            });
            res.status(201).json(movie);
        });
    },


    getOne: function (req, res, next) {
        Movie.findOne({id: req.params.id})
            .populate('actors')
            .exec(function (err, movie) {
                if (err) return res.status(400).json(err);
                if (!movie) return res.status(404).json();

                res.status(200).json(movie);
            });
    },


    updateOne: function (req, res, next) {
        Movie.findOneAndUpdate({id: req.params.id}, req.body, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            res.status(200).json(movie);
        });
    },


    deleteOne: function (req, res, next) {
        Movie.findOneAndRemove({id: req.params.id}, function (err) {
            if (err) return res.status(400).json(err);

            res.status(204).json();
        });
    },


    addActor: function (req, res, next) {
        Movie.findOne({id: req.params.id}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            Actor.findOne({id: req.body.id}, function (err, actor) {
                if (err) return res.status(400).json(err);
                if (!actor) return res.status(404).json();

                movie.actors.push(actor);
                movie.save(function (err) {
                    if (err) return res.status(500).json(err);

                    res.status(201).json(movie);
                });
            })
        });
    },


    deleteActor: function (req, res, next) {
        Movie.findOne({id: req.params.id}, function (err, movie) {
            if (err) return res.status(400).json(err);
            if (!movie) return res.status(404).json();

            // HACK TO CHANGE
            movie.actors = [];
            movie.save(function (err) {
                if (err) return res.status(400).json(err);

                res.status(204).json(movie);
            })
        });
    }

};
