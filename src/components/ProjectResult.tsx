interface RoadmapStep {
  session: number;
  title: string;
  description: string;
  estimation: string;
}

interface Project {
  name: string;
  description: string;
  stack: string[];
  roadmap: RoadmapStep[];
}

export default function ProjectResult({ project }: { project: Project }) {
  if (!project) return null;
  return (
    <div className="glass rounded-3xl p-8 mb-8 max-w-2xl mx-auto shadow-2xl border border-white/10 relative overflow-hidden bg-blue-900/90" style={{ boxShadow: '0 0 32px 8px rgba(59,130,246,0.35), 0 4px 32px 0 rgba(0,0,0,0.5)' }}>
      <div className="relative z-10">
        <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-lg tracking-tight flex items-center gap-2">
          <span className="inline-block w-3 h-3 rounded-full bg-blue-500 animate-pulse"></span>
          {project.name}
        </h2>
        <p className="text-lg text-white mb-6 font-medium drop-shadow">{project.description}</p>
        <div className="mb-6">
          <span className="font-semibold text-white">Stack recommandée :</span>
          <ul className="flex flex-wrap gap-2 mt-2">
            {project.stack.map((tech) => (
              <li key={tech} className="bg-blue-500 text-white px-4 py-1 rounded-full text-sm font-bold shadow hover:scale-105 transition-all duration-150 border border-white/10">
                {tech}
              </li>
            ))}
          </ul>
        </div>
        <div className="mb-6">
          <span className="font-semibold text-white">Roadmap :</span>
          <ol className="mt-4 space-y-4 relative border-l-4 border-blue-500 pl-6">
            {project.roadmap.map((step) => (
              <li key={step.session} className="group relative">
                <span className="absolute -left-3 top-2 w-5 h-5 rounded-full bg-blue-500 border-4 border-white/10 shadow-lg group-hover:scale-110 transition-transform"></span>
                <div className="bg-gray-800/80 backdrop-blur-md rounded-xl px-4 py-3 shadow-inner border border-white/10">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-semibold text-blue-500">Session {step.session} : {step.title}</span>
                    <span className="text-xs text-blue-500 font-bold bg-gray-900 px-2 py-0.5 rounded-full">{step.estimation}</span>
                  </div>
                  <div className="text-white text-sm">{step.description}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="flex gap-4 mt-8">
          <button className="glass bg-blue-500 text-white px-6 py-3 rounded-xl font-bold shadow-xl hover:scale-105 hover:shadow-2xl transition-all duration-200 outline-none border-none focus:ring-2 focus:ring-blue-500">
            Copier
          </button>
          <button className="glass bg-gray-800/80 text-blue-500 px-6 py-3 rounded-xl font-bold shadow hover:bg-gray-800 transition-all border border-blue-500/20">
            Sauvegarder
          </button>
        </div>
      </div>
    </div>
  );
} 