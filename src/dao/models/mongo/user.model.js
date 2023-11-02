import mongoose from 'mongoose';

const userCollection = 'users';

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: String,
    age: Number,
    password: String,
    rol: {
        type: String,
        default: "usuario",
    },
    // carts: {
    //     type: [{
    //         cart: {
    //             type: mongoose.Schema.Types.ObjectId,
    //             ref: 'carts',
    //         }
    //     }],
    //     default: [],
    // },
});

const userModel = mongoose.model(userCollection, userSchema);

export {
    userModel
};