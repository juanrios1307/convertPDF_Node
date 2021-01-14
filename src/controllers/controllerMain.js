const ControllerMain={}
const PDFDocument = require('pdfkit');
const fs = require('fs');

ControllerMain.PDF = (req,res ) =>{

    const {ciudad,nombre,representante,nit,correo,direccion,telefono,ciudadA,asunto,mensaje,secretaria,ocupacion,redactor}=req.body

    if(req.body !== null){
    
        let pdfDoc = new PDFDocument;
        const font='Times-Roman';

        pdfDoc.pipe(fs.createWriteStream('src/controllers/PDFDoc.pdf'));
        pdfDoc.image('src/controllers/logo.png',350,50,{align:'right'});
        pdfDoc.fontSize(18).font(font).text(ciudad,{align:'left'});
        pdfDoc.fontSize(15).font(font).text(" ",{align:'left'});

        pdfDoc.fontSize(18).font(font).text("Señor",{align:'left'});
        pdfDoc.fontSize(20).font(font).text(nombre,{align:'left'});
        pdfDoc.fontSize(18).font(font).text(representante,{align:'left'});
        pdfDoc.fontSize(18).font(font).text(nit,{align:'left'});
        pdfDoc.fontSize(18).font(font).text(correo,{align:'left'});
        pdfDoc.fontSize(18).font(font).text(direccion,{align:'left'});
        pdfDoc.fontSize(18).font(font).text(telefono,{align:'left'});
        pdfDoc.fontSize(18).font(font).text(ciudadA,{align:'left'});
        pdfDoc.fontSize(15).font(font).text(" ",{align:'left'});

        pdfDoc.fontSize(18).font(font).text("Asunto: "+asunto,{align:'left'});
        pdfDoc.fontSize(15).font(font).text(" ",{align:'left'});

        pdfDoc.fontSize(15).font(font).text(mensaje,{align:'justify'});
        pdfDoc.fontSize(45).font(font).text(" ",{align:'left'});

        pdfDoc.fontSize(15).font(font).text(secretaria,{align:'left'});
        pdfDoc.fontSize(15).font(font).text(ocupacion,{align:'left'});
        pdfDoc.fontSize(15).font(font).text("Redactor: "+redactor,{align:'left'});
    
       
        pdfDoc.end();

        return  res.status(200).json({status: "ok", data: 'PDF ok'});

        //return  ControllerMain.download(req,res,'PDFDoc.pdf')

    }else{
        return (res.type('json').status(422).send({
            status: "error",
            data: "No hay DATOS"
        }));

    }
}

ControllerMain.download = (req,res,id ) =>{
    //const id=req.params.id
    res.download(__dirname+'/'+id,id,function(err){
        if(err){
            console.log(err)
        }else{
            console.log('PDF creado')
            //res.status(200).json({status: "ok", data: "PDF creado"});
        }
    })
}

module.exports=ControllerMain