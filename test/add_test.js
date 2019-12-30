const assert = require('assert');
//const mongoose = require('mongoose');
const Product = require('../models/product.model');

describe('Creating documents', () => {
    it('creates a product', (done) => {
        let prod = new Product({ name: 'Pickachu',  });

        prod.save()
            .then(() => {
                assert(!prod.isNew);
                done();
            });
    });
});