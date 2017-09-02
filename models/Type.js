const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// create Comment Schema & model
const TypeSchema = new Schema({
    userId: {
        type: String,
        required: [true, 'userId field is required']
    },
    type: {
        type: String,
        required: [true, 'userId field is required']
    },
    videoId: {
        type: String,
        required: [true, 'videoId field is required']
    },
    timeStamp: {
        type: String,
        required: [true, 'timeStamp field is required'],
        default: Date.now
    },
    // title: [{type: Schema.Types.String, ref: 'Video'}],
    // imageUrl: [{type: Schema.Types.String, ref: 'Video'}]
});

const Type = mongoose.model('types', TypeSchema);

module.exports = Type;