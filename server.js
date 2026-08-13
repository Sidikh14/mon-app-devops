const express = require('express');
const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send(`
        <div style="text-align: center; font-family: sans-serif; padding-top: 50px;">
            <h1 style="color: #2b6cb0;">🚀 SIDIKH SENE TESTE DEVOPS !</h1>
            <p style="font-size: 1.2rem; color: #4a5568;">Cette application tourne dans un conteneur Docker que je nomme SAGFA.</p>
            <span style="background: #e2e8f0; padding: 10px 20px; border-radius: 5px; font-weight: bold;">g
                Status: OK 🟢
            </span>
        </div>
        <div backgroud-color:red></div>
    `);
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur http://localhost:${PORT}`);
    const imageInput = document.getElementById('imageInput');

imageInput.addEventListener('change', function(event) {
  const file = event.target.files[0]; // Récupère le premier fichier choisi

  if (file) {
    const reader = new FileReader();

    reader.onload = function(e) {
      document.body.style.backgroundImage = `url('${e.target.result}')`;
    };

    reader.readAsDataURL(file);
});
