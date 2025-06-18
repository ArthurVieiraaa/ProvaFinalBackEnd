const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

class UserController {
  static async createUser(req, res) {
    try {
      const name = req.body.name;
      const email = req.body.email;
      const password = req.body.password;
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
      });
      return res.status(201).json(newUser);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao criar usuário" });
    }
  }

  static async listUsers(req, res) {
    try {
      const users = await User.findAll();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao listar usuários" });
    }
  }

  static async findById(req, res) {
    const { id } = req.params;
    const user = await User.findByPk(id);
    try {
      return res.status(200).json(user);
    } catch (error) {
      return res.status(400).json({ error: "Erro ao buscar usuário" });
    }
  }

  static async updateUser(req, res) {
    const { id } = req.params;
    const { name, email } = req.body;
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      user.name = name;
      user.email = email;

      await user.save();

      return res.status(200).json(user);
    } catch (error) {
      console.error("Erro ao atualizar usuário:", error);
      return res.status(400).json({ error: "Erro ao atualizar usuário" });
    }
  }
  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const user = await User.findByPk(id);

      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }

      await user.destroy();
      return res
        .status(200)
        .send({ success: true, message: "Usuário deletado com sucesso" });
    } catch (error) {
      return res.status(400).json({ error: "Erro ao deletar usuário" });
    }
  }

  static async login(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Senha inválida" });
      }
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "1h",
      });
      return res.status(200).json({ token });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      return res.status(500).json({ error: "Erro ao fazer login" });
    }
  }
}

module.exports = UserController;
