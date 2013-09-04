/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    async = require('async'),
    Product = mongoose.model('Product'),
    _ = require('underscore');


/**
 * Find product by id
 */
exports.product = function(req, res, next, id) {
    var User = mongoose.model('User');

    Product.load(id, function(err, product) {
        if (err) return next(err);
        if (!product) return next(new Error('Failed to load product ' + id));
        req.product = product;
        next();
    });
};

/**
 * Create a product
 */
exports.create = function(req, res) {
    var product = new Product(req.body);

    product.save();
    res.jsonp(product);
};

/**
 * Update a product
 */
exports.update = function(req, res) {
    var product = req.product;

    product = _.extend(product, req.body);

    product.save(function(err) {
        res.jsonp(product);
    });
};

/**
 * Delete an product
 */
exports.destroy = function(req, res) {
    var product = req.product;

    product.remove(function(err) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(product);
        }
    });
};

/**
 * Show an product
 */
exports.show = function(req, res) {
    res.jsonp(req.product);
};

/**
 * List of Product
 */
exports.all = function(req, res) {

    var lim = req.query.limit||15
        conditions = {};

    // Get conditions. queryString starting with 'q_'
    _.each(req.query, function (val, key) {
        if (key.substr(0,2) === 'q_') {
            conditions[key.replace('q_','')] = new RegExp(val, "ig");
        }
    })

    Product.find(conditions)
    .limit(lim)
    .skip(req.query.page > 1
        ? (req.query.page-1)*lim
        : 0
    )
    .sort((req.query.sortAsc||'') + req.query.sort||'name')

    .populate('user').exec(function(err, products) {

        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            var count = 0;

            // Get count
            Product.count(conditions,function (err, c) {
                count = c;
                res.jsonp({
                    data: products,
                    count: count
                });
            });

        }

    });

};