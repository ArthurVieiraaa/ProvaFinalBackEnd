const Category = require('../models/category');

class CategoryController {
    async createCategory(req, res) {
        const name = req.body.name;
        try {
            const category = await createCategory(name);
            return res.status(201).send({ success: true, message: 'Categoria criada com sucesso', category });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao criar categoria' });
        }
    }

    async listCategory(req, res) {
        try {
            const categories = await Category.findAll();
            return res.status(200).json(categories);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao listar categorias' });
        }
    }

    async findById(req, res) {
        const id = req.params.id;
        try {
            const category = await findById(id);
            return res.status(200).json(category);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar categoria' });
        }
    }

    async updateCategory(req, res) {
        const id = req.params;
        const { name } = req.body;
        try {
            const category = await updateCategory(Number(id), name);
            return res.status(200).json(category);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar categoria' });
        }
    }

    async deleteCategory(req, res) {
        const id = req.params.id;
        try {
            await deleteCategory(Number(id));
            return res.status(200).send({ success: true, message: 'Categoria deletada com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar categoria' });
        }
    }    
}

module.exports = new CategoryController();