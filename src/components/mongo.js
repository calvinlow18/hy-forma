const connectionStringFormat = "mongodb://{{usernameAndPassword}}{{host}}:{{port}}/{{database}}{{authSource}}";

var MongoClient = require("mongodb").MongoClient;

module.exports = function mongo(config) {

    var connectionString = generateConnectionString();
    var collectionName = config.collection;
    var databaseName = config.database;
    var logger = config.logger || function () {};

    var wraps = {
        insert: insert, // object: insert(data)
        update: update, // object: update(query,values)
        delete: del, // object: delete(query)
        select: select, // [object]: select(query?,options?)
        connect: connect, // object: connect()
        setCollection: setCollection, // void: setCollection(name)
        setDatabase: setDatabase, // void: setDatabase(name)
    }

    return wraps;

    async function connect() {
        var result = {};

        logger("Create Connection", connectionString);
        var session = await MongoClient.connect(connectionString);
        result.session = session;

        if (databaseName) {
            logger("Connecting Database", databaseName);
            var database = await session.db(databaseName);
            result.database = database;
            if (collectionName) {
                logger("Connecting Collection", collectionName);
                var collection = await database.collection(collectionName);
                result.collection = collection;
            }
        }
        return result;
    }

    async function insert(data) {
        logger("Inserting");
        var connection = await connect();
        var collection = await connection.collection;
        if (!collection)
            throw Error("No collection defined");
        logger("Insert: ", data);
        var result = await collection.insert(data);
        logger("Insert Result", result);
        connection.session.close();
        return result;
    }

    async function update(query, values) {
        logger("Updating");
        var connection = await connect();
        var collection = await connection.collection;
        if (!collection)
            throw Error("No collection defined");
        logger("Update Query: ", query, "Update Values: ", values);
        var result = await collection.updateMany(query, values);
        logger("Update Result", result);
        connection.session.close();
        return result;
    }

    async function select(query, options) {
        query = query || {};
        options = options || {};
        logger("Selecting");
        var connection = await connect();
        var collection = await connection.collection;
        if (!collection)
            throw Error("No collection defined");
        logger("Select Query: ", query, "Select Options", options);
        var cursor = collection.find(query);
        cursor = applySort(cursor, options);
        cursor = applySkip(cursor, options);
        cursor = applyLimit(cursor, options);
        var result = await cursor.toArray();
        logger("Select Result", result);
        connection.session.close();
        return result;
    }

    async function del(query) {
        logger("Deleting");
        var connection = await connect();
        var collection = await connection.collection;
        if (!collection)
            throw Error("No collection defined");
        logger("Delete Query: ", query);
        var result = await collection.remove(query);
        logger("Delete Result", result);
        connection.session.close();
        return result;
    }

    function setCollection(collection) {
        collectionName = collection;
    }

    function setDatabase(database) {
        databaseName = database;
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