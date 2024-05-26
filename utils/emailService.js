const nodemailer = require('nodemailer');
const Product = require('../models/product');
const User = require('../models/user');

const EMAIL = process.env.EMAIL;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { 
        user: EMAIL,
        pass: EMAIL_PASSWORD
    }
});

exports.sendEmail = async (user, product, status) => {
    try {
        if (!user || !user.email) {
            throw new Error('Invalid user object or missing email property');
        }
        
        const mailOptions = {
            from: EMAIL,
            to: user.email,
            subject: 'Product Status Update',
            text: `Dear ${user.username},\n\nYour product "${product.name}" is now "${status}".\n\nThank you`
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

