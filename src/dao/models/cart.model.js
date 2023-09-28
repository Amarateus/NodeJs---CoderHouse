import mongoose from 'mongoose';

const cartCollection = 'carts';

const cartSchema = new mongoose.Schema({
    products: {
        type: [{
            product: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'products',
            },
            quantity: Number,
        }, ],
        default: [],
    },
    // products: {
    //     type: Array,
    //     required: true,
    //     default: []
    // }
});

const cartModel = mongoose.model(cartCollection, cartSchema);

export {
    cartModel
};