import mongoose, { Schema } from 'mongoose';

export const userSchema = new mongoose.Schema(
  {
    login: { type: String },
    email : {type:String },
    password: {type:String},
    phone:{type:String},
    active:{type:Boolean , default:true}
  },
  { timestamps: true },
);

export class User {
    _id: String
    login:  String
    email : String 
    password: String
    phone:String
    active : Boolean
}
