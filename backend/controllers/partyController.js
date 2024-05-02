const PartyModel = require('../models/Party');

const checkPartyBudget = function(budget, services) {
    const priceSun = services.reduce((sun, service) => sun + service.price, 0);

    if(priceSun > budget) {
        return false;
    }

    return true;
};

const PartyController = {
    /* Método para adicionar novas festas */
    create: async(req, res) => {
        try {
            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            /* Validação para verificar se o budget for maior que o valor de serviço */
            if(party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({
                    msg: 'O seu orçamento é insuficiente',
                });
                return;
            }

            const response = await PartyModel.create(party);

            res.status(201).json({
                response,
                msg: 'Festa crianda com sucesso',
            });
        } catch(error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível cadastrar a festa',
            });
        }
    },

    /* Resgate de todos os dados */
    getAll: async (req, res) => {
        try {
            const parties = await PartyModel.find();

            res.status(200).json(parties);
        } catch(error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível resgatar as festas',
            });
        }
    },

    /* Método para resgate de dados individual */
    get: async(req, res) => {
        try {
            const { id } = req.params;

            const party = await PartyModel.findById(id);

            if(!party) {
                res.status(400).json({
                    msg: 'Festa não encontrado',
                });
                return;
            }

            res.status(200).json(party);
        } catch(error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível resgatar a festa',
            });
        }
    },

    /* Método para deletar os dados */
    delete: async(req, res) => {
        try {
            const { id } = req.params;

            const party = await PartyModel.findById(id);

            if(!party) {
                res.status(400).json({
                    msg: 'Festa não encontrado',
                });
                return;
            }

            const deletedParty = await PartyModel.findByIdAndDelete(id);

            res.status(200).json({
                deletedParty,
                msg: 'Festa excluída com sucesso',
            });
        } catch (error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível remover a festa',
            });
        }
    },

    /* Método para atualizar os dados */
    update: async(req, res) => {
        try {
            const { id } = req.params;

            const party = {
                title: req.body.title,
                author: req.body.author,
                description: req.body.description,
                budget: req.body.budget,
                image: req.body.image,
                services: req.body.services,
            };

            /* Validação para verificar se o budget for maior que o valor de serviço */
            if(party.services && !checkPartyBudget(party.budget, party.services)) {
                res.status(406).json({
                    msg: 'O seu orçamento é insuficiente',
                });
                return;
            }

            const updatedParty = await PartyModel.findByIdAndUpdate(id, party, { new: true });

            if(!updatedParty) {
                res.status(400).json({
                    msg: 'Festa não encontrado',
                });
                return;
            }

            res.status(200).json({
                updatedParty,
                msg: 'Festa atualizada com sucesso',
            });
        } catch (error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível remover a festa',
            });
        }
    },
};

module.exports = PartyController;
