var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//////////ATENEO SCHEMA ISTANCE////////////
var ateneoSchema = new Schema({
    cod: {
        type: String,
        required: true,
        unique: true
    },
    des: {
        type: String,
        required: true
    },
    scenario_on: Boolean,
    tipiCorso: [{
        type: Schema.Types.ObjectId,
        ref: 'Tipocorso',
        index: true
    }],
    dipartimenti: [{
        dipCod: {
            type: String
        },
        dipDes: {
            type: String
        }
    }],
    parConfs: [{
        param: {
            type: Schema.Types.ObjectId,
            ref: 'Paramconf'
        },
        val: String
    }],
    created_at: Date,
    updated_at: Date
});


ateneoSchema.pre('save', function(next) {
    now = new Date();
    this.updated_at = now;
    if (!this.created_at) {
        this.created_at = now;
    }
    next();
});

ateneoSchema.pre('update', function(next) {
    this.update({}, {
        $set: {
            updatedAt: new Date()
        }
    });
    next();
});

ateneoSchema.methods.getCodDes = function() {
    // add some stuff to the users name
    this.name = this.cod + ' - ' + this.des;
    return this.name;
};

////////MODEL COSTRUCTOR FROM SCHEMA INSTANCE////////////
var Ateneo = mongoose.model('Ateneo', ateneoSchema, 'atenei');


// make this available to our users in our Node applications
module.exports = Ateneo;
