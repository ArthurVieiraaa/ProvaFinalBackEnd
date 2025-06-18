const { Sequelize } = require("sequelize");
const Product = require("../models/product");
const Category = require("../models/category");

class ProductController {
  static async createProduct(req, res) {
    try {
      const { name, price, idCategory } = req.body;

      if (!name || !price || !idCategory) {
        return res
          .status(400)
          .json({
            error: "Os campos nome, preço e idCategory são obrigatórios.",
          });
      }

      const newProduct = await Product.create({ name, price, idCategory });
      return res.status(201).json(newProduct);
    } catch (error) {
      console.error(error);

      if (error instanceof Sequelize.ForeignKeyConstraintError) {
        return res.status(400).json({
          error:
            "Erro ao criar produto: A categoria especificada (idCategory) não existe.",
        });
      }

      if (error instanceof Sequelize.ValidationError) {
        const errorMessage = error.errors[0]?.message || "Erro de validação.";
        return res
          .status(400)
          .json({ error: `Erro de validação: ${errorMessage}` });
      }

      return res
        .status(500)
        .json({ error: "Ocorreu um erro inesperado no servidor." });
    }
  }

  static async listProducts(req, res) {
    try {
      const products = await Product.findAll({
        include: [{ model: Category, as: "category" }],
      });
      return res.status(200).json(products);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar produtos" });
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    try {
      const product = await Product.findByPk(id, {
        include: [{ model: Category, as: "category" }],
      });

      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao buscar produto" });
    }
  }

  static async updateProduct(req, res) {
    const { id } = req.params;
    const { name, price, idCategory } = req.body;

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }

      await product.update({ name, price, idCategory });
      return res.status(200).json(product);
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao atualizar produto" });
    }
  }

  static async deleteProduct(req, res) {
    const { id } = req.params;

    try {
      const product = await Product.findByPk(id);
      if (!product) {
        return res.status(404).json({ error: "Produto não encontrado" });
      }
      await product.destroy();
      return res
        .status(200)
        .json({ success: true, message: "Produto deletado com sucesso" });
    } catch (error) {
      console.error(error);
      return res.status(400).json({ error: "Erro ao deletar produto" });
    }
  }
}

module.exports = ProductController;
