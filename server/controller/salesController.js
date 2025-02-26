const { DateTime } = require("luxon");
const Sales = require("../models/sales");

// Get yung total sales for today
const getTodaySales = async (req, res) => {
    try {
        const today = DateTime.now().startOf("day").toJSDate();

        const totalSales = await Sales.aggregate([
            { $match: { createdAt: { $gte: today } } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        res.status(200).json({ totalSales: totalSales[0]?.total || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

// Get yung total sales sa current month
const getMonthlySales = async (req, res) => {
    try {
        const startOfMonth = DateTime.now().startOf("month").toJSDate();

        const totalSales = await Sales.aggregate([
            { $match: { createdAt: { $gte: startOfMonth } } },
            { $group: { _id: null, total: { $sum: "$totalPrice" } } }
        ]);

        res.status(200).json({ totalSales: totalSales[0]?.total || 0 });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server Error" });
    }
};

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

module.exports = { getTodaySales, getMonthlySales, getSalesHistory, deleteSales };
