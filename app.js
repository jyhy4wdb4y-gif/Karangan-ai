/* =========================================================
   KARANGAN AI
   MASTER PRD v2.0
   FULL APP CONTROLLER

   Integrated with:
   - index.html
   - style.css
   - stories.js
   - vocabulary.js
   - avatar.js
   - /api/ai
   ========================================================= */

"use strict";


/* =========================================================
   1. APP CONFIG
   ========================================================= */

const APP_CONFIG = {
  version: "2.1",
  storageKey: "karanganAI_v2_state",

  missionOrder: [
    "story",
    "vocabulary",
    "sentence-builder",
    "grammar-rain",
    "sentence-recall",
    "creative-studio",
    "ai-feedback"
  ],

  xpRewards: {
    story: 20,
    vocabulary: 10,
    "sentence-builder": 15,
    "grammar-rain": 15,
    "sentence-recall": 15,
    "creative-studio": 25,
    "ai-feedback": 20
  },

  levels: [
    {
      level: 1,
      minXp: 0,
      name: "Penjelajah Bahasa"
    },
    {
      level: 2,
      minXp: 150,
      name: "Pemburu Perkataan"
    },
    {
      level: 3,
      minXp: 350,
      name: "Pembina Ayat"
    },
    {
      level: 4,
      minXp: 650,
      name: "Penulis Muda"
    },
    {
      level: 5,
      minXp: 1000,
      name: "Jaguh Bahasa"
    }
  ]
};


/* =========================================================
   2. DEFAULT STATE
   ========================================================= */

const DEFAULT_STATE = {
  studentName: "Penjelajah Bahasa",

  xp: 120,

  streak: 3,

  completedMissions: [],

  storiesCompleted: 1,

  vocabulary: [],

  savedWriting: "",

  badges: [
    "first-step"
  ],

  progress: {
    reading: 20,
    vocabulary: 10,
    writing: 5
  },

  currentStoryId: null,

  lastScreen: "home",

  lastVisitDate: null
};


let appState = loadState();

let currentScreen = "home";

let previousScreen = "home";

let activeModule = null;

let currentStory = null;

let currentTranslationWord = null;

let currentTranslationData = null;

let vocabularyReviewSession = {
  words: [],
  index: 0,
  answered: false
};


/* =========================================================
   3. DOM HELPERS
   ========================================================= */

function $(selector) {
  return document.querySelector(selector);
}


function $$(selector) {
  return Array.from(
    document.querySelectorAll(
      selector
    )
  );
}


function byId(id) {
  return document.getElementById(
    id
  );
}


function safeText(
  element,
  value
) {
  if (element) {
    element.textContent = value;
  }
}


/* =========================================================
   4. STORAGE
   ========================================================= */

function loadState() {

  try {

    const saved =
      localStorage.getItem(
        APP_CONFIG.storageKey
      );


    if (!saved) {

      return structuredCloneSafe(
        DEFAULT_STATE
      );

    }


    const parsed =
      JSON.parse(saved);


    return {
      ...structuredCloneSafe(
        DEFAULT_STATE
      ),

      ...parsed,

      progress: {
        ...DEFAULT_STATE.progress,
        ...(parsed.progress || {})
      },

      completedMissions:
        Array.isArray(
          parsed.completedMissions
        )
          ? parsed.completedMissions
          : [],

      vocabulary:
        Array.isArray(
          parsed.vocabulary
        )
          ? parsed.vocabulary
          : [],

      badges:
        Array.isArray(
          parsed.badges
        )
          ? parsed.badges
          : []
    };

  } catch (error) {

    console.warn(
      "Unable to load app state:",
      error
    );


    return structuredCloneSafe(
      DEFAULT_STATE
    );

  }

}


function saveState() {

  try {

    localStorage.setItem(
      APP_CONFIG.storageKey,
      JSON.stringify(
        appState
      )
    );

  } catch (error) {

    console.warn(
      "Unable to save app state:",
      error
    );

  }

}


function structuredCloneSafe(
  value
) {

  if (
    typeof structuredClone ===
    "function"
  ) {

    return structuredClone(
      value
    );

  }


  return JSON.parse(
    JSON.stringify(
      value
    )
  );

}


/* =========================================================
   5. VOCABULARY ENGINE BRIDGE
   ========================================================= */

function getVocabularyEngine() {

  if (
    window.KaranganVocabulary &&
    typeof window.KaranganVocabulary ===
      "object"
  ) {

    return window.KaranganVocabulary;

  }


  return null;

}


function getVocabularyWords() {

  const engine =
    getVocabularyEngine();


  if (
    engine &&
    typeof engine.getWords ===
      "function"
  ) {

    try {

      return engine.getWords();

    } catch (error) {

      console.warn(
        "Vocabulary engine error:",
        error
      );

    }

  }


  return appState.vocabulary.map(
    (item, index) => ({
      id:
        item.id ||
        `legacy-${index}`,

      word:
        item.word || "",

      translation:
        item.translation || "",

      meaning:
        item.meaning || "",

      example:
        item.example || "",

      category:
        item.category ||
        "Perkataan Baharu",

      emoji:
        item.emoji ||
        "🧠",

      mastered:
        Boolean(
          item.mastered
        ),

      reviewCount:
        Number(
          item.reviewCount || 0
        )
    })
  );

}


function getVocabularyStats() {

  const engine =
    getVocabularyEngine();


  if (
    engine &&
    typeof engine.getStats ===
      "function"
  ) {

    try {

      return engine.getStats();

    } catch (error) {

      console.warn(
        "Unable to read vocabulary stats:",
        error
      );

    }

  }


  const words =
    getVocabularyWords();


  const mastered =
    words.filter(
      item =>
        item.mastered
    ).length;


  return {
    total:
      words.length,

    mastered,

    learning:
      words.length -
      mastered,

    masteryPercent:
      words.length
        ? Math.round(
            mastered /
            words.length *
            100
          )
        : 0,

    daily: {
      reviewed: 0,
      target:
        Math.min(
          5,
          Math.max(
            1,
            words.length
          )
        ),
      completed: false
    }
  };

}


/* =========================================================
   6. XP BRIDGE
   vocabulary.js can call window.addXP()
   ========================================================= */

window.addXP =
  function addXP(
    amount = 0,
    reason = ""
  ) {

    const value =
      Number(amount) || 0;


    if (value <= 0) {
      return;
    }


    appState.xp +=
      value;


    saveState();

    updateAllUI();


    if (reason) {

      showToast(
        `⭐ +${value} XP · ${reason}`
      );

    }

  };


/* =========================================================
   7. INITIALIZE APP
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initApp
);


function initApp() {

  updateDailyStreak();

  bindNavigation();

  bindMissionCards();

  bindStoryButtons();

  bindWriting();

  bindMentor();

  bindTranslationPopup();

  bindModuleControls();

  bindModal();

  bindQuickTools();

  bindVocabularyEvents();

  updateAllUI();

  initializeAvatar();

  showScreen(
    appState.lastScreen ||
      "home",
    false
  );

  setTimeout(
    hideLoadingScreen,
    450
  );

}


/* =========================================================
   8. VOCABULARY EVENTS
   ========================================================= */

function bindVocabularyEvents() {

  window.addEventListener(
    "karangan:vocabulary-changed",
    () => {

      syncVocabularyProgress();

      updateAllUI();

    }
  );


  window.addEventListener(
    "karangan:mission-completed",
    event => {

      if (
        event.detail?.mission ===
        "vocabulary"
      ) {

        completeMission(
          "vocabulary"
        );

      }

    }
  );

}


function syncVocabularyProgress() {

  const stats =
    getVocabularyStats();


  const score =
    Math.min(
      100,
      Math.max(
        10,
        stats.total * 5 +
        stats.mastered * 5
      )
    );


  appState.progress.vocabulary =
    Math.max(
      appState.progress.vocabulary,
      score
    );


  saveState();

}


/* =========================================================
   9. LOADING
   ========================================================= */

function hideLoadingScreen() {

  const loading =
    byId(
      "loadingScreen"
    );


  if (!loading) {
    return;
  }


  loading.classList.add(
    "hide"
  );


  setTimeout(
    () => {

      loading.style.display =
        "none";

    },
    350
  );

}


/* =========================================================
   10. NAVIGATION
   ========================================================= */

function bindNavigation() {

  $$("[data-nav]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const target =
            button.dataset.nav;


          showScreen(
            target
          );

        }
      );

    }
  );

}


function showScreen(
  screenName,
  remember = true
) {

  const target =
    byId(
      `${screenName}Screen`
    );


  if (!target) {
    return;
  }


  previousScreen =
    currentScreen;


  currentScreen =
    screenName;


  $$(".screen").forEach(
    screen => {

      screen.classList.remove(
        "active-screen"
      );

      screen.hidden =
        true;

    }
  );


  target.hidden =
    false;


  target.classList.add(
    "active-screen"
  );


  const immersive =
    screenName ===
      "story" ||
    screenName ===
      "module";


  const bottomNav =
    byId(
      "bottomNavigation"
    );


  const floatingMentor =
    byId(
      "mentorFloatingButton"
    );


  if (bottomNav) {

    bottomNav.style.display =
      immersive
        ? "none"
        : "";

  }


  if (floatingMentor) {

    floatingMentor.style.display =
      immersive
        ? "none"
        : "";

  }


  $$(".nav-item").forEach(
    item => {

      item.classList.toggle(
        "active",
        item.dataset.nav ===
          screenName
      );

    }
  );


  if (
    remember &&
    [
      "home",
      "learn",
      "create",
      "me"
    ].includes(
      screenName
    )
  ) {

    appState.lastScreen =
      screenName;


    saveState();

  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });


  if (
    screenName ===
    "me"
  ) {

    initializeAvatar();

  }

}


/* =========================================================
   11. DAILY STREAK
   ========================================================= */

function updateDailyStreak() {

  const today =
    new Date()
      .toISOString()
      .slice(
        0,
        10
      );


  if (
    !appState.lastVisitDate
  ) {

    appState.lastVisitDate =
      today;


    saveState();

    return;

  }


  if (
    appState.lastVisitDate ===
    today
  ) {

    return;

  }


  const previous =
    new Date(
      appState.lastVisitDate +
      "T00:00:00"
    );


  const current =
    new Date(
      today +
      "T00:00:00"
    );


  const difference =
    Math.round(
      (
        current -
        previous
      ) /
      86400000
    );


  if (
    difference === 1
  ) {

    appState.streak += 1;

  } else if (
    difference > 1
  ) {

    appState.streak = 1;

  }


  appState.lastVisitDate =
    today;


  saveState();

}


/* =========================================================
   12. UPDATE ALL UI
   ========================================================= */

function updateAllUI() {

  updateHeader();

  updateMissionUI();

  updateProfileUI();

  updateWritingUI();

  updateProgressUI();

  updateBadgeUI();

}


function updateHeader() {

  safeText(
    byId(
      "xpCount"
    ),
    appState.xp
  );


  safeText(
    byId(
      "streakCount"
    ),
    appState.streak
  );

}


/* =========================================================
   13. LEVEL SYSTEM
   ========================================================= */

function getCurrentLevel() {

  let current =
    APP_CONFIG.levels[0];


  APP_CONFIG.levels.forEach(
    level => {

      if (
        appState.xp >=
        level.minXp
      ) {

        current =
          level;

      }

    }
  );


  return current;

}


function getNextLevel() {

  const current =
    getCurrentLevel();


  return (
    APP_CONFIG.levels.find(
      level =>
        level.level ===
        current.level + 1
    ) ||
    null
  );

}


/* =========================================================
   14. MISSION SYSTEM
   ========================================================= */

function bindMissionCards() {

  $$("[data-module]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const module =
            button.dataset.module;


          openModule(
            module
          );

        }
      );

    }
  );


  const startMission =
    byId(
      "startMissionButton"
    );


  if (startMission) {

    startMission.addEventListener(
      "click",
      startNextMission
    );

  }

}


function startNextMission() {

  const next =
    APP_CONFIG.missionOrder.find(
      mission =>
        !appState.completedMissions.includes(
          mission
        )
    );


  if (!next) {

    showToast(
      "🎉 Semua misi hari ini sudah selesai!"
    );

    return;

  }


  openModule(
    next
  );

}


function completeMission(
  missionName
) {

  if (
    appState.completedMissions.includes(
      missionName
    )
  ) {

    showToast(
      "✅ Aktiviti ini sudah selesai."
    );

    return false;

  }


  appState.completedMissions.push(
    missionName
  );


  const reward =
    APP_CONFIG.xpRewards[
      missionName
    ] || 10;


  appState.xp +=
    reward;


  updateLearningProgress(
    missionName
  );


  saveState();

  updateAllUI();


  showToast(
    `⭐ +${reward} XP! Syabas!`
  );


  return true;

}


function updateMissionUI() {

  const completed =
    appState.completedMissions.length;


  const total =
    APP_CONFIG.missionOrder.length;


  safeText(
    byId(
      "missionCompletedCount"
    ),
    completed
  );


  safeText(
    byId(
      "missionTotalCount"
    ),
    total
  );


  const progress =
    Math.min(
      100,
      Math.round(
        completed /
        total *
        100
      )
    );


  const bar =
    byId(
      "missionProgressBar"
    );


  if (bar) {

    bar.style.width =
      `${progress}%`;

  }


  $$(".mission-card[data-module]")
    .forEach(
      card => {

        const mission =
          card.dataset.module;


        const complete =
          appState.completedMissions.includes(
            mission
          );


        card.classList.toggle(
          "completed",
          complete
        );


        const status =
          card.querySelector(
            ".mission-status"
          );


        if (
          complete &&
          status
        ) {

          status.textContent =
            "✓ Selesai";

        }

      }
    );

}


/* =========================================================
   15. OPEN MODULE
   ========================================================= */

function openModule(
  moduleName
) {

  activeModule =
    moduleName;


  switch (
    moduleName
  ) {

    case "story":

      openStory();

      break;


    case "vocabulary":

      renderVocabularyModule();

      break;


    case "sentence-builder":

      renderSentenceBuilder();

      break;


    case "grammar-rain":

      renderGrammarRain();

      break;


    case "sentence-recall":

      renderSentenceRecall();

      break;


    case "creative-studio":

      showScreen(
        "create"
      );

      focusWriting();

      break;


    case "ai-feedback":

      showScreen(
        "create"
      );

      runWritingFeedback();

      break;


    case "ai-mentor":

      openMentorPanel();

      break;


    default:

      showToast(
        "Aktiviti akan datang."
      );

  }

}


/* =========================================================
   16. GENERIC MODULE SCREEN
   ========================================================= */

function openModuleScreen(
  html,
  progress = 20
) {

  const container =
    byId(
      "moduleContent"
    );


  if (container) {

    container.innerHTML =
      html;

  }


  const bar =
    byId(
      "moduleProgressBar"
    );


  if (bar) {

    bar.style.width =
      `${progress}%`;

  }


  showScreen(
    "module",
    false
  );

}


function bindModuleControls() {

  const back =
    byId(
      "moduleBackButton"
    );


  const close =
    byId(
      "moduleCloseButton"
    );


  const storyBack =
    byId(
      "storyBackButton"
    );


  if (back) {

    back.addEventListener(
      "click",
      closeModule
    );

  }


  if (close) {

    close.addEventListener(
      "click",
      closeModule
    );

  }


  if (storyBack) {

    storyBack.addEventListener(
      "click",
      closeStory
    );

  }

}


function closeModule() {

  showScreen(
    previousScreen ===
      "module"
      ? "learn"
      : previousScreen
  );

}


function closeStory() {

  showScreen(
    previousScreen ===
      "story"
      ? "home"
      : previousScreen
  );

}


/* =========================================================
   17. STORY DATA ADAPTER
   ========================================================= */

function getStoryCollection() {

  try {

    if (
      typeof stories !==
      "undefined"
    ) {

      if (
        Array.isArray(
          stories
        )
      ) {

        return stories;

      }


      if (
        typeof stories ===
        "object"
      ) {

        return Object.values(
          stories
        );

      }

    }

  } catch (error) {

    console.warn(
      error
    );

  }


  if (
    Array.isArray(
      window.stories
    )
  ) {

    return window.stories;

  }


  if (
    Array.isArray(
      window.STORIES
    )
  ) {

    return window.STORIES;

  }


  if (
    Array.isArray(
      window.storyData
    )
  ) {

    return window.storyData;

  }


  return [];

}


/* =========================================================
   18. FALLBACK STORY
   ========================================================= */

function getFallbackStory() {

  return {

    id:
      "story-1",

    title:
      "Pengembaraan Hari Ini",

    image:
      "2411F84C-22BF-4BE2-848E-BE95A12D02A9.png",

    paragraphs: [
      "Pada pagi yang cerah, Aiman bangun awal untuk membantu ibunya di rumah.",
      "Selepas bersarapan, Aiman menyusun buku dan membersihkan meja belajarnya.",
      "Ibunya berasa gembira kerana Aiman seorang anak yang rajin dan bertanggungjawab.",
      "Aiman juga berjanji untuk menyiapkan kerja sekolah sebelum bermain bersama kawan-kawannya."
    ]

  };

}


/* =========================================================
   19. STORY OPENING
   ========================================================= */

function bindStoryButtons() {

  $$("[data-story-id]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          openStory(
            button.dataset.storyId
          );

        }
      );

    }
  );

}


function openStory(
  storyId = null
) {

  const collection =
    getStoryCollection();


  let story =
    null;


  if (storyId) {

    story =
      collection.find(
        item =>
          String(
            item.id ||
            item.storyId ||
            item.slug
          ) ===
          String(
            storyId
          )
      );

  }


  if (!story) {

    story =
      collection[0] ||
      getFallbackStory();

  }


  currentStory =
    normalizeStory(
      story
    );


  appState.currentStoryId =
    currentStory.id;


  saveState();


  renderStory(
    currentStory
  );


  showScreen(
    "story",
    false
  );

}


/* =========================================================
   20. NORMALIZE STORY
   ========================================================= */

function normalizeStory(
  story
) {

  const title =
    story.title ||
    story.name ||
    story.judul ||
    "Cerita Bahasa Melayu";


  const image =
    story.image ||
    story.imageUrl ||
    story.img ||
    story.cover ||
    "2411F84C-22BF-4BE2-848E-BE95A12D02A9.png";


  let paragraphs =
    story.paragraphs ||
    story.content ||
    story.text ||
    story.story ||
    [];


  if (
    typeof paragraphs ===
    "string"
  ) {

    paragraphs =
      paragraphs
        .split(/\n+/)
        .filter(Boolean);

  }


  if (
    !Array.isArray(
      paragraphs
    )
  ) {

    paragraphs = [];

  }


  return {
    ...story,

    id:
      story.id ||
      story.storyId ||
      "story-1",

    title,

    image,

    paragraphs
  };

}


/* =========================================================
   21. STORY RENDERER
   ========================================================= */

function renderStory(
  story
) {

  safeText(
    byId(
      "storyHeaderTitle"
    ),
    story.title
  );


  const reader =
    byId(
      "storyReader"
    );


  if (!reader) {
    return;
  }


  let html =
    "";


  if (
    story.image
  ) {

    html += `
      <img
        src="${escapeAttribute(
          story.image
        )}"
        alt="${escapeAttribute(
          story.title
        )}"
      />
    `;

  }


  html += `
    <h1>
      ${escapeHtml(
        story.title
      )}
    </h1>
  `;


  story.paragraphs.forEach(
    paragraph => {

      html += `
        <p class="interactive-story-paragraph">
          ${makeWordsClickable(
            paragraph
          )}
        </p>
      `;

    }
  );


  html += `
    <div style="
      margin-top:32px;
      padding:20px;
      border-radius:20px;
      background:#fff7e7;
      text-align:center;
    ">

      <h3>
        Sudah habis membaca?
      </h3>

      <p>
        Tekan mana-mana perkataan untuk melihat maksudnya.
      </p>

      <button
        id="finishStoryButton"
        class="primary-button"
        type="button"
      >
        ✓ Saya Sudah Baca
      </button>

    </div>
  `;


  reader.innerHTML =
    html;


  reader
    .querySelectorAll(
      "[data-word]"
    )
    .forEach(
      element => {

        element.addEventListener(
          "click",
          () => {

            translateWord(
              element.dataset.word
            );

          }
        );

      }
    );


  const finish =
    byId(
      "finishStoryButton"
    );


  if (finish) {

    finish.addEventListener(
      "click",
      () => {

        const firstTime =
          completeMission(
            "story"
          );


        if (
          firstTime
        ) {

          appState.storiesCompleted +=
            1;


          saveState();

          updateAllUI();

        }


        setTimeout(
          () =>
            openModule(
              "vocabulary"
            ),
          500
        );

      }
    );

  }

}


/* =========================================================
   22. CLICKABLE STORY WORDS
   ========================================================= */

function makeWordsClickable(
  text
) {

  const escaped =
    escapeHtml(
      String(
        text
      )
    );


  return escaped.replace(
    /([A-Za-zÀ-ÿ'-]+)/g,
    word => {

      const clean =
        word.replace(
          /[^A-Za-zÀ-ÿ'-]/g,
          ""
        );


      if (
        clean.length <= 1
      ) {

        return word;

      }


      return `
        <span
          class="story-word"
          data-word="${escapeAttribute(
            clean
          )}"
        >${word}</span>
      `;

    }
  );

}


/* =========================================================
   23. TRANSLATION DICTIONARY
   ========================================================= */

const BASIC_DICTIONARY = {

  pagi: {
    zh: "早上",
    en: "morning",
    meaning:
      "Waktu pada awal hari."
  },

  cerah: {
    zh: "晴朗",
    en: "bright / clear",
    meaning:
      "Keadaan yang terang dan tidak mendung."
  },

  membantu: {
    zh: "帮助",
    en: "help",
    meaning:
      "Memberikan pertolongan kepada seseorang."
  },

  ibu: {
    zh: "母亲",
    en: "mother",
    meaning:
      "Wanita yang melahirkan atau menjaga anak."
  },

  rumah: {
    zh: "家 / 房子",
    en: "house / home",
    meaning:
      "Tempat seseorang tinggal."
  },

  buku: {
    zh: "书",
    en: "book",
    meaning:
      "Bahan bacaan yang mempunyai halaman."
  },

  belajar: {
    zh: "学习",
    en: "study / learn",
    meaning:
      "Mendapatkan ilmu atau kemahiran."
  },

  gembira: {
    zh: "开心",
    en: "happy",
    meaning:
      "Perasaan senang dan bahagia."
  },

  rajin: {
    zh: "勤劳",
    en: "diligent",
    meaning:
      "Tekun dan bersungguh-sungguh melakukan sesuatu."
  },

  bertanggungjawab: {
    zh: "负责任",
    en: "responsible",
    meaning:
      "Melaksanakan tugas dan kewajipan dengan baik."
  },

  sekolah: {
    zh: "学校",
    en: "school",
    meaning:
      "Tempat murid belajar."
  },

  bermain: {
    zh: "玩",
    en: "play",
    meaning:
      "Melakukan aktiviti untuk berseronok."
  },

  kawan: {
    zh: "朋友",
    en: "friend",
    meaning:
      "Orang yang rapat dan berkawan dengan kita."
  },

  membersihkan: {
    zh: "清理",
    en: "clean",
    meaning:
      "Menjadikan sesuatu bersih."
  },

  menyusun: {
    zh: "整理 / 排列",
    en: "arrange",
    meaning:
      "Meletakkan sesuatu dengan teratur."
  },

  awal: {
    zh: "早",
    en: "early",
    meaning:
      "Sebelum waktu yang biasa atau ditetapkan."
  }

};


/* =========================================================
   24. TRANSLATE WORD
   ========================================================= */

async function translateWord(
  rawWord
) {

  const word =
    String(
      rawWord
    )
      .toLowerCase()
      .trim();


  if (!word) {
    return;
  }


  currentTranslationWord =
    word;


  currentTranslationData = {
    word,
    translation: "",
    meaning: "",
    example: "",
    category: "Cerita",
    storyId:
      currentStory?.id ||
      appState.currentStoryId ||
      null
  };


  const popup =
    byId(
      "translationPopup"
    );


  const wordElement =
    byId(
      "translationWord"
    );


  const meaning =
    byId(
      "translationMeaning"
    );


  const example =
    byId(
      "translationExample"
    );


  if (popup) {

    popup.hidden =
      false;

  }


  safeText(
    wordElement,
    word
  );


  const local =
    BASIC_DICTIONARY[
      word
    ];


  if (local) {

    const translation =
      `${local.zh} · ${local.en}`;


    const explanation =
      local.meaning ||
      `Perkataan: "${word}"`;


    currentTranslationData.translation =
      translation;


    currentTranslationData.meaning =
      explanation;


    currentTranslationData.example =
      findStorySentenceContainingWord(
        word
      );


    safeText(
      meaning,
      translation
    );


    safeText(
      example,
      currentTranslationData.example ||
      explanation
    );


    updateSaveVocabularyButton();

    return;

  }


  safeText(
    meaning,
    "Mencari maksud..."
  );


  safeText(
    example,
    "Cikgu Aira sedang membantu."
  );


  try {

    const result =
      await callAI({
        type:
          "translate",

        word,

        context:
          findStorySentenceContainingWord(
            word
          ),

        language:
          "Chinese and English"
      });


    const answer =
      extractAIText(
        result
      );


    const finalAnswer =
      answer ||
      "Maksud belum tersedia.";


    currentTranslationData.translation =
      finalAnswer;


    currentTranslationData.meaning =
      finalAnswer;


    currentTranslationData.example =
      findStorySentenceContainingWord(
        word
      );


    safeText(
      meaning,
      finalAnswer
    );


    safeText(
      example,
      currentTranslationData.example ||
      `Perkataan Bahasa Melayu: ${word}`
    );


  } catch (error) {

    currentTranslationData.translation =
      "Terjemahan belum tersedia";


    currentTranslationData.meaning =
      "Tanya Cikgu Aira untuk bantuan.";


    currentTranslationData.example =
      findStorySentenceContainingWord(
        word
      );


    safeText(
      meaning,
      "Tekan Tanya Cikgu Aira untuk bantuan."
    );


    safeText(
      example,
      currentTranslationData.example ||
      "Terjemahan AI tidak tersedia buat sementara."
    );

  }


  updateSaveVocabularyButton();

}


/* =========================================================
   25. STORY SENTENCE CONTEXT
   ========================================================= */

function findStorySentenceContainingWord(
  word
) {

  if (
    !currentStory ||
    !Array.isArray(
      currentStory.paragraphs
    )
  ) {

    return "";

  }


  const normalized =
    String(word)
      .toLowerCase();


  const paragraph =
    currentStory.paragraphs.find(
      item =>
        String(item)
          .toLowerCase()
          .includes(
            normalized
          )
    );


  return paragraph || "";

}


/* =========================================================
   26. TRANSLATION POPUP EVENTS
   ========================================================= */

function bindTranslationPopup() {

  const close =
    byId(
      "translationCloseButton"
    );


  const save =
    byId(
      "saveVocabularyButton"
    );


  if (close) {

    close.addEventListener(
      "click",
      () => {

        const popup =
          byId(
            "translationPopup"
          );


        if (popup) {

          popup.hidden =
            true;

        }

      }
    );

  }


  if (save) {

    save.addEventListener(
      "click",
      saveCurrentVocabulary
    );

  }

}


/* =========================================================
   27. SAVE VOCABULARY
   ========================================================= */

function saveCurrentVocabulary() {

  if (
    !currentTranslationWord
  ) {

    return;

  }


  const engine =
    getVocabularyEngine();


  if (
    engine &&
    typeof engine.saveFromStory ===
      "function"
  ) {

    const result =
      engine.saveFromStory({

        word:
          currentTranslationWord,

        translation:
          currentTranslationData
            ?.translation ||
          "",

        meaning:
          currentTranslationData
            ?.meaning ||
          "",

        example:
          currentTranslationData
            ?.example ||
          "",

        category:
          currentTranslationData
            ?.category ||
          "Cerita",

        storyId:
          currentTranslationData
            ?.storyId ||
          appState.currentStoryId ||
          null,

        emoji:
          "📖"

      });


    if (
      result.success
    ) {

      syncVocabularyProgress();

      updateAllUI();

      updateSaveVocabularyButton();

      showToast(
        "🧠 Disimpan dalam Buku Kosa Kata!"
      );

    } else if (
      result.duplicate
    ) {

      showToast(
        "✅ Perkataan ini sudah ada dalam Buku Kosa Kata."
      );

    }


    return;

  }


  const exists =
    appState.vocabulary.some(
      item =>
        String(
          item.word
        ).toLowerCase() ===
        currentTranslationWord
  );


  if (!exists) {

    appState.vocabulary.push({

      id:
        `word-${Date.now()}`,

      word:
        currentTranslationWord,

      translation:
        currentTranslationData
          ?.translation ||
        "",

      meaning:
        currentTranslationData
          ?.meaning ||
        "",

      example:
        currentTranslationData
          ?.example ||
        "",

      category:
        "Cerita",

      mastered:
        false,

      reviewCount:
        0,

      addedAt:
        new Date()
          .toISOString()

    });


    appState.progress.vocabulary =
      Math.min(
        100,
        appState.progress.vocabulary +
        5
      );


    appState.xp += 2;


    saveState();

    updateAllUI();

    updateSaveVocabularyButton();


    showToast(
      "🧠 Disimpan dalam Buku Kosa Kata! ⭐ +2 XP"
    );

  } else {

    showToast(
      "Perkataan ini sudah disimpan."
    );

  }

}


/* =========================================================
   28. SAVE BUTTON STATE
   ========================================================= */

function updateSaveVocabularyButton() {

  const button =
    byId(
      "saveVocabularyButton"
    );


  if (
    !button ||
    !currentTranslationWord
  ) {

    return;

  }


  let exists =
    false;


  const engine =
    getVocabularyEngine();


  if (
    engine &&
    typeof engine.hasWord ===
      "function"
  ) {

    exists =
      engine.hasWord(
        currentTranslationWord
      );

  } else {

    exists =
      appState.vocabulary.some(
        item =>
          String(
            item.word
          ).toLowerCase() ===
          currentTranslationWord
      );

  }


  if (exists) {

    button.textContent =
      "✓ Sudah Disimpan";

  } else {

    button.textContent =
      "🧠 Simpan Perkataan";

  }

}


/* =========================================================
   29. VOCABULARY MODULE
   ========================================================= */

function renderVocabularyModule(
  query = ""
) {

  const engine =
    getVocabularyEngine();


  let words =
    [];


  if (
    engine &&
    typeof engine.searchWords ===
      "function"
  ) {

    words =
      engine.searchWords(
        query
      );

  } else {

    words =
      getVocabularyWords().filter(
        item => {

          if (!query) {
            return true;
          }


          const searchText =
            [
              item.word,
              item.translation,
              item.meaning,
              item.category
            ]
              .join(" ")
              .toLowerCase();


          return searchText.includes(
            query.toLowerCase()
          );

        }
      );

  }


  const stats =
    getVocabularyStats();


  const cards =
    words.length
      ? words
          .map(
            item =>
              renderVocabularyCard(
                item
              )
          )
          .join("")
      : `
        <div style="
          padding:28px 20px;
          border-radius:22px;
          background:#fff7e7;
          text-align:center;
        ">

          <div style="
            font-size:46px;
            margin-bottom:10px;
          ">
            🔎
          </div>

          <strong style="
            font-size:18px;
          ">
            Tiada perkataan dijumpai.
          </strong>

          <p style="
            color:#65727a;
            line-height:1.6;
            margin-bottom:0;
          ">
            Cuba cari perkataan lain atau simpan perkataan daripada Cerita.
          </p>

        </div>
      `;


  openModuleScreen(
    `

      <span class="section-kicker">
        LANGKAH 2
      </span>

      <h1>
        🧠 Buku Kosa Kata
      </h1>

      <p style="
        color:#65727a;
        line-height:1.7;
        margin-bottom:20px;
      ">
        Simpan, fahami dan ulang kaji perkataan yang kamu temui semasa membaca.
      </p>


      <!-- STATS -->

      <div style="
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:10px;
        margin-bottom:20px;
      ">

        <div style="
          background:#fff7e7;
          border-radius:18px;
          padding:16px 10px;
          text-align:center;
        ">
          <div style="
            font-size:22px;
            font-weight:900;
          ">
            ${stats.total}
          </div>

          <div style="
            font-size:12px;
            color:#7a8288;
            margin-top:3px;
          ">
            Perkataan
          </div>
        </div>


        <div style="
          background:#eefbf5;
          border-radius:18px;
          padding:16px 10px;
          text-align:center;
        ">
          <div style="
            font-size:22px;
            font-weight:900;
          ">
            ${stats.mastered}
          </div>

          <div style="
            font-size:12px;
            color:#7a8288;
            margin-top:3px;
          ">
            Dikuasai
          </div>
        </div>


        <div style="
          background:#f2efff;
          border-radius:18px;
          padding:16px 10px;
          text-align:center;
        ">
          <div style="
            font-size:22px;
            font-weight:900;
          ">
            ${stats.masteryPercent}%
          </div>

          <div style="
            font-size:12px;
            color:#7a8288;
            margin-top:3px;
          ">
            Kemajuan
          </div>
        </div>

      </div>


      <!-- SEARCH -->

      <div style="
        position:relative;
        margin-bottom:18px;
      ">

        <input
          id="vocabularySearchInput"
          type="search"
          value="${escapeAttribute(
            query
          )}"
          placeholder="🔎 Cari perkataan..."
          autocomplete="off"
          style="
            width:100%;
            box-sizing:border-box;
            border:1px solid #e3ded6;
            background:white;
            border-radius:16px;
            padding:14px 16px;
            font-size:15px;
            outline:none;
          "
        />

      </div>


      <!-- REVIEW CTA -->

      <button
        id="startVocabularyReviewButton"
        class="primary-button"
        type="button"
        style="
          width:100%;
          margin-bottom:22px;
        "
      >
        🎯 Mula Ulang Kaji
      </button>


      <!-- WORD LIST -->

      <div
        id="vocabularyWordList"
        style="
          display:grid;
          gap:12px;
          margin-bottom:24px;
        "
      >
        ${cards}
      </div>


      <button
        id="finishVocabularyButton"
        class="secondary-button"
        type="button"
        style="
          width:100%;
        "
      >
        ✓ Selesai Langkah 2
      </button>

    `,
    28
  );


  setTimeout(
    bindVocabularyModuleControls,
    0
  );

}


/* =========================================================
   30. VOCABULARY CARD
   ========================================================= */

function renderVocabularyCard(
  item
) {

  const translation =
    item.translation ||
    "Terjemahan belum tersedia";


  const meaning =
    item.meaning ||
    "";


  const statusText =
    item.mastered
      ? "✓ Dikuasai"
      : "Sedang Belajar";


  const statusBackground =
    item.mastered
      ? "#e8f8ef"
      : "#fff5df";


  const statusColor =
    item.mastered
      ? "#259662"
      : "#d98019";


  return `
    <article
      style="
        border:1px solid #ece8e1;
        border-radius:20px;
        background:white;
        padding:17px;
        box-shadow:0 5px 18px rgba(39,45,50,.04);
      "
    >

      <div style="
        display:flex;
        align-items:flex-start;
        gap:12px;
      ">

        <div style="
          width:46px;
          height:46px;
          flex:0 0 46px;
          border-radius:15px;
          display:flex;
          align-items:center;
          justify-content:center;
          background:#fff3dd;
          font-size:23px;
        ">
          ${escapeHtml(
            item.emoji ||
            "🧠"
          )}
        </div>


        <div style="
          flex:1;
          min-width:0;
        ">

          <div style="
            display:flex;
            justify-content:space-between;
            align-items:flex-start;
            gap:8px;
          ">

            <strong style="
              font-size:19px;
              color:#273139;
            ">
              ${escapeHtml(
                item.word
              )}
            </strong>


            <span style="
              white-space:nowrap;
              background:${statusBackground};
              color:${statusColor};
              border-radius:999px;
              padding:5px 9px;
              font-size:11px;
              font-weight:800;
            ">
              ${statusText}
            </span>

          </div>


          <div style="
            margin-top:6px;
            font-size:14px;
            font-weight:700;
            color:#6b55d9;
          ">
            ${escapeHtml(
              translation
            )}
          </div>


          ${
            meaning
              ? `
                <p style="
                  color:#727c82;
                  font-size:13px;
                  line-height:1.55;
                  margin:7px 0 0;
                ">
                  ${escapeHtml(
                    meaning
                  )}
                </p>
              `
              : ""
          }


          <div style="
            margin-top:12px;
            display:flex;
            justify-content:space-between;
            align-items:center;
            gap:10px;
          ">

            <small style="
              color:#9aa1a6;
            ">
              Ulang kaji:
              ${Number(
                item.reviewCount || 0
              )}×
            </small>


            <button
              type="button"
              data-vocab-master="${escapeAttribute(
                item.id
              )}"
              style="
                border:0;
                background:transparent;
                color:#7b61e8;
                font-weight:800;
                cursor:pointer;
                padding:6px;
              "
            >
              ${
                item.mastered
                  ? "Belajar Semula"
                  : "Saya Dah Kuasai"
              }
            </button>

          </div>

        </div>

      </div>

    </article>
  `;

}


/* =========================================================
   31. VOCABULARY MODULE CONTROLS
   ========================================================= */

function bindVocabularyModuleControls() {

  const search =
    byId(
      "vocabularySearchInput"
    );


  if (search) {

    let timer =
      null;


    search.addEventListener(
      "input",
      () => {

        clearTimeout(
          timer
        );


        timer =
          setTimeout(
            () => {

              renderVocabularyModule(
                search.value.trim()
              );

            },
            250
          );

      }
    );

  }


  $$(
    "[data-vocab-master]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          toggleVocabularyMastery(
            button.dataset.vocabMaster
          );

        }
      );

    }
  );


  const reviewButton =
    byId(
      "startVocabularyReviewButton"
    );


  if (reviewButton) {

    reviewButton.addEventListener(
      "click",
      startVocabularyReview
    );

  }


  const finish =
    byId(
      "finishVocabularyButton"
    );


  if (finish) {

    finish.addEventListener(
      "click",
      finishVocabularyMission
    );

  }

}


/* =========================================================
   32. TOGGLE VOCABULARY MASTERY
   ========================================================= */

function toggleVocabularyMastery(
  id
) {

  const engine =
    getVocabularyEngine();


  if (
    engine &&
    typeof engine.getWord ===
      "function" &&
    typeof engine.markMastered ===
      "function"
  ) {

    const word =
      engine.getWord(
        id
      );


    if (!word) {
      return;
    }


    engine.markMastered(
      id,
      !word.mastered
    );


    syncVocabularyProgress();

    renderVocabularyModule();

    return;

  }


  const item =
    appState.vocabulary.find(
      word =>
        String(
          word.id
        ) ===
        String(
          id
        )
    );


  if (!item) {
    return;
  }


  item.mastered =
    !item.mastered;


  saveState();

  syncVocabularyProgress();

  renderVocabularyModule();

}


/* =========================================================
   33. START VOCABULARY REVIEW
   ========================================================= */

function startVocabularyReview() {

  const engine =
    getVocabularyEngine();


  let reviewWords =
    [];


  if (
    engine &&
    typeof engine.getReviewWords ===
      "function"
  ) {

    reviewWords =
      engine.getReviewWords(
        5
      );

  } else {

    reviewWords =
      getVocabularyWords()
        .filter(
          item =>
            !item.mastered
        )
        .slice(
          0,
          5
        );

  }


  if (
    !reviewWords.length
  ) {

    const allWords =
      getVocabularyWords();


    if (
      !allWords.length
    ) {

      showToast(
        "📖 Simpan beberapa perkataan dahulu."
      );

      return;

    }


    reviewWords =
      allWords.slice(
        0,
        5
      );

  }


  vocabularyReviewSession = {

    words:
      reviewWords,

    index: 0,

    answered: false

  };


  renderVocabularyReviewCard();

}


/* =========================================================
   34. VOCABULARY REVIEW CARD
   ========================================================= */

function renderVocabularyReviewCard() {

  const session =
    vocabularyReviewSession;


  const word =
    session.words[
      session.index
    ];


  if (!word) {

    finishVocabularyReviewSession();

    return;

  }


  const number =
    session.index + 1;


  const total =
    session.words.length;


  const progress =
    Math.round(
      number /
      total *
      100
    );


  openModuleScreen(
    `

      <span class="section-kicker">
        ULANG KAJI
      </span>

      <h1>
        🧠 Ingat Perkataan Ini?
      </h1>

      <p style="
        color:#65727a;
      ">
        Kad ${number} daripada ${total}
      </p>


      <div style="
        width:100%;
        height:8px;
        background:#eeeae5;
        border-radius:999px;
        overflow:hidden;
        margin:18px 0 28px;
      ">

        <div style="
          width:${progress}%;
          height:100%;
          background:#ff9f43;
          border-radius:999px;
        "></div>

      </div>


      <div style="
        padding:36px 22px;
        border-radius:26px;
        background:linear-gradient(
          145deg,
          #fff8e9,
          #f5f0ff
        );
        text-align:center;
        border:1px solid #eee7db;
      ">

        <div style="
          font-size:46px;
          margin-bottom:12px;
        ">
          ${escapeHtml(
            word.emoji ||
            "🧠"
          )}
        </div>


        <div style="
          font-size:30px;
          font-weight:900;
          color:#283238;
        ">
          ${escapeHtml(
            word.word
          )}
        </div>


        <div
          id="vocabularyReviewAnswer"
          hidden
          style="
            margin-top:22px;
            padding-top:22px;
            border-top:1px solid rgba(0,0,0,.08);
          "
        >

          <div style="
            font-size:18px;
            font-weight:850;
            color:#6b55d9;
          ">
            ${escapeHtml(
              word.translation ||
              "Terjemahan belum tersedia"
            )}
          </div>


          ${
            word.meaning
              ? `
                <p style="
                  color:#65727a;
                  line-height:1.6;
                  margin-top:10px;
                ">
                  ${escapeHtml(
                    word.meaning
                  )}
                </p>
              `
              : ""
          }


          ${
            word.example
              ? `
                <div style="
                  margin-top:14px;
                  padding:13px;
                  border-radius:14px;
                  background:rgba(255,255,255,.7);
                  color:#5d676e;
                  font-size:13px;
                  line-height:1.55;
                ">
                  ${escapeHtml(
                    word.example
                  )}
                </div>
              `
              : ""
          }

        </div>

      </div>


      <div
        id="vocabularyRevealControls"
        style="
          margin-top:22px;
        "
      >

        <button
          id="revealVocabularyAnswerButton"
          class="primary-button"
          type="button"
          style="
            width:100%;
          "
        >
          👀 Lihat Maksud
        </button>

      </div>


      <div
        id="vocabularyAnswerControls"
        hidden
        style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:12px;
          margin-top:22px;
        "
      >

        <button
          id="vocabularyWrongButton"
          class="secondary-button"
          type="button"
        >
          🤔 Belum Ingat
        </button>


        <button
          id="vocabularyCorrectButton"
          class="primary-button"
          type="button"
        >
          😊 Saya Ingat
        </button>

      </div>


      <button
        id="exitVocabularyReviewButton"
        type="button"
        style="
          width:100%;
          border:0;
          background:transparent;
          color:#8b9398;
          margin-top:18px;
          padding:10px;
          font-weight:700;
        "
      >
        ← Kembali ke Buku Kosa Kata
      </button>

    `,
    28
  );


  setTimeout(
    bindVocabularyReviewControls,
    0
  );

}


/* =========================================================
   35. REVIEW CONTROLS
   ========================================================= */

function bindVocabularyReviewControls() {

  const reveal =
    byId(
      "revealVocabularyAnswerButton"
    );


  const answer =
    byId(
      "vocabularyReviewAnswer"
    );


  const revealControls =
    byId(
      "vocabularyRevealControls"
    );


  const answerControls =
    byId(
      "vocabularyAnswerControls"
    );


  if (reveal) {

    reveal.addEventListener(
      "click",
      () => {

        if (answer) {

          answer.hidden =
            false;

        }


        if (revealControls) {

          revealControls.hidden =
            true;

        }


        if (answerControls) {

          answerControls.hidden =
            false;

        }

      }
    );

  }


  const correct =
    byId(
      "vocabularyCorrectButton"
    );


  if (correct) {

    correct.addEventListener(
      "click",
      () => {

        submitVocabularyReview(
          true
        );

      }
    );

  }


  const wrong =
    byId(
      "vocabularyWrongButton"
    );


  if (wrong) {

    wrong.addEventListener(
      "click",
      () => {

        submitVocabularyReview(
          false
        );

      }
    );

  }


  const exit =
    byId(
      "exitVocabularyReviewButton"
    );


  if (exit) {

    exit.addEventListener(
      "click",
      () => {

        renderVocabularyModule();

      }
    );

  }

}


/* =========================================================
   36. SUBMIT REVIEW
   ========================================================= */

function submitVocabularyReview(
  correct
) {

  if (
    vocabularyReviewSession
      .answered
  ) {

    return;

  }


  vocabularyReviewSession.answered =
    true;


  const word =
    vocabularyReviewSession.words[
      vocabularyReviewSession.index
    ];


  const engine =
    getVocabularyEngine();


  if (
    engine &&
    typeof engine.reviewWord ===
      "function"
  ) {

    const result =
      engine.reviewWord(
        word.id,
        correct
      );


    if (
      correct &&
      result?.word
    ) {

      const correctCount =
        Number(
          result.word.correctCount ||
          0
        );


      if (
        correctCount >= 3 &&
        !result.word.mastered &&
        typeof engine.markMastered ===
          "function"
      ) {

        engine.markMastered(
          word.id,
          true
        );

      }

    }

  } else {

    const legacy =
      appState.vocabulary.find(
        item =>
          String(
            item.id
          ) ===
          String(
            word.id
          )
      );


    if (legacy) {

      legacy.reviewCount =
        Number(
          legacy.reviewCount ||
          0
        ) + 1;


      if (correct) {

        legacy.correctCount =
          Number(
            legacy.correctCount ||
            0
          ) + 1;


        appState.xp +=
          2;


        if (
          legacy.correctCount >=
          3
        ) {

          legacy.mastered =
            true;

        }

      } else {

        legacy.wrongCount =
          Number(
            legacy.wrongCount ||
            0
          ) + 1;

      }


      saveState();

    }

  }


  syncVocabularyProgress();

  updateAllUI();


  if (correct) {

    showToast(
      "🌟 Bagus! Kamu ingat perkataan ini."
    );

  } else {

    showToast(
      "💪 Tak apa. Kita akan cuba lagi."
    );

  }


  setTimeout(
    () => {

      vocabularyReviewSession.index +=
        1;


      vocabularyReviewSession.answered =
        false;


      renderVocabularyReviewCard();

    },
    550
  );

}


/* =========================================================
   37. FINISH REVIEW SESSION
   ========================================================= */

function finishVocabularyReviewSession() {

  const engine =
    getVocabularyEngine();


  if (
    engine &&
    typeof engine.completeDailyReview ===
      "function"
  ) {

    const progress =
      engine.getDailyProgress?.();


    if (
      progress &&
      progress.reviewed >=
        progress.target
    ) {

      engine.completeDailyReview();

    }

  }


  syncVocabularyProgress();

  updateAllUI();


  openModuleScreen(
    `

      <div style="
        text-align:center;
        padding:28px 4px 12px;
      ">

        <div style="
          font-size:70px;
          margin-bottom:12px;
        ">
          🎉
        </div>


        <span class="section-kicker">
          ULANG KAJI SELESAI
        </span>


        <h1 style="
          margin-top:8px;
        ">
          Hebat!
        </h1>


        <p style="
          color:#65727a;
          line-height:1.7;
          max-width:420px;
          margin:0 auto 24px;
        ">
          Kamu sudah mengulang kaji perkataan hari ini.
          Semakin kerap kamu berlatih, semakin kuat ingatan kamu.
        </p>


        <button
          id="completeVocabularyMissionButton"
          class="primary-button"
          type="button"
          style="
            width:100%;
            margin-bottom:12px;
          "
        >
          ✓ Selesaikan Langkah 2
        </button>


        <button
          id="backToVocabularyButton"
          class="secondary-button"
          type="button"
          style="
            width:100%;
          "
        >
          🧠 Lihat Buku Kosa Kata
        </button>

      </div>

    `,
    28
  );


  setTimeout(
    () => {

      byId(
        "completeVocabularyMissionButton"
      )?.addEventListener(
        "click",
        finishVocabularyMission
      );


      byId(
        "backToVocabularyButton"
      )?.addEventListener(
        "click",
        () => {

          renderVocabularyModule();

        }
      );

    },
    0
  );

}


/* =========================================================
   38. FINISH VOCABULARY MISSION
   ========================================================= */

function finishVocabularyMission() {

  completeMission(
    "vocabulary"
  );


  setTimeout(
    () => {

      openModule(
        "sentence-builder"
      );

    },
    550
  );

}


/* =========================================================
   39. SENTENCE BUILDER
   ========================================================= */

/* =========================================================
   LANGKAH 3 — BINA AYAT
   Dynamic Sentence Builder
   ========================================================= */

let sentenceBuilderState = {
  task: null,
  selected: [],
  attempts: 0,
  hintLevel: 0
};


/* =========================================================
   START SENTENCE BUILDER
   ========================================================= */

function renderSentenceBuilder() {

  sentenceBuilderState = {
    task: createSentenceBuilderTask(),
    selected: [],
    attempts: 0,
    hintLevel: 0
  };

  renderSentenceBuilderScreen();
}


/* =========================================================
   CREATE SENTENCE TASK
   ========================================================= */

function createSentenceBuilderTask() {

  let vocabulary = [];

  try {

    if (
      window.KaranganVocabulary &&
      typeof window.KaranganVocabulary.getWords === "function"
    ) {

      vocabulary =
        window.KaranganVocabulary.getWords() || [];

    }

  } catch (error) {

    console.warn(
      "Unable to load vocabulary for sentence builder:",
      error
    );

  }


  /* ---------------------------------------------------------
     PRIORITY 1
     Use example sentence saved from Buku Kosa Kata
     --------------------------------------------------------- */

  const usableVocabulary =
    shuffleArray(
      vocabulary.filter(
        item => {

          if (!item || !item.example) {
            return false;
          }

          const cleaned =
            cleanSentenceBuilderText(
              item.example
            );

          const words =
            cleaned
              .split(/\s+/)
              .filter(Boolean);

          return (
            words.length >= 4 &&
            words.length <= 10
          );

        }
      )
    );


  if (usableVocabulary.length) {

    const item =
      usableVocabulary[0];

    const sentence =
      cleanSentenceBuilderText(
        item.example
      );

    return {
      sentence,
      focusWord:
        item.word || "",
      translation:
        item.translation || "",
      source:
        "vocabulary"
    };

  }


  /* ---------------------------------------------------------
     PRIORITY 2
     Match known vocabulary to sentence templates
     --------------------------------------------------------- */

  const knownWords =
    vocabulary.map(
      item =>
        String(
          item.word || ""
        ).toLowerCase()
    );


  const templates = [

    {
      focusWord: "gembira",
      translation: "开心 · happy",
      sentence:
        "Aina berasa gembira kerana mendapat hadiah"
    },

    {
      focusWord: "rajin",
      translation: "勤劳 · diligent",
      sentence:
        "Amir seorang murid yang rajin belajar"
    },

    {
      focusWord: "membantu",
      translation: "帮助 · help",
      sentence:
        "Siti membantu ibunya di dapur"
    },

    {
      focusWord: "bersih",
      translation: "干净 · clean",
      sentence:
        "Kelas kami sentiasa bersih dan kemas"
    },

    {
      focusWord: "menjaga",
      translation: "照顾 / 保护 · take care",
      sentence:
        "Kita perlu menjaga kebersihan sekolah"
    },

    {
      focusWord: "berani",
      translation: "勇敢 · brave",
      sentence:
        "Hakim berani mencuba perkara baharu"
    },

    {
      focusWord: "buku",
      translation: "书 · book",
      sentence:
        "Aiman membaca buku di perpustakaan"
    },

    {
      focusWord: "sekolah",
      translation: "学校 · school",
      sentence:
        "Murid pergi ke sekolah pada waktu pagi"
    },

    {
      focusWord: "kawan",
      translation: "朋友 · friend",
      sentence:
        "Farah bermain bersama kawan di taman"
    }

  ];


  const matchingTemplates =
    templates.filter(
      item =>
        knownWords.includes(
          item.focusWord
        )
    );


  if (matchingTemplates.length) {

    return shuffleArray(
      matchingTemplates
    )[0];

  }


  /* ---------------------------------------------------------
     PRIORITY 3
     Fallback Year 3 sentences
     --------------------------------------------------------- */

  const fallbackTasks = [

    {
      focusWord: "membantu",
      translation: "帮助 · help",
      sentence:
        "Aiman membantu ibunya di rumah"
    },

    {
      focusWord: "rajin",
      translation: "勤劳 · diligent",
      sentence:
        "Siti rajin belajar setiap hari"
    },

    {
      focusWord: "gembira",
      translation: "开心 · happy",
      sentence:
        "Aina berasa gembira hari ini"
    },

    {
      focusWord: "sekolah",
      translation: "学校 · school",
      sentence:
        "Ali pergi ke sekolah pada waktu pagi"
    },

    {
      focusWord: "buku",
      translation: "书 · book",
      sentence:
        "Amir membaca buku di dalam kelas"
    }

  ];


  return shuffleArray(
    fallbackTasks
  )[0];
}


/* =========================================================
   CLEAN SENTENCE
   ========================================================= */

function cleanSentenceBuilderText(
  text
) {

  return String(
    text || ""
  )
    .replace(
      /\s+/g,
      " "
    )
    .replace(
      /^[“"' ]+/,
      ""
    )
    .replace(
      /[.!?。！？"'”]+$/,
      ""
    )
    .trim();
}


/* =========================================================
   RENDER SENTENCE BUILDER SCREEN
   ========================================================= */

function renderSentenceBuilderScreen() {

  const task =
    sentenceBuilderState.task;


  if (!task) {

    showToast(
      "Bina Ayat tidak dapat dimulakan."
    );

    return;

  }


  const words =
    task.sentence
      .split(/\s+/)
      .filter(Boolean);


  if (
    !sentenceBuilderState.wordBank ||
    sentenceBuilderState.wordBankSentence !==
      task.sentence
  ) {

    sentenceBuilderState.wordBank =
      shuffleArray(
        words.map(
          (word, index) => ({
            id: index,
            word
          })
        )
      );

    sentenceBuilderState.wordBankSentence =
      task.sentence;

  }


  const selectedIds =
    new Set(
      sentenceBuilderState.selected
    );


  const selectedWords =
    sentenceBuilderState.selected
      .map(
        id =>
          words[id]
      )
      .filter(Boolean);


  const answerHTML =
    selectedWords.length

      ? selectedWords
          .map(
            (word, position) => `
              <button
                type="button"
                data-remove-sentence-position="${position}"
                style="
                  border:0;
                  border-radius:12px;
                  padding:10px 13px;
                  background:#eaf3ff;
                  color:#26343d;
                  font-size:16px;
                  font-weight:800;
                  cursor:pointer;
                "
              >
                ${escapeHtml(word)}
              </button>
            `
          )
          .join("")

      : `
          <span style="
            color:#a0a9ae;
            line-height:1.6;
          ">
            Ayat kamu akan muncul di sini...
          </span>
        `;


  const wordBankHTML =
    sentenceBuilderState.wordBank
      .map(
        token => {

          const used =
            selectedIds.has(
              token.id
            );

          return `
            <button
              class="secondary-button sentence-choice"
              data-sentence-token="${token.id}"
              type="button"
              ${used ? "disabled" : ""}
              style="
                ${
                  used
                    ? "opacity:.35;"
                    : ""
                }
              "
            >
              ${escapeHtml(
                token.word
              )}
            </button>
          `;

        }
      )
      .join("");


  const hint =
    getSentenceBuilderHint();


  openModuleScreen(
    `

      <span class="section-kicker">
        LANGKAH 3
      </span>

      <h1>
        🧩 Bina Ayat
      </h1>

      <p style="
        color:#65727a;
        line-height:1.7;
        margin-bottom:18px;
      ">
        Susun perkataan menjadi ayat Bahasa Melayu yang betul.
      </p>


      <!-- FOCUS WORD -->

      <div style="
        padding:16px 18px;
        background:#fff5df;
        border-radius:18px;
        margin-bottom:18px;
      ">

        <div style="
          font-size:11px;
          font-weight:900;
          letter-spacing:.08em;
          color:#cb7a20;
          text-transform:uppercase;
        ">
          PERKATAAN FOKUS
        </div>

        <div style="
          margin-top:6px;
          font-size:21px;
          font-weight:900;
          color:#26343d;
        ">
          🧠 ${escapeHtml(
            task.focusWord || ""
          )}
        </div>

        ${
          task.translation
            ? `
              <div style="
                margin-top:5px;
                color:#6c55db;
                font-size:14px;
                font-weight:700;
              ">
                ${escapeHtml(
                  task.translation
                )}
              </div>
            `
            : ""
        }

      </div>


      ${
        hint
          ? `
            <div style="
              padding:14px 16px;
              border-radius:16px;
              background:#f2efff;
              color:#665b8d;
              line-height:1.55;
              margin-bottom:16px;
            ">
              💡 ${escapeHtml(
                hint
              )}
            </div>
          `
          : ""
      }


      <!-- ANSWER AREA -->

      <div
        id="sentenceAnswerArea"
        style="
          min-height:95px;
          padding:16px;
          margin-bottom:16px;
          border:2px dashed #d8d3cb;
          border-radius:18px;
          background:white;
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          align-items:center;
          align-content:center;
        "
      >
        ${answerHTML}
      </div>


      <!-- CONTROLS -->

      <div style="
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:10px;
        margin-bottom:18px;
      ">

        <button
          id="undoSentenceButton"
          class="secondary-button"
          type="button"
          ${
            selectedWords.length
              ? ""
              : "disabled"
          }
        >
          ↩️ Undur
        </button>

        <button
          id="resetSentenceButton"
          class="secondary-button"
          type="button"
        >
          🔄 Mula Semula
        </button>

        <button
          id="sentenceHintButton"
          class="secondary-button"
          type="button"
        >
          💡 Petunjuk
        </button>

      </div>


      <!-- WORD BANK -->

      <div
        id="sentenceWordBank"
        style="
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          padding:16px;
          border-radius:18px;
          background:#faf9f7;
          margin-bottom:22px;
        "
      >
        ${wordBankHTML}
      </div>


      <button
        id="checkSentenceButton"
        class="primary-button"
        type="button"
        style="
          width:100%;
        "
      >
        ✓ Semak Ayat
      </button>


      <button
        id="newSentenceButton"
        type="button"
        style="
          width:100%;
          border:0;
          background:transparent;
          padding:14px 8px;
          margin-top:5px;
          color:#7e878c;
          font-weight:800;
        "
      >
        🎲 Cuba Ayat Lain
      </button>

    `,
    42
  );


  setTimeout(
    bindSentenceBuilderControls,
    0
  );
}


/* =========================================================
   BIND SENTENCE BUILDER CONTROLS
   ========================================================= */

function bindSentenceBuilderControls() {

  $$(
    "[data-sentence-token]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const id =
            Number(
              button.dataset.sentenceToken
            );


          if (
            sentenceBuilderState.selected.includes(
              id
            )
          ) {

            return;

          }


          sentenceBuilderState.selected.push(
            id
          );


          renderSentenceBuilderScreen();

        }
      );

    }
  );


  $$(
    "[data-remove-sentence-position]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const position =
            Number(
              button.dataset.removeSentencePosition
            );


          sentenceBuilderState.selected.splice(
            position,
            1
          );


          renderSentenceBuilderScreen();

        }
      );

    }
  );


  const undo =
    byId(
      "undoSentenceButton"
    );


  if (undo) {

    undo.addEventListener(
      "click",
      () => {

        sentenceBuilderState.selected.pop();

        renderSentenceBuilderScreen();

      }
    );

  }


  const reset =
    byId(
      "resetSentenceButton"
    );


  if (reset) {

    reset.addEventListener(
      "click",
      () => {

        sentenceBuilderState.selected =
          [];


        renderSentenceBuilderScreen();

      }
    );

  }


  const hint =
    byId(
      "sentenceHintButton"
    );


  if (hint) {

    hint.addEventListener(
      "click",
      () => {

        sentenceBuilderState.hintLevel =
          Math.min(
            3,
            sentenceBuilderState.hintLevel + 1
          );


        renderSentenceBuilderScreen();

      }
    );

  }


  const check =
    byId(
      "checkSentenceButton"
    );


  if (check) {

    check.addEventListener(
      "click",
      checkSentenceBuilderAnswer
    );

  }


  const newSentence =
    byId(
      "newSentenceButton"
    );


  if (newSentence) {

    newSentence.addEventListener(
      "click",
      renderSentenceBuilder
    );

  }

}


/* =========================================================
   SENTENCE HINT SYSTEM
   ========================================================= */

function getSentenceBuilderHint() {

  const task =
    sentenceBuilderState.task;


  if (
    !task ||
    sentenceBuilderState.hintLevel === 0
  ) {

    return "";

  }


  const words =
    task.sentence
      .split(/\s+/)
      .filter(Boolean);


  if (
    sentenceBuilderState.hintLevel === 1
  ) {

    return `Ayat bermula dengan "${words[0]}".`;

  }


  if (
    sentenceBuilderState.hintLevel === 2
  ) {

    return `Dua perkataan pertama ialah "${words
      .slice(0, 2)
      .join(" ")}".`;

  }


  const half =
    Math.max(
      2,
      Math.ceil(
        words.length / 2
      )
    );


  return `Bahagian awal ayat ialah "${words
    .slice(0, half)
    .join(" ")}..."`;

}


/* =========================================================
   CHECK SENTENCE
   ========================================================= */

function checkSentenceBuilderAnswer() {

  const task =
    sentenceBuilderState.task;


  if (!task) {

    return;

  }


  const correctWords =
    task.sentence
      .split(/\s+/)
      .filter(Boolean);


  if (
    sentenceBuilderState.selected.length <
    correctWords.length
  ) {

    showToast(
      "🧩 Susun semua perkataan dahulu."
    );

    return;

  }


  sentenceBuilderState.attempts +=
    1;


  const studentSentence =
    sentenceBuilderState.selected
      .map(
        id =>
          correctWords[id]
      )
      .join(" ");


  const studentNormalized =
    normalizeSentenceBuilderAnswer(
      studentSentence
    );


  const correctNormalized =
    normalizeSentenceBuilderAnswer(
      task.sentence
    );


  if (
    studentNormalized ===
    correctNormalized
  ) {

    completeMission(
      "sentence-builder"
    );


    renderSentenceBuilderSuccess();

    return;

  }


  if (
    sentenceBuilderState.attempts >= 2 &&
    sentenceBuilderState.hintLevel === 0
  ) {

    sentenceBuilderState.hintLevel =
      1;

  }


  showToast(
    "💡 Hampir! Cuba semak susunan perkataan."
  );


  setTimeout(
    renderSentenceBuilderScreen,
    450
  );

}


/* =========================================================
   NORMALIZE SENTENCE
   ========================================================= */

function normalizeSentenceBuilderAnswer(
  value
) {

  return String(
    value || ""
  )
    .toLowerCase()
    .replace(
      /[.,!?;:'"“”‘’()-]/g,
      ""
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}


/* =========================================================
   SENTENCE SUCCESS SCREEN
   ========================================================= */

function renderSentenceBuilderSuccess() {

  const task =
    sentenceBuilderState.task;


  openModuleScreen(
    `

      <div style="
        text-align:center;
        padding:26px 0 10px;
      ">

        <div style="
          font-size:72px;
          margin-bottom:10px;
        ">
          🎉
        </div>

        <span class="section-kicker">
          LANGKAH 3 SELESAI
        </span>

        <h1 style="
          margin-top:8px;
        ">
          Ayat Betul!
        </h1>

        <p style="
          color:#65727a;
          line-height:1.7;
        ">
          Kamu berjaya menyusun perkataan menjadi ayat yang lengkap.
        </p>


        <div style="
          margin:22px 0;
          padding:20px;
          border-radius:20px;
          background:#edf9f3;
          color:#27493a;
          font-size:19px;
          font-weight:850;
          line-height:1.6;
        ">
          “${escapeHtml(
            task.sentence
          )}.”
        </div>


        <div style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-bottom:22px;
        ">

          <div style="
            padding:15px;
            border-radius:16px;
            background:#fff6e6;
          ">

            <strong style="
              font-size:21px;
            ">
              ${
                task.sentence
                  .split(/\s+/)
                  .length
              }
            </strong>

            <div style="
              font-size:12px;
              color:#7b8388;
              margin-top:3px;
            ">
              Perkataan
            </div>

          </div>


          <div style="
            padding:15px;
            border-radius:16px;
            background:#f2efff;
          ">

            <strong style="
              font-size:21px;
            ">
              ${
                sentenceBuilderState.attempts ||
                1
              }
            </strong>

            <div style="
              font-size:12px;
              color:#7b8388;
              margin-top:3px;
            ">
              Percubaan
            </div>

          </div>

        </div>


        <button
          id="continueGrammarRainButton"
          class="primary-button"
          type="button"
          style="
            width:100%;
            margin-bottom:11px;
          "
        >
          Teruskan ke Grammar Rain →
        </button>


        <button
          id="practiceSentenceAgainButton"
          class="secondary-button"
          type="button"
          style="
            width:100%;
          "
        >
          🧩 Latih Ayat Lagi
        </button>

      </div>

    `,
    42
  );


  setTimeout(
    () => {

      const continueButton =
        byId(
          "continueGrammarRainButton"
        );


      if (continueButton) {

        continueButton.addEventListener(
          "click",
          () => {

            openModule(
              "grammar-rain"
            );

          }
        );

      }


      const practice =
        byId(
          "practiceSentenceAgainButton"
        );


      if (practice) {

        practice.addEventListener(
          "click",
          renderSentenceBuilder
        );

      }

    },
    0
  );

}
/* =========================================================
   41. GRAMMAR RAIN
   ========================================================= */

/* =========================================================
   LANGKAH 4 — GRAMMAR RAIN
   Multi-round Grammar Game
   ========================================================= */

let grammarRainState = {
  questions: [],
  index: 0,
  score: 0,
  lives: 3,
  answered: false
};


/* =========================================================
   START GRAMMAR RAIN
   ========================================================= */

function renderGrammarRain() {

  grammarRainState = {
    questions:
      createGrammarRainQuestions(),

    index: 0,

    score: 0,

    lives: 3,

    answered: false
  };


  renderGrammarRainRound();

}


/* =========================================================
   CREATE QUESTION SET
   ========================================================= */

function createGrammarRainQuestions() {

  const baseQuestions = [

    {
      sentence:
        "Aiman _____ ibunya membersihkan rumah.",
      answer:
        "membantu",
      options: [
        "membantu",
        "membaca",
        "tidur"
      ],
      explanation:
        "Membantu bermaksud memberikan pertolongan."
    },

    {
      sentence:
        "Siti seorang murid yang sangat _____.",
      answer:
        "rajin",
      options: [
        "rajin",
        "lapar",
        "gelap"
      ],
      explanation:
        "Rajin sesuai untuk menerangkan sikap murid yang tekun belajar."
    },

    {
      sentence:
        "Kita perlu _____ kebersihan sekolah.",
      answer:
        "menjaga",
      options: [
        "menjaga",
        "membuang",
        "menutup"
      ],
      explanation:
        "Menjaga bermaksud memelihara sesuatu supaya kekal baik."
    },

    {
      sentence:
        "Aina berasa _____ kerana mendapat hadiah.",
      answer:
        "gembira",
      options: [
        "gembira",
        "takut",
        "marah"
      ],
      explanation:
        "Gembira ialah perasaan senang dan bahagia."
    },

    {
      sentence:
        "Amir membaca _____ di perpustakaan.",
      answer:
        "buku",
      options: [
        "buku",
        "meja",
        "kasut"
      ],
      explanation:
        "Buku ialah benda yang biasa dibaca."
    },

    {
      sentence:
        "Murid pergi ke _____ pada waktu pagi.",
      answer:
        "sekolah",
      options: [
        "sekolah",
        "dapur",
        "taman permainan"
      ],
      explanation:
        "Sekolah ialah tempat murid belajar."
    },

    {
      sentence:
        "Hakim _____ mencuba perkara baharu.",
      answer:
        "berani",
      options: [
        "berani",
        "malas",
        "senyap"
      ],
      explanation:
        "Berani bermaksud tidak takut menghadapi sesuatu."
    }
  ];


  const vocabulary =
    getVocabularyWords();


  const knownWords =
    new Set(
      vocabulary.map(
        item =>
          String(
            item.word || ""
          ).toLowerCase()
      )
    );


  const preferred =
    baseQuestions.filter(
      question =>
        knownWords.has(
          question.answer.toLowerCase()
        )
    );


  const remaining =
    baseQuestions.filter(
      question =>
        !knownWords.has(
          question.answer.toLowerCase()
        )
    );


  const selected =
    [
      ...shuffleArray(preferred),
      ...shuffleArray(remaining)
    ]
      .slice(
        0,
        5
      )
      .map(
        question => ({
          ...question,
          options:
            shuffleArray(
              question.options
            )
        })
      );


  return selected;

}


/* =========================================================
   RENDER CURRENT ROUND
   ========================================================= */

function renderGrammarRainRound() {

  const question =
    grammarRainState.questions[
      grammarRainState.index
    ];


  if (
    !question ||
    grammarRainState.lives <= 0
  ) {

    renderGrammarRainResult();

    return;

  }


  const roundNumber =
    grammarRainState.index + 1;


  const total =
    grammarRainState.questions.length;


  const progress =
    Math.round(
      grammarRainState.index /
      total *
      100
    );


  const hearts =
    Array.from(
      { length: 3 },
      (
        _,
        index
      ) =>
        index <
        grammarRainState.lives
          ? "❤️"
          : "🖤"
    ).join(" ");


  openModuleScreen(
    `

      <span class="section-kicker">
        LANGKAH 4
      </span>

      <h1>
        🌧️ Grammar Rain
      </h1>


      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
        margin:14px 0 18px;
      ">

        <div style="
          padding:9px 13px;
          border-radius:999px;
          background:#fff4dd;
          font-size:13px;
          font-weight:900;
          color:#b36c1d;
        ">
          ⭐ ${grammarRainState.score} mata
        </div>


        <div style="
          font-size:18px;
          letter-spacing:2px;
        ">
          ${hearts}
        </div>

      </div>


      <div style="
        height:8px;
        background:#ece9e4;
        border-radius:999px;
        overflow:hidden;
        margin-bottom:24px;
      ">

        <div style="
          width:${progress}%;
          height:100%;
          background:#ff9f43;
          border-radius:999px;
        "></div>

      </div>


      <div style="
        font-size:13px;
        font-weight:850;
        color:#8a9297;
        margin-bottom:8px;
      ">
        Soalan ${roundNumber} daripada ${total}
      </div>


      <div style="
        min-height:190px;
        border-radius:26px;
        background:linear-gradient(
          180deg,
          #eeeaff,
          #f7f4ff
        );
        border:1px solid #e4ddff;
        padding:28px 22px;
        display:flex;
        flex-direction:column;
        justify-content:center;
        text-align:center;
        margin-bottom:22px;
        position:relative;
        overflow:hidden;
      ">

        <div style="
          font-size:46px;
          margin-bottom:14px;
        ">
          ☁️
        </div>


        <strong style="
          font-size:22px;
          line-height:1.5;
          color:#2c3540;
        ">
          ${escapeHtml(
            question.sentence
          )}
        </strong>


        <div style="
          position:absolute;
          bottom:-12px;
          left:0;
          right:0;
          text-align:center;
          font-size:42px;
          opacity:.55;
        ">
          🌧️ 🌧️ 🌧️
        </div>

      </div>


      <p style="
        color:#65727a;
        text-align:center;
        margin-bottom:16px;
      ">
        Tangkap jawapan yang betul sebelum hujan turun!
      </p>


      <div
        id="grammarRainOptions"
        style="
          display:grid;
          gap:12px;
        "
      >

        ${
          question.options
            .map(
              option => `

                <button
                  type="button"
                  class="secondary-button grammar-rain-answer"
                  data-grammar-answer="${escapeAttribute(
                    option
                  )}"
                  style="
                    width:100%;
                    padding:15px 16px;
                    font-size:17px;
                    font-weight:850;
                  "
                >
                  ${escapeHtml(
                    option
                  )}
                </button>

              `
            )
            .join("")
        }

      </div>

    `,
    57
  );


  setTimeout(
    bindGrammarRainRoundControls,
    0
  );

}


/* =========================================================
   BIND ROUND CONTROLS
   ========================================================= */

function bindGrammarRainRoundControls() {

  $$(
    ".grammar-rain-answer"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          if (
            grammarRainState.answered
          ) {

            return;

          }


          submitGrammarRainAnswer(
            button.dataset.grammarAnswer,
            button
          );

        }
      );

    }
  );

}


/* =========================================================
   SUBMIT ANSWER
   ========================================================= */

function submitGrammarRainAnswer(
  selectedAnswer,
  selectedButton
) {

  const question =
    grammarRainState.questions[
      grammarRainState.index
    ];


  if (!question) {
    return;
  }


  grammarRainState.answered =
    true;


  const correct =
    String(
      selectedAnswer
    ).toLowerCase() ===
    String(
      question.answer
    ).toLowerCase();


  $$(
    ".grammar-rain-answer"
  ).forEach(
    button => {

      button.disabled =
        true;


      const answer =
        String(
          button.dataset.grammarAnswer
        ).toLowerCase();


      if (
        answer ===
        String(
          question.answer
        ).toLowerCase()
      ) {

        button.style.background =
          "#e8f8ef";

        button.style.borderColor =
          "#85d5ac";

        button.style.color =
          "#237c52";

      }

    }
  );


  if (correct) {

    grammarRainState.score +=
      20;


    if (selectedButton) {

      selectedButton.style.background =
        "#e8f8ef";

      selectedButton.style.borderColor =
        "#85d5ac";

      selectedButton.style.color =
        "#237c52";

    }


    showToast(
      "🌟 Betul! +20 mata"
    );

  } else {

    grammarRainState.lives =
      Math.max(
        0,
        grammarRainState.lives - 1
      );


    if (selectedButton) {

      selectedButton.style.background =
        "#fff0f0";

      selectedButton.style.borderColor =
        "#efaaaa";

      selectedButton.style.color =
        "#b94d4d";

    }


    showToast(
      `💡 Belum tepat. Jawapan betul: ${question.answer}`
    );

  }


  showGrammarRainExplanation(
    question,
    correct
  );

}


/* =========================================================
   EXPLANATION PANEL
   ========================================================= */

function showGrammarRainExplanation(
  question,
  correct
) {

  const options =
    byId(
      "grammarRainOptions"
    );


  if (!options) {
    return;
  }


  const panel =
    document.createElement(
      "div"
    );


  panel.style.cssText = `
    margin-top:16px;
    padding:16px;
    border-radius:17px;
    background:${correct ? "#eef9f3" : "#fff5e9"};
    color:#566269;
    line-height:1.6;
    font-size:14px;
  `;


  panel.innerHTML = `

    <strong style="
      color:#313b41;
    ">
      ${
        correct
          ? "✅ Tepat!"
          : "💡 Cuba ingat:"
      }
    </strong>

    <div style="
      margin-top:6px;
    ">
      ${escapeHtml(
        question.explanation
      )}
    </div>


    <button
      id="nextGrammarRainButton"
      class="primary-button"
      type="button"
      style="
        width:100%;
        margin-top:14px;
      "
    >
      ${
        grammarRainState.index + 1 >=
        grammarRainState.questions.length

          ? "Lihat Keputusan →"

          : "Soalan Seterusnya →"
      }
    </button>

  `;


  options.appendChild(
    panel
  );


  byId(
    "nextGrammarRainButton"
  )?.addEventListener(
    "click",
    nextGrammarRainRound
  );

}


/* =========================================================
   NEXT ROUND
   ========================================================= */

function nextGrammarRainRound() {

  grammarRainState.index +=
    1;


  grammarRainState.answered =
    false;


  if (
    grammarRainState.lives <= 0 ||
    grammarRainState.index >=
      grammarRainState.questions.length
  ) {

    renderGrammarRainResult();

    return;

  }


  renderGrammarRainRound();

}


/* =========================================================
   RESULT SCREEN
   ========================================================= */

function renderGrammarRainResult() {

  const total =
    grammarRainState.questions.length;


  const maxScore =
    total * 20;


  const percentage =
    maxScore
      ? Math.round(
          grammarRainState.score /
          maxScore *
          100
        )
      : 0;


  const passed =
    percentage >= 60;


  if (passed) {

    completeMission(
      "grammar-rain"
    );

  }


  let emoji =
    "🌟";


  let title =
    "Hebat!";


  let message =
    "Kamu berjaya mengenal pasti perkataan yang sesuai dalam ayat.";


  if (
    percentage === 100
  ) {

    emoji =
      "🏆";

    title =
      "Sempurna!";

    message =
      "Semua jawapan betul. Grammar Rain berjaya ditamatkan dengan cemerlang!";

  } else if (
    !passed
  ) {

    emoji =
      "💪";

    title =
      "Cuba Lagi!";

    message =
      "Tak mengapa. Cuba sekali lagi dan perhatikan maksud setiap ayat.";

  }


  openModuleScreen(
    `

      <div style="
        text-align:center;
        padding:24px 0 8px;
      ">

        <div style="
          font-size:72px;
          margin-bottom:10px;
        ">
          ${emoji}
        </div>


        <span class="section-kicker">
          GRAMMAR RAIN
        </span>


        <h1 style="
          margin-top:8px;
        ">
          ${title}
        </h1>


        <p style="
          color:#65727a;
          line-height:1.7;
          margin-bottom:24px;
        ">
          ${message}
        </p>


        <div style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-bottom:22px;
        ">

          <div style="
            padding:18px;
            background:#fff6e5;
            border-radius:18px;
          ">

            <strong style="
              font-size:26px;
            ">
              ${grammarRainState.score}
            </strong>

            <div style="
              color:#7a8288;
              font-size:12px;
              margin-top:3px;
            ">
              Mata
            </div>

          </div>


          <div style="
            padding:18px;
            background:#f2efff;
            border-radius:18px;
          ">

            <strong style="
              font-size:26px;
            ">
              ${percentage}%
            </strong>

            <div style="
              color:#7a8288;
              font-size:12px;
              margin-top:3px;
            ">
              Ketepatan
            </div>

          </div>

        </div>


        ${
          passed
            ? `

              <button
                id="continueSentenceRecallButton"
                class="primary-button"
                type="button"
                style="
                  width:100%;
                  margin-bottom:10px;
                "
              >
                Teruskan ke Ingat Ayat →
              </button>

            `
            : ""
        }


        <button
          id="retryGrammarRainButton"
          class="secondary-button"
          type="button"
          style="
            width:100%;
          "
        >
          🌧️ Main Lagi
        </button>

      </div>

    `,
    57
  );


  setTimeout(
    () => {

      byId(
        "retryGrammarRainButton"
      )?.addEventListener(
        "click",
        renderGrammarRain
      );


      byId(
        "continueSentenceRecallButton"
      )?.addEventListener(
        "click",
        () => {

          openModule(
            "sentence-recall"
          );

        }
      );

    },
    0
  );

}
/* =========================================================
   42. SENTENCE RECALL
   ========================================================= */

/* =========================================================
   LANGKAH 5 — INGAT AYAT
   Sentence Recall Memory Trainer
   ========================================================= */

let sentenceRecallState = {
  sentence: "",
  focusWords: [],
  phase: "preview",
  hintLevel: 0,
  attempts: 0,
  timer: null
};


/* =========================================================
   START SENTENCE RECALL
   ========================================================= */

function renderSentenceRecall() {

  const sentence =
    getSentenceRecallSource();


  sentenceRecallState = {
    sentence,
    focusWords:
      getSentenceRecallFocusWords(
        sentence
      ),
    phase: "preview",
    hintLevel: 0,
    attempts: 0,
    timer: null
  };


  renderSentenceRecallPreview();

}


/* =========================================================
   GET SOURCE SENTENCE
   Prefer previous Bina Ayat sentence
   ========================================================= */

function getSentenceRecallSource() {

  if (
    typeof sentenceBuilderState !==
      "undefined" &&
    sentenceBuilderState?.task?.sentence
  ) {

    return cleanRecallSentence(
      sentenceBuilderState.task.sentence
    );

  }


  if (
    typeof sentenceBuilderSession !==
      "undefined" &&
    sentenceBuilderSession?.task?.sentence
  ) {

    return cleanRecallSentence(
      sentenceBuilderSession.task.sentence
    );

  }


  const vocabulary =
    getVocabularyWords();


  const usable =
    vocabulary.filter(
      item => {

        const example =
          cleanRecallSentence(
            item.example
          );


        const count =
          example
            .split(/\s+/)
            .filter(Boolean)
            .length;


        return (
          example &&
          count >= 4 &&
          count <= 12
        );

      }
    );


  if (
    usable.length
  ) {

    return cleanRecallSentence(
      shuffleArray(
        usable
      )[0].example
    );

  }


  return "Aiman membantu ibunya di rumah";

}


/* =========================================================
   CLEAN RECALL SENTENCE
   ========================================================= */

function cleanRecallSentence(
  value
) {

  return String(
    value || ""
  )
    .replace(
      /\s+/g,
      " "
    )
    .replace(
      /^[“"' ]+/,
      ""
    )
    .replace(
      /[.!?。！？"'”]+$/,
      ""
    )
    .trim();

}


/* =========================================================
   GET FOCUS WORDS
   ========================================================= */

function getSentenceRecallFocusWords(
  sentence
) {

  const stopWords =
    new Set([
      "di",
      "ke",
      "dan",
      "yang",
      "pada",
      "untuk",
      "dengan",
      "seorang",
      "itu",
      "ini",
      "dalam"
    ]);


  const words =
    sentence
      .split(/\s+/)
      .map(
        word =>
          word.replace(
            /[^A-Za-zÀ-ÿ'-]/g,
            ""
          )
      )
      .filter(
        word =>
          word.length > 2 &&
          !stopWords.has(
            word.toLowerCase()
          )
      );


  const unique =
    [];


  words.forEach(
    word => {

      if (
        !unique.some(
          item =>
            item.toLowerCase() ===
            word.toLowerCase()
        )
      ) {

        unique.push(
          word
        );

      }

    }
  );


  return unique.slice(
    0,
    3
  );

}


/* =========================================================
   PREVIEW SCREEN
   ========================================================= */

function renderSentenceRecallPreview() {

  sentenceRecallState.phase =
    "preview";


  openModuleScreen(
    `

      <span class="section-kicker">
        LANGKAH 5
      </span>

      <h1>
        💭 Ingat Ayat
      </h1>


      <p style="
        color:#65727a;
        line-height:1.7;
        margin-bottom:20px;
      ">
        Baca ayat ini dengan teliti.
        Cuba ingat susunan perkataan sebelum ayat disembunyikan.
      </p>


      <div style="
        padding:28px 22px;
        border-radius:24px;
        background:linear-gradient(
          145deg,
          #fff7dd,
          #f3efff
        );
        border:1px solid #eee4d1;
        text-align:center;
        margin-bottom:22px;
      ">

        <div style="
          font-size:44px;
          margin-bottom:14px;
        ">
          👀
        </div>


        <div style="
          font-size:22px;
          font-weight:900;
          line-height:1.65;
          color:#29343b;
        ">
          “${escapeHtml(
            sentenceRecallState.sentence
          )}.”
        </div>

      </div>


      <div style="
        padding:15px 17px;
        border-radius:17px;
        background:#eef9f4;
        color:#547064;
        line-height:1.6;
        margin-bottom:20px;
      ">
        🧠 Cuba ingat:
        <strong>
          ${escapeHtml(
            sentenceRecallState.focusWords.join(
              " · "
            )
          )}
        </strong>
      </div>


      <button
        id="startRecallMemoryButton"
        class="primary-button"
        type="button"
        style="
          width:100%;
        "
      >
        🙈 Saya Sudah Ingat
      </button>

    `,
    71
  );


  setTimeout(
    () => {

      byId(
        "startRecallMemoryButton"
      )?.addEventListener(
        "click",
        renderSentenceRecallInput
      );

    },
    0
  );

}


/* =========================================================
   INPUT SCREEN
   ========================================================= */

function renderSentenceRecallInput() {

  sentenceRecallState.phase =
    "input";


  const hint =
    getSentenceRecallHint();


  openModuleScreen(
    `

      <span class="section-kicker">
        LANGKAH 5
      </span>

      <h1>
        💭 Ingat Ayat
      </h1>


      <p style="
        color:#65727a;
        line-height:1.7;
      ">
        Ayat tadi sudah disembunyikan.
        Cuba tulis semula berdasarkan ingatan kamu.
      </p>


      ${
        hint
          ? `
            <div style="
              margin:18px 0;
              padding:15px 17px;
              border-radius:17px;
              background:#f2efff;
              color:#665c8a;
              line-height:1.6;
            ">
              💡 ${escapeHtml(
                hint
              )}
            </div>
          `
          : ""
      }


      <textarea
        id="recallInput"
        class="karangan-textarea"
        style="
          min-height:150px;
          width:100%;
          box-sizing:border-box;
          border:1px solid #e6e1d9;
          border-radius:18px;
          padding:16px;
          margin:20px 0 14px;
          font-size:16px;
          line-height:1.6;
          background:white;
        "
        placeholder="Tulis semula ayat yang kamu ingat..."
      ></textarea>


      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
        margin-bottom:12px;
      ">

        <button
          id="recallHintButton"
          class="secondary-button"
          type="button"
        >
          💡 Petunjuk
        </button>


        <button
          id="recallViewAgainButton"
          class="secondary-button"
          type="button"
        >
          👀 Lihat Sekali Lagi
        </button>

      </div>


      <button
        id="checkRecallButton"
        class="primary-button"
        type="button"
        style="
          width:100%;
        "
      >
        ✓ Semak Ingatan
      </button>

    `,
    71
  );


  setTimeout(
    bindSentenceRecallControls,
    0
  );

}


/* =========================================================
   BIND RECALL CONTROLS
   ========================================================= */

function bindSentenceRecallControls() {

  byId(
    "recallHintButton"
  )?.addEventListener(
    "click",
    () => {

      sentenceRecallState.hintLevel =
        Math.min(
          3,
          sentenceRecallState.hintLevel + 1
        );


      const currentValue =
        byId(
          "recallInput"
        )?.value || "";


      renderSentenceRecallInput();


      setTimeout(
        () => {

          const input =
            byId(
              "recallInput"
            );


          if (input) {

            input.value =
              currentValue;

            input.focus();

          }

        },
        0
      );

    }
  );


  byId(
    "recallViewAgainButton"
  )?.addEventListener(
    "click",
    renderSentenceRecallPreview
  );


  byId(
    "checkRecallButton"
  )?.addEventListener(
    "click",
    checkSentenceRecallAnswer
  );

}


/* =========================================================
   RECALL HINT
   ========================================================= */

function getSentenceRecallHint() {

  if (
    sentenceRecallState.hintLevel ===
    0
  ) {

    return "";

  }


  const words =
    sentenceRecallState.sentence
      .split(/\s+/)
      .filter(Boolean);


  if (
    sentenceRecallState.hintLevel ===
    1
  ) {

    return `Kata kunci: ${sentenceRecallState.focusWords.join(
      " · "
    )}`;

  }


  if (
    sentenceRecallState.hintLevel ===
    2
  ) {

    return `Ayat bermula dengan "${words
      .slice(
        0,
        Math.min(
          2,
          words.length
        )
      )
      .join(" ")}".`;

  }


  const half =
    Math.max(
      2,
      Math.ceil(
        words.length / 2
      )
    );


  return `Bahagian awal ayat ialah "${words
    .slice(
      0,
      half
    )
    .join(" ")}..."`;

}


/* =========================================================
   CHECK RECALL ANSWER
   ========================================================= */

function checkSentenceRecallAnswer() {

  const input =
    byId(
      "recallInput"
    );


  const value =
    input?.value
      .trim() ||
    "";


  if (
    value.length < 3
  ) {

    showToast(
      "✍️ Cuba tulis ayat dahulu."
    );

    return;

  }


  sentenceRecallState.attempts +=
    1;


  const score =
    calculateSentenceRecallSimilarity(
      value,
      sentenceRecallState.sentence
    );


  if (
    score >= 80
  ) {

    completeMission(
      "sentence-recall"
    );


    renderSentenceRecallSuccess(
      score
    );

    return;

  }


  if (
    score >= 55
  ) {

    showToast(
      `🧠 Hampir tepat! Ingatan kamu ${score}%.`
    );


    sentenceRecallState.hintLevel =
      Math.max(
        sentenceRecallState.hintLevel,
        1
      );


    return;

  }


  showToast(
    `💡 Cuba lagi. Ingatan kamu ${score}%.`
  );


  sentenceRecallState.hintLevel =
    Math.max(
      sentenceRecallState.hintLevel,
      2
    );


  const currentValue =
    value;


  setTimeout(
    () => {

      renderSentenceRecallInput();


      setTimeout(
        () => {

          const newInput =
            byId(
              "recallInput"
            );


          if (newInput) {

            newInput.value =
              currentValue;

          }

        },
        0
      );

    },
    450
  );

}


/* =========================================================
   SIMILARITY SCORE
   ========================================================= */

function calculateSentenceRecallSimilarity(
  studentSentence,
  correctSentence
) {

  const studentWords =
    normalizeRecallText(
      studentSentence
    )
      .split(" ")
      .filter(Boolean);


  const correctWords =
    normalizeRecallText(
      correctSentence
    )
      .split(" ")
      .filter(Boolean);


  if (
    !correctWords.length
  ) {

    return 0;

  }


  let correctPosition =
    0;


  correctWords.forEach(
    (
      word,
      index
    ) => {

      if (
        studentWords[index] ===
        word
      ) {

        correctPosition +=
          1;

      }

    }
  );


  const correctSet =
    new Set(
      correctWords
    );


  const rememberedWords =
    new Set(
      studentWords.filter(
        word =>
          correctSet.has(
            word
          )
      )
    );


  const vocabularyScore =
    rememberedWords.size /
    new Set(
      correctWords
    ).size;


  const positionScore =
    correctPosition /
    correctWords.length;


  const lengthScore =
    Math.min(
      studentWords.length,
      correctWords.length
    ) /
    Math.max(
      studentWords.length,
      correctWords.length
    );


  const final =
    (
      vocabularyScore * 0.5 +
      positionScore * 0.35 +
      lengthScore * 0.15
    ) *
    100;


  return Math.round(
    Math.min(
      100,
      Math.max(
        0,
        final
      )
    )
  );

}


/* =========================================================
   NORMALIZE RECALL TEXT
   ========================================================= */

function normalizeRecallText(
  value
) {

  return String(
    value || ""
  )
    .toLowerCase()
    .replace(
      /[.,!?;:'"“”‘’()-]/g,
      ""
    )
    .replace(
      /\s+/g,
      " "
    )
    .trim();

}


/* =========================================================
   SUCCESS SCREEN
   ========================================================= */

function renderSentenceRecallSuccess(
  score
) {

  openModuleScreen(
    `

      <div style="
        text-align:center;
        padding:24px 0 10px;
      ">

        <div style="
          font-size:72px;
          margin-bottom:10px;
        ">
          🧠✨
        </div>


        <span class="section-kicker">
          LANGKAH 5 SELESAI
        </span>


        <h1 style="
          margin-top:8px;
        ">
          Ingatan Hebat!
        </h1>


        <p style="
          color:#65727a;
          line-height:1.7;
          margin-bottom:22px;
        ">
          Kamu berjaya mengingat semula ayat yang dipelajari.
        </p>


        <div style="
          padding:20px;
          border-radius:20px;
          background:#eef9f3;
          margin-bottom:18px;
        ">

          <div style="
            font-size:13px;
            color:#658173;
            font-weight:800;
            margin-bottom:7px;
          ">
            AYAT ASAL
          </div>

          <div style="
            font-size:18px;
            font-weight:850;
            line-height:1.6;
            color:#29463b;
          ">
            “${escapeHtml(
              sentenceRecallState.sentence
            )}.”
          </div>

        </div>


        <div style="
          display:grid;
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-bottom:22px;
        ">

          <div style="
            padding:17px;
            border-radius:17px;
            background:#fff6e5;
          ">

            <strong style="
              font-size:24px;
            ">
              ${score}%
            </strong>

            <div style="
              margin-top:3px;
              font-size:12px;
              color:#7a8288;
            ">
              Ingatan
            </div>

          </div>


          <div style="
            padding:17px;
            border-radius:17px;
            background:#f2efff;
          ">

            <strong style="
              font-size:24px;
            ">
              ${sentenceRecallState.attempts}
            </strong>

            <div style="
              margin-top:3px;
              font-size:12px;
              color:#7a8288;
            ">
              Percubaan
            </div>

          </div>

        </div>


        <button
          id="continueToWritingStudioButton"
          class="primary-button"
          type="button"
          style="
            width:100%;
            margin-bottom:10px;
          "
        >
          Teruskan ke Studio Karangan →
        </button>


        <button
          id="retrySentenceRecallButton"
          class="secondary-button"
          type="button"
          style="
            width:100%;
          "
        >
          💭 Latih Ingatan Lagi
        </button>

      </div>

    `,
    71
  );


  setTimeout(
    () => {

      byId(
        "continueToWritingStudioButton"
      )?.addEventListener(
        "click",
        () => {

          showScreen(
            "create"
          );


          focusWriting();

        }
      );


      byId(
        "retrySentenceRecallButton"
      )?.addEventListener(
        "click",
        renderSentenceRecall
      );

    },
    0
  );

}
/* =========================================================
   43. WRITING
   ========================================================= */

/* =========================================================
   LANGKAH 6 — STUDIO KARANGAN
   Guided Writing Studio
   ========================================================= */

let writingStudioState = {

  promptVisible: true,

  ideaIndex: 0,

  sentenceStarterIndex: 0,

  lastSavedAt: null

};


/* =========================================================
   WRITING IDEAS
   ========================================================= */

const WRITING_IDEAS = [

  {
    emoji: "🏠",
    title: "Membantu Keluarga",
    prompt:
      "Ceritakan bagaimana kamu membantu ahli keluarga di rumah.",
    starters: [
      "Pada suatu hari, saya...",
      "Pada waktu pagi, saya...",
      "Saya berasa gembira kerana..."
    ]
  },

  {
    emoji: "🏫",
    title: "Hari di Sekolah",
    prompt:
      "Ceritakan satu pengalaman menarik yang berlaku di sekolah.",
    starters: [
      "Pada hari Isnin yang lalu...",
      "Apabila saya tiba di sekolah...",
      "Saya dan kawan-kawan..."
    ]
  },

  {
    emoji: "🌳",
    title: "Menjaga Kebersihan",
    prompt:
      "Ceritakan bagaimana kamu menjaga kebersihan rumah atau sekolah.",
    starters: [
      "Kita mesti menjaga...",
      "Pada hujung minggu...",
      "Saya membantu membersihkan..."
    ]
  },

  {
    emoji: "🎁",
    title: "Hari yang Menggembirakan",
    prompt:
      "Ceritakan satu peristiwa yang membuat kamu berasa gembira.",
    starters: [
      "Saya berasa sangat gembira apabila...",
      "Pada hari itu...",
      "Selepas itu, saya..."
    ]
  },

  {
    emoji: "🤝",
    title: "Menolong Kawan",
    prompt:
      "Ceritakan bagaimana kamu membantu seorang kawan.",
    starters: [
      "Pada suatu hari di sekolah...",
      "Saya ternampak kawan saya...",
      "Saya segera membantu..."
    ]
  }

];


/* =========================================================
   BIND WRITING
   ========================================================= */

function bindWriting() {

  const textarea =
    byId(
      "karanganInput"
    );


  const saveButton =
    byId(
      "saveWritingButton"
    );


  const checkButton =
    byId(
      "checkWritingButton"
    );


  if (textarea) {

    textarea.value =
      appState.savedWriting ||
      "";


    textarea.addEventListener(
      "input",
      () => {

        updateWordCount();

        updateWritingStudioProgress();

        autoSaveWritingDraft();

      }
    );

  }


  if (saveButton) {

    saveButton.addEventListener(
      "click",
      saveWriting
    );

  }


  if (checkButton) {

    checkButton.addEventListener(
      "click",
      runWritingFeedback
    );

  }


  initializeWritingStudio();

}


/* =========================================================
   INITIALIZE STUDIO
   ========================================================= */

function initializeWritingStudio() {

  injectWritingStudioPanel();

  updateWritingStudioPanel();

  updateWritingStudioProgress();

}


/* =========================================================
   INJECT GUIDED WRITING PANEL
   ========================================================= */

function injectWritingStudioPanel() {

  const textarea =
    byId(
      "karanganInput"
    );


  if (!textarea) {

    return;

  }


  if (
    byId(
      "writingStudioGuide"
    )
  ) {

    return;

  }


  const guide =
    document.createElement(
      "div"
    );


  guide.id =
    "writingStudioGuide";


  guide.style.cssText = `
    margin-bottom:20px;
  `;


  textarea.parentNode.insertBefore(
    guide,
    textarea
  );


  const progress =
    document.createElement(
      "div"
    );


  progress.id =
    "writingStudioProgressPanel";


  progress.style.cssText = `
    margin-top:14px;
    margin-bottom:16px;
  `;


  textarea.parentNode.insertBefore(
    progress,
    textarea.nextSibling
  );

}


/* =========================================================
   UPDATE STUDIO GUIDE
   ========================================================= */

function updateWritingStudioPanel() {

  const container =
    byId(
      "writingStudioGuide"
    );


  if (!container) {

    return;

  }


  const idea =
    WRITING_IDEAS[
      writingStudioState.ideaIndex %
      WRITING_IDEAS.length
    ];


  const vocabulary =
    getWritingVocabularySuggestions();


  const sentenceStarter =
    idea.starters[
      writingStudioState
        .sentenceStarterIndex %
      idea.starters.length
    ];


  container.innerHTML = `

    <div style="
      padding:18px;
      border-radius:22px;
      background:linear-gradient(
        145deg,
        #fff7e7,
        #f4efff
      );
      border:1px solid #eee5d8;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:flex-start;
        gap:12px;
      ">

        <div>

          <span style="
            font-size:11px;
            font-weight:900;
            letter-spacing:.08em;
            color:#d47a22;
          ">
            LANGKAH 6 · IDEA KARANGAN
          </span>


          <h3 style="
            margin:7px 0 6px;
            font-size:20px;
          ">
            ${idea.emoji}
            ${escapeHtml(
              idea.title
            )}
          </h3>

        </div>


        <button
          id="changeWritingIdeaButton"
          type="button"
          style="
            border:0;
            background:white;
            border-radius:12px;
            padding:8px 10px;
            font-weight:800;
            color:#6c7580;
          "
        >
          🎲 Idea Lain
        </button>

      </div>


      <p style="
        color:#626d74;
        line-height:1.6;
        margin:8px 0 16px;
      ">
        ${escapeHtml(
          idea.prompt
        )}
      </p>


      <div style="
        padding:14px;
        border-radius:16px;
        background:rgba(
          255,
          255,
          255,
          .72
        );
        margin-bottom:14px;
      ">

        <div style="
          font-size:11px;
          font-weight:900;
          color:#7a6d9e;
          margin-bottom:6px;
        ">
          ✍️ MULA AYAT
        </div>


        <button
          id="insertSentenceStarterButton"
          type="button"
          style="
            width:100%;
            text-align:left;
            border:0;
            background:transparent;
            color:#433a65;
            font-size:15px;
            font-weight:800;
            line-height:1.5;
            padding:0;
          "
        >
          “${escapeHtml(
            sentenceStarter
          )}”
        </button>


        <button
          id="changeSentenceStarterButton"
          type="button"
          style="
            margin-top:8px;
            border:0;
            background:transparent;
            color:#82779f;
            font-weight:750;
            padding:0;
          "
        >
          Tukar pembukaan →
        </button>

      </div>


      <div>

        <div style="
          font-size:11px;
          font-weight:900;
          color:#6e7d73;
          margin-bottom:8px;
        ">
          🧠 PERKATAAN YANG BOLEH DIGUNAKAN
        </div>


        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:8px;
        ">

          ${
            vocabulary.length

              ? vocabulary
                  .map(
                    word => `

                      <button
                        type="button"
                        data-writing-word="${escapeAttribute(
                          word
                        )}"
                        style="
                          border:1px solid #ded9d1;
                          background:white;
                          border-radius:999px;
                          padding:8px 11px;
                          font-weight:800;
                          color:#48545b;
                        "
                      >
                        + ${escapeHtml(
                          word
                        )}
                      </button>

                    `
                  )
                  .join("")

              : `

                <span style="
                  color:#899197;
                  font-size:13px;
                ">
                  Simpan perkataan daripada Cerita untuk melihat cadangan di sini.
                </span>

              `
          }

        </div>

      </div>

    </div>

  `;


  bindWritingStudioControls();

}


/* =========================================================
   WRITING VOCABULARY SUGGESTIONS
   ========================================================= */

function getWritingVocabularySuggestions() {

  let words =
    [];


  try {

    words =
      getVocabularyWords();

  } catch (error) {

    words =
      [];

  }


  const suggestions =
    words
      .map(
        item =>
          String(
            item.word || ""
          ).trim()
      )
      .filter(Boolean);


  /*
    Include words from the previous memory task.
  */

  if (
    typeof sentenceRecallState !==
      "undefined" &&
    Array.isArray(
      sentenceRecallState.focusWords
    )
  ) {

    suggestions.push(
      ...sentenceRecallState.focusWords
    );

  }


  /*
    Include focus word from Bina Ayat.
  */

  if (
    typeof sentenceBuilderState !==
      "undefined" &&
    sentenceBuilderState?.task?.focusWord
  ) {

    suggestions.push(
      sentenceBuilderState.task.focusWord
    );

  }


  const unique =
    [];


  suggestions.forEach(
    word => {

      if (
        !unique.some(
          existing =>
            existing.toLowerCase() ===
            word.toLowerCase()
        )
      ) {

        unique.push(
          word
        );

      }

    }
  );


  return unique.slice(
    0,
    8
  );

}


/* =========================================================
   BIND STUDIO CONTROLS
   ========================================================= */

function bindWritingStudioControls() {

  byId(
    "changeWritingIdeaButton"
  )?.addEventListener(
    "click",
    () => {

      writingStudioState.ideaIndex =
        (
          writingStudioState.ideaIndex +
          1
        ) %
        WRITING_IDEAS.length;


      writingStudioState
        .sentenceStarterIndex =
        0;


      updateWritingStudioPanel();

    }
  );


  byId(
    "changeSentenceStarterButton"
  )?.addEventListener(
    "click",
    () => {

      writingStudioState
        .sentenceStarterIndex +=
        1;


      updateWritingStudioPanel();

    }
  );


  byId(
    "insertSentenceStarterButton"
  )?.addEventListener(
    "click",
    insertCurrentSentenceStarter
  );


  $$(
    "[data-writing-word]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          insertWritingWord(
            button.dataset.writingWord
          );

        }
      );

    }
  );

}


/* =========================================================
   INSERT SENTENCE STARTER
   ========================================================= */

function insertCurrentSentenceStarter() {

  const idea =
    WRITING_IDEAS[
      writingStudioState.ideaIndex %
      WRITING_IDEAS.length
    ];


  const starter =
    idea.starters[
      writingStudioState
        .sentenceStarterIndex %
      idea.starters.length
    ];


  const textarea =
    byId(
      "karanganInput"
    );


  if (!textarea) {

    return;

  }


  const current =
    textarea.value.trim();


  if (!current) {

    textarea.value =
      starter + " ";

  } else {

    textarea.value =
      current +
      "\n" +
      starter +
      " ";

  }


  textarea.focus();

  updateWordCount();

  updateWritingStudioProgress();

}


/* =========================================================
   INSERT VOCABULARY WORD
   ========================================================= */

function insertWritingWord(
  word
) {

  const textarea =
    byId(
      "karanganInput"
    );


  if (!textarea) {

    return;

  }


  const start =
    textarea.selectionStart ??
    textarea.value.length;


  const end =
    textarea.selectionEnd ??
    textarea.value.length;


  const before =
    textarea.value.slice(
      0,
      start
    );


  const after =
    textarea.value.slice(
      end
    );


  let prefix =
    "";


  if (
    before &&
    !/\s$/.test(
      before
    )
  ) {

    prefix =
      " ";

  }


  textarea.value =
    before +
    prefix +
    word +
    " " +
    after;


  const newPosition =
    (
      before +
      prefix +
      word +
      " "
    ).length;


  textarea.focus();

  textarea.setSelectionRange(
    newPosition,
    newPosition
  );


  updateWordCount();

  updateWritingStudioProgress();

}


/* =========================================================
   WRITING PROGRESS
   ========================================================= */

function updateWritingStudioProgress() {

  const panel =
    byId(
      "writingStudioProgressPanel"
    );


  const textarea =
    byId(
      "karanganInput"
    );


  if (
    !panel ||
    !textarea
  ) {

    return;

  }


  const text =
    textarea.value.trim();


  const words =
    text
      ? text
          .split(/\s+/)
          .filter(Boolean)
      : [];


  const sentences =
    text
      ? text
          .split(
            /[.!?]+/
          )
          .map(
            item =>
              item.trim()
          )
          .filter(Boolean)
      : [];


  const wordCount =
    words.length;


  const sentenceCount =
    sentences.length;


  const targetWords =
    40;


  const targetSentences =
    4;


  const progress =
    Math.min(
      100,
      Math.round(
        (
          Math.min(
            wordCount /
            targetWords,
            1
          ) *
          0.6 +

          Math.min(
            sentenceCount /
            targetSentences,
            1
          ) *
          0.4
        ) *
        100
      )
    );


  const ready =
    wordCount >= 20 &&
    sentenceCount >= 2;


  panel.innerHTML = `

    <div style="
      padding:15px 17px;
      border-radius:18px;
      background:#faf8f4;
      border:1px solid #ece7df;
    ">

      <div style="
        display:flex;
        justify-content:space-between;
        align-items:center;
        gap:12px;
        margin-bottom:9px;
      ">

        <strong style="
          font-size:13px;
          color:#4d5960;
        ">
          Kemajuan Karangan
        </strong>


        <span style="
          font-size:13px;
          font-weight:900;
          color:${
            ready
              ? "#2e9a68"
              : "#d07d25"
          };
        ">
          ${progress}%
        </span>

      </div>


      <div style="
        height:7px;
        background:#ece8e1;
        border-radius:999px;
        overflow:hidden;
        margin-bottom:12px;
      ">

        <div style="
          width:${progress}%;
          height:100%;
          border-radius:999px;
          background:#ff9f43;
        "></div>

      </div>


      <div style="
        display:grid;
        grid-template-columns:1fr 1fr 1fr;
        gap:8px;
        text-align:center;
      ">

        <div style="
          padding:9px 4px;
          background:white;
          border-radius:12px;
        ">

          <strong>
            ${wordCount}
          </strong>

          <div style="
            font-size:10px;
            color:#8b9498;
            margin-top:2px;
          ">
            Perkataan
          </div>

        </div>


        <div style="
          padding:9px 4px;
          background:white;
          border-radius:12px;
        ">

          <strong>
            ${sentenceCount}
          </strong>

          <div style="
            font-size:10px;
            color:#8b9498;
            margin-top:2px;
          ">
            Ayat
          </div>

        </div>


        <div style="
          padding:9px 4px;
          background:white;
          border-radius:12px;
        ">

          <strong>
            ${
              ready
                ? "✓"
                : "…"
            }
          </strong>

          <div style="
            font-size:10px;
            color:#8b9498;
            margin-top:2px;
          ">
            Sedia Semak
          </div>

        </div>

      </div>

    </div>

  `;

}


/* =========================================================
   FOCUS WRITING
   ========================================================= */

function focusWriting() {

  initializeWritingStudio();


  setTimeout(
    () => {

      byId(
        "karanganInput"
      )?.focus();

    },
    300
  );

}


/* =========================================================
   SAVE WRITING
   ========================================================= */

function saveWriting() {

  const textarea =
    byId(
      "karanganInput"
    );


  if (!textarea) {

    return;

  }


  appState.savedWriting =
    textarea.value;


  writingStudioState.lastSavedAt =
    new Date().toISOString();


  saveState();


  showToast(
    "💾 Karangan sudah disimpan."
  );


  updateWritingStudioProgress();


  const stats =
    getWritingStats(
      textarea.value
    );


  if (
    stats.words >= 20 &&
    stats.sentences >= 2
  ) {

    completeMission(
      "creative-studio"
    );

  }

}


/* =========================================================
   AUTO SAVE
   ========================================================= */

let writingAutoSaveTimer =
  null;


function autoSaveWritingDraft() {

  clearTimeout(
    writingAutoSaveTimer
  );


  writingAutoSaveTimer =
    setTimeout(
      () => {

        const textarea =
          byId(
            "karanganInput"
          );


        if (!textarea) {

          return;

        }


        appState.savedWriting =
          textarea.value;


        writingStudioState.lastSavedAt =
          new Date().toISOString();


        saveState();

      },
      800
    );

}


/* =========================================================
   WRITING STATS
   ========================================================= */

function getWritingStats(
  value
) {

  const text =
    String(
      value || ""
    ).trim();


  const words =
    text
      ? text
          .split(/\s+/)
          .filter(Boolean)
          .length
      : 0;


  const sentences =
    text
      ? text
          .split(
            /[.!?]+/
          )
          .map(
            item =>
              item.trim()
          )
          .filter(Boolean)
          .length
      : 0;


  return {
    words,
    sentences
  };

}


/* =========================================================
   UPDATE WRITING UI
   ========================================================= */

function updateWritingUI() {

  const textarea =
    byId(
      "karanganInput"
    );


  if (
    textarea &&
    textarea.value !==
      appState.savedWriting
  ) {

    textarea.value =
      appState.savedWriting ||
      "";

  }


  updateWordCount();

  updateWritingStudioProgress();

}


/* =========================================================
   WORD COUNT
   ========================================================= */

function updateWordCount() {

  const textarea =
    byId(
      "karanganInput"
    );


  const counter =
    byId(
      "writingWordCount"
    );


  if (
    !textarea ||
    !counter
  ) {

    return;

  }


  const stats =
    getWritingStats(
      textarea.value
    );


  counter.textContent =
    stats.words;

}
/* =========================================================
   44. AI WRITING FEEDBACK
   ========================================================= */

/* =========================================================
   LANGKAH 7 — AI FEEDBACK
   Cikgu Aira Writing Coach
   ========================================================= */

async function runWritingFeedback() {

  showScreen(
    "create"
  );


  const textarea =
    byId(
      "karanganInput"
    );


  const panel =
    byId(
      "aiFeedbackPanel"
    );


  const content =
    byId(
      "aiFeedbackContent"
    );


  const writing =
    textarea
      ?.value
      .trim() ||
    "";


  if (!textarea) {
    return;
  }


  const stats =
    getWritingStats(
      writing
    );


  /* ---------------------------------------------------------
     MINIMUM WRITING CHECK
     --------------------------------------------------------- */

  if (
    stats.words < 10
  ) {

    if (panel) {
      panel.hidden = false;
    }


    if (content) {

      content.innerHTML = `

        <div style="
          padding:18px;
          border-radius:18px;
          background:#fff6e5;
        ">

          <div style="
            font-size:36px;
            margin-bottom:8px;
          ">
            ✍️
          </div>

          <strong style="
            font-size:18px;
          ">
            Tulis sedikit lagi dahulu
          </strong>

          <p style="
            color:#65727a;
            line-height:1.6;
            margin-bottom:0;
          ">
            Kamu baru menulis ${stats.words} perkataan.
            Cuba tulis sekurang-kurangnya 10 perkataan supaya Cikgu Aira boleh memberi maklum balas yang lebih berguna.
          </p>

        </div>

      `;

    }


    focusWriting();

    return;
  }


  /* ---------------------------------------------------------
     SAVE BEFORE ANALYSIS
     --------------------------------------------------------- */

  appState.savedWriting =
    writing;


  saveState();


  if (panel) {
    panel.hidden = false;
  }


  if (content) {

    content.innerHTML = `

      <div style="
        padding:24px 18px;
        border-radius:20px;
        background:linear-gradient(
          145deg,
          #f3efff,
          #fff7e7
        );
        text-align:center;
      ">

        <div style="
          font-size:46px;
          margin-bottom:10px;
        ">
          👩‍🏫✨
        </div>

        <strong style="
          font-size:18px;
        ">
          Cikgu Aira sedang membaca...
        </strong>

        <p style="
          color:#68747a;
          line-height:1.6;
          margin-bottom:0;
        ">
          Saya sedang melihat idea, ayat, kosa kata dan tatabahasa kamu.
        </p>

      </div>

    `;

  }


  /* ---------------------------------------------------------
     AI REQUEST
     --------------------------------------------------------- */

  try {

    const vocabulary =
      getWritingVocabularySuggestions();


    const result =
      await callAI({

        type:
          "writing-feedback",

        text:
          writing,

        level:
          "Year 3",

        language:
          "Bahasa Melayu",

        supportLanguage:
          "Chinese and English when useful",

        vocabulary,

        instruction:
          `
You are Cikgu Aira, a friendly Bahasa Melayu writing coach for a Year 3 student.

Evaluate the student's writing without rewriting the whole essay.

Return concise structured feedback with:
1. score out of 100
2. one strength
3. one grammar or spelling improvement
4. one vocabulary improvement
5. one idea to make the writing more interesting
6. one short corrected example sentence only
7. encouraging closing message

Use simple Bahasa Melayu.
Chinese or English may be used briefly to explain difficult vocabulary.
Do not write a complete replacement essay.
          `.trim()

      });


    const answer =
      extractAIText(
        result
      );


    renderStructuredWritingFeedback(
      answer ||
      getFallbackWritingFeedback(
        writing
      ),
      writing
    );


    completeMission(
      "creative-studio"
    );


    completeMission(
      "ai-feedback"
    );


    appState.progress.writing =
      Math.min(
        100,
        appState.progress.writing +
        15
      );


    saveState();

    updateAllUI();

  } catch (error) {

    console.warn(
      "AI feedback unavailable:",
      error
    );


    renderStructuredWritingFeedback(
      getFallbackWritingFeedback(
        writing
      ),
      writing,
      true
    );


    completeMission(
      "creative-studio"
    );

  }

}


/* =========================================================
   RENDER STRUCTURED FEEDBACK
   ========================================================= */

function renderStructuredWritingFeedback(
  feedback,
  writing,
  offline = false
) {

  const panel =
    byId(
      "aiFeedbackPanel"
    );


  const content =
    byId(
      "aiFeedbackContent"
    );


  if (!content) {
    return;
  }


  if (panel) {
    panel.hidden = false;
  }


  const stats =
    getWritingStats(
      writing
    );


  const score =
    estimateWritingScore(
      writing,
      feedback
    );


  const grade =
    getWritingGrade(
      score
    );


  content.innerHTML = `

    <div style="
      display:grid;
      gap:16px;
    ">


      <!-- SCORE -->

      <div style="
        padding:20px;
        border-radius:22px;
        background:linear-gradient(
          145deg,
          #fff6df,
          #f2efff
        );
        text-align:center;
      ">

        <div style="
          font-size:42px;
          margin-bottom:7px;
        ">
          ${grade.emoji}
        </div>


        <div style="
          font-size:32px;
          font-weight:950;
          color:#273239;
        ">
          ${score}/100
        </div>


        <strong style="
          display:block;
          margin-top:4px;
          color:#6657b5;
        ">
          ${grade.label}
        </strong>


        <div style="
          display:flex;
          justify-content:center;
          gap:16px;
          margin-top:14px;
          color:#788187;
          font-size:13px;
        ">

          <span>
            ✏️ ${stats.words} perkataan
          </span>

          <span>
            📝 ${stats.sentences} ayat
          </span>

        </div>

      </div>


      <!-- AI FEEDBACK -->

      <div style="
        padding:18px;
        border-radius:20px;
        background:white;
        border:1px solid #ece7df;
      ">

        <div style="
          display:flex;
          align-items:center;
          gap:9px;
          margin-bottom:13px;
        ">

          <span style="
            font-size:28px;
          ">
            👩‍🏫
          </span>

          <div>

            <strong style="
              display:block;
            ">
              Maklum Balas Cikgu Aira
            </strong>

            <small style="
              color:#8a9297;
            ">
              ${
                offline
                  ? "Mod bantuan tempatan"
                  : "AI Writing Coach"
              }
            </small>

          </div>

        </div>


        <div style="
          color:#566269;
          line-height:1.7;
        ">
          ${formatAIResponse(
            feedback
          )}
        </div>

      </div>


      <!-- NEXT ACTION -->

      <div style="
        padding:17px;
        border-radius:18px;
        background:#eef9f3;
      ">

        <strong style="
          display:block;
          color:#286a4b;
          margin-bottom:6px;
        ">
          🌱 Cabaran Seterusnya
        </strong>

        <p style="
          color:#587067;
          line-height:1.6;
          margin:0;
        ">
          Perbaiki satu atau dua bahagian dahulu. Selepas itu tekan
          <strong>Semak dengan Cikgu Aira</strong>
          sekali lagi untuk melihat sama ada karangan kamu bertambah baik.
        </p>

      </div>


      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
      ">

        <button
          id="continueEditingWritingButton"
          class="secondary-button"
          type="button"
        >
          ✏️ Baiki Karangan
        </button>


        <button
          id="finishWritingJourneyButton"
          class="primary-button"
          type="button"
        >
          🎉 Selesai
        </button>

      </div>

    </div>

  `;


  setTimeout(
    bindWritingFeedbackActions,
    0
  );

}


/* =========================================================
   FEEDBACK ACTIONS
   ========================================================= */

function bindWritingFeedbackActions() {

  byId(
    "continueEditingWritingButton"
  )?.addEventListener(
    "click",
    () => {

      const panel =
        byId(
          "aiFeedbackPanel"
        );


      if (panel) {

        panel.hidden =
          true;

      }


      focusWriting();

    }
  );


  byId(
    "finishWritingJourneyButton"
  )?.addEventListener(
    "click",
    renderWritingJourneyComplete
  );

}


/* =========================================================
   ESTIMATE SCORE
   ========================================================= */

function estimateWritingScore(
  writing,
  feedback = ""
) {

  const stats =
    getWritingStats(
      writing
    );


  let score =
    40;


  score +=
    Math.min(
      25,
      stats.words * 0.6
    );


  score +=
    Math.min(
      15,
      stats.sentences * 4
    );


  if (
    /[.!?]/.test(
      writing
    )
  ) {

    score +=
      5;

  }


  if (
    /^[A-ZÀ-ÖØ-Ý]/.test(
      writing.trim()
    )
  ) {

    score +=
      5;

  }


  const vocabulary =
    getWritingVocabularySuggestions();


  const lowerWriting =
    writing.toLowerCase();


  const usedVocabulary =
    vocabulary.filter(
      word =>
        lowerWriting.includes(
          word.toLowerCase()
        )
    );


  score +=
    Math.min(
      10,
      usedVocabulary.length * 2
    );


  const numberFromAI =
    String(
      feedback || ""
    ).match(
      /\b([1-9][0-9]|100)\s*\/\s*100\b/
    );


  if (
    numberFromAI
  ) {

    const aiScore =
      Number(
        numberFromAI[1]
      );


    if (
      aiScore >= 1 &&
      aiScore <= 100
    ) {

      score =
        Math.round(
          score * 0.35 +
          aiScore * 0.65
        );

    }

  }


  return Math.max(
    45,
    Math.min(
      100,
      Math.round(
        score
      )
    )
  );

}


/* =========================================================
   WRITING GRADE
   ========================================================= */

function getWritingGrade(
  score
) {

  if (
    score >= 90
  ) {

    return {
      emoji: "🏆",
      label:
        "Cemerlang!"
    };

  }


  if (
    score >= 80
  ) {

    return {
      emoji: "🌟",
      label:
        "Sangat Baik"
    };

  }


  if (
    score >= 65
  ) {

    return {
      emoji: "👏",
      label:
        "Baik"
    };

  }


  return {
    emoji: "🌱",
    label:
      "Teruskan Berlatih"
  };

}


/* =========================================================
   WRITING JOURNEY COMPLETE
   ========================================================= */

function renderWritingJourneyComplete() {

  const modal =
    byId(
      "appModal"
    );


  const content =
    byId(
      "modalContent"
    );


  if (
    modal &&
    content
  ) {

    content.innerHTML = `

      <div style="
        text-align:center;
        padding:24px 10px;
      ">

        <div style="
          font-size:76px;
          margin-bottom:10px;
        ">
          🎓✨
        </div>


        <span class="section-kicker">
          MISI HARI INI
        </span>


        <h2 style="
          margin:8px 0;
        ">
          Pengembaraan Selesai!
        </h2>


        <p style="
          color:#65727a;
          line-height:1.7;
        ">
          Kamu sudah membaca, belajar kosa kata, membina ayat,
          bermain Grammar Rain, melatih ingatan dan menulis karangan.
        </p>


        <div style="
          margin:20px 0;
          padding:17px;
          border-radius:18px;
          background:#fff6e5;
        ">

          <strong style="
            font-size:24px;
          ">
            ⭐ ${appState.xp} XP
          </strong>

          <div style="
            margin-top:4px;
            color:#7b8388;
          ">
            ${
              appState.completedMissions.length
            } / ${
              APP_CONFIG.missionOrder.length
            } misi selesai
          </div>

        </div>


        <button
          id="returnHomeAfterWritingButton"
          class="primary-button"
          type="button"
          style="
            width:100%;
          "
        >
          🏠 Kembali ke Home
        </button>

      </div>

    `;


    modal.hidden =
      false;


    setTimeout(
      () => {

        byId(
          "returnHomeAfterWritingButton"
        )?.addEventListener(
          "click",
          () => {

            closeModal();

            showScreen(
              "home"
            );

          }
        );

      },
      0
    );


    return;

  }


  showToast(
    "🎉 Semua aktiviti selesai!"
  );


  showScreen(
    "home"
  );

}
/* =========================================================
   45. FALLBACK WRITING FEEDBACK
   ========================================================= */

function getFallbackWritingFeedback(
  writing
) {

  const wordCount =
    writing
      .split(/\s+/)
      .filter(Boolean)
      .length;


  return `
🌟 Bagus! Kamu sudah mula menulis.

✅ Kekuatan:
Kamu sudah mempunyai idea yang jelas dan menulis ${wordCount} perkataan.

💡 Cuba perbaiki:
Pastikan setiap ayat bermula dengan huruf besar dan berakhir dengan tanda noktah.

🧠 Cabaran seterusnya:
Bolehkah kamu tambah satu ayat tentang perasaan atau apa yang berlaku selepas itu?
  `.trim();

}


/* =========================================================
   46. AI API
   ========================================================= */

async function callAI(
  payload
) {

  const response =
    await fetch(
      "/api/ai",
      {
        method:
          "POST",

        headers: {
          "Content-Type":
            "application/json"
        },

        body:
          JSON.stringify(
            payload
          )
      }
    );


  if (
    !response.ok
  ) {

    throw new Error(
      `AI API ${response.status}`
    );

  }


  return response.json();

}


function extractAIText(
  result
) {

  if (!result) {
    return "";
  }


  if (
    typeof result ===
    "string"
  ) {

    return result;

  }


  return (
    result.answer ||
    result.message ||
    result.text ||
    result.output ||
    result.response ||
    result.content ||
    ""
  );

}


/* =========================================================
   47. FORMAT AI TEXT
   ========================================================= */

function formatAIResponse(
  text
) {

  return String(
    text
  )
    .split(/\n+/)
    .filter(Boolean)
    .map(
      line => `
        <p style="
          line-height:1.65;
          margin-bottom:12px;
        ">
          ${escapeHtml(
            line
          )}
        </p>
      `
    )
    .join("");

}


/* =========================================================
   48. CIKGU AIRA
   ========================================================= */

function bindMentor() {

  const floating =
    byId(
      "mentorFloatingButton"
    );


  const close =
    byId(
      "mentorPanelClose"
    );


  const form =
    byId(
      "mentorForm"
    );


  if (floating) {

    floating.addEventListener(
      "click",
      openMentorPanel
    );

  }


  if (close) {

    close.addEventListener(
      "click",
      closeMentorPanel
    );

  }


  if (form) {

    form.addEventListener(
      "submit",
      event => {

        event.preventDefault();

        sendMentorMessage();

      }
    );

  }


  $$(
    "[data-mentor-prompt]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const prompts = {

            meaning:
              "Apa maksud perkataan ini?",

            sentence:
              "Bantu saya bina ayat.",

            idea:
              "Beri saya petunjuk untuk menulis."

          };


          const input =
            byId(
              "mentorInput"
            );


          if (input) {

            input.value =
              prompts[
                button.dataset.mentorPrompt
              ] || "";


            input.focus();

          }

        }
      );

    }
  );

}


function openMentorPanel() {

  const panel =
    byId(
      "mentorPanel"
    );


  if (!panel) {
    return;
  }


  panel.hidden =
    false;


  setTimeout(
    () =>
      byId(
        "mentorInput"
      )?.focus(),
    150
  );

}


function closeMentorPanel() {

  const panel =
    byId(
      "mentorPanel"
    );


  if (panel) {

    panel.hidden =
      true;

  }

}


/* =========================================================
   49. SEND MENTOR MESSAGE
   ========================================================= */

async function sendMentorMessage() {

  const input =
    byId(
      "mentorInput"
    );


  const chat =
    byId(
      "mentorChat"
    );


  if (
    !input ||
    !chat
  ) {

    return;

  }


  const message =
    input.value.trim();


  if (!message) {
    return;
  }


  input.value =
    "";


  appendChatBubble(
    message,
    "student"
  );


  const thinking =
    document.createElement(
      "div"
    );


  thinking.className =
    "mentor-bubble";


  thinking.dataset.thinking =
    "true";


  thinking.textContent =
    "Cikgu Aira sedang berfikir...";


  chat.appendChild(
    thinking
  );


  chat.scrollTop =
    chat.scrollHeight;


  try {

    const result =
      await callAI({

        type:
          "mentor",

        message,

        level:
          "Year 3",

        mentorLanguage:
          "Chinese / English / Bahasa Melayu",

        rule:
          "Give hints and explanations. Do not write a full essay for the student."

      });


    thinking.remove();


    appendChatBubble(
      extractAIText(
        result
      ) ||
      "Cuba fikirkan satu perkataan penting dahulu. Saya boleh bantu kamu langkah demi langkah.",
      "mentor"
    );

  } catch (error) {

    thinking.remove();


    appendChatBubble(
      getMentorFallback(
        message
      ),
      "mentor"
    );

  }

}


/* =========================================================
   50. CHAT BUBBLE
   ========================================================= */

function appendChatBubble(
  text,
  sender
) {

  const chat =
    byId(
      "mentorChat"
    );


  if (!chat) {
    return;
  }


  const bubble =
    document.createElement(
      "div"
    );


  if (
    sender ===
    "student"
  ) {

    bubble.style.cssText = `
      max-width:88%;
      margin:10px 0 10px auto;
      padding:12px 14px;
      border-radius:17px 17px 5px 17px;
      background:#ff9f43;
      color:white;
      font-size:14px;
      line-height:1.5;
    `;

  } else {

    bubble.className =
      "mentor-bubble";


    bubble.style.marginTop =
      "10px";

  }


  bubble.textContent =
    text;


  chat.appendChild(
    bubble
  );


  chat.scrollTop =
    chat.scrollHeight;

}


/* =========================================================
   51. MENTOR OFFLINE FALLBACK
   ========================================================= */

function getMentorFallback(
  message
) {

  const lower =
    message.toLowerCase();


  if (
    lower.includes(
      "ayat"
    )
  ) {

    return "Mari bina ayat langkah demi langkah. Siapa yang melakukan tindakan? Apa tindakan itu? Di mana ia berlaku?";

  }


  if (
    lower.includes(
      "maksud"
    )
  ) {

    return "Beritahu saya perkataan yang kamu mahu fahami. Cuba juga lihat ayat di sekeliling perkataan itu untuk mendapatkan petunjuk.";

  }


  if (
    lower.includes(
      "karangan"
    ) ||
    lower.includes(
      "idea"
    )
  ) {

    return "Cuba jawab tiga soalan dahulu: Siapa? Di mana? Apa yang berlaku? Jawapan kamu boleh menjadi idea awal karangan.";

  }


  return "Saya boleh bantu kamu langkah demi langkah. Cuba beritahu saya bahagian mana yang paling susah.";

}


/* =========================================================
   52. PROFILE
   ========================================================= */

function updateProfileUI() {

  const level =
    getCurrentLevel();


  const next =
    getNextLevel();


  safeText(
    byId(
      "studentDisplayName"
    ),
    level.name
  );


  safeText(
    byId(
      "avatarName"
    ),
    level.name
  );


  safeText(
    byId(
      "avatarLevel"
    ),
    level.level
  );


  safeText(
    byId(
      "profileXp"
    ),
    appState.xp
  );


  safeText(
    byId(
      "profileStreak"
    ),
    appState.streak
  );


  safeText(
    byId(
      "storiesCompleted"
    ),
    appState.storiesCompleted
  );


  safeText(
    byId(
      "badgeCount"
    ),
    appState.badges.length
  );


  safeText(
    byId(
      "currentAvatarXp"
    ),
    appState.xp
  );


  safeText(
    byId(
      "nextAvatarXp"
    ),
    next
      ? next.minXp
      : appState.xp
  );


  const xpBar =
    byId(
      "avatarXpBar"
    );


  if (xpBar) {

    let percent =
      100;


    if (next) {

      const levelRange =
        next.minXp -
        level.minXp;


      const earned =
        appState.xp -
        level.minXp;


      percent =
        Math.min(
          100,
          Math.max(
            0,
            earned /
            levelRange *
            100
          )
        );

    }


    xpBar.style.width =
      `${percent}%`;

  }

}


/* =========================================================
   53. PROGRESS
   ========================================================= */

function updateLearningProgress(
  mission
) {

  if (
    mission ===
    "story"
  ) {

    appState.progress.reading =
      Math.min(
        100,
        appState.progress.reading +
        10
      );

  }


  if (
    mission ===
      "vocabulary" ||
    mission ===
      "sentence-builder" ||
    mission ===
      "sentence-recall"
  ) {

    appState.progress.vocabulary =
      Math.min(
        100,
        appState.progress.vocabulary +
        5
      );

  }


  if (
    mission ===
      "creative-studio" ||
    mission ===
      "ai-feedback"
  ) {

    appState.progress.writing =
      Math.min(
        100,
        appState.progress.writing +
        10
      );

  }

}


function updateProgressUI() {

  setProgress(
    "reading",
    appState.progress.reading
  );


  setProgress(
    "vocab",
    appState.progress.vocabulary
  );


  setProgress(
    "writing",
    appState.progress.writing
  );

}


function setProgress(
  prefix,
  value
) {

  safeText(
    byId(
      `${prefix}ProgressText`
    ),
    `${value}%`
  );


  const bar =
    byId(
      `${prefix}ProgressBar`
    );


  if (bar) {

    bar.style.width =
      `${value}%`;

  }

}


/* =========================================================
   54. BADGES
   ========================================================= */

function updateBadgeUI() {

  if (
    appState.storiesCompleted >=
      5 &&
    !appState.badges.includes(
      "reader"
    )
  ) {

    appState.badges.push(
      "reader"
    );

  }


  if (
    appState.completedMissions.includes(
      "creative-studio"
    ) &&
    !appState.badges.includes(
      "writer"
    )
  ) {

    appState.badges.push(
      "writer"
    );

  }


  saveState();


  const cards =
    $$(".badge-card");


  if (
    cards[0]
  ) {

    cards[0].classList.remove(
      "locked"
    );

  }


  if (
    cards[1]
  ) {

    cards[1].classList.toggle(
      "locked",
      !appState.badges.includes(
        "reader"
      )
    );


    cards[1].classList.toggle(
      "unlocked",
      appState.badges.includes(
        "reader"
      )
    );

  }


  if (
    cards[2]
  ) {

    cards[2].classList.toggle(
      "locked",
      !appState.badges.includes(
        "writer"
      )
    );


    cards[2].classList.toggle(
      "unlocked",
      appState.badges.includes(
        "writer"
      )
    );

  }

}


/* =========================================================
   55. AVATAR.JS INTEGRATION
   ========================================================= */

function initializeAvatar() {

  const container =
    byId(
      "avatarContainer"
    );


  if (!container) {
    return;
  }


  try {

    if (
      typeof renderAvatar ===
      "function"
    ) {

      renderAvatar(
        container,
        appState
      );

      return;

    }


    if (
      typeof window.renderAvatar ===
      "function"
    ) {

      window.renderAvatar(
        container,
        appState
      );

      return;

    }


    if (
      typeof initAvatar ===
      "function"
    ) {

      initAvatar();

      return;

    }

  } catch (error) {

    console.warn(
      "Avatar integration:",
      error
    );

  }


  const level =
    getCurrentLevel();


  container.innerHTML = `

    <div style="
      text-align:center;
      padding:20px;
    ">

      <div style="
        font-size:90px;
        margin-bottom:12px;
      ">
        🧒
      </div>


      <strong style="
        font-size:20px;
      ">
        ${escapeHtml(
          level.name
        )}
      </strong>


      <p style="
        color:#65727a;
      ">
        Level ${level.level}
        ·
        ${appState.xp} XP
      </p>

    </div>

  `;

}


/* =========================================================
   56. CREATE QUICK TOOLS
   ========================================================= */

function bindQuickTools() {

  $$("[data-tool]").forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          const tool =
            button.dataset.tool;


          if (
            tool ===
            "idea"
          ) {

            openMentorPanel();


            const input =
              byId(
                "mentorInput"
              );


            if (input) {

              input.value =
                "Beri saya petunjuk idea untuk karangan Tahun 3.";

            }

          }


          if (
            tool ===
            "vocabulary"
          ) {

            openModule(
              "vocabulary"
            );

          }


          if (
            tool ===
            "sentence"
          ) {

            openModule(
              "sentence-builder"
            );

          }

        }
      );

    }
  );

}


/* =========================================================
   57. MODAL
   ========================================================= */

function bindModal() {

  const close =
    byId(
      "modalCloseButton"
    );


  const backdrop =
    $(
      ".modal-backdrop"
    );


  if (close) {

    close.addEventListener(
      "click",
      closeModal
    );

  }


  if (backdrop) {

    backdrop.addEventListener(
      "click",
      closeModal
    );

  }

}


function openModal(
  html
) {

  const modal =
    byId(
      "appModal"
    );


  const content =
    byId(
      "modalContent"
    );


  if (
    !modal ||
    !content
  ) {

    return;

  }


  content.innerHTML =
    html;


  modal.hidden =
    false;

}


function closeModal() {

  const modal =
    byId(
      "appModal"
    );


  if (modal) {

    modal.hidden =
      true;

  }

}


/* =========================================================
   58. TOAST
   ========================================================= */

let toastTimer =
  null;


function showToast(
  message
) {

  const toast =
    byId(
      "toast"
    );


  const text =
    byId(
      "toastMessage"
    );


  if (
    !toast ||
    !text
  ) {

    return;

  }


  clearTimeout(
    toastTimer
  );


  text.textContent =
    message;


  toast.hidden =
    false;


  toast.classList.add(
    "reward-pop"
  );


  toastTimer =
    setTimeout(
      () => {

        toast.hidden =
          true;


        toast.classList.remove(
          "reward-pop"
        );

      },
      2400
    );

}


/* =========================================================
   59. UTILITY
   ========================================================= */

function shuffleArray(
  array
) {

  const copy = [
    ...array
  ];


  for (
    let i =
      copy.length - 1;
    i > 0;
    i--
  ) {

    const j =
      Math.floor(
        Math.random() *
        (i + 1)
      );


    [
      copy[i],
      copy[j]
    ] = [
      copy[j],
      copy[i]
    ];

  }


  return copy;

}


function escapeHtml(
  value
) {

  return String(
    value
  )
    .replace(
      /&/g,
      "&amp;"
    )
    .replace(
      /</g,
      "&lt;"
    )
    .replace(
      />/g,
      "&gt;"
    )
    .replace(
      /"/g,
      "&quot;"
    )
    .replace(
      /'/g,
      "&#039;"
    );

}


function escapeAttribute(
  value
) {

  return escapeHtml(
    value
  );

}


/* =========================================================
   60. DEBUG / DEVELOPMENT HELPERS
   ========================================================= */

window.KaranganAI = {

  getState() {

    return structuredCloneSafe(
      appState
    );

  },


  reset() {

    localStorage.removeItem(
      APP_CONFIG.storageKey
    );


    location.reload();

  },


  addXP(
    amount = 10
  ) {

    window.addXP(
      amount
    );

  },


  openModule,


  showScreen,


  completeMission,


  getVocabularyWords,


  getVocabularyStats

};


/* =========================================================
   END KARANGAN AI APP CONTROLLER
   ========================================================= */
