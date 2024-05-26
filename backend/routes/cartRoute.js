import express from 'express'
import { addToCart,removeFromCart,getUsercart } from '../controllers/cart-controller.js'
import authMiddleeare from '../middleware/auth.js';


const cartRouter = express.Router();

cartRouter.post("/add",authMiddleeare,addToCart);
cartRouter.post("/remove",authMiddleeare,removeFromCart);
cartRouter.post("/get",authMiddleeare,getUsercart);

export default cartRouter;