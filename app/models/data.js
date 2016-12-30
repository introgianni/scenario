var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var dataSchema = new Schema({
    ateCod: {
        type: String,
        required: true
    },
    strCod: {
        type: String,
        required: true
    },
    anno: {
        type: String,
        required: true
    },
    tipoCorsoCod: {
        type: String,
        required: true
    },
    data: {
        data: Buffer,
        contentType: String
    },
    rawJson: {
        type: String
    },
    created_at: Date,
    updated_at: Date
});

dataSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

dataSchema.pre('update', function(next) {
    this.update({}, {
        $set: {
            updatedAt: new Date()
        }
    });
    next();
});

// the schema is useless so far
// we need to create a model using it
var Data = mongoose.model('Data', dataSchema, 'data');

// make this available to our users in our Node applications
module.exports = Data;
