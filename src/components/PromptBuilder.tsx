type Criteria = {
  language: string;
  level: string;
  time: string;
  goal: string;
  type: string;
};

export default function PromptBuilder(criteria: Criteria) {
  return `Tu es un assistant pour développeur. Génère une idée de side project originale et une roadmap détaillée selon ces critères :\n
- Langage préféré : ${criteria.language}\n- Niveau : ${criteria.level}\n- Temps dispo / semaine : ${criteria.time}\n- Objectif perso : ${criteria.goal}\n- Type de projet : ${criteria.type}\n
Réponds au format JSON strict :\n{
  "name": "Nom du projet",
  "description": "Description courte",
  "stack": ["tech1", "tech2", ...],
  "roadmap": [
    { "session": 1, "title": "Titre étape", "description": "Détail étape", "estimation": "2h" },
    ...
  ]
}
\nSois concis, créatif, et adapte la roadmap au temps dispo et au niveau.`;
} 