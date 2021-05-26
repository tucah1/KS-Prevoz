require('dotenv').config()
const nodemailer = require('nodemailer')

module.exports = (subject, message, emailList) => {
    return new Promise(async (resolve, reject) => {
        try {
            let transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 587,
                secure: false, // true for 465, false for other ports
                auth: {
                    user: process.env.USER, // generated ethereal user
                    pass: process.env.PASSWORD, // generated ethereal password
                },
                tls: {
                    rejectUnauthorized: false,
                },
            })
            
            // send mail with defined transport object
            await transporter.sendMail({
                from: '"KSPrevoz" <tech.ksprevoz@gmail.com>', // sender address
                bcc: emailList, // list of receivers
                subject: subject, // Subject line
                text: message, // plain text body
                //html: "", we can maybe add it later
            })
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}