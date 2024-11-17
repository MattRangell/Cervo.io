const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(bodyParser.json());

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// WhatsApp API credentials
const whatsappApiUrl = 'https://graph.facebook.com/v13.0/YOUR_PHONE_NUMBER_ID/messages';
const accessToken = 'YOUR_ACCESS_TOKEN';

app.post('/send-alert', async (req, res) => {
    const { phoneNumber, message } = req.body;

    try {
        const response = await axios.post(whatsappApiUrl, {
            messaging_product: 'whatsapp',
            to: phoneNumber,
            type: 'text',
            text: { body: message }
        }, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            }
        });

        res.status(200).send('Alert sent successfully!');
    } catch (error) {
        console.error('Error sending alert:', error.response ? error.response.data : error.message);
        res.status(500).send('Failed to send alert.');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
