const db = require('../../config/db');
const fs = require('fs');

//* GET all products
const getAllProducts = (req, res) => {
    db.all('SELECT * FROM product', (err, rows) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        res.status(200).send({
            data: rows
        });
    });
}

//* GET product by id
const getProductById = (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM product WHERE id = ?', id, (err, row) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        return row
            ? res.status(200).send({
                data: row
            })
            : res.status(404).send({
                message: 'Product not found'
            });

    });
}

// * POST new product
const postProduct = (req, res) => {
    const { code, names, price, description } = req.body;
    var images = null;
    db.get('SELECT * FROM product WHERE code = ?', code, (err, row) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        if (row) {
            res.status(400).send({
                message: 'Product already exists'
            });
        } else {
            if (req.files) {
                const file = req.files.image;
                images = Date.now() + '-' + file.name;
                file.mv('./uploads/' + images);
                console.log('Image upload is: => ' + images);
            }
            db.run('INSERT INTO product (code, names, price, description, image) VALUES (?, ?, ?, ?, ?)', code, names, price, description, images, (err) => {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                res.status(200).send({
                    message: 'Product created'
                });
            });
        }
    })
}

// * PUT product by id
const putProductById = (req, res) => {
    const id = req.params.id;
    const { code, names, price, description } = req.body;
    var images = null;

    db.get('SELECT * FROM product WHERE id = ?', id, (err, row) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        if (!row) {
            res.status(404).send({
                message: 'Product not found'
            });
        } else {
            db.get('SELECT COUNT(*) FROM product WHERE code = ? OR id = ?', code, id, (err, row1) => {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                if (Object.values(row1) >= 2) {
                    res.status(400).send({
                        message: 'Product already exists'
                    });
                } else {
                    if (req.files) {
                        if (row.image !== null) {
                            fs.unlink('uploads/' + row.image, (err) => {
                                console.log('Image deleted is: => ' + row.image);
                            })
                        }
                        const file = req.files.image;
                        images = Date.now() + '-' + file.name;
                        file.mv('./uploads/' + images);
                        console.log('Image upload is: => ' + images);
                    } else {
                        images = row.image;
                    }
                    db.run('UPDATE product SET code = ?, names = ?, price = ?, description = ?, image = ? WHERE id = ?', code, names, price, description, images, id, (err) => {
                        if (err) {
                            res.status(500).send({
                                message: err.message
                            });
                        }
                        res.status(200).send({
                            message: 'Product updated'
                        });
                    });
                }
            })
        }
    })
}

// * DELETE product by id
const deleteProductById = (req, res) => {
    const id = req.params.id;
    db.get('SELECT * FROM product WHERE id = ?', id, (err, row) => {
        if (err) {
            res.status(500).send({
                message: err.message
            });
        }
        if (!row) {
            res.status(404).send({
                message: 'Product not found'
            });
        } else {
            if (row.image !== null) {
                fs.unlink('uploads/' + row.image, (err) => {
                    console.log('Image deleted is: => ' + row.image);
                })
            }
            db.run('DELETE FROM product WHERE id = ?', id, (err) => {
                if (err) {
                    res.status(500).send({
                        message: err.message
                    });
                }
                res.status(200).send({
                    message: 'Product deleted'
                });
            });
        }
    })
}



// * Export the functions
module.exports = {
    getAllProducts,
    getProductById,
    postProduct,
    putProductById,
    deleteProductById
}