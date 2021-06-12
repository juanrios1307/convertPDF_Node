const ControllerMain={}
const PDFDocument = require('pdfkit');
const nodemailer = require('nodemailer');

const fs = require('fs');

ControllerMain.PDF = async (req, res) => {

    const {ciudad, nombre, representante, nit, correo,
        direccion, telefono, ciudadA, asunto, mensaje,
        secretaria, ocupacion, redactor, emailDestino} = req.body.values

    if (req.body !== null) {

        let pdfDoc = new PDFDocument;

        let buffers = [];
        pdfDoc.on('data', buffers.push.bind(buffers));
        pdfDoc.on('end', () => {

            let pdfData = Buffer.concat(buffers);

            var transporter = nodemailer.createTransport({
                service: 'Outlook365',
                auth: {
                    user: 'localshop20202@outlook.com',
                    pass: '2Juan1Santiago'
                }
            });

            const mailOptions = {
                from: 'localshop20202@outlook.com',
                to: emailDestino != undefined?emailDestino:"juanesrios13@gmail.com",
                attachments: [{
                    filename: 'attachment.pdf',
                    content: pdfData
                }]
            };

            mailOptions.subject = 'PDF in mail';
            mailOptions.text = 'PDF attached';

            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {

                    res.status(203).json({status: "error", data: error});
                } else {
                    res.status(200).json({status: "ok", data: "PDF enviado"});
                }
            });

        });


        const font = 'Times-Roman';



        //pdfDoc.pipe(fs.createWriteStream('PDFDoc.pdf'));

        pdfDoc.image('src/controllers/logo.png', 350, 50, {align: 'right'});
        pdfDoc.fontSize(18).font(font).text(ciudad, {align: 'left'});
        pdfDoc.fontSize(15).font(font).text(" ", {align: 'left'});

        pdfDoc.fontSize(18).font(font).text("Señor", {align: 'left'});
        pdfDoc.fontSize(20).font(font).text(nombre, {align: 'left'});
        pdfDoc.fontSize(18).font(font).text(representante, {align: 'left'});
        pdfDoc.fontSize(18).font(font).text(nit, {align: 'left'});
        pdfDoc.fontSize(18).font(font).text(correo, {align: 'left'});
        pdfDoc.fontSize(18).font(font).text(direccion, {align: 'left'});
        pdfDoc.fontSize(18).font(font).text(telefono, {align: 'left'});
        pdfDoc.fontSize(18).font(font).text(ciudadA, {align: 'left'});
        pdfDoc.fontSize(15).font(font).text(" ", {align: 'left'});

        pdfDoc.fontSize(18).font(font).text("Asunto: " + asunto, {align: 'left'});
        pdfDoc.fontSize(15).font(font).text(" ", {align: 'left'});

        pdfDoc.fontSize(15).font(font).text(mensaje, {align: 'justify'});
        pdfDoc.fontSize(45).font(font).text(" ", {align: 'left'});

        pdfDoc.fontSize(15).font(font).text(secretaria, {align: 'left'});
        pdfDoc.fontSize(15).font(font).text(ocupacion, {align: 'left'});
        pdfDoc.fontSize(15).font(font).text("Redactor: " + redactor, {align: 'left'});


        pdfDoc.end();


        //return  res.status(200).json({status: "ok", data: 'PDF ok'});

        //return  ControllerMain.download(req,res,'PDFDoc.pdf')

    } else {
        return (res.type('json').status(422).send({
            status: "error",
            data: "No hay DATOS"
        }));

    }
}

module.exports=ControllerMain