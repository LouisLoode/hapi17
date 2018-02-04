'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dogModel = new Schema({
  name: { type: String, required: true, index: { unique: true } },
  breed: { type: String, required: true },
  age: { type: String, required: true },
  image: { type: String, required: true }
});


dogModel.options.toJSON = {
  transform(doc, ret) {
    ret.id = ret._id
    delete ret._id
    delete ret.__v
  }
}

module.exports = mongoose.model('Dog', dogModel, 'dogs'); 