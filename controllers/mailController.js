const nodemailer = require('nodemailer');
const mailConfig = require('../config/mailConfig');

const transporter = nodemailer.createTransport({
    host: 'ns14.inleed.net',
    port: 465,
    secure: true, // use SSL
    auth: {
      user: 'rusticpasta@bayville.se',
      pass: mailConfig.PASSWORD
    }
  });


 function sendConfirmMail(customerData, totalAmount, item, newOrder, orderItems){
    
    console.log("cd: ", customerData);
    console.log("ta: ", totalAmount);
    console.log("it: ", item);
    console.log("re: ", newOrder);
    console.log("oi: ", orderItems);

    const mailOptions = {
        from: 'rusticpasta@bayville.se',
        to: customerData.email,
        subject: `Orderbekräftelse för order: ${newOrder.dataValues.id}`,
        html: `<h1>Tack för din order, ${customerData.firstName}!</h1>

        <p>Du har lagt en order på: ${totalAmount} kr.</p> 
        <p>Detta betalas vid avhämtning av maten.</p>
        <p>Din order kan hämtas upp om 30 minuter</p>
        <a href="${mailConfig.WEBSITE}/confirmed-order?orderId=${newOrder.dataValues.id}" target="_blank">Se fullständiga orderdetaljer.</a>
        
        <p>Smaklig måltid önskar Rustic Pasta.</p>
        `
      };

    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
  }

  async function sendContactFormMail(req, res){
    const mailOptions = {
        from: 'rusticpasta@bayville.se',
        to: 'rusticpasta@bayville.se',
        subject: `Meddelande från kontaktformulär`,
        html: `<h1>Meddelande från ${req.body.name}!</h1>
        <p>${req.body.name}</p>
        <p>${req.body.email}</p>

        <h2>Meddelande:</h2>
        <p>${req.body.message}</p>
        `
    };


    console.log("mailOptions: ", mailOptions);

    transporter.sendMail(mailOptions, function(error, info) {
      if (error) {
          console.log(error);
          return res.status(500).json({ error: 'Failed to send email', status: false });
      } else {
          console.log('E-post skickad: %s', info.messageId);
          sendContactFormMailConfrim(req, res);

          return res.status(200).json({ message: 'Email sent successfully', status: true });
      }
  });
  }

function sendContactFormMailConfrim(req,){
  const mailOptions = {
    from: 'rusticpasta@bayville.se',
    to: req.body.email,
    subject: `Meddelande från kontaktformulär`,
    html: `<h1>Hej ${req.body.name}, tack för ditt meddelande!</h1>
    <p>Vi har tagit emot ditt meddelande och återkommer så fort vi kan.</p>

    <p>Ditt meddelande:</p>
    <p>${req.body.message}</p>
    `
};

transporter.sendMail(mailOptions, function(error, info) {
  if (error) {
      console.log(error);
      return;
  } else {
      console.log('E-post skickad: %s', info.messageId);
      return;
  }
});
}



  module.exports = { sendConfirmMail, sendContactFormMail }