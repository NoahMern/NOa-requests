

const dormModel = require('../model/dorm.model.js');

class DormController {
    static async getDorms(req, res) {
        const dorms = await dormModel.getAllDorms();
        res.render('dorms', { dorms });
    }

    static async getDormByDormNumber(req, res) {
        const num = parseInt(req.params.dormNumber);
        if(num) {
            const dorm = await dormModel.getDormByDormNumber(num);
            res.render('dorm', { dorm });
            return;
        }
        res.render('dorm', { dorm: null });
    }

    static async insertDorm(req, res) {
        const dorm = dormModel.fromObject(req.body);
        console.log(dorm);
        if (!dorm.validate()) {
            console.log('invalid dorm', dorm);
            res.render('new_dorm', { error: 'Invalid dorm' });
            return;
        }
        try {
            await dormModel.insertDorm(dorm);
            res.redirect('/dorms');
        }catch(e) {
            res.render('new_dorm', { error: 'Error inserting dorm' });
        }
    }

    static async editDorm(req, res) {
        const dorm = dormModel.fromObject(req.body);
        //a copy of dorm
        const dorm2 = dormModel.fromObject(req.body);
        dorm2.dorm_number = dorm2.dormNumber;
        dorm2.num_students = dorm2.numStudents;
        dorm2.dtable = dorm2.table;
        if (!dorm.validate()) {
            res.render('edit_dorm', {dorm: dorm2, error: 'Invalid dorm' });
            return;
        }
        try {
            await dormModel.updateDorm(dorm);
            res.redirect('/dorms');
        }catch(e) {
            res.render('edit_dorm', {dorm: dorm2, error: 'Error updating dorm' });
        }
    }

    static async editDormPage(req, res) {
        const num = parseInt(req.params.dormNumber);
        if(num) {
            const dorm = await dormModel.getDormByDormNumber(num);
            res.render('edit_dorm', { dorm });
            return;
        }
        res.render('edit_dorm', { dorm: null });
    }
}

module.exports = DormController;