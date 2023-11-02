import mongoose from 'mongoose';

const messageCollection = 'messages';

const messageSchema = new mongoose.Schema({
    user: {
        type: String, //correo del usuario
        required: true,
    },
    message: {
        type: String,
        require: true
    }
});

const messageModel = mongoose.model(messageCollection, messageSchema);

export {
    messageModel
};