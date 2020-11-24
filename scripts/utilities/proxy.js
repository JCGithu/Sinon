const axios = require('axios');
const { lineBreak } = require('../utilities/utils'); 

async function proxyGenerator() {
  let ip_addresses = [];
  let port_numbers = [];
  var ip;

  return axios
    .get('https://www.us-proxy.org/')
    .then(async (response) => {
      var proxy = response.data.match(/\d+\.\d+\.\d+\.\d+:\d+/g);
      for (var j = 0; j < proxy.length; j++) {
        var split = proxy[j].split(':');
        ip_addresses.push(split[0]);
        port_numbers.push(split[1]);
      }

      function testProxy(i) {
        console.log('Trying IP number: ' + (i + 1));
        var config = {
          proxy: { host: ip_addresses[i], port: port_numbers[i] },
        };
        return new Promise((resolve) => {
          axios.get('https://httpbin.org/ip', config).then(async (response) => {
            if (response.status == 200) {
              ip = ip_addresses[i] + ':' + port_numbers[i];
              console.log('IP is : ' + ip);
              lineBreak();
              resolve(ip);
            }
          });
        });
      }

      async function runProxyTest(i) {
        ip = await testProxy(i);
      }

      for (var i = 0; i < ip_addresses.length; i++) {
        await runProxyTest(i);
        if (ip == undefined) {
          continue;
        } else {
          return ip;
        }
      }
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = proxyGenerator;
