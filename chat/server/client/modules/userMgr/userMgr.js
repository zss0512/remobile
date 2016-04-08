module.exports = define(function(require) {
    function UserMgr() {
        this.reset();
    }

    UserMgr.prototype.reset = function() {
        this.users = {};
        this.init = false;
    };
    UserMgr.prototype.add = function(obj) {
        var users = this.users;
        var userid = obj.userid;
        if(!users.hasOwnProperty(userid)) {
            users[userid] = obj;
        }
    };
    UserMgr.prototype.remove = function(obj) {
        var users = this.users;
        var userid = obj.userid;
        if(users.hasOwnProperty(userid)) {
            delete users[userid];
        }
    };
    UserMgr.prototype.addList = function(list) {
        var users = this.users;
        for (var i in list) {
            var userid =list[i].userid;
            if(!users.hasOwnProperty(userid)) {
                users[userid] = list[i];
            }
        }
    };
    UserMgr.prototype.online = function(obj) {
        var userid = obj.userid;
        this.users[userid].online = true;
        app.console.log("red@"+userid, "login");
    };
    UserMgr.prototype.offline = function(obj) {
        var userid = obj.userid;
        this.users[userid].online = false;
        app.console.log("red@"+userid, "logout");
    };
    UserMgr.prototype.showUserList = function() {
        var users = this.users;
        var list = [];
        for (var userid in users) {
            var user = users[userid];
            var color = user.online?"green":"gray";
            list.push(color+"@"+userid+":"+user.username);
        }
        app.console.log.apply(null, list);
    };
    UserMgr.prototype.showOnlineUserList = function() {
        var users = this.users;
        var list = [];
        for (var userid in users) {
            var user = users[userid];
            if (user.online) {
                list.push("green@"+userid+":"+user.username);
            }
        }
        app.console.log.apply(null, list);
    };
    UserMgr.prototype.updateHead = function(head) {
        app.socket.emit('USERS_UPDATE_HEAD_RQ', {head:head});
    };

    return new UserMgr();
});


