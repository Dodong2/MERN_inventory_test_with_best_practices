const { DateTime } = require("luxon");
const Sales = require("../models/sales");

// Get yung total sales for today (resets daily)
const getTodaySales = async (req, res) => {
    try {
        const today = DateTime.now().startOf("day").toJSDate();

        const totalSales = await Sales.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);

        res.status(200).json({ totalSales: totalSales[0]?.total || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get yung total sales sa current month (resets after month)
const getMonthlySales = async (req, res) => {
    try {
        const startOfMonth = DateTime.now().startOf("month").toJSDate();

        const totalSales = await Sales.aggregate([
            { $match: { createdAt: { $gte: startOfMonth } } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ]);

        res.status(200).json({ totalSales: totalSales[0]?.total || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get yung Last Month Sales
const getLastMonthSales = async(req, res) => {
    try {
        const now = DateTime.now()
        const startOfLastMonth = now.minus({ months: 1 }).startOf("month").toJSDate()
        const endOfLastMonth = now.minus({ months: 1 }).endOf("month").toJSDate()
        const monthName = now.minus({ months: 1 }).toFormat("MMMM yyyy")

        const totalSales = await Sales.aggregate([
            { $match: { createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth } } },
            { $group: { _id: null, total: { $sum: "$totalAmount" } } }
        ])

        const uniqueCustomers= await Sales.distinct("customerName", {
            createdAt: { $gte: startOfLastMonth, $lte: endOfLastMonth }
        })
        
        const customerCount = uniqueCustomers.length

        res.status(200).json({
            month: monthName, 
            totalSales: totalSales[0]?.total || 0,
            totalCustomers: customerCount
        })
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: "Server error" })
    }
}

//get lahat ng sales at customer per month sales history din ito
// const getMonthlySalesHistory = async(req, res) => {
//     try {
//         const salesHistory = await Sales.aggregate([
//             {
//                 $group: {
//                     _id: {
//                         year: { $year: "$createdAt" },
//                         month: { $month: "$createdAt" }
//                     },
//                     totalSales: { $sum: "$totalAmount" },
//                     totalCustomers: { $addToSet: "$customerName" }
//                 }
//             },
//             { $sort: { "_id.year": -1, "_id.month": -1 } }
//         ])

//         // Format the response to display month names
//         const formattedHistory = salesHistory.map(sale => {
//             const date = DateTime.fromObject({ year: sale._id.year, month: sale._id.month })
//             return {
//                 month: date.toFormat("MMMM yyyy"),
//                 totalSales: sale.totalSales,
//                 totalCustomers: sale.totalCustomers.length
//             }
//         })
//         res.status(200).json(formattedHistory)
//     } catch (err) {
//         console.error(err)
//         res.status(500).json({ message: "Server error" })
//     }
// }

// Get yung sales history
const getSalesHistory = async (req, res) => {
    try {
        const salesHistory = await Sales.find().sort({ createdAt: -1 });
        res.status(200).json({ sales: salesHistory});
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Delete lahat ng sales
const deleteSales = async (req, res) => {
    try {
        await Sales.deleteMany({});
        res.status(200).json({ message: "All sales records deleted" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

//Get all customers (resets daily)
const getAllCustomers = async(req, res) => {
    try {
        const startOfDay = DateTime.now().startOf("day").toJSDate()
        const uniqueCustomer = await Sales.distinct('customerName', {
            createdAt: { $gte: startOfDay }
        })
        const customerCount = uniqueCustomer.length
        res.status(200).json({ customerCount })
    } catch(err) {
        console.error(err)
        res.status(500).json({ message: "Server Error" })
    }
}

//Get all recent product
const getRecentSoldProducts = async(req, res) => {
    try {
        const recentProducts = await Sales.aggregate([
            { $unwind: "$products" }, 
            { $sort: { createdAt: -1 } },
            { $limit: 10 },
            {
                $project: {
                    _id: 0,
                    productName: "$products.productName",
                    quantity: "$products.quantity"
                }
            }
        ])
        res.status(200).json({ recentProducts })
    } catch(err) {
        res.status(500).json({ message: "Server error" })
    }
}

module.exports = { 
    getTodaySales, 
    getMonthlySales, 
    getSalesHistory, 
    deleteSales, 
    getAllCustomers, 
    getRecentSoldProducts, 
    getLastMonthSales
 };
