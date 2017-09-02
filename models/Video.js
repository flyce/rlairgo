const mongoose = require('mongoose');
const autoIncrement = require('mongoose-auto-increment');

const Schema = mongoose.Schema;

// create Video Schema & model
const VideoSchema = new Schema({
    title: {
        type:String,
        required: [true, 'title field is required']
    },
    imageUrl: {
        type: String,
        required: [true, 'imageUrl field is required']
    },
    src: {
        type: String,
        required: [true, 'src field is required']
    },
    introduction: {
        type: String,
        required: [true, 'introduction field is required']
    },
    source: {
        type: String,
        required: [true, 'source field is required']
    },
    createAt: {
        type: String,
        required: [true, 'timeStamp field is required'],
        default: Math.round(new Date() / 1000)
    }
});

VideoSchema.plugin(autoIncrement.plugin, {
    model: 'videos',
    startAt: 10000,
    incrementBy: 1
});

const Video = mongoose.model('videos', VideoSchema);

module.exports = Video;