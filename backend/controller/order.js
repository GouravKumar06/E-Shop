const Order = require("../model/order");
const Product = require("../model/product");
const Shop = require("../model/shop");


exports.createOrder = async (req, res) => {
    try{
        const {cart,shippingAddress,user,totalPrice,paymentInfo} = req.body;
        
        console.log("cart:  ",cart)
        console.log("shippingAddress:  ",shippingAddress)
        console.log("user:  ",user)
        console.log("totalPrice:  ",totalPrice)
        console.log("paymentInfo:  ",paymentInfo)
        // group cart items by shopId
        const shopItemsMap = new Map();

        for(const item of cart)
        {
            const shopId = item.shopId;
            if(!shopItemsMap.has(shopId))
            {
                shopItemsMap.set(shopId,[]);
            }
            shopItemsMap.get(shopId).push(item);
        }
        
        // create order for each shop
        const orders = [];
        for(const [shopId,items] of shopItemsMap)
        {
            const order = await Order.create({
                cart: items,
                shippingAddress,
                user,
                totalPrice,
                paymentInfo,
            });

            console.log("order:   ",order)
            orders.push(order);
        };

        return res.status(200).json({
            success: true,
            message: "Order created successfully",
            orders,
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while creating order"
        })
    }
}


//get all orders of user
exports.getAllOrdersUser = async (req,res) => {
    try{
        const orders = await Order.find({ "user._id":req.params.userId }).sort({
            createdAt: -1
        });

        
        return res.status(200).json({
            success: true,
            orders
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting all orders of user"
        })
    }
}


//get all orders of shop
exports.getAllOrdersShop = async (req,res) => {
    try{
        const orders = await Order.find({"cart.shopId":req.params.shopId}).sort({
            createdAt: -1
        });
        
        return res.status(200).json({
            success: true,
            orders
        })
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while getting all orders of shop"
        })
    }
}


//udpate order status for seller
exports.updateOrderStatus = async (req,res) => {
    try{
        const order = await Order.findById(req.params.id);

        if(!order)
        {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            })
        }

        console.log("req.body.status:  ",req.body.status)

        if(req.body.status === "Transferred to delivery partner")
        {
          
            order.cart.forEach(async (item) => {
                await updateProduct(item._id, item.qty);
            })
         
        }

        order.status = req.body.status;

        if(req.body.status === "Delivered")
        {
            order.deliveredAt = Date.now();
            order.paymentInfo.status = "Succeeded";
            // const serviceCharge = order.totalPrice * 0.10;
            // await updateSellerInfo(order.totalPrice - serviceCharge);
        }

        await order.save({validateBeforeSave: false});

        async function updateProduct(id, qty)
        {
            console.log("qty:  ",qty)
            const product = await Product.findById(id);
            product.stock = product.stock - qty;
            product.sold_out = product.sold_out + qty;

            await product.save({validateBeforeSave: false});
        }

        return res.status(200).json({
            success: true,
            order
        })

     

        // async function updateSellerInfo(amount)
        // {
        //     const shop = await Shop.findById(req.shopId);
        //     shop.availableBalance = amount;
        //     await shop.save();
        // }
    }
    catch(error)
    {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: "Error while updating order status"
        })
    }
}

