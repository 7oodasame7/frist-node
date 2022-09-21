const express  = require('express')
const path = require('path')
const nodemailer = require('nodemailer')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use(express.static(path.join(__dirname,'assets')))

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname,'/assets/index.html'))
})

app.post('/sendEmail',(req,res)=> {
    let username = req.body.userName
    let telUser = req.body.telUser
    let array = req.body.inside
    let msg = `الاسم: ${username} \b \b رقم التلفون: ${telUser} \n\n ${array.join(' || ')}`

    let mailTransporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:'hooda1331@gmail.com',
            pass:'tvsjlrtuandenkcs'
        }
    })

    let mailOptions = {
        from: "hooda1331@gmail.com",
        to: 'hooda1331@gmail.com',
        subject:'معماري',
        text:msg
    }
    mailTransporter.sendMail(mailOptions,err=> {
        if(err) console.log(err)
        else {
            console.log('send Email Success!')
            res.redirect('/')
        }
    })
})

const port = process.env.PORT || 3000
app.listen(port,()=> console.log('Server Running...'))