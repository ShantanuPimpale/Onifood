import userModel from '../models/userModel.js'

const addToCart = async (req, res) => {
    try {
        const { userId, itemId } = req.body;

        // Find the user by ID
        let userData = await userModel.findById(req.body.userId);

        // Initialize cartdata if it's undefined
        let cartdata = userData.cartdata;

        if (!cartdata[itemId]) {
            cartdata[itemId] = 1;
        } else {
            cartdata[itemId] += 1;
        }

        // Using findByIdAndUpdate to update the user data
        await userModel.findByIdAndUpdate(
            userId,
            { cartdata },
            { new: true } // Option to return the updated document
        );

        res.json({ success: true, msg: "Added to cart" });
    } catch (error) {

        res.json({ success: false, msg: "Error adding to cart" });
    }
};

const removeFromCart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartdata = userData.cartdata;
        if (cartdata[req.body.itemId] > 0) {
            cartdata[req.body.itemId] -= 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, { cartdata });
        res.json({ success: true, msg: "removed from cart" });
    } catch (error) {
        res.json({ success: false, msg: "Error removing in cart" });
    }
}

const getUsercart = async (req, res) => {
    try {
        let userData = await userModel.findById(req.body.userId);
        let cartdata = userData.cartdata;
        res.json({ success: true, cartdata });
    } catch (error) {
        res.json({ success: false, msg: "Error in getting cartdata" });
    }
}

export { addToCart, removeFromCart, getUsercart };