const express=require('express')
const app=express()
const bodyparser=require('body-parser')


app.use(bodyparser.urlencoded({extend:true}))
app.use(bodyparser.json())

app.use('/api/',require('./routes/routerMain.js'))

//start server
app.listen(process.env.PORT || 5000,()=>{
    console.log('Listen in the port ',process.env.PORT || 5000)
})
