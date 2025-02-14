const accountModel = require('../models/account.model')

module.exports = {

    renderChat: async (req, res) => { 
        return res.render('chat.ejs')

    }
}