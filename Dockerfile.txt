# 1. Utiliser une image officielle de Node.js légère
FROM node:18-alpine

# 2. Définir le répertoire de travail dans le conteneur
WORKDIR /app

# 3. Copier les fichiers de configuration et installer les dépendances
COPY package.json ./
RUN npm install

# 4. Copier le reste du code source
COPY server.js ./

# 5. Indiquer le port écouté
EXPOSE 3000

# 6. Commande de démarrage
CMD ["npm", "start"]