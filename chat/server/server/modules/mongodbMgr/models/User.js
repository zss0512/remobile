module.exports = (function() {
    var mongoose = require('mongoose'),
        Schema = mongoose.Schema;

    var UserSchema = Schema({
        userid: {type:String, unique:true, required: true},//phone
        password: {type:String, required: true},
        username: {type:String, unique:true},
        sign: {type:String},
        groups: {type:Array, default:[]}
    }, {
        collection: 'users'
    });

    UserSchema.statics._add = function(obj, callback) {
        var user = this(obj);
        user.save(function(err) {
            var error;
            if (err && err.code == 11000) {
                var errmsg = err.err||err.errmsg||err.message;
                var name = errmsg.replace(/.*users.\$([a-z]+).*/, '$1');
                if (name == 'username') {
                    error = app.error.USER_NAME_DUPLICATE;
                } else if (name == 'userid') {
                    error = app.error.USER_ID_DUPLICATE;
                }
            } else if (err) {
                error = app.error.UNKNOWN_ERROR;
            }
            callback(error);
        });
    };
    UserSchema.statics._count = function(callback) {
        this.count(function (err, count) {
            callback(count);
        });
    };
    UserSchema.statics._joinGroup = function(userids, groupid) {
        this.update({userid:{$in:userids}}, {$push:{groups:groupid}}, {multi:true}, function(){});
    };
    UserSchema.statics._leaveGroup = function(userids, groupid) {
        console.log(userids, groupid);
        this.update({userid:{$in:userids}}, {$pull:{groups:groupid}}, {multi:true}, function(){});
    };
    UserSchema.statics._updateUserInfo = function(userid, obj, callback) {
        this.findOneAndUpdate({userid:userid}, obj, function(){
            callback();
        });
    };

    return mongoose.model('User', UserSchema);
})();


