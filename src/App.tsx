import { useEffect, useMemo, useState } from "react";
import { config } from "./config";
import "./App.css";
import "./overrides.css";

type Language = "fr" | "en";
type FileKey = "home" | "about" | "projects" | "skills" | "experience" | "contact" | "readme" | "cv";

const copy = {
  fr: {
    menu: ["Fichier", "Édition", "Sélection", "Affichage", "Aller à", "Exécuter", "Terminal", "Aide"],
    explorer: "EXPLORATEUR",
    workspace: "ZACHARIA-PORTFOLIO",
    files: { home: "home.tsx", about: "about.html", projects: "projects.js", skills: "skills.json", experience: "experience.ts", contact: "contact.css", readme: "README.md", cv: "CV-Zacharia-Mansal.pdf" },
    homeComment: "Bonjour le monde ! Bienvenue sur mon portfolio.",
    greeting: "Bonjour, je suis",
    role: "Développeur Full-Stack",
    specialty: "DevOps",
    location: "Dakar, Sénégal",
    heroDescription: "Je conçois des sites et des produits numériques utiles, pensés pour le marché ouest-africain.",
    projectsButton: "Explorer mes projets",
    contactButton: "Me contacter",
    years: "Années d’apprentissage",
    projectsCount: "Projets présentés",
    curious: "Toujours",
    curiousLabel: "curieux",
    always: "En construction",
    alwaysLabel: "comme mes projets",
    aboutTitle: "À propos de moi",
    aboutLead: "Du code utile, des produits pensés pour ici.",
    aboutBody: config.about.description,
    aboutStudy: "Formation",
    ism: "Bachelor CDSD · ISM",
    uvs: "Licence Développement d’applications (web, mobile, gaming) · UVS",
    projectTitle: "Projets sélectionnés",
    projectSubtitle: "Des produits en ligne et des idées que je construis en ce moment.",
    live: "En ligne",
    progress: "En cours",
    skillsTitle: "Compétences & outils",
    skillsSubtitle: "De la conception à la mise en ligne.",
    webDev: "Développement",
    tools: "Outils, données & paiements",
    experienceTitle: "Expérience & parcours",
    contactTitle: "Contact",
    contactSubtitle: "Une idée de projet ? Parlons-en.",
    sendEmail: "M’écrire",
    downloadCv: "Télécharger mon CV",
    readmeTitle: "Bienvenue dans mon espace de travail",
    readmeText: "Ce portfolio présente mon parcours, mes compétences et les produits numériques que je construis à Dakar.",
    terminal: "TERMINAL",
    output: "SORTIE",
    problems: "PROBLÈMES",
    terminalLine: "$ whoami",
    terminalAnswer: "zacharia · développeur full stack & DevOps · Dakar",
    terminalNext: "$ echo $FOCUS",
    terminalFocus: "Construire des produits utiles pour le marché ouest-africain.",
    ready: "Prêt",
    status: "Toutes les informations affichées ici sont les miennes.",
    open: "Ouvrir le projet",
    social: "RÉSEAUX",
    close: "fermer",
  },
  en: {
    menu: ["File", "Edit", "Selection", "View", "Go", "Run", "Terminal", "Help"],
    explorer: "EXPLORER",
    workspace: "ZACHARIA-PORTFOLIO",
    files: { home: "home.tsx", about: "about.html", projects: "projects.js", skills: "skills.json", experience: "experience.ts", contact: "contact.css", readme: "README.md", cv: "CV-Zacharia-Mansal.pdf" },
    homeComment: "Hello world! Welcome to my portfolio.",
    greeting: "Hello, I’m",
    role: "Full-Stack Developer",
    specialty: "DevOps",
    location: "Dakar, Senegal",
    heroDescription: "I build useful websites and digital products designed for the West African market.",
    projectsButton: "Explore my projects",
    contactButton: "Get in touch",
    years: "Years learning",
    projectsCount: "Featured projects",
    curious: "Always",
    curiousLabel: "curious",
    always: "Always",
    alwaysLabel: "building",
    aboutTitle: "About me",
    aboutLead: "Useful code, products designed for here.",
    aboutBody: "I’m a full-stack developer and DevOps engineer based in Dakar, studying for a Bachelor’s in Digital Solutions Design and Development (CDSD) at ISM and a degree in Application Development (web, mobile, and gaming) at UVS. I build websites and digital products for the West African market: business websites, admin-managed catalogs, marketplaces, and mobile payment integrations. I’m looking for freelance clients and opportunities to keep building useful products.",
    aboutStudy: "Education",
    ism: "Bachelor CDSD · ISM",
    uvs: "Application Development (web, mobile, gaming) · UVS",
    projectTitle: "Selected projects",
    projectSubtitle: "Products online and ideas I’m currently building.",
    live: "Live",
    progress: "In progress",
    skillsTitle: "Skills & tools",
    skillsSubtitle: "From design to deployment.",
    webDev: "Development",
    tools: "Tools, data & payments",
    experienceTitle: "Experience & journey",
    contactTitle: "Contact",
    contactSubtitle: "Have a project in mind? Let’s talk.",
    sendEmail: "Email me",
    downloadCv: "Download my CV",
    readmeTitle: "Welcome to my workspace",
    readmeText: "This portfolio showcases my journey, skills, and the digital products I’m building in Dakar.",
    terminal: "TERMINAL",
    output: "OUTPUT",
    problems: "PROBLEMS",
    terminalLine: "$ whoami",
    terminalAnswer: "zacharia · full-stack developer & DevOps · Dakar",
    terminalNext: "$ echo $FOCUS",
    terminalFocus: "Building useful products for the West African market.",
    ready: "Ready",
    status: "Everything shown here is my own information.",
    open: "View project",
    social: "SOCIAL",
    close: "close",
  },
} as const;

type Copy = { [Key in keyof typeof copy.fr]: Key extends "menu" ? readonly string[] : Key extends "files" ? Record<FileKey, string> : string };
type Project = { id: number; title: string; category: string; technologies: string; image: string; description: string; link: string };

const fileOrder: FileKey[] = ["home", "about", "projects", "skills", "experience", "contact", "readme", "cv"];
const fileTypes: Record<FileKey, string> = { home: "tsx", about: "html", projects: "js", skills: "json", experience: "ts", contact: "css", readme: "md", cv: "pdf" };

function App() {
  const [language, setLanguage] = useState<Language>(() => (localStorage.getItem("zacharia-language") === "en" ? "en" : "fr"));
  const [activeFile, setActiveFile] = useState<FileKey>("home");
  const [openFiles, setOpenFiles] = useState<FileKey[]>(["home"]);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSide, setActiveSide] = useState("explorer");
  const t: Copy = copy[language];
  const projects: Project[] = useMemo(() => language === "fr" ? config.projects : [
    { ...config.projects[0], category: "Marketplace · Live", description: "A multi-category marketplace for land, fruit, livestock, and equipment, with user accounts, credits, SenePay payments, and SEO." },
    { ...config.projects[1], category: "Restaurant · Admin-managed", description: "A restaurant website where the client manages the menu from an admin page." },
    { ...config.projects[2], category: "SaaS · In progress", description: "A mobile-first quotation and invoicing tool for Senegalese artisans and service providers." },
    { ...config.projects[3], category: "Jobs · In progress", description: "A job listing website for Dakar, with a database for job posts and applications." },
    { ...config.projects[4], category: "Hackathon · AI & football", description: "A hackathon project exploring AI-powered football video analysis to generate highlights and statistics." },
  ], [language]);

  useEffect(() => { localStorage.setItem("zacharia-language", language); document.documentElement.lang = language; }, [language]);

  const openFile = (file: FileKey) => {
    setOpenFiles((current) => current.includes(file) ? current : [...current, file]);
    setActiveFile(file);
    if (file === "projects") document.querySelector(".editor-content")?.scrollTo({ top: 0 });
  };
  const closeFile = (file: FileKey) => {
    const remaining = openFiles.filter((item) => item !== file);
    setOpenFiles(remaining.length ? remaining : ["home"]);
    if (activeFile === file) setActiveFile(remaining[remaining.length - 1] ?? "home");
  };

  const fileName = t.files[activeFile];
  const renderContent = () => {
    if (activeFile === "home") return <Home t={t} language={language} openFile={openFile} />;
    if (activeFile === "about") return <About t={t} language={language} />;
    if (activeFile === "projects") return <Projects t={t} projects={projects} />;
    if (activeFile === "skills") return <Skills t={t} language={language} />;
    if (activeFile === "experience") return <Experience t={t} language={language} />;
    if (activeFile === "contact") return <Contact t={t} language={language} />;
    if (activeFile === "cv") return <Resume t={t} />;
    return <Readme t={t} language={language} />;
  };

  return (
    <div className="ide-shell">
      <header className="titlebar">
        <div className="brand-mark" aria-hidden="true"><span>‹</span><span>/</span><span>›</span></div>
        <nav className="menu-bar" aria-label="Application menu">{t.menu.map((item) => <span key={item}>{item}</span>)}</nav>
        <div className="command-center"><span className="command-search">⌕</span><span>zacharia-portfolio</span><kbd>⌘ P</kbd></div>
        <div className="window-controls" aria-hidden="true"><span>—</span><span>□</span><span>×</span></div>
      </header>

      <div className="workbench">
        <aside className="activity-bar" aria-label="Outils de navigation">
          <button className={activeSide === "explorer" ? "activity active" : "activity"} aria-label={t.explorer} onClick={() => { setSidebarOpen(!sidebarOpen); setActiveSide("explorer"); }}>▤</button>
          <button className={activeSide === "search" ? "activity active" : "activity"} aria-label="Search" onClick={() => { setSidebarOpen(true); setActiveSide("search"); }}>⌕</button>
          <button className="activity" aria-label="Source control" onClick={() => openFile("readme")}>⑂</button>
          <button className="activity" aria-label="Run" onClick={() => openFile("projects")}>▷</button>
          <div className="activity-spacer" />
          <button className="activity account-icon" aria-label="GitHub"><a href={config.contact.github} target="_blank" rel="noreferrer">◉</a></button>
          <button className="activity" aria-label="Settings" onClick={() => setLanguage(language === "fr" ? "en" : "fr")}>⚙</button>
        </aside>

        {sidebarOpen && <aside className="explorer-panel">
          <div className="explorer-title"><span>{activeSide === "search" ? "SEARCH" : t.explorer}</span><span className="panel-actions">•••</span></div>
          {activeSide === "search" ? <div className="search-panel"><input aria-label="Search in portfolio" placeholder={language === "fr" ? "Rechercher dans le portfolio" : "Search the portfolio"} onChange={(event) => { if (event.target.value) openFile("projects"); }} /><p>{language === "fr" ? "Essaie « projets », « compétences » ou « contact »." : "Try ‘projects’, ‘skills’, or ‘contact’."}</p></div> : <>
            <button className="folder-heading"><span className="chevron">⌄</span>{t.workspace}</button>
            <div className="file-tree">
              {fileOrder.map((file) => <button key={file} className={activeFile === file ? "tree-file selected" : "tree-file"} onClick={() => openFile(file)}>
                <span className={`file-icon file-${fileTypes[file]}`}>{fileTypes[file] === "pdf" ? "PDF" : fileTypes[file] === "json" ? "{}" : fileTypes[file].toUpperCase()}</span>
                <span>{t.files[file]}</span>
              </button>)}
            </div>
            <div className="explorer-lower"><div className="explorer-title">{t.social}</div>
              <a href={config.contact.github} target="_blank" rel="noreferrer">◉ GitHub</a>
              <a href={config.contact.linkedin} target="_blank" rel="noreferrer">in LinkedIn</a>
              <a href={config.contact.instagram} target="_blank" rel="noreferrer">◎ Instagram</a>
            </div>
          </>}
        </aside>}

        <main className="editor-area">
          <div className="tabs-row">
            {openFiles.map((file) => <button key={file} className={activeFile === file ? "editor-tab selected-tab" : "editor-tab"} onClick={() => setActiveFile(file)}>
              <span className={`file-icon file-${fileTypes[file]}`}>{fileTypes[file] === "pdf" ? "PDF" : fileTypes[file] === "json" ? "{}" : fileTypes[file].toUpperCase()}</span><span>{t.files[file]}</span><span className="tab-close" aria-label={`${t.close} ${t.files[file]}`} onClick={(event) => { event.stopPropagation(); closeFile(file); }}>×</span>
            </button>)}
            <div className="tab-actions"><span>⌕</span><span>⋯</span></div>
          </div>
          <div className="breadcrumbs"><span>zacharia-portfolio</span><span>›</span><span>src</span><span>›</span><span className={`crumb-type file-${fileTypes[activeFile]}`}>{fileTypes[activeFile].toUpperCase()}</span><span>{fileName}</span></div>
          <section className="editor-content" key={activeFile}>
            <div className={`file-document document-${activeFile}`}>{renderContent()}</div>
          </section>
          <section className="bottom-panel">
            <div className="panel-tabs"><span className="panel-tab">{t.problems} <b>0</b></span><span className="panel-tab">{t.output}</span><span className="panel-tab panel-tab-active">{t.terminal}</span><span className="terminal-shell-label">powershell</span><span className="panel-actions">⌃ &nbsp; ×</span></div>
            <div className="terminal-content"><p><span className="terminal-prompt">PS C:\Users\zacharia\portfolio&gt;</span> {t.terminalLine.replace("$ ", "")}</p><p className="terminal-muted">{t.terminalAnswer}</p><p><span className="terminal-prompt">PS C:\Users\zacharia\portfolio&gt;</span> {t.terminalNext.replace("$ ", "")}</p><p className="terminal-green">{t.terminalFocus}</p></div>
          </section>
        </main>
      </div>

      <footer className="statusbar"><span className="status-branch">⑂ &nbsp;main</span><span>✓ 0 &nbsp;⚠ 0</span><span className="status-spacer">{t.status}</span><button className="language-toggle" onClick={() => setLanguage(language === "fr" ? "en" : "fr")} aria-label="Change language"><span className={language === "fr" ? "language-active" : ""}>FR</span><span className="lang-divider">/</span><span className={language === "en" ? "language-active" : ""}>EN</span></button><span>UTF-8</span><span>TypeScript React</span><span>⌘ Prettier</span><span className="status-location">◉ {t.location}</span></footer>
    </div>
  );
}

function Home({ t, language, openFile }: { t: Copy; language: Language; openFile: (file: FileKey) => void }) {
  return <div className="home-page">
    <div className="code-comment">// {t.homeComment}</div>
    <p className="hero-greeting">{t.greeting}</p>
    <h1><span>Zacharia</span><strong>Thomas Mansal</strong></h1>
    <div className="role-row"><span className="role-chip"><i className="dot dot-teal" />{t.role}</span><span className="role-chip"><i className="dot dot-purple" />{t.specialty}</span><span className="role-chip location-chip">⌖ {t.location}</span></div>
    <p className="hero-description">{t.heroDescription}</p>
    <div className="hero-actions"><button className="primary-button" onClick={() => openFile("projects")}>▣ &nbsp;{t.projectsButton}</button><button className="secondary-button" onClick={() => openFile("contact")}>✉ &nbsp;{t.contactButton}</button></div>
    <div className="stats-grid"><div><strong>2024–26</strong><span>{t.years}</span></div><div><strong>05</strong><span>{t.projectsCount}</span></div><div><strong>∞</strong><span>{t.curiousLabel}</span></div><div><strong>↗</strong><span>{t.alwaysLabel}</span></div></div>
    <div className="hero-footnote"><span className="footnote-line" />{language === "fr" ? "Basé à Dakar · Ouvert aux missions freelance" : "Based in Dakar · Available for freelance work"}</div>
  </div>;
}

function About({ t, language }: { t: Copy; language: Language }) {
  return <div className="text-page"><div className="code-comment">&lt;!-- {t.aboutTitle} --&gt;</div><h2>{t.aboutLead}</h2><p className="prose">{t.aboutBody}</p><h3>{t.aboutStudy}</h3><div className="education-card"><span className="education-icon">▣</span><div><strong>{t.ism}</strong><small>{language === "fr" ? "Concepteur et Développeur de Solutions Digitales" : "Digital Solutions Design and Development"}</small></div></div><div className="education-card"><span className="education-icon">▣</span><div><strong>{t.uvs}</strong><small>{language === "fr" ? "Études en cours" : "Currently studying"}</small></div></div><div className="code-comment about-note">{language === "fr" ? "// Je cherche des clients freelance et des occasions de construire des produits utiles." : "// Looking for freelance clients and opportunities to build useful products."}</div></div>;
}

function Projects({ t, projects }: { t: Copy; projects: Project[] }) {
  return <div className="projects-page"><div className="code-comment">// {t.projectTitle}</div><h2>{t.projectTitle}<span className="heading-period">.</span></h2><p className="page-intro">{t.projectSubtitle}</p><div className="project-grid">{projects.map((project) => <article className="project-card" key={project.id}><div className="project-card-top"><span className="project-folder">▰</span><span className="project-status">{project.link ? t.live : t.progress}</span></div><div className="project-category">{project.category}</div><h3>{project.title}</h3><p>{project.description}</p><div className="project-tech">{project.technologies.split(/[,·]/).map((item) => item.trim()).filter(Boolean).slice(0, 5).map((item) => <span key={item}>{item}</span>)}</div>{project.link ? <a className="project-link" href={project.link} target="_blank" rel="noreferrer">{t.open} ↗</a> : <span className="project-link in-progress">{t.progress} <span>●</span></span>}</article>)}</div></div>;
}

function Skills({ t, language }: { t: Copy; language: Language }) {
  const groups = [
    { icon: "‹›", name: t.webDev, items: ["HTML", "CSS", "JavaScript", "Python", "Bootstrap", "WordPress", "Firebase", "Supabase"] },
    { icon: "⚙", name: t.tools, items: ["Git", "GitHub", "Vercel", "Figma", "Photoshop", "Illustrator", "VS Code", "Power BI (DAX)", "Wave", "Orange Money", "SenePay"] },
  ];
  return <div className="skills-page"><div className="code-comment">// {t.skillsTitle}</div><h2>{t.skillsTitle}<span className="heading-period">.</span></h2><p className="page-intro">{t.skillsSubtitle}</p><div className="skills-groups">{groups.map((group, index) => <section className="skill-group" key={group.name}><div className="skill-group-head"><span className={index === 0 ? "skill-group-icon teal" : "skill-group-icon purple"}>{group.icon}</span><h3>{group.name}</h3></div><div className="skill-tags">{group.items.map((item) => <span key={item}>{item}</span>)}</div></section>)}</div><div className="skill-summary"><span>const focus =</span> <strong>{language === "fr" ? '"produits numériques utiles"' : '"useful digital products"'}</strong>;</div></div>;
}

function Experience({ t, language }: { t: Copy; language: Language }) {
  const experienceItems = language === "fr" ? config.experiences : [
    { ...config.experiences[0], position: "Freelance Web Developer", company: "Independent · Dakar", period: "2026 - Present", location: "Dakar, Senegal", description: "Building business websites and admin-managed catalogs for companies in Dakar, including Bachir’Immo, Sunu Auto, Brutlin Sénégal, AMD, ARAME TOP, Kommontown Forever, and Food Pro Max." },
    { ...config.experiences[1], position: "Founder · SunuSouf", company: "Multi-category marketplace · Personal project", period: "2026 - Present", description: "Building a marketplace for land, fruit, livestock, and equipment, with user accounts, credits, SenePay payments, and SEO." },
    { ...config.experiences[2], position: "Digital Development Studies", company: "ISM · UVS", period: "In progress", location: "Dakar, Senegal", description: "Bachelor’s in Digital Solutions Design and Development at ISM and a degree in Application Development at UVS." },
    { ...config.experiences[3], position: "Independent Learning", company: "Learning and first projects", period: "2024 - 2026", location: "Dakar, Senegal", description: "Learned programming fundamentals in 2024, studied design systems with Figma in 2025, and started building first projects in 2026." },
  ];
  return <div className="experience-page"><div className="code-comment">// {t.experienceTitle}</div><h2>{t.experienceTitle}<span className="heading-period">.</span></h2><div className="timeline">{experienceItems.map((item, index) => <article className="timeline-item" key={`${item.position}-${index}`}><span className="timeline-dot"/><div className="timeline-date">{item.period}</div><div className="timeline-heading"><h3>{item.position}</h3><span>{item.company}</span></div><p>{item.description}</p><div className="project-tech">{item.technologies.map((tech) => <span key={tech}>{tech}</span>)}</div></article>)}</div></div>;
}

function Contact({ t, language }: { t: Copy; language: Language }) {
  return <div className="contact-page"><div className="code-comment">/* {t.contactTitle} */</div><h2>{t.contactTitle}<span className="heading-period">.</span></h2><p className="page-intro">{t.contactSubtitle}</p><div className="contact-card"><span className="contact-symbol">✉</span><div><small>EMAIL</small><a href={`mailto:${config.contact.email}`}>{config.contact.email}</a></div><a className="contact-arrow" href={`mailto:${config.contact.email}`}>↗</a></div><div className="contact-links"><a href={config.contact.github} target="_blank" rel="noreferrer"><span>◉</span> GitHub <b>↗</b></a><a href={config.contact.linkedin} target="_blank" rel="noreferrer"><span className="linkedin-icon">in</span> LinkedIn <b>↗</b></a><a href={config.contact.instagram} target="_blank" rel="noreferrer"><span>◎</span> Instagram <b>↗</b></a></div><a className="primary-button cv-button" href="/CV-Zacharia-Mansal.pdf" download>⇩ &nbsp;{t.downloadCv}</a><p className="contact-footnote">⌖ &nbsp;{t.location} &nbsp;·&nbsp; {language === "fr" ? "Disponible pour des missions freelance" : "Available for freelance work"}</p></div>;
}

function Readme({ t, language }: { t: Copy; language: Language }) {
  return <div className="readme-page"><span className="markdown-label">{language === "fr" ? "Table des matières" : "Table of contents"}</span><div className="readme-content"><span className="readme-kicker">README.md</span><h1>{t.readmeTitle}</h1><p>{t.readmeText}</p><hr/><h2>{language === "fr" ? "À propos" : "About"}</h2><p>{language === "fr" ? config.about.description : copy.en.aboutBody}</p><h2>{language === "fr" ? "Portfolio" : "Portfolio"}</h2><ul><li>{language === "fr" ? "Développement full stack et DevOps à Dakar." : "Full-stack development and DevOps in Dakar."}</li><li>{language === "fr" ? "Sites vitrines, catalogues administrables et marketplaces." : "Business websites, admin-managed catalogs, and marketplaces."}</li><li>{language === "fr" ? "Conçu pour le marché ouest-africain." : "Designed for the West African market."}</li></ul></div></div>;
}

function Resume({ t }: { t: Copy }) {
  return <div className="resume-page"><div className="code-comment">// CV-Zacharia-Mansal.pdf</div><div className="resume-sheet"><div className="resume-icon">PDF</div><h2>Zacharia Thomas Mansal</h2><p>{t.role} · {t.specialty}</p><p>{t.location}</p><a className="primary-button" href="/CV-Zacharia-Mansal.pdf" download>⇩ &nbsp;{t.downloadCv}</a></div></div>;
}

export default App;
