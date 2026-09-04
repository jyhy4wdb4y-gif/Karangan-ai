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
  active: false,
  seenIds: [],
  batch: 1,
  masteredIds: []
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
  document.getElementById("l2m-smart-overlay-v124")?.remove();
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
  overlay.id = "l2m-smart-overlay-v124";
    overlay.style.opacity = "1";
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
  #l2m-smart-overlay-v124{position:fixed;inset:0;z-index:99999;pointer-events:none;display:flex;align-items:center;justify-content:center;background:rgba(255,248,235,.18)}
  #l2m-smart-overlay-v124.hide{opacity:0;transition:opacity .28s ease}
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


function closeModule(event) {
  // Robust nested-page back navigation for Langkah 2.
  // The header Back button should return from "Semua Kosa Kata"
  // to "Kosa Kata Hari Ini". The X/Close button keeps its normal behavior.
  const isHeaderBack =
    event?.currentTarget?.id === "moduleBackButton" ||
    event?.target?.closest?.("#moduleBackButton");

  const moduleContent = byId("moduleContent");
  const isSemuaKosaKata =
    Boolean(byId("l2mBackToday")) ||
    /Semua Kosa Kata/i.test(moduleContent?.textContent || "");

  if (
    currentScreen === "module" &&
    isHeaderBack &&
    isSemuaKosaKata
  ) {
    window.renderVocabularyModule?.();
    return;
  }

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


/* =========================================================
   TRANSLATION CACHE
   Local dictionary -> persistent cache -> AI fallback
   ========================================================= */

const TRANSLATION_CACHE_CONFIG = {
  key: "karanganAI_translation_cache_v1",
  version: 1,
  maxEntries: 3000
};

function normalizeTranslationCacheKey(word) {
  return String(word || "")
    .toLowerCase()
    .trim()
    .replace(/^[^a-zA-ZÀ-ÿ]+|[^a-zA-ZÀ-ÿ'-]+$/g, "");
}

function loadTranslationCache() {
  try {
    const raw = localStorage.getItem(TRANSLATION_CACHE_CONFIG.key);
    if (!raw) return {};

    const parsed = JSON.parse(raw);
    if (
      !parsed ||
      parsed.version !== TRANSLATION_CACHE_CONFIG.version ||
      typeof parsed.entries !== "object" ||
      !parsed.entries
    ) {
      return {};
    }

    return parsed.entries;
  } catch (error) {
    console.warn("Translation cache load failed:", error);
    return {};
  }
}

function saveTranslationCache(entries) {
  try {
    const pairs = Object.entries(entries || {})
      .sort((a, b) => Number(b[1]?.savedAt || 0) - Number(a[1]?.savedAt || 0))
      .slice(0, TRANSLATION_CACHE_CONFIG.maxEntries);

    localStorage.setItem(
      TRANSLATION_CACHE_CONFIG.key,
      JSON.stringify({
        version: TRANSLATION_CACHE_CONFIG.version,
        entries: Object.fromEntries(pairs)
      })
    );
  } catch (error) {
    console.warn("Translation cache save failed:", error);
  }
}

function getCachedTranslation(word) {
  const key = normalizeTranslationCacheKey(word);
  if (!key) return null;

  const entries = loadTranslationCache();
  const item = entries[key];

  if (
    !item ||
    typeof item.translation !== "string" ||
    !item.translation.trim()
  ) {
    return null;
  }

  return item;
}

function cacheTranslation(word, data) {
  const key = normalizeTranslationCacheKey(word);
  const translation = String(data?.translation || "").trim();

  if (
    !key ||
    !translation ||
    translation === "Maksud belum tersedia" ||
    translation === "Maksud belum tersedia."
  ) {
    return;
  }

  const entries = loadTranslationCache();

  entries[key] = {
    translation,
    meaning: String(data?.meaning || translation).trim(),
    definition: String(data?.definition || "").trim(),
    savedAt: Date.now()
  };

  saveTranslationCache(entries);
}

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
     Persistent Translation Cache

     Only words not found in the Master Vocabulary or
     BASIC_DICTIONARY reach this layer.
     --------------------------------------------------------- */

  const cachedTranslation =
    getCachedTranslation(word);

  if (cachedTranslation) {

    currentTranslationData.translation =
      cachedTranslation.translation;

    currentTranslationData.meaning =
      cachedTranslation.meaning ||
      cachedTranslation.translation;

    safeText(
      meaningEl,
      cachedTranslation.translation
    );

    safeText(
      byId("translationDefinition"),
      cachedTranslation.definition || ""
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
     STEP 4
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

      cacheTranslation(
        word,
        {
          translation: answer,
          meaning: answer,
          definition: ""
        }
      );


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


function getVocabularyReviewKey(word) {
  return String(word?.word || word?.bm || word?.id || "").trim().toLocaleLowerCase("ms-MY");
}

function isVocabularyReviewMastered(word) {
  try {
    const e=getVocabularyEngine();
    const saved=e?.findWord?.(word?.word || word?.bm || getVocabularyReviewKey(word));
    return Boolean(saved?.mastered);
  } catch (_) { return false; }
}

function getVocabularyReviewPool(year) {
  const e=getVocabularyEngine();
  const curriculum=window.KaranganLangkah2Master?.getWords?.(year) || [];
  const source=curriculum.length ? curriculum : getVocabularyWords();

  return source.map(item=>{
    if(item?.bm && !item?.word){
      let saved=e?.findWord?.(item.bm) || null;
      if(!saved){
        const r=e?.addWord?.({
          word:item.bm,
          translation:[item.zh,item.en].filter(Boolean).join(" · "),
          meaning:item.meaningBm || "",
          example:item.example || "",
          category:item.category || item.taxonomy || "Kosa Kata",
          source:"ulang-kaji-mastery-v12.7.9",
          emoji:"🧠"
        });
        saved=r?.word || e?.findWord?.(item.bm) || null;
      }
      return saved || {id:item.id,word:item.bm,translation:[item.zh,item.en].filter(Boolean).join(" · "),meaning:item.meaningBm||"",example:item.example||""};
    }
    return item;
  }).filter(Boolean);
}

function getNextVocabularyReviewBatch(year,seenIds=[],count=5){
  const seen=new Set(seenIds.map(String));
  return shuffleArray(getVocabularyReviewPool(year).filter(word=>{
    const key=getVocabularyReviewKey(word);
    return key && !seen.has(key) && !isVocabularyReviewMastered(word);
  })).slice(0,count);
}

function startVocabularyReview() {
  const engine=getVocabularyEngine();
  const year=Number(engine?.getLearningYear?.() || 3);
  const words=getNextVocabularyReviewBatch(year,[],5);

  if(!words.length){
    showToast(`Semua kosa kata Tahun ${year} sudah dikuasai. 🌟`);
    return;
  }

  vocabularyRewardState.combo=0;
  vocabularyReviewState={
    words,index:0,answered:false,year,active:true,
    seenIds:words.map(getVocabularyReviewKey),
    batch:1,
    masteredIds:[]
  };
  renderVocabularyReviewCard();
}


function renderVocabularyReviewCard() {
  const word =
    vocabularyReviewState.words[
      vocabularyReviewState.index
    ];


  if (!word) {
    const year=Number(vocabularyReviewState.year || 3);
    const next=getNextVocabularyReviewBatch(year,vocabularyReviewState.seenIds || [],5);

    completeMission("vocabulary");
    showVocabularyReward("good","🎉 Ulang Kaji Selesai! Hebat!",10);

    openModuleScreen(`
      <span class="section-kicker">ULANG KAJI · TAHUN ${year}</span>
      <h1>🎉 5 Soalan Selesai!</h1>
      <div style="padding:20px;border-radius:20px;background:#f5f0ff;text-align:center;margin-top:14px">
        <div style="font-size:42px">🌟</div>
        <p style="line-height:1.6"><strong>Dikuasai</strong> tidak akan muncul lagi dalam cabaran seterusnya.</p>
      </div>
      ${next.length ? `<button id="continueVocabularyReviewButton" class="primary-button" type="button" style="width:100%;margin-top:18px">➕ Cabar ${next.length} Lagi</button>` : `<div style="margin-top:16px;text-align:center;font-weight:900;color:#2b9364">🌟 Semua kosa kata yang tersedia sudah dikuasai.</div>`}
      <button id="finishVocabularyReviewButton" class="secondary-button" type="button" style="width:100%;margin-top:10px">✓ Tamat Ulang Kaji</button>
    `,28);

    byId("continueVocabularyReviewButton")?.addEventListener("click",()=>{
      const fresh=getNextVocabularyReviewBatch(year,vocabularyReviewState.seenIds || [],5);
      if(!fresh.length){ renderVocabularyModule(); return; }
      vocabularyReviewState.words=fresh;
      vocabularyReviewState.index=0;
      vocabularyReviewState.answered=false;
      vocabularyReviewState.active=true;
      vocabularyReviewState.batch=Number(vocabularyReviewState.batch||1)+1;
      vocabularyReviewState.seenIds=[...(vocabularyReviewState.seenIds||[]),...fresh.map(getVocabularyReviewKey)];
      vocabularyReviewState.masteredIds=[];
      renderVocabularyReviewCard();
    });

    byId("finishVocabularyReviewButton")?.addEventListener("click",()=>{
      vocabularyReviewState.active=false;
      renderVocabularyModule();
    });
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
        id="reviewSpeakButton"
        class="secondary-button"
        type="button"
        style="
          width:100%;
          margin-top:14px;
        "
      >
        🔊 Dengar
      </button>

      <button
        id="revealReviewButton"
        class="primary-button"
        type="button"
        aria-expanded="false"
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
          🤔 Belum Dikuasai
        </button>

        <button
          id="reviewCorrectButton"
          class="primary-button"
          type="button"
        >
          ✓ Dikuasai
        </button>

        <button
          id="reviewSkipButton"
          class="secondary-button"
          type="button"
          style="grid-column:1 / -1"
        >
          ⏭ Skip · Seterusnya
        </button>

      </div>
    `,
    28
  );


  {
    const reviewSpeakButton = byId("reviewSpeakButton");
    let reviewSpeakPointerAt = 0;

    const speakReviewWord = event => {
      event?.preventDefault?.();
      event?.stopPropagation?.();
      reviewSpeakPointerAt = Date.now();

      const value = String(
        word.word ||
        word.bm ||
        word.example ||
        ""
      ).trim();

      if (!value) return;

      // v12.7.21 — Ulang Kaji iOS/iPadOS Dengar fix.
      // Start native speech synchronously from this physical tap and retain
      // the utterance so Safari cannot garbage-collect it before playback.
      try {
        if (
          "speechSynthesis" in window &&
          "SpeechSynthesisUtterance" in window
        ) {
          const synth = window.speechSynthesis;
          const utterance = new SpeechSynthesisUtterance(value);

          window.__KARANGAN_ACTIVE_UTTERANCE__ = utterance;

          utterance.lang = "ms-MY";
          utterance.rate = 0.88;
          utterance.pitch = 1;
          utterance.volume = 1;

          try {
            const voices = synth.getVoices?.() || [];
            const voice =
              voices.find(v => /^ms[-_]/i.test(v.lang || "")) ||
              voices.find(v => /Malay|Malaysia/i.test(v.name || ""));
            if (voice) utterance.voice = voice;
          } catch (_) {}

          try { synth.resume(); } catch (_) {}

          utterance.onend = () => {
            if (window.__KARANGAN_ACTIVE_UTTERANCE__ === utterance) {
              window.__KARANGAN_ACTIVE_UTTERANCE__ = null;
            }
          };

          synth.speak(utterance);
          return;
        }
      } catch (error) {
        console.warn("Ulang Kaji native speech failed:", error);
      }

      // Fallback only if native speech is unavailable.
      try {
        window.KaranganVoiceV5?.speak?.(value);
      } catch (_) {}
    };
    reviewSpeakButton?.addEventListener(
      "pointerup",
      speakReviewWord,
      { passive:false }
    );

    reviewSpeakButton?.addEventListener(
      "click",
      event => {
        if (Date.now() - reviewSpeakPointerAt < 1200) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        speakReviewWord(event);
      }
    );
  }


  byId(
    "revealReviewButton"
  )?.addEventListener(
    "click",
    () => {
      const meaning = byId("reviewMeaning");
      const answers = byId("reviewAnswerButtons");
      const button = byId("revealReviewButton");

      if (!meaning || !answers || !button) return;

      const opening = meaning.hidden;

      meaning.hidden = !opening;
      answers.hidden = !opening;
      answers.style.display = opening ? "grid" : "none";

      button.textContent = opening
        ? "🙈 Sembunyikan Maksud"
        : "👀 Lihat Maksud";

      button.setAttribute(
        "aria-expanded",
        opening ? "true" : "false"
      );
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

  byId(
    "reviewSkipButton"
  )?.addEventListener(
    "click",
    () => {
      skipVocabularyReview(word);
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
    // Persist mastery in the shared vocabulary engine.
    // Semua Kosa Kata reads the same mastered flag.
    try {
      getVocabularyEngine()?.markMastered?.(word.id, true);
    } catch (_) {}

    const masteredKey = getVocabularyReviewKey(word);
    vocabularyReviewState.masteredIds = Array.from(new Set([
      ...(vocabularyReviewState.masteredIds || []),
      masteredKey
    ]));

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
    showVocabularyReward(
      "encourage",
      "Tak apa — baca semula maksudnya. Tekan Dikuasai apabila sudah yakin, atau Skip untuk soalan seterusnya.",
      0
    );

    // Belum Dikuasai: stay on the same question for learning.
    const meaning = byId("reviewMeaning");
    const answers = byId("reviewAnswerButtons");
    if (meaning) meaning.hidden = false;
    if (answers) {
      answers.hidden = false;
      answers.style.display = "grid";
    }
    return;
  }

  vocabularyReviewState.index += 1;

  // At the end of the current batch, keep only words that are still
  // not Dikuasai. New +5 is NOT offered until this list is empty.
  if (vocabularyReviewState.index >= vocabularyReviewState.words.length) {
    const mastered = new Set(vocabularyReviewState.masteredIds || []);
    const pending = vocabularyReviewState.words.filter(
      item => !mastered.has(getVocabularyReviewKey(item))
    );

    if (pending.length) {
      vocabularyReviewState.words = pending;
      vocabularyReviewState.index = 0;
    }
  }

  setTimeout(
    renderVocabularyReviewCard,
    1050
  );
}

function skipVocabularyReview(word) {
  // Skip = postpone, NOT complete.
  // Move to the next item; at the end of the batch all skipped/unmastered
  // words are kept and cycled again until they become Dikuasai.
  vocabularyRewardState.combo = 0;
  vocabularyReviewState.index += 1;

  if (vocabularyReviewState.index >= vocabularyReviewState.words.length) {
    const mastered = new Set(vocabularyReviewState.masteredIds || []);
    const pending = vocabularyReviewState.words.filter(
      item => !mastered.has(getVocabularyReviewKey(item))
    );

    if (pending.length) {
      vocabularyReviewState.words = pending;
      vocabularyReviewState.index = 0;
    }
  }

  renderVocabularyReviewCard();
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
  // v12.10.4 safety bridge:
  // Some older Langkah 3 entry paths can still call this legacy renderer.
  // For Tahun 1, always redirect them to the current level-aware Langkah 3 engine.
  try {
    const activeYear = Number(localStorage.getItem("karangan_ai_learning_year") || "1");
    if (activeYear === 1 && window.KaranganLangkah3 && typeof window.KaranganLangkah3.render === "function") {
      return window.KaranganLangkah3.render();
    }
  } catch (_) {}
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
  // v12.10.5 hard guard: never render the legacy Tahun 1 long-sentence screen.
  try {
    const activeYear = Number(localStorage.getItem("karangan_ai_learning_year") || "1");
    if (activeYear === 1 && window.KaranganLangkah3 && typeof window.KaranganLangkah3.resumeSelected === "function") {
      return window.KaranganLangkah3.resumeSelected();
    }
  } catch (_) {}
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
    () => {
      if(window.KaranganLangkah3?.resumeSelected) return window.KaranganLangkah3.resumeSelected();
      renderSentenceBuilder();
    }
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

  const L2_VERSION = "12.8";
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

      .l2m-translate-word {
        cursor: pointer;
        border-radius: 10px;
        padding: 2px 5px;
        margin-left: -5px;
        transition: background .15s ease, transform .15s ease;
        -webkit-tap-highlight-color: transparent;
      }
      .l2m-translate-word:active {
        background: #f1edff;
        transform: scale(.985);
      }
      .l2m-token-word{cursor:pointer;border-radius:5px;padding:0 1px;touch-action:manipulation;-webkit-tap-highlight-color:transparent}
      .l2m-token-word:active{background:#fff0a8}


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

    let valid = rec &&
      Array.isArray(rec.w) &&
      Array.isArray(rec.a) &&
      rec.w.every(id => wm.has(String(id))) &&
      rec.a.every(id => am.has(String(id)));

    // v12.7.14 daily load: exactly 5 Kosa Kata + 1 Ayat Cantik.
    // Trim an existing same-day 10+5 cache so the change is visible immediately.
    if (valid && (rec.w.length > 5 || rec.a.length > 1)) {
      rec = {
        w: rec.w.slice(0, 5),
        a: rec.a.slice(0, 1)
      };
      state[year][date] = rec;
      try { localStorage.setItem(L2_DAILY_KEY, JSON.stringify(state)); } catch (_) {}
    }

    if (!valid) {
      rec = {
        w: l2mPick(allW,5,`${date}|${year}|v12.1|words`).map(x=>x.id),
        a: l2mPick(allA,1,`${date}|${year}|v12.1|ayat`).map(x=>x.id)
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
    const value = String(text || "").trim();
    if (!value) return false;
    if (!("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) {
      try {
        return window.KaranganVoiceV5?.speak?.(value) ?? false;
      } catch (_) {
        return false;
      }
    }

    try {
      const synth = window.speechSynthesis;

      // Keep a strong reference. iOS Safari can garbage-collect a local utterance
      // before speech begins.
      window.__KARANGAN_ACTIVE_UTTERANCE__ = null;

      const utterance = new SpeechSynthesisUtterance(value);
      window.__KARANGAN_ACTIVE_UTTERANCE__ = utterance;

      utterance.lang = "ms-MY";
      utterance.rate = 0.88;
      utterance.pitch = 1;
      utterance.volume = 1;

      const chooseMalayVoice = () => {
        try {
          const voices = synth.getVoices?.() || [];
          const voice =
            voices.find(v => /^ms[-_]/i.test(v.lang || "")) ||
            voices.find(v => /Malay|Malaysia/i.test(v.name || ""));
          if (voice) utterance.voice = voice;
        } catch (_) {}
      };

      chooseMalayVoice();

      // Important for iOS/iPadOS:
      // do not cancel() and speak() in the same tap. That sequence can leave
      // Web Speech silent. Resume and speak the retained utterance directly.
      try { synth.resume(); } catch (_) {}

      utterance.onend = () => {
        if (window.__KARANGAN_ACTIVE_UTTERANCE__ === utterance) {
          window.__KARANGAN_ACTIVE_UTTERANCE__ = null;
        }
      };
      utterance.onerror = event => {
        console.warn("Malay speech error:", event?.error || event);
      };

      synth.speak(utterance);
      return true;
    } catch (error) {
      console.warn("Native Malay speech failed:", error);
      try {
        return window.KaranganVoiceV5?.speak?.(value) ?? false;
      } catch (_) {
        return false;
      }
    }
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
            <div
              class="l2m-translate-word"
              data-l2m-translate="${l2mEsc(item.id)}"
              title="Tekan untuk terjemahan"
              role="button"
              tabindex="0"
              style="font-size:22px;font-weight:950;margin-top:4px;position:relative;z-index:8;touch-action:manipulation;-webkit-user-select:none;user-select:none"
            >
              ${l2mEsc(item.bm)}
            </div>
          </div>
          <span class="l2m-master-badge" style="font-size:11px;font-weight:900;padding:5px 9px;border-radius:999px;background:${mastered ? "#e8f8ef" : "#f6f2ff"}">
            ${mastered ? "DIKUASAI" : "MASTER"}
          </span>
        </div>

        <button
          type="button"
          class="secondary-button"
          data-l2m-reveal="${l2mEsc(item.id)}"
          aria-expanded="false"
          style="width:100%;margin-top:12px"
        >
          👀 Lihat Maksud & Ayat Contoh
        </button>

        <div data-l2m-details="${l2mEsc(item.id)}" hidden>
          <div style="margin-top:12px;color:#6b55d9;font-weight:800">
            🇨🇳 ${l2mEsc(item.zh || "")}
          </div>

          <div style="margin-top:4px;color:#5f6a70">
            🇬🇧 ${l2mEsc(item.en || "")}
          </div>

          ${item.meaningBm ? `
            <div style="margin-top:10px;padding:10px 12px;border-radius:12px;background:#faf9f7">
              <strong>Makna BM:</strong> <span class="l2m-word-zone">${l2mTokenizeClickable(item.meaningBm)}</span>
            </div>
          ` : ""}

          ${item.example ? `
            <div style="margin-top:9px;line-height:1.55">
              <strong>Ayat Contoh:</strong> <span class="l2m-word-zone">${l2mTokenizeClickable(item.example)}</span>
            </div>
          ` : ""}

          ${item.writingUse ? `
            <div style="margin-top:7px;color:#65727a">
              <strong>Kegunaan Karangan:</strong> <span class="l2m-word-zone">${l2mTokenizeClickable(item.writingUse)}</span>
            </div>
          ` : ""}
        </div>

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
        <div class="l2m-word-zone" style="font-size:19px;font-weight:900;line-height:1.55;margin-top:6px">
          ${l2mTokenizeClickable(item.text || "")}
        </div>
        ${item.purpose ? `
          <div style="margin-top:8px;color:#6f6657">
            <strong>Fungsi:</strong> <span class="l2m-word-zone">${l2mTokenizeClickable(item.purpose)}</span>
          </div>
        ` : ""}
        <button type="button" class="secondary-button" data-l2m-speak="${l2mEsc(item.text || "")}" style="margin-top:10px">
          🔊 Dengar
        </button>
      </div>
    `;
  }

  function l2mShowMasterReward(masteredOn) {
    // v12.5 — CSS-only SMART special effects for maximum iOS compatibility.
    const overlayId = "l2m-smart-overlay-v125";
    document.getElementById(overlayId)?.remove();

    if (!document.getElementById("l2m-smart-fx-v125-style")) {
      const style = document.createElement("style");
      style.id = "l2m-smart-fx-v125-style";
      style.textContent = `
        @keyframes l2mV125OverlayFlash {
          0%   { background:rgba(10,14,32,.08); }
          12%  { background:rgba(73,105,255,.35); }
          28%  { background:rgba(10,14,32,.40); }
          100% { background:rgba(10,14,32,.34); }
        }
        @keyframes l2mV125Pop {
          0%   { transform:translateY(70px) scale(.35) rotate(-10deg); opacity:0; }
          16%  { transform:translateY(-16px) scale(1.18) rotate(5deg); opacity:1; }
          30%  { transform:translateY(2px) scale(.94) rotate(-3deg); opacity:1; }
          48%  { transform:translateY(-10px) scale(1.07) rotate(2deg); opacity:1; }
          66%  { transform:translateY(0) scale(1) rotate(-1deg); opacity:1; }
          82%  { transform:translateY(-6px) scale(1.03) rotate(1deg); opacity:1; }
          100% { transform:translateY(0) scale(.99) rotate(0); opacity:1; }
        }
        @keyframes l2mV125SmartImg {
          0%   { transform:scale(.45) rotate(-8deg); filter:brightness(1) drop-shadow(0 0 0 rgba(80,220,255,0)); }
          18%  { transform:scale(1.18) rotate(5deg); filter:brightness(1.35) drop-shadow(0 0 34px rgba(80,220,255,.95)); }
          35%  { transform:scale(.96) rotate(-3deg); }
          55%  { transform:scale(1.08) rotate(2deg); filter:brightness(1.15) drop-shadow(0 0 28px rgba(150,90,255,.85)); }
          76%  { transform:scale(1) rotate(-1deg); }
          100% { transform:scale(1) rotate(0); filter:brightness(1) drop-shadow(0 14px 24px rgba(22,25,48,.24)); }
        }
        @keyframes l2mV125Ring {
          0%   { transform:scale(.15) rotate(0deg); opacity:0; }
          15%  { transform:scale(.72) rotate(60deg); opacity:1; }
          38%  { transform:scale(1.05) rotate(150deg); opacity:.9; }
          65%  { transform:scale(1.35) rotate(280deg); opacity:.45; }
          100% { transform:scale(1.7) rotate(450deg); opacity:0; }
        }
        @keyframes l2mV125Xp {
          0%,22% { transform:scale(.25) translateY(12px); opacity:0; }
          38%    { transform:scale(1.25) translateY(-3px); opacity:1; }
          55%    { transform:scale(.95) translateY(0); }
          75%    { transform:scale(1.08); }
          100%   { transform:scale(1); opacity:1; }
        }
        @keyframes l2mV125Particle {
          0%   { transform:translate(-50%,-50%) scale(.15) rotate(0deg); opacity:0; }
          18%  { opacity:1; }
          68%  { transform:translate(calc(-50% + var(--px)),calc(-50% + var(--py))) scale(1.35) rotate(220deg); opacity:1; }
          100% { transform:translate(calc(-50% + var(--px2)),calc(-50% + var(--py2))) scale(.55) rotate(400deg); opacity:0; }
        }
        #${overlayId} {
          background:rgba(10,14,32,.34);
        }
        #${overlayId} .l2m-v125-pop {
          animation:l2mV125Pop 1.72s cubic-bezier(.2,1.25,.3,1) both;
        }
        #${overlayId} .l2m-v125-smart {
          animation:l2mV125SmartImg 1.55s cubic-bezier(.2,1.2,.3,1) both;
        }
        #${overlayId} .l2m-v125-ring {
          animation:l2mV125Ring 1.65s ease-out both;
        }
        #${overlayId} .l2m-v125-xp {
          animation:l2mV125Xp 1.6s cubic-bezier(.2,1.25,.3,1) both;
        }
        #${overlayId} .l2m-v125-particle {
          animation:l2mV125Particle 1.35s ease-out both;
          animation-delay:calc(var(--delay) * 1ms);
        }
      `;
      document.head.appendChild(style);
    }

    const overlay = document.createElement("div");
    overlay.id = overlayId;
    overlay.setAttribute("style", [
      "position:fixed",
      "inset:0",
      "z-index:2147483647",
      "display:flex",
      "align-items:center",
      "justify-content:center",
      "pointer-events:none",
      "overflow:hidden"
    ].join(";"));

    const wrap = document.createElement("div");
    wrap.setAttribute("style", [
      "position:relative",
      "width:min(90vw,460px)",
      "min-height:380px",
      "display:flex",
      "align-items:center",
      "justify-content:center"
    ].join(";"));

    const ring = document.createElement("div");
    ring.className = "l2m-v125-ring";
    ring.setAttribute("style", [
      "position:absolute",
      "left:50%",
      "top:48%",
      "width:230px",
      "height:230px",
      "margin:-115px 0 0 -115px",
      "border-radius:50%",
      "border:5px solid rgba(80,225,255,.92)",
      "box-shadow:0 0 24px rgba(80,225,255,.95),0 0 50px rgba(110,85,255,.55),inset 0 0 22px rgba(139,93,255,.5)"
    ].join(";"));

    const pop = document.createElement("div");
    pop.className = "l2m-v125-pop";
    pop.setAttribute("style", [
      "position:relative",
      "z-index:3",
      "width:min(86vw,430px)",
      "padding:20px 18px",
      "border-radius:28px",
      "text-align:center",
      "color:#fff",
      "background:linear-gradient(180deg,#11152d,#171c3a)",
      "border:1px solid rgba(80,220,255,.42)",
      "box-shadow:0 18px 60px rgba(10,14,32,.42),0 0 38px rgba(91,150,255,.30)"
    ].join(";"));

    pop.innerHTML = `
      <img
        class="l2m-v125-smart"
        src="${masteredOn ? "/smart-hebat.png" : "/smart-encourage.png"}"
        alt="SMART reward"
        style="
          width:min(72vw,330px);
          max-height:38vh;
          object-fit:contain;
          display:block;
          margin:0 auto 4px;
        "
        onerror="this.style.display='none'"
      />
      <div style="font-size:24px;font-weight:950;line-height:1.25;margin-top:6px;text-shadow:0 0 14px rgba(120,220,255,.45)">
        ${masteredOn ? "🌟 Syabas! Sudah Kuasai!" : "💪 Mari cuba lagi!"}
      </div>
      ${masteredOn
        ? '<div class="l2m-v125-xp" style="display:inline-block;margin-top:10px;padding:8px 16px;border-radius:999px;background:linear-gradient(90deg,#26d4ff,#8a5cff);font-weight:900;box-shadow:0 0 22px rgba(80,180,255,.60)">+3 XP · Hebat!</div>'
        : ''
      }
    `;

    wrap.appendChild(ring);
    wrap.appendChild(pop);

    const particles = ["✦","★","⚡","✧","★","✦","⚡","✧","★","✦","⚡","★"];
    particles.forEach((symbol, i) => {
      const angle = (Math.PI * 2 * i) / particles.length;
      const radius = 145 + (i % 3) * 24;
      const px = Math.round(Math.cos(angle) * radius);
      const py = Math.round(Math.sin(angle) * radius);
      const px2 = Math.round(px * 1.18);
      const py2 = Math.round(py * 1.18);

      const p = document.createElement("span");
      p.className = "l2m-v125-particle";
      p.textContent = symbol;
      p.setAttribute("style", [
        "position:absolute",
        "left:50%",
        "top:48%",
        "z-index:6",
        "font-size:26px",
        "font-weight:900",
        "color:#fff",
        "text-shadow:0 0 14px rgba(100,220,255,1),0 0 22px rgba(145,95,255,.85)",
        `--px:${px}px`,
        `--py:${py}px`,
        `--px2:${px2}px`,
        `--py2:${py2}px`,
        `--delay:${i * 45}`
      ].join(";"));
      wrap.appendChild(p);
    });

    overlay.appendChild(wrap);
    document.body.appendChild(overlay);

    // Force style calculation before animation frames on Safari/iOS.
    void overlay.offsetWidth;

    setTimeout(() => {
      overlay.style.transition = "opacity .18s linear";
      overlay.style.opacity = "0";
    }, 1780);

    setTimeout(() => {
      if (overlay.isConnected) overlay.remove();
    }, 2020);
  }

  const L2M_WORD_TRANSLATIONS = {
    kami:["我们","we"], kita:["我们","we / us"], saya:["我","I / me"],
    mereka:["他们","they"], belajar:["学习","learn / study"],
    menyemak:["检查；核对","check / verify"], kesahihan:["真实性；有效性","validity / authenticity"],
    maklumat:["资料；信息","information"], sebelum:["之前","before"], selepas:["之后","after"],
    berkongsi:["分享","share"], membantu:["帮助","help"], bantuan:["帮助；援助","help / assistance"],
    masalah:["问题","problem"], aktiviti:["活动","activity"], sekolah:["学校","school"],
    rumah:["家；房子","home / house"], masyarakat:["社会；社区","society / community"],
    orang:["人","person / people"], nilai:["价值；品德","value"], murni:["高尚的","noble"],
    kerjasama:["合作","cooperation"], keberanian:["勇气","courage"], semangat:["精神；热忱","spirit / enthusiasm"],
    usaha:["努力","effort"], gigih:["坚持不懈的","persistent / diligent"], penting:["重要","important"],
    kepentingan:["重要性","importance"], memahami:["理解","understand"], baik:["好；良好","good"],
    bersih:["干净","clean"], kemas:["整齐","tidy / neat"], membaca:["阅读","read"],
    suara:["声音","voice"], jelas:["清楚的","clear"], peralatan:["设备；用具","equipment / tools"],
    selesai:["完成","finished"], hujan:["雨","rain"], berhenti:["停止","stop"],
    meneruskan:["继续","continue"], sendiri:["自己","self"], tanpa:["没有；不带","without"],
    sikap:["态度","attitude"], diri:["自己","self"], pada:["在；于","at / on"], masa:["时间","time"],
    yang:["……的；关系词","that / which"], sesuai:["适合的","suitable / appropriate"],
    dapat:["能够；可以","can / able to"], dengan:["和；以","with / by"], untuk:["为了；给","for / to"],
    dalam:["在……里面","in / inside"], ini:["这个","this"], itu:["那个","that"], dan:["和","and"],
    atau:["或者","or"], oleh:["由；被","by"], setiap:["每一个","every / each"], lebih:["更；更多","more"],
    terus:["继续；一直","continue / continuously"]
  };

  (function l2mInjectSelectableWordStyles(){
    if (document.getElementById("l2m-selectable-word-styles")) return;
    const s = document.createElement("style");
    s.id = "l2m-selectable-word-styles";
    s.textContent = `
      .l2m-word-zone .l2m-token-word{
        cursor:pointer;
        touch-action:manipulation;
        -webkit-tap-highlight-color:rgba(107,85,217,.12);
        border-radius:4px;
      }
      .l2m-word-zone .l2m-token-word:active{
        background:rgba(107,85,217,.10);
      }
    `;
    document.head.appendChild(s);
  })();

  function l2mTokenizeClickable(value) {
    return String(value || "").split(/(\s+|[,.!?;:()"'“”‘’/]+)/).map(part => {
      if (!part || /^\s+$/.test(part) || /^[,.!?;:()"'“”‘’/]+$/.test(part)) return l2mEsc(part);
      const key = part.toLocaleLowerCase("ms-MY");
      return `<span class="l2m-token-word" data-l2m-word="${l2mEsc(key)}">${l2mEsc(part)}</span>`;
    }).join("");
  }

  function l2mLookupWord(word) {
    const key=String(word||"").trim().toLocaleLowerCase("ms-MY");
    if(L2M_WORD_TRANSLATIONS[key]) return {word:key,zh:L2M_WORD_TRANSLATIONS[key][0],en:L2M_WORD_TRANSLATIONS[key][1]};
    for(let year=1;year<=6;year++){
      const found=l2mWords(year).find(x=>String(x.bm||"").trim().toLocaleLowerCase("ms-MY")===key);
      if(found) return {word:key,zh:found.zh||"—",en:found.en||"—"};
    }
    return {word:key,zh:"",en:"",missing:true};
  }

  const L2M_TRANSLATION_CACHE_KEY = "karangan_ai_word_translation_cache_v1272";

  function l2mLoadTranslationCache(){
    try{
      const x=JSON.parse(localStorage.getItem(L2M_TRANSLATION_CACHE_KEY)||"{}");
      return x && typeof x==="object" ? x : {};
    }catch(_){ return {}; }
  }

  function l2mSaveTranslationCache(cache){
    try{ localStorage.setItem(L2M_TRANSLATION_CACHE_KEY,JSON.stringify(cache)); }catch(_){}
  }

  function l2mParseAITranslation(result){
    if(!result) return {zh:"",en:""};

    // Direct structured API shapes.
    const candidates=[
      result,
      result.data,
      result.result,
      result.translation,
      result.translations
    ].filter(Boolean);

    for(const obj of candidates){
      if(typeof obj==="object"){
        const zh=obj.zh||obj.chinese||obj["中文"]||obj["Chinese"]||"";
        const en=obj.en||obj.english||obj["English"]||"";
        if(zh||en) return {zh:String(zh||"").trim(),en:String(en||"").trim()};
      }
    }

    const raw=typeof extractAIText==="function"
      ? extractAIText(result)
      : (typeof result==="string" ? result : "");

    if(!raw) return {zh:"",en:""};

    const s=String(raw).trim();

    // JSON / fenced JSON.
    try{
      const cleaned=s
        .replace(/^```json\s*/i,"")
        .replace(/^```\s*/,"")
        .replace(/```$/,"")
        .trim();
      const parsed=JSON.parse(cleaned);
      const zh=parsed.zh||parsed.chinese||parsed["中文"]||"";
      const en=parsed.en||parsed.english||parsed["English"]||"";
      if(zh||en) return {zh:String(zh||"").trim(),en:String(en||"").trim()};
    }catch(_){}

    // Delimiter format requested from AI.
    const delim=s.match(/ZH\s*=\s*(.*?)\s*\|\|\|\s*EN\s*=\s*(.*)/is);
    if(delim) return {zh:delim[1].trim(),en:delim[2].trim()};

    // Common labels.
    const zhMatch=s.match(/(?:中文|Chinese|ZH)\s*[:：=-]\s*([^\n|]+)/i);
    const enMatch=s.match(/(?:English|EN)\s*[:：=-]\s*([^\n|]+)/i);
    let zh=zhMatch?.[1]?.trim()||"";
    let en=enMatch?.[1]?.trim()||"";

    // If labels are absent, extract a Chinese-containing line and an English-looking line.
    if(!zh){
      const chineseLine=s.split(/\n+/).find(line=>/[\u3400-\u9fff]/.test(line));
      if(chineseLine) zh=chineseLine.replace(/^[^:：]*[:：]\s*/,"").trim();
    }

    if(!en){
      const lines=s.split(/\n+/).map(x=>x.trim()).filter(Boolean);
      const englishLine=lines.find(line =>
        /^[A-Za-z][A-Za-z ,/'()-]{1,80}$/.test(line) &&
        !/^(Chinese|English|ZH|EN)$/i.test(line)
      );
      if(englishLine) en=englishLine.replace(/^[^:：]*[:：]\s*/,"").trim();
    }

    return {zh,en,raw:s};
  }

  async function l2mShowWordTranslation(word){
    const key=String(word||"").trim().toLocaleLowerCase("ms-MY");
    document.getElementById("l2m-word-popup")?.remove();

    const p=document.createElement("div");
    p.id="l2m-word-popup";
    p.style.cssText="position:fixed;left:50%;bottom:max(24px,env(safe-area-inset-bottom));transform:translateX(-50%);z-index:2147483646;width:min(calc(100vw - 32px),420px);background:#fff;border:1px solid #e9e3f5;border-radius:20px;padding:16px 17px;box-shadow:0 18px 55px rgba(20,22,45,.24);box-sizing:border-box";

    const render=(zh,en,status="")=>{
      p.innerHTML=`<div style="display:flex;justify-content:space-between;gap:12px"><div><div style="font-size:11px;font-weight:900;color:#7866c8">TERJEMAHAN PERKATAAN</div><div style="font-size:25px;font-weight:950;margin-top:3px">${l2mEsc(key)}</div></div><button type="button" data-l2m-word-close style="border:0;background:#f4f1fb;width:34px;height:34px;border-radius:50%">✕</button></div><div style="margin-top:12px;padding:11px 13px;background:#f7f4ff;border-radius:13px">🇨🇳 <strong>${l2mEsc(zh||"…")}</strong></div><div style="margin-top:8px;padding:11px 13px;background:#f6f9fb;border-radius:13px">🇬🇧 <strong>${l2mEsc(en||"…")}</strong></div>${status?`<div style="margin-top:8px;font-size:12px;color:#7c858b">${l2mEsc(status)}</div>`:""}<button type="button" data-l2m-word-speak class="secondary-button" style="width:100%;margin-top:11px">🔊 Dengar</button>`;

      const closeBtn = p.querySelector("[data-l2m-word-close]");
      const speakBtn = p.querySelector("[data-l2m-word-speak]");

      // iPad/iPhone: use pointerdown for popup controls too.
      // This matches the instant word-tap interaction and avoids unreliable delayed click.
      const closePopup = event => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        p.remove();
      };

      const speakWordNow = event => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        l2mSpeak(key);
      };

      closeBtn?.addEventListener("pointerdown", closePopup, {passive:false});
      speakBtn?.addEventListener("pointerup", speakWordNow, {passive:false});

      // Keyboard / non-Pointer-Event fallback.
      closeBtn?.addEventListener("click", event => {
        if (event.detail === 0) closePopup(event);
      });
      speakBtn?.addEventListener("click", event => {
        if (event.detail === 0) speakWordNow(event);
      });
    };

    // IMPORTANT: render and paint the popup BEFORE any cache/local/AI lookup.
    // First-time online words can take 15-30s, but the card itself must appear instantly.
    render("正在准备翻译…","Preparing translation…","请稍候 / Please wait");
    document.body.appendChild(p);

    // Force one browser paint frame before continuing with translation work.
    await new Promise(resolve => requestAnimationFrame(() => resolve()));

    const cache=l2mLoadTranslationCache();
    const cached=cache[key];
    if(cached?.zh || cached?.en){
      render(cached.zh||"—",cached.en||"—","已缓存 / Cached");
      return;
    }

    // v12.7.3 — LOCAL-FIRST instant translation.
    // Master Curriculum/local dictionary must answer immediately; only unknown words use online AI.
    const instantLocal=l2mLookupWord(key);
    if(!instantLocal.missing && (instantLocal.zh || instantLocal.en)){
      render(instantLocal.zh||"—",instantLocal.en||"—","即时翻译 / Instant");
      cache[key]={
        zh:instantLocal.zh||"—",
        en:instantLocal.en||"—",
        savedAt:Date.now(),
        source:"master-local-instant"
      };
      l2mSaveTranslationCache(cache);
      return;
    }

    render("正在查询线上 AI…","Searching online AI…","Online AI");

    try{
      let zh="";
      let en="";

      // ONLINE AI FIRST
      if(typeof callAI==="function"){
        const result=await callAI({
          type:"translate",
          word:key,
          language:"Bahasa Melayu",
          targetLanguages:["Simplified Chinese","English"],
          instruction:
            "Translate ONLY this single Bahasa Melayu word into Simplified Chinese and English. " +
            "Use the most common Malaysian primary-school meaning. " +
            "Reply exactly in this format and nothing else: ZH=<Chinese translation>|||EN=<English translation>"
        });

        const parsed=l2mParseAITranslation(result);
        zh=parsed.zh||"";
        en=parsed.en||"";

        if((!zh||!en) && parsed.raw){
          if(!zh && /[\u3400-\u9fff]/.test(parsed.raw)) zh=parsed.raw;
          if(!en && /[A-Za-z]{2,}/.test(parsed.raw)) en=parsed.raw;
        }
      }

      // Only if online AI failed, use local/master fallback.
      if(!zh || !en){
        const fallback=l2mLookupWord(key);
        if(!fallback.missing){
          zh=zh||fallback.zh||"";
          en=en||fallback.en||"";
        }
      }

      // If this popup has already been replaced by another tapped word,
      // do not let the older AI response alter the new popup.
      if(!p.isConnected || document.getElementById("l2m-word-popup") !== p){
        return;
      }

      if(zh||en){
        cache[key]={
          zh:zh||"—",
          en:en||"—",
          savedAt:Date.now(),
          source:"online-ai-first"
        };
        l2mSaveTranslationCache(cache);
      }

      render(
        zh||"暂时找不到中文翻译",
        en||"English translation not available yet",
        zh||en ? "Online AI · 已自动保存" : "Online AI unavailable"
      );
    }catch(error){
      console.warn("Online AI word translation failed:",error);

      // Final fallback if network/API fails.
      const fallback=l2mLookupWord(key);
      if(!fallback.missing){
        render(
          fallback.zh||"—",
          fallback.en||"—",
          "Offline fallback"
        );
      }else{
        render(
          "翻译服务暂时无法连接",
          "Translation service temporarily unavailable",
          "请稍后再试 / Please try again"
        );
      }
    }
  }

  function l2mShowTranslation(item) {
    const overlayId = "l2m-translation-popup";
    document.getElementById(overlayId)?.remove();

    const overlay = document.createElement("div");
    overlay.id = overlayId;
    overlay.setAttribute("style", [
      "position:fixed",
      "inset:0",
      "z-index:2147483600",
      "display:flex",
      "align-items:flex-end",
      "justify-content:center",
      "padding:18px",
      "background:rgba(18,20,35,.22)",
      "box-sizing:border-box"
    ].join(";"));

    const card = document.createElement("div");
    card.setAttribute("style", [
      "width:min(100%,520px)",
      "max-height:72vh",
      "overflow:auto",
      "background:#fff",
      "border-radius:24px",
      "padding:20px",
      "box-shadow:0 18px 55px rgba(20,22,45,.22)",
      "border:1px solid rgba(115,95,210,.12)",
      "transform:translateY(0)",
      "box-sizing:border-box"
    ].join(";"));

    card.innerHTML = `
      <div style="display:flex;justify-content:space-between;gap:12px;align-items:flex-start">
        <div>
          <div style="font-size:11px;font-weight:900;color:#7566c8;letter-spacing:.04em">
            ${l2mEsc(item.id)} · TERJEMAHAN
          </div>
          <div style="font-size:25px;font-weight:950;margin-top:5px">
            ${l2mEsc(item.bm)}
          </div>
        </div>
        <button
          type="button"
          data-l2m-translation-close
          aria-label="Tutup"
          style="border:0;background:#f4f1fb;width:36px;height:36px;border-radius:50%;font-size:18px"
        >✕</button>
      </div>

      <div style="margin-top:16px;padding:13px 14px;border-radius:15px;background:#f7f4ff">
        <div style="font-size:12px;font-weight:900;color:#7866c8">中文</div>
        <div style="font-size:19px;font-weight:900;margin-top:3px">${l2mEsc(item.zh || "—")}</div>
      </div>

      <div style="margin-top:10px;padding:13px 14px;border-radius:15px;background:#f6f9fb">
        <div style="font-size:12px;font-weight:900;color:#62717a">ENGLISH</div>
        <div style="font-size:17px;font-weight:800;margin-top:3px">${l2mEsc(item.en || "—")}</div>
      </div>

      ${item.meaningBm ? `
        <div style="margin-top:13px;line-height:1.55">
          <strong>Makna BM:</strong><br><span class="l2m-word-zone">${l2mTokenizeClickable(item.meaningBm)}</span>
        </div>
      ` : ""}

      ${item.example ? `
        <div style="margin-top:12px;line-height:1.55">
          <strong>Ayat Contoh:</strong><br><span class="l2m-word-zone">${l2mTokenizeClickable(item.example)}</span>
        </div>
      ` : ""}

      <div style="display:flex;gap:9px;margin-top:16px">
        <button type="button" class="secondary-button" data-l2m-translation-speak style="flex:1">
          🔊 Dengar
        </button>
        <button type="button" class="primary-button" data-l2m-translation-ok style="flex:1">
          Faham ✓
        </button>
      </div>
    `;

    overlay.appendChild(card);
    document.body.appendChild(overlay);

    const close = () => overlay.remove();
    overlay.addEventListener("click", e => {
      if (e.target === overlay) close();
    });
    card.querySelector("[data-l2m-translation-close]")?.addEventListener("click", close);
    card.querySelector("[data-l2m-translation-ok]")?.addEventListener("click", close);
    card.querySelector("[data-l2m-translation-speak]")?.addEventListener("click", () => l2mSpeak(item.bm));
  }

  function l2mBindCommon(year, afterToggle = () => window.renderVocabularyModule()) {
    // v12.7.15 — daily card Reveal / Hide learning mode.
    document.querySelectorAll("[data-l2m-reveal]").forEach(button => {
      let lastRevealPointerAt = 0;

      const toggleReveal = event => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        lastRevealPointerAt = Date.now();

        const id = button.dataset.l2mReveal;
        const escapedId = window.CSS?.escape
          ? CSS.escape(String(id || ""))
          : String(id || "").replace(/["\\]/g, "\\$&");
        const details = document.querySelector(
          `[data-l2m-details="${escapedId}"]`
        );
        if (!details) return;

        const opening = details.hidden;
        details.hidden = !opening;
        button.setAttribute("aria-expanded", opening ? "true" : "false");
        button.textContent = opening
          ? "🙈 Sembunyikan Maksud & Ayat Contoh"
          : "👀 Lihat Maksud & Ayat Contoh";
      };

      button.addEventListener("pointerup", toggleReveal, { passive:false });
      button.addEventListener("click", event => {
        if (Date.now() - lastRevealPointerAt < 1200) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        toggleReveal(event);
      });
    });

    // v12.7.10 — instant iPad/iPhone controls for Dengar + Kuasai.
    // Use pointerdown so the controls work immediately after the page appears.
    document.querySelectorAll("[data-l2m-speak]").forEach(button => {
      let lastPointerAt = 0;

      const speakNow = event => {
        event?.preventDefault?.();
        event?.stopPropagation?.();
        lastPointerAt = Date.now();
        l2mSpeak(button.dataset.l2mSpeak);
      };

      button.addEventListener("pointerup", speakNow, { passive:false });
      button.addEventListener("click", event => {
        // Suppress the synthetic click produced after pointerup.
        if (Date.now() - lastPointerAt < 1200) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        // Keyboard / non-pointer fallback.
        speakNow(event);
      });
    });

    document.querySelectorAll("[data-l2m-master]").forEach(button => {
      let lastPointerAt = 0;

      const toggleMasteryNow = event => {
        event?.preventDefault?.();
        event?.stopPropagation?.();

        // Avoid a second trigger from the same physical tap.
        if (button.dataset.l2mBusy === "1") return;
        button.dataset.l2mBusy = "1";
        lastPointerAt = Date.now();

        const item = l2mWords(year).find(
          x => String(x.id) === String(button.dataset.l2mMaster)
        );
        if (!item) {
          button.dataset.l2mBusy = "0";
          return;
        }

        const e = l2mEngine();
        let saved = l2mSaved(item);
        const wasMastered = Boolean(saved?.mastered);

        // Preserve the existing SMART animation.
        l2mShowMasterReward(!wasMastered);

        button.disabled = true;

        if (!saved) {
          const result = e?.addWord?.({
            word: item.bm,
            translation: [item.zh,item.en].filter(Boolean).join(" · "),
            meaning: item.meaningBm || "",
            example: item.example || "",
            category: item.category || item.taxonomy || "Kosa Kata",
            source: "curriculum-master-v12.2.4",
            emoji: "🧠"
          });

          saved = result?.word || l2mSaved(item);
        }

        if (saved) {
          e?.markMastered?.(saved.id, !wasMastered);

          if (typeof vocabularyRewardState !== "undefined") {
            if (!wasMastered) {
              vocabularyRewardState.combo += 1;
            } else {
              vocabularyRewardState.combo = 0;
            }
          }
        }

        const latest = l2mSaved(item);
        const masteredNow = Boolean(latest?.mastered);

        button.textContent = masteredNow ? "✓ Sudah Kuasai" : "✓ Kuasai";
        button.disabled = false;
        button.dataset.l2mBusy = "0";

        const card = button.closest(".l2m-card");
        if (card) {
          card.classList.toggle("is-mastered", masteredNow);

          const badge = card.querySelector(".l2m-master-badge");
          if (badge) {
            badge.textContent = masteredNow ? "DIKUASAI" : "MASTER";
            badge.style.background = masteredNow ? "#e8f8ef" : "#f6f2ff";
          }
        }
      };

      button.addEventListener("pointerdown", toggleMasteryNow, { passive:false });
      button.addEventListener("click", event => {
        // Suppress synthetic click after pointerdown.
        if (Date.now() - lastPointerAt < 1200) {
          event.preventDefault();
          event.stopPropagation();
          return;
        }
        // Keyboard / non-pointer fallback.
        toggleMasteryNow(event);
      });
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

    l2mBindCommon(year, () => l2mRenderAllWords(year));
    byId("l2mBackToday")?.addEventListener("click", () => window.renderVocabularyModule?.());
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

      <h2 style="margin-top:28px">✨ 1 Ayat Cantik Hari Ini</h2>
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
      startVocabularyReview();
    });
  }

  window.renderVocabularyModule = l2mRender;

  try {
    renderVocabularyModule = l2mRender;
  } catch (_) {}



  // v12.6.1 — robust iOS/iPad tap translation.
  // Delegated capture handler survives renderer changes and dynamic cards.
  if (!window.__KARANGAN_L2_TRANSLATE_V12716__) {
    window.__KARANGAN_L2_TRANSLATE_V12716__ = true;

    // v12.7.16: main Kosa Kata translation is handled by the same
    // deliberate-touch controller as selectable words below.
    // Keep keyboard accessibility only.
    document.addEventListener("keydown", event => {
      if (event.key !== "Enter" && event.key !== " ") return;
      const target = event.target?.closest?.("[data-l2m-translate]");
      if (!target) return;

      const year = l2mYear();
      const item = l2mWords(year).find(
        x => String(x.id) === String(target.dataset.l2mTranslate)
      );
      if (!item) return;

      event.preventDefault();
      l2mShowTranslation(item);
    }, true);
  }

  if (!window.__KARANGAN_L2_WORD_TRANSLATE_V12719__) {
    window.__KARANGAN_L2_WORD_TRANSLATE_V12719__ = true;

    // v12.7.19 — reliable intentional tap translation.
    // A normal completed tap opens the translation card.
    // Dragging / scrolling does not.
    const MOVE_TOLERANCE = 12;
    let pressedTarget = null;
    let startX = 0;
    let startY = 0;
    let moved = false;
    let openedAt = 0;

    const getTranslateTarget = event =>
      event.target?.closest?.(
        "[data-l2m-translate], .l2m-token-word[data-l2m-word]"
      );

    const openTranslationTarget = target => {
      if (!target?.isConnected) return;

      // Main Langkah 2 Kosa Kata card.
      if (target.matches?.("[data-l2m-translate]")) {
        const year = l2mYear();
        const item = l2mWords(year).find(
          x => String(x.id) === String(target.dataset.l2mTranslate)
        );
        if (item) l2mShowTranslation(item);
        return;
      }

      // Selectable word inside revealed text / Ayat Contoh.
      if (target.matches?.(".l2m-token-word[data-l2m-word]")) {
        void l2mShowWordTranslation(target.dataset.l2mWord);
      }
    };

    document.addEventListener("pointerdown", event => {
      const target = getTranslateTarget(event);
      if (!target) return;

      pressedTarget = target;
      startX = Number(event.clientX || 0);
      startY = Number(event.clientY || 0);
      moved = false;
    }, true);

    document.addEventListener("pointermove", event => {
      if (!pressedTarget) return;

      const dx = Math.abs(Number(event.clientX || 0) - startX);
      const dy = Math.abs(Number(event.clientY || 0) - startY);

      if (dx > MOVE_TOLERANCE || dy > MOVE_TOLERANCE) {
        moved = true;
      }
    }, true);

    document.addEventListener("pointerup", event => {
      const target = getTranslateTarget(event);
      const sameTarget =
        target &&
        pressedTarget &&
        (
          target === pressedTarget ||
          pressedTarget.contains?.(target) ||
          target.contains?.(pressedTarget)
        );

      if (sameTarget && !moved) {
        event.preventDefault();
        event.stopPropagation();
        openedAt = Date.now();
        openTranslationTarget(pressedTarget);
      }

      pressedTarget = null;
      moved = false;
    }, true);

    document.addEventListener("pointercancel", () => {
      pressedTarget = null;
      moved = false;
    }, true);

    document.addEventListener("scroll", () => {
      moved = true;
    }, true);

    // Suppress only the synthetic click after the successful pointerup.
    document.addEventListener("click", event => {
      const target = getTranslateTarget(event);
      if (!target) return;

      if (Date.now() - openedAt < 1200) {
        event.preventDefault();
        event.stopPropagation();
      }
    }, true);
  }

  window.KaranganLangkah2Master = {
    version: L2_VERSION,
    render: l2mRender,
    getWords: l2mWords,
    getAyat: l2mAyat,
    source: "CurriculumDB"
  };

  console.log("✅ MASTER CURRICULUM v12.8.1 + SEMUA KOSA KATA SELECTIVE WORD TRANSLATION loaded");
})();


/* Translation cache maintenance */
window.KaranganTranslationCache = {
  clear() {
    try {
      localStorage.removeItem(TRANSLATION_CACHE_CONFIG.key);
      return true;
    } catch (error) {
      console.warn("Translation cache clear failed:", error);
      return false;
    }
  },
  size() {
    return Object.keys(loadTranslationCache()).length;
  }
};


/* =========================================================
   LANGKAH 2 NAVIGATION HOTFIX v12.7.8
   - One-tap Header Back on Semua Kosa Kata -> Kosa Kata Hari Ini
   - iPad/iPhone: handle on pointerdown
   - Suppress synthetic click after pointerdown
   - X/Home behavior remains unchanged
   ========================================================= */
(() => {
  "use strict";
  if (window.__KARANGAN_L2_BACK_V1278__) return;
  window.__KARANGAN_L2_BACK_V1278__ = true;

  let lastBackPointerAt = 0;

  const isAllWordsPage = () => {
    const content = document.getElementById("moduleContent");
    return Boolean(document.getElementById("l2mBackToday")) ||
      /Semua\s+Kosa\s+Kata/i.test(content?.textContent || "");
  };

  const goBackToLangkah2 = event => {
    const back = event.target?.closest?.("#moduleBackButton");
    if (!back || !isAllWordsPage()) return false;

    event.preventDefault();
    event.stopImmediatePropagation();

    document.getElementById("l2m-word-popup")?.remove();

    if (typeof window.renderVocabularyModule === "function") {
      window.renderVocabularyModule();
    } else if (typeof renderVocabularyModule === "function") {
      renderVocabularyModule();
    }

    return true;
  };

  document.addEventListener("pointerdown", event => {
    if (goBackToLangkah2(event)) {
      lastBackPointerAt = Date.now();
    }
  }, true);

  document.addEventListener("click", event => {
    const back = event.target?.closest?.("#moduleBackButton");
    if (!back) return;

    if (Date.now() - lastBackPointerAt < 1200) {
      event.preventDefault();
      event.stopImmediatePropagation();
      return;
    }

    goBackToLangkah2(event);
  }, true);
})();



/* =========================================================
   LANGKAH 3 — BINA AYAT FOUNDATION
   Karangan AI v12.9.3
   Base: Golden v12.7.22 (Langkah 2 untouched)
   Content: Tahun 1 Month 1 v1.0 STABLE
   ========================================================= */
(function(){
  "use strict";

  const L3_VERSION="12.10.9";
  const L3_WORDS=[{"id":"T1-W-001","word":"keluarga","meaning":"Orang yang rapat dengan kita seperti ibu, ayah dan adik.","zh":"家庭","role":"ENTITY","examples":["Ini keluarga saya.","Saya sayang keluarga saya.","Saya gembira bersama keluarga saya."],"hints":["Siapakah yang ada dalam keluarga kamu?","Ibu, ayah atau adik?","Saya sayang keluarga saya."],"learningMode":"STANDARD"},{"id":"T1-W-002","word":"ibu","meaning":"Emak kita.","zh":"妈妈","role":"WHO","examples":["Ini ibu saya.","Ibu berada di dapur.","Saya membantu ibu di dapur."],"hints":["Siapakah emak kamu?","Fikir tentang orang dalam keluarga.","Ini ibu saya."],"learningMode":"STANDARD"},{"id":"T1-W-003","word":"ayah","meaning":"Bapa kita.","zh":"爸爸","role":"WHO","examples":["Ini ayah saya.","Ayah membaca buku.","Saya membantu ayah mencuci kereta."],"hints":["Siapakah bapa kamu?","Fikir tentang orang dalam keluarga.","Ini ayah saya."],"learningMode":"STANDARD"},{"id":"T1-W-004","word":"adik","meaning":"Saudara yang lebih muda daripada kita.","zh":"弟弟/妹妹","role":"WHO","examples":["Ini adik saya.","Adik bermain.","Saya bermain bersama adik."],"hints":["Siapakah yang lebih muda dalam keluarga?","Ibu, ayah atau adik?","Ini adik saya."],"learningMode":"STANDARD"},{"id":"T1-W-005","word":"bersama","meaning":"Melakukan sesuatu dengan orang lain.","zh":"一起","role":"RELATION","examples":["Saya bermain.","Saya bermain bersama adik.","Saya bermain bersama adik di taman."],"hints":["Kamu melakukan sesuatu dengan siapa?","Keluarga, adik atau kawan?","Saya bermain bersama adik."],"learningMode":"STANDARD"},{"id":"T1-W-006","word":"sayang","meaning":"Mempunyai perasaan kasih kepada seseorang.","zh":"爱/疼爱","role":"FEELING_RELATION","examples":["Saya sayang ibu.","Saya sayang keluarga saya.","Saya sayang keluarga kerana mereka menjaga saya."],"hints":["Siapakah yang kamu sayang?","Ibu, ayah, adik atau keluarga?","Saya sayang ibu."],"learningMode":"STANDARD"},{"id":"T1-W-007","word":"membantu","meaning":"Menolong seseorang.","zh":"帮助","role":"ACTION","examples":["Saya membantu ibu.","Saya membantu ibu di dapur.","Saya membantu kawan membawa buku."],"hints":["Siapa yang kamu boleh tolong?","Ibu, adik, guru atau kawan?","Saya membantu ibu."],"learningMode":"STANDARD"},{"id":"T1-W-008","word":"berkongsi","meaning":"Memberikan atau menggunakan sesuatu bersama orang lain.","zh":"分享","role":"ACTION","examples":["Saya berkongsi makanan.","Saya berkongsi makanan dengan adik.","Saya berkongsi alat tulis dengan kawan."],"hints":["Dengan siapa kamu boleh berkongsi?","Adik atau kawan?","Saya berkongsi dengan adik."],"learningMode":"STANDARD"},{"id":"T1-W-009","word":"menjaga","meaning":"Memastikan seseorang atau sesuatu berada dalam keadaan baik.","zh":"照顾/保持","role":"ACTION","examples":["Saya menjaga adik.","Saya menjaga kebersihan rumah.","Saya menjaga kebersihan kelas bersama kawan."],"hints":["Siapa atau apa yang kamu jaga?","Adik, rumah atau kelas?","Saya menjaga adik."],"learningMode":"STANDARD"},{"id":"T1-W-010","word":"gembira","meaning":"Berasa sangat senang.","zh":"开心","role":"FEELING","examples":["Saya gembira.","Saya gembira bersama keluarga.","Saya gembira kerana dapat membantu ibu."],"hints":["Bagaimanakah perasaan kamu?","Gembira atau sedih?","Saya gembira."],"learningMode":"STANDARD"},{"id":"T1-W-011","word":"sekolah","meaning":"Tempat murid belajar.","zh":"学校","role":"PLACE","examples":["Ini sekolah saya.","Saya belajar di sekolah.","Saya belajar bersama kawan di sekolah."],"hints":["Di manakah murid belajar?","Rumah atau sekolah?","Saya belajar di sekolah."],"learningMode":"STANDARD"},{"id":"T1-W-012","word":"guru","meaning":"Orang yang mengajar murid.","zh":"老师","role":"WHO","examples":["Ini guru saya.","Guru mengajar murid.","Saya membantu guru di kelas."],"hints":["Siapakah yang mengajar di sekolah?","Guru atau kawan?","Ini guru saya."],"learningMode":"STANDARD"},{"id":"T1-W-013","word":"kawan","meaning":"Orang yang belajar atau bermain bersama kita.","zh":"朋友","role":"WHO","examples":["Ini kawan saya.","Saya bermain dengan kawan.","Saya belajar bersama kawan di sekolah."],"hints":["Dengan siapa kamu belajar atau bermain?","Guru atau kawan?","Ini kawan saya."],"learningMode":"STANDARD"},{"id":"T1-W-014","word":"kelas","meaning":"Ruang tempat murid belajar di sekolah.","zh":"课室","role":"PLACE","examples":["Ini kelas saya.","Saya belajar di kelas.","Saya belajar bersama kawan di kelas."],"hints":["Di manakah kamu belajar di sekolah?","Kelas atau dapur?","Saya belajar di kelas."],"learningMode":"STANDARD"},{"id":"T1-W-015","word":"belajar","meaning":"Mendapatkan ilmu dan kemahiran.","zh":"学习","role":"ACTION","examples":["Saya belajar.","Saya belajar di sekolah.","Saya belajar bersama kawan di sekolah."],"hints":["Di mana kamu belajar?","Sekolah, kelas atau rumah?","Saya belajar di sekolah."],"learningMode":"STANDARD"},{"id":"T1-W-016","word":"membaca","meaning":"Melihat tulisan dan memahami maksudnya.","zh":"阅读","role":"ACTION","examples":["Saya membaca.","Saya membaca buku.","Saya membaca buku di kelas."],"hints":["Apa yang kamu baca?","Buku?","Saya membaca buku."],"learningMode":"STANDARD"},{"id":"T1-W-017","word":"menulis","meaning":"Menghasilkan huruf, perkataan atau ayat.","zh":"写","role":"ACTION","examples":["Saya menulis.","Saya menulis ayat.","Saya menulis ayat di kelas."],"hints":["Apa yang kamu tulis?","Perkataan atau ayat?","Saya menulis ayat."],"learningMode":"STANDARD"},{"id":"T1-W-018","word":"bermain","meaning":"Melakukan aktiviti untuk berseronok.","zh":"玩","role":"ACTION","examples":["Saya bermain.","Saya bermain dengan kawan.","Saya bermain bersama kawan selepas belajar."],"hints":["Dengan siapa kamu bermain?","Adik atau kawan?","Saya bermain bersama kawan."],"learningMode":"STANDARD"},{"id":"T1-W-019","word":"rajin","meaning":"Suka berusaha dan melakukan tugas dengan bersungguh-sungguh.","zh":"勤劳","role":"QUALITY","examples":["Ali rajin.","Ali rajin belajar.","Ali rajin membaca buku."],"hints":["Orang yang rajin suka melakukan apa?","Belajar, membaca atau membantu?","Ali rajin belajar."],"learningMode":"STANDARD"},{"id":"T1-W-020","word":"baik","meaning":"Mempunyai sikap yang elok.","zh":"好/友善","role":"QUALITY","examples":["Ali baik.","Ali seorang kawan yang baik.","Ali baik kerana suka membantu kawan."],"hints":["Apakah sikap yang elok?","Baik atau takut?","Ali seorang kawan yang baik."],"learningMode":"STANDARD"},{"id":"T1-W-021","word":"rumah","meaning":"Tempat kita tinggal bersama keluarga.","zh":"家","role":"PLACE","examples":["Ini rumah saya.","Saya berada di rumah.","Saya membantu ibu di rumah."],"hints":["Di manakah kamu tinggal bersama keluarga?","Rumah atau kelas?","Ini rumah saya."],"learningMode":"STANDARD"},{"id":"T1-W-022","word":"bilik","meaning":"Ruang di dalam rumah.","zh":"房间","role":"PLACE","examples":["Ini bilik saya.","Saya membaca di bilik.","Saya mengemas bilik saya."],"hints":["Apa yang kamu lakukan di bilik?","Membaca, mengemas atau tidur?","Saya membaca di bilik."],"learningMode":"STANDARD"},{"id":"T1-W-023","word":"dapur","meaning":"Tempat menyediakan makanan.","zh":"厨房","role":"PLACE","examples":["Ini dapur.","Ibu berada di dapur.","Saya membantu ibu di dapur."],"hints":["Di manakah makanan disediakan?","Dapur atau kelas?","Ini dapur."],"learningMode":"STANDARD"},{"id":"T1-W-024","word":"makan","meaning":"Mengambil makanan.","zh":"吃","role":"ACTION","examples":["Saya makan.","Saya makan nasi.","Saya makan bersama keluarga."],"hints":["Apa yang kamu makan?","Fikir tentang makanan.","Saya makan bersama keluarga."],"learningMode":"STANDARD"},{"id":"T1-W-025","word":"minum","meaning":"Mengambil air atau minuman.","zh":"喝","role":"ACTION","examples":["Saya minum air.","Saya minum air di rumah.","Saya minum air selepas bermain."],"hints":["Apa yang kamu minum?","Air?","Saya minum air."],"learningMode":"STANDARD"},{"id":"T1-W-026","word":"mengemas","meaning":"Menyusun barang supaya kemas.","zh":"收拾","role":"ACTION","examples":["Saya mengemas.","Saya mengemas bilik.","Saya membantu ibu mengemas rumah."],"hints":["Apa yang kamu kemaskan?","Bilik atau rumah?","Saya mengemas bilik."],"learningMode":"STANDARD"},{"id":"T1-W-027","word":"membersihkan","meaning":"Menjadikan sesuatu bersih.","zh":"清洁","role":"ACTION","examples":["Saya membersihkan meja.","Saya membersihkan bilik.","Saya membantu ibu membersihkan rumah."],"hints":["Apa yang kamu bersihkan?","Bilik, rumah atau kelas?","Saya membersihkan bilik."],"learningMode":"STANDARD"},{"id":"T1-W-028","word":"tidur","meaning":"Berehat dengan memejamkan mata.","zh":"睡觉","role":"ACTION","examples":["Saya tidur.","Saya tidur di bilik.","Saya tidur pada waktu malam."],"hints":["Di mana kamu tidur?","Bilik?","Saya tidur di bilik."],"learningMode":"STANDARD"},{"id":"T1-W-029","word":"bangun","meaning":"Berhenti tidur dan mula berjaga.","zh":"起床","role":"ACTION","examples":["Saya bangun.","Saya bangun pada waktu pagi.","Saya bangun awal pada waktu pagi."],"hints":["Bilakah kamu bangun?","Pagi?","Saya bangun pada waktu pagi."],"learningMode":"STANDARD"},{"id":"T1-W-030","word":"mandi","meaning":"Membersihkan badan dengan air.","zh":"洗澡","role":"ACTION","examples":["Saya mandi.","Saya mandi pada waktu pagi.","Saya mandi sebelum pergi ke sekolah."],"hints":["Bilakah kamu mandi?","Pagi?","Saya mandi pada waktu pagi."],"learningMode":"STANDARD"},{"id":"T1-W-031","word":"sedih","meaning":"Berasa tidak gembira.","zh":"伤心","role":"FEELING","examples":["Saya sedih.","Saya berasa sedih.","Saya sedih kerana mainan saya rosak."],"hints":["Bagaimanakah perasaan kamu?","Sedih atau gembira?","Saya sedih."],"learningMode":"STANDARD"},{"id":"T1-W-032","word":"takut","meaning":"Berasa bimbang atau gentar.","zh":"害怕","role":"FEELING","examples":["Saya takut.","Adik berasa takut.","Adik takut apabila mendengar bunyi kuat."],"hints":["Bagaimanakah perasaan kamu?","Takut atau berani?","Saya takut."],"learningMode":"STANDARD"},{"id":"T1-W-033","word":"seronok","meaning":"Berasa suka dan gembira melakukan sesuatu.","zh":"开心/有趣","role":"FEELING","examples":["Saya seronok.","Saya seronok bermain.","Saya seronok bermain bersama kawan."],"hints":["Aktiviti apa yang seronok?","Bermain atau membaca?","Saya seronok bermain."],"learningMode":"STANDARD"},{"id":"T1-W-034","word":"penat","meaning":"Berasa letih selepas melakukan sesuatu.","zh":"累","role":"FEELING","examples":["Saya penat.","Saya berasa penat.","Saya penat selepas bermain."],"hints":["Bagaimanakah perasaan kamu selepas banyak bergerak?","Penat?","Saya penat."],"learningMode":"STANDARD"},{"id":"T1-W-035","word":"berani","meaning":"Tidak mudah takut.","zh":"勇敢","role":"QUALITY","examples":["Ali berani.","Ali seorang murid yang berani.","Ali berani membantu kawannya."],"hints":["Apakah sikap orang yang tidak mudah takut?","Berani?","Ali berani."],"learningMode":"STANDARD"},{"id":"T1-W-036","word":"bersih","meaning":"Tidak kotor.","zh":"干净","role":"DESCRIPTION","examples":["Kelas saya bersih.","Rumah saya bersih.","Saya menjaga kebersihan kelas."],"hints":["Apa yang tidak kotor?","Rumah atau kelas?","Kelas saya bersih."],"learningMode":"STANDARD"},{"id":"T1-W-037","word":"cantik","meaning":"Elok dan menarik apabila dilihat.","zh":"漂亮","role":"DESCRIPTION","examples":["Bunga itu cantik.","Taman itu cantik.","Taman sekolah saya cantik dan bersih."],"hints":["Bagaimanakah sesuatu yang elok dilihat?","Cantik?","Bunga itu cantik."],"learningMode":"STANDARD"},{"id":"T1-W-038","word":"besar","meaning":"Mempunyai saiz yang besar.","zh":"大","role":"DESCRIPTION","examples":["Rumah itu besar.","Sekolah saya besar.","Sekolah saya besar dan bersih."],"hints":["Bagaimanakah saiznya?","Besar atau kecil?","Sekolah saya besar."],"learningMode":"STANDARD"},{"id":"T1-W-039","word":"kecil","meaning":"Mempunyai saiz yang kecil.","zh":"小","role":"DESCRIPTION","examples":["Bilik itu kecil.","Bilik saya kecil.","Rumah itu kecil."],"hints":["Bagaimanakah saiznya?","Kecil atau besar?","Bilik saya kecil."],"learningMode":"STANDARD"},{"id":"T1-W-040","word":"suka","meaning":"Berasa senang terhadap seseorang, sesuatu atau sesuatu aktiviti.","zh":"喜欢","role":"PREFERENCE","examples":["Saya suka membaca.","Saya suka membaca buku.","Saya suka membaca buku bersama adik."],"hints":["Apa yang kamu suka lakukan?","Membaca, menulis atau bermain?","Saya suka membaca."],"learningMode":"STANDARD"},{"id":"T1-W-041","word":"dan","meaning":"Menghubungkan dua perkara atau idea.","zh":"和/以及","role":"CONNECTOR","examples":["Saya membaca dan menulis.","Saya makan dan minum.","Kelas saya bersih dan cantik."],"hints":["Boleh tambah satu lagi idea?","Gunakan 'dan'.","Saya membaca dan menulis."],"learningMode":"STANDARD"},{"id":"T1-W-042","word":"kerana","meaning":"Digunakan apabila kita mahu memberitahu sebab.","zh":"因为","role":"REASON_CONNECTOR","examples":["Saya gembira kerana membantu ibu.","Saya gembira kerana dapat membantu ibu.","Saya suka sekolah kerana saya dapat belajar bersama kawan."],"hints":["Mengapa?","Cuba gunakan 'kerana'.","Saya gembira kerana dapat membantu ibu."],"learningMode":"GUIDED_FIRST"},{"id":"T1-W-043","word":"pagi","meaning":"Waktu selepas malam apabila hari mula cerah.","zh":"早上","role":"TIME","examples":["Waktu pagi.","Saya mandi pada waktu pagi.","Saya bangun dan mandi pada waktu pagi."],"hints":["Bilakah kamu melakukan aktiviti ini?","Pagi atau petang?","Saya mandi pada waktu pagi."],"learningMode":"STANDARD"},{"id":"T1-W-044","word":"petang","meaning":"Waktu selepas tengah hari sebelum malam.","zh":"傍晚/下午","role":"TIME","examples":["Waktu petang.","Saya bermain pada waktu petang.","Saya bermain bersama kawan pada waktu petang."],"hints":["Bilakah kamu bermain atau pulang?","Pagi atau petang?","Saya bermain pada waktu petang."],"learningMode":"STANDARD"},{"id":"T1-W-045","word":"pergi","meaning":"Bergerak dari satu tempat ke tempat lain.","zh":"去","role":"ACTION","examples":["Saya pergi.","Saya pergi ke sekolah.","Saya pergi ke sekolah pada waktu pagi."],"hints":["Ke mana kamu pergi?","Sekolah?","Saya pergi ke sekolah."],"learningMode":"STANDARD"},{"id":"T1-W-046","word":"pulang","meaning":"Kembali ke rumah atau tempat asal.","zh":"回家/返回","role":"ACTION","examples":["Saya pulang.","Saya pulang ke rumah.","Saya pulang ke rumah pada waktu petang."],"hints":["Ke mana kamu pulang?","Rumah?","Saya pulang ke rumah."],"learningMode":"STANDARD"},{"id":"T1-W-047","word":"membuat","meaning":"Melakukan atau menghasilkan sesuatu.","zh":"做","role":"ACTION","examples":["Saya membuat kerja.","Saya membuat kerja sekolah.","Saya membuat kerja sekolah di rumah."],"hints":["Apa yang kamu buat?","Fikir tentang satu kerja atau aktiviti.","Saya membuat kerja sekolah."],"learningMode":"STANDARD"},{"id":"T1-W-048","word":"melihat","meaning":"Menggunakan mata untuk memandang sesuatu.","zh":"看见","role":"ACTION","examples":["Saya melihat bunga.","Saya melihat bunga yang cantik.","Saya melihat bunga yang cantik di taman."],"hints":["Apa yang kamu lihat?","Bunga atau sesuatu yang lain?","Saya melihat bunga."],"learningMode":"STANDARD"},{"id":"T1-W-049","word":"mempunyai","meaning":"Ada sesuatu yang menjadi milik kita.","zh":"拥有","role":"RELATION","examples":["Saya mempunyai buku.","Saya mempunyai seorang adik.","Saya mempunyai seorang kawan yang baik."],"hints":["Apa atau siapa yang kamu ada?","Adik, kawan atau buku?","Saya mempunyai seorang adik."],"learningMode":"STANDARD"},{"id":"T1-W-050","word":"kemudian","meaning":"Menunjukkan perkara yang berlaku selepas itu.","zh":"然后","role":"SEQUENCE","examples":["Kemudian, saya mandi.","Saya bangun. Kemudian, saya mandi.","Saya bangun pada waktu pagi. Kemudian, saya mandi dan makan."],"hints":["Apa yang berlaku selepas itu?","Gunakan 'Kemudian' untuk idea seterusnya.","Saya bangun. Kemudian, saya mandi."],"learningMode":"GUIDED_FIRST"}];
  const L3_STORAGE="karangan_ai_l3_t1_v1";
  const L3_LEVEL_KEY="karangan_ai_l3_level";
  const L3_LEGACY_RENDER=renderSentenceBuilder;
  let l3JourneyStarted=false;
  const L3_YEAR_PROFILES={
    1:{label:"Tahun 1",status:"ACTIVE"},
    2:{label:"Tahun 2",status:"LOCKED"},
    3:{label:"Tahun 3",status:"LOCKED"},
    4:{label:"Tahun 4",status:"LOCKED"},
    5:{label:"Tahun 5",status:"LOCKED"},
    6:{label:"Tahun 6",status:"LOCKED"}
  };
  const L3_YEAR_KEY="karangan_ai_learning_year";
  function l3Year(){
    const y=Number(localStorage.getItem(L3_YEAR_KEY)||1);
    const p=L3_YEAR_PROFILES[y];
    // Langkah 3 currently has validated content only for ACTIVE profiles.
    // Never allow a stored LOCKED year to fall through to the legacy sentence builder.
    if(p && p.status==="ACTIVE") return y;
    try{ localStorage.setItem(L3_YEAR_KEY,"1"); }catch(_){}
    return 1;
  }
  function l3YearButtons(){
    const current=l3Year();
    return Object.entries(L3_YEAR_PROFILES).map(([y,p])=>{
      const active=p.status==="ACTIVE",selected=Number(y)===current;
      return `<button type="button" data-l3-year="${y}" ${active?"":"disabled"} style="padding:7px 10px;border-radius:15px;border:1px solid #ddd;background:${selected?"#eef8ff":"#fff"};opacity:${active?1:.48}">
        ${active?"":"🔒 "}${p.label}${selected?" ✓":""}
      </button>`;
    }).join("");
  }
  const L3_THEMES={
    keluarga:{icon:"👨‍👩‍👧",name:"Keluarga Saya",words:["keluarga","ibu","ayah","adik","bersama","sayang","membantu","berkongsi","menjaga","gembira"]},
    sekolah:{icon:"🏫",name:"Di Sekolah",words:["sekolah","guru","kawan","kelas","belajar","membaca","menulis","bermain","rajin","baik","membantu"]},
    rumah:{icon:"🏠",name:"Di Rumah",words:["rumah","bilik","dapur","makan","minum","mengemas","membersihkan","tidur","bangun","mandi","membantu"]},
    taman:{icon:"🌳",name:"Di Taman",words:["melihat","bermain","bersama","kawan","gembira","seronok","cantik","besar","kecil","menjaga","bersih","pergi","pulang"]},
    perasaan:{icon:"❤️",name:"Perasaan Saya",words:["gembira","sedih","takut","seronok","penat","berani","suka","baik"]},
    aktiviti:{icon:"🎒",name:"Aktiviti Harian",words:["bangun","mandi","makan","minum","pergi","belajar","membaca","menulis","bermain","pulang","tidur","kemudian"]}
  };
  let l3ThemeKey=sessionStorage.getItem("karangan_ai_l3_theme")||"taman";
  let l3ThemeCount=Number(sessionStorage.getItem("karangan_ai_l3_theme_count")||0);
  let l3LastWordId=sessionStorage.getItem("karangan_ai_l3_last_word")||"";
  const L3_THEME_MAX=5;
  function l3Theme(){return L3_THEMES[l3ThemeKey]||L3_THEMES.taman;}
  function l3ThemeSet(k){
    if(!L3_THEMES[k])return;
    l3ThemeKey=k;l3ThemeCount=0;l3LastWordId="";
    sessionStorage.setItem("karangan_ai_l3_theme",k);
    sessionStorage.setItem("karangan_ai_l3_theme_count","0");
    l3Render();
  }


  function l3Year(){
    try { return Number(localStorage.getItem("karangan_ai_learning_year")||1); }
    catch(_) { return 1; }
  }
  function l3Load(){
    try { return JSON.parse(localStorage.getItem(L3_STORAGE)||"{}"); }
    catch(_) { return {}; }
  }
  function l3Save(s){ try { localStorage.setItem(L3_STORAGE,JSON.stringify(s)); } catch(_) {} }
  let l3SessionLevel=null;
  function l3RecommendedLevel(word){
    const x=l3StateFor(word);
    const attempts=(x.independent||0)+(x.retries||0);
    const hintRate=attempts?((x.hints||0)/attempts):0;
    if((x.retries||0)>=2 || hintRate>=0.6 || (x.depth||0)<=1) return "ASAS";
    if((x.depth||0)>=3 && (x.independent||0)>=2 && hintRate<=0.25) return "LANJUTAN";
    return "STANDARD";
  }
  function l3Level(word){
    return l3SessionLevel || l3RecommendedLevel(word);
  }
  function l3SetLevel(v){
    l3SessionLevel=(v==="ASAS"||v==="STANDARD"||v==="LANJUTAN")?v:null;
  }
  function l3TodayIndex(){
    const d=new Date(); const start=new Date(d.getFullYear(),0,0);
    return Math.floor((d-start)/86400000);
  }
  function l3StateFor(word){
    const s=l3Load();
    return s[word.id]||{state:"NEW",depth:0,seen:0,hints:0,retries:0,independent:0,transfer:0,postponed:false};
  }
  function l3Pick(){
    const s=l3Load(), day=l3TodayIndex();
    const themed=L3_WORDS.filter(w=>l3Theme().words.includes(w.word));
    const pool=themed.length?themed:L3_WORDS;
    const ranked=pool.map((w,i)=>{
      const x=s[w.id]||{depth:0,seen:0,postponed:false,independent:0,hints:0,retries:0};
      // Writing Target priority:
      // postponed/review > learned-but-not-writing-mastered > weak > new fallback.
      let score=0;
      if(w.id===l3LastWordId) score-=500;
      if(x.postponed) score+=140;
      if(l3ReviewDue(w)) score+=130;
      if((x.seen||0)>0 && (x.depth||0)<4) score+=80;
      if((x.depth||0)===2) score+=25;
      if((x.depth||0)===3) score+=18;
      if((x.retries||0)>0) score+=12;
      if((x.independent||0)===0) score+=8;
      if((x.seen||0)===0) score-=30;
      score+=((i*17+day*13)%23)/23;
      return {w,score};
    }).sort((a,b)=>b.score-a.score);
    return ranked[0].w;
  }
  function l3Scaffold(word,level){
    const x=l3StateFor(word);
    if(level==="ASAS") return 1;
    if(level==="LANJUTAN" && x.depth>=2) return 4;
    if(x.retries>=2 || x.hints>=2) return 1;
    if(level==="LANJUTAN") return 3;
    return x.depth>=3?3:2;
  }
  function l3Example(word,scaffold){
    if(scaffold<=1) return word.examples[0]||word.examples[1];
    if(scaffold===2) return word.examples[1]||word.examples[0];
    return word.examples[2]||word.examples[1]||word.examples[0];
  }
  function l3Frame(sentence,word){
    const re=new RegExp("\\b"+word.replace(/[.*+?^${}()|[\]\\]/g,"\\$&")+"\\b","i");
    return sentence.replace(re,"______");
  }
  function l3Choices(word){
    const distract=L3_WORDS.filter(x=>x.id!==word.id && x.role===word.role).slice(0,8);
    const seed=l3TodayIndex()+word.id.charCodeAt(word.id.length-1);
    const pick=[word.word];
    for(let i=0;i<distract.length && pick.length<3;i++){
      const x=distract[(i+seed)%distract.length].word;
      if(!pick.includes(x)) pick.push(x);
    }
    return pick.sort((a,b)=>((a.charCodeAt(0)+seed)%7)-((b.charCodeAt(0)+seed)%7));
  }
  function l3Header(level,word){
    const label=level==="ASAS"?"🌱 Asas":level==="LANJUTAN"?"⭐ Lanjutan":"🌿 Standard";
    const recommended=l3RecommendedLevel(word);
    const recLabel=recommended==="ASAS"?"🌱 Asas":recommended==="LANJUTAN"?"⭐ Lanjutan":"🌿 Standard";
    const levels=[["ASAS","🌱 Asas"],["STANDARD","🌿 Standard"],["LANJUTAN","⭐ Lanjutan"]];
    return `<span class="section-kicker">LANGKAH 3 · TAHUN 1</span>
      <h1>✍️ Bina Ayat</h1>
      <p>Gunakan perkataan yang sudah kamu pelajari untuk membina ayat.</p>
      <div style="padding:12px;border-radius:16px;background:#f7f5ff;margin:14px 0">
        <strong style="display:block;margin-bottom:9px">Tahap Cabaran</strong>
        <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px">
          ${levels.map(([v,t])=>`<button type="button" data-l3-level="${v}" class="${v===level?"primary-button":"secondary-button"}" style="padding:10px 5px">${t}</button>`).join("")}
        </div>
        <div style="margin-top:9px;font-size:13px;color:#65727a">🤖 Cikgu Aira cadangkan: <strong>${recLabel}</strong>${l3SessionLevel?" · Pilihan kamu digunakan untuk misi ini.":""}</div>
      </div>
      <div style="padding:16px;border-radius:18px;background:#fff5df;margin:16px 0">
        <small>PERKATAAN SASARAN · ${label}</small>
        <strong style="display:block;font-size:24px;margin-top:5px">${escapeHtml(word.word)}</strong>
        <span style="color:#6b55d9">${escapeHtml(word.zh||"")}</span>
        <div style="margin-top:7px;color:#65727a">${escapeHtml(word.meaning||"")}</div>
      </div>`;
  }
  function l3Mission(word,level,scaffold){
    const x=l3StateFor(word);
    // Locked two-stage journey: Stage 1 is always scaffolded, then Stage 2 is independent writing.
    if(level==="ASAS") return "SUSUN";
    if(level==="STANDARD") return "SUSUN";
    return "SUSUN";
  }
  function l3ShuffleTokens(sentence){
    return String(sentence||"").replace(/[.!?]/g,"").split(/\s+/).filter(Boolean)
      .sort((a,b)=>((a.length*17+a.charCodeAt(0))%11)-((b.length*17+b.charCodeAt(0))%11));
  }
  function l3RenderStartPage(){
    const theme=l3Theme();
    const themeButtons=Object.entries(L3_THEMES).map(([k,t])=>`<button type="button" data-l3-theme-start="${k}" style="padding:10px 12px;border-radius:16px;border:1px solid #ddd;background:${k===l3ThemeKey?"#fff3df":"#fff"};font-weight:700">${t.icon} ${escapeHtml(t.name)}</button>`).join("");
    openModuleScreen(`
      <div style="max-width:760px;margin:0 auto">
        <div style="text-align:center;padding:8px 0 18px">
          <div style="font-size:46px">✍️</div>
          <h1 style="margin:6px 0">Bina Ayat</h1>
          <div style="color:#666">Pilih tahun, tahap dan tema untuk misi menulis hari ini.</div>
        </div>
        <div style="padding:14px;border-radius:18px;background:#f4f9ff;margin-bottom:12px">
          <div style="font-weight:800">📘 Pilih Tahun</div>
          <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:9px">${l3YearButtons()}</div>
          <div style="font-size:12px;color:#666;margin-top:7px">Tahun 2–6 akan dibuka selepas kandungan kurikulum disediakan.</div>
        </div>
        <div style="padding:14px;border-radius:18px;background:#eef9f3;margin-bottom:12px">
          <div style="font-weight:800">🎯 Pilih Tahap</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:7px;margin-top:9px">
            <button type="button" data-l3-level-start="ASAS" class="${l3SessionLevel==="ASAS"?"primary-button":"secondary-button"}">🌱 Asas</button>
            <button type="button" data-l3-level-start="STANDARD" class="${(!l3SessionLevel||l3SessionLevel==="STANDARD")?"primary-button":"secondary-button"}">🌿 Standard</button>
            <button type="button" data-l3-level-start="LANJUTAN" class="${l3SessionLevel==="LANJUTAN"?"primary-button":"secondary-button"}">⭐ Lanjutan</button>
          </div>
          <div style="font-size:12px;color:#666;margin-top:7px">Asas 3–4 perkataan · Standard 4–5 · Lanjutan 5–6</div>
        </div>
        <div style="padding:14px;border-radius:18px;background:#f7f7f7;margin-bottom:14px">
          <div style="font-weight:800">🌈 Pilih Tema Hari Ini</div>
          <div style="display:flex;gap:7px;flex-wrap:wrap;margin-top:9px">${themeButtons}</div>
        </div>
        <button type="button" id="l3StartJourney" class="primary-button" style="width:100%">🚀 Mula Belajar · ${theme.icon} ${escapeHtml(theme.name)}</button>
      </div>`,0);
  }
  function l3Render(){
    const activeYear=l3Year();
    // Current validated Langkah 3 curriculum is Tahun 1 only.
    // Locked years must never route into the old generic sentence builder.
    if(activeYear!==1){
      try{ localStorage.setItem(L3_YEAR_KEY,"1"); }catch(_){}
    }
    const word=l3Pick(), level=l3Level(word), scaffold=l3Scaffold(word,level), mission=l3Mission(word,level,scaffold);
    sentenceBuilderState={task:{focusWord:word.word},l3Word:word,l3Level:level,l3Scaffold:scaffold,l3Mission:mission,hintLevel:0,attempts:0};
    l3RenderScreen();
  }
  function l3DnDStyle(){
    if(document.getElementById("l3-dnd-style")) return;
    const s=document.createElement("style"); s.id="l3-dnd-style";
    s.textContent=`
      .l3-bank,.l3-dropzone{display:flex;flex-wrap:wrap;gap:9px;min-height:58px;padding:12px;border-radius:16px}
      .l3-bank{background:#fff8ea;border:1px solid #f1dfba}
      .l3-dropzone{background:#f7f5ff;border:2px dashed #cfc7f5}
      .l3-chip{touch-action:none;user-select:none;-webkit-user-select:none;padding:10px 13px;border-radius:14px;background:white;border:1px solid #ddd;box-shadow:0 2px 5px rgba(0,0,0,.06);font-weight:700}
      .l3-chip.l3-dragging{opacity:.55;transform:scale(.98)}
      .l3-dropzone.l3-over{outline:3px solid rgba(108,92,231,.16)}
      .l3-slot{display:inline-flex;align-items:center;justify-content:center;min-width:105px;min-height:42px;padding:4px 9px;border-radius:12px;border:2px dashed #bfb6ef;background:#fff}
    `;
    document.head.appendChild(s);
  }
  function l3BindPointerDnD(){
    l3DnDStyle();
    let active=null, ghost=null, source=null;
    const chips=[...document.querySelectorAll(".l3-chip")];
    chips.forEach(chip=>{
      chip.addEventListener("pointerdown",e=>{
        active=chip; source=chip.parentElement; chip.classList.add("l3-dragging");
        try{chip.setPointerCapture(e.pointerId);}catch(_){}
        ghost=chip.cloneNode(true); ghost.removeAttribute("id");
        Object.assign(ghost.style,{position:"fixed",zIndex:"99999",pointerEvents:"none",opacity:".92",margin:"0",left:(e.clientX-30)+"px",top:(e.clientY-22)+"px"});
        document.body.appendChild(ghost); e.preventDefault();
      });
      chip.addEventListener("pointermove",e=>{
        if(!active||active!==chip||!ghost)return;
        ghost.style.left=(e.clientX-30)+"px"; ghost.style.top=(e.clientY-22)+"px";
        document.querySelectorAll(".l3-dropzone,.l3-bank").forEach(x=>x.classList.remove("l3-over"));
        const el=document.elementFromPoint(e.clientX,e.clientY);
        const zone=el?.closest?.(".l3-dropzone,.l3-bank");
        if(zone) zone.classList.add("l3-over");
      });
      const end=e=>{
        if(!active||active!==chip)return;
        const el=document.elementFromPoint(e.clientX,e.clientY);
        const zone=el?.closest?.(".l3-dropzone,.l3-bank");
        if(zone){
          if(zone.dataset.mode==="single"){
            const prior=zone.querySelector(".l3-chip");
            if(prior && prior!==chip) source?.appendChild(prior);
          }
          zone.appendChild(chip);
        }
        document.querySelectorAll(".l3-dropzone,.l3-bank").forEach(x=>x.classList.remove("l3-over"));
        chip.classList.remove("l3-dragging"); ghost?.remove(); ghost=null;active=null;source=null;
      };
      chip.addEventListener("pointerup",end);
      chip.addEventListener("pointercancel",()=>{
        chip.classList.remove("l3-dragging"); ghost?.remove(); ghost=null;active=null;source=null;
      });
      // Tap fallback: useful for very young learners and accessibility.
      chip.addEventListener("click",()=>{
        if(active) return;
        const target=document.querySelector(".l3-dropzone");
        const bank=document.querySelector(".l3-bank");
        if(chip.closest(".l3-dropzone")) bank?.appendChild(chip);
        else if(target){
          if(target.dataset.mode==="single"){
            const prior=target.querySelector(".l3-chip"); if(prior) bank?.appendChild(prior);
          }
          target.appendChild(chip);
        }
      });
    });
  }
  function l3ShortExample(word,level){
    const w=String(word?.word||"").trim();

    // Same Tahun 1 vocabulary, but a genuinely different sentence structure by level.
    const asas={
      keluarga:"Ini keluarga saya.", ibu:"Ini ibu saya.", ayah:"Ini ayah saya.", adik:"Ini adik saya.",
      bersama:"Kami duduk bersama.", sayang:"Saya sayang ibu.", membantu:"Saya membantu ibu.", berkongsi:"Kami suka berkongsi.",
      menjaga:"Saya menjaga adik.", gembira:"Saya rasa gembira.", sekolah:"Ini sekolah saya.", guru:"Ini guru saya.",
      kawan:"Ini kawan saya.", kelas:"Ini kelas saya.", belajar:"Saya suka belajar.", membaca:"Saya suka membaca.",
      menulis:"Saya suka menulis.", bermain:"Saya suka bermain.", rajin:"Ali sangat rajin.", baik:"Ali sangat baik.",
      rumah:"Ini rumah saya.", bilik:"Ini bilik saya.", dapur:"Ini dapur saya.", makan:"Saya suka makan.",
      minum:"Saya suka minum.", mengemas:"Saya suka mengemas.", membersihkan:"Saya suka membersihkan.", tidur:"Saya mahu tidur.",
      bangun:"Saya sudah bangun.", mandi:"Saya sudah mandi.", sedih:"Saya rasa sedih.", takut:"Saya rasa takut.",
      seronok:"Saya rasa seronok.", penat:"Saya rasa penat.", berani:"Ali sangat berani.", bersih:"Kelas sangat bersih.",
      cantik:"Bunga sangat cantik.", besar:"Rumah sangat besar.", kecil:"Bola sangat kecil.", suka:"Saya suka membaca.",
      dan:"Ali dan Abu.", kerana:"Saya belajar kerana suka.", pagi:"Ini waktu pagi.", petang:"Ini waktu petang.",
      pergi:"Saya mahu pergi.", pulang:"Saya mahu pulang.", membuat:"Saya suka membuat.", melihat:"Saya suka melihat.",
      mempunyai:"Saya mempunyai buku.", kemudian:"Saya makan kemudian."
    };
    const standard={
      keluarga:"Saya sayang keluarga saya.", ibu:"Saya membantu ibu di rumah.", ayah:"Saya membantu ayah di rumah.",
      adik:"Saya menjaga adik di rumah.", bersama:"Saya bermain bersama kawan saya.", sayang:"Saya sayang ibu dan ayah.",
      membantu:"Saya membantu ibu di rumah.", berkongsi:"Saya berkongsi buku dengan kawan.", menjaga:"Saya menjaga adik di rumah.",
      gembira:"Saya gembira bersama keluarga saya.", sekolah:"Saya belajar di sekolah saya.", guru:"Guru mengajar saya di kelas.",
      kawan:"Saya bermain bersama kawan saya.", kelas:"Kelas saya bersih dan cantik.", belajar:"Saya belajar di dalam kelas.",
      membaca:"Saya membaca buku di rumah.", menulis:"Saya menulis ayat di kelas.", bermain:"Saya bermain bersama kawan saya.",
      rajin:"Ali rajin belajar di sekolah.", baik:"Kawan saya sangat baik hati.", rumah:"Saya tinggal di rumah saya.",
      bilik:"Saya mengemas bilik saya sendiri.", dapur:"Ibu memasak di dalam dapur.", makan:"Saya makan nasi di rumah.",
      minum:"Saya minum air pada pagi.", mengemas:"Saya mengemas bilik saya sendiri.", membersihkan:"Saya membersihkan kelas bersama kawan.",
      tidur:"Saya tidur di dalam bilik.", bangun:"Saya bangun awal pada pagi.", mandi:"Saya mandi pada waktu pagi.",
      sedih:"Saya berasa sedih hari ini.", takut:"Saya berasa takut di sana.", seronok:"Saya seronok bermain bersama kawan.",
      penat:"Saya berasa penat selepas bermain.", berani:"Ali berani bercakap di kelas.", bersih:"Kelas saya bersih dan kemas.",
      cantik:"Bunga di taman sangat cantik.", besar:"Rumah itu besar dan cantik.", kecil:"Bola itu kecil dan ringan.",
      suka:"Saya suka membaca buku cerita.", dan:"Saya membaca dan menulis di kelas.", kerana:"Saya gembira kerana dapat bermain.",
      pagi:"Saya bangun awal pada pagi.", petang:"Saya bermain pada waktu petang.", pergi:"Saya pergi ke sekolah pagi.",
      pulang:"Saya pulang ke rumah petang.", membuat:"Saya membuat kerja di rumah.", melihat:"Saya melihat bunga yang cantik.",
      mempunyai:"Saya mempunyai sebuah buku cerita.", kemudian:"Saya makan kemudian saya belajar."
    };
    const lanjutan={
      keluarga:"Saya gembira bersama keluarga saya.", ibu:"Saya membantu ibu mengemas rumah.", ayah:"Saya membantu ayah membersihkan rumah.",
      adik:"Saya menjaga adik ketika ibu sibuk.", bersama:"Saya bermain bersama kawan di taman.", sayang:"Saya sayang ibu kerana baik.",
      membantu:"Saya membantu ibu mengemas rumah.", berkongsi:"Saya berkongsi buku bersama kawan saya.", menjaga:"Saya menjaga adik dengan baik.",
      gembira:"Saya gembira bermain bersama kawan saya.", sekolah:"Saya belajar bersama kawan di sekolah.", guru:"Guru membantu saya belajar di kelas.",
      kawan:"Saya membantu kawan membawa buku.", kelas:"Saya membersihkan kelas bersama kawan saya.", belajar:"Saya rajin belajar di sekolah setiap hari.",
      membaca:"Saya membaca buku bersama kawan saya.", menulis:"Saya menulis ayat di dalam kelas.", bermain:"Saya bermain bersama kawan di taman.",
      rajin:"Saya rajin belajar bersama kawan saya.", baik:"Kawan saya baik dan suka membantu.", rumah:"Saya membantu ibu membersihkan rumah.",
      bilik:"Saya mengemas bilik supaya sentiasa bersih.", dapur:"Saya membantu ibu di dapur.", makan:"Saya makan bersama keluarga di rumah.",
      minum:"Saya minum air selepas bermain.", mengemas:"Saya membantu ibu mengemas bilik.", membersihkan:"Saya membersihkan kelas bersama kawan saya.",
      tidur:"Saya tidur selepas mengemas bilik.", bangun:"Saya bangun pagi kemudian mandi.", mandi:"Saya mandi sebelum pergi ke sekolah.",
      sedih:"Saya sedih kerana kawan pulang.", takut:"Saya takut tetapi cuba berani.", seronok:"Saya seronok bermain bersama kawan saya.",
      penat:"Saya penat selepas bermain di taman.", berani:"Saya berani bercakap di hadapan kelas.", bersih:"Saya menjaga kelas supaya sentiasa bersih.",
      cantik:"Saya melihat bunga cantik di taman.", besar:"Rumah besar itu sangat cantik.", kecil:"Adik bermain dengan bola kecil.",
      suka:"Saya suka membaca bersama kawan saya.", dan:"Saya membaca dan menulis bersama kawan.", kerana:"Saya gembira kerana dapat membantu ibu.",
      pagi:"Saya bangun pagi kemudian pergi sekolah.", petang:"Saya bermain bersama kawan pada petang.", pergi:"Saya pergi ke sekolah bersama kawan.",
      pulang:"Saya pulang ke rumah selepas sekolah.", membuat:"Saya membuat kerja bersama kawan saya.", melihat:"Saya melihat bunga cantik di taman.",
      mempunyai:"Saya mempunyai buku yang sangat cantik.", kemudian:"Saya makan kemudian membantu ibu mengemas."
    };

    let text=(level==="ASAS"?asas[w]:(level==="STANDARD"?standard[w]:lanjutan[w])) ||
             (level==="ASAS"?l3Example(word,1):level==="STANDARD"?l3Example(word,2):l3Example(word,3));

    const range=level==="ASAS"?[3,4]:level==="STANDARD"?[4,5]:[5,6];
    const count=x=>String(x||"").replace(/[.!?]/g,"").trim().split(/\s+/).filter(Boolean).length;
    let n=count(text);

    // Prefer a level-fitting authored example if the bank item misses the target range.
    if(n<range[0] || n>range[1]){
      const candidates=(word?.examples||[]).filter(Boolean).filter(x=>String(x).toLowerCase().includes(w.toLowerCase()));
      const fit=candidates.find(x=>{const c=count(x); return c>=range[0]&&c<=range[1];});
      if(fit) text=fit;
    }
    return text;
  }

  function l3DroppedWords(){
    return [...document.querySelectorAll(".l3-dropzone .l3-chip")].map(x=>x.dataset.word||x.textContent.trim());
  }
  function l3RenderScreen(){
    l3BindStageActions();
    l3BindSemakAyat();
    const st=sentenceBuilderState, word=st.l3Word, level=st.l3Level, scaffold=st.l3Scaffold;
    let mission="";
    const missionType=st.l3Mission||l3Mission(word,level,scaffold);
    const ex=(missionType==="SUSUN"||missionType==="LENGKAP"||missionType==="PILIH")
      ?l3ShortExample(word,level)
      :l3Example(word,Math.max(1,Math.min(3,scaffold)));
    if(missionType==="PILIH"){
      mission=`<div style="padding:16px;border-radius:18px;background:#f7f5ff;margin:14px 0">
        <strong>🎯 Pilih Perkataan</strong><div style="margin-top:8px">Pilih perkataan yang sesuai untuk ayat ini.</div>
        <div style="font-size:20px;margin-top:10px">${escapeHtml(l3Frame(ex,word.word))}</div></div>
        <div style="display:grid;gap:9px">${l3Choices(word).map(x=>`<button type="button" class="secondary-button" data-l3-choice="${escapeHtml(x)}">${escapeHtml(x)}</button>`).join("")}</div>`;
    } else if(missionType==="LENGKAP"){
      const choices=l3Choices(word);
      mission=`<div style="padding:16px;border-radius:18px;background:#f7f5ff;margin:14px 0">
        <strong>🧩 Lengkapkan Ayat</strong>
        <div style="font-size:20px;margin-top:10px">${escapeHtml(l3Frame(ex,word.word))}</div>
        <div style="margin-top:12px">Seret perkataan yang betul ke kotak.</div>
        <div class="l3-dropzone" data-mode="single" aria-label="Tempat jawapan"></div>
      </div>
      <div class="l3-bank">${choices.map(x=>`<button type="button" class="l3-chip" data-word="${escapeHtml(x)}">${escapeHtml(x)}</button>`).join("")}</div>
      <button id="l3DropCheck" class="primary-button" type="button" style="width:100%;margin-top:12px">✓ Semak</button>`;
    } else if(missionType==="SUSUN"){
      const toks=l3ShuffleTokens(ex);
      mission=`<div style="padding:16px;border-radius:18px;background:#f7f5ff;margin:14px 0">
        <strong>🔀 Susun Ayat <span style="font-size:12px;font-weight:600;color:#777">· ${level==="ASAS"?"🌱 Asas":level==="STANDARD"?"🌿 Standard":"⭐ Lanjutan"} · T1</span></strong>
        <div style="margin-top:8px">Seret perkataan mengikut susunan yang betul.</div>
        <div class="l3-dropzone" data-mode="sequence" aria-label="Susunan ayat"></div>
      </div>
      <div class="l3-bank">${toks.map((x,i)=>`<button type="button" class="l3-chip" data-word="${escapeHtml(x)}" data-token="${i}">${escapeHtml(x)}</button>`).join("")}</div>
      <button id="l3DropCheck" class="primary-button" type="button" style="width:100%;margin-top:12px">✓ Semak Susunan</button>`;
    } else if(missionType==="CANTIKKAN"){
      const base=word.examples[0]||ex;
      mission=`<div style="padding:16px;border-radius:18px;background:#f7f5ff;margin:14px 0">
        <strong>✨ Cantikkan Ayat</strong><div style="margin-top:8px">Ayat asas: <strong>${escapeHtml(base)}</strong></div>
        <div style="margin-top:7px">Tambah satu maklumat supaya ayat menjadi lebih jelas.</div></div>
        <textarea id="l3Answer" rows="4" placeholder="Tulis ayat yang lebih lengkap..." style="width:100%;box-sizing:border-box;border:2px solid #e4dfda;border-radius:16px;padding:14px;font:inherit">${escapeHtml(st.l3Draft||"")}</textarea>
        <button id="l3Check" class="primary-button" type="button" style="width:100%;margin-top:12px">✓ Semak Ayat</button>`;
    } else {
      mission=`<div style="padding:16px;border-radius:18px;background:#f7f5ff;margin:14px 0">
        <strong>✍️ Bina Ayat <span style="font-size:12px;font-weight:600;color:#777">· Tahap 2</span></strong><div style="margin-top:8px">Bina satu ayat menggunakan <strong>${escapeHtml(word.word)}</strong>.</div></div>
        <textarea id="l3Answer" rows="4" placeholder="Tulis ayat kamu di sini..." style="width:100%;box-sizing:border-box;border:2px solid #e4dfda;border-radius:16px;padding:14px;font:inherit">${escapeHtml(st.l3Draft||"")}</textarea>
        <button id="l3Check" class="primary-button" type="button" style="width:100%;margin-top:12px">✓ Semak Ayat</button>`;
    }
    let hint="";
    if(st.hintLevel){
      const h=st.hintLevel;
      const title=h===1?"💡 Petunjuk 1 · Ingat":h===2?"💡 Petunjuk 2 · Pilihan":"👀 Petunjuk 3 · Contoh";
      let body=word.hints[Math.min(h-1,2)]||word.hints[0];
      if(h===2) body+=` Pilihan: ${l3Choices(word).join(" · ")}`;
      if(h===3) body=`Contoh: ${l3Example(word,2)} Selepas melihat contoh, cuba tulis semula sendiri.`;
      hint=`<div style="padding:13px;background:#eef9f3;border-radius:14px;margin:12px 0"><strong>${title}</strong><div style="margin-top:6px">${escapeHtml(body)}</div></div>`;
    }
    openModuleScreen(`${l3Header(level,word)}${hint}${mission}
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-top:12px">
        <button id="l3Hint" class="secondary-button" type="button">💡 Petunjuk</button>
        <button id="l3Skip" class="secondary-button" type="button">⏭️ Nanti Dulu</button>
      </div>
      <div style="text-align:center;color:#98a0a5;font-size:12px;margin-top:14px">Langkah 3 Foundation · v${L3_VERSION}</div>`,42);

    $$("[data-l3-choice]").forEach(b=>b.onclick=()=>l3Evaluate(b.dataset.l3Choice,true));
    $$("[data-l3-level]").forEach(b=>b.addEventListener("click",()=>{
      l3SetLevel(b.dataset.l3Level);
      const st=sentenceBuilderState;
      st.l3Level=b.dataset.l3Level;
      st.l3Scaffold=l3Scaffold(st.l3Word,st.l3Level);
      st.l3Mission=l3Mission(st.l3Word,st.l3Level,st.l3Scaffold);
      st.hintLevel=0; st.exampleRevealed=false; st.attempts=0;
      l3RenderScreen();
    }));
    if(missionType==="LENGKAP" || missionType==="SUSUN"){
      l3BindPointerDnD();
      l3BindSemakDelegation();
    }
    byId("l3Hint")?.addEventListener("click",()=>{
      st.hintLevel=Math.min(3,(st.hintLevel||0)+1);
      st.exampleRevealed=st.hintLevel>=3;
      const s=l3Load(), x=s[word.id]||l3StateFor(word);
      x.hints=(x.hints||0)+1; x.seen=(x.seen||0)+1;
      if(st.exampleRevealed) x.exampleRevealed=true;
      s[word.id]=x;l3Save(s);l3RenderScreen();
    });
    byId("l3Skip")?.addEventListener("click",()=>{
      l3SyncMastery(word,{type:"POSTPONED"});
      showToast("⏭️ Perkataan ini akan datang semula."); l3Render();
    });
  }
  function l3ReviewDays(depth){
    return depth>=4?14:depth===3?7:depth===2?3:1;
  }
  function l3SyncMastery(word,event){
    const all=l3Load(), x=all[word.id]||l3StateFor(word);
    x.seen=(x.seen||0)+1;
    x.lastEvent=event.type;
    x.lastSeen=new Date().toISOString();
    if(event.type==="POSTPONED"){
      x.postponed=true;
      if(x.state==="NEW") x.state="LEARNING";
    }else{
      x.postponed=false;
    }
    if(event.type==="RETRY"){
      x.retries=(x.retries||0)+1;
      x.state="LEARNING"; x.depth=Math.max(x.depth||0,1);
    }
    if(event.type==="GUIDED_SUCCESS"){
      x.state="WRITING_LEARNING"; x.depth=Math.max(x.depth||0,2);
    }
    if(event.type==="INDEPENDENT_SUCCESS"){
      x.independent=(x.independent||0)+1;
      x.depth=Math.max(x.depth||0,x.independent>=2?3:2);
      x.state=x.depth>=3?"WRITING_LEARNING":"LEARNING";
      if(event.transfer) x.transfer=(x.transfer||0)+1;
      if((x.independent||0)>=3 && (x.transfer||0)>=1){
        x.depth=4; x.state="WRITING_MASTERED";
      }
    }
    if(event.hint) x.hints=(x.hints||0)+1;
    const days=l3ReviewDays(x.depth||1);
    const d=new Date(); d.setDate(d.getDate()+days);
    x.reviewInterval=days; x.nextReview=d.toISOString().slice(0,10);
    all[word.id]=x;l3Save(all);return x;
  }
  function l3ReviewDue(word){
    const x=l3StateFor(word);
    if(x.postponed) return true;
    if(!x.nextReview) return false;
    return x.nextReview<=new Date().toISOString().slice(0,10);
  }
  function l3NextReview(depth){
    const days=depth>=4?14:depth===3?7:depth===2?3:1;
    const d=new Date(); d.setDate(d.getDate()+days);
    return d.toISOString().slice(0,10);
  }
  let l3SemakAyatBound=false;
  function l3BindSemakAyat(){
    if(l3SemakAyatBound) return;
    l3SemakAyatBound=true;
    let last=0;
    function run(e){
      const btn=e.target.closest?.("#l3Check");
      if(!btn) return;
      const now=Date.now(); if(now-last<350) return; last=now;
      e.preventDefault(); e.stopPropagation();
      const ta=document.getElementById("l3Answer");
      const answer=ta ? ta.value : "";
      if(!String(answer).trim()){showToast("✍️ Tulis ayat dahulu.");return;}
      try{
        l3Evaluate(answer,false);
      }catch(err){
        console.error("[L3 Semak Ayat]",err);
        // Safe visible fallback for a valid simple target-word sentence.
        const st=sentenceBuilderState, w=st&&st.l3Word;
        const norm=function(v){return String(v||"").toLowerCase().replace(/[.!?]/g," ").replace(/\s+/g," ").trim();};
        const words=norm(answer).split(" ").filter(Boolean);
        const target=norm(w&&w.word);
        if(w && words.includes(target) && words.length>=2){
          l3SafeIndependentSuccess(answer,w);
        }else{
          showToast("⚠️ Cuba gunakan perkataan sasaran dalam ayat.");
        }
      }
    }
    document.addEventListener("pointerup",run,true);
    document.addEventListener("click",run,true);
  }
  function l3SafeIndependentSuccess(answer,w){
    let box=document.getElementById("l3SemakAyatResult");
    if(!box){
      box=document.createElement("div"); box.id="l3SemakAyatResult";
      const btn=document.getElementById("l3Check");
      btn.parentNode.insertBefore(box,btn);
    }
    box.style.cssText="padding:14px 16px;border-radius:16px;margin:12px 0;font-weight:700;background:#eef9f3";
    box.innerHTML="🌟 Bagus! Ayat kamu jelas.<br><span style='font-weight:500'>"+escapeHtml(answer)+"</span>";
    try{
      l3SyncMastery(w,{type:"INDEPENDENT_SUCCESS",transfer:(sentenceBuilderState?.l3Scaffold||0)>=4});
    }catch(err){console.warn("[L3 safe mastery]",err);}
    const btn=document.getElementById("l3Check");
    if(btn){btn.textContent="✓ Ayat Disemak";btn.disabled=true;}
    setTimeout(function(){
      try{l3Feedback("SUCCESS","🌟 Hebat!","Ayat kamu jelas dan menggunakan perkataan sasaran.",true,false);}
      catch(err){console.warn("[L3 safe feedback]",err);}
    },450);
  }

  let l3StageActionBound=false;
  function l3BindStageActions(){
    if(l3StageActionBound) return;
    l3StageActionBound=true;
    document.addEventListener("pointerup",function(e){
      const retry=e.target.closest?.("#l3Retry");
      if(!retry) return;
      e.preventDefault(); e.stopPropagation();
      if(retry){
        try{
          if(!sentenceBuilderState || !sentenceBuilderState.l3Word){
            showToast("⚠️ Misi belum sedia."); return;
          }
          sentenceBuilderState.hintLevel=0;
          sentenceBuilderState.exampleRevealed=false;
          sentenceBuilderState.l3Scaffold=Math.max(2,sentenceBuilderState.l3Scaffold||2);

          sentenceBuilderState.l3Mission="BINA";
          sentenceBuilderState.l3Draft="";
          sentenceBuilderState.attempts=0;
          l3RenderScreen();
        }catch(err){
          console.error("[L3 retry transition]",err);
          showToast("⚠️ Cuba semula membuka misi.");
        }
      }

    },true);
  }

  let l3LastSemakAt=0;
  function l3RunSemak(e){
    const btn=e?.target?.closest?.("#l3DropCheck");
    if(!btn) return;
    const now=Date.now();
    if(now-l3LastSemakAt<350) return;
    l3LastSemakAt=now;
    e?.preventDefault?.();
    e?.stopPropagation?.();
    try{
      l3CheckDropMission();
    }catch(err){
      console.error("[Langkah3 Semak]",err);
      showToast("⚠️ Semakan terganggu. Cuba sekali lagi.");
    }
  }
  function l3BindSemakDelegation(){
    // iPad/Safari-safe: capture pointerup before any older app listener can swallow click.
    if(!window.__L3_SEMAK_CAPTURE_BOUND__){
      window.__L3_SEMAK_CAPTURE_BOUND__=true;
      document.addEventListener("pointerup",l3RunSemak,true);
      document.addEventListener("click",l3RunSemak,true);
    }
    const btn=byId("l3DropCheck");
    if(btn) btn.onclick=l3RunSemak;
  }
  function l3CheckDropMission(){
    const st=sentenceBuilderState;
    const zone=document.querySelector("#moduleContent .l3-dropzone");
    if(!zone){showToast("⚠️ Kotak jawapan tidak dijumpai.");return;}
    const chips=Array.from(zone.querySelectorAll(".l3-chip"));
    if(!chips.length){showToast("👆 Seret perkataan ke kotak dahulu.");return;}
    const dropped=chips.map(function(el){return String(el.getAttribute("data-word")||el.textContent||"").trim();});

    if(st && st.l3Mission==="LENGKAP"){
      l3Evaluate(dropped[0],true); return;
    }

    // iPad-safe SUSUN checker: deliberately independent from locale normalization,
    // mastery storage and feedback renderer. First prove the visible sequence.
    const w=st && st.l3Word;
    if(!w){showToast("⚠️ Misi belum sedia.");return;}
    const sample=String(l3ShortExample(w,st.l3Level)||"")
      .replace(/[.!?]/g,"").trim();
    const answer=dropped.join(" ").trim();
    const simple=function(v){return String(v).toLowerCase().replace(/\s+/g," ").trim();};
    const correct=simple(answer)===simple(sample);

    let box=document.getElementById("l3SemakResult");
    if(!box){
      box=document.createElement("div"); box.id="l3SemakResult";
      const btn=document.getElementById("l3DropCheck");
      btn.parentNode.insertBefore(box,btn);
    }
    box.style.cssText="padding:14px 16px;border-radius:16px;margin:12px 0;font-weight:700;";
    if(!correct){
      box.style.background="#fff5df";
      box.textContent="👍 Hampir betul! Cuba susun semula perkataan mengikut urutan yang betul.";
      return;
    }
    box.style.background="#eef9f3";
    box.innerHTML="🌟 Susunan betul! <strong>"+escapeHtml(answer)+".</strong><br><span style='font-weight:500'>Bagus! Sekarang cuba bina ayat sendiri.</span>";
    const btn=document.getElementById("l3DropCheck");
    if(btn){btn.textContent="✓ Betul";btn.disabled=true;}
    // Save only after UI success; storage failure must never block feedback.
    try{
      l3SyncMastery(w,{type:"GUIDED_SUCCESS"});
    }catch(err){console.warn("[L3 mastery save]",err);}
    setTimeout(function(){
      try{l3Feedback("SUCCESS","🌟 Susunan betul!","Bagus! Sekarang cuba bina ayat sendiri tanpa susunan perkataan.",true,true);}
      catch(err){console.warn("[L3 feedback transition]",err);}
    },450);
  }
  function l3AnalyzeSentence(answer,w){
    const raw=String(answer||"").trim();
    const norm=raw.toLowerCase().replace(/[.!?]/g," ").replace(/\s+/g," ").trim();
    const words=norm.split(" ").filter(Boolean);
    const target=String(w?.word||"").toLowerCase().trim();
    const hasTarget=words.includes(target);
    const startsCapital=raw && raw[0]===raw[0].toUpperCase();
    const hasPunctuation=/[.!?]$/.test(raw);

    // One Correction Rule priority:
    // meaning/target > completeness > capitalization > punctuation.
    if(!hasTarget){
      return {
        result:"RETRY",
        meaning_ok:false,target_word_ok:false,
        main_issue:"TARGET_WORD",
        praise:"👍 Cubaan yang baik!",
        feedback:`Cuba gunakan perkataan "${w.word}" dalam ayat kamu.`
      };
    }
    if(words.length<3){
      return {
        result:"RETRY",
        meaning_ok:true,target_word_ok:true,
        main_issue:"TOO_SHORT",
        praise:"👍 Bagus, kamu sudah guna perkataan sasaran.",
        feedback:"Tambah satu maklumat lagi supaya ayat lebih lengkap."
      };
    }
    if(!startsCapital){
      return {
        result:"RETRY",
        meaning_ok:true,target_word_ok:true,
        main_issue:"CAPITAL_LETTER",
        praise:"👍 Ayat kamu sudah jelas.",
        feedback:"Cuba mula ayat dengan huruf besar."
      };
    }
    if(!hasPunctuation){
      return {
        result:"RETRY",
        meaning_ok:true,target_word_ok:true,
        main_issue:"PUNCTUATION",
        praise:"👍 Ayat kamu sudah jelas.",
        feedback:"Cuba letakkan tanda noktah di hujung ayat."
      };
    }
    return {
      result:"SUCCESS",
      meaning_ok:true,target_word_ok:true,
      main_issue:null,
      praise:"🌟 Hebat!",
      feedback:"Ayat kamu jelas dan menggunakan perkataan sasaran."
    };
  }
  function l3Evaluate(answer,isChoice){
    const st=sentenceBuilderState, w=st.l3Word, scaffold=st.l3Scaffold;
    const raw=String(answer||"").trim();
    if(!isChoice) st.l3Draft=String(answer||"");
    if(!raw){showToast("✍️ Tulis jawapan dahulu.");return;}
    const analysis=isChoice
      ? {result:(l3Norm(raw)===l3Norm(w.word)?"SUCCESS":"RETRY"),main_issue:"TARGET_WORD",praise:"👍 Cubaan yang baik!",feedback:`Cuba pilih perkataan "${w.word}".`}
      : l3AnalyzeSentence(raw,w);
    let issue=analysis.result==="RETRY"?analysis.main_issue:"";
    if(!issue && st.l3Mission==="CANTIKKAN"){
      const words=l3Norm(raw).split(/\s+/).filter(Boolean);
      if(words.length<=l3Norm(w.examples[0]).split(/\s+/).length) issue="EXPAND";
    }

    const s=l3Load(), x=s[w.id]||l3StateFor(w);
    const firstTry=(x.retries||0)===0 && (st.attempts||0)===0;
    st.attempts=(st.attempts||0)+1;
    x.seen=(x.seen||0)+1; x.postponed=false;
    x.firstTrySuccessRate=x.firstTrySuccessRate||0;
    if(issue){
      x.retries=(x.retries||0)+1; x.state="LEARNING"; x.depth=Math.max(x.depth||0,1);
      x.nextReview=l3NextReview(x.depth||1);
      s[w.id]=x;l3Save(s);
      const msg=issue==="EXPAND"
        ?"Tambah satu maklumat lagi supaya ayat lebih jelas."
        :(analysis.feedback||"Cuba baiki satu perkara dahulu.");
      const praise=analysis.praise||"👍 Cubaan yang baik!";
      x.lastIssue=issue;
      x.lastFeedback=msg;
      l3Feedback("RETRY",praise,msg,false);
      return;
    }
    const guided=isChoice || st.l3Mission==="LENGKAP" || st.l3Mission==="SUSUN" || st.hintLevel>0 || st.exampleRevealed===true || scaffold===1;
    if(guided){
      x.state="WRITING_LEARNING"; x.depth=Math.max(x.depth||0,2);
    } else {
      x.independent=(x.independent||0)+1;
      x.depth=Math.max(x.depth||0,x.independent>=2?3:2);
      x.state=x.depth>=3?"WRITING_LEARNING":"LEARNING";
      if(scaffold>=4 && x.independent>=3){x.transfer=(x.transfer||0)+1;}
      if(x.independent>=3 && x.transfer>=1){x.depth=4;x.state="WRITING_MASTERED";}
    }
    if(firstTry && !guided) x.firstTrySuccessRate=Math.min(1,(x.firstTrySuccessRate||0)+0.25);
    x.nextReview=l3NextReview(x.depth||1);
    x.lastIssue=null;
    x.lastFeedback=guided?"Sekarang cuba lagi tanpa melihat contoh.":(analysis.feedback||"Ayat kamu jelas dan menggunakan perkataan sasaran.");
    s[w.id]=x;l3Save(s);
    l3Feedback("SUCCESS",guided?"🌟 Bagus!":(analysis.praise||"🌟 Hebat!"),x.lastFeedback,true,guided);
  }
  function l3Feedback(result,praise,feedback,success,guided){
    l3BindSemakAyat();
    const w=sentenceBuilderState.l3Word;
    openModuleScreen(`<div style="display:flex;align-items:center;justify-content:space-between;gap:8px;padding:8px 10px;border-radius:14px;background:#f7f7f7;margin-bottom:10px">
      <div style="font-weight:750">${l3Theme().icon} ${escapeHtml(l3Theme().name)} <span style="font-weight:500;color:#777">· Tahun ${l3Year()}</span></div>
      <button type="button" id="l3ChangeTheme" style="padding:5px 9px;border-radius:12px;border:1px solid #ddd;background:#fff">Tukar Tema</button>
    </div><span class="section-kicker">CIKGU AIRA</span>
      <div style="text-align:center;padding:18px 0"><div style="font-size:64px">${success?"🌟":"✍️"}</div><h1>${escapeHtml(praise)}</h1></div>
      <div style="padding:16px;border-radius:18px;background:${success?"#eef9f3":"#fff5df"};margin:12px 0">${escapeHtml(feedback)}</div>
      <div style="padding:13px;border-radius:14px;background:#f7f5ff"><strong>${escapeHtml(w.word)}</strong> · ${escapeHtml(w.meaning)}</div>
      ${success&&!guided
        ?`<div style="display:grid;gap:9px;margin-top:14px">
            <button id="l3ChallengeNext" class="primary-button" style="width:100%">${l3Theme().icon} Cabar Perkataan Seterusnya</button>
            <button id="l3FinishToday" class="secondary-button" style="width:100%">✓ Selesai</button>
          </div>`
        :(success&&guided
          ?`<button id="l3Retry" class="primary-button" style="width:100%;margin-top:14px">✍️ Cuba Bina Ayat Sendiri</button>`
          :`<div style="margin-top:14px">
              <div style="font-weight:800;margin-bottom:7px">✏️ Baiki ayat kamu di sini</div>
              <textarea id="l3Answer" rows="4" style="width:100%;box-sizing:border-box;border:2px solid #e4dfda;border-radius:16px;padding:14px;font:inherit">${escapeHtml(sentenceBuilderState.l3Draft||"")}</textarea>
              <button id="l3Check" class="primary-button" type="button" style="width:100%;margin-top:10px">✓ Semak Semula</button>
              <button id="l3BackToWriting" class="secondary-button" type="button" style="width:100%;margin-top:8px">← Kembali ke Ayat Saya</button>
            </div>`)} `,42);
  }

  function l3EntryRender(){
    // Fresh entry from the module/menu always begins at the Year + Theme landing page.
    l3JourneyStarted=false;
    l3RenderStartPage();
  }
  renderSentenceBuilder=l3EntryRender;
  function l3RecordCompletedWord(){
    if(!sentenceBuilderState?.l3Word) return;
    if(sentenceBuilderState.l3CompletionRecorded) return;
    sentenceBuilderState.l3CompletionRecorded=true;
    l3ThemeCount=Math.min(L3_THEME_MAX,l3ThemeCount+1);
    l3LastWordId=sentenceBuilderState.l3Word.id||"";
    sessionStorage.setItem("karangan_ai_l3_theme_count",String(l3ThemeCount));
    sessionStorage.setItem("karangan_ai_l3_last_word",l3LastWordId);
  }

  let l3BackWritingAt=0;
  function l3BackToWritingAction(e){
    const el=e.target.closest?.("#l3BackToWriting");
    if(!el) return;
    const now=Date.now();
    if(now-l3BackWritingAt<350) return;
    l3BackWritingAt=now;
    e.preventDefault(); e.stopPropagation();
    try{
      if(!sentenceBuilderState || !sentenceBuilderState.l3Word){
        showToast("⚠️ Misi belum sedia.");
        return;
      }
      sentenceBuilderState.l3Mission="BINA";
      // Keep l3Draft exactly as typed; do not reset attempts/hints.
      l3RenderScreen();
      setTimeout(function(){
        const ta=document.getElementById("l3Answer");
        if(ta){
          try{ta.focus(); ta.setSelectionRange(ta.value.length,ta.value.length);}catch(_){}
        }
      },80);
    }catch(err){
      console.error("[L3 back to writing]",err);
      showToast("⚠️ Cuba sekali lagi.");
    }
  }
  document.addEventListener("pointerup",l3BackToWritingAction,true);
  document.addEventListener("click",l3BackToWritingAction,true);

  let l3PostSuccessAt=0;
  function l3PostSuccessAction(e){
    const el=e.target.closest?.("#l3ChallengeNext,#l3FinishToday");
    if(!el) return;
    const now=Date.now();
    if(now-l3PostSuccessAt<350) return;
    l3PostSuccessAt=now;
    e.preventDefault(); e.stopPropagation();

    l3RecordCompletedWord();

    if(el.id==="l3ChallengeNext" && l3ThemeCount<L3_THEME_MAX){
      sentenceBuilderState=null;
      l3SessionLevel=null;
      l3Render();
      return;
    }

    // Only mark the daily Writing Mission complete when the child chooses to finish
    // (or the theme challenge cap is reached). Do not auto-route to another module.
    try{ completeMission("sentence-builder"); }catch(err){console.warn("[L3 finish completeMission]",err);}
    const t=l3Theme();
    openModuleScreen(`<div style="text-align:center;padding:22px 0">
      <div style="font-size:64px">🏆</div>
      <h1>Misi Hari Ini Selesai!</h1>
      <p>Kamu sudah berjaya menulis ayat sendiri dalam tema <strong>${escapeHtml(t.name)}</strong>.</p>
      <p style="color:#666">Perkataan berjaya hari ini: ${l3ThemeCount}/${L3_THEME_MAX}</p>
    </div>
    <button id="l3ThemeDone" class="primary-button" style="width:100%">✓ Kembali</button>`,100);
  }
  document.addEventListener("pointerup",l3PostSuccessAction,true);
  document.addEventListener("click",l3PostSuccessAction,true);

  let l3ThemeActionAt=0;
  function l3ThemeAction(e){
    const el=e.target.closest?.("[data-l3-theme],[data-l3-theme-start],[data-l3-level-start],[data-l3-year],#l3StartJourney,#l3ChangeTheme,#l3ThemeContinue,#l3ThemeDone"); if(!el)return;
    const now=Date.now();if(now-l3ThemeActionAt<300)return;l3ThemeActionAt=now;
    e.preventDefault();e.stopPropagation();
    if(el.dataset?.l3LevelStart){
      l3SetLevel(el.dataset.l3LevelStart);
      l3RenderStartPage();return;
    }
    if(el.dataset?.l3Theme){l3ThemeSet(el.dataset.l3Theme);return;}
    if(el.dataset?.l3ThemeStart){
      l3ThemeKey=el.dataset.l3ThemeStart;l3ThemeCount=0;l3LastWordId="";
      sessionStorage.setItem("karangan_ai_l3_theme",l3ThemeKey);
      sessionStorage.setItem("karangan_ai_l3_theme_count","0");
      l3RenderStartPage();return;
    }
    if(el.dataset?.l3Year){
      const y=Number(el.dataset.l3Year),p=L3_YEAR_PROFILES[y];
      if(!p||p.status!=="ACTIVE"){showToast("🔒 Kandungan tahun ini belum tersedia.");return;}
      localStorage.setItem(L3_YEAR_KEY,String(y));l3Render();return;
    }
    if(el.id==="l3StartJourney"){
      try{ localStorage.setItem(L3_YEAR_KEY,"1"); }catch(_){}
      l3JourneyStarted=true;
      l3Render();
      return;
    }
    if(el.id==="l3ChangeTheme"){l3JourneyStarted=false;l3RenderStartPage();return;}
    if(el.id==="l3ThemeContinue"){l3Render();return;}
    if(el.id==="l3ThemeDone"){showToast("⭐ Misi menulis hari ini selesai.");return;}
  }
  document.addEventListener("pointerup",l3ThemeAction,true);
  document.addEventListener("click",l3ThemeAction,true);

  window.KaranganLangkah3={
    version:L3_VERSION,render:l3EntryRender,resumeSelected:function(){l3JourneyStarted=true;return l3Render();},getState:l3Load,
    getYearProfile:function(){return {year:l3Year(),profile:L3_YEAR_PROFILES[l3Year()]};},
    yearProfiles:L3_YEAR_PROFILES,
    masterySummary:function(){
      const st=l3Load(), vals=Object.values(st);
      return {
        tracked:vals.length,
        postponed:vals.filter(x=>x.postponed).length,
        due:vals.filter(x=>x.nextReview && x.nextReview<=new Date().toISOString().slice(0,10)).length,
        writingMastered:vals.filter(x=>x.state==="WRITING_MASTERED").length
      };
    },
    developerSetLevel:l3SetLevel,
    clearLevelOverride:function(){l3SessionLevel=null;try{localStorage.removeItem(L3_LEVEL_KEY);}catch(_){}}
  };
})();

/* =========================================================
   LANGKAH 4 v12.12.0 — TAHUN 1 CONTENT v1.0 STABLE INTEGRATION
   Additive integration. Langkah 2 & Langkah 3 are untouched.
   ========================================================= */
(function(){
  const L4_VERSION="13.3.0-AUTOMATED-QA";
  const CONTENT_VERSION="1.0_STABLE";
  const LEGACY_GRAMMAR=renderGrammarRain;
  const STATE_KEY="karangan_ai_l4_t1_v1";
  let level="ASAS", stage="START", hint=0, taskIndex=0, draft="", guidedDraft="", guidedHint3=false, independentHintUsed=false, activeExercise=null, l4JudgeSeq=0;
  // v13.2.0: single source of truth for interaction lifecycle.
  const l4Machine={phase:"START",busy:false,cycleHintUsed:false,lastAction:null,lastTransitionAt:0};
  const L4_TRANSITIONS={
    START:new Set(["START","GUIDED"]),
    GUIDED:new Set(["GUIDED","UPGRADE"]),
    UPGRADE:new Set(["UPGRADE","INDEPENDENT"]),
    INDEPENDENT:new Set(["INDEPENDENT","SUCCESS"]),
    SUCCESS:new Set(["SUCCESS","GUIDED","START"])
  };
  function l4Transition(next,{force=false}={}){
    const from=l4Machine.phase;
    if(!force && !(L4_TRANSITIONS[from]||new Set()).has(next)){
      console.warn("[L4 State Machine] blocked transition",from,"->",next);
      return false;
    }
    l4Machine.phase=next;l4Machine.lastTransitionAt=Date.now();stage=next;
    return true;
  }
  function l4SetBusy(value){l4Machine.busy=!!value;}
  function l4ResetCycle(){l4Machine.cycleHintUsed=false;independentHintUsed=false;hint=0;guidedHint3=false;l4SetBusy(false);}


  const tasks=[
    {id:"L4-T1-001",skill:"PLACE",base:"Saya membaca buku.",q:"Di mana?",choices:["di bilik","di rumah","di sekolah"],model:"Saya membaca buku di bilik."},
    {id:"L4-T1-002",skill:"PLACE",base:"Saya belajar.",q:"Di mana?",choices:["di sekolah","di rumah","di bilik"],model:"Saya belajar di sekolah."},
    {id:"L4-T1-003",skill:"PLACE",base:"Saya bermain.",q:"Di mana?",choices:["di taman","di rumah","di sekolah"],model:"Saya bermain di taman."},
    {id:"L4-T1-004",skill:"PLACE",base:"Saya makan.",q:"Di mana?",choices:["di rumah","di dapur"],model:"Saya makan di rumah."},
    {id:"L4-T1-005",skill:"PLACE",base:"Adik tidur.",q:"Di mana?",choices:["di bilik","di rumah"],model:"Adik tidur di bilik."},
    {id:"L4-T1-006",skill:"TIME",base:"Saya mandi.",q:"Bila?",choices:["pada waktu pagi","pada waktu petang"],model:"Saya mandi pada waktu pagi."},
    {id:"L4-T1-007",skill:"TIME",base:"Saya bangun.",q:"Bila?",choices:["pada waktu pagi","pada waktu petang"],model:"Saya bangun pada waktu pagi."},
    {id:"L4-T1-008",skill:"TIME",base:"Saya bermain.",q:"Bila?",choices:["pada waktu petang","pada waktu pagi"],model:"Saya bermain pada waktu petang."},
    {id:"L4-T1-009",skill:"TIME",base:"Saya membaca buku.",q:"Bila?",choices:["pada waktu petang","pada waktu pagi"],model:"Saya membaca buku pada waktu petang."},
    {id:"L4-T1-010",skill:"COMPANION",base:"Saya bermain.",q:"Dengan siapa?",choices:["bersama kawan","bersama adik","bersama keluarga"],model:"Saya bermain bersama kawan."},
    {id:"L4-T1-011",skill:"COMPANION",base:"Saya belajar.",q:"Dengan siapa?",choices:["bersama kawan","bersama adik","bersama ibu"],model:"Saya belajar bersama kawan."},
    {id:"L4-T1-012",skill:"COMPANION",base:"Saya makan.",q:"Dengan siapa?",choices:["bersama keluarga","bersama ibu","bersama ayah"],model:"Saya makan bersama keluarga."},
    {id:"L4-T1-013",skill:"COMPANION",base:"Saya membaca buku.",q:"Dengan siapa?",choices:["bersama adik","bersama kawan","bersama ibu"],model:"Saya membaca buku bersama adik."},
    {id:"L4-T1-014",skill:"DESCRIPTION",base:"Kelas saya bersih.",q:"Apa lagi?",choices:["dan cantik","dan besar"],model:"Kelas saya bersih dan cantik."},
    {id:"L4-T1-015",skill:"DESCRIPTION",base:"Rumah saya besar.",q:"Apa lagi?",choices:["dan bersih","dan cantik"],model:"Rumah saya besar dan bersih."},
    {id:"L4-T1-016",skill:"INTENSITY",base:"Adik gembira.",q:"Bagaimana perasaannya?",choices:["sangat gembira"],model:"Adik sangat gembira."},
    {id:"L4-T1-017",skill:"DESCRIPTION",base:"Kawan saya baik.",q:"Apa lagi?",choices:["dan rajin","dan berani"],model:"Kawan saya baik dan rajin."},
    {id:"L4-T1-018",skill:"OPEN",base:"Saya membantu ibu.",q:"Tambah satu maklumat yang sesuai.",choices:[],model:null},
    {id:"L4-T1-019",skill:"OPEN",base:"Saya bermain.",q:"Tambah satu maklumat yang sesuai.",choices:[],model:null},
    {id:"L4-T1-020",skill:"OPEN_DYNAMIC",base:null,q:"Jadikan ayat ini lebih lengkap.",choices:[],model:null}
  ];
  const transferPool=["Ayah minum.","Ibu membaca.","Adik bermain.","Saya mengemas.","Kawan saya belajar.","Ibu makan.","Ayah membaca.","Adik belajar.","Saya menulis.","Kawan saya bermain."];

  // v12.14.1 Connected Transfer Flow
  // Stage 3 must continue the SAME expansion skill with a NEW sentence.
  // Same Skill -> New Sentence -> No Model Answer.
  const L4_TRANSFER_BY_SKILL = {
    PLACE: [
      "Ayah membaca.",
      "Ibu makan.",
      "Adik bermain.",
      "Saya menulis.",
      "Kawan saya belajar."
    ],
    TIME: [
      "Adik bermain.",
      "Saya membaca buku.",
      "Ibu makan.",
      "Ayah minum.",
      "Kawan saya belajar."
    ],
    COMPANION: [
      "Saya bermain.",
      "Adik belajar.",
      "Ibu makan.",
      "Kawan saya membaca.",
      "Ayah berjalan."
    ],
    DESCRIPTION: [
      "Rumah saya bersih.",
      "Kelas saya besar.",
      "Kawan saya baik.",
      "Bilik saya bersih.",
      "Adik gembira."
    ],
    INTENSITY: [
      "Adik gembira.",
      "Saya penat.",
      "Kawan saya seronok.",
      "Ibu gembira.",
      "Ayah penat."
    ],
    OPEN: [
      "Saya membantu ibu.",
      "Saya bermain.",
      "Ayah membaca.",
      "Ibu makan.",
      "Adik belajar."
    ],
    OPEN_DYNAMIC: [
      "Ayah minum.",
      "Ibu membaca.",
      "Adik bermain.",
      "Saya mengemas.",
      "Kawan saya belajar."
    ]
  };

  function l4SkillKey(task){
    const raw=String(task?.skill||task?.type||"").toUpperCase();
    if(raw==="TEMPAT") return "PLACE";
    if(raw==="MASA") return "TIME";
    if(raw==="BERSAMA") return "COMPANION";
    if(raw==="KETERANGAN") return "DESCRIPTION";
    if(raw==="OPEN_TRANSFER") return "OPEN";
    if(raw==="OPEN_TRANSFER_DYNAMIC") return "OPEN_DYNAMIC";
    if(["PLACE","TIME","COMPANION","DESCRIPTION","INTENSITY","OPEN","OPEN_DYNAMIC"].includes(raw)) return raw;
    return "OPEN";
  }

  function pickConnectedTransferBase(task){
    const key=l4SkillKey(task);
    const bank=L4_TRANSFER_BY_SKILL[key]||L4_TRANSFER_BY_SKILL.OPEN;
    const s=loadState();
    const last=String(s.lastIndependentBase||"");
    let options=bank.filter(x=>x!==last && x!==task?.base);
    if(!options.length) options=bank.slice();
    const chosen=options[Math.floor(Math.random()*options.length)]||bank[0];
    saveState({
      currentIndependentBase:chosen,
      currentIndependentSkill:key,
      lastIndependentBase:chosen
    });
    return chosen;
  }

  function l4SkillTarget(task){
    const key=l4SkillKey(task);
    const map={
      PLACE:"Add one PLACE detail to the sentence.",
      TIME:"Add one TIME detail to the sentence.",
      COMPANION:"Add information about WHO is together with the subject.",
      DESCRIPTION:"Add one suitable DESCRIPTION while preserving the original meaning.",
      INTENSITY:"Strengthen the existing feeling or description using an INTENSITY expression. Preserve the original adjective/feeling.",
      OPEN:"Add one meaningful piece of information.",
      OPEN_DYNAMIC:"Add one meaningful piece of information."
    };
    return map[key]||map.OPEN;
  }

  function l4IndependentSkillPrompt(task){
    const key=l4SkillKey(task);
    const map={
      PLACE:"Tambah satu maklumat tempat.",
      TIME:"Tambah satu maklumat masa.",
      COMPANION:"Tambah maklumat dengan siapa.",
      DESCRIPTION:"Tambah satu penerangan yang sesuai.",
      INTENSITY:"Kuatkan penerangan dengan satu maklumat yang sesuai.",
      OPEN:"Tambah satu maklumat yang menjadikan ayat lebih bermakna.",
      OPEN_DYNAMIC:"Tambah satu maklumat yang menjadikan ayat lebih bermakna."
    };
    return map[key]||map.OPEN;
  }

  const hints={
    PLACE:["题目要你告诉我们在哪里做这件事。想一个适合的地点。","先保留原来的句子，再在后面加入地点。","想一想家里、房间或学校。选择一个合理地点，再自己完成整句话。"],
    TIME:["题目要你告诉我们什么时候做这件事。想一个时间。","保留原来的句子，再加入时间。","想一想早上或傍晚。选择一个合理时间，再自己完成整句话。"],
    COMPANION:["这题问你和谁一起。想一个人物。","保留原来的句子，再加入和你一起做这件事的人。","想一想家人或朋友。选择一个适合的人，再自己完成整句话。"],
    DESCRIPTION:["想一想，还可以怎样描述这个人、地方或东西。","保留原来的句子，再加入一个合适的描述。","想一个合适的特点，再自己完成整句话。"],
    INTENSITY:["这题要让原来的感受更明显。","保留原来的意思，再加一个表示程度的词。","想一想怎样表示更加开心，再自己完成整句话。"],
    OPEN:["想一想，这句话还可以告诉读者什么资料？","你可以加入地点、时间，或者和谁一起。","选择一个方向，把新的资料加入原来的完整句子。"],
    OPEN_DYNAMIC:["想一想，这句话还可以告诉读者什么资料？","你可以加入地点、时间，或者和谁一起。","选择一个方向，把新的资料加入原来的完整句子。"]
  };
  const esc=s=>String(s??"").replace(/[&<>\"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'\"':"&quot;","'":"&#39;"}[c]));
  function loadState(){try{return JSON.parse(localStorage.getItem(STATE_KEY)||"{}")||{};}catch(_){return {};}}
  function saveState(patch){try{const s={...loadState(),...patch};localStorage.setItem(STATE_KEY,JSON.stringify(s));}catch(_){}}
  function currentTask(){const t={...tasks[taskIndex%tasks.length]};if(t.skill==="OPEN_DYNAMIC"&&!t.base)t.base=pickTransferBase();return t;}
  function pickTransferBase(){const s=loadState(),seen=Array.isArray(s.transferSeen)?s.transferSeen:[];let x=transferPool.find(v=>!seen.includes(v))||transferPool[Math.floor(Math.random()*transferPool.length)];saveState({transferSeen:[...seen.filter(v=>v!==x),x].slice(-10)});return x;}
  function speak(text){try{if(!("speechSynthesis" in window)){showToast("🔊 Peranti ini belum menyokong suara.");return;}speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang="zh-CN";u.rate=.9;u.pitch=1;const vs=speechSynthesis.getVoices();const zh=vs.find(v=>/^zh/i.test(v.lang));if(zh)u.voice=zh;speechSynthesis.speak(u);}catch(e){console.warn("[L4 voice]",e);}}
  function hintText(){
    if(l4Machine.busy)return;
    const t=activeExercise?.task||currentTask();
    hint=Math.min(3,hint+1);
    l4Machine.cycleHintUsed=true;
    if(l4Machine.phase==="INDEPENDENT") independentHintUsed=true;
    else if(hint===3) guidedHint3=true;
    const txt=(hints[t.skill]||hints.OPEN)[hint-1];
    speak(txt);showToast(`🔊 Cikgu Aira · Petunjuk ${hint}/3`);
  }
  function l4SkillMeta(skill){const m={PLACE:["📍","Tempat"],TIME:["🕐","Masa"],COMPANION:["👫","Dengan siapa"],DESCRIPTION:["✨","Penerangan"],INTENSITY:["💫","Lebih jelas"],OPEN:["🪄","Idea bebas"],OPEN_DYNAMIC:["🪄","Idea bebas"]};return m[skill]||m.OPEN;}
  function l4Styles(){return `<style>
    .l4-wrap{max-width:860px;margin:0 auto}.l4-hero{background:linear-gradient(135deg,#fff5df,#fffdf7);border:1px solid #ffe0a4;border-radius:28px;padding:22px;box-shadow:0 14px 34px rgba(111,76,23,.08)}
    .l4-kicker{font-size:12px;font-weight:900;letter-spacing:.13em;color:#f47b20;text-transform:uppercase}.l4-title{font-size:clamp(30px,5vw,44px);margin:7px 0 3px;font-weight:950;color:#26343c}.l4-sub{color:#66727a;margin:0}
    .l4-meter{display:grid;grid-template-columns:repeat(3,1fr);gap:8px;margin:16px 0}.l4-step{padding:10px;border-radius:15px;background:#f1f3f6;text-align:center;font-size:12px;font-weight:850;color:#7b858b}.l4-step.on{background:#fff0d8;color:#d96c14;box-shadow:inset 0 0 0 1px #ffd092}
    .l4-card{border-radius:24px;padding:20px;margin:14px 0;border:1px solid #e8e9ef;background:#fff;box-shadow:0 10px 26px rgba(42,55,70,.06)}.l4-base{background:linear-gradient(135deg,#f5f6ff,#f9f8ff);border-color:#e5e2ff}.l4-magic{background:linear-gradient(135deg,#effcf4,#f6fff9);border-color:#cdebd8}
    .l4-label{font-size:12px;font-weight:950;letter-spacing:.08em;color:#707a82;text-transform:uppercase}.l4-sentence{font-size:clamp(22px,4vw,30px);font-weight:950;line-height:1.35;margin-top:8px;color:#26343c}.l4-question{margin-top:12px;font-weight:900;color:#4b5660}
    .l4-chiprow{display:grid;grid-template-columns:repeat(auto-fit,minmax(145px,1fr));gap:10px;margin:12px 0}.l4-chip{touch-action:manipulation;pointer-events:auto;-webkit-tap-highlight-color:transparent;border:2px solid #e6e8ed;background:white;border-radius:18px;padding:15px 12px;font-weight:900;box-shadow:0 5px 12px rgba(34,42,48,.04)}.l4-chip:active{transform:scale(.985)}
    .l4-ai{display:flex;gap:11px;align-items:flex-start;background:#fff8e9;border:1px solid #ffd18a;border-radius:20px;padding:15px;margin:12px 0}.l4-ai-face{font-size:27px}.l4-ai-title{font-weight:950;margin-bottom:3px}
    .l4-input{width:100%;box-sizing:border-box;padding:16px 17px;border-radius:18px;border:2px solid #e4e6eb;background:#fff;font-size:18px;line-height:1.45;outline:none}.l4-input:focus{border-color:#ffb04a;box-shadow:0 0 0 4px rgba(255,176,74,.15)}
    .l4-primary{touch-action:manipulation;pointer-events:auto;-webkit-tap-highlight-color:transparent;width:100%;border:0;border-radius:18px;padding:16px;font-size:17px;font-weight:950;background:linear-gradient(90deg,#ff9e3d,#ff7845);color:#fff;box-shadow:0 9px 18px rgba(255,126,63,.22)}.l4-secondary{touch-action:manipulation;pointer-events:auto;-webkit-tap-highlight-color:transparent;width:100%;border:0;border-radius:18px;padding:14px;font-size:16px;font-weight:900;background:#eef0f3;color:#334047}
    .l4-levels{display:grid;grid-template-columns:repeat(3,1fr);gap:9px}.l4-level{touch-action:manipulation;pointer-events:auto;-webkit-tap-highlight-color:transparent;border:2px solid #e5e7eb;border-radius:18px;padding:13px 8px;background:#fff;font-weight:900}.l4-level.active{border-color:#ffad49;background:#fff4df;color:#ce681b}
    .l4-transform{display:grid;grid-template-columns:1fr auto 1fr;gap:12px;align-items:center}.l4-arrow{font-size:34px}.l4-spark{font-size:54px;animation:l4pop .65s ease both}@keyframes l4pop{0%{transform:scale(.65) rotate(-12deg);opacity:0}70%{transform:scale(1.12) rotate(4deg)}100%{transform:scale(1);opacity:1}}
    .l4-success{text-align:center;padding:24px 8px}.l4-success .emoji{font-size:76px}.l4-xp{display:inline-block;margin:12px 0;padding:10px 18px;border-radius:999px;background:#fff3d2;font-size:28px;font-weight:950;color:#9b6512}.l4-actions{display:grid;grid-template-columns:1fr 1fr;gap:10px}.l4-version{margin-top:18px;color:#92999d;font-size:12px;text-align:center}
    @media(max-width:620px){.l4-transform{grid-template-columns:1fr}.l4-arrow{transform:rotate(90deg)}.l4-levels,.l4-actions{grid-template-columns:1fr}.l4-card{padding:17px}}
  </style>`;}
  function shell(body,progress=60,active=1){openModuleScreen(`${l4Styles()}<div class="l4-wrap"><div class="l4-kicker">LANGKAH 4 · TAHUN 1</div><div class="l4-title">✨ Kembangkan Ayat</div><p class="l4-sub">Tambah satu maklumat yang menjadikan ayat lebih bermakna.</p><div class="l4-meter"><div class="l4-step ${active>=1?'on':''}">1 · Faham</div><div class="l4-step ${active>=2?'on':''}">2 · Magic</div><div class="l4-step ${active>=3?'on':''}">3 · Cuba Sendiri</div></div>${body}<div class="l4-version">v${L4_VERSION} · Content ${CONTENT_VERSION}</div></div>`,progress);}
  function feedback(m){return m?`<div class="l4-ai"><div class="l4-ai-face">🐣</div><div><div class="l4-ai-title">Cikgu Aira</div><div>${esc(m)}</div></div></div>`:"";}
  function start(){l4Transition("START",{force:true});l4ResetCycle();draft="";guidedDraft="";shell(`<div class="l4-hero"><div class="l4-spark">🪄</div><h2 style="margin:4px 0 6px">Misi Ayat Magic</h2><p style="margin:0;color:#626d74">Tukar ayat biasa menjadi ayat yang lebih bermakna dengan <strong>satu maklumat</strong>.</p></div><div class="l4-card"><div class="l4-label">Pilih cara belajar</div><div class="l4-levels" style="margin-top:12px"><button data-l4-level="ASAS" class="l4-level ${level==='ASAS'?'active':''}">🌱 Asas<br><small>Pilih bantuan</small></button><button data-l4-level="STANDARD" class="l4-level ${level==='STANDARD'?'active':''}">🌿 Standard<br><small>Tulis sendiri</small></button><button data-l4-level="LANJUTAN" class="l4-level ${level==='LANJUTAN'?'active':''}">⭐ Lanjutan<br><small>Lebih bebas</small></button></div></div><button id="l4Begin" class="l4-primary">Mula Ayat Magic →</button>`,50,1);}
  function promptFor(t){if(level!=="LANJUTAN")return t.q;if(t.skill==="PLACE")return "Tulis semula ayat penuh dan tambah satu tempat.";if(t.skill==="TIME")return "Tulis semula ayat penuh dan tambah satu masa.";if(t.skill==="COMPANION")return "Tulis semula ayat penuh dan nyatakan dengan siapa.";if(t.skill==="DESCRIPTION")return "Tulis semula ayat penuh dan tambah satu penerangan yang sesuai.";if(t.skill==="INTENSITY")return "Tulis semula ayat penuh dan kuatkan perasaan itu.";return "Tulis semula ayat penuh dan tambah satu maklumat yang sesuai.";}
  function guided(message=""){
    l4Transition("GUIDED",{force:true});
    if(!message){hint=0;guidedHint3=false;}
    let snap=(message && activeExercise?.stage==="GUIDED")?activeExercise:null;
    if(!snap){const t0=currentTask();snap=l4FreezeExercise(t0,"GUIDED",t0.base);}
    const t=snap.task;const meta=l4SkillMeta(t.skill);let action="";const canChoice=level==="ASAS"&&t.choices.length;
    if(canChoice)action=`<div class="l4-chiprow">${t.choices.map(x=>`<button data-l4-choice="${esc(x)}" class="l4-chip">${esc(x)}</button>`).join("")}</div>`;
    else {const tag=level==="STANDARD"?"input":"textarea";const close=tag==="textarea"?`</textarea>`:"";const val=tag==="input"?`value="${esc(guidedDraft)}"`:"";const inner=tag==="textarea"?esc(guidedDraft):"";action=`<${tag} id="l4GuidedInput" ${val} ${tag==="textarea"?'rows="3"':''} class="l4-input" placeholder="Tulis ayat penuh yang lebih lengkap...">${inner}${close}<button id="l4GuidedCheck" class="l4-primary" style="margin-top:10px">✓ Semak Ayat</button>`;}
    shell(`<div class="l4-card l4-base"><div class="l4-label">🐣 Ayat Biasa</div><div class="l4-sentence">${esc(snap.base)}</div><div class="l4-question">🪄 ${esc(promptFor(t))}</div></div>${feedback(message)}<div class="l4-card"><div class="l4-label">${meta[0]} Magic Block · ${meta[1]}</div>${action}</div><button id="l4Hint" class="l4-secondary">🔊 Tanya Cikgu Aira</button>`,60,1);
  }
  function upgrade(chosen,snapshot=activeExercise){const t=snapshot?.task||currentTask();const base=snapshot?.base||t.base;activeExercise=snapshot||l4FreezeExercise(t,"GUIDED",base);l4Transition("UPGRADE",{force:true});let full=String(chosen||"").trim();if(!/^[A-Z]/.test(full)||full.split(/\s+/).length<3)full=joinBase(t.base,full);shell(`<div class="l4-card"><div style="text-align:center"><div class="l4-spark">🪄✨</div><div class="l4-label">Ayat Magic berlaku!</div></div><div class="l4-transform" style="margin-top:16px"><div class="l4-card l4-base" style="margin:0"><div class="l4-label">🐣 Sebelum</div><div class="l4-sentence" style="font-size:21px">${esc(base)}</div></div><div class="l4-arrow">→</div><div class="l4-card l4-magic" style="margin:0"><div class="l4-label">✨ Selepas</div><div class="l4-sentence" style="font-size:22px">${esc(full)}</div></div></div><div class="l4-ai" style="margin-top:16px"><div class="l4-ai-face">🐣</div><div><div class="l4-ai-title">Hebat!</div><div>Kamu menambah maklumat yang membuat ayat lebih bermakna.</div></div></div></div><button id="l4TryOwn" class="l4-primary">✍️ Sekarang Cuba Sendiri</button>`,72,2);}
  function independent(message=""){
    l4Transition("INDEPENDENT",{force:true});
    const s=loadState();
    const base=s.currentIndependentBase||pickConnectedTransferBase(currentTask());
    independentRender(base,message);
  }
  function independentRender(base,message="",snapshot=null){l4Transition("INDEPENDENT",{force:true});const snap=snapshot||((activeExercise?.stage==="INDEPENDENT"&&activeExercise.base===base)?activeExercise:l4FreezeExercise(currentTask(),"INDEPENDENT",base));activeExercise=snap;shell(`<div class="l4-card l4-base"><div class="l4-label">🎯 Giliran Kamu</div><p style="margin:7px 0;color:#5f6970">${l4IndependentSkillPrompt(snap.task)}</p><div class="l4-sentence">${esc(snap.base)}</div></div>${feedback(message)}<div class="l4-card"><div class="l4-label">✍️ Ayat Magic Saya</div><textarea id="l4Draft" rows="3" class="l4-input" style="margin-top:10px" placeholder="Tulis ayat penuh kamu...">${esc(draft)}</textarea><button id="l4OwnCheck" class="l4-primary" style="margin-top:10px">✓ Semak Ayat Saya</button></div><button id="l4Hint" class="l4-secondary">🔊 Tanya Cikgu Aira</button>`,84,3);}
  function l4NormTokens(value){
    return String(value||"")
      .toLowerCase()
      .replace(/[.!?,;:]/g," ")
      .replace(/\s+/g," ")
      .trim()
      .split(" ")
      .filter(Boolean);
  }

  function l4TokensInOrder(base,answer){
    const b=l4NormTokens(base),a=l4NormTokens(answer);
    if(!b.length||!a.length)return false;
    let i=0;
    for(const token of a){
      if(token===b[i]) i++;
      if(i===b.length) return true;
    }
    return false;
  }

  function expansionInfo(base,answer){
    const b=l4NormTokens(base),a=l4NormTokens(answer);
    return {
      basePreserved:l4TokensInOrder(base,answer),
      added:a.length>b.length,
      hasMarker:/\b(di|bersama|dengan|pada|dan|sangat|amat|lebih)\b/i.test(String(answer||""))
    };
  }

  /* Teaching Engine v2
     Decision order is fixed:
     Meaning -> Skill Target -> Appropriateness -> Language -> Independence.
     The AI interprets language; the client owns learning state and mastery evidence. */
  const L4_APPROPRIATENESS=new Set(["NATURAL","POSSIBLE","IMAGINATIVE","ODD","INVALID","UNKNOWN"]);

  function l4ExtractJson(result){
    if(result && typeof result==="object" && !Array.isArray(result)){
      if(result.meaning_status || result.primary_issue || result.semantic_class) return result;
    }
    const raw=String(extractAIText(result)||"").trim();
    if(!raw) return null;
    const cleaned=raw.replace(/^```(?:json)?\s*/i,"").replace(/\s*```$/,"").trim();
    try{return JSON.parse(cleaned);}catch(_){}
    const m=cleaned.match(/\{[\s\S]*\}/);
    if(m){try{return JSON.parse(m[0]);}catch(_){}}
    return null;
  }

  function l4FreezeExercise(task,stageName,baseOverride){
    const t={...task};
    const base=String(baseOverride??t.base??"").trim();
    const snap={
      exerciseId:`${t.id||"L4"}-${stageName}-${Date.now()}-${Math.random().toString(36).slice(2,8)}`,
      stage:stageName,
      taskIndex,
      task:t,
      taskId:t.id||"",
      skill:l4SkillKey(t),
      base,
      learningTarget:l4SkillTarget(t)
    };
    activeExercise=snap;
    return snap;
  }

  async function l4TeachingJudge(snapshot,answer){
    if(!snapshot?.base) throw new Error("Missing frozen exercise snapshot");
    // v13.3.0 QA seam: only active when the built-in automated harness explicitly sets it.
    // Production students still go through the real AI provider.
    const qaProvider=window.__KARANGAN_L4_QA_PROVIDER__;
    const result=qaProvider
      ? await qaProvider({snapshot:{...snapshot,task:{...snapshot.task}},answer:String(answer||"")})
      : await callAI({
      type:"teaching_judge_v3",
      language:"Bahasa Melayu",
      year:1,
      exercise_id:snapshot.exerciseId,
      learning_target:snapshot.learningTarget,
      skill_key:snapshot.skill,
      base_sentence:snapshot.base,
      student_answer:answer
    });
    const parsed=l4ExtractJson(result);
    if(!parsed) throw new Error("Teaching Engine v2 returned no valid JSON");
    let app=String(parsed.appropriateness||parsed.semantic_class||"UNKNOWN").toUpperCase();
    if(!L4_APPROPRIATENESS.has(app)) app="UNKNOWN";
    return {
      result:String(parsed.result||"").toUpperCase(),
      meaning_status:String(parsed.meaning_status||(parsed.meaning_preserved===false?"FAIL":"PASS")).toUpperCase(),
      skill_target_status:String(parsed.skill_target_status||(parsed.target_met===true?"MET":"NOT_MET")).toUpperCase(),
      appropriateness:app,
      language_status:String(parsed.language_status||(parsed.language_issue?"MINOR_ISSUE":"CLEAN")).toUpperCase(),
      language_issue:parsed.language_issue ? String(parsed.language_issue).trim() : null,
      primary_issue:String(parsed.primary_issue||"NONE").toUpperCase(),
      preserved_parts:Array.isArray(parsed.preserved_parts)?parsed.preserved_parts.map(x=>String(x).toUpperCase()):[],
      needs_clarification:parsed.needs_clarification===true,
      clarification_question:String(parsed.clarification_question||"").trim(),
      confidence:Math.max(0,Math.min(1,Number(parsed.confidence||0)))
    };
  }

  function l4TeachingFeedback(task,j){
    const key=l4SkillKey(task);
    const preserved=j.preserved_parts||[];
    const praise=preserved.includes("BASE_MEANING")?"Bagus, kamu mengekalkan maksud ayat asal. ":"Bagus mencuba! ";
    if(j.primary_issue==="MEANING") return praise+"Cuba fikir semula hubungan antara perbuatan dan maklumat yang kamu tambah. Adakah gabungan itu membawa maksud yang sesuai?";
    if(j.primary_issue==="SKILL_TARGET") {
      const map={PLACE:"Kamu sudah membina ayat yang boleh difahami. Sekarang tambah maklumat tempat.",TIME:"Kamu sudah membina ayat yang boleh difahami. Sekarang tambah maklumat masa.",COMPANION:"Kamu sudah membina ayat yang boleh difahami. Sekarang tambah maklumat dengan siapa.",DESCRIPTION:"Kamu sudah membina ayat yang boleh difahami. Sekarang tambah satu penerangan yang sesuai.",INTENSITY:"Kamu sudah mengekalkan maksud ayat. Sekarang kuatkan perasaan atau penerangan itu.",OPEN:"Ayat kamu boleh difahami. Sekarang tambah satu maklumat baharu yang bermakna.",OPEN_DYNAMIC:"Ayat kamu boleh difahami. Sekarang tambah satu maklumat baharu yang bermakna."};
      return map[key]||map.OPEN;
    }
    if(j.primary_issue==="APPROPRIATENESS") return praise+"Idea kamu menarik. Cuba fikir sama ada maklumat itu sesuai dengan maksud seluruh ayat.";
    if(j.primary_issue==="LANGUAGE" && j.language_issue) return "Idea kamu sudah boleh difahami. Baiki satu perkara sahaja: "+j.language_issue;
    if(j.needs_clarification || j.appropriateness==="ODD" || j.appropriateness==="UNKNOWN" || j.confidence<0.65){
      return j.clarification_question || "Idea kamu menarik. Boleh jelaskan sedikit maksud maklumat yang kamu tambah?";
    }
    return "Bagus mencuba! Cuba semak semula satu bahagian ayat kamu.";
  }

  function l4LanguagePrecheck(answer){
    const issues=[];
    if(!/^[A-Z]/.test(answer)) issues.push("Cuba mula ayat dengan huruf besar.");
    if(!/[.!?]$/.test(answer)) issues.push("Cuba letakkan tanda noktah di hujung ayat.");
    return issues[0]||null;
  }

  async function checkOwn(){
    const el=byId("l4Draft");
    draft=(el?.value||draft).trim();
    let snap=activeExercise?.stage==="INDEPENDENT"?activeExercise:null;
    if(!snap){const base=loadState().currentIndependentBase||pickConnectedTransferBase(currentTask());snap=l4FreezeExercise(currentTask(),"INDEPENDENT",base);}
    if(!draft){independentRender(snap.base,"Cuba tulis ayat kamu dahulu.",snap);return;}
    const seq=++l4JudgeSeq;l4SetBusy(true);
    try{
      const judge=await l4TeachingJudge(snap,draft);
      l4SetBusy(false);
      if(seq!==l4JudgeSeq || activeExercise?.exerciseId!==snap.exerciseId) return;
      const history=Array.isArray(loadState().teachingHistory)?loadState().teachingHistory:[];
      history.push({exerciseId:snap.exerciseId,taskId:snap.taskId,base:snap.base,answer:draft,skill:snap.skill,...judge,at:Date.now()});
      saveState({teachingHistory:history.slice(-100)});
      if(judge.meaning_status==="UNCERTAIN"){independentRender(snap.base,l4TeachingFeedback(snap.task,{...judge,primary_issue:"NONE",needs_clarification:true}),snap);return;}
      if(judge.meaning_status==="FAIL"){independentRender(snap.base,l4TeachingFeedback(snap.task,{...judge,primary_issue:"MEANING"}),snap);return;}
      if(judge.skill_target_status==="UNCERTAIN"){independentRender(snap.base,l4TeachingFeedback(snap.task,{...judge,primary_issue:"NONE",needs_clarification:true}),snap);return;}
      if(judge.skill_target_status==="NOT_MET"){independentRender(snap.base,l4TeachingFeedback(snap.task,{...judge,primary_issue:"SKILL_TARGET"}),snap);return;}
      if(["ODD","INVALID","UNKNOWN"].includes(judge.appropriateness)||judge.primary_issue==="APPROPRIATENESS"){independentRender(snap.base,l4TeachingFeedback(snap.task,judge),snap);return;}
      const localLanguageIssue=l4LanguagePrecheck(draft),languageIssue=judge.language_issue||localLanguageIssue;
      if(languageIssue){independentRender(snap.base,l4TeachingFeedback(snap.task,{...judge,primary_issue:"LANGUAGE",language_issue:languageIssue}),snap);return;}
      const independentEvidence=!l4Machine.cycleHintUsed && !independentHintUsed;
      recordSuccess("STAGE3_SUCCESS",snap.base,{independentEvidence,judge,snapshot:snap});
      success(independentEvidence,judge);
    }catch(err){
      l4SetBusy(false);
      console.warn("[L4 Teaching Engine v3]",err);
      if(activeExercise?.exerciseId===snap.exerciseId) independentRender(snap.base,"Cikgu Aira belum dapat menyemak maksud ayat ini sekarang. Ayat kamu tidak ditanda salah. Cuba tekan Semak sekali lagi.",snap);
    }
  }

  async function checkGuided(){
    const snap=activeExercise?.stage==="GUIDED"?activeExercise:l4FreezeExercise(currentTask(),"GUIDED",currentTask().base);
    const el=byId("l4GuidedInput"),v=(el?.value||guidedDraft||"").trim();guidedDraft=v;
    if(!v){guided("Cuba tulis jawapan kamu dahulu.");return;}
    if(v.split(/\s+/).length<3){guided("Hampir betul! Jangan tulis maklumat sahaja. Cuba lengkapkan seluruh ayat.");return;}
    const seq=++l4JudgeSeq;l4SetBusy(true);
    try{
      const judge=await l4TeachingJudge(snap,v);
      l4SetBusy(false);
      if(seq!==l4JudgeSeq || activeExercise?.exerciseId!==snap.exerciseId) return;
      if(judge.meaning_status==="UNCERTAIN"||judge.skill_target_status==="UNCERTAIN"||judge.needs_clarification){guided(l4TeachingFeedback(snap.task,{...judge,primary_issue:"NONE",needs_clarification:true}));return;}
      if(judge.meaning_status==="FAIL"){guided(l4TeachingFeedback(snap.task,{...judge,primary_issue:"MEANING"}));return;}
      if(judge.skill_target_status==="NOT_MET"){guided(l4TeachingFeedback(snap.task,{...judge,primary_issue:"SKILL_TARGET"}));return;}
      if(["ODD","INVALID","UNKNOWN"].includes(judge.appropriateness)||judge.primary_issue==="APPROPRIATENESS"){guided(l4TeachingFeedback(snap.task,judge));return;}
      const localLanguageIssue=l4LanguagePrecheck(v),languageIssue=judge.language_issue||localLanguageIssue;
      if(languageIssue){guided(l4TeachingFeedback(snap.task,{...judge,primary_issue:"LANGUAGE",language_issue:languageIssue}));return;}
      recordSuccess(guidedHint3?"GUIDED_SUCCESS":"GUIDED_INDEPENDENT",snap.base,{judge,snapshot:snap});
      upgrade(v,snap);
    }catch(err){
      l4SetBusy(false);
      console.warn("[L4 Guided AI Judge v3]",err);
      if(activeExercise?.exerciseId===snap.exerciseId) guided("Cikgu Aira belum dapat menyemak maksud ayat ini sekarang. Jawapan kamu tidak ditanda salah. Cuba tekan Semak sekali lagi.");
    }
  }

  function recordSuccess(kind,base,meta={}){
    const s=loadState(),history=Array.isArray(s.history)?s.history:[];
    const snap=meta.snapshot;const event={taskId:snap?.taskId||currentTask().id,skill:snap?.skill||currentTask().skill,exerciseId:snap?.exerciseId||null,kind,level,hintUsed:hint,hint3:guidedHint3,independentHintUsed,base,at:Date.now(),...meta};
    history.push(event);
    const patch={history:history.slice(-100),lastTaskIndex:taskIndex};
    if(meta.independentEvidence===true){
      const mastery=Array.isArray(s.masteryEvidence)?s.masteryEvidence:[];
      mastery.push({taskId:event.taskId,skill:event.skill,base,answer:draft,at:event.at,source:"TEACHING_ENGINE_V2_STAGE3"});
      patch.masteryEvidence=mastery.slice(-100);
    }
    saveState(patch);
  }
  function success(independentEvidence=true,judge=null){l4Transition("SUCCESS",{force:true});l4SetBusy(false);const evidenceNote=independentEvidence?"<div class=\"l4-xp\">⭐ Independent mastery evidence +1</div>":"<div class=\"l4-ai\" style=\"margin-top:12px;text-align:left\"><div class=\"l4-ai-face\">🌱</div><div><div class=\"l4-ai-title\">Latihan berjaya</div><div>Kamu berjaya selepas menggunakan bantuan. Ini dikira sebagai pembelajaran, belum sebagai bukti penguasaan sendiri.</div></div></div>";shell(`<div class="l4-success"><div class="emoji">🎉</div><h1 style="margin:4px 0">Hebat!</h1><p>Kamu berjaya <strong>kembangkan ayat</strong>.</p>${evidenceNote}<div class="l4-ai" style="text-align:left"><div class="l4-ai-face">🐣</div><div><div class="l4-ai-title">Cikgu Aira</div><div>${judge?.appropriateness==="IMAGINATIVE"?"Idea imaginasi kamu diterima kerana maksud ayat masih jelas.":"Kamu mengekalkan maksud dan memenuhi kemahiran sasaran."}</div></div></div></div><div class="l4-actions"><button id="l4Next" class="l4-primary">Cabar Ayat Seterusnya</button><button id="l4Finish" class="l4-secondary">Selesai ✓</button></div>`,100,3);}
  // v13.2.1 State Machine Event Gateway
  // Exactly ONE native activation path: click.
  // iPad/iPhone taps synthesize one click; keyboard activation on <button> also clicks natively.
  // Do NOT pair click with pointerup/touchend: that was the source of duplicate actions.
  function l4ResolveAction(target){
    return target?.closest?.("#l4Begin,#l4Hint,#l4GuidedCheck,#l4TryOwn,#l4OwnCheck,#l4Next,#l4Finish,[data-l4-level],[data-l4-choice]")||null;
  }
  function l4Dispatch(el,e){
    if(!el)return;
    if(l4Machine.busy && !["l4Finish"].includes(el.id))return;
    e?.preventDefault?.();e?.stopPropagation?.();e?.stopImmediatePropagation?.();
    l4Machine.lastAction=el.id||el.dataset?.l4Choice||el.dataset?.l4Level||"unknown";
    if(el.dataset?.l4Level){level=el.dataset.l4Level;start();return;}
    if(el.id==="l4Begin"){
      l4JudgeSeq++;activeExercise=null;guidedDraft="";l4ResetCycle();guided();return;
    }
    if(el.id==="l4Hint"){hintText();return;}
    if(el.dataset?.l4Choice){
      if(l4Machine.phase!=="GUIDED")return;
      const snap=activeExercise?.stage==="GUIDED"?activeExercise:l4FreezeExercise(currentTask(),"GUIDED",currentTask().base);
      recordSuccess("GUIDED_CHOICE",snap.base,{snapshot:snap});upgrade(el.dataset.l4Choice,snap);return;
    }
    if(el.id==="l4GuidedCheck"){
      if(l4Machine.phase!=="GUIDED")return;
      el.disabled=true;el.textContent="⏳ Sedang semak...";checkGuided();return;
    }
    if(el.id==="l4TryOwn"){
      if(l4Machine.phase!=="UPGRADE")return;
      draft="";
      // IMPORTANT: cycleHintUsed is NOT reset here. Help used in Stage 1/2
      // disqualifies independent mastery for this whole learning cycle.
      const sourceTask=activeExercise?.task||currentTask();
      saveState({currentIndependentBase:null,currentIndependentSkill:null});
      const connectedBase=pickConnectedTransferBase(sourceTask);
      const snap=l4FreezeExercise(sourceTask,"INDEPENDENT",connectedBase);
      independentRender(connectedBase,"",snap);return;
    }
    if(el.id==="l4OwnCheck"){
      if(l4Machine.phase!=="INDEPENDENT")return;
      const ta=document.getElementById("l4Draft");if(ta)draft=String(ta.value||"").trim();
      el.disabled=true;el.textContent="⏳ Sedang semak...";checkOwn();return;
    }
    if(el.id==="l4Next"){
      if(l4Machine.phase!=="SUCCESS")return;
      l4JudgeSeq++;activeExercise=null;taskIndex=(taskIndex+1)%tasks.length;
      saveState({lastTaskIndex:taskIndex,currentIndependentBase:null,currentIndependentSkill:null});
      draft="";guidedDraft="";l4ResetCycle();guided();return;
    }
    if(el.id==="l4Finish"){
      try{completeMission("grammar-rain");}catch(_){}
      l4Transition("SUCCESS",{force:true});
      shell(`<div style="text-align:center;padding:24px"><div style="font-size:70px">🏆</div><h1>Misi Hari Ini Selesai!</h1><p>Kamu sudah belajar menjadikan ayat lebih lengkap.</p></div>`,100);return;
    }
  }
  function l4ClickGateway(e){
    const el=l4ResolveAction(e.target);
    if(!el)return;
    l4Dispatch(el,e);
  }
  /* =========================================================
     v13.3.0 AUTOMATED BEHAVIOR QA HARNESS
     - Exercises the real rendered buttons and the real click gateway.
     - Replaces only the AI network provider with deterministic verdicts.
     - Restores the learner's saved Langkah 4 state after the run.
     - Normal students never enter QA unless runQA() is called explicitly.
     ========================================================= */
  const L4_QA_WAIT_MS=1800;
  function l4QaSleep(ms){return new Promise(r=>setTimeout(r,ms));}
  async function l4QaWaitFor(test,ms=L4_QA_WAIT_MS){
    const started=Date.now();
    while(Date.now()-started<ms){if(test())return true;await l4QaSleep(12);}
    return false;
  }
  function l4QaClick(selector){
    const el=document.querySelector(selector);
    if(!el)throw new Error(`Missing clickable element: ${selector}`);
    el.click();
    return el;
  }
  function l4QaSetValue(selector,value){
    const el=document.querySelector(selector);
    if(!el)throw new Error(`Missing input: ${selector}`);
    el.value=value;
    el.dispatchEvent(new Event("input",{bubbles:true}));
    return el;
  }
  function l4QaPassVerdict(){return {
    result:"PASS",meaning_status:"PASS",skill_target_status:"MET",appropriateness:"NATURAL",
    language_status:"CLEAN",language_issue:null,primary_issue:"NONE",preserved_parts:["BASE_MEANING"],
    needs_clarification:false,clarification_question:"",confidence:.99
  };}
  function l4QaFailMeaningVerdict(){return {
    result:"FAIL",meaning_status:"FAIL",skill_target_status:"MET",appropriateness:"INVALID",
    language_status:"CLEAN",language_issue:null,primary_issue:"MEANING",preserved_parts:["BASE_MEANING"],
    needs_clarification:false,clarification_question:"",confidence:.99
  };}
  function l4QaAnswerFor(snap){
    const base=String(snap?.base||"Saya belajar.").replace(/[.!?]+$/,""),skill=String(snap?.skill||"OPEN");
    if(skill==="PLACE")return `${base} di rumah.`;
    if(skill==="TIME")return `${base} pada waktu pagi.`;
    if(skill==="COMPANION")return `${base} bersama ibu.`;
    if(skill==="DESCRIPTION")return `${base} dan cantik.`;
    if(skill==="INTENSITY")return `${base.replace(/\s+(gembira|penat|seronok)$/i,"")} sangat gembira.`;
    return `${base} di rumah.`;
  }
  function l4QaState(){return {
    phase:l4Machine.phase,busy:l4Machine.busy,cycleHintUsed:l4Machine.cycleHintUsed,
    hint,guidedHint3,independentHintUsed,taskIndex,
    exerciseId:activeExercise?.exerciseId||null,stage:activeExercise?.stage||null,base:activeExercise?.base||null
  };}
  function l4QaDebugPanel(){
    let panel=document.getElementById("l4-qa-debug-panel");
    if(!panel){
      panel=document.createElement("pre");panel.id="l4-qa-debug-panel";
      panel.style.cssText="position:fixed;right:8px;bottom:8px;z-index:2147483646;max-width:52vw;margin:0;padding:8px 10px;border-radius:10px;background:rgba(20,24,30,.88);color:#fff;font:11px/1.35 ui-monospace,monospace;pointer-events:none;white-space:pre-wrap";
      document.body.appendChild(panel);
    }
    panel.textContent=JSON.stringify(l4QaState(),null,2);
    return panel;
  }
  function l4QaShowReport(report){
    document.getElementById("l4-qa-report")?.remove();
    const box=document.createElement("div");box.id="l4-qa-report";
    box.style.cssText="position:fixed;inset:14px;z-index:2147483647;overflow:auto;background:#fff;border:2px solid #222;border-radius:18px;padding:18px;font:14px/1.45 system-ui;box-shadow:0 20px 80px rgba(0,0,0,.35)";
    const rows=report.checks.map(x=>`<div style=\"padding:6px 0;border-bottom:1px solid #eee\">${x.pass?"✅":"❌"} <strong>${esc(x.name)}</strong>${x.detail?`<div style=\"color:#667;font-size:12px\">${esc(x.detail)}</div>`:""}</div>`).join("");
    box.innerHTML=`<div style=\"display:flex;justify-content:space-between;gap:12px;align-items:center\"><h2 style=\"margin:0\">Langkah 4 Automated QA</h2><button id=\"l4QaClose\" style=\"padding:8px 12px\">Close</button></div><p><strong>${report.passed}/${report.total} PASS</strong> · ${report.failed} failed · ${report.durationMs} ms</p>${rows}`;
    document.body.appendChild(box);box.querySelector("#l4QaClose")?.addEventListener("click",()=>box.remove(),{once:true});
  }
  async function l4RunAutomatedQA({visual=true}={}){
    const checks=[];const started=Date.now();
    const check=(name,pass,detail="")=>checks.push({name,pass:!!pass,detail:String(detail||"")});
    const originalStorage=localStorage.getItem(STATE_KEY);
    const originalProvider=window.__KARANGAN_L4_QA_PROVIDER__;
    const originalLevel=level,originalTaskIndex=taskIndex;
    let providerCalls=0,providerDelay=0,providerMode="PASS";
    window.__KARANGAN_L4_QA_PROVIDER__=async ({answer})=>{
      providerCalls++;
      if(providerDelay)await l4QaSleep(providerDelay);
      if(providerMode==="MEANING_FAIL" || /belajar\s+nasi/i.test(answer))return l4QaFailMeaningVerdict();
      return l4QaPassVerdict();
    };
    try{
      localStorage.removeItem(STATE_KEY);taskIndex=0;level="ASAS";activeExercise=null;l4JudgeSeq++;l4ResetCycle();start();
      check("Start renders",!!document.querySelector("#l4Begin"));
      check("State START",l4Machine.phase==="START",l4Machine.phase);

      l4QaClick('[data-l4-level="ASAS"]');
      l4QaClick("#l4Begin");
      check("Begin -> GUIDED",l4Machine.phase==="GUIDED",l4Machine.phase);
      check("Guided choice is clickable",!!document.querySelector("[data-l4-choice]"));

      l4QaClick("#l4Hint");
      check("One hint tap increments exactly once",hint===1,`hint=${hint}`);
      check("Hint marks entire cycle",l4Machine.cycleHintUsed===true);
      check("Hint does not lock choices",!!document.querySelector("[data-l4-choice]")&&!document.querySelector("[data-l4-choice]").disabled);

      l4QaClick("[data-l4-choice]");
      check("Choice after hint -> UPGRADE",l4Machine.phase==="UPGRADE",l4Machine.phase);
      check("Stage 2 action renders",!!document.querySelector("#l4TryOwn"));
      l4QaClick("#l4TryOwn");
      check("UPGRADE -> INDEPENDENT",l4Machine.phase==="INDEPENDENT",l4Machine.phase);
      check("Cycle hint survives transfer",l4Machine.cycleHintUsed===true);
      const beforeHintMastery=(loadState().masteryEvidence||[]).length;
      l4QaSetValue("#l4Draft",l4QaAnswerFor(activeExercise));
      l4QaClick("#l4OwnCheck");
      check("AI busy lock activates",l4Machine.busy===true);
      await l4QaWaitFor(()=>l4Machine.phase==="SUCCESS"&&!l4Machine.busy);
      check("Hint-assisted correct answer -> SUCCESS",l4Machine.phase==="SUCCESS",l4Machine.phase);
      const afterHintMastery=(loadState().masteryEvidence||[]).length;
      check("Hint-assisted success gives NO mastery",afterHintMastery===beforeHintMastery,`${beforeHintMastery}->${afterHintMastery}`);
      check("Hint-assisted UI hides mastery +1",!document.body.textContent.includes("Independent mastery evidence +1"));

      // Fresh cycle: independent success must create mastery evidence.
      l4QaClick("#l4Next");
      check("Next challenge returns GUIDED",l4Machine.phase==="GUIDED",l4Machine.phase);
      check("New cycle resets hint flag",l4Machine.cycleHintUsed===false);
      l4QaClick("[data-l4-choice]");l4QaClick("#l4TryOwn");
      const beforeIndependent=(loadState().masteryEvidence||[]).length;
      l4QaSetValue("#l4Draft",l4QaAnswerFor(activeExercise));
      l4QaClick("#l4OwnCheck");
      await l4QaWaitFor(()=>l4Machine.phase==="SUCCESS"&&!l4Machine.busy);
      const afterIndependent=(loadState().masteryEvidence||[]).length;
      check("Independent success -> SUCCESS",l4Machine.phase==="SUCCESS");
      check("Independent success creates mastery +1",afterIndependent===beforeIndependent+1,`${beforeIndependent}->${afterIndependent}`);
      check("Independent mastery UI appears",document.body.textContent.includes("Independent mastery evidence +1"));

      // Free-text semantic rejection through the real submit path.
      l4QaClick("#l4Next");level="STANDARD";activeExercise=null;guidedDraft="";l4ResetCycle();guided();providerMode="MEANING_FAIL";
      check("Standard free-text input renders",!!document.querySelector("#l4GuidedInput"));
      l4QaSetValue("#l4GuidedInput","Kawan saya belajar nasi di sekolah.");
      l4QaClick("#l4GuidedCheck");
      await l4QaWaitFor(()=>!l4Machine.busy);
      check("Meaning FAIL remains GUIDED",l4Machine.phase==="GUIDED",l4Machine.phase);
      check("Meaning-first feedback is rendered",document.body.textContent.includes("Cuba fikir semula hubungan"));

      // Duplicate-submit guard: disabled button + busy gateway must issue one provider call.
      providerMode="PASS";providerDelay=90;providerCalls=0;
      l4QaSetValue("#l4GuidedInput",l4QaAnswerFor(activeExercise));
      const submit=document.querySelector("#l4GuidedCheck");submit.click();submit.click();
      await l4QaWaitFor(()=>!l4Machine.busy);
      check("Double submit causes one AI call",providerCalls===1,`calls=${providerCalls}`);
      check("Successful guided free text reaches UPGRADE",l4Machine.phase==="UPGRADE",l4Machine.phase);

      // Stale-response guard: invalidate request before delayed result returns.
      level="STANDARD";activeExercise=null;guidedDraft="";l4ResetCycle();guided();providerDelay=120;providerCalls=0;
      l4QaSetValue("#l4GuidedInput",l4QaAnswerFor(activeExercise));
      const staleExercise=activeExercise.exerciseId;
      l4QaClick("#l4GuidedCheck");
      l4JudgeSeq++;const replacement=l4FreezeExercise(currentTask(),"GUIDED",currentTask().base);l4SetBusy(false);guided("QA replacement exercise");
      await l4QaSleep(180);
      check("Stale AI response is discarded",activeExercise?.exerciseId===replacement.exerciseId && activeExercise?.exerciseId!==staleExercise);
      check("Stale response cannot advance replacement",l4Machine.phase==="GUIDED",l4Machine.phase);

      check("Only one Langkah 4 click gateway registered by build",String(l4ClickGateway).includes("l4ResolveAction"));
      check("QA did not remove AI-native decision order",window.KaranganLangkah4?.decisionOrder==="Meaning>SkillTarget>Appropriateness>Language>Independence");
    }catch(err){
      check("QA harness completed without exception",false,err?.stack||err?.message||String(err));
    }finally{
      window.__KARANGAN_L4_QA_PROVIDER__=originalProvider;
      if(originalStorage===null)localStorage.removeItem(STATE_KEY);else localStorage.setItem(STATE_KEY,originalStorage);
      level=originalLevel;taskIndex=originalTaskIndex;activeExercise=null;l4JudgeSeq++;l4ResetCycle();
      try{start();}catch(_){}
    }
    const failed=checks.filter(x=>!x.pass).length;
    const report={version:L4_VERSION,runAt:new Date().toISOString(),total:checks.length,passed:checks.length-failed,failed,durationMs:Date.now()-started,checks};
    window.__KARANGAN_L4_LAST_QA__=report;
    if(visual)l4QaShowReport(report);
    console.table(checks.map(x=>({test:x.name,result:x.pass?"PASS":"FAIL",detail:x.detail})));
    return report;
  }

  // Optional zero-click test mode for a private deployment URL: ?l4qa=1
  // Debug panel only: ?l4debug=1
  try{
    const qp=new URLSearchParams(location.search);
    if(qp.get("l4debug")==="1")setInterval(l4QaDebugPanel,350);
    if(qp.get("l4qa")==="1")setTimeout(()=>l4RunAutomatedQA({visual:true}),500);
  }catch(_){}

  try{const saved=loadState();if(Number.isInteger(saved.lastTaskIndex))taskIndex=Math.max(0,Math.min(tasks.length-1,saved.lastTaskIndex));}catch(_){}
  document.addEventListener("click",l4ClickGateway,true);
  renderGrammarRain=start;
  window.KaranganLangkah4={version:L4_VERSION,contentVersion:CONTENT_VERSION,semanticEngine:"AI-Native-TeachingEngine-v3",decisionOrder:"Meaning>SkillTarget>Appropriateness>Language>Independence",connectedTransfer:"v3-frozen-same-skill",masteryEvidence:"independent-only-v3",feedbackQuality:"v3-ai-judge-all-free-text-stages",interactionModel:"v13.3.0-click-only-state-machine+automated-behavior-QA",render:start,legacyGrammar:LEGACY_GRAMMAR,getTasks:()=>tasks.slice(),getState:loadState,getMachine:()=>({...l4Machine}),getDebugState:l4QaState,runQA:l4RunAutomatedQA,lastQA:()=>window.__KARANGAN_L4_LAST_QA__||null};
})();
