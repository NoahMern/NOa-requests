
const db = require('./db.js');

class Dorm {
    dormNumber;
    block;
    locker;
    bed;
    table;
    chair;
    mattress;
    numStudents;

    #normalized;

    constructor(dormNumber, block, locker, bed, table, chair, mattress, numStudents) {
        this.dormNumber = dormNumber;
        this.block = block;
        this.locker = locker;
        this.bed = bed;
        this.table = table;
        this.chair = chair;
        this.mattress = mattress;
        this.numStudents = numStudents;
        this.#normalized = false;
    }

    static fromObject(obj) {
       return new Dorm(obj.dormNumber, obj.block, obj.locker, obj.bed, obj.table, obj.chair, obj.mattress, obj.numStudents);
    }

    normalize() {
        this.block = this.block.trim();
        this.locker = parseInt(this.locker);
        this.bed = parseInt(this.bed);
        this.table = parseInt(this.table);
        this.chair = parseInt(this.chair);
        this.mattress = parseInt(this.mattress);
        this.numStudents = parseInt(this.numStudents);
        this.dormNumber = parseInt(this.dormNumber);
        this.#normalized = true; 
    }
        

    validate() {
        if (!this.#normalized) {
            this.normalize();
        }
        const validateInts = (a) =>  Number.isInteger(a) && a >= 0;
        if (!validateInts(this.dormNumber) || !validateInts(this.locker) || !validateInts(this.bed) || !validateInts(this.table) || !validateInts(this.chair) || !validateInts(this.mattress) || !validateInts(this.numStudents)) {
            return false;
        }
        if (this.block === null || this.block === undefined || this.block === '') {
            return false;
        }
        return true;
    }

    static async getAllDorms() {
        const query = 'SELECT dorm_number,block,num_students FROM dorm';
        const result = await db.query(query);
        return result.rows;
    }


    static async getDormByDormNumber(dormNumber) {
        const query = 'SELECT * FROM dorm WHERE dorm_number = $1';
        const result = await db.query(query, [dormNumber]);
        return result.rows[0];
    }

    static async insertDorm(dorm) {
        const query = 'INSERT INTO dorm (dorm_number, block, locker, bed, dtable, chair, mattress, num_students) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';
        const result = await db.query(query, [dorm.dormNumber, dorm.block, dorm.locker, dorm.bed, dorm.table, dorm.chair, dorm.mattress, dorm.numStudents]);
        return result;
    }

    static async updateDorm(dorm) {
        const query = 'UPDATE dorm SET block = $1, locker = $2, bed = $3, dtable = $4, chair = $5, mattress = $6, num_students = $7 WHERE dorm_number = $8';
        const result = await db.query(query, [dorm.block, dorm.locker, dorm.bed, dorm.table, dorm.chair, dorm.mattress, dorm.numStudents, dorm.dormNumber]);
        return result;
    }
}

module.exports = Dorm;