// Simple client-side translations — no API, no cost. EN default, plus DE and PT-BR.
// Each key maps to text on the page (elements marked with data-i18n="key").
// NOTE: German and Portuguese drafted for review by a native speaker.
const translations = {
  en: {
    "nav.work": "Work",
    "nav.playground": "Playground",
    "nav.about": "About",
    "footer.contact": "Contact",

    "hero.tagline":
      "I design end-to-end product experiences for enterprise SaaS and B2B. Roots in fashion design and university teaching give me a different lens on craft, systems, and human behaviour, sharpened by 5+ years in product and an AI-augmented practice.",
    "hero.viewWork": "View work →",

    "work.title": "Work",
    "work.projectTitle": "Project title",
    "work.projectMeta": "Role · Year",

    "playground.title": "Playground",
    "playground.intro":
      "Experiments, side projects, and things I'm exploring, including AI-augmented design.",
    "playground.expTitle": "Experiment title",
    "playground.expMeta": "Type · Year",

    "about.title": "About Me",
    "about.p1":
      "I’m <span class=\"about-name\">Cássia Nunes</span>, a Senior Product Designer based in Berlin, specializing in B2B SaaS with a background in fashion design.",
    "about.p2":
      "Originally from Brazil, I’ve been living in Berlin for seven years, working with international teams across many cultures and backgrounds. I’m happiest when I learn and experience something new about another culture.",
    "about.p3":
      "Outside of design, I enjoy discovering new places, learning German, and doing sports. I’m always up for a bike trip, a spinning class, or a Feierabend with coworkers.",
    "about.photoCaption": "Team event at Windobona: zero gravity, zero deadlines",
    "about.photoCaption2": "Team event: boat trip, Berlin",
    "about.highlight":
      "I believe the best designers right now aren't the ones who fear AI. They're the ones who know how to direct it.",
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
      "Ich gestalte End-to-End-Produkterlebnisse für Enterprise-B2B-SaaS. Meine Wurzeln im Modedesign und in der Hochschullehre geben mir eine andere Perspektive auf Handwerk, Systeme und menschliches Verhalten, geschärft durch 5+ Jahre im Produktdesign und eine KI-gestützte Praxis.",
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
      "Ich bin <span class=\"about-name\">Cássia Nunes</span>, Senior Product Designerin mit Sitz in Berlin, spezialisiert auf B2B-SaaS, mit einem Hintergrund im Modedesign.",
    "about.p2":
      "Ursprünglich komme ich aus Brasilien und lebe seit sieben Jahren in Berlin. Ich arbeite mit internationalen Teams aus vielen Kulturen und mit unterschiedlichen Hintergründen. Am glücklichsten bin ich, wenn ich etwas Neues über eine andere Kultur lerne und erlebe.",
    "about.p3":
      "Außerhalb des Designs entdecke ich gerne neue Orte, lerne Deutsch und treibe Sport. Auf eine Radtour, einen Spinning-Kurs oder einen Feierabend mit Kolleginnen und Kollegen habe ich immer Lust.",
    "about.photoCaption": "Team-Event bei Windobona: null Schwerkraft, null Deadlines",
    "about.photoCaption2": "Team-Event: Bootstour, Berlin",
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
      "Eu projeto experiências de produto de ponta a ponta para SaaS B2B corporativo. Minhas raízes no design de moda e no ensino universitário me dão uma perspectiva diferente sobre craft, sistemas e comportamento humano, apurada por 5+ anos em produto e uma prática aumentada por IA.",
    "hero.viewWork": "Ver trabalhos →",

    "work.title": "Trabalhos",
    "work.projectTitle": "Título do projeto",
    "work.projectMeta": "Função · Ano",

    "playground.title": "Playground",
    "playground.intro":
      "Experimentos, projetos paralelos e coisas que estou explorando, incluindo design aumentado por IA.",
    "playground.expTitle": "Título do experimento",
    "playground.expMeta": "Tipo · Ano",

    "about.title": "Sobre mim",
    "about.p1":
      "Sou <span class=\"about-name\">Cássia Nunes</span>, Senior Product Designer baseada em Berlim, especializada em SaaS B2B, com background em design de moda.",
    "about.p2":
      "Originalmente do Brasil, moro em Berlim há sete anos, trabalhando com times internacionais de várias culturas e origens. Fico mais feliz quando aprendo e vivencio algo novo sobre outra cultura.",
    "about.p3":
      "Fora do design, gosto de descobrir lugares novos, aprender alemão e praticar esportes. Estou sempre a fim de uma pedalada, uma aula de spinning ou um Feierabend com colegas.",
    "about.photoCaption": "Evento de equipe no Windobona: gravidade zero, prazos zero",
    "about.photoCaption2": "Evento de equipe: passeio de barco, Berlim",
    "about.highlight":
      "Acredito que os melhores designers hoje não são os que temem a IA. São os que sabem como direcioná-la.",
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
    if (value === undefined) return;
    // Lines marked data-i18n-html may contain our own <span> markup (e.g. the red name).
    if (el.hasAttribute("data-i18n-html")) el.innerHTML = value;
    else el.textContent = value;
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
