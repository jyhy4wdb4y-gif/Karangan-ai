/* =========================================================
   KARANGAN AI — vocabulary.js
   Buku Kosa Kata / Vocabulary Learning Engine
   Version: 1.0
   ========================================================= */

(() => {
  "use strict";

  /* =========================================================
     1. CONFIG
     ========================================================= */

  const STORAGE_KEY = "karangan_ai_vocabulary_v1";

  const XP_REWARDS = {
    ADD_WORD: 2,
    REVIEW_WORD: 2,
    MASTER_WORD: 5,
    COMPLETE_REVIEW: 10,
  };

  /* =========================================================
     2. STARTER VOCABULARY
     These can later be replaced by story vocabulary.
     ========================================================= */

  const STARTER_WORDS = [
    {
      word: "gembira",
      translation: "开心 / 高兴",
      meaning: "Perasaan senang dan bahagia.",
      example: "Aina berasa gembira kerana mendapat hadiah.",
      category: "Perasaan",
      emoji: "😊",
    },
    {
      word: "rajin",
      translation: "勤劳 / 用功",
      meaning: "Suka melakukan sesuatu dengan tekun.",
      example: "Amir seorang murid yang rajin belajar.",
      category: "Sikap",
      emoji: "📚",
    },
    {
      word: "membantu",
      translation: "帮助",
      meaning: "Memberikan pertolongan kepada seseorang.",
      example: "Siti membantu ibunya di dapur.",
      category: "Perbuatan",
      emoji: "🤝",
    },
    {
      word: "bersih",
      translation: "干净",
      meaning: "Tidak kotor.",
      example: "Kita mesti memastikan kelas sentiasa bersih.",
      category: "Kata Adjektif",
      emoji: "✨",
    },
    {
      word: "menjaga",
      translation: "照顾 / 保护",
      meaning: "Memelihara atau memastikan sesuatu berada dalam keadaan baik.",
      example: "Kita perlu menjaga kebersihan sekolah.",
      category: "Perbuatan",
      emoji: "🌱",
    },
    {
      word: "berani",
      translation: "勇敢",
      meaning: "Tidak takut menghadapi sesuatu.",
      example: "Hakim berani mencuba perkara baharu.",
      category: "Sikap",
      emoji: "🦁",
    },
  ];

  /* =========================================================
     3. HELPERS
     ========================================================= */

  function createId(word = "") {
    const clean = word
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\u00C0-\u024F]+/g, "-");

    return `${clean || "word"}-${Date.now()}-${Math.floor(
      Math.random() * 9999
    )}`;
  }

  function normalizeWord(word) {
    return String(word || "").trim().toLowerCase();
  }

  function todayString() {
    const date = new Date();

    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
  }

  function safeParse(value, fallback) {
    try {
      return JSON.parse(value);
    } catch (error) {
      console.warn("[Vocabulary] Failed to parse storage:", error);
      return fallback;
    }
  }

  /* =========================================================
     4. STORAGE
     ========================================================= */

  function getDefaultState() {
    return {
      version: 1,
      words: [],
      stats: {
        totalAdded: 0,
        totalReviews: 0,
        totalMastered: 0,
        xpEarned: 0,
      },
      daily: {
        date: todayString(),
        reviewedWords: [],
        completed: false,
      },
    };
  }

  function loadState() {
    const stored = localStorage.getItem(STORAGE_KEY);

    if (!stored) {
      return getDefaultState();
    }

    const state = safeParse(stored, getDefaultState());

    if (!state.words) state.words = [];
    if (!state.stats) state.stats = getDefaultState().stats;
    if (!state.daily) state.daily = getDefaultState().daily;

    resetDailyIfNeeded(state);

    return state;
  }

  function saveState(state) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function resetDailyIfNeeded(state) {
    const today = todayString();

    if (!state.daily || state.daily.date !== today) {
      state.daily = {
        date: today,
        reviewedWords: [],
        completed: false,
      };

      saveState(state);
    }
  }

  let state = loadState();

  /* =========================================================
     5. XP CONNECTION
     Flexible connector for future app.js XP system.
     ========================================================= */

  function awardXP(amount, reason = "") {
    if (!amount || amount <= 0) return;

    state.stats.xpEarned =
      Number(state.stats.xpEarned || 0) + Number(amount);

    saveState(state);

    /*
      Future app.js can listen for this event:
      window.addEventListener("karangan:xp-earned", ...)
    */

    window.dispatchEvent(
      new CustomEvent("karangan:xp-earned", {
        detail: {
          amount,
          reason,
          source: "vocabulary",
        },
      })
    );

    /*
      Optional compatibility:
      If app.js eventually exposes addXP(),
      vocabulary.js will use it automatically.
    */

    if (typeof window.addXP === "function") {
      try {
        window.addXP(amount, reason);
      } catch (error) {
        console.warn("[Vocabulary] addXP integration error:", error);
      }
    }
  }

  /* =========================================================
     6. WORD MANAGEMENT
     ========================================================= */

  function addWord(wordData = {}) {
    const word = String(wordData.word || "").trim();

    if (!word) {
      return {
        success: false,
        message: "Perkataan tidak boleh kosong.",
      };
    }

    const normalized = normalizeWord(word);

    const existing = state.words.find(
      (item) => normalizeWord(item.word) === normalized
    );

    if (existing) {
      return {
        success: false,
        duplicate: true,
        word: existing,
        message: `"${word}" sudah ada dalam Buku Kosa Kata.`,
      };
    }

    const newWord = {
      id: wordData.id || createId(word),

      word,

      translation:
        wordData.translation ||
        wordData.chinese ||
        wordData.cn ||
        "",

      meaning:
        wordData.meaning ||
        wordData.definition ||
        "",

      example:
        wordData.example ||
        wordData.sentence ||
        "",

      category:
        wordData.category ||
        "Perkataan Baharu",

      emoji:
        wordData.emoji ||
        "🧠",

      source:
        wordData.source ||
        "cerita",

      storyId:
        wordData.storyId ||
        null,

      mastered: false,

      reviewCount: 0,

      correctCount: 0,

      wrongCount: 0,

      addedAt: new Date().toISOString(),

      lastReviewedAt: null,
    };

    state.words.unshift(newWord);

    state.stats.totalAdded =
      Number(state.stats.totalAdded || 0) + 1;

    saveState(state);

    awardXP(XP_REWARDS.ADD_WORD, "Tambah perkataan baharu");

    dispatchVocabularyChanged("word-added", newWord);

    return {
      success: true,
      word: newWord,
      message: `"${word}" disimpan dalam Buku Kosa Kata.`,
    };
  }

  function removeWord(id) {
    const index = state.words.findIndex((word) => word.id === id);

    if (index === -1) {
      return false;
    }

    const removed = state.words[index];

    state.words.splice(index, 1);

    saveState(state);

    dispatchVocabularyChanged("word-removed", removed);

    return true;
  }

  function getWords() {
    resetDailyIfNeeded(state);

    return [...state.words];
  }

  function getWord(id) {
    return state.words.find((word) => word.id === id) || null;
  }

  function findWord(word) {
    const normalized = normalizeWord(word);

    return (
      state.words.find(
        (item) => normalizeWord(item.word) === normalized
      ) || null
    );
  }

  function hasWord(word) {
    return Boolean(findWord(word));
  }

  function toggleWord(wordData) {
    const existing = findWord(wordData.word);

    if (existing) {
      removeWord(existing.id);

      return {
        success: true,
        removed: true,
        word: existing,
      };
    }

    return addWord(wordData);
  }

  /* =========================================================
     7. REVIEW ENGINE
     ========================================================= */

  function getReviewWords(limit = 5) {
    resetDailyIfNeeded(state);

    const notMastered = state.words.filter(
      (word) => !word.mastered
    );

    /*
      Priority:
      1. Lowest review count
      2. Oldest review
      3. New words
    */

    const sorted = [...notMastered].sort((a, b) => {
      const aReviews = Number(a.reviewCount || 0);
      const bReviews = Number(b.reviewCount || 0);

      if (aReviews !== bReviews) {
        return aReviews - bReviews;
      }

      if (!a.lastReviewedAt && b.lastReviewedAt) return -1;
      if (a.lastReviewedAt && !b.lastReviewedAt) return 1;

      if (a.lastReviewedAt && b.lastReviewedAt) {
        return (
          new Date(a.lastReviewedAt) -
          new Date(b.lastReviewedAt)
        );
      }

      return new Date(a.addedAt) - new Date(b.addedAt);
    });

    return sorted.slice(0, limit);
  }

  function reviewWord(id, correct = true) {
    resetDailyIfNeeded(state);

    const word = getWord(id);

    if (!word) {
      return {
        success: false,
        message: "Perkataan tidak dijumpai.",
      };
    }

    word.reviewCount =
      Number(word.reviewCount || 0) + 1;

    word.lastReviewedAt =
      new Date().toISOString();

    if (correct) {
      word.correctCount =
        Number(word.correctCount || 0) + 1;
    } else {
      word.wrongCount =
        Number(word.wrongCount || 0) + 1;

      /*
        If student gets it wrong,
        remove mastered state so it returns to review.
      */

      if (word.mastered) {
        word.mastered = false;

        state.stats.totalMastered = Math.max(
          0,
          Number(state.stats.totalMastered || 0) - 1
        );
      }
    }

    if (!state.daily.reviewedWords.includes(id)) {
      state.daily.reviewedWords.push(id);
    }

    state.stats.totalReviews =
      Number(state.stats.totalReviews || 0) + 1;

    saveState(state);

    awardXP(
      XP_REWARDS.REVIEW_WORD,
      correct
        ? "Ulang kaji perkataan"
        : "Latihan perkataan"
    );

    dispatchVocabularyChanged(
      "word-reviewed",
      word
    );

    return {
      success: true,
      word,
      correct,
    };
  }

  function markMastered(id, mastered = true) {
    const word = getWord(id);

    if (!word) {
      return {
        success: false,
      };
    }

    const previous = Boolean(word.mastered);

    word.mastered = Boolean(mastered);

    if (!previous && word.mastered) {
      state.stats.totalMastered =
        Number(state.stats.totalMastered || 0) + 1;

      awardXP(
        XP_REWARDS.MASTER_WORD,
        "Kuasai perkataan"
      );
    }

    if (previous && !word.mastered) {
      state.stats.totalMastered = Math.max(
        0,
        Number(state.stats.totalMastered || 0) - 1
      );
    }

    saveState(state);

    dispatchVocabularyChanged(
      "mastery-changed",
      word
    );

    return {
      success: true,
      word,
    };
  }

  /* =========================================================
     8. DAILY MISSION
     ========================================================= */

  function getDailyProgress() {
    resetDailyIfNeeded(state);

    const reviewed =
      state.daily.reviewedWords.length;

    const target = Math.min(
      5,
      Math.max(1, state.words.length)
    );

    return {
      reviewed,
      target,
      completed:
        state.daily.completed ||
        reviewed >= target,
    };
  }

  function completeDailyReview() {
    resetDailyIfNeeded(state);

    if (state.daily.completed) {
      return {
        success: false,
        alreadyCompleted: true,
      };
    }

    state.daily.completed = true;

    saveState(state);

    awardXP(
      XP_REWARDS.COMPLETE_REVIEW,
      "Selesai Buku Kosa Kata"
    );

    window.dispatchEvent(
      new CustomEvent(
        "karangan:mission-completed",
        {
          detail: {
            mission: "vocabulary",
            missionStep: 2,
            title: "Buku Kosa Kata",
          },
        }
      )
    );

    return {
      success: true,
    };
  }

  /* =========================================================
     9. STATISTICS
     ========================================================= */

  function getStats() {
    const total = state.words.length;

    const mastered =
      state.words.filter(
        (word) => word.mastered
      ).length;

    const learning = total - mastered;

    return {
      total,
      mastered,
      learning,
      totalAdded:
        Number(state.stats.totalAdded || 0),

      totalReviews:
        Number(state.stats.totalReviews || 0),

      xpEarned:
        Number(state.stats.xpEarned || 0),

      masteryPercent:
        total > 0
          ? Math.round(
              (mastered / total) * 100
            )
          : 0,

      daily:
        getDailyProgress(),
    };
  }

  /* =========================================================
     10. SEARCH & FILTER
     ========================================================= */

  function searchWords(query = "") {
    const text = normalizeWord(query);

    if (!text) {
      return getWords();
    }

    return state.words.filter((item) => {
      const haystack = [
        item.word,
        item.translation,
        item.meaning,
        item.example,
        item.category,
      ]
        .join(" ")
        .toLowerCase();

      return haystack.includes(text);
    });
  }

  function getWordsByCategory(category) {
    if (!category) {
      return getWords();
    }

    return state.words.filter(
      (word) =>
        String(word.category)
          .toLowerCase() ===
        String(category).toLowerCase()
    );
  }

  function getCategories() {
    return [
      ...new Set(
        state.words
          .map((word) => word.category)
          .filter(Boolean)
      ),
    ];
  }

  /* =========================================================
     11. STORY INTEGRATION
     ========================================================= */

  function saveFromStory({
    word,
    translation = "",
    meaning = "",
    example = "",
    category = "Cerita",
    storyId = null,
    emoji = "📖",
  }) {
    return addWord({
      word,
      translation,
      meaning,
      example,
      category,
      storyId,
      emoji,
      source: "cerita",
    });
  }

  /*
    Example usage later from stories.js:

    KaranganVocabulary.saveFromStory({
      word: "gembira",
      translation: "开心",
      meaning: "Perasaan senang dan bahagia.",
      example: "Ali berasa gembira.",
      storyId: "story-001"
    });
  */

  /* =========================================================
     12. STARTER DATA
     Only runs when vocabulary is completely empty.
     ========================================================= */

  function seedStarterWords() {
    if (state.words.length > 0) {
      return false;
    }

    STARTER_WORDS.forEach(
      (starter, index) => {
        state.words.push({
          id:
            "starter-" +
            (index + 1),

          ...starter,

          source:
            "starter",

          storyId:
            null,

          mastered:
            false,

          reviewCount:
            0,

          correctCount:
            0,

          wrongCount:
            0,

          addedAt:
            new Date(
              Date.now() -
                index * 1000
            ).toISOString(),

          lastReviewedAt:
            null,
        });
      }
    );

    saveState(state);

    dispatchVocabularyChanged(
      "starter-data-created",
      null
    );

    return true;
  }

  /* =========================================================
     13. RESET
     Useful during development.
     ========================================================= */

  function resetVocabulary({
    includeStarterWords = true,
  } = {}) {
    state = getDefaultState();

    saveState(state);

    if (includeStarterWords) {
      seedStarterWords();
    }

    dispatchVocabularyChanged(
      "vocabulary-reset",
      null
    );

    return getWords();
  }

  /* =========================================================
     14. EVENTS
     ========================================================= */

  function dispatchVocabularyChanged(
    action,
    payload
  ) {
    window.dispatchEvent(
      new CustomEvent(
        "karangan:vocabulary-changed",
        {
          detail: {
            action,
            payload,
            stats: getStats(),
          },
        }
      )
    );
  }

  /* =========================================================
     15. PUBLIC API
     ========================================================= */

  window.KaranganVocabulary = {
    addWord,
    removeWord,
    toggleWord,

    getWords,
    getWord,
    findWord,
    hasWord,

    saveFromStory,

    getReviewWords,
    reviewWord,
    markMastered,

    getDailyProgress,
    completeDailyReview,

    getStats,

    searchWords,
    getWordsByCategory,
    getCategories,

    seedStarterWords,
    resetVocabulary,

    XP_REWARDS,
  };

  /* =========================================================
     16. INITIALIZATION
     ========================================================= */

  resetDailyIfNeeded(state);

  /*
    For the development version we add starter vocabulary
    automatically so Buku Kosa Kata is not empty.
  */

  seedStarterWords();

  console.log(
    "✅ Karangan AI Vocabulary Engine loaded",
    getStats()
  );
})();
