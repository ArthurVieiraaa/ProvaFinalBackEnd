// No topo do arquivo, importe o Sequelize para acessar os tipos de erro
const { Sequelize } = require('sequelize'); 
const Product = require('../models/product');
const Category = require('../models/category');

class ProductController {
    static async createProduct(req, res) {
        try {
            const { name, price, idCategory } = req.body;

            // Verificação básica de entrada
            if (!name || !price || !idCategory) {
                return res.status(400).json({ error: 'Os campos nome, preço e idCategory são obrigatórios.' });
            }

            const newProduct = await Product.create({ name, price, idCategory });
            return res.status(201).json(newProduct);

        } catch (error) {
            console.error(error); // Continue logando o erro completo no console

            // Verifica se o erro é de chave estrangeira
            if (error instanceof Sequelize.ForeignKeyConstraintError) {
                return res.status(400).json({ 
                    error: 'Erro ao criar produto: A categoria especificada (idCategory) não existe.' 
                });
            }
            
            // Verifica se o erro é de validação (ex: campo não nulo)
            if (error instanceof Sequelize.ValidationError) {
                 // Pega a primeira mensagem de erro da validação para ser mais específico
                const errorMessage = error.errors[0]?.message || 'Erro de validação.';
                return res.status(400).json({ error: `Erro de validação: ${errorMessage}` });
            }

            // Para todos os outros tipos de erro
            return res.status(500).json({ error: 'Ocorreu um erro inesperado no servidor.' });
        }
    }

    // Mantenha as outras funções como estão, mas o `include` já deve funcionar
    static async listProducts(req, res) {
        try {
            const products = await Product.findAll({
                include: [{ model: Category, as: 'category' }]
            });
            return res.status(200).json(products);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: 'Erro ao listar produtos' });
        }
    }

static async findById(req, res) {
    // ...
    try {
        const product = await Product.findByPk(id, {
            // Ajuste aqui também
            include: [{ model: Category, as: 'category' }]
        });
        // ...
    } catch (error) {
        // ...
    }
}

    static async updateProduct(req, res) {
        const { id } = req.params;
        const { name, price, idCategory } = req.body;

        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }

            await product.update({ name, price, idCategory });
            return res.status(200).json(product);
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao atualizar produto' });
        }
    }

    static async deleteProduct(req, res) {
        const { id } = req.params;

        try {
            const product = await Product.findByPk(id);
            if (!product) {
                return res.status(404).json({ error: 'Produto não encontrado' });
            }
            await product.destroy();
            return res.status(200).json({ success: true, message: 'Produto deletado com sucesso' });
        } catch (error) {
            console.error(error);
            return res.status(400).json({ error: 'Erro ao deletar produto' });
        }
    }
}

module.exports = ProductController;
