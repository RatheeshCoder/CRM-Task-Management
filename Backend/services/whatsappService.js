// File path: services/whatsappService.js

const venom = require('venom-bot');

let client;

// Define the session name and options
const sessionName = 'whatsapp-session';
const sessionOptions = {
  folderNameToken: 'tokens', // Folder name for tokens
  mkdirFolderToken: './',    // Make sure the path is correct and exists
};

// Initialize the client
venom
  .create(
    sessionName,
    (base64Qrimg, asciiQR) => {
      console.log('QR Code received, scan it using WhatsApp');
      console.log(asciiQR); // Optional to print the QR in the terminal
    },
    undefined,
    sessionOptions
  )
  .then((venomClient) => {
    client = venomClient;
    console.log('Venom client is ready!');
  })
  .catch((error) => {
    console.error('Error initializing Venom client:', error);
  });

exports.sendWhatsAppMessage = async (to, message) => {
  try {
    const chatId = `${to}@c.us`; // WhatsApp ID
    await client.sendText(chatId, message);
    console.log('Message sent:', chatId, message);
  } catch (error) {
    console.error('Error sending WhatsApp message:', error);
    throw error;
  }
};
