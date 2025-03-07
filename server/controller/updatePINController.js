
const updatePin = async (req, res) => {
    const { pin } = req.body
    const correctPin = process.env.PIN_PASS || 1234

    if(pin === correctPin) {
        res.status(200).json({ success: true, message: 'PIN is valid' })
    } else {
        res.status(401).json({ success: false, message: 'Inavlid PIN' })
    }
}

module.exports = { updatePin }