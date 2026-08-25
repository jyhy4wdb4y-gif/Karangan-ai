/* =========================================================
   KARANGAN AI
   MASTER APP CONTROLLER
   Stable Integrated Build
   Version 3.0
   ========================================================= */

"use strict";


/* =========================================================
   1. CONFIG
   ========================================================= */

const APP_CONFIG = {
  version: "3.0",
  storageKey: "karanganAI_v3_state",

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
  xp: 120,
  streak: 3,

  completedMissions: [],

  storiesCompleted: 0,

  savedWriting: "",

  progress: {
    reading: 20,
    vocabulary: 10,
    writing: 5
  },

  badges: [
    "first-step"
  ],

  currentStoryId: null,

  lastScreen: "home",

  lastVisitDate: null
};


let appState = loadState();

let currentScreen = "home";
let previousScreen = "home";

let currentStory = null;

let currentTranslationWord = "";
let currentTranslationData = null;


/* =========================================================
   3. GAME STATES
   ========================================================= */

let vocabularyReviewState = {
  words: [],
  index: 0,
  answered: false,
  year: 3,
  active: false
};

let vocabularyRewardState = {
  combo: 0
};

function showVocabularyReward(type, message, xp=0) {
  if (xp > 0) {
    if (window.KaranganAI?.addXP) {
      window.KaranganAI.addXP(xp);
    } else {
      appState.xp += Number(xp) || 0;
      saveState();
      updateAllUI();
    }
  }
  document.getElementById("vocab-reward-overlay")?.remove();
  const good = type === "good";
  let rewardImage = "smart-bagus.png";

  if (!good) {
    rewardImage = "smart-encourage.png";
  } else if (message.includes("Ulang Kaji Selesai")) {
    rewardImage = "smart-review-complete.png";
  } else if (message.includes("Super Memory") || vocabularyRewardState.combo >= 5) {
    rewardImage = "smart-super-memory.png";
  } else if (xp >= 5) {
    rewardImage = "smart-hebat.png";
  }

  const overlay = document.createElement("div");
  overlay.id = "vocab-reward-overlay";
  const particles = good
    ? ["✦","★","⚡","✧","★","✦","⚡","✧"]
    : ["✦","💪","✧","⚡","✦","★"];

  overlay.innerHTML = `<div class="vocab-reward-pop ${good?"is-good":"is-encourage"}">
    <div class="smart-energy-ring"></div>
    <div class="smart-particles">${particles.map((p,i)=>`<span style="--i:${i}">${p}</span>`).join("")}</div>
    <img class="vocab-reward-cartoon" src="${rewardImage}" alt="SMART reward" />
    <div class="vocab-reward-title">${message}</div>
    ${xp?`<div class="vocab-reward-xp">+${xp} XP</div>`:""}
    ${good && vocabularyRewardState.combo>=2?`<div class="vocab-reward-combo">🔥 Combo x${vocabularyRewardState.combo}</div>`:""}
  </div>`;
  document.body.appendChild(overlay);
  setTimeout(()=>overlay.classList.add("show"),20);
  setTimeout(()=>overlay.classList.add("hide"),1700);
  setTimeout(()=>overlay.remove(),2000);
}

(function injectVocabularyRewardStyles(){
  if(document.getElementById("vocab-reward-styles")) return;
  const s=document.createElement("style");
  s.id="vocab-reward-styles";
  s.textContent=`
  #vocab-reward-overlay{position:fixed;inset:0;z-index:99999;pointer-events:none;display:flex;align-items:center;justify-content:center;background:rgba(255,248,235,.18)}
  #vocab-reward-overlay.hide{opacity:0;transition:opacity .28s ease}
  .vocab-reward-pop{
    min-width:min(82vw,440px);max-width:88vw;text-align:center;padding:22px 20px;border-radius:28px;
    background:linear-gradient(180deg,#11152d 0%,#171c3a 100%);
    color:#fff;border:1px solid rgba(80,220,255,.28);
    box-shadow:0 18px 60px rgba(10,14,32,.36), inset 0 0 28px rgba(85,91,255,.10);
    transform:scale(.65);opacity:0;
    transition:transform .34s cubic-bezier(.2,1.35,.35,1),opacity .2s
  }
  .show .vocab-reward-pop{transform:scale(1);opacity:1}
  .vocab-reward-cartoon{
    position:relative;z-index:3;display:block;
    width:min(78vw,360px);max-height:44vh;object-fit:contain;margin:0 auto 4px;
    animation:smartFullMotion 3s cubic-bezier(.18,.8,.25,1) both;
    filter:drop-shadow(0 0 18px rgba(66,220,255,.34)) drop-shadow(0 16px 24px rgba(22,25,48,.22));
  }
  .smart-energy-ring{
    position:absolute;z-index:1;left:50%;top:43%;width:240px;height:240px;
    margin:-120px 0 0 -120px;border-radius:50%;
    border:4px solid rgba(60,220,255,.55);
    box-shadow:0 0 18px rgba(60,220,255,.55),inset 0 0 18px rgba(132,86,255,.35);
    animation:smartRing 3s ease-in-out both;
  }
  .smart-particles{position:absolute;inset:0;z-index:4;pointer-events:none;overflow:hidden;border-radius:28px}
  .smart-particles span{
    position:absolute;left:50%;top:46%;font-size:24px;opacity:0;
    animation:smartParticle 2.35s ease-out both;
    animation-delay:calc(var(--i) * .09s);
  }
  .smart-particles span:nth-child(1){--x:-145px;--y:-125px}
  .smart-particles span:nth-child(2){--x:135px;--y:-105px}
  .smart-particles span:nth-child(3){--x:-120px;--y:80px}
  .smart-particles span:nth-child(4){--x:145px;--y:70px}
  .smart-particles span:nth-child(5){--x:-65px;--y:-155px}
  .smart-particles span:nth-child(6){--x:70px;--y:-150px}
  .smart-particles span:nth-child(7){--x:-155px;--y:-15px}
  .smart-particles span:nth-child(8){--x:155px;--y:-5px}
  .vocab-reward-xp{animation:smartXpPop 3s ease both}
  .vocab-reward-combo{animation:smartComboPulse 3s ease both}
  .vocab-reward-title{font-size:22px;font-weight:900;line-height:1.25;margin-top:8px}
  .vocab-reward-xp{display:inline-block;margin-top:12px;padding:8px 16px;border-radius:999px;background:linear-gradient(90deg,#26d4ff,#8a5cff);color:#fff;font-weight:900;box-shadow:0 0 18px rgba(80,180,255,.35)}
  .vocab-reward-combo{margin-top:9px;font-size:18px;font-weight:900}
  .is-encourage{background:linear-gradient(180deg,#26152d 0%,#341a35 100%)}
  @keyframes smartFullMotion{
    0%{transform:translateY(80px) scale(.35) rotate(-10deg);opacity:0}
    16%{transform:translateY(-12px) scale(1.10) rotate(4deg);opacity:1}
    28%{transform:translateY(0) scale(.98) rotate(-2deg)}
    42%{transform:translateY(-14px) scale(1.04) rotate(2deg)}
    56%{transform:translateY(0) scale(1) rotate(-1deg)}
    70%{transform:translateY(-8px) scale(1.03) rotate(1deg)}
    86%{transform:translateY(0) scale(1) rotate(0);opacity:1}
    100%{transform:translateY(-6px) scale(.96);opacity:.92}
  }
  @keyframes smartRing{
    0%{transform:scale(.25) rotate(0);opacity:0}
    20%{transform:scale(1) rotate(90deg);opacity:.85}
    55%{transform:scale(1.18) rotate(220deg);opacity:.55}
    85%{transform:scale(1.32) rotate(340deg);opacity:.25}
    100%{transform:scale(1.45) rotate(420deg);opacity:0}
  }
  @keyframes smartParticle{
    0%{transform:translate(0,0) scale(.2) rotate(0);opacity:0}
    18%{opacity:1}
    60%{transform:translate(var(--x),var(--y)) scale(1.25) rotate(180deg);opacity:1}
    100%{transform:translate(calc(var(--x)*1.18),calc(var(--y)*1.18)) scale(.7) rotate(320deg);opacity:0}
  }
  @keyframes smartXpPop{
    0%,22%{transform:translateY(20px) scale(.4);opacity:0}
    34%{transform:translateY(-5px) scale(1.22);opacity:1}
    46%,86%{transform:translateY(0) scale(1);opacity:1}
    100%{transform:translateY(-6px) scale(.96);opacity:.85}
  }
  @keyframes smartComboPulse{
    0%,35%{transform:scale(.5);opacity:0}
    48%{transform:scale(1.22);opacity:1}
    60%,82%{transform:scale(1);opacity:1}
    90%{transform:scale(1.10)}
    100%{transform:scale(1);opacity:.9}
  }
  `;
  document.head.appendChild(s);
})();



let sentenceBuilderState = {
  task: null,
  wordBank: [],
  selected: [],
  attempts: 0,
  hintLevel: 0
};


let grammarRainState = {
  questions: [],
  index: 0,
  score: 0,
  lives: 3,
  answered: false
};


let sentenceRecallState = {
  sentence: "",
  focusWords: [],
  hintLevel: 0,
  attempts: 0
};


let writingStudioState = {
  ideaIndex: 0,
  sentenceStarterIndex: 0
};


/* =========================================================
   4. DOM HELPERS
   ========================================================= */

function $(selector) {
  return document.querySelector(selector);
}


function $$(selector) {
  return Array.from(
    document.querySelectorAll(selector)
  );
}


function byId(id) {
  return document.getElementById(id);
}


function safeText(element, value) {
  if (element) {
    element.textContent = value;
  }
}


/* =========================================================
   5. STORAGE
   ========================================================= */

function cloneSafe(value) {
  return JSON.parse(
    JSON.stringify(value)
  );
}


function loadState() {
  try {
    /*
      Migrate older v2 storage automatically.
    */

    const newSaved =
      localStorage.getItem(
        APP_CONFIG.storageKey
      );

    const oldSaved =
      localStorage.getItem(
        "karanganAI_v2_state"
      );

    const raw =
      newSaved ||
      oldSaved;


    if (!raw) {
      return cloneSafe(
        DEFAULT_STATE
      );
    }


    const parsed =
      JSON.parse(raw);


    return {
      ...cloneSafe(DEFAULT_STATE),

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

      badges:
        Array.isArray(
          parsed.badges
        )
          ? parsed.badges
          : []
    };

  } catch (error) {
    console.warn(
      "State load failed:",
      error
    );

    return cloneSafe(
      DEFAULT_STATE
    );
  }
}


function saveState() {
  try {
    localStorage.setItem(
      APP_CONFIG.storageKey,
      JSON.stringify(appState)
    );
  } catch (error) {
    console.warn(
      "State save failed:",
      error
    );
  }
}


/* =========================================================
   6. INITIALIZATION
   ========================================================= */

document.addEventListener(
  "DOMContentLoaded",
  initApp
);


function initApp() {
  try {
    updateDailyStreak();

    bindNavigation();
    bindModuleButtons();

    bindStoryControls();
    bindTranslationPopup();

    bindModuleHeader();
    bindWriting();
    bindMentor();
    bindModal();

    bindVocabularyEvents();

    updateAllUI();

    initializeAvatar();

    showScreen(
      appState.lastScreen || "home",
      false
    );

  } catch (error) {
    console.error(
      "Karangan AI initialization error:",
      error
    );

  } finally {
    /*
      Loading screen must NEVER trap the app,
      even when another module has an error.
    */

    setTimeout(
      hideLoadingScreen,
      300
    );
  }
}


/* =========================================================
   7. LOADING
   ========================================================= */

function hideLoadingScreen() {
  const loading =
    byId("loadingScreen");

  if (!loading) {
    return;
  }

  loading.classList.add("hide");

  setTimeout(
    () => {
      loading.style.display =
        "none";
    },
    350
  );
}


/* =========================================================
   8. NAVIGATION
   ========================================================= */

function bindNavigation() {
  $$("[data-nav]").forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          showScreen(
            button.dataset.nav
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
    console.warn(
      `Screen not found: ${screenName}`
    );

    return;
  }


  previousScreen =
    currentScreen;

  currentScreen =
    screenName;


  $$(".screen").forEach(
    screen => {
      screen.hidden = true;

      screen.classList.remove(
        "active-screen"
      );
    }
  );


  target.hidden = false;

  target.classList.add(
    "active-screen"
  );


  const immersive =
    screenName === "story" ||
    screenName === "module";


  const bottomNav =
    byId(
      "bottomNavigation"
    );


  if (bottomNav) {
    bottomNav.style.display =
      immersive
        ? "none"
        : "";
  }


  const mentorButton =
    byId(
      "mentorFloatingButton"
    );


  if (mentorButton) {
    mentorButton.style.display =
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
    ].includes(screenName)
  ) {
    appState.lastScreen =
      screenName;

    saveState();
  }


  if (screenName === "create") {
    initializeWritingStudio();
  }


  if (screenName === "me") {
    initializeAvatar();
  }


  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
}


/* =========================================================
   9. STREAK
   ========================================================= */

function getLocalDateString() {
  const now =
    new Date();

  const year =
    now.getFullYear();

  const month =
    String(
      now.getMonth() + 1
    ).padStart(2, "0");

  const day =
    String(
      now.getDate()
    ).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


function updateDailyStreak() {
  const today =
    getLocalDateString();


  if (!appState.lastVisitDate) {
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
      `${appState.lastVisitDate}T00:00:00`
    );

  const current =
    new Date(
      `${today}T00:00:00`
    );

  const difference =
    Math.round(
      (
        current -
        previous
      ) /
      86400000
    );


  if (difference === 1) {
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
   10. UPDATE ALL UI
   ========================================================= */

function updateAllUI() {
  updateHeader();
  updateMissionUI();
  updateLearnUI();
  updateProfileUI();
  updateWritingUI();
  updateProgressUI();
  updateBadgeUI();
}


function updateHeader() {
  safeText(
    byId("xpCount"),
    appState.xp
  );

  safeText(
    byId("streakCount"),
    appState.streak
  );
}


/* =========================================================
   11. LEVEL SYSTEM
   ========================================================= */

function getCurrentLevel() {
  let current =
    APP_CONFIG.levels[0];


  APP_CONFIG.levels.forEach(
    item => {
      if (
        appState.xp >=
        item.minXp
      ) {
        current = item;
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
      item =>
        item.level ===
        current.level + 1
    ) ||
    null
  );
}


/* =========================================================
   12. MISSION BUTTONS
   ========================================================= */

function bindModuleButtons() {
  $$("[data-module]").forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          openModule(
            button.dataset.module
          );
        }
      );
    }
  );


  byId(
    "startMissionButton"
  )?.addEventListener(
    "click",
    startNextMission
  );


  $$("[data-tool]").forEach(
    button => {
      button.addEventListener(
        "click",
        () => {
          const tool =
            button.dataset.tool;

          if (
            tool === "idea"
          ) {
            openMentorPanel();

          } else if (
            tool === "vocabulary"
          ) {
            openModule(
              "vocabulary"
            );

          } else if (
            tool === "sentence"
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
   13. MISSION ENGINE
   ========================================================= */

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


  openModule(next);
}


function completeMission(
  missionName
) {
  if (
    appState.completedMissions.includes(
      missionName
    )
  ) {
    return false;
  }


  appState.completedMissions.push(
    missionName
  );


  const reward =
    APP_CONFIG.xpRewards[
      missionName
    ] || 10;


  appState.xp += reward;


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


/* =========================================================
   14. HOME MISSION UI
   ========================================================= */

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


  const percent =
    Math.round(
      completed /
      total *
      100
    );


  const bar =
    byId(
      "missionProgressBar"
    );


  if (bar) {
    bar.style.width =
      `${percent}%`;
  }


  $$(".mission-card[data-module]")
    .forEach(
      card => {
        const mission =
          card.dataset.module;

        const done =
          appState.completedMissions.includes(
            mission
          );

        card.classList.toggle(
          "completed",
          done
        );


        const status =
          card.querySelector(
            ".mission-status"
          );


        if (done && status) {
          status.textContent =
            "✓ Selesai";

          status.style.color =
            "#2b9364";
        }
      }
    );
}


/* =========================================================
   15. LEARN SCREEN SYNC
   ========================================================= */

function updateLearnUI() {
  const completed =
    appState.completedMissions;

  const total =
    APP_CONFIG.missionOrder.length;


  safeText(
    byId(
      "learnCompletedCount"
    ),
    completed.length
  );


  const bar =
    byId(
      "learnProgressBar"
    );


  if (bar) {
    bar.style.width =
      `${
        Math.round(
          completed.length /
          total *
          100
        )
      }%`;
  }


  const nextMission =
    APP_CONFIG.missionOrder.find(
      mission =>
        !completed.includes(
          mission
        )
    );


  $$("[data-learn-step]")
    .forEach(
      card => {
        const mission =
          card.dataset.learnStep;

        const status =
          card.querySelector(
            "[data-learn-status]"
          );


        const done =
          completed.includes(
            mission
          );


        if (done) {
          card.style.opacity =
            "1";

          card.style.background =
            "#f2fbf6";

          card.style.borderColor =
            "#bfe7d0";


          if (status) {
            status.textContent =
              "✓ Selesai";

            status.style.color =
              "#2b9364";
          }

          return;
        }


        if (
          mission === nextMission
        ) {
          card.style.opacity =
            "1";

          card.style.background =
            "#fff9ef";

          card.style.borderColor =
            "#f4c67b";


          if (status) {
            status.textContent =
              "Sekarang →";

            status.style.color =
              "#d98222";
          }

          return;
        }


        card.style.opacity =
          ".7";


        if (status) {
          status.textContent =
            "Seterusnya";

          status.style.color =
            "#98a0a5";
        }
      }
    );
}


/* =========================================================
   16. OPEN MODULE
   ========================================================= */

function openModule(
  moduleName
) {
  switch (moduleName) {
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
      showScreen("create");
      focusWriting();
      break;

    case "ai-feedback":
      showScreen("create");
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
   17. GENERIC MODULE SCREEN
   ========================================================= */

function openModuleScreen(
  html,
  progress = 20
) {
  const content =
    byId(
      "moduleContent"
    );


  if (content) {
    content.innerHTML =
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


function bindModuleHeader() {
  byId(
    "moduleBackButton"
  )?.addEventListener(
    "click",
    closeModule
  );


  byId(
    "moduleCloseButton"
  )?.addEventListener(
    "click",
    closeModule
  );


  byId(
    "storyBackButton"
  )?.addEventListener(
    "click",
    closeStory
  );
}


function closeModule() {
  if (
    currentScreen === "module" &&
    vocabularyReviewState?.active
  ) {
    vocabularyReviewState.active = false;
    renderVocabularyModule();
    return;
  }

  showScreen(
    previousScreen === "module"
      ? "learn"
      : previousScreen
  );
}


function closeStory() {
  showScreen(
    previousScreen === "story"
      ? "home"
      : previousScreen
  );
}


/* =========================================================
   18. STORY DATA
   ========================================================= */

function getStoryCollection() {
  if (
    Array.isArray(
      window.stories
    )
  ) {
    return window.stories;
  }


  if (
    window.stories &&
    typeof window.stories ===
      "object"
  ) {
    return Object.values(
      window.stories
    );
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


function getFallbackStory() {
  return {
    id: "story-1",

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


function normalizeStory(story) {
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

    title:
      story.title ||
      story.name ||
      story.judul ||
      "Cerita Bahasa Melayu",

    image:
      story.image ||
      story.imageUrl ||
      story.img ||
      story.cover ||
      "2411F84C-22BF-4BE2-848E-BE95A12D02A9.png",

    paragraphs
  };
}


/* =========================================================
   19. STORY
   ========================================================= */

function bindStoryControls() {
  $$("[data-story-id]")
    .forEach(
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
  const stories =
    getStoryCollection();


  let story = null;


  if (storyId) {
    story =
      stories.find(
        item =>
          String(
            item.id ||
            item.storyId
          ) ===
          String(storyId)
      );
  }


  if (!story) {
    story =
      stories[0] ||
      getFallbackStory();
  }


  currentStory =
    normalizeStory(story);


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


function renderStory(story) {
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


  let html = "";


  if (story.image) {
    html += `
      <img
        src="${escapeAttribute(story.image)}"
        alt="${escapeAttribute(story.title)}"
      />
    `;
  }


  html += `
    <h1>
      ${escapeHtml(story.title)}
    </h1>
  `;


  story.paragraphs.forEach(
    paragraph => {
      html += `
        <p class="interactive-story-paragraph">
          ${makeWordsClickable(paragraph)}
        </p>
      `;
    }
  );


  html += `
    <div style="
      margin-top:30px;
      padding:20px;
      border-radius:20px;
      background:#fff7e7;
      text-align:center;
    ">

      <h3>
        Sudah habis membaca?
      </h3>

      <p>
        Tekan perkataan untuk melihat maksud dan simpan ke Buku Kosa Kata.
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


  byId(
    "finishStoryButton"
  )?.addEventListener(
    "click",
    () => {
      const first =
        completeMission(
          "story"
        );


      if (first) {
        appState.storiesCompleted +=
          1;

        saveState();
      }


      setTimeout(
        () => {
          openModule(
            "vocabulary"
          );
        },
        400
      );
    }
  );
}


function makeWordsClickable(text) {
  return escapeHtml(
    String(text)
  ).replace(
    /([A-Za-zÀ-ÿ'-]+)/g,
    word => {
      if (
        word.length <= 1
      ) {
        return word;
      }


      return `
        <span
          class="story-word"
          data-word="${escapeAttribute(word)}"
        >${word}</span>
      `;
    }
  );
}


/* =========================================================
   20. DICTIONARY
   ========================================================= */

const BASIC_DICTIONARY = {
  pagi: {
    zh: "早上",
    en: "morning"
  },

  cerah: {
    zh: "晴朗",
    en: "bright / clear"
  },

  membantu: {
    zh: "帮助",
    en: "help"
  },

  ibu: {
    zh: "母亲",
    en: "mother"
  },

  rumah: {
    zh: "家 / 房子",
    en: "home / house"
  },

  buku: {
    zh: "书",
    en: "book"
  },

  belajar: {
    zh: "学习",
    en: "study / learn"
  },

  gembira: {
    zh: "开心",
    en: "happy"
  },

  rajin: {
    zh: "勤劳",
    en: "diligent"
  },

  sekolah: {
    zh: "学校",
    en: "school"
  },

  bermain: {
    zh: "玩",
    en: "play"
  },

  kawan: {
    zh: "朋友",
    en: "friend"
  },

  membersihkan: {
    zh: "清理",
    en: "clean"
  },

  menyusun: {
    zh: "整理 / 排列",
    en: "arrange"
  },

  awal: {
    zh: "早",
    en: "early"
  }
};


/* =========================================================
   21. TRANSLATION
   ========================================================= */

/* =========================================================
   21. TRANSLATION
   Vocabulary v2 + AI Fallback
   ========================================================= */

async function translateWord(rawWord) {

  const word =
    String(rawWord || "")
      .toLowerCase()
      .trim()
      .replace(
        /^[^a-zA-ZÀ-ÿ]+|[^a-zA-ZÀ-ÿ'-]+$/g,
        ""
      );


  if (!word) {
    return;
  }


  currentTranslationWord =
    word;


  const storySentence =
    findStorySentenceContainingWord(
      word
    );


  currentTranslationData = {

    word,

    translation: "",

    meaning: "",

    example:
      storySentence,

    storyId:
      currentStory?.id ||
      null

  };


  const popup =
    byId(
      "translationPopup"
    );


  if (popup) {
    popup.hidden = false;
  }


  safeText(
    byId(
      "translationWord"
    ),
    word
  );


  const meaningEl =
    byId(
      "translationMeaning"
    );


  const exampleEl =
    byId(
      "translationExample"
    );


  /* ---------------------------------------------------------
     STEP 1
     Vocabulary v2 Dictionary
     --------------------------------------------------------- */

  const vocabularyEngine =
    getVocabularyEngine();


  let dictionaryResult =
    null;


  if (
    vocabularyEngine &&
    typeof vocabularyEngine.lookupWord ===
      "function"
  ) {

    try {

      dictionaryResult =
        vocabularyEngine.lookupWord(
          word
        );

    } catch (error) {

      console.warn(
        "Vocabulary lookup error:",
        error
      );

    }

  }


  if (dictionaryResult) {

    const translation =
      dictionaryResult.translation ||
      [
        dictionaryResult.zh,
        dictionaryResult.en
      ]
        .filter(Boolean)
        .join(" · ");


    currentTranslationData.translation =
      translation;


    currentTranslationData.meaning =
      dictionaryResult.meaning ||
      translation;


    safeText(
      meaningEl,
      translation
    );


    /*
      Show simple Malay meaning as well,
      if the HTML has translationDefinition.
    */

    safeText(
      byId(
        "translationDefinition"
      ),
      dictionaryResult.meaning ||
      ""
    );


    safeText(
      exampleEl,
      storySentence ||
      `Perkataan: ${word}`
    );


    updateSaveVocabularyButton();


    return;

  }


  /* ---------------------------------------------------------
     STEP 2
     Old app.js BASIC_DICTIONARY fallback

     Keep this for backwards compatibility.
     --------------------------------------------------------- */

  const local =
    typeof BASIC_DICTIONARY !==
      "undefined"
      ? BASIC_DICTIONARY[word]
      : null;


  if (local) {

    const translation =
      [
        local.zh,
        local.en
      ]
        .filter(Boolean)
        .join(" · ");


    currentTranslationData.translation =
      translation;


    currentTranslationData.meaning =
      local.meaning ||
      translation;


    safeText(
      meaningEl,
      translation
    );


    safeText(
      byId(
        "translationDefinition"
      ),
      local.meaning ||
      ""
    );


    safeText(
      exampleEl,
      storySentence ||
      `Perkataan: ${word}`
    );


    updateSaveVocabularyButton();


    return;

  }


  /* ---------------------------------------------------------
     STEP 3
     AI fallback

     Words not inside Vocabulary v2 will be sent
     to /api/ai automatically.
     --------------------------------------------------------- */

  safeText(
    meaningEl,
    "Mencari maksud..."
  );


  safeText(
    byId(
      "translationDefinition"
    ),
    "Cikgu Aira sedang mencari maksud perkataan ini..."
  );


  safeText(
    exampleEl,
    storySentence ||
    `Perkataan: ${word}`
  );


  try {

    const result =
      await callAI({

        type:
          "translate",

        word,

        context:
          storySentence,

        language:
          "Bahasa Melayu",

        targetLanguages: [
          "Chinese",
          "English"
        ],

        instruction:
          "Translate this Bahasa Melayu word into Simplified Chinese and English. Also give one short simple Bahasa Melayu definition suitable for a Year 3 student."

      });


    const answer =
      extractAIText(
        result
      );


    if (answer) {

      currentTranslationData.translation =
        answer;


      currentTranslationData.meaning =
        answer;


      safeText(
        meaningEl,
        answer
      );


      safeText(
        byId(
          "translationDefinition"
        ),
        ""
      );

    } else {

      throw new Error(
        "Empty translation response"
      );

    }


  } catch (error) {

    console.warn(
      "Translation AI fallback failed:",
      error
    );


    currentTranslationData.translation =
      "Maksud belum tersedia";


    currentTranslationData.meaning =
      "Maksud belum tersedia";


    safeText(
      meaningEl,
      "Maksud belum tersedia."
    );


    safeText(
      byId(
        "translationDefinition"
      ),
      "Tanya Cikgu Aira untuk bantuan."
    );

  }


  updateSaveVocabularyButton();

}


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


  return (
    currentStory.paragraphs.find(
      paragraph =>
        String(paragraph)
          .toLowerCase()
          .includes(
            String(word)
              .toLowerCase()
          )
    ) ||
    ""
  );
}


function bindTranslationPopup() {
  byId(
    "translationCloseButton"
  )?.addEventListener(
    "click",
    () => {
      const popup =
        byId(
          "translationPopup"
        );

      if (popup) {
        popup.hidden = true;
      }
    }
  );


  byId(
    "saveVocabularyButton"
  )?.addEventListener(
    "click",
    saveCurrentVocabulary
  );
}


/* =========================================================
   22. VOCABULARY ENGINE
   ========================================================= */

function getVocabularyEngine() {
  return (
    window.KaranganVocabulary ||
    null
  );
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
      console.warn(error);
    }
  }


  return [];
}


function saveCurrentVocabulary() {
  if (
    !currentTranslationWord
  ) {
    return;
  }


  const engine =
    getVocabularyEngine();


  if (
    !engine ||
    typeof engine.saveFromStory !==
      "function"
  ) {
    showToast(
      "Vocabulary engine belum tersedia."
    );

    return;
  }


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

      storyId:
        currentTranslationData
          ?.storyId ||
        null,

      category:
        "Cerita",

      emoji:
        "📖"
    });


  if (result.success) {
    showToast(
      "🧠 Disimpan dalam Buku Kosa Kata!"
    );

  } else {
    showToast(
      "✅ Perkataan ini sudah disimpan."
    );
  }


  updateSaveVocabularyButton();
}


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


  const engine =
    getVocabularyEngine();


  const exists =
    Boolean(
      engine?.hasWord?.(
        currentTranslationWord
      )
    );


  button.textContent =
    exists
      ? "✓ Sudah Disimpan"
      : "🧠 Simpan Perkataan";
}


function bindVocabularyEvents() {
  window.addEventListener(
    "karangan:vocabulary-changed",
    () => {
      updateProgressUI();
    }
  );
}


/* =========================================================
   23. VOCABULARY MODULE
   ========================================================= */

function renderVocabularyModule() {
  vocabularyReviewState.active = false;
  const words =
    getVocabularyWords();


  const cards =
    words.length
      ? words.map(
          item => `
            <div style="
              padding:16px;
              border:1px solid #ece8e1;
              border-radius:18px;
              background:white;
            ">

              <strong style="
                display:block;
                font-size:18px;
              ">
                ${escapeHtml(
                  item.emoji ||
                  "🧠"
                )}
                ${escapeHtml(
                  item.word
                )}
              </strong>

              <div style="
                color:#6b55d9;
                margin-top:5px;
                font-weight:750;
              ">
                ${escapeHtml(
                  item.translation ||
                  ""
                )}
              </div>

              ${
                item.meaning
                  ? `
                    <p style="
                      color:#727c82;
                      line-height:1.55;
                    ">
                      ${escapeHtml(
                        item.meaning
                      )}
                    </p>
                  `
                  : ""
              }

            </div>
          `
        ).join("")
      : `
        <div style="
          padding:24px;
          border-radius:18px;
          background:#fff7e7;
          text-align:center;
        ">
          🧠 Buku Kosa Kata masih kosong.
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
      ">
        Ulang kaji perkataan yang telah kamu pelajari.
      </p>

      <div style="
        display:grid;
        gap:12px;
        margin:22px 0;
      ">
        ${cards}
      </div>

      <button
        id="startVocabularyReviewButton"
        class="primary-button"
        type="button"
        style="width:100%;"
      >
        🎯 Mula Ulang Kaji
      </button>

      <button
        id="finishVocabularyButton"
        class="secondary-button"
        type="button"
        style="
          width:100%;
          margin-top:10px;
        "
      >
        ✓ Selesai Langkah 2
      </button>
    `,
    28
  );


  byId(
    "startVocabularyReviewButton"
  )?.addEventListener(
    "click",
    startVocabularyReview
  );


  byId(
    "finishVocabularyButton"
  )?.addEventListener(
    "click",
    () => {
      completeMission(
        "vocabulary"
      );

      setTimeout(
        renderSentenceBuilder,
        350
      );
    }
  );
}


function startVocabularyReview() {
  const engine =
    getVocabularyEngine();

  const year =
    Number(engine?.getLearningYear?.() || 3);

  let words =
    (
      Array.isArray(l2CurrentDisplayWords) &&
      l2CurrentDisplayYear === year &&
      l2CurrentDisplayWords.length
    )
      ? l2CurrentDisplayWords.slice(0,5)
      : (
          engine?.getReviewWordsForYear?.(5, year) ||
          engine?.getDailyNewWords?.(5, year) ||
          engine?.getReviewWords?.(5) ||
          getVocabularyWords().slice(0,5)
        );

  if (!words.length) {
    showToast(
      `Belum ada kosa kata Tahun ${year} untuk diuji.`
    );

    return;
  }

  vocabularyRewardState.combo = 0;
  vocabularyReviewState = {
    words,
    index: 0,
    answered: false,
    year,
    active: true
  };

  renderVocabularyReviewCard();
}


function renderVocabularyReviewCard() {
  const word =
    vocabularyReviewState.words[
      vocabularyReviewState.index
    ];


  if (!word) {
    completeMission(
      "vocabulary"
    );

    showVocabularyReward("good", "🎉 Ulang Kaji Selesai! Hebat!", 10);
    vocabularyReviewState.active = false;
    setTimeout(renderVocabularyModule, 3000);

    return;
  }


  openModuleScreen(
    `
      <span class="section-kicker">
        ULANG KAJI · TAHUN ${vocabularyReviewState.year || Number(getVocabularyEngine()?.getLearningYear?.() || 3)}
      </span>

      <h1>
        🧠 Ingat Perkataan Ini?
      </h1>

      <p>
        ${
          vocabularyReviewState.index + 1
        }
        /
        ${
          vocabularyReviewState.words.length
        }
      </p>

      <div style="
        padding:34px 20px;
        border-radius:24px;
        background:#f5f0ff;
        text-align:center;
      ">

        <div style="
          font-size:32px;
          font-weight:900;
        ">
          ${escapeHtml(
            word.word
          )}
        </div>

        <div
          id="reviewMeaning"
          hidden
          style="
            margin-top:20px;
            color:#6b55d9;
            font-weight:800;
          "
        >
          ${escapeHtml(
            word.translation ||
            word.meaning ||
            ""
          )}
        </div>

      </div>

      <button
        id="revealReviewButton"
        class="primary-button"
        type="button"
        style="
          width:100%;
          margin-top:20px;
        "
      >
        👀 Lihat Maksud
      </button>

      <div
        id="reviewAnswerButtons"
        hidden
        style="
          grid-template-columns:1fr 1fr;
          gap:10px;
          margin-top:15px;
        "
      >

        <button
          id="reviewWrongButton"
          class="secondary-button"
          type="button"
        >
          🤔 Belum Ingat
        </button>

        <button
          id="reviewCorrectButton"
          class="primary-button"
          type="button"
        >
          😊 Saya Ingat
        </button>

      </div>
    `,
    28
  );


  byId(
    "revealReviewButton"
  )?.addEventListener(
    "click",
    () => {
      const meaning =
        byId(
          "reviewMeaning"
        );

      const answers =
        byId(
          "reviewAnswerButtons"
        );


      if (meaning) {
        meaning.hidden = false;
      }


      if (answers) {
        answers.hidden = false;
        answers.style.display =
          "grid";
      }


      byId(
        "revealReviewButton"
      ).hidden = true;
    }
  );


  byId(
    "reviewCorrectButton"
  )?.addEventListener(
    "click",
    () => {
      submitVocabularyReview(
        word,
        true
      );
    }
  );


  byId(
    "reviewWrongButton"
  )?.addEventListener(
    "click",
    () => {
      submitVocabularyReview(
        word,
        false
      );
    }
  );
}


function submitVocabularyReview(
  word,
  correct
) {
  getVocabularyEngine()
    ?.reviewWord?.(
      word.id,
      correct
    );

  if (correct) {
    vocabularyRewardState.combo += 1;
    const messages = [
      "Hebat! Kamu semakin mahir!",
      "Bagus! Ingatan kamu semakin kuat!",
      "Syabas! Teruskan usaha!",
      "Cemerlang! Kamu berjaya mengingatinya!"
    ];
    showVocabularyReward(
      "good",
      vocabularyRewardState.combo >= 5
        ? "🔥 Super Memory!"
        : messages[(vocabularyRewardState.combo - 1) % messages.length],
      5
    );
  } else {
    vocabularyRewardState.combo = 0;
    const messages = [
      "Tak apa, cuba lagi!",
      "Jangan berputus asa — kamu hampir berjaya!",
      "Kita ulang sekali lagi. Kamu boleh!",
      "Usaha lagi sedikit. Teruskan!"
    ];
    showVocabularyReward(
      "encourage",
      messages[Math.floor(Math.random() * messages.length)],
      0
    );
  }

  vocabularyReviewState.index += 1;

  setTimeout(
    renderVocabularyReviewCard,
    1050
  );
}


/* =========================================================
   24. SENTENCE BUILDER
   ========================================================= */

const SENTENCE_TASKS = [
  {
    sentence:
      "Siti membantu ibunya di dapur",
    focusWord:
      "membantu",
    translation:
      "帮助 · help"
  },

  {
    sentence:
      "Aina berasa gembira hari ini",
    focusWord:
      "gembira",
    translation:
      "开心 · happy"
  },

  {
    sentence:
      "Amir seorang murid yang rajin belajar",
    focusWord:
      "rajin",
    translation:
      "勤劳 · diligent"
  },

  {
    sentence:
      "Kita perlu menjaga kebersihan sekolah",
    focusWord:
      "menjaga",
    translation:
      "照顾 / 保护 · take care"
  }
];


function createSentenceTask() {
  const vocabulary =
    getVocabularyWords();


  const usable =
    vocabulary.filter(
      item => {
        const example =
          cleanSentence(
            item.example
          );

        const count =
          example
            .split(/\s+/)
            .filter(Boolean)
            .length;

        return (
          count >= 4 &&
          count <= 10
        );
      }
    );


  if (usable.length) {
    const item =
      shuffleArray(
        usable
      )[0];


    return {
      sentence:
        cleanSentence(
          item.example
        ),

      focusWord:
        item.word,

      translation:
        item.translation ||
        ""
    };
  }


  return shuffleArray(
    SENTENCE_TASKS
  )[0];
}


function renderSentenceBuilder() {
  sentenceBuilderState = {
    task:
      createSentenceTask(),

    wordBank: [],

    selected: [],

    attempts: 0,

    hintLevel: 0
  };


  const words =
    sentenceBuilderState.task
      .sentence
      .split(/\s+/);


  sentenceBuilderState.wordBank =
    shuffleArray(
      words.map(
        (word, id) => ({
          id,
          word
        })
      )
    );


  renderSentenceBuilderScreen();
}


function renderSentenceBuilderScreen() {
  const task =
    sentenceBuilderState.task;


  const correctWords =
    task.sentence
      .split(/\s+/);


  const selectedSet =
    new Set(
      sentenceBuilderState.selected
    );


  const selectedHTML =
    sentenceBuilderState.selected.length
      ? sentenceBuilderState.selected
          .map(
            (
              id,
              position
            ) => `
              <button
                type="button"
                data-remove-position="${position}"
                style="
                  border:0;
                  background:#eaf3ff;
                  border-radius:12px;
                  padding:10px 12px;
                  font-weight:800;
                "
              >
                ${escapeHtml(
                  correctWords[id]
                )}
              </button>
            `
          )
          .join("")
      : `
        <span style="color:#9ba4a9;">
          Ayat kamu akan muncul di sini...
        </span>
      `;


  const wordBank =
    sentenceBuilderState.wordBank
      .map(
        token => `
          <button
            type="button"
            class="secondary-button"
            data-sentence-token="${token.id}"
            ${
              selectedSet.has(
                token.id
              )
                ? "disabled"
                : ""
            }
            style="
              ${
                selectedSet.has(
                  token.id
                )
                  ? "opacity:.35;"
                  : ""
              }
            "
          >
            ${escapeHtml(token.word)}
          </button>
        `
      )
      .join("");


  let hint = "";


  if (
    sentenceBuilderState.hintLevel === 1
  ) {
    hint =
      `Ayat bermula dengan "${correctWords[0]}".`;

  } else if (
    sentenceBuilderState.hintLevel >= 2
  ) {
    hint =
      `Dua perkataan pertama ialah "${correctWords
        .slice(0, 2)
        .join(" ")}".`;
  }


  openModuleScreen(
    `
      <span class="section-kicker">
        LANGKAH 3
      </span>

      <h1>
        🧩 Bina Ayat
      </h1>

      <p>
        Susun perkataan menjadi ayat yang betul.
      </p>

      <div style="
        padding:16px;
        border-radius:18px;
        background:#fff5df;
        margin:18px 0;
      ">

        <small>
          PERKATAAN FOKUS
        </small>

        <strong style="
          display:block;
          font-size:20px;
          margin-top:5px;
        ">
          🧠 ${escapeHtml(
            task.focusWord
          )}
        </strong>

        <span style="
          color:#6b55d9;
        ">
          ${escapeHtml(
            task.translation
          )}
        </span>

      </div>

      ${
        hint
          ? `
            <div style="
              padding:13px;
              background:#f2efff;
              border-radius:14px;
              margin-bottom:15px;
            ">
              💡 ${escapeHtml(hint)}
            </div>
          `
          : ""
      }

      <div style="
        min-height:90px;
        border:2px dashed #ddd6cf;
        border-radius:18px;
        padding:15px;
        display:flex;
        flex-wrap:wrap;
        gap:8px;
        align-items:center;
      ">
        ${selectedHTML}
      </div>

      <div style="
        display:grid;
        grid-template-columns:repeat(3,1fr);
        gap:8px;
        margin:14px 0;
      ">

        <button
          id="undoSentenceButton"
          class="secondary-button"
          type="button"
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
          id="hintSentenceButton"
          class="secondary-button"
          type="button"
        >
          💡 Petunjuk
        </button>

      </div>

      <div style="
        display:flex;
        flex-wrap:wrap;
        gap:10px;
        padding:16px;
        background:#faf9f7;
        border-radius:18px;
        margin-bottom:18px;
      ">
        ${wordBank}
      </div>

      <button
        id="checkSentenceButton"
        class="primary-button"
        type="button"
        style="width:100%;"
      >
        ✓ Semak Ayat
      </button>

      <button
        id="newSentenceButton"
        type="button"
        style="
          border:0;
          background:transparent;
          width:100%;
          padding:13px;
        "
      >
        🎲 Cuba Ayat Lain
      </button>
    `,
    42
  );


  $$("[data-sentence-token]")
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
            sentenceBuilderState
              .selected
              .push(
                Number(
                  button.dataset
                    .sentenceToken
                )
              );


            renderSentenceBuilderScreen();
          }
        );
      }
    );


  $$("[data-remove-position]")
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
            sentenceBuilderState
              .selected
              .splice(
                Number(
                  button.dataset
                    .removePosition
                ),
                1
              );


            renderSentenceBuilderScreen();
          }
        );
      }
    );


  byId(
    "undoSentenceButton"
  )?.addEventListener(
    "click",
    () => {
      sentenceBuilderState
        .selected
        .pop();

      renderSentenceBuilderScreen();
    }
  );


  byId(
    "resetSentenceButton"
  )?.addEventListener(
    "click",
    () => {
      sentenceBuilderState.selected =
        [];

      renderSentenceBuilderScreen();
    }
  );


  byId(
    "hintSentenceButton"
  )?.addEventListener(
    "click",
    () => {
      sentenceBuilderState.hintLevel +=
        1;

      renderSentenceBuilderScreen();
    }
  );


  byId(
    "checkSentenceButton"
  )?.addEventListener(
    "click",
    checkSentenceAnswer
  );


  byId(
    "newSentenceButton"
  )?.addEventListener(
    "click",
    renderSentenceBuilder
  );
}


function checkSentenceAnswer() {
  const task =
    sentenceBuilderState.task;

  const words =
    task.sentence.split(/\s+/);


  if (
    sentenceBuilderState
      .selected.length !==
    words.length
  ) {
    showToast(
      "🧩 Susun semua perkataan dahulu."
    );

    return;
  }


  sentenceBuilderState.attempts +=
    1;


  const answer =
    sentenceBuilderState.selected
      .map(
        id =>
          words[id]
      )
      .join(" ");


  if (
    normalizeText(answer) ===
    normalizeText(
      task.sentence
    )
  ) {
    completeMission(
      "sentence-builder"
    );


    openModuleScreen(
      `
        <div style="
          text-align:center;
          padding:30px 0;
        ">

          <div style="font-size:70px;">
            🎉
          </div>

          <h1>
            Ayat Betul!
          </h1>

          <div style="
            padding:18px;
            border-radius:18px;
            background:#eef9f3;
            margin:20px 0;
            font-weight:850;
          ">
            ${escapeHtml(
              task.sentence
            )}.
          </div>

          <button
            id="continueGrammarButton"
            class="primary-button"
            type="button"
            style="width:100%;"
          >
            Teruskan ke Grammar Rain →
          </button>

        </div>
      `,
      42
    );


    byId(
      "continueGrammarButton"
    )?.addEventListener(
      "click",
      renderGrammarRain
    );


  } else {
    showToast(
      "💡 Hampir! Cuba semak susunan."
    );
  }
}


/* =========================================================
   25. GRAMMAR RAIN
   ========================================================= */

function createGrammarQuestions() {
  return shuffleArray([
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
        "Rajin ialah sikap tekun dan bersungguh-sungguh."
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
        "Menjaga bermaksud memelihara sesuatu."
    },

    {
      sentence:
        "Aina berasa _____ kerana mendapat hadiah.",
      answer:
        "gembira",
      options: [
        "gembira",
        "marah",
        "takut"
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
        "kasut",
        "pinggan"
      ],
      explanation:
        "Buku ialah bahan yang dibaca."
    }
  ]).slice(0, 5);
}


function renderGrammarRain() {
  grammarRainState = {
    questions:
      createGrammarQuestions(),

    index: 0,

    score: 0,

    lives: 3,

    answered: false
  };


  renderGrammarRound();
}


function renderGrammarRound() {
  const question =
    grammarRainState.questions[
      grammarRainState.index
    ];


  if (
    !question ||
    grammarRainState.lives <= 0
  ) {
    renderGrammarResult();

    return;
  }


  const hearts =
    Array.from(
      { length: 3 },
      (_, i) =>
        i <
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
        margin:15px 0;
      ">

        <div
          id="grammarRainScoreBadge"
          style="
            background:#fff4dd;
            border-radius:999px;
            padding:8px 12px;
            font-weight:900;
          "
        >
          ⭐ ${grammarRainState.score} mata
        </div>

        <div>
          ${hearts}
        </div>

      </div>

      <p>
        Soalan ${
          grammarRainState.index + 1
        } daripada ${
          grammarRainState.questions.length
        }
      </p>

      <div style="
        padding:26px 20px;
        border-radius:24px;
        background:#eeeaff;
        text-align:center;
        margin:20px 0;
      ">

        <div style="font-size:44px;">
          ☁️
        </div>

        <strong style="
          font-size:21px;
          line-height:1.55;
        ">
          ${escapeHtml(
            question.sentence
          )}
        </strong>

      </div>

      <div
        id="grammarOptions"
        style="
          display:grid;
          gap:10px;
        "
      >
        ${
          shuffleArray(
            question.options
          )
            .map(
              option => `
                <button
                  class="secondary-button grammar-answer"
                  type="button"
                  data-grammar-answer="${escapeAttribute(
                    option
                  )}"
                >
                  ${escapeHtml(option)}
                </button>
              `
            )
            .join("")
        }
      </div>
    `,
    57
  );


  $$(".grammar-answer")
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
            submitGrammarAnswer(
              button.dataset
                .grammarAnswer,
              button
            );
          }
        );
      }
    );
}


function submitGrammarAnswer(
  selected,
  button
) {
  if (
    grammarRainState.answered
  ) {
    return;
  }


  grammarRainState.answered =
    true;


  const question =
    grammarRainState.questions[
      grammarRainState.index
    ];


  const correct =
    selected.toLowerCase() ===
    question.answer.toLowerCase();


  if (correct) {
    grammarRainState.score +=
      20;


    updateGrammarScoreBadge();


    button.style.background =
      "#e8f8ef";

    button.style.color =
      "#237c52";


  } else {
    grammarRainState.lives -=
      1;


    button.style.background =
      "#fff0f0";

    button.style.color =
      "#b94d4d";
  }


  const options =
    byId(
      "grammarOptions"
    );


  const panel =
    document.createElement(
      "div"
    );


  panel.style.cssText = `
    padding:16px;
    margin-top:12px;
    border-radius:16px;
    background:#fff7e7;
    line-height:1.6;
  `;


  panel.innerHTML = `
    <strong>
      ${
        correct
          ? "✅ Betul!"
          : `💡 Jawapan: ${escapeHtml(
              question.answer
            )}`
      }
    </strong>

    <p>
      ${escapeHtml(
        question.explanation
      )}
    </p>

    <button
      id="nextGrammarButton"
      class="primary-button"
      type="button"
      style="width:100%;"
    >
      Soalan Seterusnya →
    </button>
  `;


  options?.appendChild(
    panel
  );


  byId(
    "nextGrammarButton"
  )?.addEventListener(
    "click",
    () => {
      grammarRainState.index +=
        1;

      grammarRainState.answered =
        false;

      renderGrammarRound();
    }
  );
}


function updateGrammarScoreBadge() {
  safeText(
    byId(
      "grammarRainScoreBadge"
    ),
    `⭐ ${grammarRainState.score} mata`
  );
}


function renderGrammarResult() {
  const percentage =
    Math.round(
      grammarRainState.score /
      (
        grammarRainState
          .questions.length *
        20
      ) *
      100
    );


  const passed =
    percentage >= 60;


  if (passed) {
    completeMission(
      "grammar-rain"
    );
  }


  openModuleScreen(
    `
      <div style="
        text-align:center;
        padding:25px 0;
      ">

        <div style="font-size:70px;">
          ${passed ? "🏆" : "💪"}
        </div>

        <h1>
          ${
            passed
              ? "Hebat!"
              : "Cuba Lagi!"
          }
        </h1>

        <div style="
          padding:18px;
          background:#fff6e5;
          border-radius:18px;
          margin:20px 0;
        ">
          ⭐ ${grammarRainState.score} mata
          ·
          ${percentage}%
        </div>

        ${
          passed
            ? `
              <button
                id="continueRecallButton"
                class="primary-button"
                type="button"
                style="width:100%;"
              >
                Teruskan ke Ingat Ayat →
              </button>
            `
            : ""
        }

        <button
          id="retryGrammarButton"
          class="secondary-button"
          type="button"
          style="
            width:100%;
            margin-top:10px;
          "
        >
          🌧️ Main Lagi
        </button>

      </div>
    `,
    57
  );


  byId(
    "continueRecallButton"
  )?.addEventListener(
    "click",
    renderSentenceRecall
  );


  byId(
    "retryGrammarButton"
  )?.addEventListener(
    "click",
    renderGrammarRain
  );
}


/* =========================================================
   26. SENTENCE RECALL
   ========================================================= */

function getRecallSentence() {
  if (
    sentenceBuilderState
      ?.task?.sentence
  ) {
    return sentenceBuilderState
      .task
      .sentence;
  }


  return "Aiman membantu ibunya di rumah";
}


function renderSentenceRecall() {
  const sentence =
    getRecallSentence();


  sentenceRecallState = {
    sentence,
    focusWords:
      sentence
        .split(/\s+/)
        .filter(
          word =>
            word.length > 3
        )
        .slice(0, 3),

    hintLevel: 0,

    attempts: 0
  };


  renderRecallPreview();
}


function renderRecallPreview() {
  openModuleScreen(
    `
      <span class="section-kicker">
        LANGKAH 5
      </span>

      <h1>
        💭 Ingat Ayat
      </h1>

      <p>
        Baca dan ingat ayat ini.
      </p>

      <div style="
        padding:28px 20px;
        border-radius:22px;
        background:#fff7dd;
        text-align:center;
        margin:20px 0;
        font-size:20px;
        font-weight:850;
        line-height:1.6;
      ">
        “${escapeHtml(
          sentenceRecallState
            .sentence
        )}.”
      </div>

      <button
        id="startRecallButton"
        class="primary-button"
        type="button"
        style="width:100%;"
      >
        🙈 Saya Sudah Ingat
      </button>
    `,
    71
  );


  byId(
    "startRecallButton"
  )?.addEventListener(
    "click",
    renderRecallInput
  );
}


function renderRecallInput() {
  const hint =
    sentenceRecallState.hintLevel > 0
      ? `Kata kunci: ${
          sentenceRecallState
            .focusWords
            .join(" · ")
        }`
      : "";


  openModuleScreen(
    `
      <span class="section-kicker">
        LANGKAH 5
      </span>

      <h1>
        💭 Ingat Ayat
      </h1>

      <p>
        Cuba tulis semula ayat tadi.
      </p>

      ${
        hint
          ? `
            <div style="
              padding:14px;
              background:#f2efff;
              border-radius:15px;
              margin:15px 0;
            ">
              💡 ${escapeHtml(hint)}
            </div>
          `
          : ""
      }

      <textarea
        id="recallInput"
        class="karangan-textarea"
        style="
          width:100%;
          min-height:150px;
          box-sizing:border-box;
          margin:18px 0;
        "
        placeholder="Tulis ayat yang kamu ingat..."
      ></textarea>

      <div style="
        display:grid;
        grid-template-columns:1fr 1fr;
        gap:10px;
      ">

        <button
          id="recallHintButton"
          class="secondary-button"
          type="button"
        >
          💡 Petunjuk
        </button>

        <button
          id="recallViewButton"
          class="secondary-button"
          type="button"
        >
          👀 Lihat Lagi
        </button>

      </div>

      <button
        id="checkRecallButton"
        class="primary-button"
        type="button"
        style="
          width:100%;
          margin-top:12px;
        "
      >
        ✓ Semak Ingatan
      </button>
    `,
    71
  );


  byId(
    "recallHintButton"
  )?.addEventListener(
    "click",
    () => {
      sentenceRecallState.hintLevel =
        1;

      renderRecallInput();
    }
  );


  byId(
    "recallViewButton"
  )?.addEventListener(
    "click",
    renderRecallPreview
  );


  byId(
    "checkRecallButton"
  )?.addEventListener(
    "click",
    checkRecallAnswer
  );
}


function checkRecallAnswer() {
  const value =
    byId(
      "recallInput"
    )
      ?.value
      .trim() ||
    "";


  if (!value) {
    showToast(
      "✍️ Cuba tulis ayat dahulu."
    );

    return;
  }


  sentenceRecallState.attempts +=
    1;


  const score =
    recallSimilarity(
      value,
      sentenceRecallState
        .sentence
    );


  if (score >= 70) {
    completeMission(
      "sentence-recall"
    );


    openModuleScreen(
      `
        <div style="
          text-align:center;
          padding:28px 0;
        ">

          <div style="font-size:70px;">
            🧠✨
          </div>

          <h1>
            Ingatan Hebat!
          </h1>

          <p>
            Ingatan kamu:
            <strong>
              ${score}%
            </strong>
          </p>

          <button
            id="continueStudioButton"
            class="primary-button"
            type="button"
            style="width:100%;"
          >
            Teruskan ke Studio Karangan →
          </button>

        </div>
      `,
      71
    );


    byId(
      "continueStudioButton"
    )?.addEventListener(
      "click",
      () => {
        showScreen(
          "create"
        );

        focusWriting();
      }
    );


  } else {
    sentenceRecallState.hintLevel =
      1;


    showToast(
      `💡 Cuba lagi. Ingatan: ${score}%`
    );
  }
}


function recallSimilarity(
  student,
  correct
) {
  const studentWords =
    normalizeText(student)
      .split(" ")
      .filter(Boolean);

  const correctWords =
    normalizeText(correct)
      .split(" ")
      .filter(Boolean);


  let matches = 0;


  correctWords.forEach(
    word => {
      if (
        studentWords.includes(
          word
        )
      ) {
        matches += 1;
      }
    }
  );


  return Math.round(
    matches /
    correctWords.length *
    100
  );
}


/* =========================================================
   27. WRITING STUDIO
   ========================================================= */

const WRITING_IDEAS = [
  {
    title:
      "Membantu Keluarga",

    prompt:
      "Ceritakan bagaimana kamu membantu keluarga di rumah.",

    starter:
      "Pada suatu hari, saya..."
  },

  {
    title:
      "Hari di Sekolah",

    prompt:
      "Ceritakan pengalaman menarik di sekolah.",

    starter:
      "Pada hari Isnin yang lalu..."
  },

  {
    title:
      "Menjaga Kebersihan",

    prompt:
      "Ceritakan bagaimana kamu menjaga kebersihan.",

    starter:
      "Kita mesti menjaga..."
  }
];


function bindWriting() {
  const textarea =
    byId(
      "karanganInput"
    );


  if (textarea) {
    textarea.value =
      appState.savedWriting ||
      "";


    textarea.addEventListener(
      "input",
      () => {
        updateWordCount();

        appState.savedWriting =
          textarea.value;

        saveState();
      }
    );
  }


  byId(
    "saveWritingButton"
  )?.addEventListener(
    "click",
    saveWriting
  );


  byId(
    "checkWritingButton"
  )?.addEventListener(
    "click",
    runWritingFeedback
  );
}


function initializeWritingStudio() {
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


  textarea.parentNode.insertBefore(
    guide,
    textarea
  );


  updateWritingStudioGuide();
}


function updateWritingStudioGuide() {
  const guide =
    byId(
      "writingStudioGuide"
    );


  if (!guide) {
    return;
  }


  const idea =
    WRITING_IDEAS[
      writingStudioState.ideaIndex %
      WRITING_IDEAS.length
    ];


  const vocabulary =
    getVocabularyWords()
      .map(
        item =>
          item.word
      )
      .filter(Boolean)
      .slice(0, 6);


  guide.innerHTML = `
    <div style="
      padding:18px;
      border-radius:20px;
      background:#fff7e7;
      margin-bottom:18px;
    ">

      <small>
        LANGKAH 6 · IDEA KARANGAN
      </small>

      <h3>
        ✍️ ${escapeHtml(
          idea.title
        )}
      </h3>

      <p>
        ${escapeHtml(
          idea.prompt
        )}
      </p>

      <button
        id="insertStarterButton"
        class="secondary-button"
        type="button"
      >
        “${escapeHtml(
          idea.starter
        )}”
      </button>

      <button
        id="changeIdeaButton"
        type="button"
        style="
          border:0;
          background:transparent;
          margin-left:8px;
        "
      >
        🎲 Idea Lain
      </button>

      <div style="
        display:flex;
        flex-wrap:wrap;
        gap:7px;
        margin-top:14px;
      ">

        ${
          vocabulary
            .map(
              word => `
                <button
                  type="button"
                  data-writing-word="${escapeAttribute(
                    word
                  )}"
                  style="
                    border:1px solid #ddd;
                    background:white;
                    border-radius:999px;
                    padding:7px 10px;
                  "
                >
                  + ${escapeHtml(word)}
                </button>
              `
            )
            .join("")
        }

      </div>

    </div>
  `;


  byId(
    "insertStarterButton"
  )?.addEventListener(
    "click",
    () => {
      insertWritingText(
        idea.starter
      );
    }
  );


  byId(
    "changeIdeaButton"
  )?.addEventListener(
    "click",
    () => {
      writingStudioState.ideaIndex +=
        1;

      updateWritingStudioGuide();
    }
  );


  $$("[data-writing-word]")
    .forEach(
      button => {
        button.addEventListener(
          "click",
          () => {
            insertWritingText(
              button.dataset
                .writingWord
            );
          }
        );
      }
    );
}


function insertWritingText(text) {
  const textarea =
    byId(
      "karanganInput"
    );


  if (!textarea) {
    return;
  }


  textarea.value +=
    `${
      textarea.value &&
      !textarea.value.endsWith(
        " "
      )
        ? " "
        : ""
    }${text} `;


  textarea.focus();

  updateWordCount();
}


function focusWriting() {
  initializeWritingStudio();


  setTimeout(
    () => {
      byId(
        "karanganInput"
      )?.focus();
    },
    200
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
    getWritingStats(
      textarea.value
    ).words >= 20
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


function getWritingStats(value) {
  const text =
    String(value || "")
      .trim();


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
          .split(/[.!?]+/)
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


  counter.textContent =
    getWritingStats(
      textarea.value
    ).words;
}


/* =========================================================
   28. AI WRITING FEEDBACK
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


  if (
    !textarea ||
    !content
  ) {
    return;
  }


  const writing =
    textarea.value.trim();


  const stats =
    getWritingStats(
      writing
    );


  if (
    stats.words < 10
  ) {
    if (panel) {
      panel.hidden = false;
    }


    content.innerHTML = `
      <p>
        ✍️ Tulis sekurang-kurangnya 10 perkataan dahulu.
      </p>
    `;


    return;
  }


  if (panel) {
    panel.hidden = false;
  }


  content.innerHTML = `
    <p>
      👩‍🏫✨ Cikgu Aira sedang membaca karangan kamu...
    </p>
  `;


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
          "Bahasa Melayu",

        instruction:
          "Give short constructive feedback. Do not rewrite the whole essay."
      });


    content.innerHTML =
      formatAIResponse(
        extractAIText(
          result
        ) ||
        getFallbackWritingFeedback(
          writing
        )
      );


  } catch (error) {
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

  completeMission(
    "ai-feedback"
  );
}


function getFallbackWritingFeedback(
  writing
) {
  const stats =
    getWritingStats(
      writing
    );


  return `
🌟 Bagus! Kamu sudah mula menulis.

✅ Kekuatan:
Kamu telah menulis ${stats.words} perkataan dan ${stats.sentences} ayat.

💡 Cuba perbaiki:
Pastikan ayat bermula dengan huruf besar dan berakhir dengan tanda noktah.

🧠 Cabaran:
Tambah satu ayat yang menerangkan perasaan kamu.

✨ Syabas! Teruskan berlatih.
  `.trim();
}


/* =========================================================
   29. AI API
   ========================================================= */

async function callAI(payload) {
  const response =
    await fetch(
      "/api/ai",
      {
        method: "POST",

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


  if (!response.ok) {
    throw new Error(
      `AI API ${response.status}`
    );
  }


  return response.json();
}


function extractAIText(result) {
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


function formatAIResponse(text) {
  return String(text)
    .split(/\n+/)
    .filter(Boolean)
    .map(
      line => `
        <p style="
          line-height:1.65;
          margin-bottom:10px;
        ">
          ${escapeHtml(line)}
        </p>
      `
    )
    .join("");
}


/* =========================================================
   30. CIKGU AIRA
   ========================================================= */

function bindMentor() {
  byId(
    "mentorFloatingButton"
  )?.addEventListener(
    "click",
    openMentorPanel
  );


  byId(
    "mentorPanelClose"
  )?.addEventListener(
    "click",
    closeMentorPanel
  );


  byId(
    "mentorForm"
  )?.addEventListener(
    "submit",
    event => {
      event.preventDefault();

      sendMentorMessage();
    }
  );


  $$("[data-mentor-prompt]")
    .forEach(
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
                "Beri saya petunjuk idea karangan."
            };


            const input =
              byId(
                "mentorInput"
              );


            if (input) {
              input.value =
                prompts[
                  button.dataset
                    .mentorPrompt
                ] ||
                "";

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


  if (panel) {
    panel.hidden = false;
  }
}


function closeMentorPanel() {
  const panel =
    byId(
      "mentorPanel"
    );


  if (panel) {
    panel.hidden = true;
  }
}


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


  input.value = "";


  appendChatBubble(
    message,
    "student"
  );


  try {
    const result =
      await callAI({
        type: "mentor",
        message,
        level: "Year 3",
        rule:
          "Give hints. Do not write a full essay."
      });


    appendChatBubble(
      extractAIText(
        result
      ) ||
      getMentorFallback(
        message
      ),
      "mentor"
    );


  } catch (error) {
    appendChatBubble(
      getMentorFallback(
        message
      ),
      "mentor"
    );
  }
}


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
    sender === "student"
  ) {
    bubble.style.cssText = `
      max-width:85%;
      margin:10px 0 10px auto;
      padding:12px;
      border-radius:16px;
      background:#ff9f43;
      color:white;
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


function getMentorFallback(
  message
) {
  const lower =
    message.toLowerCase();


  if (
    lower.includes("ayat")
  ) {
    return "Mari fikir: Siapa? Apa tindakan? Di mana ia berlaku?";
  }


  if (
    lower.includes("maksud")
  ) {
    return "Beritahu saya perkataan yang kamu mahu fahami.";
  }


  return "Saya boleh bantu langkah demi langkah. Beritahu saya bahagian yang paling susah.";
}


/* =========================================================
   31. PROFILE
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


  const bar =
    byId(
      "avatarXpBar"
    );


  if (bar) {
    if (!next) {
      bar.style.width =
        "100%";

    } else {
      const percentage =
        (
          appState.xp -
          level.minXp
        ) /
        (
          next.minXp -
          level.minXp
        ) *
        100;


      bar.style.width =
        `${Math.max(
          0,
          Math.min(
            100,
            percentage
          )
        )}%`;
    }
  }
}


/* =========================================================
   32. AVATAR
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
      typeof window.initAvatar ===
      "function"
    ) {
      window.initAvatar();

      return;
    }

  } catch (error) {
    console.warn(
      "Avatar error:",
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
      <div style="font-size:80px;">
        🧒
      </div>

      <strong>
        ${escapeHtml(
          level.name
        )}
      </strong>

      <p>
        Level ${level.level}
        ·
        ${appState.xp} XP
      </p>
    </div>
  `;
}


/* =========================================================
   33. PROGRESS
   ========================================================= */

function updateLearningProgress(
  mission
) {
  if (
    mission === "story"
  ) {
    appState.progress.reading =
      Math.min(
        100,
        appState.progress.reading +
        10
      );
  }


  if (
    [
      "vocabulary",
      "sentence-builder",
      "grammar-rain",
      "sentence-recall"
    ].includes(mission)
  ) {
    appState.progress.vocabulary =
      Math.min(
        100,
        appState.progress.vocabulary +
        5
      );
  }


  if (
    [
      "creative-studio",
      "ai-feedback"
    ].includes(mission)
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
   34. BADGES
   ========================================================= */

function updateBadgeUI() {
  if (
    appState.storiesCompleted >= 5 &&
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


  cards[0]?.classList.remove(
    "locked"
  );


  cards[1]?.classList.toggle(
    "locked",
    !appState.badges.includes(
      "reader"
    )
  );


  cards[2]?.classList.toggle(
    "locked",
    !appState.badges.includes(
      "writer"
    )
  );
}


/* =========================================================
   35. MODAL
   ========================================================= */

function bindModal() {
  byId(
    "modalCloseButton"
  )?.addEventListener(
    "click",
    closeModal
  );


  $(
    ".modal-backdrop"
  )?.addEventListener(
    "click",
    closeModal
  );
}


function openModal(html) {
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

  modal.hidden = false;
}


function closeModal() {
  const modal =
    byId(
      "appModal"
    );


  if (modal) {
    modal.hidden = true;
  }
}


/* =========================================================
   36. TOAST
   ========================================================= */

let toastTimer = null;


function showToast(message) {
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
    console.log(message);

    return;
  }


  clearTimeout(
    toastTimer
  );


  text.textContent =
    message;

  toast.hidden = false;


  toastTimer =
    setTimeout(
      () => {
        toast.hidden = true;
      },
      2200
    );
}


/* =========================================================
   37. UTILITIES
   ========================================================= */

function cleanSentence(value) {
  return String(value || "")
    .replace(/\s+/g, " ")
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


function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .replace(
      /[.,!?;:'"“”‘’()-]/g,
      ""
    )
    .replace(/\s+/g, " ")
    .trim();
}


function shuffleArray(array) {
  const copy = [...array];


  for (
    let i = copy.length - 1;
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


function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


function escapeAttribute(value) {
  return escapeHtml(value);
}


/* =========================================================
   38. PUBLIC DEBUG API
   ========================================================= */

window.KaranganAI = {
  getState() {
    return cloneSafe(
      appState
    );
  },

  openModule,

  showScreen,

  completeMission,

  addXP(amount = 10) {
    appState.xp +=
      Number(amount) || 0;

    saveState();

    updateAllUI();
  },

  reset() {
    localStorage.removeItem(
      APP_CONFIG.storageKey
    );

    location.reload();
  }
};


/* =========================================================
   END
   KARANGAN AI v3.0
   ========================================================= */
/* =========================================================
   KARANGAN AI v3.1
   STORY VOICE UPGRADE
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     STORY SPEECH STATE
     ======================================================= */

  let storySpeech = {
    speaking: false,
    paused: false,
    utterance: null
  };


  /* =======================================================
     GET MALAY VOICE
     ======================================================= */

  function getMalayVoice() {

    if (
      !("speechSynthesis" in window)
    ) {
      return null;
    }


    const voices =
      window.speechSynthesis
        .getVoices();


    return (

      voices.find(
        voice =>
          String(
            voice.lang || ""
          )
            .toLowerCase() ===
          "ms-my"
      )

      ||

      voices.find(
        voice =>
          String(
            voice.lang || ""
          )
            .toLowerCase()
            .startsWith("ms")
      )

      ||

      null

    );

  }


  /* =======================================================
     SPEAK MALAY
     ======================================================= */

  function speakMalay(
    text,
    options = {}
  ) {

    if (
      !("speechSynthesis" in window) ||
      typeof SpeechSynthesisUtterance ===
        "undefined"
    ) {

      showToast(
        "🔇 Peranti ini tidak menyokong bacaan suara."
      );

      return null;

    }


    const speech =
      window.speechSynthesis;


    if (
      options.stopExisting !== false
    ) {

      speech.cancel();

    }


    const utterance =
      new SpeechSynthesisUtterance(
        String(text || "")
      );


    utterance.lang =
      "ms-MY";


    utterance.rate =
      options.rate || 0.88;


    utterance.pitch =
      options.pitch || 1;


    const voice =
      getMalayVoice();


    if (voice) {

      utterance.voice =
        voice;

    }


    if (
      typeof options.onstart ===
      "function"
    ) {

      utterance.onstart =
        options.onstart;

    }


    if (
      typeof options.onend ===
      "function"
    ) {

      utterance.onend =
        options.onend;

    }


    utterance.onerror =
      () => {

        storySpeech.speaking =
          false;

        storySpeech.paused =
          false;

        updateStoryVoiceButtons();

      };


    speech.speak(
      utterance
    );


    return utterance;

  }


  /* =======================================================
     GET STORY TEXT
     ======================================================= */

  function getStoryVoiceText() {

    if (!currentStory) {

      return "";

    }


    const paragraphs =
      Array.isArray(
        currentStory.paragraphs
      )
        ? currentStory.paragraphs
        : [];


    return [

      currentStory.title || "",

      ...paragraphs

    ]
      .filter(Boolean)
      .join(". ");

  }


  /* =======================================================
     START READING STORY
     ======================================================= */

  function startStoryVoice() {

    const text =
      getStoryVoiceText();


    if (!text) {

      showToast(
        "📖 Tiada cerita untuk dibaca."
      );

      return;

    }


    stopStoryVoice(
      false
    );


    storySpeech.utterance =
      speakMalay(
        text,
        {

          stopExisting: true,


          onstart() {

            storySpeech.speaking =
              true;

            storySpeech.paused =
              false;

            updateStoryVoiceButtons();

          },


          onend() {

            storySpeech.speaking =
              false;

            storySpeech.paused =
              false;

            storySpeech.utterance =
              null;

            updateStoryVoiceButtons();

          }

        }
      );


    storySpeech.speaking =
      true;


    storySpeech.paused =
      false;


    updateStoryVoiceButtons();

  }


  /* =======================================================
     PAUSE / RESUME
     ======================================================= */

  function pauseResumeStoryVoice() {

    if (
      !("speechSynthesis" in window)
    ) {

      return;

    }


    const speech =
      window.speechSynthesis;


    if (
      !storySpeech.speaking
    ) {

      startStoryVoice();

      return;

    }


    if (
      storySpeech.paused
    ) {

      speech.resume();

      storySpeech.paused =
        false;

    }

    else {

      speech.pause();

      storySpeech.paused =
        true;

    }


    updateStoryVoiceButtons();

  }


  /* =======================================================
     STOP
     ======================================================= */

  function stopStoryVoice(
    showMessage = true
  ) {

    if (
      "speechSynthesis" in window
    ) {

      window
        .speechSynthesis
        .cancel();

    }


    storySpeech.speaking =
      false;


    storySpeech.paused =
      false;


    storySpeech.utterance =
      null;


    updateStoryVoiceButtons();


    if (showMessage) {

      showToast(
        "⏹ Bacaan dihentikan."
      );

    }

  }


  /* =======================================================
     READ ONE WORD
     ======================================================= */

  function pronounceStoryWord(
    word
  ) {

    const cleanWord =
      String(word || "")
        .trim();


    if (!cleanWord) {

      return;

    }


    speakMalay(
      cleanWord,
      {
        stopExisting: true,
        rate: 0.75
      }
    );

  }


  /* =======================================================
     CREATE STORY VOICE BUTTONS
     ======================================================= */

  function addStoryVoiceControls() {

    const reader =
      byId(
        "storyReader"
      );


    if (!reader) {

      return;

    }


    /*
      Prevent duplicate controls
    */

    if (
      byId(
        "storyVoiceControls"
      )
    ) {

      return;

    }


    const controls =
      document.createElement(
        "div"
      );


    controls.id =
      "storyVoiceControls";


    controls.style.cssText = `
      display:grid;
      grid-template-columns:1.4fr 1fr 1fr;
      gap:8px;
      margin:14px 0 20px;
      padding:12px;
      border-radius:18px;
      background:#f5f0ff;
    `;


    controls.innerHTML = `

      <button
        id="readStoryVoiceButton"
        class="primary-button"
        type="button"
      >
        🔊 Baca Cerita
      </button>


      <button
        id="pauseStoryVoiceButton"
        class="secondary-button"
        type="button"
      >
        ⏸ Jeda
      </button>


      <button
        id="stopStoryVoiceButton"
        class="secondary-button"
        type="button"
      >
        ⏹ Berhenti
      </button>

    `;


    const heading =
      reader.querySelector(
        "h1"
      );


    if (heading) {

      heading.insertAdjacentElement(
        "afterend",
        controls
      );

    }

    else {

      reader.prepend(
        controls
      );

    }


    byId(
      "readStoryVoiceButton"
    )
      ?.addEventListener(
        "click",
        startStoryVoice
      );


    byId(
      "pauseStoryVoiceButton"
    )
      ?.addEventListener(
        "click",
        pauseResumeStoryVoice
      );


    byId(
      "stopStoryVoiceButton"
    )
      ?.addEventListener(
        "click",
        () => {

          stopStoryVoice(
            true
          );

        }
      );


    updateStoryVoiceButtons();

  }


  /* =======================================================
     UPDATE BUTTON TEXT
     ======================================================= */

  function updateStoryVoiceButtons() {

    const readButton =
      byId(
        "readStoryVoiceButton"
      );


    const pauseButton =
      byId(
        "pauseStoryVoiceButton"
      );


    if (readButton) {

      readButton.textContent =
        storySpeech.speaking
          ? "🔊 Sedang Membaca..."
          : "🔊 Baca Cerita";

    }


    if (pauseButton) {

      pauseButton.textContent =
        storySpeech.paused
          ? "▶️ Sambung"
          : "⏸ Jeda";

    }

  }


  /* =======================================================
     ADD SPEAKER TO TRANSLATION POPUP
     ======================================================= */

  function addWordVoiceButton() {

    const wordElement =
      byId(
        "translationWord"
      );


    if (!wordElement) {

      return;

    }


    let button =
      byId(
        "storyWordVoiceButton"
      );


    if (!button) {

      button =
        document.createElement(
          "button"
        );


      button.id =
        "storyWordVoiceButton";


      button.type =
        "button";


      button.className =
        "secondary-button";


      button.style.cssText = `
        margin-top:10px;
        padding:8px 12px;
      `;


      wordElement
        .insertAdjacentElement(
          "afterend",
          button
        );

    }


    button.textContent =
      `🔊 Dengar "${currentTranslationWord}"`;


    button.onclick =
      () => {

        pronounceStoryWord(
          currentTranslationWord
        );

      };

  }


  /* =======================================================
     HOOK EXISTING renderStory()
     ======================================================= */

  const originalRenderStory =
    renderStory;


  renderStory =
    function(story) {

      stopStoryVoice(
        false
      );


      originalRenderStory(
        story
      );


      addStoryVoiceControls();

    };


  /* =======================================================
     HOOK EXISTING translateWord()
     ======================================================= */

  const originalTranslateWord =
    translateWord;


  translateWord =
    async function(word) {

      await originalTranslateWord(
        word
      );


      addWordVoiceButton();

    };


  /* =======================================================
     STOP AUDIO WHEN LEAVING STORY
     ======================================================= */

  const originalShowScreen =
    showScreen;


  showScreen =
    function(
      screenName,
      remember = true
    ) {

      if (
        currentScreen ===
          "story" &&
        screenName !==
          "story"
      ) {

        stopStoryVoice(
          false
        );

      }


      return originalShowScreen(
        screenName,
        remember
      );

    };


  /* =======================================================
     IOS / SAFARI VOICE INITIALIZATION
     ======================================================= */

  if (
    "speechSynthesis" in window
  ) {

    window
      .speechSynthesis
      .getVoices();


    window
      .speechSynthesis
      .addEventListener?.(
        "voiceschanged",
        () => {

          window
            .speechSynthesis
            .getVoices();

        }
      );

  }


  console.log(
    "Karangan AI v3.1 Story Voice loaded."
  );


})();


/* =========================================================
   END STORY VOICE UPGRADE
   ========================================================= */
/* =========================================================
   KARANGAN AI v3.2
   STORY LIBRARY + GRAMMAR HIGHLIGHT UPGRADE
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     1. STORY LIBRARY STATE
     ======================================================= */

  let storyLibraryFilter =
    "all";


  let activeHighlightType =
    "";


  const STORY_HIGHLIGHT_LABELS = {

    adjective:
      "Kata Adjektif",

    verb:
      "Kata Kerja",

    noun:
      "Kata Nama",

    number:
      "Kata Bilangan",

    conjunction:
      "Kata Hubung",

    vocabulary:
      "Perkataan Baharu"

  };


  const COMMON_CONJUNCTIONS = [
    "dan",
    "atau",
    "tetapi",
    "kerana",
    "supaya",
    "sambil",
    "apabila",
    "manakala",
    "lalu",
    "kemudian",
    "sebelum",
    "selepas"
  ];


  /* =======================================================
     2. NORMALIZE STORY WORD
     ======================================================= */

  function normalizeStoryHighlightWord(
    word
  ) {

    return String(
      word || ""
    )
      .toLowerCase()
      .replace(
        /[.,!?;:"”“'()]/g,
        ""
      )
      .trim();

  }


  /* =======================================================
     3. GET STORY DATABASE
     ======================================================= */

  function getStoryLibraryData() {

    if (
      Array.isArray(
        window.KARANGAN_STORIES
      )
    ) {

      return window.KARANGAN_STORIES;

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


    return [];

  }


  /* =======================================================
     4. STORY LIBRARY
     ======================================================= */

  function openStoryLibrary() {

    activeHighlightType =
      "";


    const stories =
      getStoryLibraryData();


    if (!stories.length) {

      showToast(
        "📚 Tiada cerita dijumpai."
      );

      return;

    }


    const years =
      [
        ...new Set(
          stories
            .map(
              story =>
                Number(
                  story.year
                )
            )
            .filter(Boolean)
        )
      ]
        .sort(
          (
            a,
            b
          ) =>
            a - b
        );


    const filteredStories =
      storyLibraryFilter ===
        "all"

        ? stories

        : stories.filter(
            story =>
              String(
                story.year
              ) ===
              String(
                storyLibraryFilter
              )
          );


    const filterButtons = `

      <button
        type="button"
        class="secondary-button story-year-filter"
        data-story-year="all"
        style="
          ${
            storyLibraryFilter === "all"
              ? "font-weight:900; border-color:#ff9f43;"
              : ""
          }
        "
      >
        Semua
      </button>

      ${
        years
          .map(
            year => `

              <button
                type="button"
                class="secondary-button story-year-filter"
                data-story-year="${year}"
                style="
                  ${
                    String(
                      storyLibraryFilter
                    ) ===
                    String(year)
                      ? "font-weight:900; border-color:#ff9f43;"
                      : ""
                  }
                "
              >
                Tahun ${year}
              </button>

            `
          )
          .join("")
      }

    `;


    const cards =
      filteredStories
        .map(
          (
            story,
            index
          ) => {

            const completed =
              typeof getStudentProgress ===
                "function"
                ? (
                    getStudentProgress()
                      ?.completedLessons ||
                    []
                  ).includes(
                    story.id
                  )
                : false;


            const picture =
              Array.isArray(
                story.pictures
              )
                ? story.pictures[0]
                : null;


            const visual =
              picture?.image

                ? `
                  <img
                    src="${escapeAttribute(
                      picture.image
                    )}"
                    alt="${escapeAttribute(
                      story.title
                    )}"
                    style="
                      width:100%;
                      height:170px;
                      object-fit:cover;
                      border-radius:18px;
                      margin-bottom:14px;
                    "
                  />
                `

                : `
                  <div style="
                    height:120px;
                    border-radius:18px;
                    background:#f4efff;
                    display:flex;
                    align-items:center;
                    justify-content:center;
                    font-size:50px;
                    margin-bottom:14px;
                  ">
                    ${escapeHtml(
                      story.emoji ||
                      "📖"
                    )}
                  </div>
                `;


            return `

              <button
                type="button"
                class="story-library-card"
                data-library-story-id="${escapeAttribute(
                  story.id
                )}"
                style="
                  display:block;
                  width:100%;
                  padding:15px;
                  border:1px solid #e8e3db;
                  border-radius:22px;
                  background:white;
                  text-align:left;
                  cursor:pointer;
                "
              >

                ${visual}


                <div style="
                  display:flex;
                  justify-content:space-between;
                  align-items:flex-start;
                  gap:10px;
                ">

                  <div style="flex:1;">

                    <div style="
                      font-size:11px;
                      font-weight:900;
                      color:#8b9297;
                      letter-spacing:.05em;
                      margin-bottom:5px;
                    ">
                      CERITA ${index + 1}
                      ·
                      ${escapeHtml(
                        story.level ||
                        `Tahun ${story.year || ""}`
                      )}
                    </div>


                    <strong style="
                      display:block;
                      font-size:19px;
                      line-height:1.35;
                      color:#29343b;
                    ">
                      ${escapeHtml(
                        story.title
                      )}
                    </strong>

                  </div>


                  ${
                    completed
                      ? `
                        <span style="
                          background:#eaf8f1;
                          color:#27865e;
                          border-radius:999px;
                          padding:6px 9px;
                          font-size:11px;
                          font-weight:900;
                          white-space:nowrap;
                        ">
                          ✓ Selesai
                        </span>
                      `
                      : ""
                  }

                </div>


                <div style="
                  margin-top:8px;
                  color:#6b55d9;
                  font-size:13px;
                  font-weight:800;
                ">
                  ${escapeHtml(
                    story.theme ||
                    "Bahasa Melayu"
                  )}
                </div>


                <p style="
                  margin:9px 0 12px;
                  color:#68747a;
                  line-height:1.55;
                  font-size:14px;
                ">
                  ${escapeHtml(
                    story.description ||
                    ""
                  )}
                </p>


                <div style="
                  display:flex;
                  justify-content:space-between;
                  align-items:center;
                  gap:10px;
                ">

                  <span style="
                    font-size:12px;
                    color:#91989c;
                  ">
                    ✍️ ${
                      escapeHtml(
                        story.targetWords ||
                        ""
                      )
                    }
                  </span>


                  <strong style="
                    color:#df8525;
                    font-size:13px;
                  ">
                    Baca →
                  </strong>

                </div>

              </button>

            `;

          }
        )
        .join("");


    openModuleScreen(
      `

        <span class="section-kicker">
          LANGKAH 1
        </span>


        <h1>
          📚 Pilih Cerita
        </h1>


        <p style="
          color:#65727a;
          line-height:1.7;
        ">
          Pilih cerita mengikut tahap kamu.
          Semasa membaca, kamu boleh mendengar cerita,
          menekan perkataan untuk melihat maksud
          dan mengenal pasti jenis perkataan.
        </p>


        <div style="
          display:flex;
          flex-wrap:wrap;
          gap:8px;
          margin:20px 0;
        ">
          ${filterButtons}
        </div>


        <div style="
          display:grid;
          grid-template-columns:repeat(
            auto-fit,
            minmax(
              min(100%,260px),
              1fr
            )
          );
          gap:14px;
          margin-bottom:25px;
        ">
          ${cards}
        </div>

      `,
      14
    );


    bindStoryLibraryControls();

  }


  /* =======================================================
     5. BIND STORY LIBRARY
     ======================================================= */

  function bindStoryLibraryControls() {

    $$(
      "[data-story-year]"
    ).forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            storyLibraryFilter =
              button.dataset.storyYear;


            openStoryLibrary();

          }
        );

      }
    );


    $$(
      "[data-library-story-id]"
    ).forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            openSelectedStory(
              button.dataset
                .libraryStoryId
            );

          }
        );

      }
    );

  }


  /* =======================================================
     6. OPEN SELECTED STORY
     ======================================================= */

  function openSelectedStory(
    storyId
  ) {

    const stories =
      getStoryLibraryData();


    const story =
      stories.find(
        item =>
          String(
            item.id
          ) ===
          String(
            storyId
          )
      );


    if (!story) {

      showToast(
        "Cerita tidak dijumpai."
      );

      return;

    }


    /*
      Keep stories.js current story synced.
    */

    if (
      typeof window.setCurrentStory ===
        "function"
    ) {

      try {

        window.setCurrentStory(
          story.id
        );

      } catch (error) {

        console.warn(
          "Unable to set story:",
          error
        );

      }

    }


    currentStory =
      createEnhancedStory(
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


  /* =======================================================
     7. ENHANCED STORY NORMALIZER
     ======================================================= */

  function createEnhancedStory(
    story
  ) {

    let paragraphs = [];


    if (
      Array.isArray(
        story.paragraphs
      )
    ) {

      paragraphs =
        story.paragraphs;

    }

    else {

      const text =
        String(
          story.story ||
          story.content ||
          story.text ||
          ""
        ).trim();


      /*
        Split long story into readable groups.
      */

      const sentences =
        text
          .match(
            /[^.!?]+[.!?]+|[^.!?]+$/g
          ) ||
        [];


      for (
        let i = 0;
        i < sentences.length;
        i += 2
      ) {

        paragraphs.push(
          sentences
            .slice(
              i,
              i + 2
            )
            .join(" ")
            .trim()
        );

      }

    }


    const firstPicture =
      Array.isArray(
        story.pictures
      )
        ? story.pictures.find(
            picture =>
              picture.image
          )
        : null;


    return {

      ...story,

      id:
        story.id ||
        "story",

      title:
        story.title ||
        "Cerita Bahasa Melayu",

      image:
        story.image ||
        firstPicture?.image ||
        "",

      paragraphs,

      grammar:
        story.grammar ||
        {},

      dictionary:
        story.dictionary ||
        {},

      usefulWords:
        story.usefulWords ||
        []

    };

  }


  /* =======================================================
     8. STORY READER HOOK

     The existing Voice patch is preserved.
     ======================================================= */

  const storyRenderBeforeGrammar =
    renderStory;


  renderStory =
    function(
      story
    ) {

      activeHighlightType =
        "";


      storyRenderBeforeGrammar(
        story
      );


      addStoryLearningToolbar(
        story
      );

  };


  /* =======================================================
     9. LEARNING TOOLBAR
     ======================================================= */

  function addStoryLearningToolbar(
    story
  ) {

    const reader =
      byId(
        "storyReader"
      );


    if (!reader) {

      return;

    }


    if (
      byId(
        "storyLearningToolbar"
      )
    ) {

      return;

    }


    const toolbar =
      document.createElement(
        "div"
      );


    toolbar.id =
      "storyLearningToolbar";


    toolbar.style.cssText = `
      margin:15px 0 22px;
      padding:15px;
      border-radius:20px;
      background:#fffaf1;
      border:1px solid #eee3d2;
    `;


    toolbar.innerHTML = `

      <div style="
        font-size:11px;
        font-weight:900;
        letter-spacing:.07em;
        color:#c47825;
        margin-bottom:6px;
      ">
        🔍 TEROKA BAHASA
      </div>


      <div style="
        font-size:14px;
        color:#69747a;
        line-height:1.5;
        margin-bottom:12px;
      ">
        Tekan kategori untuk melihat perkataan dalam cerita.
      </div>


      <div style="
        display:flex;
        flex-wrap:wrap;
        gap:8px;
      ">

        <button
          type="button"
          class="secondary-button story-highlight-button"
          data-highlight-type="adjective"
        >
          🎨 Kata Adjektif
        </button>


        <button
          type="button"
          class="secondary-button story-highlight-button"
          data-highlight-type="verb"
        >
          🏃 Kata Kerja
        </button>


        <button
          type="button"
          class="secondary-button story-highlight-button"
          data-highlight-type="noun"
        >
          📦 Kata Nama
        </button>


        <button
          type="button"
          class="secondary-button story-highlight-button"
          data-highlight-type="number"
        >
          🔢 Kata Bilangan
        </button>


        <button
          type="button"
          class="secondary-button story-highlight-button"
          data-highlight-type="conjunction"
        >
          🔗 Kata Hubung
        </button>


        <button
          type="button"
          class="secondary-button story-highlight-button"
          data-highlight-type="vocabulary"
        >
          🧠 Perkataan Baharu
        </button>


        <button
          id="clearStoryHighlightButton"
          type="button"
          class="secondary-button"
        >
          ✕ Tutup Highlight
        </button>

      </div>


      <div
        id="storyHighlightInfo"
        hidden
        style="
          margin-top:13px;
          padding:12px 14px;
          border-radius:14px;
          background:white;
          color:#626d73;
          font-size:13px;
          line-height:1.55;
        "
      ></div>

    `;


    /*
      Put grammar toolbar after Voice controls.
    */

    const voiceControls =
      byId(
        "storyVoiceControls"
      );


    if (voiceControls) {

      voiceControls
        .insertAdjacentElement(
          "afterend",
          toolbar
        );

    }

    else {

      const heading =
        reader.querySelector(
          "h1"
        );


      if (heading) {

        heading
          .insertAdjacentElement(
            "afterend",
            toolbar
          );

      }

      else {

        reader.prepend(
          toolbar
        );

      }

    }


    bindStoryHighlightButtons(
      story
    );

  }


  /* =======================================================
     10. HIGHLIGHT BUTTON EVENTS
     ======================================================= */

  function bindStoryHighlightButtons(
    story
  ) {

    $$(
      ".story-highlight-button"
    ).forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            const type =
              button.dataset
                .highlightType;


            highlightStoryWords(
              story,
              type
            );

          }
        );

      }
    );


    byId(
      "clearStoryHighlightButton"
    )
      ?.addEventListener(
        "click",
        clearStoryHighlights
      );

  }


  /* =======================================================
     11. GET WORDS FOR CATEGORY
     ======================================================= */

  function getHighlightWords(
    story,
    type
  ) {

    const grammar =
      story.grammar ||
      {};


    if (
      type === "adjective"
    ) {

      return (
        grammar.adjective ||
        []
      );

    }


    if (
      type === "verb"
    ) {

      return (
        grammar.verb ||
        []
      );

    }


    if (
      type === "noun"
    ) {

      return (
        grammar.noun ||
        []
      );

    }


    if (
      type === "number"
    ) {

      return (
        grammar.number ||
        []
      );

    }


    if (
      type ===
      "conjunction"
    ) {

      return COMMON_CONJUNCTIONS;

    }


    if (
      type ===
      "vocabulary"
    ) {

      const useful =
        Array.isArray(
          story.usefulWords
        )
          ? story.usefulWords
          : [];


      const words = [];


      useful.forEach(
        item => {

          String(item)
            .split(/\s+/)
            .forEach(
              word => {

                const clean =
                  normalizeStoryHighlightWord(
                    word
                  );


                if (
                  clean.length >
                  2
                ) {

                  words.push(
                    clean
                  );

                }

              }
            );

        }
      );


      return words;

    }


    return [];

  }


  /* =======================================================
     12. APPLY HIGHLIGHT
     ======================================================= */

  function highlightStoryWords(
    story,
    type
  ) {

    activeHighlightType =
      type;


    const words =
      getHighlightWords(
        story,
        type
      )
        .map(
          normalizeStoryHighlightWord
        );


    const wordSet =
      new Set(words);


    let found =
      0;


    $$(
      "#storyReader .story-word"
    ).forEach(
      element => {

        const word =
          normalizeStoryHighlightWord(
            element.dataset.word ||
            element.textContent
          );


        resetHighlightStyle(
          element
        );


        if (
          wordSet.has(
            word
          )
        ) {

          applyHighlightStyle(
            element,
            type
          );


          found += 1;

        }

      }
    );


    updateHighlightButtons(
      type
    );


    const info =
      byId(
        "storyHighlightInfo"
      );


    if (info) {

      info.hidden =
        false;


      info.innerHTML = `

        <strong>
          ${
            escapeHtml(
              STORY_HIGHLIGHT_LABELS[
                type
              ] ||
              "Perkataan"
            )
          }
        </strong>

        <br>

        ${
          found
            ? `${found} perkataan dijumpai dalam cerita. Tekan perkataan yang di-highlight untuk melihat maksudnya.`
            : "Tiada perkataan kategori ini dijumpai dalam cerita."
        }

      `;

    }

  }


  /* =======================================================
     13. HIGHLIGHT STYLE
     ======================================================= */

  function applyHighlightStyle(
    element,
    type
  ) {

    element.dataset
      .grammarHighlight =
      type;


    element.style
      .borderRadius =
      "6px";


    element.style
      .padding =
      "2px 4px";


    element.style
      .fontWeight =
      "850";


    element.style
      .transition =
      "all .2s ease";


    /*
      Different category shades.
    */

    if (
      type === "adjective"
    ) {

      element.style
        .background =
        "#fff0a8";

    }

    else if (
      type === "verb"
    ) {

      element.style
        .background =
        "#dff3ff";

    }

    else if (
      type === "noun"
    ) {

      element.style
        .background =
        "#e8f7e9";

    }

    else if (
      type === "number"
    ) {

      element.style
        .background =
        "#f1e6ff";

    }

    else if (
      type === "conjunction"
    ) {

      element.style
        .background =
        "#ffe5ea";

    }

    else {

      element.style
        .background =
        "#ffe8bf";

    }

  }


  function resetHighlightStyle(
    element
  ) {

    delete element.dataset
      .grammarHighlight;


    element.style
      .background =
      "";


    element.style
      .borderRadius =
      "";


    element.style
      .padding =
      "";


    element.style
      .fontWeight =
      "";


    element.style
      .transition =
      "";

  }


  /* =======================================================
     14. CLEAR HIGHLIGHT
     ======================================================= */

  function clearStoryHighlights() {

    activeHighlightType =
      "";


    $$(
      "#storyReader .story-word"
    ).forEach(
      element => {

        resetHighlightStyle(
          element
        );

      }
    );


    $$(
      ".story-highlight-button"
    ).forEach(
      button => {

        button.style
          .fontWeight =
          "";

        button.style
          .borderColor =
          "";

      }
    );


    const info =
      byId(
        "storyHighlightInfo"
      );


    if (info) {

      info.hidden =
        true;

    }

  }


  /* =======================================================
     15. ACTIVE BUTTON
     ======================================================= */

  function updateHighlightButtons(
    type
  ) {

    $$(
      ".story-highlight-button"
    ).forEach(
      button => {

        const active =
          button.dataset
            .highlightType ===
          type;


        button.style.fontWeight =
          active
            ? "900"
            : "";


        button.style.borderColor =
          active
            ? "#ff9f43"
            : "";

      }
    );

  }


  /* =======================================================
     16. OVERRIDE openStory()

     No story ID:
       Open Story Library.

     Story ID:
       Open selected story.
     ======================================================= */

  openStory =
    function(
      storyId = null
    ) {

      if (!storyId) {

        openStoryLibrary();

        return;

      }


      openSelectedStory(
        storyId
      );

    };


  /* =======================================================
     17. RETURN TO LIBRARY BUTTON
     ======================================================= */

  const oldAddToolbar =
    addStoryLearningToolbar;


  /*
    Extend toolbar with Library button.
  */

  addStoryLearningToolbar =
    function(
      story
    ) {

      oldAddToolbar(
        story
      );


      const toolbar =
        byId(
          "storyLearningToolbar"
        );


      if (
        !toolbar ||
        byId(
          "backToStoryLibraryButton"
        )
      ) {

        return;

      }


      const button =
        document.createElement(
          "button"
        );


      button.id =
        "backToStoryLibraryButton";


      button.type =
        "button";


      button.className =
        "secondary-button";


      button.style.cssText = `
        width:100%;
        margin-top:12px;
      `;


      button.textContent =
        "📚 Pilih Cerita Lain";


      button.addEventListener(
        "click",
        () => {

          if (
            "speechSynthesis" in
            window
          ) {

            window
              .speechSynthesis
              .cancel();

          }


          openStoryLibrary();

        }
      );


      toolbar.appendChild(
        button
      );

  };


  /* =======================================================
     18. PUBLIC STORY TOOLS
     ======================================================= */

  window.KaranganStoryReader = {

    openLibrary:
      openStoryLibrary,

    openStory:
      openSelectedStory,

    highlight:
      type => {

        if (
          currentStory
        ) {

          highlightStoryWords(
            currentStory,
            type
          );

        }

      },

    clearHighlight:
      clearStoryHighlights

  };


  console.log(
    "✅ Karangan AI v3.2 Story Library + Grammar Highlight loaded"
  );


})();


/* =========================================================
   END KARANGAN AI v3.2
   ========================================================= */
/* =========================================================
   KARANGAN AI v3.3
   STORY COMPREHENSION QUIZ
   ========================================================= */

(() => {

  "use strict";


  /* =======================================================
     1. QUIZ STATE
     ======================================================= */

  let storyQuizState = {

    story: null,

    questions: [],

    index: 0,

    score: 0,

    correct: 0,

    answered: false

  };


  /* =======================================================
     2. GET QUESTIONS
     ======================================================= */

  function getCurrentStoryQuestions() {

    if (!currentStory) {

      return [];

    }


    if (
      Array.isArray(
        currentStory.questions
      )
    ) {

      return currentStory.questions;

    }


    if (
      typeof window.getStoryQuestions ===
        "function"
    ) {

      try {

        return (
          window.getStoryQuestions(
            currentStory.id
          ) ||
          []
        );

      } catch (error) {

        console.warn(
          "Unable to get story questions:",
          error
        );

      }

    }


    return [];

  }


  /* =======================================================
     3. START QUIZ
     ======================================================= */

  function startStoryQuiz() {

    const questions =
      getCurrentStoryQuestions();


    /*
      If a story has no questions,
      allow student to complete normally.
    */

    if (!questions.length) {

      finishStoryWithoutQuiz();

      return;

    }


    storyQuizState = {

      story:
        currentStory,

      questions:
        questions,

      index: 0,

      score: 0,

      correct: 0,

      answered: false

    };


    renderStoryQuizQuestion();

  }


  /* =======================================================
     4. RENDER QUESTION
     ======================================================= */

  function renderStoryQuizQuestion() {

    const question =
      storyQuizState.questions[
        storyQuizState.index
      ];


    if (!question) {

      renderStoryQuizResult();

      return;

    }


    storyQuizState.answered =
      false;


    const total =
      storyQuizState.questions.length;


    const progress =
      Math.round(
        storyQuizState.index /
        total *
        100
      );


    openModuleScreen(
      `

        <span class="section-kicker">
          LANGKAH 1 · PEMAHAMAN
        </span>


        <div style="
          display:flex;
          justify-content:space-between;
          align-items:center;
          gap:12px;
          margin-bottom:12px;
        ">

          <div>

            <h1 style="
              margin-bottom:4px;
            ">
              🧠 Fahami Cerita
            </h1>

            <div style="
              color:#7a8388;
              font-size:14px;
            ">
              ${escapeHtml(
                storyQuizState.story
                  ?.title ||
                "Cerita"
              )}
            </div>

          </div>


          <div style="
            background:#fff4dd;
            border-radius:999px;
            padding:8px 12px;
            font-size:13px;
            font-weight:900;
            white-space:nowrap;
          ">
            ⭐ ${storyQuizState.score}
          </div>

        </div>


        <div style="
          height:8px;
          border-radius:999px;
          background:#ece9e4;
          overflow:hidden;
          margin:18px 0 24px;
        ">

          <div style="
            width:${progress}%;
            height:100%;
            background:#ffad55;
            transition:width .25s ease;
          "></div>

        </div>


        <div style="
          font-size:13px;
          font-weight:800;
          color:#8b9297;
          margin-bottom:10px;
        ">
          SOALAN ${
            storyQuizState.index + 1
          } DARIPADA ${total}
        </div>


        <div style="
          padding:22px;
          border-radius:22px;
          background:#f5f0ff;
          margin-bottom:18px;
        ">

          <strong style="
            font-size:20px;
            line-height:1.55;
            color:#303942;
          ">
            ${escapeHtml(
              question.question ||
              ""
            )}
          </strong>

        </div>


        <div
          id="storyQuizAnswers"
          style="
            display:grid;
            gap:10px;
          "
        >

          ${
            Array.isArray(
              question.answers
            )

              ? question.answers
                  .map(
                    (
                      answer,
                      index
                    ) => `

                      <button
                        type="button"
                        class="secondary-button story-quiz-answer"
                        data-story-answer-index="${index}"
                        style="
                          width:100%;
                          text-align:left;
                          padding:14px 16px;
                          line-height:1.45;
                        "
                      >
                        <strong style="
                          margin-right:8px;
                        ">
                          ${
                            String.fromCharCode(
                              65 + index
                            )
                          }.
                        </strong>

                        ${escapeHtml(
                          answer
                        )}
                      </button>

                    `
                  )
                  .join("")

              : ""
          }

        </div>


        <div
          id="storyQuizFeedback"
          hidden
          style="
            margin-top:18px;
          "
        ></div>

      `,
      14
    );


    $$(
      ".story-quiz-answer"
    ).forEach(
      button => {

        button.addEventListener(
          "click",
          () => {

            submitStoryQuizAnswer(
              Number(
                button.dataset
                  .storyAnswerIndex
              )
            );

          }
        );

      }
    );

  }


  /* =======================================================
     5. SUBMIT ANSWER
     ======================================================= */

  function submitStoryQuizAnswer(
    selectedIndex
  ) {

    if (
      storyQuizState.answered
    ) {

      return;

    }


    storyQuizState.answered =
      true;


    const question =
      storyQuizState.questions[
        storyQuizState.index
      ];


    const correctIndex =
      Number(
        question.correct
      );


    const isCorrect =
      selectedIndex ===
      correctIndex;


    const buttons =
      $$(
        ".story-quiz-answer"
      );


    buttons.forEach(
      (
        button,
        index
      ) => {

        button.disabled =
          true;


        if (
          index ===
          correctIndex
        ) {

          button.style.background =
            "#e9f8ef";

          button.style.borderColor =
            "#9bd4b5";

          button.style.color =
            "#24724f";

        }


        if (
          index ===
            selectedIndex &&
          !isCorrect
        ) {

          button.style.background =
            "#fff0f0";

          button.style.borderColor =
            "#efb4b4";

          button.style.color =
            "#a74747";

        }

      }
    );


    if (isCorrect) {

      storyQuizState.correct +=
        1;


      storyQuizState.score +=
        20;


      if (
        typeof window.addQuizCorrect ===
          "function"
      ) {

        try {

          window.addQuizCorrect();

        } catch (error) {

          console.warn(
            error
          );

        }

      }

    }


    const feedback =
      byId(
        "storyQuizFeedback"
      );


    if (feedback) {

      feedback.hidden =
        false;


      feedback.innerHTML = `

        <div style="
          padding:17px;
          border-radius:18px;
          background:${
            isCorrect
              ? "#eef9f3"
              : "#fff5e9"
          };
        ">

          <strong style="
            font-size:18px;
          ">
            ${
              isCorrect
                ? "✅ Betul!"
                : "💡 Belum tepat."
            }
          </strong>


          <p style="
            line-height:1.6;
            margin:8px 0 14px;
            color:#68747a;
          ">

            ${
              escapeHtml(
                question.explanation ||
                (
                  isCorrect
                    ? "Syabas!"
                    : "Cuba baca penerangan ini."
                )
              )
            }

          </p>


          <button
            id="nextStoryQuizButton"
            type="button"
            class="primary-button"
            style="width:100%;"
          >

            ${
              storyQuizState.index + 1 >=
                storyQuizState
                  .questions
                  .length

                ? "Lihat Keputusan →"

                : "Soalan Seterusnya →"
            }

          </button>

        </div>

      `;

    }


    byId(
      "nextStoryQuizButton"
    )?.addEventListener(
      "click",
      () => {

        storyQuizState.index +=
          1;


        renderStoryQuizQuestion();

      }
    );

  }


  /* =======================================================
     6. QUIZ RESULT
     ======================================================= */

  function renderStoryQuizResult() {

    const total =
      storyQuizState.questions.length;


    const correct =
      storyQuizState.correct;


    const percentage =
      total > 0
        ? Math.round(
            correct /
            total *
            100
          )
        : 100;


    let emoji =
      "🌟";


    let title =
      "Bagus!";


    let message =
      "Kamu sudah memahami cerita ini.";


    if (
      percentage === 100
    ) {

      emoji =
        "🏆";

      title =
        "Hebat! Semua Betul!";

      message =
        "Pemahaman kamu sangat baik.";

    }

    else if (
      percentage >= 70
    ) {

      emoji =
        "🌟";

      title =
        "Syabas!";

      message =
        "Kamu memahami kebanyakan isi cerita.";

    }

    else {

      emoji =
        "💪";

      title =
        "Teruskan Berlatih!";

      message =
        "Baca semula cerita untuk memahami dengan lebih baik.";

    }


    openModuleScreen(
      `

        <div style="
          text-align:center;
          padding:25px 0;
        ">

          <div style="
            font-size:76px;
            margin-bottom:10px;
          ">
            ${emoji}
          </div>


          <span class="section-kicker">
            LANGKAH 1 SELESAI
          </span>


          <h1>
            ${escapeHtml(title)}
          </h1>


          <p style="
            color:#667278;
            line-height:1.6;
          ">
            ${escapeHtml(message)}
          </p>


          <div style="
            display:grid;
            grid-template-columns:1fr 1fr;
            gap:10px;
            margin:24px 0;
          ">

            <div style="
              padding:18px;
              border-radius:18px;
              background:#fff6df;
            ">

              <div style="
                font-size:12px;
                color:#8e9498;
              ">
                BETUL
              </div>

              <strong style="
                display:block;
                margin-top:4px;
                font-size:26px;
              ">
                ${correct}/${total}
              </strong>

            </div>


            <div style="
              padding:18px;
              border-radius:18px;
              background:#f2efff;
            ">

              <div style="
                font-size:12px;
                color:#8e9498;
              ">
                MARKAH
              </div>

              <strong style="
                display:block;
                margin-top:4px;
                font-size:26px;
              ">
                ${percentage}%
              </strong>

            </div>

          </div>


          <div style="
            padding:18px;
            border-radius:18px;
            background:#eef9f3;
            margin-bottom:18px;
            text-align:left;
          ">

            <strong>
              📖 ${
                escapeHtml(
                  storyQuizState.story
                    ?.title ||
                  ""
                )
              }
            </strong>

            <p style="
              margin:7px 0 0;
              color:#647178;
              line-height:1.55;
            ">
              Cerita ini akan ditandakan sebagai selesai.
            </p>

          </div>


          <button
            id="completeStoryQuizButton"
            type="button"
            class="primary-button"
            style="width:100%;"
          >
            🧠 Teruskan ke Buku Kosa Kata →
          </button>


          <button
            id="rereadStoryButton"
            type="button"
            class="secondary-button"
            style="
              width:100%;
              margin-top:10px;
            "
          >
            📖 Baca Cerita Semula
          </button>

        </div>

      `,
      14
    );


    byId(
      "completeStoryQuizButton"
    )?.addEventListener(
      "click",
      finishStoryQuiz
    );


    byId(
      "rereadStoryButton"
    )?.addEventListener(
      "click",
      () => {

        if (
          storyQuizState.story
            ?.id
        ) {

          openStory(
            storyQuizState.story.id
          );

        }

      }
    );

  }


  /* =======================================================
     7. FINISH STORY + QUIZ
     ======================================================= */

  function finishStoryQuiz() {

    const story =
      storyQuizState.story;


    /*
      Mark individual story complete.
    */

    if (
      story?.id &&
      typeof window.completeLesson ===
        "function"
    ) {

      try {

        window.completeLesson(
          story.id
        );

      } catch (error) {

        console.warn(
          "Complete lesson error:",
          error
        );

      }

    }


    /*
      Complete Langkah 1 mission once.
    */

    const firstTime =
      completeMission(
        "story"
      );


    if (firstTime) {

      appState.storiesCompleted =
        Number(
          appState.storiesCompleted ||
          0
        ) + 1;


      saveState();


      updateAllUI();

    }


    showToast(
      "📖 Cerita selesai! Syabas!"
    );


    setTimeout(
      () => {

        openModule(
          "vocabulary"
        );

      },
      450
    );

  }


  /* =======================================================
     8. STORY WITHOUT QUESTIONS
     ======================================================= */

  function finishStoryWithoutQuiz() {

    if (
      currentStory?.id &&
      typeof window.completeLesson ===
        "function"
    ) {

      try {

        window.completeLesson(
          currentStory.id
        );

      } catch (error) {

        console.warn(error);

      }

    }


    const firstTime =
      completeMission(
        "story"
      );


    if (firstTime) {

      appState.storiesCompleted =
        Number(
          appState.storiesCompleted ||
          0
        ) + 1;


      saveState();


      updateAllUI();

    }


    setTimeout(
      () => {

        openModule(
          "vocabulary"
        );

      },
      350
    );

  }


  /* =======================================================
     9. REPLACE STORY FINISH BUTTON

     Existing renderStory creates:
     #finishStoryButton

     We replace only its event behavior.
     ======================================================= */

  function bindStoryQuizFinishButton() {

    const oldButton =
      byId(
        "finishStoryButton"
      );


    if (!oldButton) {

      return;

    }


    /*
      Clone button to remove old v3.0 listener.
    */

    const newButton =
      oldButton.cloneNode(
        true
      );


    oldButton.replaceWith(
      newButton
    );


    newButton.textContent =
      "🧠 Saya Sudah Baca · Mula Kuiz";


    newButton.addEventListener(
      "click",
      startStoryQuiz
    );

  }


  /* =======================================================
     10. HOOK renderStory()

     Preserve:
     - Voice
     - Story Library
     - Grammar Highlight
     - Translation
     ======================================================= */

  const renderStoryBeforeQuiz =
    renderStory;


  renderStory =
    function(
      story
    ) {

      renderStoryBeforeQuiz(
        story
      );


      bindStoryQuizFinishButton();

  };


  /* =======================================================
     11. PUBLIC API
     ======================================================= */

  window.KaranganStoryQuiz = {

    start:
      startStoryQuiz,

    getState() {

      return {

        storyId:
          storyQuizState.story
            ?.id ||
          null,

        index:
          storyQuizState.index,

        score:
          storyQuizState.score,

        correct:
          storyQuizState.correct,

        total:
          storyQuizState
            .questions
            .length

      };

    }

  };


  console.log(
    "✅ Karangan AI v3.3 Story Comprehension Quiz loaded"
  );


})();


/* =========================================================
   END KARANGAN AI v3.3
   ========================================================= */
/* =========================================================

/* =========================================================
   KARANGAN AI — TRANSLATION ENGINE v4.0
   Single stable translation layer
   ========================================================= */

(() => {
  "use strict";

  const CACHE_KEY = "karanganAI_translation_v4";

  function cleanWord(raw) {
    return String(raw || "")
      .toLowerCase()
      .trim()
      .replace(/^[^a-zA-ZÀ-ÿ]+|[^a-zA-ZÀ-ÿ'-]+$/g, "");
  }

  function loadCache() {
    try {
      return JSON.parse(localStorage.getItem(CACHE_KEY) || "{}");
    } catch (_) {
      return {};
    }
  }

  function saveCache(cache) {
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify(cache));
    } catch (_) {}
  }

  function splitCombinedTranslation(value) {
    const text = String(value || "").trim();
    if (!text) return { zh: "", en: "" };
    if (!text.includes("·")) return { zh: text, en: "" };
    const parts = text.split("·").map(v => v.trim()).filter(Boolean);
    return { zh: parts[0] || "", en: parts.slice(1).join(" · ") };
  }

  function merge(...items) {
    const out = { zh: "", en: "", meaning: "" };
    for (const item of items) {
      if (!item) continue;
      if (!out.zh && item.zh) out.zh = String(item.zh).trim();
      if (!out.en && item.en) out.en = String(item.en).trim();
      if (!out.meaning && item.meaning) out.meaning = String(item.meaning).trim();
    }
    return out;
  }

  function isComplete(data) {
    return Boolean(data?.zh && data?.en && data?.meaning);
  }

  function getSentence(word) {
    if (typeof findStorySentenceContainingWord === "function") {
      return findStorySentenceContainingWord(word) || "";
    }
    return "";
  }

  function fromCurrentStory(word) {
    const value = currentStory?.dictionary?.[word];
    if (!value) return null;
    if (typeof value === "object") {
      return {
        zh: value.zh || value.chinese || "",
        en: value.en || value.english || "",
        meaning: value.meaning || value.definition || ""
      };
    }
    return { zh: String(value).trim(), en: "", meaning: "" };
  }

  function fromAllStories(word) {
    const stories = Array.isArray(window.KARANGAN_STORIES)
      ? window.KARANGAN_STORIES
      : (Array.isArray(window.stories) ? window.stories : []);

    for (const story of stories) {
      const value = story?.dictionary?.[word];
      if (!value) continue;
      if (typeof value === "object") {
        return {
          zh: value.zh || value.chinese || "",
          en: value.en || value.english || "",
          meaning: value.meaning || value.definition || ""
        };
      }
      return { zh: String(value).trim(), en: "", meaning: "" };
    }
    return null;
  }

  function fromBasicDictionary(word) {
    if (typeof BASIC_DICTIONARY !== "object" || !BASIC_DICTIONARY[word]) return null;
    const item = BASIC_DICTIONARY[word];
    return {
      zh: item.zh || "",
      en: item.en || "",
      meaning: item.meaning || ""
    };
  }

  function fromVocabulary(word) {
    const engine = window.KaranganVocabulary;
    if (!engine) return null;

    try {
      if (typeof engine.lookupWord === "function") {
        const item = engine.lookupWord(word);
        if (item) {
          return {
            zh: item.zh || item.chinese || "",
            en: item.en || item.english || "",
            meaning: item.meaning || item.definition || ""
          };
        }
      }

      if (typeof engine.findWord === "function") {
        const item = engine.findWord(word);
        if (item) {
          const parsed = splitCombinedTranslation(item.translation);
          return {
            zh: item.zh || item.chinese || parsed.zh,
            en: item.en || item.english || parsed.en,
            meaning: item.meaning || ""
          };
        }
      }
    } catch (error) {
      console.warn("Vocabulary translation lookup failed:", error);
    }
    return null;
  }

  function fromMalayMorphology(word) {
    try {
      const item = window.KaranganMalay?.lookup?.(word);
      if (!item) return null;
      const parsed = splitCombinedTranslation(item.translation);
      return {
        zh: item.zh || parsed.zh,
        en: item.en || parsed.en,
        meaning: item.meaning || ""
      };
    } catch (_) {
      return null;
    }
  }

  function speakTranslationWord(word) {
    const target = String(word || "").trim();

    if (!target) return;

    if (!("speechSynthesis" in window) || typeof SpeechSynthesisUtterance !== "function") {
      if (typeof showToast === "function") {
        showToast("🔇 Peranti ini tidak menyokong sebutan suara.");
      }
      return;
    }

    try {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(target);
      utterance.lang = "ms-MY";
      utterance.rate = 0.82;
      utterance.pitch = 1;
      utterance.volume = 1;

      const voices = window.speechSynthesis.getVoices();
      const malayVoice = voices.find(voice =>
        /^ms(-|_)/i.test(voice.lang || "")
      );

      if (malayVoice) {
        utterance.voice = malayVoice;
      }

      window.speechSynthesis.speak(utterance);
    } catch (error) {
      console.warn("Word pronunciation unavailable:", error);
    }
  }

  function ensureTranslationVoiceButton(word) {
    const wordElement = byId("translationWord");
    if (!wordElement) return;

    let button = byId("translationWordVoiceButtonV4");

    if (!button) {
      button = document.createElement("button");
      button.id = "translationWordVoiceButtonV4";
      button.type = "button";
      button.className = "secondary-button";
      button.style.cssText = `
        margin-top:10px;
        padding:8px 12px;
        min-height:40px;
      `;

      wordElement.insertAdjacentElement("afterend", button);
    }

    button.textContent = `🔊 Dengar "${word}"`;
    button.setAttribute("aria-label", `Dengar sebutan ${word}`);
    button.onclick = () => speakTranslationWord(word);
  }

  function show(word, data, sentence, loading = false) {
    const zh = String(data?.zh || "").trim();
    const en = String(data?.en || "").trim();
    const meaning = String(data?.meaning || "").trim();

    currentTranslationWord = word;
    currentTranslationData = {
      word,
      zh,
      en,
      translation: [zh, en].filter(Boolean).join(" · "),
      meaning,
      example: sentence,
      storyId: currentStory?.id || null
    };

    const popup = byId("translationPopup");
    if (popup) popup.hidden = false;

    safeText(byId("translationWord"), word);

    let headline = "";
    if (zh && en) headline = `🇨🇳 ${zh} · 🇬🇧 ${en}`;
    else if (zh) headline = `🇨🇳 ${zh}${loading ? " · 正在补充 English..." : ""}`;
    else if (en) headline = `🇬🇧 ${en}`;
    else headline = loading ? "Mencari maksud..." : "Terjemahan belum tersedia.";

    safeText(byId("translationMeaning"), headline);
    safeText(byId("translationDefinition"), meaning ? `🇲🇾 ${meaning}` : "");
    safeText(byId("translationExample"), sentence || `Perkataan: ${word}`);

    ensureTranslationVoiceButton(word);

    if (typeof updateSaveVocabularyButton === "function") {
      updateSaveVocabularyButton();
    }
  }

  async function askAI(word, sentence, knownChinese) {
    const result = await callAI({
      type: "translate",
      word,
      context: sentence,
      knownChinese: knownChinese || ""
    });

    return {
      zh: String(result?.zh || knownChinese || "").trim(),
      en: String(result?.en || "").trim(),
      meaning: String(result?.meaning || "").trim()
    };
  }

  translateWord = async function(rawWord) {
    const word = cleanWord(rawWord);
    if (!word) return;

    const sentence = getSentence(word);
    const cache = loadCache();
    const cached = cache[word] || null;

    const local = merge(
      cached,
      fromCurrentStory(word),
      fromVocabulary(word),
      fromBasicDictionary(word),
      fromMalayMorphology(word),
      fromAllStories(word)
    );

    if (isComplete(local)) {
      show(word, local, sentence, false);
      return;
    }

    // Show every useful local result immediately. AI failure never erases it.
    show(word, local, sentence, true);

    try {
      const ai = await askAI(word, sentence, local.zh);
      const complete = merge(local, ai);

      if (complete.zh || complete.en || complete.meaning) {
        cache[word] = complete;
        saveCache(cache);
      }

      show(word, complete, sentence, false);
    } catch (error) {
      console.warn("Translation AI unavailable:", word, error);
      // Keep local translation visible; never replace it with a fatal error.
      show(word, local, sentence, false);
    }
  };

  window.KaranganTranslationV4 = {
    clearCache() {
      localStorage.removeItem(CACHE_KEY);
      console.log("✅ Translation v4 cache cleared");
    },
    getCache() {
      return loadCache();
    }
  };

  console.log("✅ Karangan AI Translation Engine v4 loaded");
})();

/* =========================================================
   END KARANGAN AI TRANSLATION ENGINE v4.0
   ========================================================= */


/* =========================================================
   PHASE 1 — LANGKAH 1 + 2 STABILITY PACK v5.0
   ========================================================= */
(() => {
  "use strict";

  // Reliable navigation: module pages always have a direct route home.
  function ensureModuleHomeButton() {
    const header = document.querySelector("#moduleScreen .module-header") || byId("moduleBackButton")?.parentElement;
    if (!header || byId("moduleHomeButtonV5")) return;
    const btn = document.createElement("button");
    btn.id = "moduleHomeButtonV5";
    btn.type = "button";
    btn.className = "icon-button";
    btn.textContent = "🏠";
    btn.setAttribute("aria-label", "Kembali ke halaman utama");
    btn.addEventListener("click", () => showScreen("home"));
    header.appendChild(btn);
  }

  const oldShowScreenV5 = showScreen;
  showScreen = function(screenName, remember = true) {
    oldShowScreenV5(screenName, remember);
    if (screenName === "module") setTimeout(ensureModuleHomeButton, 0);
  };

  closeModule = function() {
    if (
      typeof vocabularyReviewState !== "undefined" &&
      currentScreen === "module" &&
      vocabularyReviewState?.active
    ) {
      vocabularyReviewState.active = false;
      renderVocabularyModule();
      return;
    }
    showScreen("home");
  };

  // Daily vocabulary + useful writing phrases.
  const DAILY_PHRASES = [
    ["Cuaca pada pagi itu cerah dan nyaman.","那天早晨天气晴朗舒适。","The weather that morning was bright and pleasant.","Cuaca"],
    ["Kicauan burung kedengaran merdu pada waktu pagi.","清晨传来悦耳的鸟鸣声。","The melodious chirping of birds could be heard in the morning.","Pemandangan"],
    ["Pokok-pokok yang menghijau menjadikan suasana nyaman dan mendamaikan.","翠绿的树木让环境舒适宁静。","The lush green trees made the surroundings pleasant and peaceful.","Pemandangan"],
    ["Saya berasa sangat gembira kerana pengalaman itu amat bermakna.","我非常开心，因为那次经历很有意义。","I felt very happy because the experience was very meaningful.","Perasaan"],
    ["Kami bekerjasama bagai aur dengan tebing.","我们互相合作、互相帮助。","We worked together and supported one another.","Kerjasama"],
    ["Suasana di situ sungguh meriah dan menggembirakan.","那里的气氛十分热闹愉快。","The atmosphere there was lively and cheerful.","Suasana"],
    ["Tanpa membuang masa, kami segera memulakan aktiviti.","我们不浪费时间，马上开始活动。","Without wasting time, we immediately began the activity.","Tindakan"],
    ["Pelbagai aktiviti yang menarik telah dijalankan.","那里进行了各种有趣的活动。","Various interesting activities were carried out.","Aktiviti"],
    ["Kami melakukan tugas dengan penuh semangat.","我们充满热忱地完成任务。","We carried out the task enthusiastically.","Sikap"],
    ["Kawasan itu kelihatan bersih, indah dan teratur.","那个地方看起来干净、美丽又整齐。","The area looked clean, beautiful and orderly.","Pemandangan"],
    ["Saya tidak dapat melupakan pengalaman yang menyeronokkan itu.","我无法忘记那次愉快的经历。","I could not forget that enjoyable experience.","Penutup"],
    ["Pengalaman itu memberikan banyak pengajaran kepada saya.","那次经历让我学到了很多。","That experience taught me many valuable lessons.","Penutup"],
    ["Kami pulang dengan hati yang gembira dan puas.","我们带着开心和满足的心情回家。","We returned home feeling happy and satisfied.","Penutup"],
    ["Orang ramai memberikan kerjasama yang sangat baik.","大家都给予了很好的配合。","Everyone gave excellent cooperation.","Kerjasama"],
    ["Saya berasa bangga kerana dapat membantu orang lain.","我为能够帮助别人而感到自豪。","I felt proud to be able to help others.","Perasaan"],
    ["Pada awal pagi, udara terasa segar dan nyaman.","清晨时空气清新舒适。","Early in the morning, the air felt fresh and pleasant.","Cuaca"],
    ["Langit yang biru terbentang luas tanpa awan gelap.","蔚蓝的天空辽阔无边，没有乌云。","The blue sky stretched widely without dark clouds.","Cuaca"],
    ["Bunga-bunga berkembang mekar dan menceriakan suasana.","鲜花盛开，使周围充满生气。","The flowers were in full bloom and brightened the surroundings.","Pemandangan"],
    ["Rakan-rakan saya bersorak dengan penuh semangat.","我的朋友们热情地欢呼。","My friends cheered enthusiastically.","Sukan"],
    ["Kami sentiasa mengutamakan keselamatan semasa menjalankan aktiviti.","进行活动时，我们始终把安全放在第一位。","We always prioritised safety while carrying out the activity.","Keselamatan"]
  ];

  function phaseDateKey(){ const d=new Date(); return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
  function dailySlice(list,count){
    const key=phaseDateKey().replace(/-/g,""); let seed=Number(key)%list.length; const out=[];
    for(let i=0;i<count;i++) out.push(list[(seed+i)%list.length]); return out;
  }
  function speakMalayV5(text){
    if(!("speechSynthesis" in window)) return showToast("🔇 Suara tidak tersedia.");
    speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(text); u.lang="ms-MY"; u.rate=.88; u.pitch=1.08;
    const vs=speechSynthesis.getVoices();
    const preferred=vs.find(v=>/^ms(-|_)/i.test(v.lang||"") && /female|zira|yasmin|aina|siti/i.test(v.name||"")) || vs.find(v=>/^ms(-|_)/i.test(v.lang||""));
    if(preferred) u.voice=preferred; speechSynthesis.speak(u);
  }
  window.KaranganVoiceV5={speak:speakMalayV5};

  const oldRenderVocabularyModuleV5 = renderVocabularyModule;
  renderVocabularyModule = function(){
    const engine=getVocabularyEngine();
    const words=getVocabularyWords();
    const daily = engine?.getDailyNewWords?.(10) || words.filter(w=>!w.mastered).slice(0,10);
    const phrases=dailySlice(DAILY_PHRASES,5);
    const learned=words.filter(w=>w.mastered);
    const cards=daily.map(item=>`<div class="v5-vocab-card" style="padding:16px;border:1px solid #ece8e1;border-radius:18px;background:white;margin-bottom:10px"><div style="display:flex;justify-content:space-between;gap:8px"><strong style="font-size:19px">${escapeHtml(item.word)}</strong><button type="button" data-v5-speak="${escapeAttribute(item.word)}" class="secondary-button">🔊</button></div><div style="color:#6b55d9;font-weight:750;margin-top:6px">${escapeHtml(item.translation||"")}</div>${item.meaning?`<p>${escapeHtml(item.meaning)}</p>`:""}<div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" data-v5-master="${escapeAttribute(item.id||"")}" class="secondary-button">✓ Sudah Kuasai</button><button type="button" data-v5-remove="${escapeAttribute(item.id||"")}" class="secondary-button">🗑 Buang</button></div></div>`).join("") || `<p>Tiada perkataan baharu hari ini.</p>`;
    const phraseCards=phrases.map((p,i)=>`<div style="padding:16px;border-radius:18px;background:#fff7e7;margin-bottom:10px"><small>${escapeHtml(p[3])}</small><strong style="display:block;margin:5px 0">✨ ${escapeHtml(p[0])}</strong><div>🇨🇳 ${escapeHtml(p[1])}</div><div>🇬🇧 ${escapeHtml(p[2])}</div><button type="button" data-v5-speak="${escapeAttribute(p[0])}" class="secondary-button" style="margin-top:8px">🔊 Dengar</button></div>`).join("");
    openModuleScreen(`<span class="section-kicker">LANGKAH 2</span><h1>🧠 Kosa Kata Hari Ini</h1><p>10 perkataan baharu setiap hari. Perkataan yang dikuasai akan dipindahkan keluar daripada senarai utama.</p><div style="display:flex;gap:8px;flex-wrap:wrap;margin:12px 0"><span class="section-kicker">Hari Ini ${daily.length}</span><span class="section-kicker">Dikuasai ${learned.length}</span><span class="section-kicker">Semua ${words.length}</span></div>${cards}<h2 style="margin-top:28px">✨ 5 Ayat Cantik Hari Ini</h2><p>Ayat serba guna yang boleh digunakan dalam pelbagai karangan.</p>${phraseCards}<button id="v5AllWords" class="secondary-button" type="button" style="width:100%;margin-top:12px">📚 Lihat Semua Perkataan (A–Z)</button><button id="startVocabularyReviewButton" class="primary-button" type="button" style="width:100%;margin-top:10px">🎯 Mula Ulang Kaji</button>`,28);
    $$('[data-v5-speak]').forEach(b=>b.onclick=()=>speakMalayV5(b.dataset.v5Speak));
    $$('[data-v5-master]').forEach(b=>b.onclick=()=>{ if(b.dataset.v5Master) engine?.markMastered?.(b.dataset.v5Master,true); renderVocabularyModule(); });
    $$('[data-v5-remove]').forEach(b=>b.onclick=()=>{ if(b.dataset.v5Remove) engine?.removeWord?.(b.dataset.v5Remove); renderVocabularyModule(); });
    byId('startVocabularyReviewButton')?.addEventListener('click',startVocabularyReview);
    byId('v5AllWords')?.addEventListener('click',()=>{
      const sorted=[...getVocabularyWords()].sort((a,b)=>String(a.word).localeCompare(String(b.word),'ms'));
      openModuleScreen(`<span class="section-kicker">BUKU KOSA KATA</span><h1>📚 Semua Perkataan</h1>${sorted.map(w=>`<div style="padding:12px;border-bottom:1px solid #eee"><strong>${escapeHtml(w.word)}</strong> — ${escapeHtml(w.translation||"")} ${w.mastered?'✓':''}</div>`).join('')}`,28);
    });
  };

  // Use improved device voice for translation word button too.
  document.addEventListener("click", e=>{
    const b=e.target.closest?.("#translationWordVoiceButtonV4");
    if(b){ e.preventDefault(); e.stopImmediatePropagation(); speakMalayV5(currentTranslationWord); }
  }, true);

  console.log("✅ Phase 1 Langkah 1+2 Stability Pack v5.0 loaded");
})();

/* =========================================================
   LANGKAH 2 YEAR SELECTOR UI v9.1
   10 Kosa Kata + 5 Ayat Cantik per active day
   ========================================================= */
(() => {
  "use strict";

  function l2Engine(){ return window.KaranganVocabulary || null; }
  function l2Year(){
    const e=l2Engine();
    const saved=Number(e?.getLearningYear?.() || 3);
    const y=[1,2,3,4,5,6].includes(saved)?saved:3;
    e?.setLearningYear?.(y);
    return y;
  }
  function l2YearSelector(year){
    return `<div style="margin:14px 0 18px;padding:14px;background:#f7f5ff;border-radius:16px">
      <div style="font-weight:850;margin-bottom:10px">🎓 Pilih Tahun</div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
        ${[1,2,3,4,5,6].map(y=>`<button type="button" data-l2-year="${y}" class="${y===year?'primary-button':'secondary-button'}" style="padding:10px 6px">Tahun ${y}</button>`).join('')}
      </div>
    </div>`;
  }
  function l2Speak(text){
    if(window.KaranganVoiceV5?.speak) return window.KaranganVoiceV5.speak(text);
    if(!("speechSynthesis" in window)) return showToast("🔇 Suara tidak tersedia.");
    speechSynthesis.cancel(); const u=new SpeechSynthesisUtterance(String(text||"")); u.lang="ms-MY"; u.rate=.88; speechSynthesis.speak(u);
  }

  // ===== LANGKAH 2 v10.6 SAFE KOSA KATA VARIETY =====
  // Presentation-layer only: never changes yearState, ensureToday or Master Bank.
  let l2CurrentDisplayWords = [];
  let l2CurrentDisplayYear = 3;

  function l2NormalizePhrase(text){
    return String(text||"").toLowerCase().trim().replace(/\s+/g," ");
  }

  function l2PhraseFamily(item){
    let w=l2NormalizePhrase(item?.word||"");
    w=w
      .replace(/\b(dengan penuh semangat|dengan bersungguh-sungguh|dengan tekun|dengan ikhlas|dengan tertib|dengan gembira|dengan berhati-hati|dengan baik)\b/g,"")
      .replace(/\b(di sekolah|di rumah|di kelas|di taman|di perpustakaan|di kantin|di padang|di kawasan sekolah|dalam kehidupan seharian)\b/g,"")
      .replace(/\s+/g," ")
      .trim();
    return w || l2NormalizePhrase(item?.word||"");
  }

  function l2WordQualityScore(item){
    const cat=String(item?.category||"");
    const w=l2NormalizePhrase(item?.word||"");
    const wc=w.split(/\s+/).filter(Boolean).length;
    let score=0;
    if(/Kata Adjektif|Kata Kerja|Kata Nama|Perasaan|Nilai|Penanda Wacana|Frasa Nilai|Frasa Deskriptif|Frasa Keterangan|Frasa Tema/i.test(cat)) score+=8;
    if(/Frasa Situasi|Frasa Contoh/i.test(cat)) score-=7;
    if(wc<=4) score+=5;
    else if(wc<=6) score+=2;
    else if(wc>=9) score-=4;
    if(/\bdi (sekolah|rumah|kelas|taman|perpustakaan|kantin|padang)\b.*\bdengan\b/.test(w)) score-=6;
    return score;
  }

  function l2DaySeed(year){
    const d=new Date();
    return Number(`${year}${d.getFullYear()}${String(d.getMonth()+1).padStart(2,"0")}${String(d.getDate()).padStart(2,"0")}`);
  }

  function l2StableRank(item,seed){
    const s=`${item?.id||item?.word||""}|${seed}`;
    let h=2166136261;
    for(let i=0;i<s.length;i++){
      h^=s.charCodeAt(i);
      h=Math.imul(h,16777619);
    }
    return h>>>0;
  }

  function l2EnsureDisplayWordSaved(engine,item){
    if(!item?.word) return item;
    const existing=engine?.findWord?.(item.word);
    if(existing) return {...existing,...item,id:existing.id,bankId:item.bankId||item.id};

    const beforeXp=(typeof appState!=="undefined") ? Number(appState.xp||0) : null;
    const result=engine?.addWord?.({
      word:item.word,
      translation:item.translation,
      meaning:item.meaning,
      example:item.example,
      category:item.category,
      emoji:item.emoji||"🧠",
      source:"daily-variety",
      storyId:null
    });

    // System-selected replacement is not a student achievement:
    // cancel only addWord's automatic +2 XP.
    if(result?.success && beforeXp!==null && typeof appState!=="undefined"){
      const afterXp=Number(appState.xp||0);
      if(afterXp===beforeXp+2){
        appState.xp=beforeXp;
        saveState();
        updateAllUI();
      }
    }

    const saved=result?.word || engine?.findWord?.(item.word);
    return saved ? {...saved,...item,id:saved.id,bankId:item.bankId||item.id} : item;
  }

  function l2SafeVarietyWords(todayWords,engine,year,count=10){
    const today=Array.isArray(todayWords)?todayWords.filter(Boolean):[];

    // Core safety rule: if stable data engine returns zero, do nothing.
    if(!today.length) return today;

    const selected=[];
    const selectedWords=new Set();
    const families=new Set();
    const categories=new Map();

    const addCandidate=(item,strict=true)=>{
      if(!item?.word || selected.length>=count) return false;
      const wordKey=l2NormalizePhrase(item.word);
      if(selectedWords.has(wordKey)) return false;
      const family=l2PhraseFamily(item);
      const cat=String(item.category||"Umum");
      if(strict && families.has(family)) return false;
      if(strict && (categories.get(cat)||0)>=2) return false;
      selected.push(item);
      selectedWords.add(wordKey);
      families.add(family);
      categories.set(cat,(categories.get(cat)||0)+1);
      return true;
    };

    // Keep useful/diverse members of the stable engine's real daily list.
    [...today]
      .sort((a,b)=>l2WordQualityScore(b)-l2WordQualityScore(a))
      .forEach(x=>addCandidate(x,true));

    // Supplement only from the SAME YEAR bank if real daily list is repetitive.
    if(selected.length<count){
      const seed=l2DaySeed(year);
      const bank=(engine?.getMasterWordBank?.()||[])
        .filter(x=>Number(x.year||x.minYear||3)===Number(year))
        .sort((a,b)=>{
          const q=l2WordQualityScore(b)-l2WordQualityScore(a);
          return q || (l2StableRank(a,seed)-l2StableRank(b,seed));
        });

      bank.forEach(x=>addCandidate(x,true));
      if(selected.length<count) bank.forEach(x=>addCandidate(x,false));
    }

    // Final fallback keeps original data, never empties the page.
    if(selected.length<count) today.forEach(x=>addCandidate(x,false));

    return selected.slice(0,count).map(x=>l2EnsureDisplayWordSaved(engine,x));
  }

  function l2WordCard(item){
    return `<div style="padding:16px;border:1px solid #ece8e1;border-radius:18px;background:#fff;margin-bottom:10px">
      <div style="display:flex;justify-content:space-between;gap:8px;align-items:center"><div><small>${escapeHtml(item.category||"Kosa Kata")}</small><strong style="display:block;font-size:20px">${escapeHtml(item.word||"")}</strong></div><button type="button" data-l2-speak="${escapeAttribute(item.word||"")}" class="secondary-button">🔊</button></div>
      <div style="color:#6b55d9;font-weight:800;margin-top:6px">${escapeHtml(item.translation||[item.zh,item.en].filter(Boolean).join(" · "))}</div>
      ${item.meaning?`<p style="color:#65727a;line-height:1.55">🇲🇾 ${escapeHtml(item.meaning)}</p>`:""}
      ${item.example?`<p style="background:#faf8ff;padding:10px;border-radius:12px">📝 ${escapeHtml(item.example)}</p>`:""}
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button type="button" data-l2-master="${escapeAttribute(item.id||"")}" class="secondary-button">✓ Sudah Kuasai</button><button type="button" data-l2-remove-word="${escapeAttribute(item.word||"")}" class="secondary-button">🗑 Buang</button></div>
    </div>`;
  }
  function l2AyatMeta(item){
    const t=String(item?.text||"").toLowerCase();
    const theme=String(item?.theme||"").toLowerCase();
    if(t.includes("berasa")||theme.includes("perasaan")) return {key:"feeling",icon:"💛",label:"Perasaan"};
    if(t.includes("cuaca")||t.includes("langit")||theme.includes("cuaca")) return {key:"weather",icon:"🌤️",label:"Cuaca"};
    if(t.includes("pemandangan")||t.includes("bunga")||t.includes("pokok")||theme.includes("pemandangan")) return {key:"nature",icon:"🌿",label:"Pemandangan"};
    if(t.includes("berazam")) return {key:"goal",icon:"🚀",label:"Azam / Penutup"};
    if(t.includes("semakin memahami")||t.includes("belajar tentang pentingnya")) return {key:"idea",icon:"💡",label:"Kesedaran"};
    if(t.includes("dapat mengeratkan")) return {key:"friend",icon:"🤝",label:"Hubungan"};
    if(t.includes("hendaklah memupuk")||t.includes("perlu diamalkan")) return {key:"value",icon:"🌟",label:"Nilai Murni"};
    if(t.includes("dapat membantu kita")) return {key:"growth",icon:"🌱",label:"Kesan Baik"};
    if(theme.includes("aktiviti")||t.includes("aktiviti")||t.includes("program")) return {key:"activity",icon:"🎯",label:"Aktiviti"};
    if(theme.includes("penutup")) return {key:"closing",icon:"🏁",label:"Penutup"};
    return {key:"spark",icon:"✨",label:item?.theme||"Ayat Cantik"};
  }
  function l2AyatCard(item,e,isToday=false){
    const mastered=e?.isAyatMastered?.(item.id);
    const meta=l2AyatMeta(item);
    return `<article class="l2-ayat-card l2-ayat-${meta.key} ${mastered?'is-mastered':''}">
      <div class="l2-ayat-top"><span class="l2-ayat-icon">${meta.icon}</span><span class="l2-ayat-theme">${escapeHtml(meta.label)}</span><span class="l2-ayat-status">${mastered?'✓ DIKUASAI':(isToday?'BARU':'KOLEKSI')}</span></div>
      <strong class="l2-ayat-main">${escapeHtml(item.text)}</strong>
      <div class="l2-ayat-translation"><div>🇨🇳 <span>${escapeHtml(item.zh||"")}</span></div><div>🇬🇧 <span>${escapeHtml(item.en||"")}</span></div></div>
      <div class="l2-ayat-actions"><button type="button" data-l2-speak="${escapeAttribute(item.text)}" class="secondary-button">🔊 Dengar</button><button type="button" data-l2-master-ayat="${escapeAttribute(item.id)}" class="secondary-button">${mastered?'↩ Belajar Semula':'✓ Sudah Kuasai'}</button><button type="button" data-l2-remove-ayat="${escapeAttribute(item.id)}" class="secondary-button">🗑 Buang</button></div>
    </article>`;
  }

  (function injectL2AyatCollectionStyles(){
    if(byId("l2-ayat-v103-styles")) return;
    const st=document.createElement("style"); st.id="l2-ayat-v103-styles";
    st.textContent=`
      .l2-ayat-card{position:relative;overflow:hidden;padding:17px 18px 16px;border-radius:22px;margin-bottom:13px;border:1px solid rgba(40,50,65,.07);box-shadow:0 5px 18px rgba(35,42,55,.045);background:linear-gradient(135deg,#fff9ec,#fff4dd)}
      .l2-ayat-card:before{content:"";position:absolute;left:0;top:0;bottom:0;width:6px;background:rgba(255,145,55,.72)}
      .l2-ayat-top{display:flex;align-items:center;gap:8px;margin-bottom:10px}.l2-ayat-icon{font-size:22px}.l2-ayat-theme{font-size:14px;font-weight:850;letter-spacing:.01em}.l2-ayat-status{margin-left:auto;font-size:10px;font-weight:950;letter-spacing:.08em;padding:5px 8px;border-radius:999px;background:rgba(255,255,255,.78);border:1px solid rgba(30,40,50,.08)}
      .l2-ayat-main{display:block;font-size:19px;line-height:1.48;margin:0 0 11px;color:#26343a}.l2-ayat-translation{font-size:14px;line-height:1.45;color:#738087}.l2-ayat-translation div+div{margin-top:4px}.l2-ayat-actions{display:flex;gap:8px;flex-wrap:wrap;margin-top:13px}
      .l2-ayat-feeling{background:linear-gradient(135deg,#fff6f4,#fff0e9)}.l2-ayat-feeling:before{background:#ff8e82}.l2-ayat-weather{background:linear-gradient(135deg,#f3fbff,#eef8ff)}.l2-ayat-weather:before{background:#67bce9}.l2-ayat-nature{background:linear-gradient(135deg,#f2fbf4,#ebf8ef)}.l2-ayat-nature:before{background:#67bd7d}.l2-ayat-goal{background:linear-gradient(135deg,#f6f2ff,#efeaff)}.l2-ayat-goal:before{background:#8d75df}.l2-ayat-idea{background:linear-gradient(135deg,#fffbea,#fff6d7)}.l2-ayat-idea:before{background:#e8b93e}.l2-ayat-friend{background:linear-gradient(135deg,#effaf8,#e9f7f5)}.l2-ayat-friend:before{background:#43aa9a}.l2-ayat-value{background:linear-gradient(135deg,#fff5e9,#fff0dc)}.l2-ayat-value:before{background:#f09b45}.l2-ayat-growth{background:linear-gradient(135deg,#f2faee,#ebf7e5)}.l2-ayat-growth:before{background:#78b85a}.l2-ayat-activity{background:linear-gradient(135deg,#eef7ff,#e9f2ff)}.l2-ayat-activity:before{background:#5f96df}.l2-ayat-closing{background:linear-gradient(135deg,#f5f3fa,#efedf6)}.l2-ayat-closing:before{background:#7e7795}.l2-ayat-card.is-mastered{opacity:.76}.l2-ayat-card.is-mastered .l2-ayat-status{background:#eaf8ef;color:#2d8556}
      @media (min-width:700px){.l2-ayat-main{font-size:20px}.l2-ayat-translation{font-size:15px}}
    `; document.head.appendChild(st);
  })();
  function bindL2(){
    const e=l2Engine();
    $$('[data-l2-year]').forEach(b=>b.onclick=()=>{
      const y=Number(b.dataset.l2Year);
      if(![1,2,3,4,5,6].includes(y)) return;
      e?.setLearningYear?.(y);
      e?.ensureDailyContent?.(y);
      renderVocabularyModule();
      showToast(`🎓 Tahun ${y} dipilih`);
    });
    $$('[data-l2-speak]').forEach(b=>b.onclick=()=>l2Speak(b.dataset.l2Speak));
    $$('[data-l2-master]').forEach(b=>b.onclick=()=>{
      if(!b.dataset.l2Master) return;
      e?.markMastered?.(b.dataset.l2Master,true);
      vocabularyRewardState.combo += 1;
      showVocabularyReward(
        "good",
        vocabularyRewardState.combo >= 5
          ? "🔥 Hebat! Banyak perkataan sudah kamu kuasai!"
          : "🌟 Syabas! Perkataan ini sudah kamu kuasai!",
        3
      );
      setTimeout(renderVocabularyModule, 3000);
    });
    $$('[data-l2-remove-word]').forEach(b=>b.onclick=()=>{e?.removeDailyWord?.(b.dataset.l2RemoveWord);renderVocabularyModule();});
    $$('[data-l2-master-ayat]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.l2MasterAyat;
      const wasMastered=Boolean(e?.isAyatMastered?.(id));
      e?.markAyatMastered?.(id,!wasMastered);
      if(!wasMastered){
        vocabularyRewardState.combo += 1;
        showVocabularyReward(
          "good",
          "✨ Bagus! Ayat cantik ini sudah kamu kuasai!",
          3
        );
      }else{
        vocabularyRewardState.combo = 0;
        showVocabularyReward(
          "encourage",
          "💪 Bagus! Mari belajar ayat ini sekali lagi.",
          0
        );
      }
      setTimeout(renderVocabularyModule, 3000);
    });
    $$('[data-l2-remove-ayat]').forEach(b=>b.onclick=()=>{e?.removeAyat?.(b.dataset.l2RemoveAyat);renderVocabularyModule();});
    byId('l2Review')?.addEventListener('click',startVocabularyReview);
    byId('l2All')?.addEventListener('click',renderL2AllWords);
    byId('l2AyatHistory')?.addEventListener('click',renderL2AyatHistory);
  }

  function renderL2AllWords(){
    const words=[...getVocabularyWords()];
    const mastered=words.filter(w=>w.mastered).sort((a,b)=>String(a.word).localeCompare(String(b.word),'ms'));
    const learning=words.filter(w=>!w.mastered).sort((a,b)=>String(a.word).localeCompare(String(b.word),'ms'));
    const block=(title,list)=>`<h2>${title} (${list.length})</h2>${list.map(w=>`<div style="padding:12px;border-bottom:1px solid #eee;display:flex;justify-content:space-between;gap:10px"><div><strong>${escapeHtml(w.word)}</strong><div style="color:#6b55d9">${escapeHtml(w.translation||"")}</div></div>${w.mastered?'✅':''}</div>`).join('')||'<p>Tiada.</p>'}`;
    openModuleScreen(`<span class="section-kicker">LANGKAH 2</span><h1>📚 Semua Kosa Kata</h1><p>Disusun A–Z. Perkataan yang dikuasai disimpan berasingan supaya rekod pembelajaran tidak hilang.</p>${block('Sedang Belajar',learning)}${block('Dikuasai',mastered)}<button id="l2BackToday" class="primary-button" type="button" style="width:100%;margin-top:18px">← Kembali ke Hari Ini</button>`,28);
    byId('l2BackToday')?.addEventListener('click',renderVocabularyModule);
  }
  function renderL2AyatHistory(){
    const e=l2Engine(); const list=e?.getUnlockedAyat?.(l2Year())||[];
    openModuleScreen(`<span class="section-kicker">LANGKAH 2</span><h1>✨ Koleksi Ayat Cantik</h1><p>Semua ayat yang telah dibuka setakat ini.</p>${list.map(x=>l2AyatCard(x,e,false)).join('')||'<p>Belum ada ayat.</p>'}<button id="l2BackToday" class="primary-button" type="button" style="width:100%;margin-top:18px">← Kembali ke Hari Ini</button>`,28);
    $$('[data-l2-speak]').forEach(b=>b.onclick=()=>l2Speak(b.dataset.l2Speak));
    $$('[data-l2-master-ayat]').forEach(b=>b.onclick=()=>{
      const id=b.dataset.l2MasterAyat;
      const wasMastered=Boolean(e?.isAyatMastered?.(id));
      e?.markAyatMastered?.(id,!wasMastered);
      if(!wasMastered){
        vocabularyRewardState.combo += 1;
        showVocabularyReward("good","✨ Syabas! Ayat ini sudah dikuasai!",3);
      }else{
        vocabularyRewardState.combo = 0;
        showVocabularyReward("encourage","💪 Mari ulang kaji ayat ini semula.",0);
      }
      setTimeout(renderL2AyatHistory,3000);
    });
    $$('[data-l2-remove-ayat]').forEach(b=>b.onclick=()=>{e?.removeAyat?.(b.dataset.l2RemoveAyat);renderL2AyatHistory();});
    byId('l2BackToday')?.addEventListener('click',renderVocabularyModule);
  }

  renderVocabularyModule=function(){
    const e=l2Engine(); const year=l2Year(); e?.ensureDailyContent?.(year);
    const rawDaily=e?.getDailyNewWords?.(10,year)||[];
    const daily=l2SafeVarietyWords(rawDaily,e,year,10);
    l2CurrentDisplayWords=daily;
    l2CurrentDisplayYear=year;
    const ayat=e?.getDailyAyat?.(5,year)||[]; const all=getVocabularyWords(); const stats=e?.curriculumStats?.(year)||{};
    openModuleScreen(`<span class="section-kicker">LANGKAH 2 · TAHUN ${year}</span><h1>🧠 Kosa Kata Hari Ini</h1>${l2YearSelector(year)}<p>Setiap hari kamu membuka Langkah 2, sistem memilih sehingga <strong>10 kosa kata/frasa yang pelbagai</strong> dan <strong>5 Ayat Cantik</strong>. Frasa yang terlalu serupa akan dipisahkan atau diganti dengan pilihan setara daripada Tahun yang sama.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap;margin:14px 0"><span class="section-kicker">Hari Ini ${daily.length}/10</span><span class="section-kicker">Dipelajari ${stats.unlockedWords||0}</span><span class="section-kicker">Dikuasai ${all.filter(w=>w.mastered).length}</span></div>
      ${daily.map(l2WordCard).join('')||'<div style="padding:18px;background:#eef9f3;border-radius:16px">🎉 Semua kandungan yang tersedia untuk tahap ini telah dibuka.</div>'}
      <h2 style="margin-top:28px">✨ 5 Ayat Cantik Hari Ini</h2><p>Ayat serba guna untuk membantu karangan menjadi lebih hidup dan matang.</p>${ayat.map(x=>l2AyatCard(x,e,true)).join('')||'<p>Tiada ayat baharu hari ini.</p>'}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px"><button id="l2All" class="secondary-button" type="button">📚 Semua Kosa Kata</button><button id="l2AyatHistory" class="secondary-button" type="button">✨ Koleksi Ayat</button></div>
      <button id="l2Review" class="primary-button" type="button" style="width:100%;margin-top:10px">🎯 Mula Ulang Kaji</button>
      <div style="margin-top:18px;padding:14px;background:#f7f5ff;border-radius:14px;color:#65727a">Master Bank: ${stats.totalEligibleWords||0} kosa kata/frasa tersedia untuk Tahun ${year} · ${stats.totalEligibleAyat||0} Ayat Cantik.</div>`,28);
    bindL2();
  };

  console.log("✅ Langkah 2 Year Selector UI v9.1 loaded");
})();

/* =========================================================
   KARANGAN AI — MASTER CURRICULUM v12.1
   FINAL LANGKAH 2 OWNER
   Data source:
     CurriculumDB.getVocabularyByYear(year)
     CurriculumDB.getAyatByYear(year)
   ========================================================= */
(() => {
  "use strict";

  const L2_VERSION = "12.2.2";
  const L2_DAILY_KEY = "karangan_ai_l2_master_v12_2_daily";


  function l2mInjectAnimationStyles() {
    if (document.getElementById("l2-master-v12-animation-styles")) return;

    const style = document.createElement("style");
    style.id = "l2-master-v12-animation-styles";
    style.textContent = `
      .l2m-card {
        opacity: 0;
        transform: translateY(18px) scale(.985);
        animation: l2mCardIn .52s cubic-bezier(.2,.8,.25,1) forwards;
        animation-delay: calc(var(--l2m-i, 0) * 55ms);
        will-change: transform, opacity;
      }

      .l2m-ayat-card {
        opacity: 0;
        transform: translateY(16px) scale(.99);
        animation: l2mAyatIn .48s cubic-bezier(.2,.8,.25,1) forwards;
        animation-delay: calc(var(--l2m-i, 0) * 65ms);
      }

      .l2m-master-badge {
        animation: l2mBadgePulse 1.8s ease-in-out infinite;
      }

      .l2m-year-button {
        transition: transform .16s ease, box-shadow .16s ease;
      }
      .l2m-year-button:active {
        transform: scale(.96);
      }

      .l2m-action {
        transition: transform .14s ease, box-shadow .14s ease;
      }
      .l2m-action:active {
        transform: scale(.95);
      }

      .l2m-card.is-mastered {
        box-shadow: 0 0 0 2px rgba(45,170,105,.12), 0 12px 28px rgba(45,170,105,.10);
      }

      .l2m-card.l2m-pop {
        animation: l2mMasterPop .55s cubic-bezier(.2,1.35,.35,1);
      }

      @keyframes l2mCardIn {
        from { opacity:0; transform:translateY(18px) scale(.985); }
        to { opacity:1; transform:translateY(0) scale(1); }
      }

      @keyframes l2mAyatIn {
        from { opacity:0; transform:translateY(16px) scale(.99); }
        to { opacity:1; transform:translateY(0) scale(1); }
      }

      @keyframes l2mBadgePulse {
        0%,100% { transform:scale(1); }
        50% { transform:scale(1.045); }
      }

      @keyframes l2mMasterPop {
        0% { transform:scale(1); }
        40% { transform:scale(1.035); }
        100% { transform:scale(1); }
      }

      @media (prefers-reduced-motion: reduce) {
        .l2m-card,.l2m-ayat-card,.l2m-master-badge {
          animation:none !important;
          opacity:1 !important;
          transform:none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function l2mDB() {
    return window.CurriculumDB || null;
  }

  function l2mEngine() {
    return window.KaranganVocabulary || null;
  }

  function l2mYear() {
    const e = l2mEngine();
    let y = Number(
      e?.getLearningYear?.() ||
      localStorage.getItem("karangan_ai_learning_year") ||
      1
    );
    if (![1,2,3,4,5,6].includes(y)) y = 1;
    return y;
  }

  function l2mSetYear(year) {
    const y = Number(year);
    if (![1,2,3,4,5,6].includes(y)) return;
    try { localStorage.setItem("karangan_ai_learning_year", String(y)); } catch (_) {}
    try { l2mEngine()?.setLearningYear?.(y); } catch (_) {}
  }

  function l2mEsc(v) {
    return String(v ?? "")
      .replace(/&/g,"&amp;")
      .replace(/</g,"&lt;")
      .replace(/>/g,"&gt;")
      .replace(/"/g,"&quot;")
      .replace(/'/g,"&#039;");
  }

  function l2mWords(year) {
    const db = l2mDB();
    if (!db?.ready) return [];
    return db.getVocabularyByYear(year).map(x => ({
      ...x,
      word: x.bm || "",
      translation: [x.zh, x.en].filter(Boolean).join(" · "),
      meaning: x.meaningBm || "",
      usage: x.writingUse || ""
    }));
  }

  function l2mAyat(year) {
    const db = l2mDB();
    if (!db?.ready) return [];
    return db.getAyatByYear(year);
  }

  function l2mDateKey() {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  }

  function l2mHash(seed) {
    let h = 2166136261;
    for (let i=0;i<seed.length;i++) {
      h ^= seed.charCodeAt(i);
      h = Math.imul(h,16777619);
    }
    return h >>> 0;
  }

  function l2mPick(list,count,seed) {
    const a = [...list];
    let s = l2mHash(seed) || 1;
    const rnd = () => {
      s ^= s << 13; s ^= s >>> 17; s ^= s << 5;
      return (s >>> 0) / 4294967296;
    };
    for (let i=a.length-1;i>0;i--) {
      const j = Math.floor(rnd()*(i+1));
      [a[i],a[j]]=[a[j],a[i]];
    }
    return a.slice(0,Math.min(count,a.length));
  }

  function l2mToday(year) {
    const allW = l2mWords(year);
    const allA = l2mAyat(year);
    const date = l2mDateKey();

    let state = {};
    try { state = JSON.parse(localStorage.getItem(L2_DAILY_KEY) || "{}"); } catch (_) {}

    state[year] ||= {};
    let rec = state[year][date];

    const wm = new Map(allW.map(x => [String(x.id), x]));
    const am = new Map(allA.map(x => [String(x.id), x]));

    const valid = rec &&
      Array.isArray(rec.w) &&
      Array.isArray(rec.a) &&
      rec.w.every(id => wm.has(String(id))) &&
      rec.a.every(id => am.has(String(id)));

    if (!valid) {
      rec = {
        w: l2mPick(allW,10,`${date}|${year}|v12.1|words`).map(x=>x.id),
        a: l2mPick(allA,5,`${date}|${year}|v12.1|ayat`).map(x=>x.id)
      };
      state[year][date] = rec;
      try { localStorage.setItem(L2_DAILY_KEY, JSON.stringify(state)); } catch (_) {}
    }

    return {
      words: rec.w.map(id => wm.get(String(id))).filter(Boolean),
      ayat: rec.a.map(id => am.get(String(id))).filter(Boolean)
    };
  }

  function l2mSpeak(text) {
    if (window.KaranganVoiceV5?.speak) {
      return window.KaranganVoiceV5.speak(text);
    }
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(String(text || ""));
    u.lang = "ms-MY";
    u.rate = .88;
    speechSynthesis.speak(u);
  }

  function l2mSaved(item) {
    try {
      return l2mEngine()?.findWord?.(item.bm || item.word) || null;
    } catch (_) {
      return null;
    }
  }

  function l2mWordCard(item, index = 0) {
    const saved = l2mSaved(item);
    const mastered = Boolean(saved?.mastered);

    return `
      <div class="l2m-card ${mastered ? "is-mastered" : ""}" style="--l2m-i:${index};padding:17px;border:1px solid #ece8e1;border-radius:20px;background:white;margin-bottom:12px">
        <div style="display:flex;justify-content:space-between;gap:10px;align-items:flex-start">
          <div>
            <div style="font-size:12px;font-weight:900;color:#6b55d9">
              ${l2mEsc(item.id)} · ${l2mEsc(item.category || item.taxonomy || "Kosa Kata")}
            </div>
            <div style="font-size:22px;font-weight:950;margin-top:4px">
              ${l2mEsc(item.bm)}
            </div>
          </div>
          <span class="l2m-master-badge" style="font-size:11px;font-weight:900;padding:5px 9px;border-radius:999px;background:${mastered ? "#e8f8ef" : "#f6f2ff"}">
            ${mastered ? "DIKUASAI" : "MASTER"}
          </span>
        </div>

        <div style="margin-top:8px;color:#6b55d9;font-weight:800">
          🇨🇳 ${l2mEsc(item.zh || "")}
        </div>

        <div style="margin-top:4px;color:#5f6a70">
          🇬🇧 ${l2mEsc(item.en || "")}
        </div>

        ${item.meaningBm ? `
          <div style="margin-top:10px;padding:10px 12px;border-radius:12px;background:#faf9f7">
            <strong>Makna BM:</strong> ${l2mEsc(item.meaningBm)}
          </div>
        ` : ""}

        ${item.example ? `
          <div style="margin-top:9px;line-height:1.55">
            <strong>Ayat Contoh:</strong> ${l2mEsc(item.example)}
          </div>
        ` : ""}

        ${item.writingUse ? `
          <div style="margin-top:7px;color:#65727a">
            <strong>Kegunaan Karangan:</strong> ${l2mEsc(item.writingUse)}
          </div>
        ` : ""}

        <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:12px">
          <button type="button" class="secondary-button l2m-action" data-l2m-speak="${l2mEsc(item.bm)}">
            🔊 Dengar
          </button>
          <button type="button" class="secondary-button l2m-action" data-l2m-master="${l2mEsc(item.id)}">
            ${mastered ? "✓ Sudah Kuasai" : "✓ Kuasai"}
          </button>
        </div>
      </div>
    `;
  }

  function l2mAyatCard(item, index = 0) {
    return `
      <div class="l2m-ayat-card" style="--l2m-i:${index};padding:17px;border:1px solid #f0dfbd;border-radius:20px;background:#fff8ea;margin-bottom:12px">
        <div style="font-size:12px;font-weight:900;color:#8c6a2e">
          ${l2mEsc(item.id)} · ${l2mEsc(item.function || "Ayat Cantik")}
        </div>
        <div style="font-size:19px;font-weight:900;line-height:1.55;margin-top:6px">
          ${l2mEsc(item.text || "")}
        </div>
        ${item.purpose ? `
          <div style="margin-top:8px;color:#6f6657">
            <strong>Fungsi:</strong> ${l2mEsc(item.purpose)}
          </div>
        ` : ""}
        <button type="button" class="secondary-button" data-l2m-speak="${l2mEsc(item.text || "")}" style="margin-top:10px">
          🔊 Dengar
        </button>
      </div>
    `;
  }

  function l2mShowMasterReward(masteredOn) {
    if (typeof showVocabularyReward === "function") {
      if (masteredOn) {
        showVocabularyReward(
          "good",
          vocabularyRewardState?.combo >= 5
            ? "🔥 Super Memory!"
            : "🌟 Syabas! Perkataan ini sudah kamu kuasai!",
          3
        );
      } else {
        showVocabularyReward(
          "encourage",
          "💪 Mari ulang kaji perkataan ini semula.",
          0
        );
      }
      return;
    }

    // Fallback animation if the legacy reward function is unavailable.
    document.getElementById("vocab-reward-overlay")?.remove();
    const overlay = document.createElement("div");
    overlay.id = "vocab-reward-overlay";
    overlay.innerHTML = `
      <div class="vocab-reward-pop is-good">
        <img class="vocab-reward-cartoon" src="${masteredOn ? "smart-hebat.png" : "smart-encourage.png"}" alt="SMART reward" />
        <div class="vocab-reward-title">${masteredOn ? "🌟 Syabas!" : "💪 Cuba lagi!"}</div>
      </div>
    `;
    document.body.appendChild(overlay);
    setTimeout(() => overlay.classList.add("show"), 20);
    setTimeout(() => overlay.classList.add("hide"), 1700);
    setTimeout(() => overlay.remove(), 2000);
  }

  function l2mBindCommon(year) {
    document.querySelectorAll("[data-l2m-speak]").forEach(button => {
      button.onclick = () => l2mSpeak(button.dataset.l2mSpeak);
    });

    document.querySelectorAll("[data-l2m-master]").forEach(button => {
      button.onclick = () => {
        const item = l2mWords(year).find(x => String(x.id) === String(button.dataset.l2mMaster));
        if (!item) return;

        const e = l2mEngine();
        let saved = l2mSaved(item);

        if (!saved) {
          const result = e?.addWord?.({
            word: item.bm,
            translation: [item.zh,item.en].filter(Boolean).join(" · "),
            meaning: item.meaningBm || "",
            example: item.example || "",
            category: item.category || item.taxonomy || "Kosa Kata",
            source: "curriculum-master-v12.2",
            emoji: "🧠"
          });
          saved = result?.word || l2mSaved(item);
        }

        if (saved) {
          const wasMastered = Boolean(saved.mastered);
          e?.markMastered?.(saved.id, !wasMastered);

          if (typeof vocabularyRewardState !== "undefined") {
            if (!wasMastered) {
              vocabularyRewardState.combo += 1;
              l2mShowMasterReward(true);
            } else {
              vocabularyRewardState.combo = 0;
              l2mShowMasterReward(false);
            }
          } else {
            l2mShowMasterReward(!wasMastered);
          }
        }

        setTimeout(() => window.renderVocabularyModule(), 650);
      };
    });
  }

  function l2mRenderAllWords(year) {
    const list = l2mWords(year);

    openModuleScreen(`
      <span class="section-kicker">MASTER CURRICULUM v${L2_VERSION}</span>
      <h1>📚 Semua Kosa Kata · Tahun ${year}</h1>

      <div style="padding:12px 14px;background:#eaf8f0;border-radius:14px;margin:12px 0 18px">
        ✅ Curriculum Master FINAL · <strong>${list.length}</strong> item
      </div>

      ${list.map(l2mWordCard).join("") || "<p>Tiada data.</p>"}

      <button id="l2mBackToday" class="primary-button" type="button" style="width:100%;margin-top:18px">
        ← Kembali ke Hari Ini
      </button>
    `, 28);

    l2mBindCommon(year);
    byId("l2mBackToday")?.addEventListener("click", window.renderVocabularyModule);
  }

  function l2mRender() {
    l2mInjectAnimationStyles();
    const db = l2mDB();

    if (!db?.ready) {
      openModuleScreen(`
        <span class="section-kicker">MASTER CURRICULUM v${L2_VERSION}</span>
        <h1>🧠 Kosa Kata</h1>
        <p>Sedang memuatkan Curriculum Master FINAL...</p>
      `,28);
      return;
    }

    const year = l2mYear();
    const today = l2mToday(year);
    const totalWords = l2mWords(year).length;
    const totalAyat = l2mAyat(year).length;

    openModuleScreen(`
      <span class="section-kicker">MASTER CURRICULUM v${L2_VERSION}</span>
      <h1>🧠 Kosa Kata Hari Ini</h1>

      <div style="padding:14px;background:#f7f5ff;border-radius:16px;margin:14px 0 18px">
        <div style="font-weight:900;margin-bottom:10px">🎓 Pilih Tahun</div>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:8px">
          ${[1,2,3,4,5,6].map(y => `
            <button
              type="button"
              data-l2m-year="${y}"
              class="${y === year ? "primary-button" : "secondary-button"} l2m-year-button"
            >
              Tahun ${y}
            </button>
          `).join("")}
        </div>
      </div>

      <div style="padding:12px 14px;background:#eaf8f0;border-radius:14px;margin-bottom:14px">
        ✅ <strong>Curriculum Master FINAL</strong> · Tahun ${year} · ${totalWords} Vocabulary/Frasa · ${totalAyat} Ayat Cantik
      </div>

      ${today.words.map(l2mWordCard).join("") || "<p>Tiada kosa kata.</p>"}

      <h2 style="margin-top:28px">✨ 5 Ayat Cantik Hari Ini</h2>
      ${today.ayat.map(l2mAyatCard).join("") || "<p>Tiada Ayat Cantik.</p>"}

      <div style="display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:18px">
        <button id="l2mAllWords" class="secondary-button" type="button">
          📚 Semua Kosa Kata
        </button>
        <button id="l2mReview" class="primary-button" type="button">
          🎯 Mula Ulang Kaji
        </button>
      </div>
    `,28);

    document.querySelectorAll("[data-l2m-year]").forEach(button => {
      button.onclick = () => {
        l2mSetYear(Number(button.dataset.l2mYear));
        window.renderVocabularyModule();
      };
    });

    l2mBindCommon(year);

    byId("l2mAllWords")?.addEventListener("click", () => {
      l2mRenderAllWords(year);
    });

    byId("l2mReview")?.addEventListener("click", () => {
      const review = today.words.slice(0,5).map(item => {
        const e = l2mEngine();
        let saved = l2mSaved(item);

        if (!saved) {
          const result = e?.addWord?.({
            word: item.bm,
            translation: [item.zh,item.en].filter(Boolean).join(" · "),
            meaning: item.meaningBm || "",
            example: item.example || "",
            category: item.category || item.taxonomy || "Kosa Kata",
            source: "curriculum-master-v12.2",
            emoji: "🧠"
          });
          saved = result?.word || l2mSaved(item);
        }

        return saved || {
          id: item.id,
          word: item.bm,
          translation: [item.zh,item.en].filter(Boolean).join(" · "),
          meaning: item.meaningBm || "",
          example: item.example || ""
        };
      });

      vocabularyRewardState.combo = 0;
      vocabularyReviewState = {
        words: review,
        index: 0,
        answered: false,
        year,
        active: true
      };
      renderVocabularyReviewCard();
    });
  }

  window.renderVocabularyModule = l2mRender;

  try {
    renderVocabularyModule = l2mRender;
  } catch (_) {}

  window.KaranganLangkah2Master = {
    version: L2_VERSION,
    render: l2mRender,
    getWords: l2mWords,
    getAyat: l2mAyat,
    source: "CurriculumDB"
  };

  console.log("✅ MASTER CURRICULUM v12.2.2 + FIXED 2S SMART ANIMATION loaded");
})();
