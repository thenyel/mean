/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    env = process.env.NODE_ENV || 'development',
    config = require('../../config/config')[env],
    Schema = mongoose.Schema;


/**
 * Product Schema
 */
var ProductSchema = new Schema({
    productCode: {
        type: Number,
        default: 1
    },
    name: {
        type: String,
        default: '',
        trim: true
    },
    category: {
        type: String,
        default: '',
        trim: true
    },
    price: {
        type: String,
        default: '',
        trim: true
    }
});

/**
 * Statics
 */
ProductSchema.statics = {
    load: function(id, cb) {
        this.findOne({
            _id: id
        }).populate('user').exec(cb);
    }
};

mongoose.model('Product', ProductSchema);