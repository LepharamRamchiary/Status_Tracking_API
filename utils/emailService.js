const nodemailer = require('nodemailer');
const Product = require('../models/product');
const User = require('../models/user');

const EMAIL = 'demo@gmail.com';
const EMAIL_PASSWORD = 'demo123';

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

exports.sendEmail = async (productId, status) => {
    try {
        const product = await Product.findById(productId).populate('userId');
        const user = await User.findById(product.userId);

        const mailOptions = {
            from: EMAIL,
            to: user.email,
            subject: 'Product Status Update',
            text: `Dear ${user.username},\n\nYour product "${product.name}" is now "${status}".\n\nThank you,\nYour Company`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log('Error sending email1:', error);
            } else {
                console.log('Email sent:', info.response);
            }
        });
    } catch (err) {
        console.log('Error sending email2:', err);
    }
};
