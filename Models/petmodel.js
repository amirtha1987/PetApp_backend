import mongoose from "mongoose";

const petSchema = mongoose.Schema({
    pet_id: {
        type: String,
        required:true,
    },
   
    special_care_required: {
        type: String,
        required:true,
    },
    
});

export const Pet = mongoose.model('Pet', { petSchema });