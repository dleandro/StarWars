'use strict'

const
axios = require('axios')


module.exports = {
    
    get: async (url) => {

        try {
            const res = await axios.get(url)
    
            return res.data
            
        } catch (error) {
            console.log(error)
            throw error
        }
    }
}