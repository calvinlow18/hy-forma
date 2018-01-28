const connectionStringFormat = "mongodb://{{usernameAndPassword}}{{host}}:{{port}}/{{database}}{{authSource}}";

var MongoClient = require("mongodb").MongoClient;

module.exports = function mongo(config) {

    requiredConfig("database");
    requiredConfig("collection");


    var connectionString = generateConnectionString();
    var collectionName = config.collection;
    var databaseName = config.database;
    var logger = config.logger || function () {};

    var wraps = {
        insert: insert,
        update: update,
        delete: del,
        select: select,
    }

    return wraps;



    async function connectDatabase() {
        logger("Create Connection", connectionString);
        var connection = await MongoClient.connect(connectionString);
        logger("Connecting Database");
        var database = await connection.db(databaseName);
        logger("Connection success");
        return database;
    }

    async function insert(data) {
        logger("Inserting");
        var database = await connectDatabase();
        logger("Collection", collectionName);
        var collection = await database.collection(collectionName);
        logger("Insert: ", data);
        var result = await collection.insert(data);
        logger("Insert Result", result);
        database.close();
        return result;
    }

    async function update(query, values) {
        logger("Updating");
        var database = await connectDatabase();
        logger("Collection", collectionName);
        var collection = await database.collection(collectionName);
        logger("Update Query: ", query, "Update Values: ", values);
        var result = await collection.updateMany(query, values);
        logger("Update Result", result);
        database.close();
        return result;
    }

    async function select(query, options) {
        query = query || {};
        options = options || {};
        logger("Selecting");
        var database = await connectDatabase();
        logger("Collection", collectionName);
        var collection = await database.collection(collectionName);
        logger("Select Query: ", query, "Select Options", options);
        var cursor = collection.find(query);
        cursor = applySort(cursor, options);
        cursor = applySkip(cursor, options);
        cursor = applyLimit(cursor, options);
        var result = await cursor.toArray();
        logger("Select Result", result);
        database.close();
        return result;
    }

    async function del(query) {
        logger("Deleting");
        var database = await connectDatabase();
        logger("Collection", collectionName);
        var collection = await database.collection(collectionName);
        logger("Delete Query: ", query);
        var result = await collection.remove(query);
        logger("Delete Result", result);
        database.close();
        return result;
    }

    function generateConnectionString() {
        var username = config.username;
        var password = config.password;
        var host = config.host || "localhost";
        var port = config.port || 27017;
        var database = config.database;
        var authSourceDatabase = config.authSource || "admin";

        var usernameAndPassword = "";
        var authSource = "";
        if (username && password) {

            usernameAndPassword = username + ":" + password + "@";
            authSource = "?authSource=" + authSourceDatabase;
        }
        var connectionString = connectionStringFormat
            .replace("{{usernameAndPassword}}", usernameAndPassword)
            .replace("{{host}}", host)
            .replace("{{port}}", port)
            .replace("{{database}}", database)
            .replace("{{authSource}}", authSource);
        return connectionString;
    }

    function requiredConfig(field) {
        if (!(field in config))
            throw Error("Required: ", field);

    }

}

function applySort(cursor, options) {
    if (!options.sort)
        return cursor;
    return cursor.sort(options.sort);
}

function applySkip(cursor, options) {
    if (options.skip === undefined)
        return cursor;
    return cursor.skip(options.skip);
}

function applyLimit(cursor, options) {
    if (options.limit === undefined)
        return cursor;
    return cursor.limit(options.limit);
}