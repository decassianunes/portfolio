// ============================================================
//  MINI FAQ CHATBOT
//  A tiny "smart FAQ" widget. No server, no AI, no cost — it just
//  matches what a visitor types (or clicks) against the facts below
//  and shows the matching answer. Everything runs in the browser.
// ============================================================


// ---- 1. THE FACTS ------------------------------------------
//  This is the ONLY part you need to edit.
//  Each topic has:
//    label    → the text on the suggested-question button
//    keywords → words a visitor might type to reach this answer
//    answer   → what the bot replies (HTML links are allowed)
//
//  To add a new topic: copy one block, change the three fields.
//  Anything marked TODO is a fact I couldn't find on your site yet —
//  replace the placeholder text with the real answer.

const TOPICS = [
  {
    label: "Visa / work status",
    keywords: ["visa", "work permit", "permit", "sponsorship", "sponsor", "authorization", "authorisation", "eligible", "relocate", "relocation"],
    // Real answer provided by Cássia.
    answer: "She has Permanent Residence in Germany and is currently applying for the passport. No plans to go away, and no more work for your HR ;)",
  },
  {
    label: "Experience",
    keywords: ["experience", "years", "background", "career", "work history", "senior", "history"],
    answer: "I'm a Product Designer with 5+ years in UX and interaction design for enterprise SaaS products, now combining that with an AI-augmented design practice. My work spans end-to-end product design — from user research and usability testing through prototyping and delivery — in cross-functional agile teams.",
  },
  {
    label: "Skills & tools",
    keywords: ["skill", "skills", "tools", "figma", "ai", "research", "design system", "stack", "software"],
    answer: "Top skills: Product Design, AI for Design, UX, Interaction Design, and UX Research. Daily tools include Figma AI, Claude, Cursor, and other LLMs — plus a working knowledge of code environments (GitHub, VS Code).",
  },
  {
    label: "Education",
    keywords: ["education", "study", "studied", "degree", "master", "ma", "university", "qualification"],
    answer: "I hold an MA in Consumer Behaviour, which pairs a research-led mindset with hands-on UX practice.",
  },
  {
    label: "Location",
    keywords: ["location", "where", "based", "berlin", "city", "country", "remote", "germany"],
    answer: "I'm based in Berlin, Germany.",
  },
  {
    label: "Contact",
    keywords: ["contact", "email", "reach", "hire", "linkedin", "github", "get in touch", "message"],
    answer:
      "Happy to talk! " +
      '<a href="mailto:nunes.decassia@gmail.com">Email</a> · ' +
      '<a href="https://www.linkedin.com/in/cassianunes/" target="_blank" rel="noopener">LinkedIn</a> · ' +
      '<a href="https://github.com/decassianunes" target="_blank" rel="noopener">GitHub</a>.',
  },
];

// The friendly first message, and the message shown when nothing matches.
const GREETING = "Cássia is my favourite Human, and I've got a lot of important and funny info about her. Ask me about her experience, skills, visa, or how to get in touch — just type your question below…";
const NO_MATCH = "Cássia is a nice Human, but did not provide this info yet. Try another question!";


// ---- 2. FIND THE BEST ANSWER -------------------------------
//  Lowercase what the visitor typed, then return the first topic
//  whose keywords appear in the text. Returns null if none match.

function findTopic(text) {
  const q = text.toLowerCase();
  return TOPICS.find((topic) => topic.keywords.some((word) => q.includes(word))) || null;
}


// ---- 3. THE ROBOT MASCOT (three states) --------------------
//  Cássia's own SVG artwork, in her brand. Three moods:
//    ACTIVE  → the happy everyday robot (corner + perched on the chat)
//    LOADING → dot-eyed robot, repeated small in the "thinking" row
//    ERROR   → greyed-out robot, shown when there's no answer yet
//  All marked aria-hidden — the BUTTON / text around them carries the
//  meaning for screen readers; the drawings themselves are decorative.

const ROBOT_ACTIVE_SVG = `
  <svg class="chatbot-robot-svg" viewBox="0 0 132 143" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M66 15.0527V30.1054" stroke="#CD1515" stroke-width="3.29276" stroke-linecap="round"/>
    <path d="M59.4141 11.2896C59.4141 14.9243 62.3649 17.8752 65.9996 17.8752C69.6342 17.8752 72.5851 14.9243 72.5851 11.2896C72.5851 7.65498 69.6342 4.7041 65.9996 4.7041C62.3649 4.7041 59.4141 7.65498 59.4141 11.2896V11.2896" fill="#900808"/>
    <path d="M21.312 50.8027V50.8027C24.1697 50.8027 26.4864 53.1194 26.4864 55.9771V68.2073C26.4864 71.0651 24.1697 73.3817 21.312 73.3817V73.3817C18.4543 73.3817 16.1377 71.0651 16.1377 68.2073V55.9771C16.1377 53.1194 18.4543 50.8027 21.312 50.8027V50.8027" fill="#900808"/>
    <path d="M110.687 50.8027V50.8027C113.545 50.8027 115.861 53.1194 115.861 55.9771V68.2073C115.861 71.0651 113.545 73.3817 110.687 73.3817V73.3817C107.829 73.3817 105.513 71.0651 105.513 68.2073V55.9771C105.513 53.1194 107.829 50.8027 110.687 50.8027V50.8027" fill="#900808"/>
    <path d="M46.243 28.2239H85.7562C98.2178 28.2239 108.335 38.3412 108.335 50.8028V65.8555C108.335 78.3171 98.2178 88.4344 85.7562 88.4344H46.243C33.7813 88.4344 23.6641 78.3171 23.6641 65.8555V50.8028C23.6641 38.3412 33.7813 28.2239 46.243 28.2239V28.2239" fill="white"/>
    <path d="M46.243 28.2239H85.7562C98.2178 28.2239 108.335 38.3412 108.335 50.8028V65.8555C108.335 78.3171 98.2178 88.4344 85.7562 88.4344H46.243C33.7813 88.4344 23.6641 78.3171 23.6641 65.8555V50.8028C23.6641 38.3412 33.7813 28.2239 46.243 28.2239V28.2239" stroke="#CD1515" stroke-width="2.82237"/>
    <path d="M50.9475 39.5132H81.0528C89.8857 39.5132 97.0462 46.6737 97.0462 55.5066V63.0329C97.0462 71.8658 89.8857 79.0263 81.0528 79.0263H50.9475C42.1146 79.0263 34.9541 71.8658 34.9541 63.0329V55.5066C34.9541 46.6737 42.1146 39.5132 50.9475 39.5132V39.5132" fill="#CD1515"/>
    <path d="M46.0547 56.9178C50.1314 50.6459 54.2082 50.6459 58.285 56.9178" stroke="white" stroke-width="4.23355" stroke-linecap="round"/>
    <path d="M73.3379 56.9178C77.4146 50.6459 81.4914 50.6459 85.5682 56.9178" stroke="white" stroke-width="4.23355" stroke-linecap="round"/>
    <path opacity="0.65" d="M40.4102 69.6184C40.4102 71.28 41.7591 72.629 43.4207 72.629C45.0822 72.629 46.4312 71.28 46.4312 69.6184C46.4312 67.9569 45.0822 66.6079 43.4207 66.6079C41.7591 66.6079 40.4102 67.9569 40.4102 69.6184V69.6184" fill="#900808"/>
    <path opacity="0.65" d="M85.5684 69.6184C85.5684 71.28 86.9173 72.629 88.5789 72.629C90.2404 72.629 91.5894 71.28 91.5894 69.6184C91.5894 67.9569 90.2404 66.6079 88.5789 66.6079C86.9173 66.6079 85.5684 67.9569 85.5684 69.6184V69.6184" fill="#900808"/>
    <path d="M55.651 91.2566H76.3484C85.6946 91.2566 93.2826 98.8446 93.2826 108.191V111.954C93.2826 121.3 85.6946 128.888 76.3484 128.888H55.651C46.3048 128.888 38.7168 121.3 38.7168 111.954V108.191C38.7168 98.8446 46.3048 91.2566 55.651 91.2566V91.2566" fill="white"/>
    <path d="M55.651 91.2566H76.3484C85.6946 91.2566 93.2826 98.8446 93.2826 108.191V111.954C93.2826 121.3 85.6946 128.888 76.3484 128.888H55.651C46.3048 128.888 38.7168 121.3 38.7168 111.954V108.191C38.7168 98.8446 46.3048 91.2566 55.651 91.2566V91.2566" stroke="#CD1515" stroke-width="2.82237"/>
    <path opacity="0.9" d="M58.9443 110.073C58.9443 113.967 62.106 117.128 66.0003 117.128C69.8945 117.128 73.0562 113.967 73.0562 110.073C73.0562 106.178 69.8945 103.017 66.0003 103.017C62.106 103.017 58.9443 106.178 58.9443 110.073V110.073" fill="#900808"/>
    <path d="M27.427 95.0198V95.0198C30.5424 95.0198 33.0717 97.5491 33.0717 100.665V114.776C33.0717 117.892 30.5424 120.421 27.427 120.421V120.421C24.3115 120.421 21.7822 117.892 21.7822 114.776V100.665C21.7822 97.5491 24.3115 95.0198 27.427 95.0198V95.0198" fill="white"/>
    <path d="M27.427 95.0198V95.0198C30.5424 95.0198 33.0717 97.5491 33.0717 100.665V114.776C33.0717 117.892 30.5424 120.421 27.427 120.421V120.421C24.3115 120.421 21.7822 117.892 21.7822 114.776V100.665C21.7822 97.5491 24.3115 95.0198 27.427 95.0198V95.0198" stroke="#CD1515" stroke-width="2.82237"/>
    <path d="M104.572 95.0198V95.0198C107.688 95.0198 110.217 97.5491 110.217 100.665V114.776C110.217 117.892 107.688 120.421 104.572 120.421V120.421C101.457 120.421 98.9277 117.892 98.9277 114.776V100.665C98.9277 97.5491 101.457 95.0198 104.572 95.0198V95.0198" fill="white"/>
    <path d="M104.572 95.0198V95.0198C107.688 95.0198 110.217 97.5491 110.217 100.665V114.776C110.217 117.892 107.688 120.421 104.572 120.421V120.421C101.457 120.421 98.9277 117.892 98.9277 114.776V100.665C98.9277 97.5491 101.457 95.0198 104.572 95.0198V95.0198" stroke="#CD1515" stroke-width="2.82237"/>
  </svg>
`;

const ROBOT_LOADING_SVG = `
  <svg class="chatbot-loadbot-svg" viewBox="0 0 132 143" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M66 15.0527V30.1054" stroke="#CD1515" stroke-width="3.29276" stroke-linecap="round"/>
    <path d="M59.4141 11.2896C59.4141 14.9243 62.3649 17.8752 65.9996 17.8752C69.6342 17.8752 72.5851 14.9243 72.5851 11.2896C72.5851 7.65498 69.6342 4.7041 65.9996 4.7041C62.3649 4.7041 59.4141 7.65498 59.4141 11.2896V11.2896" fill="#900808"/>
    <path d="M21.312 50.8027V50.8027C24.1697 50.8027 26.4864 53.1194 26.4864 55.9771V68.2073C26.4864 71.0651 24.1697 73.3817 21.312 73.3817V73.3817C18.4543 73.3817 16.1377 71.0651 16.1377 68.2073V55.9771C16.1377 53.1194 18.4543 50.8027 21.312 50.8027V50.8027" fill="#900808"/>
    <path d="M110.687 50.8027V50.8027C113.545 50.8027 115.861 53.1194 115.861 55.9771V68.2073C115.861 71.0651 113.545 73.3817 110.687 73.3817V73.3817C107.829 73.3817 105.513 71.0651 105.513 68.2073V55.9771C105.513 53.1194 107.829 50.8027 110.687 50.8027V50.8027" fill="#900808"/>
    <path d="M46.243 28.2239H85.7562C98.2178 28.2239 108.335 38.3412 108.335 50.8028V65.8555C108.335 78.3171 98.2178 88.4344 85.7562 88.4344H46.243C33.7813 88.4344 23.6641 78.3171 23.6641 65.8555V50.8028C23.6641 38.3412 33.7813 28.2239 46.243 28.2239V28.2239" fill="white"/>
    <path d="M46.243 28.2239H85.7562C98.2178 28.2239 108.335 38.3412 108.335 50.8028V65.8555C108.335 78.3171 98.2178 88.4344 85.7562 88.4344H46.243C33.7813 88.4344 23.6641 78.3171 23.6641 65.8555V50.8028C23.6641 38.3412 33.7813 28.2239 46.243 28.2239V28.2239" stroke="#CD1515" stroke-width="2.82237"/>
    <path d="M50.9475 39.5132H81.0528C89.8857 39.5132 97.0462 46.6737 97.0462 55.5066V63.0329C97.0462 71.8658 89.8857 79.0263 81.0528 79.0263H50.9475C42.1146 79.0263 34.9541 71.8658 34.9541 63.0329V55.5066C34.9541 46.6737 42.1146 39.5132 50.9475 39.5132V39.5132" fill="#CD1515"/>
    <path d="M55.651 91.2566H76.3484C85.6946 91.2566 93.2826 98.8446 93.2826 108.191V111.954C93.2826 121.3 85.6946 128.888 76.3484 128.888H55.651C46.3048 128.888 38.7168 121.3 38.7168 111.954V108.191C38.7168 98.8446 46.3048 91.2566 55.651 91.2566V91.2566" fill="white"/>
    <path d="M55.651 91.2566H76.3484C85.6946 91.2566 93.2826 98.8446 93.2826 108.191V111.954C93.2826 121.3 85.6946 128.888 76.3484 128.888H55.651C46.3048 128.888 38.7168 121.3 38.7168 111.954V108.191C38.7168 98.8446 46.3048 91.2566 55.651 91.2566V91.2566" stroke="#CD1515" stroke-width="2.82237"/>
    <path opacity="0.9" d="M58.9443 110.073C58.9443 113.967 62.106 117.128 66.0003 117.128C69.8945 117.128 73.0562 113.967 73.0562 110.073C73.0562 106.178 69.8945 103.017 66.0003 103.017C62.106 103.017 58.9443 106.178 58.9443 110.073V110.073" fill="#900808"/>
    <path d="M27.427 95.0198V95.0198C30.5424 95.0198 33.0717 97.5491 33.0717 100.665V114.776C33.0717 117.892 30.5424 120.421 27.427 120.421V120.421C24.3115 120.421 21.7822 117.892 21.7822 114.776V100.665C21.7822 97.5491 24.3115 95.0198 27.427 95.0198V95.0198" fill="white"/>
    <path d="M27.427 95.0198V95.0198C30.5424 95.0198 33.0717 97.5491 33.0717 100.665V114.776C33.0717 117.892 30.5424 120.421 27.427 120.421V120.421C24.3115 120.421 21.7822 117.892 21.7822 114.776V100.665C21.7822 97.5491 24.3115 95.0198 27.427 95.0198V95.0198" stroke="#CD1515" stroke-width="2.82237"/>
    <path d="M104.572 95.0198V95.0198C107.688 95.0198 110.217 97.5491 110.217 100.665V114.776C110.217 117.892 107.688 120.421 104.572 120.421V120.421C101.457 120.421 98.9277 117.892 98.9277 114.776V100.665C98.9277 97.5491 101.457 95.0198 104.572 95.0198V95.0198" fill="white"/>
    <path d="M104.572 95.0198V95.0198C107.688 95.0198 110.217 97.5491 110.217 100.665V114.776C110.217 117.892 107.688 120.421 104.572 120.421V120.421C101.457 120.421 98.9277 117.892 98.9277 114.776V100.665C98.9277 97.5491 101.457 95.0198 104.572 95.0198V95.0198" stroke="#CD1515" stroke-width="2.82237"/>
    <circle cx="50.3743" cy="55.7959" r="3.47388" fill="white"/>
    <circle cx="81.6272" cy="55.7959" r="3.47388" fill="white"/>
  </svg>
`;

const ROBOT_ERROR_SVG = `
  <svg class="chatbot-errbot-svg" viewBox="0 0 100 126" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
    <path d="M49.8623 10.3486V25.4013" stroke="#1E1E1E" stroke-opacity="0.4" stroke-width="3.29276" stroke-linecap="round"/>
    <path d="M43.2764 6.58553C43.2764 10.2202 46.2272 13.1711 49.8619 13.1711C53.4965 13.1711 56.4474 10.2202 56.4474 6.58553C56.4474 2.95088 53.4965 0 49.8619 0C46.2272 0 43.2764 2.95088 43.2764 6.58553V6.58553" fill="#505050" fill-opacity="0.4"/>
    <path d="M5.17434 46.0986V46.0986C8.03205 46.0986 10.3487 48.4153 10.3487 51.273V63.5032C10.3487 66.3609 8.03205 68.6776 5.17434 68.6776V68.6776C2.31663 68.6776 0 66.3609 0 63.5032V51.273C0 48.4153 2.31663 46.0986 5.17434 46.0986V46.0986" fill="#505050" fill-opacity="0.4"/>
    <path d="M94.5493 46.0986V46.0986C97.4071 46.0986 99.7237 48.4153 99.7237 51.273V63.5032C99.7237 66.3609 97.4071 68.6776 94.5493 68.6776V68.6776C91.6916 68.6776 89.375 66.3609 89.375 63.5032V51.273C89.375 48.4153 91.6916 46.0986 94.5493 46.0986V46.0986" fill="#505050" fill-opacity="0.4"/>
    <path d="M30.1053 23.5198H69.6185C82.0801 23.5198 92.1974 33.6371 92.1974 46.0987V61.1514C92.1974 73.613 82.0801 83.7303 69.6185 83.7303H30.1053C17.6437 83.7303 7.52637 73.613 7.52637 61.1514V46.0987C7.52637 33.6371 17.6437 23.5198 30.1053 23.5198V23.5198" fill="white"/>
    <path d="M30.1053 23.5198H69.6185C82.0801 23.5198 92.1974 33.6371 92.1974 46.0987V61.1514C92.1974 73.613 82.0801 83.7303 69.6185 83.7303H30.1053C17.6437 83.7303 7.52637 73.613 7.52637 61.1514V46.0987C7.52637 33.6371 17.6437 23.5198 30.1053 23.5198V23.5198" stroke="#1E1E1E" stroke-opacity="0.4" stroke-width="2.82237"/>
    <path d="M34.8098 34.8091H64.9151C73.748 34.8091 80.9085 41.9696 80.9085 50.8025V58.3288C80.9085 67.1617 73.748 74.3222 64.9151 74.3222H34.8098C25.9769 74.3222 18.8164 67.1617 18.8164 58.3288V50.8025C18.8164 41.9696 25.9769 34.8091 34.8098 34.8091V34.8091" fill="#1E1E1E" fill-opacity="0.4"/>
    <path d="M29.917 52.2137C37.0158 52.2136 36.2485 52.2136 42.1473 52.2137M56.7708 52.2141C63.8696 52.2141 63.1023 52.214 69.0011 52.2141" stroke="white" stroke-width="4.23355" stroke-linecap="round"/>
    <path d="M39.5133 86.5525H60.2107C69.5569 86.5525 77.1449 94.1405 77.1449 103.487V107.25C77.1449 116.596 69.5569 124.184 60.2107 124.184H39.5133C30.1671 124.184 22.5791 116.596 22.5791 107.25V103.487C22.5791 94.1405 30.1671 86.5525 39.5133 86.5525V86.5525" fill="white"/>
    <path d="M39.5133 86.5525H60.2107C69.5569 86.5525 77.1449 94.1405 77.1449 103.487V107.25C77.1449 116.596 69.5569 124.184 60.2107 124.184H39.5133C30.1671 124.184 22.5791 116.596 22.5791 107.25V103.487C22.5791 94.1405 30.1671 86.5525 39.5133 86.5525V86.5525" stroke="#1E1E1E" stroke-opacity="0.4" stroke-width="2.82237"/>
    <path opacity="0.9" d="M42.8066 105.368C42.8066 109.263 45.9683 112.424 49.8626 112.424C53.7568 112.424 56.9185 109.263 56.9185 105.368C56.9185 101.474 53.7568 98.3125 49.8626 98.3125C45.9683 98.3125 42.8066 101.474 42.8066 105.368V105.368" fill="#505050" fill-opacity="0.4"/>
    <path d="M11.2893 90.3159V90.3159C14.4047 90.3159 16.934 92.8452 16.934 95.9607V110.072C16.934 113.188 14.4047 115.717 11.2893 115.717V115.717C8.17385 115.717 5.64453 113.188 5.64453 110.072V95.9607C5.64453 92.8452 8.17385 90.3159 11.2893 90.3159V90.3159" fill="white"/>
    <path d="M11.2893 90.3159V90.3159C14.4047 90.3159 16.934 92.8452 16.934 95.9607V110.072C16.934 113.188 14.4047 115.717 11.2893 115.717V115.717C8.17385 115.717 5.64453 113.188 5.64453 110.072V95.9607C5.64453 92.8452 8.17385 90.3159 11.2893 90.3159V90.3159" stroke="#1E1E1E" stroke-opacity="0.4" stroke-width="2.82237"/>
    <path d="M88.4348 90.3159V90.3159C91.5502 90.3159 94.0795 92.8452 94.0795 95.9607V110.072C94.0795 113.188 91.5502 115.717 88.4348 115.717V115.717C85.3194 115.717 82.79 113.188 82.79 110.072V95.9607C82.79 92.8452 85.3194 90.3159 88.4348 90.3159V90.3159" fill="white"/>
    <path d="M88.4348 90.3159V90.3159C91.5502 90.3159 94.0795 92.8452 94.0795 95.9607V110.072C94.0795 113.188 91.5502 115.717 88.4348 115.717V115.717C85.3194 115.717 82.79 113.188 82.79 110.072V95.9607C82.79 92.8452 85.3194 90.3159 88.4348 90.3159V90.3159" stroke="#1E1E1E" stroke-opacity="0.4" stroke-width="2.82237"/>
  </svg>
`;

//  Styles for the robot + a couple of panel tweaks. We inject them
//  from here (instead of styles.css) so this whole experiment stays
//  local-only and never touches the live site.
//  KEY ACCESSIBILITY RULE: the float/bob animations live inside
//  `@media (prefers-reduced-motion: no-preference)`, so they only run
//  for people who have NOT asked their device to reduce motion.

const ROBOT_STYLES = `
  /* Stack the robot + panel in a bottom-right column so the robot sits in
     the corner when closed, and perches on the panel's corner when open. */
  .chatbot {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }

  /* The robot is an in-flow button now (no longer floating mid-page). */
  .chatbot-robot {
    position: relative;
    z-index: 2;                 /* above the panel, so it can perch on its corner */
    width: 116px;
    padding: 0;
    background: none;
    border: none;
    cursor: pointer;
    filter: drop-shadow(0 10px 9px rgba(205, 21, 21, 0.18));   /* soft red shadow */
  }
  .chatbot-robot[hidden] { display: none; }
  .chatbot-robot-svg { display: block; width: 100%; height: auto; }

  /* When the chat opens, shrink the robot and let it overlap the panel's
     top-right corner (mockup 3). */
  .chatbot--open .chatbot-robot {
    width: 90px;
    margin-bottom: -24px;       /* dip down onto the header */
    margin-right: -2px;         /* peek just past the corner */
  }

  /* The panel now flows inside the column (was absolutely positioned). */
  .chatbot-panel {
    position: relative;
    right: auto;
    bottom: auto;
  }

  /* Keyboard focus ring on the robot. */
  .chatbot-robot:focus-visible {
    outline: 3px solid var(--red);
    outline-offset: 6px;
    border-radius: 20px;
  }

  /* On the homepage the robot IS the trigger, so hide the corner pill. */
  .chatbot--has-robot .chatbot-toggle { display: none; }

  /* Header + close button. */
  .chatbot-header { display: flex; align-items: center; justify-content: space-between; }
  .chatbot-close {
    background: none; border: none; color: var(--white);
    font-size: 22px; line-height: 1; cursor: pointer; padding: 0 2px;
  }
  .chatbot-close:focus-visible { outline: 2px solid var(--white); outline-offset: 2px; }

  /* Active text-input state — a clear red border when focused. */
  .chatbot-input:focus,
  .chatbot-input:focus-visible {
    border: 2px solid var(--red);
    outline: none;
  }

  /* Loading "thinking" row — small robots at low opacity. */
  .chatbot-loading { background: transparent; padding: 4px 0; }
  .chatbot-loading-row { display: flex; gap: 1px; align-items: center; }
  .chatbot-loadbot-svg { display: block; width: 30px; height: auto; }
  .chatbot-loadbot { opacity: 0.28; }

  /* Error / no-answer message — grey robot centred above the text. */
  .chatbot-error { text-align: center; }
  .chatbot-errbot-svg { display: block; width: 78px; height: auto; margin: 2px auto 10px; }

  /* Visually-hidden helper (announced to screen readers, not shown). */
  .chatbot-visually-hidden {
    position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px;
    overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; border: 0;
  }

  /* Motion — ONLY for people who haven't requested reduced motion. */
  @media (prefers-reduced-motion: no-preference) {
    .chatbot:not(.chatbot--open) .chatbot-robot-svg {
      animation: chatbot-float 3s ease-in-out infinite;
    }
    .chatbot-loadbot { animation: chatbot-loadpulse 1.1s ease-in-out infinite; }
    .chatbot-loadbot:nth-child(1) { animation-delay: 0s; }
    .chatbot-loadbot:nth-child(2) { animation-delay: 0.12s; }
    .chatbot-loadbot:nth-child(3) { animation-delay: 0.24s; }
    .chatbot-loadbot:nth-child(4) { animation-delay: 0.36s; }
    .chatbot-loadbot:nth-child(5) { animation-delay: 0.48s; }
    .chatbot-loadbot:nth-child(6) { animation-delay: 0.60s; }
    .chatbot-loadbot:nth-child(7) { animation-delay: 0.72s; }
  }
  @keyframes chatbot-float {
    0%, 100% { transform: translateY(0); }
    50%      { transform: translateY(-10px); }
  }
  @keyframes chatbot-loadpulse {
    0%, 100% { opacity: 0.16; }
    50%      { opacity: 0.6; }
  }

  /* On phones, keep the corner placement; just size the robot down. */
  @media (max-width: 700px) {
    .chatbot-robot { width: 92px; }
    .chatbot--open .chatbot-robot { width: 74px; margin-bottom: -18px; }
  }
`;

function injectRobotStyles() {
  if (document.getElementById("chatbot-robot-styles")) return;   // don't add twice
  const style = document.createElement("style");
  style.id = "chatbot-robot-styles";
  style.textContent = ROBOT_STYLES;
  document.head.appendChild(style);
}


// ---- 4. BUILD THE WIDGET -----------------------------------
//  We create the chat HTML from JavaScript so any page can show
//  the bot just by including this one script. You don't edit this.

function buildChatbot() {
  injectRobotStyles();

  // The robot greeter only makes sense on a page with a hero (the homepage).
  // On other pages we fall back to the small corner pill.
  const hasHero = !!document.querySelector(".hero");

  const root = document.createElement("div");
  root.className = "chatbot" + (hasHero ? " chatbot--has-robot" : "");
  // DOM order matters: robot first (sits on top of the column), then the
  // panel, then the fallback pill last (bottom-most). Because the whole
  // column is pinned to the bottom-right, this puts the robot in the corner
  // when closed and perched above the panel when open.
  root.innerHTML = `
    <button class="chatbot-robot" aria-label="Open chat — ask me about Cássia" aria-expanded="false"${hasHero ? "" : " hidden"}>
      ${ROBOT_ACTIVE_SVG}
    </button>
    <div class="chatbot-panel" role="dialog" aria-modal="false" aria-label="Ask me about Cássia" hidden>
      <div class="chatbot-header">
        <span>Ask me about Cássia…</span>
        <button class="chatbot-close" type="button" aria-label="Close chat">×</button>
      </div>
      <div class="chatbot-messages" aria-live="polite"></div>
      <form class="chatbot-form">
        <input class="chatbot-input" type="text" placeholder="Type a question…" aria-label="Type your question" autocomplete="off" />
        <button class="chatbot-send" type="submit">Ask</button>
      </form>
    </div>
    <button class="chatbot-toggle" aria-label="Open chat" aria-expanded="false">
      <span class="chatbot-toggle-open">Ask me anything</span>
      <span class="chatbot-toggle-close" aria-hidden="true">×</span>
    </button>
  `;
  document.body.appendChild(root);

  const toggle = root.querySelector(".chatbot-toggle");
  const robot = root.querySelector(".chatbot-robot");
  const panel = root.querySelector(".chatbot-panel");
  const closeBtn = root.querySelector(".chatbot-close");
  const messages = root.querySelector(".chatbot-messages");
  const form = root.querySelector(".chatbot-form");
  const input = root.querySelector(".chatbot-input");

  // Whichever control opens the chat on this page — used to return
  // focus there when the chat closes (important for keyboard users).
  const trigger = hasHero ? robot : toggle;

  // Add one message bubble. `who` is "bot" or "user".
  function addMessage(html, who) {
    const bubble = document.createElement("div");
    bubble.className = "chatbot-msg chatbot-msg--" + who;
    bubble.innerHTML = html;
    messages.appendChild(bubble);
    messages.scrollTop = messages.scrollHeight;   // keep the newest in view
  }

  // Show the "thinking" row of little robots. Returns the element so we
  // can remove it once the answer is ready.
  function addLoading() {
    const el = document.createElement("div");
    el.className = "chatbot-msg chatbot-msg--bot chatbot-loading";
    const bots = Array.from({ length: 7 })
      .map(() => `<span class="chatbot-loadbot">${ROBOT_LOADING_SVG}</span>`)
      .join("");
    // The hidden "Thinking…" is announced to screen readers; the robots are decorative.
    el.innerHTML =
      `<span class="chatbot-visually-hidden">Thinking…</span>` +
      `<span class="chatbot-loading-row" aria-hidden="true">${bots}</span>`;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
    return el;
  }

  // Show the grey error robot + the "no info yet" message.
  function addErrorMessage() {
    const el = document.createElement("div");
    el.className = "chatbot-msg chatbot-msg--bot chatbot-error";
    el.innerHTML = ROBOT_ERROR_SVG + `<span class="chatbot-error-text">${NO_MATCH}</span>`;
    messages.appendChild(el);
    messages.scrollTop = messages.scrollHeight;
  }

  // React to a question — whether typed or from a chip.
  // We show a short "thinking" animation, then reveal the answer (or error).
  function handleQuestion(text) {
    addMessage(text, "user");
    const topic = findTopic(text);
    const loader = addLoading();
    // Reduced-motion visitors get a much shorter, calmer pause.
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.setTimeout(() => {
      loader.remove();
      if (topic) addMessage(topic.answer, "bot");
      else addErrorMessage();
    }, reduce ? 250 : 900);
  }

  // One place that opens or closes the panel and keeps everything in sync.
  function setOpen(open) {
    panel.hidden = !open;
    root.classList.toggle("chatbot--open", open);
    toggle.setAttribute("aria-expanded", String(open));
    robot.setAttribute("aria-expanded", String(open));
    if (open) {
      if (messages.childElementCount === 0) addMessage(GREETING, "bot");  // greet on first open
      input.focus();
    } else {
      trigger.focus();   // send keyboard focus back to the opener
    }
  }

  robot.addEventListener("click", () => setOpen(true));
  toggle.addEventListener("click", () => setOpen(panel.hidden));   // pill toggles
  closeBtn.addEventListener("click", () => setOpen(false));

  // Escape closes the dialog — standard, expected accessibility behaviour.
  panel.addEventListener("keydown", (e) => {
    if (e.key === "Escape") setOpen(false);
  });

  // Handle typed questions.
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    handleQuestion(text);
    input.value = "";
  });
}

// Build the bot once the page is ready.
// If the page is still loading, wait for the "ready" signal. But if the page
// has ALREADY finished loading (which happens when this script is added late,
// e.g. injected by another script), that signal has passed — so build now.
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", buildChatbot);
} else {
  buildChatbot();
}
