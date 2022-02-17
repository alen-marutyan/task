const {Car} = require("../models/models");


class CarControllers{
    async getAll(req,res){
        try {
            let cars = await Car.findAll({where: {userId: req.user.id}});
            res.json({info: cars});
        }catch (e) {
            res.json({error: e.message});
        }
    }

    async createCar(req,res){
        try {
            const {model, make, license_place, year} = req.body;
            let car = await Car.create({model, make, license_place, year, userId: req.user.id},);

            res.json({info: car})
        }catch (e) {
            res.json({error: e.message});
        }
    }

    async editCar(req,res){
        try {
            let carId = req.params.id
            const editInfoCar = req.body;
            await Car.findOne({where: {id: carId}}).then(car=>{
                car.update(editInfoCar).then(data=>{
                    res.json({info: data});
                });
            });
        }catch (e) {
            res.json({error: e.message});
        }
    }

    async deleteCar(req,res){
        try {
            let carId = req.params.id;

            await Car.destroy({where: {id: carId}}).then(()=>{
                res.send('Deleted Car')
            })
        }catch (e) {
            res.json({error: e.message});
        }
    }
}

module.exports = new CarControllers();