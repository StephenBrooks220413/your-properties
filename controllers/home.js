const Listing = require('../models/Listing')

module.exports = async (req, res) => {
    const listings = await Listing.find({}).limit(4).sort({_id: -1})
    console.log(req.session)
    res.render('index', {
        listings
    })
}