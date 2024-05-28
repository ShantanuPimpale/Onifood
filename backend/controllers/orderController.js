import orderModel from "../models/OrderModel.js";
import userModel from '../models/userModel.js';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const placeorder = async (req, res) => {
    const frontend_url = "http://localhost:5173";

    try {
        // Create a new order in the database
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        });
        await newOrder.save();

        // Clear the user's cart after saving the order
        await userModel.findByIdAndUpdate(req.body.userId, { cartdata: {} });

        // Prepare line items for Stripe checkout session
        const line_items = req.body.items.map((item) => ({
            price_data: {
                currency: 'inr',
                product_data: {
                    name: item.name
                },
                unit_amount: item.price * 100*80 // Assuming item.price is in INR
            },
            quantity: item.quantity
        }));

        // Add delivery charges as a line item
        line_items.push({
            price_data: {
                currency: "inr",
                product_data: {
                    name: "Delivery Charges"
                },
                unit_amount: 2 * 100*80 // Assuming delivery charges are 2 INR
            },
            quantity: 1
        });

        // Create a Stripe checkout session
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: 'payment',
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        });

        // Send the session URL to the frontend
        res.json({ success: true, session_url: session.url });
    } catch (error) {
        console.error("Error placing order:", error); // Log the error for debugging
        res.json({ success: false, msg: error.message }); // Send a detailed error message
    }
};

const verifyOrder = async(req,res)=>{
    const {orderId,success}=req.body;
    try {
        if(success=="true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true});
            res.json({success:true,msg:"Paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false,msg:"Not Paid"})
        }
    } catch (error) {
        res.json({success:false,msg:"Error"})
        }
    }

    // user orders for frontend
    const userOrders=async(req,res)=>{
        try {
            const orders = await orderModel.find({userId:req.body.userId});
            res.json({success:true,data:orders})
        } catch (error) {
            res.json({success:false,msg:"Error"})
        }
    }

    // Listing orders for Admin panel
    const listOrders = async(req,res)=>{
        try {
            const orders = await orderModel.find({});
            res.json({success:true,data:orders})
        } catch (error) {
            res.json({success:false,msg:"Error"})
        }
    }

    // api for updating order status
    const updateStatus = async(req,res)=>{
        try {
            await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
            res.json({success:true,msg:"Status updated"})
        } catch (error) {
            console.log(error);
            res.json({success:false,msg:"Error"})
        }
    }

export { placeorder,verifyOrder,userOrders,listOrders,updateStatus };
