

function extractParam(name,brand,category){
    let filter;
    if (name != '' && category != '' && brand != '') {
        filter = { $and: [{ name: name }, { $and: [{ category: category }, { brand: brand }] }]};
    }
    else if (name == '' && category != '' && brand != '') {
        filter = { $and: [{ category: category }, { brand: brand }] };
    }
    else if (name != '' && category == '' && brand != '') {
        filter = { $and: [{ name: name }, { brand: brand }] };
    }
    else if (name != '' && category != '' && brand == '') {
        filter = { $and: [{ name: name }, { category: category }] };
    }
    else if (name == '' && category == '' && brand != '') {
        filter = { brand: brand };
    }
    else if (name != '' && category == '' && brand == '') {
        filter = { name: name };
    }
    else if (name == '' && category != '' && brand == '') {
        filter = { category:category };
    }
    else {
        filter = {};
    }
    return filter;
}

module.exports = {
    extractParam: extractParam
};