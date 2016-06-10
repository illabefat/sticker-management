var pg = require('pg');
pg.defaults.ssl = true;

var defaultDBUrl = "postgres://paxgltoogcxcpn:YdBlG7gqVzoF7imEimZ63Mi5yb@ec2-54-247-185-241.eu-west-1.compute.amazonaws.com:5432/dcddvbcpmqnj7p";

module.exports = function () {
    return {
        getPacksByUser: function(userId) {

            var dbUrl = process.env.DATABASE_URL || defaultDBUrl;

            var result = [];
            pg.connect(dbUrl, function(err, client) {
                if (err) throw err;
                console.log('Connected to postgres! Getting schemas...');

                client
                    .query("SELECT stickers.packid, stickers.url\n" +
                        "FROM hipchat_users, stickers, users_packs\n" +
                        "WHERE\n" +
                        "hipchat_users.userid = '" + userId + "' and\n" +
                        "hipchat_users.id = users_packs.userid and\n" +
                        "stickers.packid = users_packs.packid\n" +
                        "ORDER BY stickers.packid asc;")
                    .on('row', function(row) {
                        console.log(JSON.stringify(row));
                        result.push(JSON.stringify(row));
                    });
            });
            return result;
        },
        addPackToUser: function(userId, packId) {

        }
    }
};