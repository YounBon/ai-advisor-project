// test-mongo-connection-ipv4.js
require('dotenv').config();
const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
console.log('Set DNS servers to Google DNS (8.8.8.8, 8.8.4.4)');

// Force Node.js to prefer IPv4
if (typeof dns.setDefaultResultOrder === 'function') {
    dns.setDefaultResultOrder('ipv4first');
    console.log('Set DNS result order to ipv4first');
}

const mongoose = require('mongoose');
const uri = process.env.MONGO_URI;
console.log('MONGO_URI:', uri);

mongoose.connect(uri)
    .then(() => {
        console.log('MongoDB connection successful!');
        process.exit(0);
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });
// Lệnh test: node test-mongo-connection-ipv4.js
