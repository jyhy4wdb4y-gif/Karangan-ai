/* =========================================================
   KARANGAN AI — vocabulary.js
   Vocabulary + Translation Dictionary Engine
   Version: 2.0
   ========================================================= */

(() => {

  "use strict";


  /* =========================================================
     1. CONFIG
     ========================================================= */

  const STORAGE_KEY =
    "karangan_ai_vocabulary_v1";


  const XP_REWARDS = {

    ADD_WORD: 2,

    REVIEW_WORD: 2,

    MASTER_WORD: 5,

    COMPLETE_REVIEW: 10

  };


  /* =========================================================
     2. TRANSLATION DICTIONARY

     Bahasa Melayu
     → Chinese
     → English
     → Simple BM meaning
     ========================================================= */

  const TRANSLATION_DICTIONARY = {


    /* ---------------------------------------------------------
       BASIC / STORY WORDS
       --------------------------------------------------------- */

    pada: {
      zh: "在 / 于",
      en: "at / on",
      meaning:
        "Digunakan untuk menunjukkan masa atau tempat."
    },


    pagi: {
      zh: "早上",
      en: "morning",
      meaning:
        "Waktu selepas matahari terbit."
    },


    yang: {
      zh: "的 / 那个",
      en: "that / which / who",
      meaning:
        "Kata penghubung untuk menerangkan sesuatu."
    },


    cerah: {
      zh: "晴朗 / 明亮",
      en: "bright / clear",
      meaning:
        "Keadaan yang terang dan tidak gelap."
    },


    aiman: {
      zh: "艾曼（名字）",
      en: "Aiman (name)",
      meaning:
        "Nama seorang."
    },


    bangun: {
      zh: "起床 / 起来",
      en: "wake up / get up",
      meaning:
        "Bergerak daripada tidur atau duduk."
    },


    awal: {
      zh: "早 / 提早",
      en: "early",
      meaning:
        "Sebelum waktu biasa."
    },


    untuk: {
      zh: "为了 / 给",
      en: "for / to",
      meaning:
        "Digunakan untuk menunjukkan tujuan."
    },


    membantu: {
      zh: "帮助",
      en: "help",
      meaning:
        "Memberikan pertolongan kepada seseorang."
    },


    bantu: {
      zh: "帮助",
      en: "help",
      meaning:
        "Memberikan pertolongan."
    },


    ibunya: {
      zh: "他的母亲 / 她的母亲",
      en: "his/her mother",
      meaning:
        "Ibu kepada seseorang."
    },


    ibu: {
      zh: "母亲 / 妈妈",
      en: "mother",
      meaning:
        "Perempuan yang mempunyai anak."
    },


    di: {
      zh: "在",
      en: "at / in",
      meaning:
        "Kata sendi untuk menunjukkan tempat."
    },


    rumah: {
      zh: "家 / 房子",
      en: "home / house",
      meaning:
        "Tempat seseorang tinggal."
    },


    selepas: {
      zh: "之后",
      en: "after",
      meaning:
        "Sesudah sesuatu berlaku."
    },


    bersarapan: {
      zh: "吃早餐",
      en: "have breakfast",
      meaning:
        "Makan makanan pada waktu pagi."
    },


    sarapan: {
      zh: "早餐",
      en: "breakfast",
      meaning:
        "Makanan yang dimakan pada waktu pagi."
    },


    menyusun: {
      zh: "整理 / 排列",
      en: "arrange / organize",
      meaning:
        "Meletakkan sesuatu dalam susunan yang teratur."
    },


    susun: {
      zh: "排列 / 整理",
      en: "arrange",
      meaning:
        "Meletakkan sesuatu dengan teratur."
    },


    buku: {
      zh: "书",
      en: "book",
      meaning:
        "Bahan bacaan yang mempunyai halaman."
    },


    dan: {
      zh: "和 / 与",
      en: "and",
      meaning:
        "Kata yang menghubungkan dua perkara."
    },


    membersihkan: {
      zh: "清洁 / 打扫",
      en: "clean",
      meaning:
        "Menjadikan sesuatu bersih."
    },


    bersih: {
      zh: "干净",
      en: "clean",
      meaning:
        "Tidak kotor."
    },


    meja: {
      zh: "桌子",
      en: "table / desk",
      meaning:
        "Perabot yang mempunyai permukaan rata."
    },


    belajarnya: {
      zh: "他的学习 / 她的学习",
      en: "his/her study",
      meaning:
        "Berkaitan dengan kegiatan belajar seseorang."
    },


    belajar: {
      zh: "学习",
      en: "study / learn",
      meaning:
        "Mendapatkan ilmu atau kemahiran."
    },


    berasa: {
      zh: "感到 / 感觉",
      en: "feel",
      meaning:
        "Mengalami sesuatu perasaan."
    },


    rasa: {
      zh: "感觉 / 感受",
      en: "feel / feeling",
      meaning:
        "Sesuatu yang dialami oleh perasaan."
    },


    gembira: {
      zh: "开心 / 高兴",
      en: "happy",
      meaning:
        "Perasaan senang dan bahagia."
    },


    kerana: {
      zh: "因为",
      en: "because",
      meaning:
        "Digunakan untuk menyatakan sebab."
    },


    seorang: {
      zh: "一个人 / 一位",
      en: "a person / one",
      meaning:
        "Penjodoh bilangan untuk manusia."
    },


    anak: {
      zh: "孩子",
      en: "child",
      meaning:
        "Anak lelaki atau perempuan dalam sebuah keluarga."
    },


    rajin: {
      zh: "勤劳 / 用功",
      en: "diligent / hardworking",
      meaning:
        "Suka melakukan sesuatu dengan tekun."
    },


    bertanggungjawab: {
      zh: "负责任",
      en: "responsible",
      meaning:
        "Melaksanakan tugas atau kewajipan dengan baik."
    },


    tanggungjawab: {
      zh: "责任",
      en: "responsibility",
      meaning:
        "Tugas atau kewajipan yang perlu dilakukan."
    },


    juga: {
      zh: "也",
      en: "also",
      meaning:
        "Menunjukkan sesuatu yang turut berlaku."
    },


    berjanji: {
      zh: "答应 / 承诺",
      en: "promise",
      meaning:
        "Memberikan janji untuk melakukan sesuatu."
    },


    janji: {
      zh: "承诺 / 约定",
      en: "promise",
      meaning:
        "Kata bahawa sesuatu akan dilakukan."
    },


    menyiapkan: {
      zh: "完成 / 准备好",
      en: "complete / finish",
      meaning:
        "Menjadikan sesuatu siap."
    },


    siap: {
      zh: "完成 / 准备好",
      en: "ready / complete",
      meaning:
        "Sudah selesai dilakukan."
    },


    kerja: {
      zh: "工作 / 作业",
      en: "work",
      meaning:
        "Tugas yang perlu dilakukan."
    },


    sekolah: {
      zh: "学校",
      en: "school",
      meaning:
        "Tempat murid belajar."
    },


    sebelum: {
      zh: "之前",
      en: "before",
      meaning:
        "Lebih awal daripada sesuatu masa atau kejadian."
    },


    bermain: {
      zh: "玩 / 玩耍",
      en: "play",
      meaning:
        "Melakukan aktiviti untuk berseronok."
    },


    main: {
      zh: "玩",
      en: "play",
      meaning:
        "Melakukan sesuatu untuk berseronok."
    },


    bersama: {
      zh: "一起",
      en: "together / with",
      meaning:
        "Melakukan sesuatu dengan orang lain."
    },


    kawannya: {
      zh: "他的朋友 / 她的朋友",
      en: "his/her friend",
      meaning:
        "Rakan kepada seseorang."
    },


    kawan: {
      zh: "朋友",
      en: "friend",
      meaning:
        "Orang yang rapat dan sering bersama."
    },


    /* ---------------------------------------------------------
       SCHOOL WORDS
       --------------------------------------------------------- */

    murid: {
      zh: "学生",
      en: "student / pupil",
      meaning:
        "Orang yang belajar di sekolah."
    },


    guru: {
      zh: "老师",
      en: "teacher",
      meaning:
        "Orang yang mengajar murid."
    },


    cikgu: {
      zh: "老师",
      en: "teacher",
      meaning:
        "Panggilan kepada guru."
    },


    kelas: {
      zh: "班级 / 课室",
      en: "class / classroom",
      meaning:
        "Tempat murid belajar."
    },


    membaca: {
      zh: "阅读",
      en: "read",
      meaning:
        "Melihat dan memahami tulisan."
    },


    baca: {
      zh: "读",
      en: "read",
      meaning:
        "Melihat dan memahami tulisan."
    },


    menulis: {
      zh: "写",
      en: "write",
      meaning:
        "Menghasilkan huruf atau perkataan."
    },


    tulis: {
      zh: "写",
      en: "write",
      meaning:
        "Menghasilkan tulisan."
    },


    pensel: {
      zh: "铅笔",
      en: "pencil",
      meaning:
        "Alat yang digunakan untuk menulis atau melukis."
    },


    pen: {
      zh: "笔",
      en: "pen",
      meaning:
        "Alat untuk menulis menggunakan dakwat."
    },


    pemadam: {
      zh: "橡皮擦",
      en: "eraser",
      meaning:
        "Alat untuk memadam tulisan pensel."
    },


    beg: {
      zh: "书包 / 袋子",
      en: "bag",
      meaning:
        "Bekas untuk membawa barang."
    },


    perpustakaan: {
      zh: "图书馆",
      en: "library",
      meaning:
        "Tempat menyimpan dan membaca buku."
    },


    kantin: {
      zh: "食堂",
      en: "canteen",
      meaning:
        "Tempat membeli dan makan makanan di sekolah."
    },


    padang: {
      zh: "操场 / 草场",
      en: "field",
      meaning:
        "Kawasan lapang untuk aktiviti."
    },


    /* ---------------------------------------------------------
       FEELINGS
       --------------------------------------------------------- */

    sedih: {
      zh: "伤心",
      en: "sad",
      meaning:
        "Perasaan tidak gembira."
    },


    marah: {
      zh: "生气",
      en: "angry",
      meaning:
        "Perasaan tidak puas hati."
    },


    takut: {
      zh: "害怕",
      en: "afraid",
      meaning:
        "Perasaan bimbang terhadap sesuatu."
    },


    terkejut: {
      zh: "惊讶",
      en: "surprised",
      meaning:
        "Perasaan apabila berlaku sesuatu yang tidak dijangka."
    },


    bangga: {
      zh: "自豪",
      en: "proud",
      meaning:
        "Perasaan gembira terhadap kejayaan."
    },


    sayang: {
      zh: "爱 / 疼爱",
      en: "love / care",
      meaning:
        "Perasaan kasih kepada seseorang."
    },


    /* ---------------------------------------------------------
       GOOD VALUES
       --------------------------------------------------------- */

    berani: {
      zh: "勇敢",
      en: "brave",
      meaning:
        "Tidak takut menghadapi sesuatu."
    },


    baik: {
      zh: "好 / 善良",
      en: "good / kind",
      meaning:
        "Mempunyai sifat yang bagus."
    },


    sopan: {
      zh: "有礼貌",
      en: "polite",
      meaning:
        "Beradab dan mempunyai tingkah laku yang baik."
    },


    jujur: {
      zh: "诚实",
      en: "honest",
      meaning:
        "Bercakap dan bertindak dengan benar."
    },


    sabar: {
      zh: "有耐心",
      en: "patient",
      meaning:
        "Tenang ketika menghadapi kesukaran."
    },


    tekun: {
      zh: "勤奋 / 专心",
      en: "diligent",
      meaning:
        "Bersungguh-sungguh melakukan sesuatu."
    },


    /* ---------------------------------------------------------
       ACTION WORDS
       --------------------------------------------------------- */

    makan: {
      zh: "吃",
      en: "eat",
      meaning:
        "Mengambil makanan."
    },


    minum: {
      zh: "喝",
      en: "drink",
      meaning:
        "Mengambil minuman."
    },


    berjalan: {
      zh: "走路",
      en: "walk",
      meaning:
        "Bergerak dengan menggunakan kaki."
    },


    jalan: {
      zh: "走 / 道路",
      en: "walk / road",
      meaning:
        "Bergerak dengan kaki atau laluan untuk bergerak."
    },


    berlari: {
      zh: "跑",
      en: "run",
      meaning:
        "Bergerak dengan cepat menggunakan kaki."
    },


    lari: {
      zh: "跑",
      en: "run",
      meaning:
        "Bergerak dengan cepat."
    },


    duduk: {
      zh: "坐",
      en: "sit",
      meaning:
        "Meletakkan badan pada kerusi atau tempat duduk."
    },


    berdiri: {
      zh: "站",
      en: "stand",
      meaning:
        "Berada dalam keadaan tegak."
    },


    melihat: {
      zh: "看",
      en: "see / look",
      meaning:
        "Menggunakan mata untuk memandang."
    },


    lihat: {
      zh: "看",
      en: "look / see",
      meaning:
        "Menggunakan mata untuk memandang."
    },


    mendengar: {
      zh: "听",
      en: "listen / hear",
      meaning:
        "Menggunakan telinga untuk menerima bunyi."
    },


    dengar: {
      zh: "听",
      en: "listen",
      meaning:
        "Menggunakan telinga untuk menerima bunyi."
    },


    bercakap: {
      zh: "说话",
      en: "speak / talk",
      meaning:
        "Mengeluarkan kata-kata."
    },


    membawa: {
      zh: "带 / 携带",
      en: "bring / carry",
      meaning:
        "Memegang dan memindahkan sesuatu."
    },


    mengambil: {
      zh: "拿 / 取",
      en: "take",
      meaning:
        "Mendapatkan atau memegang sesuatu."
    },


    memberi: {
      zh: "给",
      en: "give",
      meaning:
        "Menyerahkan sesuatu kepada orang lain."
    },


    menjaga: {
      zh: "照顾 / 保护",
      en: "take care / protect",
      meaning:
        "Memelihara sesuatu supaya berada dalam keadaan baik."
    },


    /* ---------------------------------------------------------
       TIME
       --------------------------------------------------------- */

    hari: {
      zh: "天 / 日",
      en: "day",
      meaning:
        "Tempoh masa dari pagi hingga malam."
    },


    petang: {
      zh: "下午 / 傍晚",
      en: "afternoon / evening",
      meaning:
        "Waktu selepas tengah hari."
    },


    malam: {
      zh: "晚上",
      en: "night",
      meaning:
        "Waktu selepas matahari terbenam."
    },


    semalam: {
      zh: "昨天",
      en: "yesterday",
      meaning:
        "Hari sebelum hari ini."
    },


    hariini: {
      zh: "今天",
      en: "today",
      meaning:
        "Hari yang sedang dilalui."
    },


    esok: {
      zh: "明天",
      en: "tomorrow",
      meaning:
        "Hari selepas hari ini."
    },


    /* ---------------------------------------------------------
       PLACES / ENVIRONMENT
       --------------------------------------------------------- */

    taman: {
      zh: "公园 / 花园",
      en: "park / garden",
      meaning:
        "Kawasan yang mempunyai tumbuhan atau tempat rekreasi."
    },


    sungai: {
      zh: "河流",
      en: "river",
      meaning:
        "Aliran air semula jadi."
    },


    pokok: {
      zh: "树",
      en: "tree",
      meaning:
        "Tumbuhan besar yang mempunyai batang."
    },


    bunga: {
      zh: "花",
      en: "flower",
      meaning:
        "Bahagian tumbuhan yang biasanya berwarna-warni."
    },


    sampah: {
      zh: "垃圾",
      en: "rubbish / trash",
      meaning:
        "Barang yang tidak diperlukan dan dibuang."
    },


    kebersihan: {
      zh: "清洁 / 卫生",
      en: "cleanliness",
      meaning:
        "Keadaan yang bersih."
    },


    /* ---------------------------------------------------------
       COMMON DESCRIPTIVE WORDS
       --------------------------------------------------------- */

    besar: {
      zh: "大",
      en: "big",
      meaning:
        "Mempunyai saiz yang besar."
    },


    kecil: {
      zh: "小",
      en: "small",
      meaning:
        "Mempunyai saiz yang tidak besar."
    },


    cantik: {
      zh: "漂亮",
      en: "beautiful",
      meaning:
        "Sedap atau menarik dipandang."
    },


    panjang: {
      zh: "长",
      en: "long",
      meaning:
        "Mempunyai ukuran yang jauh dari hujung ke hujung."
    },


    pendek: {
      zh: "短",
      en: "short",
      meaning:
        "Tidak panjang."
    },


    cepat: {
      zh: "快",
      en: "fast / quickly",
      meaning:
        "Bergerak atau berlaku dalam masa yang singkat."
    },


    lambat: {
      zh: "慢 / 迟",
      en: "slow / late",
      meaning:
        "Tidak cepat."
    },


    /* ---------------------------------------------------------
       CONNECTORS
       --------------------------------------------------------- */

    tetapi: {
      zh: "但是",
      en: "but",
      meaning:
        "Kata hubung yang menunjukkan perbezaan."
    },


    kemudian: {
      zh: "然后 / 之后",
      en: "then / later",
      meaning:
        "Menunjukkan perkara yang berlaku selepas itu."
    },


    apabila: {
      zh: "当……时",
      en: "when",
      meaning:
        "Menunjukkan waktu sesuatu berlaku."
    },


    sambil: {
      zh: "一边……一边……",
      en: "while",
      meaning:
        "Menunjukkan dua perbuatan berlaku serentak."
    },


    supaya: {
      zh: "以便 / 为了",
      en: "so that",
      meaning:
        "Menunjukkan tujuan sesuatu dilakukan."
    },


    dengan: {
      zh: "与 / 用",
      en: "with",
      meaning:
        "Digunakan untuk menghubungkan sesuatu."
    },


    dari: {
      zh: "从",
      en: "from",
      meaning:
        "Menunjukkan asal sesuatu."
    },


    ke: {
      zh: "去 / 到",
      en: "to",
      meaning:
        "Menunjukkan arah atau tempat tujuan."
    },


    dalam: {
      zh: "里面 / 在……内",
      en: "inside / in",
      meaning:
        "Bahagian di sebelah dalam sesuatu."
    },


    /* ---------------------------------------------------------
       PRONOUNS
       --------------------------------------------------------- */

    saya: {
      zh: "我",
      en: "I / me",
      meaning:
        "Kata ganti diri pertama."
    },


    aku: {
      zh: "我",
      en: "I / me",
      meaning:
        "Kata ganti diri pertama."
    },


    kamu: {
      zh: "你",
      en: "you",
      meaning:
        "Kata ganti diri kedua."
    },


    dia: {
      zh: "他 / 她",
      en: "he / she",
      meaning:
        "Kata ganti untuk seorang yang lain."
    },


    mereka: {
      zh: "他们 / 她们",
      en: "they",
      meaning:
        "Kata ganti untuk lebih daripada seorang."
    },


    kita: {
      zh: "我们",
      en: "we / us",
      meaning:
        "Kata ganti yang termasuk orang yang bercakap dan mendengar."
    },


    kami: {
      zh: "我们",
      en: "we / us",
      meaning:
        "Kata ganti untuk kumpulan orang yang bercakap."
    }

  };


  /* =========================================================
     3. STARTER VOCABULARY
     ========================================================= */

  const STARTER_WORDS = [

    {
      word: "gembira",
      translation: "开心 / 高兴 · happy",
      meaning:
        "Perasaan senang dan bahagia.",
      example:
        "Aina berasa gembira kerana mendapat hadiah.",
      category: "Perasaan",
      emoji: "😊"
    },

    {
      word: "rajin",
      translation: "勤劳 / 用功 · diligent",
      meaning:
        "Suka melakukan sesuatu dengan tekun.",
      example:
        "Amir seorang murid yang rajin belajar.",
      category: "Sikap",
      emoji: "📚"
    },

    {
      word: "membantu",
      translation: "帮助 · help",
      meaning:
        "Memberikan pertolongan kepada seseorang.",
      example:
        "Siti membantu ibunya di dapur.",
      category: "Perbuatan",
      emoji: "🤝"
    },

    {
      word: "bersih",
      translation: "干净 · clean",
      meaning:
        "Tidak kotor.",
      example:
        "Kita mesti memastikan kelas sentiasa bersih.",
      category:
        "Kata Adjektif",
      emoji: "✨"
    },

    {
      word: "menjaga",
      translation:
        "照顾 / 保护 · take care",
      meaning:
        "Memelihara atau memastikan sesuatu berada dalam keadaan baik.",
      example:
        "Kita perlu menjaga kebersihan sekolah.",
      category: "Perbuatan",
      emoji: "🌱"
    },

    {
      word: "berani",
      translation:
        "勇敢 · brave",
      meaning:
        "Tidak takut menghadapi sesuatu.",
      example:
        "Hakim berani mencuba perkara baharu.",
      category: "Sikap",
      emoji: "🦁"
    }

  ];


  /* =========================================================
     4. HELPERS
     ========================================================= */

  function normalizeWord(word) {

    return String(
      word || ""
    )
      .trim()
      .toLowerCase()
      .replace(
        /^[^a-zA-ZÀ-ÿ]+|[^a-zA-ZÀ-ÿ'-]+$/g,
        ""
      );

  }


  function createId(word = "") {

    const clean =
      normalizeWord(word)
        .replace(
          /[^a-z0-9\u00C0-\u024F]+/g,
          "-"
        );


    return `${
      clean || "word"
    }-${Date.now()}-${Math.floor(
      Math.random() * 9999
    )}`;

  }


  function todayString() {

    const date =
      new Date();


    const year =
      date.getFullYear();


    const month =
      String(
        date.getMonth() + 1
      ).padStart(
        2,
        "0"
      );


    const day =
      String(
        date.getDate()
      ).padStart(
        2,
        "0"
      );


    return `${year}-${month}-${day}`;

  }


  function safeParse(
    value,
    fallback
  ) {

    try {

      return JSON.parse(
        value
      );

    } catch (error) {

      console.warn(
        "[Vocabulary] Failed to parse storage:",
        error
      );


      return fallback;

    }

  }


  /* =========================================================
     5. DICTIONARY LOOKUP
     ========================================================= */

  function lookupWord(
    rawWord
  ) {

    const word =
      normalizeWord(
        rawWord
      );


    if (!word) {

      return null;

    }


    const data =
      TRANSLATION_DICTIONARY[
        word
      ];


    if (!data) {

      return null;

    }


    return {

      word,

      zh:
        data.zh || "",

      en:
        data.en || "",

      meaning:
        data.meaning || "",

      translation:
        [
          data.zh,
          data.en
        ]
          .filter(Boolean)
          .join(" · ")

    };

  }


  function hasTranslation(
    word
  ) {

    return Boolean(
      lookupWord(word)
    );

  }


  /* =========================================================
     6. STORAGE
     ========================================================= */

  function getDefaultState() {

    return {

      version: 2,

      words: [],

      stats: {

        totalAdded: 0,

        totalReviews: 0,

        totalMastered: 0,

        xpEarned: 0

      },

      daily: {

        date:
          todayString(),

        reviewedWords: [],

        completed: false

      }

    };

  }


  function loadState() {

    const stored =
      localStorage.getItem(
        STORAGE_KEY
      );


    if (!stored) {

      return getDefaultState();

    }


    const state =
      safeParse(
        stored,
        getDefaultState()
      );


    if (
      !Array.isArray(
        state.words
      )
    ) {

      state.words = [];

    }


    if (!state.stats) {

      state.stats =
        getDefaultState()
          .stats;

    }


    if (!state.daily) {

      state.daily =
        getDefaultState()
          .daily;

    }


    resetDailyIfNeeded(
      state
    );


    return state;

  }


  function saveState(
    state
  ) {

    try {

      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(
          state
        )
      );

    } catch (error) {

      console.warn(
        "[Vocabulary] Storage error:",
        error
      );

    }

  }


  function resetDailyIfNeeded(
    state
  ) {

    const today =
      todayString();


    if (
      !state.daily ||
      state.daily.date !==
        today
    ) {

      state.daily = {

        date: today,

        reviewedWords: [],

        completed: false

      };


      saveState(
        state
      );

    }

  }


  let state =
    loadState();


  /* =========================================================
     7. XP
     ========================================================= */

  function awardXP(
    amount,
    reason = ""
  ) {

    if (
      !amount ||
      amount <= 0
    ) {

      return;

    }


    state.stats.xpEarned =
      Number(
        state.stats.xpEarned ||
        0
      ) +
      Number(amount);


    saveState(
      state
    );


    window.dispatchEvent(
      new CustomEvent(
        "karangan:xp-earned",
        {
          detail: {
            amount,
            reason,
            source:
              "vocabulary"
          }
        }
      )
    );


    if (
      typeof window.addXP ===
      "function"
    ) {

      try {

        window.addXP(
          amount,
          reason
        );

      } catch (error) {

        console.warn(
          "[Vocabulary] addXP integration error:",
          error
        );

      }

    }

  }


  /* =========================================================
     8. WORD MANAGEMENT
     ========================================================= */

  function addWord(
    wordData = {}
  ) {

    const word =
      String(
        wordData.word ||
        ""
      ).trim();


    if (!word) {

      return {

        success: false,

        message:
          "Perkataan tidak boleh kosong."

      };

    }


    const normalized =
      normalizeWord(
        word
      );


    const existing =
      state.words.find(
        item =>
          normalizeWord(
            item.word
          ) ===
          normalized
      );


    if (existing) {

      return {

        success: false,

        duplicate: true,

        word: existing,

        message:
          `"${word}" sudah ada dalam Buku Kosa Kata.`

      };

    }


    const dictionaryData =
      lookupWord(
        word
      );


    const newWord = {

      id:
        wordData.id ||
        createId(word),

      word,

      translation:
        wordData.translation ||
        dictionaryData
          ?.translation ||
        "",

      meaning:
        wordData.meaning ||
        wordData.definition ||
        dictionaryData
          ?.meaning ||
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

      addedAt:
        new Date()
          .toISOString(),

      lastReviewedAt:
        null

    };


    state.words.unshift(
      newWord
    );


    state.stats.totalAdded =
      Number(
        state.stats.totalAdded ||
        0
      ) + 1;


    saveState(
      state
    );


    awardXP(
      XP_REWARDS.ADD_WORD,
      "Tambah perkataan baharu"
    );


    dispatchVocabularyChanged(
      "word-added",
      newWord
    );


    return {

      success: true,

      word:
        newWord,

      message:
        `"${word}" disimpan dalam Buku Kosa Kata.`

    };

  }


  function removeWord(
    id
  ) {

    const index =
      state.words.findIndex(
        word =>
          word.id === id
      );


    if (
      index === -1
    ) {

      return false;

    }


    const removed =
      state.words[
        index
      ];


    state.words.splice(
      index,
      1
    );


    saveState(
      state
    );


    dispatchVocabularyChanged(
      "word-removed",
      removed
    );


    return true;

  }


  function getWords() {

    resetDailyIfNeeded(
      state
    );


    return [
      ...state.words
    ];

  }


  function getWord(
    id
  ) {

    return (
      state.words.find(
        word =>
          word.id === id
      ) ||
      null
    );

  }


  function findWord(
    word
  ) {

    const normalized =
      normalizeWord(
        word
      );


    return (
      state.words.find(
        item =>
          normalizeWord(
            item.word
          ) ===
          normalized
      ) ||
      null
    );

  }


  function hasWord(
    word
  ) {

    return Boolean(
      findWord(word)
    );

  }


  function toggleWord(
    wordData
  ) {

    const existing =
      findWord(
        wordData.word
      );


    if (existing) {

      removeWord(
        existing.id
      );


      return {

        success: true,

        removed: true,

        word:
          existing

      };

    }


    return addWord(
      wordData
    );

  }


  /* =========================================================
     9. REVIEW ENGINE
     ========================================================= */

  function getReviewWords(
    limit = 5
  ) {

    resetDailyIfNeeded(
      state
    );


    const notMastered =
      state.words.filter(
        word =>
          !word.mastered
      );


    const sorted =
      [
        ...notMastered
      ].sort(
        (
          a,
          b
        ) => {

          const aReviews =
            Number(
              a.reviewCount ||
              0
            );


          const bReviews =
            Number(
              b.reviewCount ||
              0
            );


          if (
            aReviews !==
            bReviews
          ) {

            return (
              aReviews -
              bReviews
            );

          }


          if (
            !a.lastReviewedAt &&
            b.lastReviewedAt
          ) {

            return -1;

          }


          if (
            a.lastReviewedAt &&
            !b.lastReviewedAt
          ) {

            return 1;

          }


          if (
            a.lastReviewedAt &&
            b.lastReviewedAt
          ) {

            return (
              new Date(
                a.lastReviewedAt
              ) -
              new Date(
                b.lastReviewedAt
              )
            );

          }


          return (
            new Date(
              a.addedAt
            ) -
            new Date(
              b.addedAt
            )
          );

        }
      );


    return sorted.slice(
      0,
      limit
    );

  }


  function reviewWord(
    id,
    correct = true
  ) {

    resetDailyIfNeeded(
      state
    );


    const word =
      getWord(id);


    if (!word) {

      return {

        success: false,

        message:
          "Perkataan tidak dijumpai."

      };

    }


    word.reviewCount =
      Number(
        word.reviewCount ||
        0
      ) + 1;


    word.lastReviewedAt =
      new Date()
        .toISOString();


    if (correct) {

      word.correctCount =
        Number(
          word.correctCount ||
          0
        ) + 1;

    } else {

      word.wrongCount =
        Number(
          word.wrongCount ||
          0
        ) + 1;


      if (
        word.mastered
      ) {

        word.mastered =
          false;


        state.stats.totalMastered =
          Math.max(
            0,
            Number(
              state.stats
                .totalMastered ||
              0
            ) - 1
          );

      }

    }


    if (
      !state.daily
        .reviewedWords
        .includes(id)
    ) {

      state.daily
        .reviewedWords
        .push(id);

    }


    state.stats.totalReviews =
      Number(
        state.stats.totalReviews ||
        0
      ) + 1;


    saveState(
      state
    );


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

      correct

    };

  }


  function markMastered(
    id,
    mastered = true
  ) {

    const word =
      getWord(id);


    if (!word) {

      return {
        success: false
      };

    }


    const previous =
      Boolean(
        word.mastered
      );


    word.mastered =
      Boolean(
        mastered
      );


    if (
      !previous &&
      word.mastered
    ) {

      state.stats.totalMastered =
        Number(
          state.stats
            .totalMastered ||
          0
        ) + 1;


      awardXP(
        XP_REWARDS.MASTER_WORD,
        "Kuasai perkataan"
      );

    }


    if (
      previous &&
      !word.mastered
    ) {

      state.stats.totalMastered =
        Math.max(
          0,
          Number(
            state.stats
              .totalMastered ||
            0
          ) - 1
        );

    }


    saveState(
      state
    );


    dispatchVocabularyChanged(
      "mastery-changed",
      word
    );


    return {

      success: true,

      word

    };

  }


  /* =========================================================
     10. DAILY REVIEW
     ========================================================= */

  function getDailyProgress() {

    resetDailyIfNeeded(
      state
    );


    const reviewed =
      state.daily
        .reviewedWords
        .length;


    const target =
      Math.min(
        5,
        Math.max(
          1,
          state.words.length
        )
      );


    return {

      reviewed,

      target,

      completed:
        state.daily.completed ||
        reviewed >= target

    };

  }


  function completeDailyReview() {

    resetDailyIfNeeded(
      state
    );


    if (
      state.daily.completed
    ) {

      return {

        success: false,

        alreadyCompleted:
          true

      };

    }


    state.daily.completed =
      true;


    saveState(
      state
    );


    awardXP(
      XP_REWARDS
        .COMPLETE_REVIEW,
      "Selesai Buku Kosa Kata"
    );


    window.dispatchEvent(
      new CustomEvent(
        "karangan:mission-completed",
        {
          detail: {

            mission:
              "vocabulary",

            missionStep:
              2,

            title:
              "Buku Kosa Kata"

          }
        }
      )
    );


    return {
      success: true
    };

  }


  /* =========================================================
     11. STATISTICS
     ========================================================= */

  function getStats() {

    const total =
      state.words.length;


    const mastered =
      state.words.filter(
        word =>
          word.mastered
      ).length;


    const learning =
      total -
      mastered;


    return {

      total,

      mastered,

      learning,

      totalAdded:
        Number(
          state.stats
            .totalAdded ||
          0
        ),

      totalReviews:
        Number(
          state.stats
            .totalReviews ||
          0
        ),

      xpEarned:
        Number(
          state.stats
            .xpEarned ||
          0
        ),

      masteryPercent:
        total > 0
          ? Math.round(
              mastered /
              total *
              100
            )
          : 0,

      daily:
        getDailyProgress()

    };

  }


  /* =========================================================
     12. SEARCH
     ========================================================= */

  function searchWords(
    query = ""
  ) {

    const text =
      normalizeWord(
        query
      );


    if (!text) {

      return getWords();

    }


    return state.words.filter(
      item => {

        const haystack =
          [
            item.word,
            item.translation,
            item.meaning,
            item.example,
            item.category
          ]
            .join(" ")
            .toLowerCase();


        return haystack.includes(
          text
        );

      }
    );

  }


  function getWordsByCategory(
    category
  ) {

    if (!category) {

      return getWords();

    }


    return state.words.filter(
      word =>
        String(
          word.category
        ).toLowerCase() ===
        String(
          category
        ).toLowerCase()
    );

  }


  function getCategories() {

    return [
      ...new Set(
        state.words
          .map(
            word =>
              word.category
          )
          .filter(Boolean)
      )
    ];

  }


  /* =========================================================
     13. STORY INTEGRATION
     ========================================================= */

  function saveFromStory({

    word,

    translation = "",

    meaning = "",

    example = "",

    category = "Cerita",

    storyId = null,

    emoji = "📖"

  }) {

    const dictionaryData =
      lookupWord(
        word
      );


    return addWord({

      word,

      translation:
        translation ||
        dictionaryData
          ?.translation ||
        "",

      meaning:
        meaning ||
        dictionaryData
          ?.meaning ||
        "",

      example,

      category,

      storyId,

      emoji,

      source:
        "cerita"

    });

  }


  /* =========================================================
     14. STARTER DATA
     ========================================================= */

  function seedStarterWords() {

    if (
      state.words.length >
      0
    ) {

      return false;

    }


    STARTER_WORDS.forEach(
      (
        starter,
        index
      ) => {

        state.words.push({

          id:
            "starter-" +
            (
              index + 1
            ),

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
            null

        });

      }
    );


    saveState(
      state
    );


    dispatchVocabularyChanged(
      "starter-data-created",
      null
    );


    return true;

  }


  /* =========================================================
     15. RESET
     ========================================================= */

  function resetVocabulary({

    includeStarterWords = true

  } = {}) {

    state =
      getDefaultState();


    saveState(
      state
    );


    if (
      includeStarterWords
    ) {

      seedStarterWords();

    }


    dispatchVocabularyChanged(
      "vocabulary-reset",
      null
    );


    return getWords();

  }


  /* =========================================================
     16. EVENTS
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

            stats:
              getStats()

          }
        }
      )
    );

  }


  /* =========================================================
     17. PUBLIC API
     ========================================================= */



  /* Phase 1 daily-new vocabulary */
  function getDailyNewWords(limit = 10) {
    resetDailyIfNeeded(state);
    const active = state.words.filter(word => !word.mastered);
    const fresh = active.filter(word => Number(word.reviewCount || 0) === 0);
    const rest = active.filter(word => Number(word.reviewCount || 0) > 0);
    return [...fresh, ...rest].slice(0, limit);
  }
  window.KaranganVocabulary = {

    /* Dictionary */

    lookupWord,

    hasTranslation,

    TRANSLATION_DICTIONARY,


    /* Vocabulary */

    addWord,

    removeWord,

    toggleWord,

    getWords,

    getWord,

    findWord,

    hasWord,

    saveFromStory,


    /* Review */

    getReviewWords,

    reviewWord,

    markMastered,


    /* Daily */

    getDailyProgress,
    getDailyNewWords,

    completeDailyReview,


    /* Statistics */

    getStats,


    /* Search */

    searchWords,

    getWordsByCategory,

    getCategories,


    /* Development */

    seedStarterWords,

    resetVocabulary,

    XP_REWARDS

  };


  /* =========================================================
     18. INITIALIZATION
     ========================================================= */

  resetDailyIfNeeded(
    state
  );


  seedStarterWords();


  console.log(
    "✅ Karangan AI Vocabulary Engine v2.0 loaded",
    getStats()
  );


})();
