// Simple client-side translations — no API, no cost. EN default, plus DE and PT-BR.
// Each key maps to text on the page (elements marked with data-i18n="key").
// NOTE: German and Portuguese drafted for review by a native speaker.
const translations = {
  en: {
    "nav.work": "Work",
    "nav.playground": "Playground",
    "nav.about": "About Me",
    "footer.contact": "Contact",

    "hero.tagline":
      "I design end-to-end product experiences for complex enterprise SaaS and B2B products, with experience across desktop and mobile, pairing UX and research rigour with an AI-augmented practice.",
    "hero.viewWork": "View work →",

    "work.title": "Work",
    "work.projectTitle": "Project title",
    "work.projectMeta": "Role · Year",

    "playground.title": "Playground",
    "playground.intro":
      "Experiments, side projects, and things I'm exploring — including AI-augmented design.",
    "playground.expTitle": "Experiment title",
    "playground.expMeta": "Type · Year",

    "about.title": "About Me",
    "about.p1":
      "I'm a Product Designer with 5+ years of experience in UX design and interaction design for enterprise SaaS products — now combining that foundation with an AI-augmented design practice.",
    "about.p2":
      "I have a proven track record in end-to-end product design — from user research and usability testing through prototyping and delivery — working within cross-functional agile teams. I use AI tools actively across my workflow: accelerating discovery, generating and stress-testing design concepts, and prototyping faster without sacrificing user-centricity.",
    "about.p3":
      "My background combines hands-on UX practice with an MA in Consumer Behaviour, a working knowledge of code environments (GitHub, VS Code), and daily use of tools like Figma AI, Claude, Cursor, and LLMs — bringing research rigour, design systems thinking, and modern AI fluency to complex product challenges.",
    "about.highlight":
      "I believe the best designers right now aren't the ones who fear AI — they're the ones who know how to direct it.",
    "about.skillsLabel": "Top skills",
    "about.skills":
      "Product Design · Artificial Intelligence for Design · User Experience (UX) · Interaction Design · UX Research",
  },

  de: {
    "nav.work": "Arbeiten",
    "nav.playground": "Playground",
    "nav.about": "Über mich",
    "footer.contact": "Kontakt",

    "hero.tagline":
      "Ich gestalte End-to-End-Produkterlebnisse für komplexe Enterprise-SaaS- und B2B-Produkte, mit Erfahrung auf Desktop und Mobile, und verbinde gründliche UX- und Research-Arbeit mit einer KI-gestützten Praxis.",
    "hero.viewWork": "Arbeiten ansehen →",

    "work.title": "Arbeiten",
    "work.projectTitle": "Projekttitel",
    "work.projectMeta": "Rolle · Jahr",

    "playground.title": "Playground",
    "playground.intro":
      "Experimente, Nebenprojekte und Dinge, die ich erkunde – einschließlich KI-gestütztem Design.",
    "playground.expTitle": "Experiment-Titel",
    "playground.expMeta": "Art · Jahr",

    "about.title": "Über mich",
    "about.p1":
      "Ich bin Produktdesignerin mit über 5 Jahren Erfahrung in UX- und Interaction-Design für Enterprise-SaaS-Produkte – und verbinde diese Grundlage nun mit einer KI-gestützten Designpraxis.",
    "about.p2":
      "Ich habe eine nachweisliche Erfolgsbilanz im End-to-End-Produktdesign – von User Research und Usability-Tests über Prototyping bis zur Auslieferung – in cross-funktionalen, agilen Teams. KI-Tools setze ich aktiv in meinem gesamten Workflow ein: um Discovery zu beschleunigen, Designkonzepte zu generieren und zu testen und schneller zu prototypen, ohne die Nutzerzentrierung zu opfern.",
    "about.p3":
      "Mein Hintergrund verbindet praktische UX-Arbeit mit einem Master in Consumer Behaviour, fundierten Kenntnissen von Code-Umgebungen (GitHub, VS Code) und der täglichen Nutzung von Tools wie Figma AI, Claude, Cursor und LLMs – und bringt Research-Sorgfalt, Design-Systems-Denken und moderne KI-Kompetenz in komplexe Produktherausforderungen ein.",
    "about.highlight":
      "Ich glaube, die besten Designer sind derzeit nicht die, die KI fürchten – sondern die, die sie zu lenken wissen.",
    "about.skillsLabel": "Top-Skills",
    "about.skills":
      "Produktdesign · Künstliche Intelligenz für Design · User Experience (UX) · Interaction Design · UX Research",
  },

  pt: {
    "nav.work": "Trabalhos",
    "nav.playground": "Playground",
    "nav.about": "Sobre mim",
    "footer.contact": "Contato",

    "hero.tagline":
      "Eu projeto experiências de produto de ponta a ponta para SaaS corporativo e produtos B2B complexos, com experiência em desktop e mobile, unindo rigor de UX e pesquisa a uma prática aumentada por IA.",
    "hero.viewWork": "Ver trabalhos →",

    "work.title": "Trabalhos",
    "work.projectTitle": "Título do projeto",
    "work.projectMeta": "Função · Ano",

    "playground.title": "Playground",
    "playground.intro":
      "Experimentos, projetos paralelos e coisas que estou explorando — incluindo design aumentado por IA.",
    "playground.expTitle": "Título do experimento",
    "playground.expMeta": "Tipo · Ano",

    "about.title": "Sobre mim",
    "about.p1":
      "Sou Product Designer com mais de 5 anos de experiência em UX design e design de interação para produtos SaaS corporativos — e agora combino essa base com uma prática de design aumentada por IA.",
    "about.p2":
      "Tenho um histórico comprovado em design de produto de ponta a ponta — de pesquisa com usuários e testes de usabilidade a prototipagem e entrega — atuando em times ágeis multifuncionais. Uso ferramentas de IA ativamente em todo o meu fluxo de trabalho: acelerando a descoberta, gerando e testando conceitos de design e prototipando mais rápido sem abrir mão da centralidade no usuário.",
    "about.p3":
      "Minha formação combina prática em UX com um mestrado em Comportamento do Consumidor, conhecimento prático de ambientes de código (GitHub, VS Code) e uso diário de ferramentas como Figma AI, Claude, Cursor e LLMs — trazendo rigor de pesquisa, pensamento de design systems e fluência moderna em IA para desafios de produto complexos.",
    "about.highlight":
      "Acredito que os melhores designers hoje não são os que temem a IA — são os que sabem como direcioná-la.",
    "about.skillsLabel": "Principais habilidades",
    "about.skills":
      "Design de Produto · Inteligência Artificial para Design · Experiência do Usuário (UX) · Design de Interação · Pesquisa em UX",
  },
};

const LANG_KEY = "preferred-lang";
const LANGS = [
  { code: "en", label: "EN" },
  { code: "de", label: "DE" },
  { code: "pt", label: "PT" },
];

function applyLanguage(lang) {
  const dict = translations[lang] || translations.en;

  // Swap every translatable element's text.
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const value = dict[el.getAttribute("data-i18n")];
    if (value !== undefined) el.textContent = value;
  });

  // Set the document language (helps screen readers pronounce correctly).
  document.documentElement.lang = lang === "pt" ? "pt-BR" : lang;

  // Update the custom dropdown: current label + active option.
  const label = (LANGS.find((l) => l.code === lang) || LANGS[0]).label;
  document.querySelectorAll(".lang-select").forEach((sel) => {
    const current = sel.querySelector(".lang-current");
    if (current) current.textContent = label;
    sel.querySelectorAll(".lang-option").forEach((opt) => {
      const isActive = opt.dataset.lang === lang;
      opt.classList.toggle("active", isActive);
      opt.setAttribute("aria-selected", String(isActive));
    });
  });

  // Remember the choice for next time / other pages.
  try {
    localStorage.setItem(LANG_KEY, lang);
  } catch (e) {}
}

// Build a custom (non-native) dropdown inside a .lang-select container.
function buildLangDropdown(container) {
  container.innerHTML =
    '<button type="button" class="lang-trigger" aria-haspopup="listbox" aria-expanded="false">' +
    '<span class="lang-current">EN</span><span class="lang-caret" aria-hidden="true">▾</span>' +
    "</button>" +
    '<ul class="lang-menu" role="listbox" aria-label="Language">' +
    LANGS.map(
      (l) =>
        '<li class="lang-option" role="option" data-lang="' +
        l.code +
        '" tabindex="0">' +
        l.label +
        "</li>"
    ).join("") +
    "</ul>";

  const trigger = container.querySelector(".lang-trigger");
  const open = () => {
    container.classList.add("open");
    trigger.setAttribute("aria-expanded", "true");
  };
  const close = () => {
    container.classList.remove("open");
    trigger.setAttribute("aria-expanded", "false");
  };

  trigger.addEventListener("click", (e) => {
    e.stopPropagation();
    container.classList.contains("open") ? close() : open();
  });

  container.querySelectorAll(".lang-option").forEach((opt) => {
    const choose = () => {
      applyLanguage(opt.dataset.lang);
      close();
      trigger.focus();
    };
    opt.addEventListener("click", choose);
    opt.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        choose();
      }
    });
  });

  // Close on Escape or when clicking outside.
  container.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      close();
      trigger.focus();
    }
  });
  document.addEventListener("click", (e) => {
    if (!container.contains(e.target)) close();
  });
}

// Build the dropdown(s), then restore the saved choice (default English).
(function initI18n() {
  document.querySelectorAll(".lang-select").forEach(buildLangDropdown);

  let saved = null;
  try {
    saved = localStorage.getItem(LANG_KEY);
  } catch (e) {}
  applyLanguage(saved || "en");
})();
