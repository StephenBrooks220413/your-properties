const Listing = require('../models/Listing')

module.exports = async (req, res) => {
    const listing = await Listing.findById(req.params.id)
    res.render('listing', {
        listing
    })
}