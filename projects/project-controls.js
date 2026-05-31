(function () {
  const state = {
    lang: localStorage.getItem("portfolio.lang") || document.documentElement.lang || "fr",
    theme: localStorage.getItem("portfolio.theme") || "light"
  };

  const originals = {};

  function translate() {
    document.documentElement.lang = state.lang;
    document.querySelectorAll("[data-fr][data-en]").forEach((node) => {
      node.textContent = node.dataset[state.lang];
    });
    applyProjectDictionary();
  }

  function setText(selector, text) {
    const node = document.querySelector(selector);
    if (node && text) node.textContent = text;
  }

  function saveOriginal(selector) {
    if (!originals[selector]) {
      const node = document.querySelector(selector);
      if (node) originals[selector] = node.textContent;
    }
  }

  function applyProjectDictionary() {
    const project = document.body.dataset.project;
    const page = translations[project];
    if (!page) return;

    if (state.lang === "en") {
      Object.keys(originals).forEach(function(selector) {
        setText(selector, originals[selector]);
      });
      return;
    }

    if (!page[state.lang]) return;

    Object.entries(page[state.lang]).forEach(function([selector, text]) {
      saveOriginal(selector);
      setText(selector, text);
    });
  }

  function updateButtons() {
    document.querySelectorAll("[data-set-lang]").forEach(function(b) {
      b.setAttribute("aria-pressed", String(b.dataset.setLang === state.lang));
    });
    document.querySelectorAll("[data-set-theme]").forEach(function(b) {
      b.setAttribute("aria-pressed", String(b.dataset.setTheme === state.theme));
    });
  }

  function apply() {
    document.body.dataset.theme = state.theme;
    translate();
    updateButtons();
  }

  const translations = {
    mirakl: {
      fr: {
        ".nav-links a:nth-child(1)": "Démo",
        ".nav-links a:nth-child(2)": "Pitch",
        ".nav-links a:nth-child(3)": "Expérience",
        ".nav-links a:nth-child(4)": "Décision",
        ".nav-links a:nth-child(5)": "Stack",
        ".nav-links a:nth-child(6)": "Événement",
        ".hero .eyebrow": "Mirakl Connect — Supply Brain",
        ".lead": "Dashboard supply chain développé en 72 heures pour l'hackathon Mirakl Connect. L'enjeu : piloter une marketplace cross-canaux (Amazon + Google Shopping, FR/IT/DE) sans rupture ni surstock, avec la CSRD 2026 comme contrainte d'exécution. Six agents IA orchestrés simulent en continu coût, délai et CO₂ — l'humain garde l'arbitrage final.",
        ".hero-card h2": "Cadre du projet",
        ".meta:nth-child(1) span:first-child": "Contexte",
        ".meta:nth-child(1) span:last-child": "Hackathon Mirakl Connect",
        ".meta:nth-child(2) span:first-child": "Équipe",
        ".meta:nth-child(2) span:last-child": "7 personnes",
        ".meta:nth-child(3) span:first-child": "Durée",
        ".meta:nth-child(3) span:last-child": "5 jours · 72h de build",
        ".meta:nth-child(4) span:first-child": "Statut",
        ".meta:nth-child(4) span:last-child": "Finaliste",
        "#demo .eyebrow": "Démo",
        "#demo h2": "Voir le concept en action.",
        "#demo .section-note": "Cette vidéo présente l'expérience utilisateur et le pitch.",
        "#pitch .eyebrow": "Pitch deck",
        "#pitch h2": "Pitch Deck.",
        "#pitch .section-note": "Pitch exécutif — Hackathon Mirakl Connect, 2026.",
        "#experience .eyebrow": "Vision produit",
        "#experience h2": "Moins de bruit. Plus de décisions.",
        "#experience .section-note": "L'interface est pensée autour de l'intention : faire émerger ce qui compte au bon moment.",
        "#experience .panel:nth-child(1) h3": "Stock proactif",
        "#experience .panel:nth-child(1) p": "200 SKUs sur Amazon et Google Shopping (FR/IT/DE) avec stock partagé. Le barycentre supply recalcule l'allocation optimale entre canaux, entrepôts et marges — avant qu'une rupture ne devienne un impact opérationnel.",
        "#experience .panel:nth-child(2) h3": "Interface intent-driven",
        "#experience .panel:nth-child(2) p": "Le dashboard se reconfigure en temps réel selon l'intention de l'utilisateur. Finance, ops, marketing, éco sont des points de départ — n'importe quelle vue ad hoc est générée à la volée.",
        "#experience .panel:nth-child(3) h3": "Arbitrage humain",
        "#experience .panel:nth-child(3) p": "Six agents Dust simulent simultanément coût × délai × CO₂. Les recommandations sont générées ; la décision finale revient à l'opérateur avec toutes les contraintes visibles.",
        "#experience .panel:nth-child(4) h3": "CSRD 2026",
        "#experience .panel:nth-child(4) p": "La conformité environnementale est une contrainte d'exécution, pas un reporting a posteriori. L'empreinte carbone de chaque arbitrage est calculée en temps réel.",
        "#decision .eyebrow": "Workflow décisionnel",
        "#decision h2": "Du signal à l'arbitrage.",
        "#decision .section-note": "Une boucle simple pour passer du signal marketplace à l'action opérateur.",
        "#decision .step:nth-child(1) h3": "Détecter",
        "#decision .step:nth-child(1) p": "Identifier tôt les tensions de stock et les déséquilibres marketplace.",
        "#decision .step:nth-child(2) h3": "Simuler",
        "#decision .step:nth-child(2) p": "Comparer les options selon le coût, le délai et l'impact CO₂.",
        "#decision .step:nth-child(3) h3": "Recommander",
        "#decision .step:nth-child(3) p": "Faire émerger l'action la plus pertinente au lieu d'un graphique statique de plus.",
        "#decision .step:nth-child(4) h3": "Décider",
        "#decision .step:nth-child(4) p": "Permettre à l'opérateur d'arbitrer avec contexte, confiance et contraintes visibles.",
        "#stack .eyebrow": "Architecture",
        "#stack h2": "Une stack en 4 couches.",
        "#stack .section-note": "React 19, Supabase, Dust.tt et OpenAI orchestrés en un pipeline décisionnel cohérent.",
        "#stack .step:nth-child(1) .step-num": "01 · UI",
        "#stack .step:nth-child(1) p": "Interface intent-driven. Finance, ops, marketing, éco + vues ad hoc générées à la volée. Recharts, Leaflet, i18next (FR/EN).",
        "#stack .step:nth-child(2) .step-num": "02 · Agents",
        "#stack .step:nth-child(2) p": "Monitoring, Supply Allocation, Pricing, EcoFlow, Predictive, Orchestrateur. Simulation coût × délai × CO₂ en continu via SSE.",
        "#stack .step:nth-child(3) .step-num": "03 · Outils",
        "#stack .step:nth-child(3) p": "Couche d'exécution exposée aux agents. Automatisation des workflows, proxy API et orchestration cross-module.",
        "#stack .step:nth-child(4) .step-num": "04 · Data",
        "#stack .step:nth-child(4) p": "21 tables · 12 vues SQL temps réel. Schéma full event-driven. RPC safe_query (NL→SQL via GPT-4o) + get_oversells.",
        "#evenement .eyebrow": "Hackathon",
        "#evenement h2": "L'événement.",
        "#evenement .section-note": "72 heures, une équipe, un pitch — Mirakl Connect, Paris.",
        ".cta .btn:nth-child(1)": "← Retour à la workstation",
        ".cta .btn:nth-child(2)": "Voir le pitch",
        ".cta .btn:nth-child(3)": "Voir la démo",
        "footer span:nth-child(2)": "Prototype produit · UX décisionnelle · IA appliquée"
      },
      en: {}
    },
    payfit: {
      fr: {
        ".nav-links a:nth-child(1)": "Concept",
        ".nav-links a:nth-child(2)": "Pipeline",
        ".nav-links a:nth-child(3)": "Données juridiques",
        ".nav-links a:nth-child(4)": "SEO/GEO",
        ".nav-links a:nth-child(5)": "Architecture",
        ".hero .eyebrow": "Hackathon · Payfit",
        "h1": "Hackathon Payfit",
        ".lead": "Collecte de données et veille concurrentielle autour du contenu juridique, de la paie et des opportunités SEO/GEO. Deux axes parallèles : un pipeline juridique sur les APIs PISTE, et une couche scraping qui cartographie le positionnement de PayFit face à ses concurrents.",
        ".hero-card h2": "Cadre du projet",
        ".meta:nth-child(1) span:last-child": "Hackathon / projet data",
        ".meta:nth-child(2) span:first-child": "Domaine",
        ".meta:nth-child(2) span:last-child": "RH, paie, contenu juridique",
        ".meta:nth-child(3) span:first-child": "Sources",
        ".meta:nth-child(4) span:first-child": "Sorties",
        ".meta:nth-child(4) span:last-child": "JSON, CSV, rapports mots-clés",
        "#concept .eyebrow": "Concept",
        "#concept h2": "Deux tracks. Un problème de données.",
        "#concept .section-note": "Intelligence juridique et contenu, assemblés depuis des sources qui n'étaient jamais censées être interrogées ensemble.",
        "#concept .panel:nth-child(1) h3": "Le problème",
        "#concept .panel:nth-child(1) p": "La donnée juridique et RH est publique mais fragmentée — des milliers d'articles sur Légifrance, des règles URSSAF sans format standard, et des décisions Judilibre derrière des APIs non documentées. Côté SEO, aucun dataset ne cartographie la couverture de PayFit face à Factorial, Lucca, Cegid ou Sage.",
        "#concept .panel:nth-child(2) h3": "La solution",
        "#concept .panel:nth-child(2) p": "Un pipeline Python en deux axes complémentaires : une couche d'ingestion juridique connectée à Légifrance, URSSAF et Judilibre via les APIs PISTE, et une couche d'intelligence contenu qui crawle PayFit et quatre concurrents pour extraire thèmes, densité de mots-clés et positionnement éditorial.",
        "#pipeline .eyebrow": "Vue d'ensemble",
        "#pipeline h2": "Des sources publiques aux datasets exploitables.",
        "#pipeline .section-note": "Le projet combine deux axes : récupération de données juridiques officielles et intelligence de contenu orientée SEO.",
        ".flow .step:nth-child(1) h3": "Collecter",
        ".flow .step:nth-child(1) p": "Des clients API authentifiés PISTE attaquent Légifrance (~21 000 articles), URSSAF (1 334 règles, sans auth) et Judilibre (décisions par thème). Crawl4AI et Playwright scrapent les articles PayFit par catégorie et sitemap, plus quatre concurrents.",
        ".flow .step:nth-child(2) h3": "Normaliser",
        ".flow .step:nth-child(2) p": "Les réponses API hétérogènes et le HTML scrapé sont aplatis en DataFrames Pandas structurés. Des flags --resume gèrent les extractions longues ; des convertisseurs JSON-to-CSV produisent des fichiers prêts à l'usage.",
        ".flow .step:nth-child(3) h3": "Analyser",
        ".flow .step:nth-child(3) p": "Mots-clés classés par thème, couverture concurrentielle mappée sur Factorial, Lucca, Cegid et Sage. Les métadonnées d'articles (auteur, temps de lecture, structure) alimentent les rapports de positionnement éditorial.",
        ".flow .step:nth-child(4) h3": "Activer",
        ".flow .step:nth-child(4) p": "Les sorties arrivent dans output/ en JSON, CSV et rapports Markdown. Les datasets juridiques alimentent des workflows de recherche ; les rapports mots-clés identifient les gaps SEO/GEO directement actionnables.",
        "#legal .eyebrow": "Données juridiques",
        "#legal h2": "Construire une base juridique réutilisable.",
        "#legal .section-note": "Le pipeline juridique récupère des références officielles via APIs publiques françaises et les exporte en fichiers structurés.",
        "#legal .panel:nth-child(1) h3": "Légifrance",
        "#legal .panel:nth-child(1) p": "Export complet ou limité des articles du Code du travail (~21 000) via OAuth PISTE. Supporte --limit pour validation rapide, --resume pour reprendre une extraction interrompue, --delay configurable. Export JSON et CSV.",
        "#legal .panel:nth-child(2) h3": "URSSAF",
        "#legal .panel:nth-child(2) p": "Collecte de 1 334 règles mon-entreprise sans authentification — le pipeline le plus simple du projet. Exporté en JSON et CSV. Pas de limite de taux ; idéal comme dataset de référence stable.",
        "#legal .panel:nth-child(3) h3": "Judilibre",
        "#legal .panel:nth-child(3) p": "Décisions récupérées par thème de droit du travail (licenciement, congés…) via OAuth PISTE ou clé API dédiée. 5 décisions par thème par défaut, extensible. Sortie : articles_judilibre.json.",
        "#seo .eyebrow": "Intelligence SEO / GEO",
        "#seo h2": "Crawler PayFit et benchmarker les concurrents.",
        "#seo .section-note": "Une couche de scraping explore les fiches pratiques PayFit et les blogs concurrents pour identifier thématiques, couverture et opportunités de mots-clés.",
        "#seo .panel:nth-child(1) h3": "Crawl contenu PayFit",
        "#seo .panel:nth-child(1) p": "Crawl par catégorie et sitemap des articles PayFit avec Crawl4AI et Playwright. Extrait titre, métadonnées, temps de lecture, auteur et structure. Alimente l'analyse de densité de mots-clés et de couverture thématique.",
        "#seo .panel:nth-child(2) h3": "Benchmark concurrentiel",
        "#seo .panel:nth-child(2) p": "Workflows d'extraction parallèles pour Factorial, Lucca, Cegid et Sage. Le contenu blog et aide de chaque concurrent est scrapé pour couverture thématique, fréquence éditoriale et chevauchement de mots-clés avec PayFit.",
        "#seo .panel:nth-child(3) h3": "Rapports mots-clés",
        "#seo .panel:nth-child(3) p": "Mots-clés classés par thème et volume de couverture. Sorties Markdown et JSON réutilisables pour une stratégie de contenu ou un brief GEO. Identifie les topics sans couverture et ceux saturés chez tous les acteurs.",
        "#architecture .eyebrow": "Architecture",
        "#architecture h2": "Outillage Python ciblé.",
        "#architecture .section-note": "APIs publiques, scraping authentifié et pipelines Pandas — dépendances minimales, rendement maximum.",
        "#architecture .tech-row:nth-child(2) .tech-key": "APIs juridiques",
        "#architecture .tech-row:nth-child(3) .tech-key": "Scraping SEO",
        "#architecture .tech-row:nth-child(4) .tech-key": "Traitement données",
        "#architecture .tech-row:nth-child(6) .tech-key": "Formats de sortie",
        "#architecture .tech-row:nth-child(7) .tech-key": "Structure projet",
        "#architecture .tech-row:nth-child(8) .tech-key": "Résilience",
        ".cta .btn:nth-child(1)": "Retour à la workstation"
      },
      en: {}
    },
    synapse: {
      fr: {
        ".nav-links a:nth-child(1)": "Concept",
        ".nav-links a:nth-child(2)": "Démo",
        ".nav-links a:nth-child(3)": "Workflow",
        ".nav-links a:nth-child(4)": "RAG",
        ".nav-links a:nth-child(5)": "Fonctionnalités ML",
        ".nav-links a:nth-child(6)": "Architecture",
        ".hero .eyebrow": "HAL Science · chatbot RAG",
        ".lead": "Assistant de recherche académique pour explorer des thèses françaises via HAL, lire des PDFs et poser des questions contextuelles avec réponses sourcées, résumés et recommandations sémantiques.",
        ".hero-card h2": "Cadre du projet",
        ".meta:nth-child(1) span:first-child": "Type",
        ".meta:nth-child(1) span:last-child": "Assistant IA académique",
        ".meta:nth-child(2) span:first-child": "Source",
        ".meta:nth-child(2) span:last-child": "API HAL Science + PDFs",
        ".meta:nth-child(3) span:first-child": "Cœur",
        ".meta:nth-child(3) span:last-child": "RAG, classification, résumés",
        ".meta:nth-child(4) span:first-child": "Interface",
        ".meta:nth-child(4) span:last-child": "Streamlit · FR/EN",
        "#concept .eyebrow": "Concept",
        "#concept h2": "La recherche sans la friction.",
        "#concept .section-note": "Une interface du début à la compréhension — sans changer d'onglet, sans suivi manuel.",
        "#concept .panel:nth-child(1) h3": "Le problème",
        "#concept .panel:nth-child(1) p": "Faire de la recherche académique, c'est jongler entre HAL, télécharger des PDFs, parcourir 80 pages pour trouver une section pertinente, et noter manuellement quelle thèse dit quoi. Aucun outil ne relie ces étapes — chacun résout une partie et ignore le reste.",
        "#concept .panel:nth-child(2) h3": "La solution",
        "#concept .panel:nth-child(2) p": "Synapse connecte l'API HAL Science à un pipeline RAG hybride et des modules ML dans une seule interface Streamlit. Chercher, classifier automatiquement, discuter avec le document, comparer des thèses similaires — sans quitter l'app. Chaque réponse remonte jusqu'au chunk exact dont elle est issue.",
        "#demo .eyebrow": "Démo",
        "#demo h2": "Voir Synapse en action.",
        "#demo .section-note": "Un aperçu du workflow de recherche : chercher, sélectionner un document et interagir avec l'assistant.",
        "#workflow .eyebrow": "Workflow utilisateur",
        "#workflow h2": "Chercher, lire, questionner, comparer.",
        "#workflow .section-note": "Synapse aide les chercheurs à passer d'une recherche large à une compréhension fine des documents.",
        ".flow .step:nth-child(1) h3": "Chercher HAL",
        ".flow .step:nth-child(1) p": "Interroger les archives ouvertes françaises (API HAL Science) avec filtres par mot-clé, domaine et méthodologie. Les résultats affichent des métadonnées enrichies — auteurs, institution, résumé, année — avec badges ML. La couche de recherche gère la pagination et livre des objets structurés.",
        ".flow .step:nth-child(2) h3": "Classifier",
        ".flow .step:nth-child(2) p": "Un pipeline détecte le domaine (8 catégories : info, médecine, éco…), la méthodologie (5 types : expérimental, théorique, appliqué…) et le type de contribution. Des heuristiques rule-based passent en premier ; un mode transformers prend le relais sur les cas ambigus.",
        ".flow .step:nth-child(3) h3": "Discuter avec le PDF",
        ".flow .step:nth-child(3) p": "Cliquer sur une thèse télécharge et vectorise son PDF. PyMuPDF extrait le texte ; FAISS indexe les chunks. Une interface côte à côte permet de poser des questions en voyant les pages sources. Chaque réponse cite les passages exacts utilisés.",
        ".flow .step:nth-child(4) h3": "Recommander",
        ".flow .step:nth-child(4) p": "Les embeddings OpenAI représentent chaque document en vecteur sémantique. Le moteur trouve les k plus proches voisins dans FAISS et remonte des thèses similaires par contenu et métadonnées — pas seulement par mots-clés.",
        "#rag .eyebrow": "Système RAG",
        "#rag h2": "Des réponses contextualisées et traçables.",
        "#rag .section-note": "La couche RAG extrait le contenu PDF, le découpe, l'indexe et répond aux questions avec citations des passages retrouvés.",
        "#rag .panel:nth-child(1) h3": "Traitement PDF",
        "#rag .panel:nth-child(1) p": "PyMuPDF extrait le texte intégral avant qu'une stratégie de chunking hiérarchique découpe en sections chevauchantes. Taille et overlap sont configurables. Chaque chunk est embedé avec text-embedding-ada-002 et stocké dans FAISS. Le pipeline gère colonnes multiples, notes et sections de références.",
        "#rag .panel:nth-child(2) h3": "Recherche vectorielle",
        "#rag .panel:nth-child(2) p": "FAISS stocke et retrouve les embeddings en latence sub-seconde. Un top-k configurable extrait les chunks les plus pertinents ; une passe MMR optionnelle diversifie les résultats pour éviter le contexte redondant. Le reranking BM25 ajoute un signal lexical.",
        "#rag .panel:nth-child(3) h3": "Expérience chat",
        "#rag .panel:nth-child(3) p": "LangChain orchestre la boucle RAG : les chunks sont injectés dans la fenêtre de contexte avec la question, GPT-4o génère une réponse ancrée. Le visualiseur PDF défile jusqu'aux pages citées. L'historique est préservé d'un tour à l'autre dans la session.",
        "#ml .eyebrow": "Fonctionnalités ML",
        "#ml h2": "Plus que du retrieval.",
        "#ml .section-note": "Synapse ajoute classification, résumés multi-niveaux et recommandations pour naviguer plus vite dans un corpus.",
        "#ml .panel:nth-child(1) h3": "Classification",
        "#ml .panel:nth-child(1) p": "Détection automatique du domaine (8 catégories : info, médecine, éco, droit…), de la méthodologie (5 types : expérimental, théorique, appliqué, revue, mixte) et du type de contribution. Heuristiques rule-based en premier ; mode transformers sur les cas ambigus à vocabulaire spécialisé.",
        "#ml .panel:nth-child(2) h3": "Résumés",
        "#ml .panel:nth-child(2) p": "Trois niveaux pour différents contextes de lecture : TL;DR (2–3 phrases, tri rapide), exécutif (paragraphe structuré, prise de décision), détaillé (méthode, résultats et contribution). Générés via GPT-4o avec le contexte du document injecté.",
        "#ml .panel:nth-child(3) h3": "Recommandations",
        "#ml .panel:nth-child(3) p": "Les embeddings OpenAI représentent chaque document vu en vecteur sémantique. Le moteur interroge l'index FAISS pour les k plus proches voisins et classe les résultats par score combiné de proximité de contenu et d'alignement de métadonnées (domaine, méthodologie, institution).",
        "#architecture .eyebrow": "Architecture",
        "#architecture h2": "Application IA Python.",
        "#architecture .section-note": "API HAL, RAG hybride et modules ML assemblés dans une interface Streamlit avec traçabilité complète des sources.",
        "#architecture .tech-row:nth-child(3) .tech-key": "Recherche",
        "#architecture .tech-row:nth-child(5) .tech-key": "PDF",
        "#architecture .tech-row:nth-child(6) .tech-key": "Retrieval",
        "#architecture .tech-row:nth-child(7) .tech-key": "Modules ML",
        "#architecture .tech-row:nth-child(8) .tech-key": "Structure",
        ".cta .btn:nth-child(1)": "Retour à la workstation"
      },
      en: {}
    },
    together: {
      fr: {
        ".nav-links a:nth-child(1)": "Concept",
        ".nav-links a:nth-child(2)": "Fonctionnalités",
        ".nav-links a:nth-child(3)": "Workflow",
        ".nav-links a:nth-child(4)": "Architecture",
        ".hero .eyebrow": "Application sociale mobile-first",
        ".lead": "Application sociale pour organiser des sorties entre amis, du chat de groupe à la proposition, au vote, à la confirmation, au RSVP et aux moments partagés. L'objectif produit : remplacer les conversations dispersées par un flux de décision clair.",
        ".hero-card h2": "Cadre du projet",
        ".meta:nth-child(1) span:last-child": "Application web mobile-first",
        ".meta:nth-child(2) span:first-child": "Cœur",
        ".meta:nth-child(2) span:last-child": "Groupes, chat, sorties, feed",
        ".meta:nth-child(3) span:first-child": "Backend",
        ".meta:nth-child(4) span:first-child": "Déploiement",
        ".meta:nth-child(4) span:last-child": "App Next.js prête pour Vercel",
        "#concept .eyebrow": "Concept",
        "#concept h2": "Un seul flux pour chaque sortie.",
        "#concept .section-note": "Together remplace dix fils de messages par un seul flux de décision cohérent.",
        "#concept .panel:nth-child(1) h3": "Le problème",
        "#concept .panel:nth-child(1) p": "Organiser une sortie, c'est jongler entre trois apps, des réponses à moitié engagées et aucune source de vérité sur qui vient vraiment. Les décisions se dissolvent dans le bruit avant que quelqu'un s'engage.",
        "#concept .panel:nth-child(2) h3": "La solution",
        "#concept .panel:nth-child(2) p": "Un seul endroit pour tout : proposer, voter, confirmer, RSVP et se souvenir. Conçu mobile-first avec un rendu proche d'une app native iOS/Android — navigation par onglets, stories, feed social et cartes.",
        "#features .eyebrow": "Fonctionnalités",
        "#features h2": "Tout en un seul endroit.",
        "#features .section-note": "Six surfaces produit, chacune résolvant un point de friction spécifique de la planification en groupe.",
        "#features .panel:nth-child(1) h3": "Groupes & Chat",
        "#features .panel:nth-child(1) p": "Messages en temps réel via Supabase Realtime, historique persisté en PostgreSQL. Les propositions et activités sont attachées au contexte de conversation pour que les plans restent liés à la discussion qui les a produits.",
        "#features .panel:nth-child(2) h3": "Workflow de sortie",
        "#features .panel:nth-child(2) p": "Proposition → vote → confirmation → RSVP → partage de moments. L'étape vote-vers-confirmation évite les plans à moitié engagés. Tout le monde connaît le statut sans avoir à demander.",
        "#features .panel:nth-child(3) h3": "Feed & Stories",
        "#features .panel:nth-child(3) p": "Publications photos, likes, commentaires et partage. Les Stories transforment les expériences partagées en mémoire durable du groupe et donnent à l'app une raison d'exister entre les sorties.",
        "#features .panel:nth-child(4) h3": "Carte & Lieux",
        "#features .panel:nth-child(4) p": "Cartes Leaflet avec datasets restaurants, bars et activités pour Paris. Filtre « Ouverts uniquement », infos prix/personne. Épingler un lieu et le partager directement dans une proposition de groupe sans quitter l'app.",
        "#features .panel:nth-child(5) h3": "Profils sociaux",
        "#features .panel:nth-child(5) p": "Comptes public/privé, graphe de follows, historique de sorties. Découverte sociale légère — le feed fait émerger ce que les amis planifient, pas seulement les groupes où vous êtes déjà.",
        "#features .panel:nth-child(6) h3": "Recommandations",
        "#features .panel:nth-child(6) p": "Suggestions de lieux par IA via OpenRouter/OpenAI selon les préférences du groupe, filtre budget et localisation. Vote multi-options pour que le groupe choisisse entre les propositions de l'IA.",
        "#workflow .eyebrow": "Workflow utilisateur",
        "#workflow h2": "De l'idée au souvenir partagé.",
        "#workflow .section-note": "Together structure le processus social souvent flou de l'organisation d'une sortie.",
        ".flow .step:nth-child(1) h3": "Discuter",
        ".flow .step:nth-child(1) p": "Le groupe est l'unité sociale. Chaque groupe dispose d'un chat dédié où les membres attachent des propositions, votent sur les sorties et coordonnent sans quitter le fil. Les souscriptions Supabase Realtime maintiennent chaque participant synchronisé en temps réel.",
        ".flow .step:nth-child(2) h3": "Voter",
        ".flow .step:nth-child(2) p": "Quand quelqu'un propose une sortie, le groupe vote avant confirmation. Les membres comparent les options, approuvent ou refusent, et le système fait émerger la proposition gagnante. Le flux vote-vers-confirmation évite les plans à moitié engagés.",
        ".flow .step:nth-child(3) h3": "RSVP",
        ".flow .step:nth-child(3) p": "Les sorties confirmées collectent les présences individuelles. Les membres se marquent présents, peut-être ou absents — l'organisateur voit un décompte en direct. Le groupe reste aligné sans créer un fil de messages dédié à la logistique.",
        ".flow .step:nth-child(4) h3": "Se souvenir",
        ".flow .step:nth-child(4) p": "Après la sortie, Moments, un feed social et des Stories transforment les expériences partagées en mémoire durable du groupe. Photos et réactions créent une continuité entre les sorties.",
        "#architecture .eyebrow": "Architecture",
        "#architecture h2": "Prototype full-stack.",
        "#architecture .section-note": "Next.js App Router, Supabase et providers IA assemblés en un produit mobile-first.",
        "#architecture .tech-row:nth-child(1) .tech-key": "Frontend",
        "#architecture .tech-row:nth-child(2) .tech-key": "Composants",
        "#architecture .tech-row:nth-child(3) .tech-key": "Auth & BDD",
        "#architecture .tech-row:nth-child(4) .tech-key": "Temps réel",
        "#architecture .tech-row:nth-child(6) .tech-key": "Routes API",
        "#architecture .tech-row:nth-child(7) .tech-key": "Carte",
        "#architecture .tech-row:nth-child(8) .tech-key": "Données Paris",
        "#architecture .tech-row:nth-child(9) .tech-key": "Déploiement",
        "#architecture .tech-row:nth-child(10) .tech-key": "Langage",
        ".cta .btn:nth-child(1)": "Retour à la workstation"
      },
      en: {}
    }
  };

  apply();

  document.querySelectorAll("[data-set-lang]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      state.lang = btn.dataset.setLang;
      localStorage.setItem("portfolio.lang", state.lang);
      document.querySelectorAll("[data-set-lang]").forEach(function(b) {
        b.setAttribute("aria-pressed", String(b.dataset.setLang === state.lang));
      });
      apply();
    });
  });

  document.querySelectorAll("[data-set-theme]").forEach(function(btn) {
    btn.addEventListener("click", function() {
      state.theme = btn.dataset.setTheme;
      localStorage.setItem("portfolio.theme", state.theme);
      document.querySelectorAll("[data-set-theme]").forEach(function(b) {
        b.setAttribute("aria-pressed", String(b.dataset.setTheme === state.theme));
      });
      apply();
    });
  });
})();
