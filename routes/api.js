const express = require('express');
const router = express.Router();

router.get('/favorite', function (req, res, next) {
    let data = [
        {videoId: 10001, imageUrl: 'http://192.168.1.110:3000/image.jpg', title: 'Smartisan OS'},
        {videoId: 10002, imageUrl: 'http://192.168.1.110:3000/image.jpg', title: '坚果宣传片'},
        {videoId: 10003, imageUrl: 'http://192.168.1.110:3000/image.jpg', title: 'HTC 10'}
    ];
    res.send(data);
});

router.get('/later', function (req, res, next) {
    let data = [
        {videoId: 10001, imageUrl: 'http://192.168.1.110:3000/image.jpg', title: 'Smartisan OS'},
        {videoId: 10002, imageUrl: 'http://192.168.1.110:3000/image.jpg', title: '坚果宣传片'},
        {videoId: 10003, imageUrl: 'http://192.168.1.110:3000/image.jpg', title: 'HTC 10'}
    ];
    res.send(data);
});

router.get('/history', function (req, res, next) {
    let data = [
        {videoId: 10001, imageUrl: 'http://192.168.1.110:3000/image.jpg', title: 'Smartisan OS'},
        {videoId: 10002, imageUrl: 'http://192.168.1.110:3000/image.jpg', title: '坚果宣传片'},
        {videoId: 10003, imageUrl: 'http://192.168.1.110:3000/image.jpg', title: 'HTC 10'}
    ];
    res.send(data);
});

router.get('/homead', function (req, res, next) {
    let data = [
        {img: 'http://www.flyce.cn/usr/uploads/image.jpg', link: 'http://www.flyce.cn', title: '暑假五折'},
        {img: 'http://www.flyce.cn/usr/uploads/image.jpg', link: 'http://www.flyce.cn', title: '暑假五折'},
    ];
    res.send(data);
});

router.get('/homelist/:city/:page', function (req, res, next) {
    let data = {
        data: [
            {
                distance: '120m',
                img: 'http://www.flyce.cn/usr/uploads/image.jpg',
                mumber: '389',
                price: '28',
                subTitle: '子标题',
                title: '汉堡大大'
            },
            {
                distance: '120m',
                img: 'http://www.flyce.cn/usr/uploads/image.jpg',
                mumber: '389',
                price: '28',
                subTitle: '子标题',
                title: '汉堡大大'

            },
            {
                distance: '120m',
                img: 'http://www.flyce.cn/usr/uploads/image.jpg',
                mumber: '389',
                price: '28',
                subTitle: '子标题',
                title: '汉堡大大'

            },
            {
                distance: '120m',
                img: 'http://www.flyce.cn/usr/uploads/image.jpg',
                mumber: '389',
                price: '28',
                subTitle: '子标题',
                title: '汉堡大大'

            },
            {
                distance: '120m',
                img: 'http://www.flyce.cn/usr/uploads/image.jpg',
                mumber: '389',
                price: '28',
                subTitle: '子标题',
                title: '汉堡大大'

            }
        ],
        hasMore: true
    }
    res.send(data);
});

module.exports = router;
