
const server = require('./server.js');

const proctorsServer = new server.ProctorDatabase('./proc.json');

const api = {
    logins: [],

    getProctorByID(id) {
        return proctorsServer.filterById(id);
    },

    loginProctor(name,password) {
        if(!name || !password) return false;
        const proctor = proctorsServer.filterByName(name);
        if (proctor[0].password == password) {
            this.logins.push(name);
            return true;
        }
        return false;
    },

    isLoggedIn(id) {
        return this.logins.includes(id);
    },

    logoutProctor(id) {
        this.logins = this.logins.filter(a => a != id);
    }
};

module.exports = api;