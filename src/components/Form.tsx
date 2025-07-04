import { useState, useEffect } from "react";

const LANGUAGES = ["JavaScript", "Python", "Rust", "TypeScript", "Go", "Autre"];
const LEVELS = ["Débutant", "Intermédiaire", "Senior"];
const TIMES = ["1h", "5h", "10h+"];
const GOALS = ["Progresser", "Portfolio", "Apprendre une techno", "S'amuser", "Autre"];
const TYPES = ["Web app", "Jeu", "IA", "Mobile", "API", "Outil CLI", "Autre"];

export interface Criteria {
  language: string;
  level: string;
  time: string;
  goal: string;
  type: string;
}

interface FormProps {
  onGenerate: (values: Criteria) => void;
  loading: boolean;
  compact?: boolean;
  initialValues?: Criteria;
}

const icons = {
  language: (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 20v-6m0 0V4m0 10l3-3m-3 3l-3-3" /></svg>
  ),
  level: (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
  ),
  time: (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" /><path d="M12 8v4l3 3" /></svg>
  ),
  goal: (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 4v16m8-8H4" /></svg>
  ),
  type: (
    <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><rect x="4" y="4" width="16" height="16" rx="4" /></svg>
  ),
};

export default function Form({ onGenerate, loading, compact = false, initialValues }: FormProps) {
  const [values, setValues] = useState<Criteria>(
    initialValues || {
      language: LANGUAGES[0],
      level: LEVELS[0],
      time: TIMES[0],
      goal: GOALS[0],
      type: TYPES[0],
    }
  );

  useEffect(() => {
    if (initialValues) setValues(initialValues);
  }, [initialValues]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onGenerate(values);
  };

  if (compact) {
    // Affichage horizontal compact
    return (
      <div className="w-full max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} className="w-full">
          <div className="flex flex-col md:flex-row w-full gap-2 md:gap-4 items-end">
            <div className="flex flex-col md:flex-1 w-full">
              <label className="text-xs text-white font-semibold mb-1" htmlFor="language-select">Langage</label>
              <select id="language-select" name="language" value={values.language} onChange={handleChange} className="rounded-lg px-4 py-3 text-sm bg-white text-gray-900 border border-blue-500 focus:ring-blue-500 focus:border-blue-500 h-12 w-full">
                {LANGUAGES.map((lang) => <option key={lang} value={lang}>{lang}</option>)}
              </select>
            </div>
            <div className="flex flex-col md:flex-1 w-full">
              <label className="text-xs text-white font-semibold mb-1" htmlFor="level-select">Niveau</label>
              <select id="level-select" name="level" value={values.level} onChange={handleChange} className="rounded-lg px-4 py-3 text-sm bg-white text-gray-900 border border-blue-500 focus:ring-blue-500 focus:border-blue-500 h-12 w-full">
                {LEVELS.map((lvl) => <option key={lvl} value={lvl}>{lvl}</option>)}
              </select>
            </div>
            <div className="flex flex-col md:flex-1 w-full">
              <label className="text-xs text-white font-semibold mb-1" htmlFor="time-select">Temps</label>
              <select id="time-select" name="time" value={values.time} onChange={handleChange} className="rounded-lg px-4 py-3 text-sm bg-white text-gray-900 border border-blue-500 focus:ring-blue-500 focus:border-blue-500 h-12 w-full">
                {TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <div className="flex flex-col md:flex-1 w-full">
              <label className="text-xs text-white font-semibold mb-1" htmlFor="goal-select">Objectif</label>
              <select id="goal-select" name="goal" value={values.goal} onChange={handleChange} className="rounded-lg px-4 py-3 text-sm bg-white text-gray-900 border border-blue-500 focus:ring-blue-500 focus:border-blue-500 h-12 w-full">
                {GOALS.map((g) => <option key={g} value={g}>{g}</option>)}
              </select>
            </div>
            <div className="flex flex-col md:flex-1 w-full">
              <label className="text-xs text-white font-semibold mb-1" htmlFor="type-select">Type</label>
              <select id="type-select" name="type" value={values.type} onChange={handleChange} className="rounded-lg px-4 py-3 text-sm bg-white text-gray-900 border border-blue-500 focus:ring-blue-500 focus:border-blue-500 h-12 w-full">
                {TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
              </select>
            </div>
            <button type="submit" disabled={loading} className="bg-blue-500 text-white font-bold px-4 py-3 rounded-lg shadow hover:bg-blue-600 transition-all duration-150 disabled:opacity-60 h-12 w-full md:w-32 md:mt-0 mt-2">
              {loading ? "..." : "Générer"}
            </button>
          </div>
        </form>
      </div>
    );
  }

  // Affichage normal (vertical)
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {/* Langage */}
      <div>
        <label className="block mb-2 font-semibold text-white tracking-wide text-lg flex items-center gap-2">
          {icons.language} Langage préféré
        </label>
        <select
          name="language"
          value={values.language}
          onChange={handleChange}
          className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-blue-500 transition-all outline-none"
        >
          {LANGUAGES.map((lang) => (
            <option key={lang} value={lang}>{lang}</option>
          ))}
        </select>
      </div>
      {/* Niveau */}
      <div>
        <label className="block mb-2 font-semibold text-white tracking-wide text-lg flex items-center gap-2">
          {icons.level} Niveau
        </label>
        <select
          name="level"
          value={values.level}
          onChange={handleChange}
          className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-blue-500 transition-all outline-none"
        >
          {LEVELS.map((lvl) => (
            <option key={lvl} value={lvl}>{lvl}</option>
          ))}
        </select>
      </div>
      {/* Temps dispo */}
      <div>
        <label className="block mb-2 font-semibold text-white tracking-wide text-lg flex items-center gap-2">
          {icons.time} Temps dispo / semaine
        </label>
        <select
          name="time"
          value={values.time}
          onChange={handleChange}
          className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-blue-500 transition-all outline-none"
        >
          {TIMES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      {/* Objectif perso */}
      <div>
        <label className="block mb-2 font-semibold text-white tracking-wide text-lg flex items-center gap-2">
          {icons.goal} Objectif perso
        </label>
        <select
          name="goal"
          value={values.goal}
          onChange={handleChange}
          className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-blue-500 transition-all outline-none"
        >
          {GOALS.map((g) => (
            <option key={g} value={g}>{g}</option>
          ))}
        </select>
      </div>
      {/* Type de projet */}
      <div>
        <label className="block mb-2 font-semibold text-white tracking-wide text-lg flex items-center gap-2">
          {icons.type} Type de projet
        </label>
        <select
          name="type"
          value={values.type}
          onChange={handleChange}
          className="w-full rounded-xl px-4 py-3 bg-white text-gray-900 shadow-inner focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-blue-500 transition-all outline-none"
        >
          {TYPES.map((t) => (
            <option key={t} value={t}>{t}</option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="mt-2 w-full bg-blue-500 text-white font-bold py-3 rounded-xl shadow-xl hover:bg-blue-600 transition-all duration-200 outline-none border-none focus:ring-2 focus:ring-blue-500 disabled:opacity-60 backdrop-blur-lg"
      >
        {loading ? "Génération en cours..." : "✨ Générer mon projet IA"}
      </button>
    </form>
  );
} 