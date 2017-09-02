const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

// create Comment Schema & model
const UserSchema = new Schema({
    username: {
        type: String,
        required: [true, 'username field is required']
    },
    password: {
        type: String,
        required: [true, 'username field is required']
    },
    headImageUrl: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now
    },
    admin: {
        type: Boolean,
        default: false
    }
});

UserSchema.plugin(autoIncrement.plugin, {
    model: 'users',
    startAt: 10000,
    incrementBy: 1
});

const User = mongoose.model('users', UserSchema);

module.exports = User;