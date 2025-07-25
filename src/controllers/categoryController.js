const Category = require("../models/category");

class CategoryController {
  static async createCategory(req, res) {
    try {
      const name = req.body.name;
      const category = await Category.create({ name });
      return res.status(201).json(category);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Erro ao criar categoria" });
    }
  }

  static async listCategory(req, res) {
  try {
    const categories = await Category.findAll();
    return res.status(200).json(categories);
  } catch (error) {
    return res.status(400).json({ error: "Erro ao listar categorias" });
  }
}

  static async findById(req, res) {
    const { id } = req.params;

    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar categoria" });
    }
  }

  static async updateCategory(req, res) {
    const { id } = req.params;

    const { name } = req.body;

    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      category.name = name;
      await category.save();
      return res.status(200).json(category);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao atualizar categoria" });
    }
  }

  static async deleteCategory(req, res) {
    const { id } = req.params;

    try {
      const category = await Category.findByPk(id);
      if (!category) {
        return res.status(404).json({ error: "Categoria não encontrada" });
      }
      await category.destroy();
      return res.status(200).send({ success: true, message: "Categoria deletada com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar categoria" });
    }
  }
}

module.exports = CategoryController;
