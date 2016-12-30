var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tipocorsoSchema = new Schema({
    cod: { type: String, required: true, unique: true },
    des: { type: String, required: true },
    desEng: String,
    flgAteIta: Boolean,
    created_at: Date,
    updated_at: Date
});


tipocorsoSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

tipocorsoSchema.pre('update', function() {
    this.update({}, { $set: { updatedAt: new Date() } });
    next();
});


var Tipocorso = mongoose.model('Tipocorso', tipocorsoSchema, 'tipicorso');


// make this available to our users in our Node applications
module.exports = Tipocorso;
