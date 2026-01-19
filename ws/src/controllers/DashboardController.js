const { Livro, Categoria, Compra, ItemCompra, Usuario } = require('../models');
const Sequelize = require('sequelize');

module.exports = {
    async list(req,res){
        try{
            const totalUsuarios = await Usuario.count();
            const totalLivros = await Livro.count();
            const totalCompras = await Compra.count();

            const faturamento = await Compra.sum('total', {
                where: { status: 'pago' }
            });

            const comprasPorMes = await Compra.findAll({
                attributes: [
                [Sequelize.fn('strftime', '%Y-%m', Sequelize.col('createdAt')), 'mes'],
                [Sequelize.fn('COUNT', Sequelize.col('id')), 'total']
                ],
                group: ['mes'],
                order: [['mes', 'ASC']]
            });

            const livrosMaisVendidos = await ItemCompra.findAll({
                attributes: [
                'livro_id',
                [Sequelize.fn('COUNT', Sequelize.col('livro_id')), 'total']
                ],
                include: [{ model: Livro, attributes: ['titulo'] }],
                group: ['livro_id'],
                order: [[Sequelize.literal('total'), 'DESC']],
                limit: 5
            });

            res.json({
                totalUsuarios,
                totalLivros,
                totalCompras,
                faturamento: faturamento || 0,
                comprasPorMes,
                livrosMaisVendidos
            });
        }catch(error){
            res.status(404).json({error: "error ao buscar os dados"});
        }
        
    }
}