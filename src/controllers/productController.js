const { Product, Category } = require('../models/product');

class ProductController {
    async createProduct(req, res) {
        const name = req.body.name;
        const price = req.body.price;
        const categoryId = req.body.categoryId;
        try {
            const product = await Product.create({ name, price, categoryId });
            return res.status(201).json({ success: true, message: 'Produto criado com sucesso', product });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar produto' });
        }
    }

    async listProducts(req, res) {
        try {
            const products = await listProducts({
                include: [{ model: Category, as: 'category' }]
            });
            return res.status(200).json(products);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao listar produtos' });
        }
    }

    async findById(req, res) {
        const id = req.params.id;
        try {
            const product = await findById()
            return res.status(200).json(product);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar produto' });
        }
    }

    async updateProduct(req, res) {
        const id = req.params.id;
        const { name, price, categoryId } = req.body;
        try {
            const product = await updateProduct(Number(id), name, price, categoryId);
            return res.status(200).send(product);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar produto' });
        }
    }

    async deleteProduct(req, res) {
        const id = req.params.id;
        try {
            await deleteProduct(Number(id));
            return res.status(200).send({ success: true, message: 'Produto deletado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar produto' });
        }
    }
}

module.exports = new ProductController();