"use client";

import { useMemo, useState } from "react";
import {
  ArrowRight, Bell, BookOpen, CalendarDays, Check, ChevronDown, ChevronRight,
  CircleCheck, Clock3, FileText, GraduationCap, Grid2X2, Heart, Home, Laptop,
  LayoutDashboard, MapPin, Menu, MonitorPlay, Search, Send, Sparkles, Star,
  UserRound, Users, X, Zap
} from "lucide-react";

type Training = {
  id: number;
  title: string;
  category: string;
  format: "En ligne" | "Présentiel" | "Hybride";
  duration: string;
  level: string;
  rating: number;
  reviews: number;
  date: string;
  description: string;
  color: string;
  icon: "users" | "laptop" | "sparkles" | "zap";
  match: number;
};

const trainings: Training[] = [
  { id: 1, title: "Les fondamentaux du management", category: "Ressources humaines", format: "Présentiel", duration: "2 jours", level: "Intermédiaire", rating: 4.9, reviews: 128, date: "12 – 13 sept. 2026", description: "Adoptez les bonnes pratiques pour engager et accompagner votre équipe au quotidien.", color: "coral", icon: "users", match: 98 },
  { id: 2, title: "Excel : analyse de données avancée", category: "Bureautique", format: "En ligne", duration: "12 heures", level: "Avancé", rating: 4.8, reviews: 94, date: "À votre rythme", description: "Maîtrisez les tableaux croisés dynamiques, Power Query et la visualisation de données.", color: "blue", icon: "laptop", match: 95 },
  { id: 3, title: "Prise de parole avec impact", category: "Développement personnel", format: "Hybride", duration: "3 demi-journées", level: "Tous niveaux", rating: 4.7, reviews: 76, date: "21 – 28 sept. 2026", description: "Structurez vos idées et gagnez en assurance pour captiver tous vos auditoires.", color: "purple", icon: "sparkles", match: 91 },
  { id: 4, title: "Piloter un projet agile", category: "Gestion de projet", format: "Présentiel", duration: "3 jours", level: "Intermédiaire", rating: 4.8, reviews: 61, date: "5 – 7 oct. 2026", description: "Appliquez Scrum et les méthodes agiles à vos projets, de la vision jusqu’à la livraison.", color: "green", icon: "zap", match: 88 },
  { id: 5, title: "PowerPoint : présentations mémorables", category: "Bureautique", format: "En ligne", duration: "8 heures", level: "Débutant", rating: 4.6, reviews: 112, date: "À votre rythme", description: "Concevez des supports clairs, visuels et convaincants grâce aux bons réflexes.", color: "amber", icon: "laptop", match: 84 },
  { id: 6, title: "Prévenir les risques psychosociaux", category: "Ressources humaines", format: "Hybride", duration: "2 jours", level: "Tous niveaux", rating: 4.9, reviews: 43, date: "16 – 17 nov. 2026", description: "Identifiez les signaux faibles et mettez en place des actions de prévention durables.", color: "pink", icon: "users", match: 81 },
];

const categories = ["Toutes", "Ressources humaines", "Bureautique", "Développement personnel", "Gestion de projet"];

function TrainingIcon({ name }: { name: Training["icon"] }) {
  const icons = { users: Users, laptop: Laptop, sparkles: Sparkles, zap: Zap };
  const Icon = icons[name];
  return <Icon size={30} strokeWidth={1.8} />;
}

export default function Page() {
  const [activeNav, setActiveNav] = useState("Accueil");
  const [category, setCategory] = useState("Toutes");
  const [format, setFormat] = useState("Tous les formats");
  const [query, setQuery] = useState("");
  const [favorites, setFavorites] = useState<number[]>([2]);
  const [selected, setSelected] = useState<Training | null>(null);
  const [requested, setRequested] = useState<number[]>([]);
  const [toast, setToast] = useState("");
  const [mobileMenu, setMobileMenu] = useState(false);

  const filtered = useMemo(() => trainings.filter((t) =>
    (category === "Toutes" || t.category === category) &&
    (format === "Tous les formats" || t.format === format) &&
    (t.title.toLowerCase().includes(query.toLowerCase()) || t.category.toLowerCase().includes(query.toLowerCase()))
  ), [category, format, query]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2800);
  };

  const requestTraining = (training: Training) => {
    setRequested((items) => [...new Set([...items, training.id])]);
    setSelected(null);
    notify("Votre demande a bien été transmise à Sophie.");
  };

  return (
    <main className="app-shell">
      <aside className={`sidebar ${mobileMenu ? "open" : ""}`}>
        <button className="mobile-close" onClick={() => setMobileMenu(false)} aria-label="Fermer le menu"><X /></button>
        <div className="brand"><span className="brand-mark"><GraduationCap /></span><span>forma<span className="brand-dot">.</span></span></div>
        <nav className="main-nav">
          {[
            ["Accueil", Home], ["Catalogue", Grid2X2], ["Mes demandes", FileText],
            ["Mon agenda", CalendarDays], ["Mon parcours", LayoutDashboard]
          ].map(([label, Icon]) => (
            <button key={label as string} className={activeNav === label ? "active" : ""} onClick={() => { setActiveNav(label as string); setMobileMenu(false); }}>
              <Icon size={19} /><span>{label as string}</span>
              {label === "Mes demandes" && requested.length > 0 && <b className="nav-count">{requested.length}</b>}
            </button>
          ))}
        </nav>
        <div className="advisor-card">
          <div className="advisor-avatar">SM<span className="online" /></div>
          <div><span>Votre responsable formation</span><strong>Sophie Martin</strong></div>
          <button onClick={() => notify("Message envoyé à Sophie Martin.")}><Send size={16} /></button>
        </div>
        <div className="sidebar-foot">
          <button><span className="mini-avatar">TD</span><span><strong>Thomas Dubois</strong><small>Chef de projet</small></span><ChevronRight size={17} /></button>
        </div>
      </aside>

      <section className="content">
        <header className="topbar">
          <button className="menu-button" onClick={() => setMobileMenu(true)} aria-label="Ouvrir le menu"><Menu /></button>
          <div className="breadcrumb">Espace collaborateur <ChevronRight size={14} /> <strong>{activeNav}</strong></div>
          <div className="top-actions">
            <button className="icon-btn" onClick={() => notify("Vous n’avez aucune nouvelle notification.")}><Bell size={20} /><i /></button>
            <button className="profile-pill"><span>TD</span><strong>Thomas</strong><ChevronDown size={16} /></button>
          </div>
        </header>

        <div className="page">
          <section className="hero">
            <div>
              <span className="eyebrow"><Sparkles size={14} /> Sélection personnalisée</span>
              <h1>Bonjour Thomas, prêt à développer<br />vos <em>compétences ?</em></h1>
              <p>Découvrez des formations choisies selon votre métier, vos objectifs et votre parcours.</p>
              <div className="hero-stats">
                <div><strong>24</strong><span>formations recommandées</span></div>
                <div><strong>3</strong><span>objectifs cette année</span></div>
                <div><strong>18h</strong><span>de formation réalisées</span></div>
              </div>
            </div>
            <div className="hero-art" aria-hidden="true">
              <div className="orbit orbit-one" /><div className="orbit orbit-two" />
              <div className="art-card art-main"><BookOpen size={34} /><span><b>+12%</b> compétences</span></div>
              <div className="art-card art-star"><Star fill="currentColor" size={22} /></div>
              <div className="art-card art-check"><CircleCheck size={24} /></div>
              <div className="art-person"><span className="head" /><span className="body" /></div>
            </div>
          </section>

          <section className="section-head">
            <div><span className="section-kicker">Pour vous</span><h2>Formations recommandées</h2></div>
            <button className="text-link" onClick={() => { setCategory("Toutes"); setFormat("Tous les formats"); setQuery(""); }}>Voir tout le catalogue <ArrowRight size={17} /></button>
          </section>

          <div className="toolbar">
            <div className="search"><Search size={18} /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Rechercher une formation..." /></div>
            <div className="select-wrap"><select value={format} onChange={(e) => setFormat(e.target.value)}><option>Tous les formats</option><option>En ligne</option><option>Présentiel</option><option>Hybride</option></select><ChevronDown size={16} /></div>
          </div>

          <div className="category-tabs">
            {categories.map((c) => <button key={c} className={category === c ? "active" : ""} onClick={() => setCategory(c)}>{c}</button>)}
          </div>

          <div className="training-grid">
            {filtered.map((training) => (
              <article className="training-card" key={training.id}>
                <div className={`card-visual ${training.color}`}>
                  <span className="match"><Sparkles size={12} /> {training.match}% pour vous</span>
                  <button className={`heart ${favorites.includes(training.id) ? "liked" : ""}`} onClick={() => setFavorites((f) => f.includes(training.id) ? f.filter((id) => id !== training.id) : [...f, training.id])} aria-label="Ajouter aux favoris"><Heart size={18} fill="currentColor" /></button>
                  <div className="training-icon"><TrainingIcon name={training.icon} /></div>
                  <span className="visual-shape shape-a" /><span className="visual-shape shape-b" />
                </div>
                <div className="card-body">
                  <div className="card-meta"><span>{training.category}</span><span className={`format ${training.format.toLowerCase().replace("é", "e")}`}>{training.format === "En ligne" ? <MonitorPlay size={13} /> : training.format === "Présentiel" ? <MapPin size={13} /> : <Users size={13} />}{training.format}</span></div>
                  <h3>{training.title}</h3>
                  <p>{training.description}</p>
                  <div className="details"><span><Clock3 size={15} /> {training.duration}</span><span><BookOpen size={15} /> {training.level}</span></div>
                  <div className="card-footer">
                    <span className="rating"><Star size={15} fill="currentColor" /> <b>{training.rating}</b> <small>({training.reviews})</small></span>
                    <button onClick={() => setSelected(training)}>{requested.includes(training.id) ? <><Check size={15} /> Demandée</> : <>Découvrir <ArrowRight size={15} /></>}</button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="empty"><Search size={28} /><h3>Aucune formation trouvée</h3><p>Essayez de modifier vos filtres ou votre recherche.</p></div>}

          <section className="next-session">
            <div className="date-card"><strong>18</strong><span>SEP</span></div>
            <div className="session-copy"><span className="section-kicker">Votre prochaine formation</span><h3>Conduire une réunion efficace</h3><p><Clock3 size={15} /> 09:00 – 17:00 <MapPin size={15} /> Campus République, Paris</p></div>
            <div className="session-status"><CircleCheck size={17} /> Inscription confirmée</div>
            <button onClick={() => notify("La session a été ajoutée à votre agenda.")}>Voir les détails <ArrowRight size={16} /></button>
          </section>
        </div>
      </section>

      {selected && (
        <div className="modal-backdrop" onMouseDown={() => setSelected(null)}>
          <div className="modal" onMouseDown={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelected(null)}><X /></button>
            <div className={`modal-banner ${selected.color}`}><div className="training-icon"><TrainingIcon name={selected.icon} /></div></div>
            <span className="eyebrow"><Sparkles size={13} /> {selected.match}% compatible avec votre profil</span>
            <h2>{selected.title}</h2>
            <p>{selected.description}</p>
            <div className="modal-facts">
              <div><Clock3 /><span><small>Durée</small><strong>{selected.duration}</strong></span></div>
              <div><MonitorPlay /><span><small>Format</small><strong>{selected.format}</strong></span></div>
              <div><CalendarDays /><span><small>Prochaine session</small><strong>{selected.date}</strong></span></div>
            </div>
            <div className="approval-note"><UserRound size={20} /><span><strong>Validation requise</strong><small>Votre demande sera envoyée à Sophie Martin, responsable formation.</small></span></div>
            <button className="primary-action" disabled={requested.includes(selected.id)} onClick={() => requestTraining(selected)}>
              {requested.includes(selected.id) ? "Demande déjà transmise" : <>Faire une demande <ArrowRight size={18} /></>}
            </button>
          </div>
        </div>
      )}
      {toast && <div className="toast"><CircleCheck size={19} />{toast}</div>}
    </main>
  );
}
