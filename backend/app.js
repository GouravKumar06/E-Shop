require('dotenv').config();

const express = require('express');
const app = express();

const cors = require('cors');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

//routes
const UserRoutes = require('./routes/UserRoutes');
const ShopRoutes = require('./routes/ShopRoutes');
const ProductRoutes = require('./routes/ProductRoutes');
const EventRoutes = require('./routes/EventRoutes');
const CouponRoutes = require('./routes/CouponRoutes');
const payment = require('./controller/payment');
const orderRoutes = require('./routes/orderRoutes');
const ConversationRoutes = require('./routes/ConversationRoutes');
const messageRoutes = require('./routes/messageRoutes');

app.use(express.json());
app.use(cookieParser());

app.use("/",express.static("uploads"));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));
app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));

//routes
app.use('/api/v2/user',UserRoutes);
app.use("/api/v2/shop",ShopRoutes);
app.use("/api/v2/product",ProductRoutes);
app.use("/api/v2/event",EventRoutes);
app.use("/api/v2/coupon",CouponRoutes);
app.use("/api/v2/payment",payment);
app.use("/api/v2/order",orderRoutes);
app.use("/api/v2/conversation",ConversationRoutes);
app.use("/api/v2/message",messageRoutes);





module.exports = app;
