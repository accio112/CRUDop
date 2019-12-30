const express = require('express');
const fs = require('fs');
const multer = require('multer');
const mongoose = require('mongoose');
const utils = require('../utils/CommonUtils');

const Product = mongoose.model('Product');
var router = express.Router();


let storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, './uploads');
    },
    filename: function(req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + '.jpg');
    }
});

let upload = multer({
    storage: storage
});

router.get('/add', (req, res) => {
    res.render('product/addProduct', {
        viewTitle: 'Add Product'
    });
});

router.post('/', upload.single('myFile'), (req, res) => {
    req.body._id === ''? insertRecord(req,res): updateRecord(req,res);
});

function insertRecord(req, res) {
    let product = new Product();
    if(req.body){
        product.name = req.body.name;
        product.brand = req.body.brand;
        product.category = req.body.category;
    }
    if(req.file) {
        product.img.name = req.file.originalname;
        product.img.data = fs.readFileSync(req.file.path);
        product.img.contentType = 'image/jpg';
    }

    product.save((err, doc) => {
        if (!err) {
            res.redirect('/');
        }
        else {
            console.log('Error in insertion : ' + err);
        }
    });
}

function updateRecord(req, res) {
    var newProdDetail = {};
    if(req.body.name!='')newProdDetail.name=req.body.name;
    if(req.body.brand!='')newProdDetail.brand=req.body.brand;
    if(req.body.category!='')newProdDetail.category=req.body.category;
    Product.findOneAndUpdate({ _id: req.body._id }, newProdDetail, { new: true }, (err, doc) => {
        if (!err) {
            res.redirect('/');
        }
        else {
            console.log('Error in updating : ' + err);
        }
    });
}

router.get('/', (req, res) => {
    Product.find((err, doc) => {
        if (!err) {
            res.render('product/listProduct', {
                list: doc
            });
        }
        else {
            console.log('Error in fetching list of products : ' + err);
        }
    });
});

router.get('/filter', (req, res) => {
    Product.find((err, doc) => {
        if (!err) {
            res.render('product/filterProduct', {
                list: doc
            });
        }
        else {
            console.log('Error in filter : ' + err);
        }
    });
});

router.post('/filter', (req, res) => {
    let filterName = req.body.name;
    let filterBrand = req.body.brand;
    let filterCategory = req.body.category;

    let filterParameters = utils.extractParam(filterName,filterBrand,filterCategory);

    Product.find(filterParameters, (err, doc) => {
        if (!err) {
            res.render('product/filterProduct', {
                list: doc
            });
        }
        else {
            console.log('Error in fetching filtered products : ' + err);
        }
    });
});

router.get('/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            res.render('product/addProduct', {
                viewTitle: 'Update Product',
                product: doc
            });
        }
    });
});

router.get('/delete/:id', (req, res) => {
    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) {
            res.redirect('/');
        }
        else {
            console.log('Error in deleting : ' + err);
        }
    });
});


router.get('/image/:id', (req, res) => {
    Product.findById(req.params.id, (err, doc) => {
        if (!err) {
            let base64 = doc.img.data.toString('base64');
            res.render('product/image', {
                encodedImage: base64,
                contentType: doc.img.contentType
            });
        }
    });
});


module.exports = router;
