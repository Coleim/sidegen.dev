"use client";
import { useState, useRef } from "react";
import Form from "@/components/Form";
import ProjectResult from "@/components/ProjectResult";
import PromptBuilder from "@/components/PromptBuilder";

interface Criteria {
  language: string;
  level: string;
  time: string;
  goal: string;
  type: string;
}

interface Project {
  name: string;
  description: string;
  stack: string[];
  roadmap: {
    session: number;
    title: string;
    description: string;
    estimation: string;
  }[];
}

export default function Home() {
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const projectRef = useRef<HTMLDivElement>(null);
  const [lastCriteria, setLastCriteria] = useState<Criteria | null>(null);

  const handleGenerate = async (formValues: Criteria) => {
    setLoading(true);
    setError("");
    setProject(null);
    setHasSearched(true);
    setLastCriteria(formValues);
    try {
      const prompt = PromptBuilder(formValues);
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error("Erreur lors de la génération");
      const data = await res.json();
      setProject(data.project);
    } catch (err) {
      setError((err as Error).message || "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  // --- ETAPE 1 : HERO CENTRE ---
  if (!hasSearched) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center px-2 bg-transparent">
        <div className="flex flex-col items-center justify-center w-full max-w-2xl mx-auto">
          {/* Logo */}
          <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center shadow-lg mb-3">
            <span className="text-3xl font-black text-white drop-shadow-lg select-none">S</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-[0_2px_16px_rgba(59,130,246,0.5)] tracking-tight mb-4 text-center">Sidegen.dev</h1>
          <p className="text-xl md:text-2xl text-white font-medium drop-shadow-lg mb-8 text-center max-w-2xl">Trouve ton prochain side project en un clic, grâce à l&apos;<span className="text-blue-500 font-bold">IA</span>.</p>
          <div className="flex justify-center">
            <div className="w-full mx-auto">
              <Form onGenerate={handleGenerate} loading={loading} compact={true} />
              {error && <div className="mt-4 text-blue-400 text-center font-semibold drop-shadow">{error}</div>}
            </div>
          </div>
        </div>
      </main>
    );
  }

  // --- ETAPE 2 : STACKING SIMPLE ---
  return (
    <>
      {/* NAVBAR (logo + titre + sous-titre sur la même ligne) */}
      <nav className="w-full glass shadow-2xl backdrop-blur-xl px-2 md:px-0 h-auto flex flex-col md:flex-row items-center justify-center py-2 md:py-5">
        <div className="flex items-center gap-3 max-w-5xl mx-auto w-full h-full justify-center">
          <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
            <span className="text-lg font-black text-white drop-shadow-lg select-none">S</span>
          </div>
          <span className="hidden md:inline-block text-2xl md:text-3xl font-bold text-white tracking-tight">Sidegen.dev</span>
          <span className="hidden md:inline-block mx-4 text-base md:text-lg text-white font-medium drop-shadow text-center">Trouve ton prochain side project en un clic, grâce à l&apos;<span className="text-blue-500 font-bold">IA</span>.</span>
        </div>
      </nav>
      {/* BANDEAU CRITERES (formulaire compact) */}
      <div className="w-full glass shadow backdrop-blur-xl flex items-center mb-8">
        <div className="flex justify-center w-full">
          <div className="w-full max-w-3xl mx-auto px-2 py-2">
            <Form onGenerate={handleGenerate} loading={loading} compact={true} initialValues={lastCriteria || undefined} />
            {error && <div className="mt-2 text-blue-400 text-center font-semibold drop-shadow">{error}</div>}
          </div>
        </div>
      </div>
      {/* RESULTAT FULL PAGE */}
      <main className="min-h-screen flex flex-col items-center justify-start px-2" ref={projectRef}>
        <section className="w-full max-w-3xl mx-auto flex-1 mt-2 mb-2">
          {loading && (
            <div className="flex justify-center items-center h-40">
              <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500 border-t-blue-500 shadow-2xl"></div>
            </div>
          )}
          {project && !loading && (
            <ProjectResult project={project} />
          )}
        </section>
      </main>
    </>
  );
}
