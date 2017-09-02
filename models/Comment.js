const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

// create Comment Schema & model
const CommentSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'userId field is required']
    },
    videoId: {
        type: String,
        required: [true, 'videoId field is required']
    },
    context: {
        type: String,
        required: [true, 'context field is required']
    },
    timeStamp: {
        type: String,
        required: [true, 'timeStamp field is required'],
        default: Date.now
    }
});

CommentSchema.plugin(autoIncrement.plugin, {
    model: 'comments',
    startAt: 10000,
    incrementBy: 1
});

const Comment = mongoose.model('comments', CommentSchema);

module.exports = Comment;