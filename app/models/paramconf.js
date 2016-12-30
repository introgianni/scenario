var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var paramConfSchema = new Schema({
    cod: {
        type: String,
        required: true,
        unique: true
    },
   des: {
        type: String,
        required: true
    },
    attinenza: {
        type: String
    },
    default: {
        type: String
    },
    created_at: Date,
    updated_at: Date
});

paramConfSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

paramConfSchema.pre('update', function(next) {
    this.update({}, {
        $set: {
            updatedAt: new Date()
        }
    });
    next();
});

// the schema is useless so far
// we need to create a model using it
var Paramconf = mongoose.model('Paramconf', paramConfSchema, 'paramconfs');

// make this available to our users in our Node applications
module.exports = Paramconf;
