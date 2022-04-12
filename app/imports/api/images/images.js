import { Mongo } from 'meteor/mongo';
import SimpleSchema from 'simpl-schema';

const Images = new Mongo.Collection('images');

// Deny all client-side updates since we will be using methods to manage this collection
Images.deny({
  insert() {
    return true;
  },
  update() {
    return true;
  },
  remove() {
    return true;
  },
});

Images.schema = new SimpleSchema({
  identification: {
    type: String,
    optional: true,
  },

  datas: {
    type: String,
    optional: true,
  },

  mtype: {
    type: String,
    optional: true,
  },
});

Images.publicFields = {
  identification: 1,
  datas: 1,
  mtype: 1,
};

Images.attachSchema(Images.schema);

export default Images;
