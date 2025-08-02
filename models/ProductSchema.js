const { Schema, default: mongoose } = require("mongoose");

const ProductSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        default: 1,
    },
    image: {
        type: String,
        default: "", // optional field
    },
}, { timestamps: true });

module.exports = mongoose.model("product", ProductSchema);
