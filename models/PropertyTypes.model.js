const mongoose = require('../config/db');
const Schema = mongoose.Schema;

const propertyTypesSchema = new Schema({
    title: {
        type: String
    },
    type: {
        type: String,
        required: true,
        enum: ['residential', 'commercial']
    },
    is_active: {
        type: Boolean,
        default: true
    },
    updatedOn: {
        type: Date,
        default: Date.now()
    },
    createdOn: {
        type: Date
    }
},

    {
      collection: "PropertyTypes",
      timestamps: true
    
});

module.exports = mongoose.model('PropertyTypes', propertyTypesSchema);