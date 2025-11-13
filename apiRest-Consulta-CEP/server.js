const express = require('express');
const fetch = require('node-fetch');
const path = require('path');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.post('/consulta-cep', async (req, res) => {
  const cep = req.body.cep.replace(/\D/g, ''); // Remove caracteres não numéricos

  try {
    const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    const data = await response.json();

    if (data.erro) {
      res.status(404).json({ error: 'CEP não encontrado' });
    } else {
      res.json(data);
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao consultar o ViaCEP' });
  }
});

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});