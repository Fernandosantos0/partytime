const { Service: serviceModel } = require('../models/Service');

const serviceController = {
    /* Método para adicionar novos serviços */
    create: async(req, res) => {
        try {
            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            };

            const response = await serviceModel.create(service);
            res.status(201).json({ response, msg: 'Serviços criado com sucesso' });
        } catch(error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível cadastrar o serviço',
            });
        }
    },

    /* Resgate de todos os dados */
    getAll: async(req, res) => {
        try {
            const services = await serviceModel.find();
            res.status(200).json(services);
        } catch(error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível resgatar os serviços',
            });
        }
    },

    /* Método para resgate de dados individual */
    get: async(req, res) => {
        try {
            const { id } = req.params;

            const service = await serviceModel.findById(id);

            if(!service) {
                res.status(400).json({
                    msg: 'Serviço não encontrado',
                });
                return;
            }

            res.status(200).json(service);
        } catch(error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível resgatar o serviço',
            });
        }
    },

    /* Método para deletar os dados */
    delete: async(req, res) => {
        try {
            const { id } = req.params;

            const service = await serviceModel.findById(id);

            if(!service) {
                res.status(400).json({
                    msg: 'Serviço não encontrado',
                });
                return;
            }

            /* Removendo o dado */
            const deletedService = await serviceModel.findByIdAndDelete(id);

            res.status(200).json({
                deletedService,
                msg: 'Serviço excluído com sucesso',
            });
        } catch(error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível remover o serviço',
            });
        }
    },

    /* Método para atualizar os dados */
    update: async(req, res) => {
        try {
            const { id } = req.params;

            const service = {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                image: req.body.image,
            };

            /* Atualizando o dado */
            const updatedService = await serviceModel.findByIdAndUpdate(id, service, { new: true });

            if(!updatedService) {
                res.status(400).json({
                    msg: 'Serviço não encontrado',
                });
                return;
            }

            res.status(200).json({
                updatedService,
                msg: 'Serviço atualizado com sucesso',
            });
        } catch(error) {
            console.error(error);
            res.status(404).json({
                msg: 'Não foi possível atualizar o serviço',
            });
        }
    },
};

module.exports = serviceController;
