import foodModel from "../models/food-model.js";
import fs from 'fs';

//add food item

const addFood =async (req,res)=>{
    let image_filename = `${req.file.filename}`;

    const food = new foodModel({
        name:req.body.name,
        price:req.body.price,
        description:req.body.description,
        category:req.body.category,
        image:image_filename
    });
    try{
        await food.save();
        res.status(200).json({success:true,message:"Food added successfully"});
    }catch(error){
        res.status(500).json({success:false,message:error.message});
    }
    
}

// all food list
const listFood =async (req,res)=>{
    try {
        const foods = await foodModel.find({});
        res.status(200).json({success:true,data:foods});
    } catch (error) {
        res.status(500).json({success:false,message:error.message});
    }
}
//remove food
const removeFood = async(req,res)=>{   
try {
        const food = await foodModel.findById(req.body.id);
        if (!food) {
            return res.status(404).json({ success: false, message: "Food item not found" });
        }

        const filePath = `uploads/${food.image}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Error deleting file at ${filePath}:`, err.message);
            }
        });

        await foodModel.findByIdAndDelete(req.body.id);
        res.status(200).json({ success: true, message: "Food deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

export {addFood,listFood,removeFood};