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

function renderSentenceBuilder() {

  const words = [
    "Aiman",
    "membantu",
    "ibunya",
    "di",
    "rumah"
  ];


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
      ">
        Tekan perkataan mengikut susunan yang betul.
      </p>


      <div
        id="sentenceAnswerArea"
        style="
          min-height:80px;
          margin:24px 0 16px;
          padding:16px;
          border:2px dashed #d9d4cc;
          border-radius:18px;
          background:white;
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          align-items:center;
        "
      >

        <span style="
          color:#9ba4a9;
        ">
          Ayat kamu akan muncul di sini...
        </span>

      </div>


      <div
        id="sentenceWordBank"
        style="
          display:flex;
          flex-wrap:wrap;
          gap:10px;
          margin-bottom:24px;
        "
      >

        ${
          shuffleArray(
            words
          )
            .map(
              word => `
                <button
                  class="secondary-button sentence-choice"
                  data-sentence-word="${escapeAttribute(
                    word
                  )}"
                  type="button"
                >
                  ${escapeHtml(
                    word
                  )}
                </button>
              `
            )
            .join("")
        }

      </div>


      <button
        id="checkSentenceButton"
        class="primary-button"
        type="button"
      >
        Semak Ayat
      </button>

    `,
    42
  );


  setTimeout(
    initializeSentenceBuilder,
    0
  );

}


/* =========================================================
   40. INITIALIZE SENTENCE BUILDER
   ========================================================= */

function initializeSentenceBuilder() {

  const selected =
    [];


  const answer =
    byId(
      "sentenceAnswerArea"
    );


  const renderAnswer =
    () => {

      if (!answer) {
        return;
      }


      if (
        !selected.length
      ) {

        answer.innerHTML = `
          <span style="
            color:#9ba4a9;
          ">
            Ayat kamu akan muncul di sini...
          </span>
        `;

        return;

      }


      answer.innerHTML =
        selected
          .map(
            word => `
              <span style="
                padding:8px 10px;
                background:#eaf3ff;
                border-radius:10px;
                font-weight:750;
              ">
                ${escapeHtml(
                  word
                )}
              </span>
            `
          )
          .join("");

    };


  $$(
    "[data-sentence-word]"
  ).forEach(
    button => {

      button.addEventListener(
        "click",
        () => {

          selected.push(
            button.dataset.sentenceWord
          );


          button.disabled =
            true;


          button.style.opacity =
            "0.4";


          renderAnswer();

        }
      );

    }
  );


  const check =
    byId(
      "checkSentenceButton"
    );


  if (check) {

    check.addEventListener(
      "click",
      () => {

        const response =
          selected.join(
            " "
          );


        if (
          response ===
          "Aiman membantu ibunya di rumah"
        ) {

          showToast(
            "🎉 Betul! Ayat yang sangat baik."
          );


          completeMission(
            "sentence-builder"
          );


          setTimeout(
            () =>
              openModule(
                "grammar-rain"
              ),
            700
          );

        } else {

          showToast(
            "💡 Cuba lagi. Mulakan dengan Aiman."
          );


          setTimeout(
            () =>
              renderSentenceBuilder(),
            700
          );

        }

      }
    );

  }

}


/* =========================================================
   41. GRAMMAR RAIN
   ========================================================= */

function renderGrammarRain() {

  openModuleScreen(
    `

      <span class="section-kicker">
        LANGKAH 4
      </span>

      <h1>
        🌧️ Grammar Rain
      </h1>

      <p style="
        color:#65727a;
        line-height:1.7;
      ">
        Pilih perkataan yang paling sesuai.
      </p>


      <div style="
        margin:26px 0;
        padding:24px;
        border-radius:22px;
        background:#eeecff;
      ">

        <strong style="
          font-size:20px;
        ">
          Aiman _____ ibunya membersihkan rumah.
        </strong>

      </div>


      <div style="
        display:grid;
        gap:12px;
      ">

        <button
          class="secondary-button grammar-answer"
          data-answer="membantu"
          type="button"
        >
          membantu
        </button>

        <button
          class="secondary-button grammar-answer"
          data-answer="membaca"
          type="button"
        >
          membaca
        </button>

        <button
          class="secondary-button grammar-answer"
          data-answer="tidur"
          type="button"
        >
          tidur
        </button>

      </div>

    `,
    57
  );


  setTimeout(
    () => {

      $$(
        ".grammar-answer"
      ).forEach(
        button => {

          button.addEventListener(
            "click",
            () => {

              if (
                button.dataset.answer ===
                "membantu"
              ) {

                showToast(
                  "🌟 Betul! Aiman membantu ibunya."
                );


                completeMission(
                  "grammar-rain"
                );


                setTimeout(
                  () =>
                    openModule(
                      "sentence-recall"
                    ),
                  650
                );

              } else {

                showToast(
                  "💡 Belum tepat. Cuba lagi."
                );

              }

            }
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

function renderSentenceRecall() {

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
        Tadi kita membaca satu ayat tentang Aiman.
        Cuba tulis semula apa yang kamu ingat.
      </p>


      <div style="
        padding:18px;
        border-radius:18px;
        background:#fff7d5;
        margin:22px 0;
      ">

        💡 Petunjuk:

        <strong>
          Aiman + membantu + ibu
        </strong>

      </div>


      <textarea
        id="recallInput"
        class="karangan-textarea"
        style="
          min-height:150px;
          border:1px solid #ece8e1;
          border-radius:18px;
          margin-bottom:16px;
        "
        placeholder="Tulis ayat kamu..."
      ></textarea>


      <button
        id="checkRecallButton"
        class="primary-button"
        type="button"
      >
        Semak
      </button>

    `,
    71
  );


  setTimeout(
    () => {

      const button =
        byId(
          "checkRecallButton"
        );


      if (!button) {
        return;
      }


      button.addEventListener(
        "click",
        () => {

          const value =
            byId(
              "recallInput"
            )
              ?.value
              .trim()
              .toLowerCase() ||
            "";


          if (
            value.includes(
              "aiman"
            ) &&
            value.includes(
              "membantu"
            )
          ) {

            showToast(
              "🧠 Bagus! Kamu berjaya mengingat ayat."
            );


            completeMission(
              "sentence-recall"
            );


            setTimeout(
              () => {

                showScreen(
                  "create"
                );


                focusWriting();

              },
              650
            );

          } else {

            showToast(
              "💡 Cuba gunakan perkataan Aiman dan membantu."
            );

          }

        }
      );

    },
    0
  );

}


/* =========================================================
   43. WRITING
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
      updateWordCount
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

}


function focusWriting() {

  setTimeout(
    () => {

      byId(
        "karanganInput"
      )?.focus();

    },
    300
  );

}


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


  saveState();


  showToast(
    "💾 Karangan sudah disimpan."
  );


  if (
    textarea.value
      .trim()
      .length >=
    20
  ) {

    completeMission(
      "creative-studio"
    );

  }

}


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

}


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


  const text =
    textarea.value.trim();


  const count =
    text
      ? text
          .split(/\s+/)
          .filter(Boolean)
          .length
      : 0;


  counter.textContent =
    count;

}


/* =========================================================
   44. AI WRITING FEEDBACK
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


  if (
    writing.length <
    10
  ) {

    if (panel) {

      panel.hidden =
        false;

    }


    if (content) {

      content.innerHTML = `
        <p>
          💡 Tulis sekurang-kurangnya satu atau dua ayat dahulu.
          Selepas itu Cikgu Aira boleh membantu kamu memperbaikinya.
        </p>
      `;

    }


    focusWriting();

    return;

  }


  appState.savedWriting =
    writing;


  saveState();


  if (panel) {

    panel.hidden =
      false;

  }


  if (content) {

    content.innerHTML = `
      <p>
        ✨ Cikgu Aira sedang membaca karangan kamu...
      </p>
    `;

  }


  try {

    const result =
      await callAI({

        type:
          "writing-feedback",

        text:
          writing,

        level:
          "Year 3",

        language:
          "Bahasa Melayu"

      });


    const answer =
      extractAIText(
        result
      );


    if (content) {

      content.innerHTML =
        formatAIResponse(
          answer ||
          getFallbackWritingFeedback(
            writing
          )
        );

    }


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


    if (content) {

      content.innerHTML =
        formatAIResponse(
          getFallbackWritingFeedback(
            writing
          )
        );

    }


    completeMission(
      "creative-studio"
    );

  }

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
