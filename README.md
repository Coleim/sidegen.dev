# Sidegen.dev

Générateur d'idées de side projects pour développeurs, avec roadmap IA.

## Fonctionnalités
- Formulaire pour critères (langage, niveau, temps, objectif, type)
- Génération d'une idée de projet et roadmap via GPT-4-turbo (OpenAI)
- UI responsive, design moderne (React + TailwindCSS)
- Carte projet, loader, gestion d'erreur

## Installation

1. Clone le repo et installe les dépendances :
   ```bash
   npm install
   ```
2. Copie `.env.example` en `.env.local` et ajoute ta clé OpenAI :
   ```bash
   cp .env.example .env.local
   # puis édite .env.local
   ```
3. Lance le projet en local :
   ```bash
   npm run dev
   ```

## Déploiement

- Peut être déployé sur Vercel, Netlify, etc. (site statique possible)

## Configuration

- Ajoute ta clé OpenAI dans `.env.local` :
  ```env
  OPENAI_API_KEY=sk-xxxxxxx
  ```

## Roadmap
- Sauvegarde localStorage (à venir)
- Bouton GitHub footer

---

© Sidegen.dev
