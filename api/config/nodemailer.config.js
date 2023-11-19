const nodemailer = require('nodemailer');
console.log(process.env.ETHEREAL_USER, process.env.ETHEREAL_PASS)

// Configura el transporte de nodemailer con detalles específicos para Ethereal Email
const transporter = nodemailer.createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false, // true para 465 (SSL), false para otros puertos como 587 (TLS/STARTTLS)
  auth: {
    user: process.env.ETHEREAL_USER, // Tu dirección de Ethereal Email
    pass: process.env.ETHEREAL_PASS, // Tu contraseña de Ethereal Email
  },
});

const sendInvitationEmail = (email, reservationDetails) => {
  if (!reservationDetails || !reservationDetails.game) {
    throw new Error('Datos de reserva inválidos. Se esperaba un objeto con la propiedad "game".');
  }

  const mailOptions = {
    from: process.env.ETHEREAL_USER, // Utiliza el email de autenticación como remitente
    to: email,
    subject: 'Invitación a evento',
    text: `Has sido invitado a ${reservationDetails.game.title} el ${reservationDetails.reservationDate}.`,
    // Puedes utilizar la propiedad 'html' para enviar un correo con formato HTML.
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo electrónico:', error);
    } else {
      console.log('Correo de confirmación enviado: ' + info.response);
    }
  });
};

// Exporta la función para poder utilizarla en otras partes de tu aplicación
module.exports = { sendInvitationEmail };