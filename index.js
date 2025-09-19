import express from "express"
import connectDB from "./server/config/db.js"
import dotenv from "dotenv";
import routerUnits from "./server/routes/UnitRoute.js"
import routerAccessories from "./server/routes/AccessoriesRoute.js";
import routerBooking from "./server/routes/BookingRoute.js";
import routerTenant from "./server/routes/TenantRoute.js";
import routerUser from "./server/routes/UserRoute.js";

const app = express()
const port = 3000

// General Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
dotenv.config();

// Connect to MongoDB
connectDB();


// Routes
app.get('/', (req, res) => {res.json('Hello World!')});
app.use('/api/v1/accessories', routerAccessories);
app.use('/api/v1/booking', routerBooking);
app.use('/api/v1/tenant', routerTenant);
app.use('/api/v1/unit', routerUnits);
app.use('/api/v1/user', routerUser);


// Guard routes
app.use((req, res, next) => {
    const error = {
        status: 404,
        message: "Route not found",
    };
    next(error);
});

app.use((error, req, res, next) => {
    // res.status(error.status || 500);
    console.log("ERROR", error);
    res.json({
        error: {
            message: error.message,
            status: error.status,
        },
    });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})