const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const DMTinhThanh = require('./../models/DMTinhThanh');

router.post('/create', (req, res, next) => {

    const dantoc = new DMTinhThanh({
        _id: new mongoose.Types.ObjectId,
        name: req.body.name,
        slug: req.body.slug,
        type: req.body.type,
        name_with_type: req.body.name_with_type,
        code: req.body.code
    });

    dantoc.save()
        .then(dantoc => {
            res.status(201).json({
                msg: 'Created tinh thanh thanh cong',
                tinh_thanh: dantoc
            });
        })
        .catch(error => {
            res.status(500).json({
                msg: 'Have a error'
            });
            console.log(error);
        });
});

router.get('/', (req, res, next) => {
    // const pageSize = +req.query.pageSize;
    // const pageIndex = +req.query.pageIndex;
    // const dantocQuery = DanToc.find().skip(pageSize * (pageIndex - 1)).limit(pageSize);
    // let dantocFetched;
    DMTinhThanh
    // .sort('STT')
        .find()
        .then(results => {
            if (!results) {
                res.status(500).json({
                    msg: 'Have a error'
                });
            }

            return res.status(200).json({
                tinhthanh: results
            });
        }).catch(error => {
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

// router.delete('/:id', (req, res, next) => {
//     const id = req.params.id;
//     DanToc.findByIdAndDelete({ _id: id })
//         .exec()
//         .then(khoaphong => {
//             if (!khoaphong) {
//                 res.status(500).json({
//                     msg: `Co loi xay ra khi xoa 1 dan toc voi id: ${id}`,
//                     dantoc: khoaphong
//                 });
//             }
//             res.status(201).json({
//                 msg: `Da xoa 1 dan toc voi id: ${id}`,
//                 dantoc: khoaphong
//             });
//         })
//         .catch(error => {
//             res.status(500).json({
//                 msg: 'Have a error'
//             });
//         });
// });

// router.put('/:id', (req, res, next) => {
//     const id = req.params.id;
//     const danTocUpdate = new DMDanToc({
//         name: req.body.name,
//         ma: req.body.ma,
//         STT: req.body.STT
//     });

//     DMDanToc.findByIdAndUpdate({ _id: id }, danTocUpdate)
//         .exec()
//         .then(khoaphong => {
//             res.status(201).json({
//                 msg: `Da update 1 DAN TOC voi id: ${id}`,
//                 DMKhoaPhong: khoaphong
//             });
//         })
//         .catch(error => {
//             res.status(500).json({
//                 msg: 'Have a error'
//             });
//         });
// });





module.exports = router;