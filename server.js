const express = require('express');
const os = require('os');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

// ---- Données d'exemple (à remplacer plus tard par une vraie base de données) ----
const annonces = [
  {
    id: 1,
    categorie: 'Transfert',
    titre: 'Un jeune milieu de terrain sénégalais attire l\'attention de plusieurs clubs européens',
    resume: 'Formé dans un centre de formation local, le joueur de 19 ans multiplie les prestations remarquées ce trimestre.',
    date: '18 août 2026',
    tag: 'transfert'
  },
  {
    id: 2,
    categorie: 'Résultat',
    titre: 'Large victoire à l\'extérieur pour l\'équipe nationale en match de préparation',
    resume: 'Une performance collective solide en vue des prochaines échéances continentales.',
    date: '17 août 2026',
    tag: 'resultat'
  },
  {
    id: 3,
    categorie: 'Blessure',
    titre: 'Un défenseur central absent plusieurs semaines après un examen médical',
    resume: 'Le staff médical confirme une indisponibilité de courte durée sans intervention chirurgicale.',
    date: '16 août 2026',
    tag: 'sante'
  },
  {
    id: 4,
    categorie: 'Officiel',
    titre: 'Un nouvel entraîneur adjoint rejoint le staff technique du club',
    resume: 'Une arrivée pensée pour renforcer l\'encadrement tactique avant la reprise de la compétition.',
    date: '15 août 2026',
    tag: 'officiel'
  },
  {
    id: 5,
    categorie: 'Calendrier',
    titre: 'Le calendrier de la prochaine saison a été dévoilé par la fédération',
    resume: 'Coup d\'envoi prévu le mois prochain avec un format de compétition légèrement modifié.',
    date: '14 août 2026',
    tag: 'calendrier'
  },
  {
    id: 6,
    categorie: 'Transfert',
    titre: 'Un attaquant confirme vouloir prolonger son contrat malgré les sollicitations',
    resume: 'Le joueur a exprimé son attachement au club dans une déclaration à la presse locale.',
    date: '13 août 2026',
    tag: 'transfert'
  }
];

function layout(content, page = '') {
  return `
    <!DOCTYPE html>
    <html lang="fr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>SAGFA Sport — Annonces Football Professionnel</title>
        <link rel="stylesheet" href="/style.css">
    </head>
    <body>
        <header class="topbar">
            <div class="topbar-inner">
                <a href="/" class="brand">
                    <span class="brand-mark">⚽</span>
                    <span class="brand-word">SAGFA<span>SPORT</span></span>
                </a>
                <nav class="nav">
                    <a href="/" class="${page === 'accueil' ? 'active' : ''}">Accueil</a>
                    <a href="/annonces" class="${page === 'annonces' ? 'active' : ''}">Toutes les annonces</a>
                    <a href="/#transferts" class="${page === '' ? '' : ''}">Transferts</a>
                    <a href="/#resultats">Résultats</a>
                    <a href="/#contact" class="nav-cta">Contact</a>
                </nav>
            </div>
        </header>

        ${content}

        <footer class="footer">
            <div class="footer-inner">
                <div>
                    <div class="brand brand-footer">
                        <span class="brand-mark">⚽</span>
                        <span class="brand-word">SAGFA<span>SPORT</span></span>
                    </div>
                    <p class="footer-text">Toute l'actualité du football professionnel : transferts, résultats, calendriers et communiqués officiels.</p>
                </div>
                <div class="footer-col">
                    <h4>Rubriques</h4>
                    <a href="/#transferts">Transferts</a>
                    <a href="/#resultats">Résultats</a>
                    <a href="/#calendrier">Calendrier</a>
                    <a href="/#officiel">Communiqués officiels</a>
                </div>
                <div class="footer-col">
                    <h4>Le site</h4>
                    <a href="/annonces">Toutes les annonces</a>
                    <a href="/#contact">Nous contacter</a>
                </div>
            </div>
            <div class="footer-bottom">
                <span>&copy; ${new Date().getFullYear()} SAGFA Sport — Toutes annonces à titre informatif</span>
                <span>Hébergé sur ${os.hostname()}</span>
            </div>
        </footer>
    </body>
    </html>
  `;
}

function carte(a) {
  return `
    <article class="carte" data-tag="${a.tag}">
        <div class="carte-top">
            <span class="badge badge--${a.tag}">${a.categorie}</span>
            <span class="carte-date">${a.date}</span>
        </div>
        <h3>${a.titre}</h3>
        <p>${a.resume}</p>
        <a href="/annonces/${a.id}" class="btn btn--ghost btn--sm">Lire l'annonce →</a>
    </article>
  `;
}

// ---- Page d'accueil ----
app.get('/', (req, res) => {
  const content = `
    <section class="hero">
        <div class="hero-inner">
            <span class="hero-badge">🔴 Édition du jour</span>
            <h1>L'actualité du football professionnel, en direct.</h1>
            <p>Transferts, résultats, blessures et communiqués officiels — toutes les annonces du monde du football réunies au même endroit.</p>
            <div class="hero-actions">
                <a href="/annonces" class="btn btn--primary">Voir toutes les annonces</a>
                <a href="#transferts" class="btn btn--outline">Derniers transferts</a>
            </div>
            <div class="hero-stats">
                <div><strong>${annonces.length}+</strong><span>Annonces publiées</span></div>
                <div><strong>24/7</strong><span>Suivi de l'actualité</span></div>
                <div><strong>6</strong><span>Rubriques couvertes</span></div>
            </div>
        </div>
    </section>

    <section class="filters" id="transferts">
        <div class="filters-inner">
            <button class="chip chip--active" data-filter="all">Toutes</button>
            <button class="chip" data-filter="transfert">Transferts</button>
            <button class="chip" data-filter="resultat">Résultats</button>
            <button class="chip" data-filter="sante">Blessures</button>
            <button class="chip" data-filter="officiel">Officiel</button>
            <button class="chip" data-filter="calendrier">Calendrier</button>
        </div>
    </section>

    <section class="grid-section" id="resultats">
        <div class="grid-inner">
            <div class="grid" id="grille-annonces">
                ${annonces.map(carte).join('')}
            </div>
        </div>
    </section>

    <section class="cta-band" id="contact">
        <div class="cta-inner">
            <h2>Une information à nous transmettre ?</h2>
            <p>Clubs, agents ou journalistes : contactez notre rédaction pour publier un communiqué officiel.</p>
            <a href="mailto:redaction@sagfasport.example" class="btn btn--primary">Contacter la rédaction</a>
        </div>
    </section>

    <script src="/app.js"></script>
  `;
  res.send(layout(content, 'accueil'));
});

// ---- Liste complète des annonces ----
app.get('/annonces', (req, res) => {
  const content = `
    <section class="page-header">
        <div class="page-header-inner">
            <h1>Toutes les annonces</h1>
            <p>${annonces.length} annonces publiées récemment</p>
        </div>
    </section>
    <section class="grid-section">
        <div class="grid-inner">
            <div class="grid">
                ${annonces.map(carte).join('')}
            </div>
        </div>
    </section>
  `;
  res.send(layout(content, 'annonces'));
});

// ---- Détail d'une annonce ----
app.get('/annonces/:id', (req, res) => {
  const a = annonces.find(x => x.id === parseInt(req.params.id, 10));
  if (!a) {
    return res.status(404).send(layout(`
      <section class="page-header">
        <div class="page-header-inner">
            <h1>Annonce introuvable</h1>
            <p><a href="/annonces" class="btn btn--primary">Retour aux annonces</a></p>
        </div>
      </section>
    `));
  }
  const content = `
    <section class="page-header">
        <div class="page-header-inner">
            <span class="badge badge--${a.tag}">${a.categorie}</span>
            <h1>${a.titre}</h1>
            <p class="carte-date">${a.date}</p>
        </div>
    </section>
    <section class="grid-section">
        <div class="grid-inner detail-body">
            <p>${a.resume}</p>
            <p>D'autres détails seront ajoutés au fil des prochaines mises à jour de cette annonce. Revenez consulter cette page régulièrement pour suivre son évolution.</p>
            <a href="/annonces" class="btn btn--ghost">← Retour à toutes les annonces</a>
        </div>
    </section>
  `;
  res.send(layout(content, 'annonces'));
});

app.listen(PORT, () => {
  console.log(`🚀 SAGFA Sport lancé sur http://localhost:${PORT}`);
});