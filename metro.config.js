const os = require('os');

function getWifiIP() {
  const interfaces = os.networkInterfaces();
  const candidates = [];
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        candidates.push({ name, address: iface.address });
      }
    }
  }
  const wifi = candidates.find((c) => /Wi-Fi|wi-fi|wlan|wireless/i.test(c.name));
  if (wifi) return wifi.address;
  const eth = candidates.find((c) => /Ethernet/i.test(c.name));
  if (eth) return eth.address;
  if (candidates.length > 0) return candidates[0].address;
  return '127.0.0.1';
}

const HOST = process.env.EXPO_HOST || getWifiIP();
const PORT = parseInt(process.env.EXPO_PORT || '8081', 10);

module.exports = {
  server: {
    port: PORT,
    host: HOST,
  },
  resolver: {
    extraNodeModules: {},
  },
};