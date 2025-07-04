import { NextRequest, NextResponse } from "next/server";

const MOCK_PROJECT = {
  name: "DevLinker",
  description: "Une plateforme pour connecter des développeurs autour de side projects communs.",
  stack: ["Next.js", "TypeScript", "TailwindCSS", "Prisma"],
  roadmap: [
    { session: 1, title: "Initialisation du projet", description: "Création du repo, configuration Next.js et Tailwind.", estimation: "2h" },
    { session: 2, title: "Modélisation des utilisateurs", description: "Définir le modèle User avec Prisma et la base SQLite.", estimation: "2h" },
    { session: 3, title: "Page d'accueil et inscription", description: "Créer la landing page et le formulaire d'inscription.", estimation: "3h" },
    { session: 4, title: "Matching de projets", description: "Logique de suggestion de projets selon les profils.", estimation: "3h" },
    { session: 5, title: "UI responsive et polish", description: "Améliorer le design, tests, et déploiement.", estimation: "2h" },
  ],
};

export async function POST(req: NextRequest) {
  const { prompt } = await req.json();
  if (!prompt) {
    return NextResponse.json({ error: "Prompt manquant" }, { status: 400 });
  }
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === 'sk-xxxxxxx') {
    // Mode mock : retourne un projet exemple
    return NextResponse.json({ project: MOCK_PROJECT, mock: true });
  }
  try {
    const res = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4-turbo",
        messages: [
          { role: "system", content: "Tu es un assistant pour développeur." },
          { role: "user", content: prompt },
        ],
        max_tokens: 1200,
        temperature: 0.8,
      }),
    });
    if (!res.ok) {
      const error = await res.text();
      return NextResponse.json({ error }, { status: 500 });
    }
    const data = await res.json();
    const content = data.choices?.[0]?.message?.content;
    let project = null;
    try {
      project = JSON.parse(content);
    } catch {
      return NextResponse.json({ error: "Erreur de parsing JSON" }, { status: 500 });
    }
    return NextResponse.json({ project });
  } catch (err: unknown) {
    return NextResponse.json({ error: err instanceof Error ? err.message : "Erreur serveur" }, { status: 500 });
  }
} 