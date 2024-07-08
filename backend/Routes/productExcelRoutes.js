const express = require('express')
const multer = require('multer')
const ExcelJS = require('exceljs')
const Product = require('../models/product.models')
const { error } = require('console')
const router = express.Router()

// set up multer for file uploads 
const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

// route to handle product data upload
router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const file = req.file
        if (!file) {
            return res.status(400).json({
                error: 'No file uploaded',
                guidance: 'Please upload an Excel file containing product data',
            })
        }

        const workbook = new ExcelJS.Workbook()
        await workbook.xlsx.load(file.buffer)

        const worksheet = workbook.worksheets[0]
        const products = []

        worksheet.eachRow((row, rowNumber) => {
            if (rowNumber > 1) {
                const [productId, name, description, images, pricingTiers, stockQuantity, brand, category, sku, variations] = row.values.slice(1)

                if (!productId || !name || !description || !images || !pricingTiers || !stockQuantity || !brand || !category || !sku || !variations) {
                    throw new Error('Missing required fields')
                }

                products.push({
                    productId,
                    name,
                    description,
                    images: images.split(','),
                    pricingTiers: pricingTiers.split(','),
                    stockQuantity,
                    brand,
                    category,
                    sku,
                    variations: variations.split(',')
                })
            }
        })

        await Product.insertMany(products)

        res.send('Products uploaded successfully!')
    } catch (error) {
       let errorMessage = 'Upload failed. Please try again.'
       let guidance = 'Please check the uploaded file errors and try again.'

       if (error.message == 'Missing required fields') {
        errorMessage = 'Some required fields are missing'
        guidance = 'Ensure all required fields are filled: productId, name, description, images, pricingTiers, stockQuantity, brand, category, sku, variations.'
       }

       res.status(500).json({
        error: errorMessage,
        guidance: guidance,
       })
    }
})

module.exports = router
