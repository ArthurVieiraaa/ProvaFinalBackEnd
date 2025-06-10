const User = require("../models/user");

class UserController {
    async createUser(req, res) {
        try{
            const users = await listUsers();
            return res.status(200).json(users);
        }
        catch (error) {
            return res.status(400).json({ error: 'Erro ao listar usuários' });
        }
    }

    async listUsers(req, res) {
        try {
            const users = await User.findAll();
            return res.status(200).json(users);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao listar usuários' });
        }
    }

    async findById(req, res) {
        const id = req.params.id;
        try {
            const user = await findUserById(id);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao buscar usuário' });
        }
    }

    async updateUser(req, res) {
        const id = req.params.id;
        const { name, email } = req.body;
        try {
            const user = await updateUser(Number(id), name, email);
            return res.status(200).json(user);
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao atualizar usuário' });
        }
    }

    async deleteUser(req, res) {
        const id = req.params.id;
        try {
            await deleteUser(Number(id));
            return res.status(200).send({ success: true, message: 'Usuário deletado com sucesso' });
        } catch (error) {
            return res.status(400).json({ error: 'Erro ao deletar usuário' });
        }
    }
}

module.exports = new UserController();