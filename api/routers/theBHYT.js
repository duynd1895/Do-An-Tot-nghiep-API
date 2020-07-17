const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DMTheBHYT = require('./../models/DMTheBHYT');

router.post('/create', (req, res, next) => {

    const thebhyt = new DMTheBHYT({
        _id: new mongoose.Types.ObjectId,
        SoTheBHYT: req.body.mathe,
        NoiDKKCBBD: req.body.noidangkythe,
        HanDau: req.body.handau,
        HanCuoi: req.body.hancuoi,
        MaKhuVuc: req.body.makhuvuc
    });

    thebhyt.save()
        .then(result => {
            res.status(201).json({
                TheBHYT: result
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error',
                error: error
            });
        });
});

router.get('/', (req, res, next) => {

    DanToc
        .find()
        .sort('STT')
        .exec()
        .then(results => {
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }
            res.status(200).json({
                msg: 'Lay du lieu thanh cong',
                count: results.length,
                dantoc: results.map(hxt => {
                    return {
                        _id: hxt._id,
                        name: hxt.name,
                        STT: hxt.STT,
                        ma: hxt.ma
                    }
                })
            });
        })
        .catch(error => {
            console.log(error);
        });

});

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    DanToc.findById({ _id: id })
        .exec()
        .then(khoaphong => {
            res.status(201).json({
                msg: `Da tim thay 1 dan toc voi id: ${id}`,
                dantoc: khoaphong
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });

});

router.delete('/:id', (req, res, next) => {
    const id = req.params.id;
    DanToc.findByIdAndDelete({ _id: id })
        .exec()
        .then(khoaphong => {
            if (!khoaphong) {
                res.status(500).json({
                    msg: `Co loi xay ra khi xoa 1 dan toc voi id: ${id}`,
                    dantoc: khoaphong
                });
            }
            res.status(201).json({
                msg: `Da xoa 1 dan toc voi id: ${id}`,
                dantoc: khoaphong
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});

router.put('/:id', (req, res, next) => {
    const id = req.params.id;
    const danTocUpdate = new DMDanToc({
        name: req.body.name,
        ma: req.body.ma,
        STT: req.body.STT
    });

    DMDanToc.findByIdAndUpdate({ _id: id }, danTocUpdate)
        .exec()
        .then(khoaphong => {
            res.status(201).json({
                msg: `Da update 1 DAN TOC voi id: ${id}`,
                DMKhoaPhong: khoaphong
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
        });
});





module.exports = router;