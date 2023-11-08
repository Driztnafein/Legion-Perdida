const Game = require('../models/game.model');

module.exports.create = (req, res, next) => {
    Game.create({
        title: req.body.title,
        genre: req.body.genre,
        mechanics: req.body.mechanics,
        minPlayers: req.body.minPlayers,
        maxPlayers: req.body.maxPlayers,
        playTime: req.body.playTime,
        ageRange: req.body.ageRange,
        publicationYear: req.body.publicationYear,
        acquisitionDate: req.body.acquisitionDate,
        status: req.body.status,
        condition: req.body.condition,
        imageUrl: req.body.imageUrl,
        description: req.body.description,
    })
        .then((game) => {
            res.status(201).json(game);
        })
        .catch(next);
};

module.exports.list = (req, res, next) => {
    Game.find()
       
        .then((games) => {
            res.status(200).json(games);
        })
        .catch(next);
};

module.exports.update = (req, res, next) => {
    Game.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
    })
        .then((game) => {
            if (game) {
                res.status(200).json(game);
            } else {
                next(createError(404, "Game not found"));
            }
        })
        .catch(next);
}

module.exports.delete = (req, res, next) => {
    Game.findByIdAndDelete(req.params.id)
        .then((game) => {
            if (game) {
                res.status(204).json();
            } else {
                next(createError(404, "Game not found"));
            }
        })
        .catch(next);
}

module.exports.detail = (req, res, next) => {
    Game.findById(req.params.id)
        .then((game) => {
            if (game) {
                res.status(200).json(game);
            } else {
                next(createError(404, "Game not found"));
            }
        })
        .catch(next);
}
