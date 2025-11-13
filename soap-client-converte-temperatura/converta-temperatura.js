const express = require('express');
const soap = require('soap');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const wsdlUrl = 'https://www.w3schools.com/xml/tempconvert.asmx?WSDL';

app.post('/converter-temperatura', (req, res) => {
  const { celsius } = req.body;

  soap.createClient(wsdlUrl, function(err, client) {
    if (err) return res.status(500).json({ error: 'Erro ao criar cliente SOAP' });

    client.CelsiusToFahrenheit({ Celsius: celsius }, function(err, result) {
      if (err) return res.status(500).json({ error: 'Erro na conversão' });

      res.json({ fahrenheit: result.CelsiusToFahrenheitResult });
    });
  });
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});