import mongoose, { Schema } from 'mongoose';

export const adminSchema = new mongoose.Schema(
  {
    login: { type: String },
    email : {type:String },
    password: {type:String},
    phone:{type:String}
  },
  { timestamps: true },
);

export class Admin {
    login:  String
    email : String 
    password: String
    phone:String
}
