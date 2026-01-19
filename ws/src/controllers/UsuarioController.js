const { Usuario } = require('../models');

module.exports = {
    async list(req, res) {
        const usuarios = await Usuario.findAll();
        
        res.json(usuarios);
    }
}