

// server is a mock server for testing

const { json } = require("express");

// it loads data from a json file and serves it
class Server {
    constructor(file) {
        this.data = require(file);
    }

    filterById(id){
        return this.data.filter(a => a.id == id);
    }

    filterByName(name) {
        return this.data.filter(a => a.name == name);
    }
}

class ProctorDatabase extends Server{
    constructor(file) {
        super(file);
    }
}

module.exports = {
    Server,
    ProctorDatabase
}