const HttpsProxyAgent = require('https-proxy-agent');
const axios = require('axios')
const { lineBreak } = require('../utilities/utils');
const fetch = require('node-fetch');

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
      let i = 0;
      return new Promise((resolve) => {
        function testProxy(){
          let controller = new AbortController();
          const timeout = setTimeout(
            () => { controller.abort(); },
            10000,
          );
          console.log('Trying IP number: ' + (i + 1));
          fetch('https://httpbin.org/ip', {agent: new HttpsProxyAgent('http://' + proxy[i]), signal: controller.signal})
            .then(res => {
              if (res.status == 200) {
                clearTimeout(timeout)
                console.log(proxy[i]);
                resolve(proxy[i]);
              } else {
                i++
                testProxy();
              }
            })
            .catch(err => {
              i++
              clearTimeout(timeout);
              console.log('Proxy timed out');
              testProxy();
            });
        }
        testProxy();
      });
    })
    .catch(function (error) {
      console.log(error);
    });
}

module.exports = proxyGenerator;
