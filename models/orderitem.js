const mongoose = require("mongoose");

const orderitemSchema = mongoose.Schema({
    quantity: {
        type: Number,
        required: true
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }
})

exports.orderitem = mongoose.model("orderitem", orderitemSchema);