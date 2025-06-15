const User = require("../models/user");

class UserController {
    static async createUser(req, res) {
        try{
            const name = req.body.name;
            const email = req.body.email;
            const password = req.body.password;
            const newUser = await User.create({ name, email, password });
            return res.status(201).json(newUser);
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao criar usuário' });
        }
    }

    static async listUsers(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao listar usuários' });
        }
    }

    static async findById(req, res) {
        const id = req.params.id;
        try {
            const user = await findUserById(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar usuário' });
        }
    }

    static async updateUser(req, res) {
        const id = req.params.id;
        const { name, email } = req.body;
        try {
            const user = await updateUser(Number(id), name, email);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar usuário' });
        }
    }

    static async deleteUser(req, res) {
        const id = req.params.id;
        try {
            await deleteUser(Number(id));
            return res.status(200).send({ success: true, message: 'Usuário deletado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar usuário' });
        }
    }
}

module.exports = UserController;