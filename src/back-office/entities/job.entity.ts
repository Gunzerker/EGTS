import mongoose, { Schema } from 'mongoose';

export const jobSchema = new mongoose.Schema(
  {
    site_name : {type : String},
    reference : {type : String},
    operateur : {type : String},
    adress : {type : String},
    contact_client : {type : String},
    site_raccorde : {type: Boolean , default : true},
    chambre : {type : String},
    bpe : {type : String},
    four_fo : {type: Boolean , default : true},
    thirty_fo : {type: Boolean , default : true},
    devis_av : {type: Boolean , default : true},
    add_info : {type : String},
    plan : {type : String},
    assignedTo: { type: [Schema.Types.ObjectId], ref: 'User' },
    start_date : {type:Date}
  },
  { timestamps: true },
);

export class Job {
    site_name : string
    reference : string
    operateur : string
    adress : string
    contact_client : string
    site_raccorde : boolean
    chambre : string
    bpe : string
    four_fo : boolean
    thirty_fo : boolean
    devis_av : boolean
    add_info : string
    plan : string
    start_date : Date
}
