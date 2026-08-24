/* =====================================================
   KARANGAN AI — FULL VERSION V1
   STORY / LESSON DATABASE
===================================================== */

const KARANGAN_STORIES = [

  // ===================================================
  // LESSON 1
  // ===================================================

  {
    id: "gotong-royong-taman",

    title: "Gotong-royong di Taman",

    year: 4,

    level: "Tahun 4",

    theme: "Kebersihan dan Alam Sekitar",

    emoji: "🌳🧹🍂",

    description:
      "Amir dan keluarganya menyertai aktiviti gotong-royong di taman rekreasi.",

    targetWords: "80–120 perkataan",

    pictures: [
      {
        image: "images/2411F84C-22BF-4BE2-848E-BE95A12D02A9.png",
        caption:
          "Amir dan keluarganya tiba di taman rekreasi."
      },
      {
        emoji: "👦🏻🧹🍂",
        caption:
          "Amir menyapu daun-daun kering."
      },
      {
        emoji: "👧🏻🗑️",
        caption:
          "Kakaknya mengutip sampah."
      },
      {
        emoji: "👨🏻✂️🌳",
        caption:
          "Ayah memotong dahan pokok."
      },
      {
        emoji: "👩🏻🌷🌷🌷",
        caption:
          "Ibu menanam pokok bunga."
      },
      {
        emoji: "✨🌳😊",
        caption:
          "Taman menjadi bersih dan indah."
      }
    ],

    story:
      `Pada hari Sabtu, Amir dan keluarganya pergi ke taman rekreasi. Mereka menyertai aktiviti gotong-royong bersama penduduk di kawasan itu. Amir menyapu daun-daun kering dengan menggunakan penyapu. Kakaknya pula mengutip sampah lalu memasukkannya ke dalam beg plastik. Ayah Amir memotong beberapa dahan pokok yang panjang manakala ibunya menanam tiga pokok bunga yang cantik. Selepas selesai bekerja, taman itu menjadi bersih dan indah. Amir berasa sangat gembira kerana dapat menjaga kebersihan alam sekitar.`,

    dictionary: {

      "pada": "在 / 于",
      "hari": "日子 / 天",
      "sabtu": "星期六",

      "amir": "阿米尔",

      "dan": "和",
      "keluarganya": "他的家人",
      "keluarga": "家庭 / 家人",

      "pergi": "去",
      "ke": "到 / 去",
      "taman": "公园",
      "rekreasi": "休闲 / 康乐",

      "mereka": "他们",
      "menyertai": "参加",
      "aktiviti": "活动",
      "gotong-royong": "大扫除 / 集体劳动",
      "bersama": "一起",
      "penduduk": "居民",
      "di": "在",
      "kawasan": "地区 / 区域",
      "itu": "那个",

      "menyapu": "扫",
      "daun-daun": "树叶",
      "daun": "叶子",
      "kering": "干的",
      "dengan": "用 / 和",
      "menggunakan": "使用",
      "penyapu": "扫把",

      "kakaknya": "他的姐姐",
      "kakak": "哥哥 / 姐姐",
      "pula": "则 / 另一方面",
      "mengutip": "捡拾",
      "sampah": "垃圾",
      "lalu": "然后",
      "memasukkannya": "把它放进去",
      "memasukkan": "放入",
      "dalam": "里面",
      "beg": "袋子",
      "plastik": "塑料",

      "ayah": "父亲",
      "memotong": "剪 / 切",
      "beberapa": "几个 / 一些",
      "dahan": "树枝",
      "pokok": "树 / 植物",
      "yang": "……的 / 那个",
      "panjang": "长的",
      "manakala": "而 / 与此同时",

      "ibunya": "他的母亲",
      "ibu": "母亲",
      "menanam": "种植",
      "tiga": "三",
      "bunga": "花",
      "cantik": "漂亮的",

      "selepas": "之后",
      "selesai": "完成",
      "bekerja": "工作",

      "menjadi": "变成",
      "bersih": "干净的",
      "indah": "美丽的",

      "berasa": "感到",
      "sangat": "非常",
      "gembira": "高兴 / 开心",
      "kerana": "因为",
      "dapat": "能够",
      "menjaga": "照顾 / 维护",
      "kebersihan": "清洁",
      "alam": "自然",
      "sekitar": "周围 / 环境"
    },

    grammar: {

      verb: [
        "pergi",
        "menyertai",
        "menyapu",
        "menggunakan",
        "mengutip",
        "memasukkannya",
        "memotong",
        "menanam",
        "bekerja",
        "menjadi",
        "berasa",
        "menjaga"
      ],

      adjective: [
        "kering",
        "panjang",
        "cantik",
        "bersih",
        "indah",
        "gembira"
      ],

      number: [
        "beberapa",
        "tiga"
      ],

      noun: [
        "hari",
        "keluarga",
        "taman",
        "aktiviti",
        "penduduk",
        "daun-daun",
        "penyapu",
        "sampah",
        "beg",
        "ayah",
        "dahan",
        "pokok",
        "ibu",
        "bunga",
        "kebersihan",
        "alam"
      ]
    },

    questions: [

      {
        question:
          "Apakah maksud perkataan “gembira”?",

        answers: [
          "生气",
          "高兴 / 开心",
          "疲倦",
          "害怕"
        ],

        correct: 1,

        explanation:
          "Gembira bermaksud berasa senang atau bahagia."
      },

      {
        question:
          "Yang manakah Kata Kerja?",

        answers: [
          "cantik",
          "tiga",
          "menyapu",
          "gembira"
        ],

        correct: 2,

        explanation:
          "Menyapu ialah perbuatan, maka menyapu ialah Kata Kerja."
      },

      {
        question:
          "Siapakah yang mengutip sampah?",

        answers: [
          "Ayah Amir",
          "Ibu Amir",
          "Kakak Amir",
          "Penduduk sahaja"
        ],

        correct: 2,

        explanation:
          "Kakak Amir mengutip sampah lalu memasukkannya ke dalam beg plastik."
      },

      {
        question:
          "Berapakah pokok bunga yang ditanam oleh ibu Amir?",

        answers: [
          "Satu",
          "Dua",
          "Tiga",
          "Empat"
        ],

        correct: 2,

        explanation:
          "Ibu Amir menanam tiga pokok bunga."
      }

    ],

    writingGuide: [
      "Bilakah aktiviti gotong-royong diadakan?",
      "Siapakah yang menyertai aktiviti tersebut?",
      "Apakah yang dilakukan oleh Amir?",
      "Apakah yang dilakukan oleh ahli keluarganya?",
      "Bagaimanakah keadaan taman selepas aktiviti?",
      "Apakah perasaan Amir?"
    ],

    usefulWords: [
      "Pada hari Sabtu",
      "gotong-royong",
      "menyapu",
      "mengutip",
      "memotong",
      "menanam",
      "Selepas itu",
      "Selain itu",
      "Akhir sekali",
      "bersih",
      "indah",
      "gembira"
    ]

  },


  // ===================================================
  // LESSON 2
  // ===================================================

  {
    id: "berkelah-pantai",

    title: "Berkelah di Pantai",

    year: 3,

    level: "Tahun 3",

    theme: "Keluarga",

    emoji: "🏖️🌊☀️",

    description:
      "Aina dan keluarganya menikmati hari yang menyeronokkan di pantai.",

    targetWords: "60–100 perkataan",

    pictures: [
      {
        emoji: "🚗👨‍👩‍👧‍👦",
        caption:
          "Keluarga Aina bertolak ke pantai."
      },
      {
        emoji: "🏖️🧺",
        caption:
          "Mereka menyediakan tempat berkelah."
      },
      {
        emoji: "👧🏻🏰",
        caption:
          "Aina membina istana pasir."
      },
      {
        emoji: "👦🏻⚽",
        caption:
          "Adiknya bermain bola."
      },
      {
        emoji: "🍉🥪🧃",
        caption:
          "Mereka menikmati makanan bersama-sama."
      },
      {
        emoji: "🌅😊",
        caption:
          "Mereka pulang dengan perasaan gembira."
      }
    ],

    story:
      `Pada hari Ahad, Aina dan keluarganya pergi berkelah di pantai. Cuaca pada pagi itu sangat cerah. Mereka membawa tikar, makanan dan minuman. Aina membina istana pasir yang besar bersama adiknya. Ayah dan ibu menyediakan makanan di bawah pokok yang rendang. Selepas bermain, mereka makan bersama-sama. Sebelum pulang, mereka membersihkan kawasan berkelah. Aina berasa gembira kerana dapat meluangkan masa bersama keluarganya.`,

    dictionary: {

      "pada": "在 / 于",
      "hari": "天 / 日子",
      "ahad": "星期日",

      "aina": "艾娜",
      "dan": "和",
      "keluarganya": "她的家人",

      "pergi": "去",
      "berkelah": "野餐",
      "di": "在",
      "pantai": "海滩",

      "cuaca": "天气",
      "pagi": "早上",
      "itu": "那个",
      "sangat": "非常",
      "cerah": "晴朗的",

      "mereka": "他们",
      "membawa": "携带",
      "tikar": "席子",
      "makanan": "食物",
      "minuman": "饮料",

      "membina": "建造",
      "istana": "城堡",
      "pasir": "沙",
      "besar": "大的",
      "bersama": "一起",
      "adiknya": "她的弟弟 / 妹妹",

      "ayah": "父亲",
      "ibu": "母亲",
      "menyediakan": "准备",
      "bawah": "下面",
      "pokok": "树",
      "rendang": "茂密的 / 阴凉的",

      "selepas": "之后",
      "bermain": "玩",
      "makan": "吃",
      "bersama-sama": "一起",

      "sebelum": "之前",
      "pulang": "回家",
      "membersihkan": "清理",
      "kawasan": "区域",

      "berasa": "感到",
      "gembira": "开心",
      "kerana": "因为",
      "dapat": "能够",
      "meluangkan": "抽出 / 花费",
      "masa": "时间"
    },

    grammar: {

      verb: [
        "pergi",
        "berkelah",
        "membawa",
        "membina",
        "menyediakan",
        "bermain",
        "makan",
        "pulang",
        "membersihkan",
        "berasa",
        "meluangkan"
      ],

      adjective: [
        "cerah",
        "besar",
        "rendang",
        "gembira"
      ],

      number: [],

      noun: [
        "hari",
        "pantai",
        "cuaca",
        "pagi",
        "tikar",
        "makanan",
        "minuman",
        "istana",
        "pasir",
        "ayah",
        "ibu",
        "pokok",
        "kawasan",
        "masa"
      ]

    },

    questions: [

      {
        question:
          "Ke manakah Aina dan keluarganya pergi?",

        answers: [
          "Ke sekolah",
          "Ke pantai",
          "Ke pasar",
          "Ke perpustakaan"
        ],

        correct: 1,

        explanation:
          "Aina dan keluarganya pergi berkelah di pantai."
      },

      {
        question:
          "Apakah yang dibina oleh Aina?",

        answers: [
          "Rumah",
          "Jambatan",
          "Istana pasir",
          "Pondok"
        ],

        correct: 2,

        explanation:
          "Aina membina istana pasir bersama adiknya."
      },

      {
        question:
          "Apakah maksud perkataan “cerah”?",

        answers: [
          "晴朗",
          "寒冷",
          "黑暗",
          "肮脏"
        ],

        correct: 0,

        explanation:
          "Cerah digunakan untuk menerangkan keadaan cuaca yang terang dan baik."
      }

    ],

    writingGuide: [
      "Bilakah Aina pergi berkelah?",
      "Dengan siapakah Aina pergi?",
      "Bagaimanakah keadaan cuaca?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah yang dilakukan sebelum pulang?",
      "Bagaimanakah perasaan Aina?"
    ],

    usefulWords: [
      "Pada hari Ahad",
      "berkelah",
      "pantai",
      "cerah",
      "membina",
      "bermain",
      "Selepas itu",
      "Sebelum pulang",
      "membersihkan",
      "gembira"
    ]

  },


  // ===================================================
  // LESSON 3
  // ===================================================

  {
    id: "hari-sukan",

    title: "Hari Sukan Sekolah",

    year: 5,

    level: "Tahun 5",

    theme: "Sekolah dan Sukan",

    emoji: "🏃‍♂️🏅🏫",

    description:
      "Hakim mengambil bahagian dalam acara Hari Sukan sekolahnya.",

    targetWords: "100–150 perkataan",

    pictures: [
      {
        emoji: "🏫🎈🏳️",
        caption:
          "Sekolah dihias sempena Hari Sukan."
      },
      {
        emoji: "👦🏻🏃‍♂️",
        caption:
          "Hakim menyertai acara larian."
      },
      {
        emoji: "👧🏻👏👦🏻👏",
        caption:
          "Rakan-rakan memberikan sokongan."
      },
      {
        emoji: "🏁🏃‍♂️💨",
        caption:
          "Hakim berlari menuju ke garisan penamat."
      },
      {
        emoji: "🥇🏆😊",
        caption:
          "Hakim berjaya memenangi pertandingan."
      },
      {
        emoji: "👨‍👩‍👦👏",
        caption:
          "Ibu bapanya berasa bangga."
      }
    ],

    story:
      `Pada hari Jumaat yang lalu, sekolah Hakim mengadakan Hari Sukan tahunan. Sejak awal pagi, padang sekolah dipenuhi oleh murid, guru dan ibu bapa. Hakim mengambil bahagian dalam acara larian seratus meter. Apabila wisel dibunyikan, dia berlari dengan pantas menuju ke garisan penamat. Rakan-rakannya bersorak dengan penuh semangat. Hakim berjaya mendapat tempat pertama dalam pertandingan itu. Guru menghadiahkannya sebuah pingat emas. Ibu bapanya berasa sangat bangga dengan kejayaan Hakim. Hakim berjanji akan terus berusaha untuk mencapai kejayaan pada masa hadapan.`,

    dictionary: {

      "pada": "在 / 于",
      "hari": "天 / 日子",
      "jumaat": "星期五",
      "lalu": "过去 / 上一个",

      "sekolah": "学校",
      "hakim": "哈金",

      "mengadakan": "举办",
      "sukan": "运动",
      "tahunan": "年度的",

      "sejak": "从",
      "awal": "早",
      "pagi": "早上",

      "padang": "操场 / 场地",
      "dipenuhi": "充满",
      "oleh": "由",
      "murid": "学生",
      "guru": "老师",
      "ibu": "母亲",
      "bapa": "父亲",

      "mengambil": "参加 / 拿",
      "bahagian": "部分 / 参与",
      "acara": "项目 / 活动",
      "larian": "赛跑",
      "seratus": "一百",
      "meter": "米",

      "apabila": "当……时",
      "wisel": "哨子",
      "dibunyikan": "被吹响",

      "dia": "他 / 她",
      "berlari": "跑",
      "dengan": "以 / 和",
      "pantas": "快速的",
      "menuju": "朝向",
      "garisan": "线",
      "penamat": "终点",

      "rakan-rakannya": "他的朋友们",
      "bersorak": "欢呼",
      "penuh": "充满",
      "semangat": "精神 / 热情",

      "berjaya": "成功",
      "mendapat": "获得",
      "tempat": "名次 / 地方",
      "pertama": "第一",
      "dalam": "在……里面",
      "pertandingan": "比赛",

      "menghadiahkannya": "颁给他",
      "sebuah": "一个",
      "pingat": "奖牌",
      "emas": "金 / 金色",

      "berasa": "感到",
      "sangat": "非常",
      "bangga": "自豪",
      "kejayaan": "成功 / 成就",

      "berjanji": "承诺",
      "akan": "将会",
      "terus": "继续",
      "berusaha": "努力",
      "untuk": "为了",
      "mencapai": "达到",
      "masa": "时间",
      "hadapan": "未来"
    },

    grammar: {

      verb: [
        "mengadakan",
        "mengambil",
        "berlari",
        "menuju",
        "bersorak",
        "berjaya",
        "mendapat",
        "menghadiahkannya",
        "berasa",
        "berjanji",
        "berusaha",
        "mencapai"
      ],

      adjective: [
        "awal",
        "pantas",
        "bangga"
      ],

      number: [
        "seratus",
        "pertama",
        "sebuah"
      ],

      noun: [
        "hari",
        "sekolah",
        "sukan",
        "pagi",
        "padang",
        "murid",
        "guru",
        "acara",
        "larian",
        "meter",
        "wisel",
        "garisan",
        "penamat",
        "semangat",
        "pertandingan",
        "pingat",
        "emas",
        "kejayaan",
        "masa"
      ]

    },

    questions: [

      {
        question:
          "Apakah acara yang disertai oleh Hakim?",

        answers: [
          "Lompat jauh",
          "Larian seratus meter",
          "Bola sepak",
          "Lontar peluru"
        ],

        correct: 1,

        explanation:
          "Hakim mengambil bahagian dalam acara larian seratus meter."
      },

      {
        question:
          "Apakah yang diterima oleh Hakim?",

        answers: [
          "Sebuah buku",
          "Sebuah beg",
          "Pingat emas",
          "Wang tunai"
        ],

        correct: 2,

        explanation:
          "Guru menghadiahkan Hakim sebuah pingat emas."
      },

      {
        question:
          "Bagaimanakah perasaan ibu bapa Hakim?",

        answers: [
          "Sedih",
          "Marah",
          "Takut",
          "Bangga"
        ],

        correct: 3,

        explanation:
          "Ibu bapa Hakim berasa sangat bangga dengan kejayaannya."
      },

      {
        question:
          "Yang manakah Kata Adjektif?",

        answers: [
          "berlari",
          "pantas",
          "sekolah",
          "seratus"
        ],

        correct: 1,

        explanation:
          "Pantas menerangkan cara Hakim berlari dan merupakan Kata Adjektif."
      }

    ],

    writingGuide: [
      "Bilakah Hari Sukan diadakan?",
      "Bagaimanakah suasana di sekolah?",
      "Apakah acara yang disertai oleh Hakim?",
      "Apakah yang berlaku semasa pertandingan?",
      "Apakah keputusan pertandingan?",
      "Bagaimanakah perasaan Hakim dan ibu bapanya?",
      "Apakah azam Hakim?"
    ],

    usefulWords: [
      "Hari Sukan",
      "mengambil bahagian",
      "Pada awal pagi",
      "Apabila",
      "berlari dengan pantas",
      "bersorak",
      "Seterusnya",
      "Akhirnya",
      "berjaya",
      "pingat emas",
      "bangga",
      "berusaha"
    ]

  }

];


/* =====================================================
   DATABASE HELPER FUNCTIONS
===================================================== */

function getAllStories() {
  return KARANGAN_STORIES;
}


function getStoryById(id) {

  return KARANGAN_STORIES.find(
    story => story.id === id
  );

}


function getStoriesByYear(year) {

  return KARANGAN_STORIES.filter(
    story => story.year === Number(year)
  );

}


function getStoryCount() {
  return KARANGAN_STORIES.length;
}


/* =====================================================
   CURRENT LESSON
===================================================== */

let currentStoryId = "gotong-royong-taman";


function getCurrentStory() {

  return getStoryById(currentStoryId)
    || KARANGAN_STORIES[0];

}


function setCurrentStory(id) {

  const story = getStoryById(id);

  if (!story) {
    console.warn(
      "Story not found:",
      id
    );

    return false;
  }

  currentStoryId = id;

  try {
    localStorage.setItem(
      "karanganCurrentStory",
      id
    );
  } catch (error) {
    console.warn(
      "Unable to save current story."
    );
  }

  return true;
}


/* =====================================================
   RESTORE LAST LESSON
===================================================== */

try {

  const savedStory =
    localStorage.getItem(
      "karanganCurrentStory"
    );

  if (savedStory &&
      getStoryById(savedStory)) {

    currentStoryId = savedStory;

  }

} catch (error) {

  console.warn(
    "Unable to restore lesson."
  );

}


/* =====================================================
   STUDENT PROGRESS STORAGE
===================================================== */

function getStudentProgress() {

  try {

    const saved =
      localStorage.getItem(
        "karanganProgress"
      );

    if (!saved) {

      return {
        completedLessons: [],
        totalStars: 0,
        essaysWritten: 0,
        quizCorrect: 0
      };

    }

    return JSON.parse(saved);

  } catch (error) {

    return {
      completedLessons: [],
      totalStars: 0,
      essaysWritten: 0,
      quizCorrect: 0
    };

  }

}


function saveStudentProgress(progress) {

  try {

    localStorage.setItem(
      "karanganProgress",
      JSON.stringify(progress)
    );

  } catch (error) {

    console.warn(
      "Unable to save student progress."
    );

  }

}


/* =====================================================
   COMPLETE LESSON
===================================================== */

function completeLesson(storyId) {

  const progress =
    getStudentProgress();

  if (
    !progress.completedLessons
      .includes(storyId)
  ) {

    progress.completedLessons.push(
      storyId
    );

    progress.totalStars += 3;

  }

  saveStudentProgress(progress);

  return progress;

}


/* =====================================================
   ADD QUIZ SCORE
===================================================== */

function addQuizCorrect() {

  const progress =
    getStudentProgress();

  progress.quizCorrect += 1;

  saveStudentProgress(progress);

}


/* =====================================================
   ADD ESSAY
===================================================== */

function addEssayWritten() {

  const progress =
    getStudentProgress();

  progress.essaysWritten += 1;

  saveStudentProgress(progress);

}


/* =====================================================
   WORD NORMALISATION
===================================================== */

function normalizeMalayWord(word) {

  return String(word || "")
    .toLowerCase()
    .replace(
      /[.,!?;:"”“'()]/g,
      ""
    )
    .trim();

}


/* =====================================================
   TRANSLATION LOOKUP
===================================================== */

function getTranslation(word) {

  const story =
    getCurrentStory();

  const clean =
    normalizeMalayWord(word);

  return (
    story.dictionary[clean]
    || null
  );

}


/* =====================================================
   GRAMMAR LOOKUP
===================================================== */

function getGrammarType(word) {

  const story =
    getCurrentStory();

  const clean =
    normalizeMalayWord(word);

  const grammar =
    story.grammar;

  if (
    grammar.verb &&
    grammar.verb.includes(clean)
  ) {
    return "verb";
  }

  if (
    grammar.adjective &&
    grammar.adjective.includes(clean)
  ) {
    return "adjective";
  }

  if (
    grammar.number &&
    grammar.number.includes(clean)
  ) {
    return "number";
  }

  if (
    grammar.noun &&
    grammar.noun.includes(clean)
  ) {
    return "noun";
  }

  return "";

}


/* =====================================================
   INITIAL DATABASE CHECK
===================================================== */

console.log(
  "Karangan AI Story Database loaded:",
  getStoryCount(),
  "stories"
   /* =====================================================
   APP.JS COMPATIBILITY
   Expose story database to Karangan AI app controller
===================================================== */

window.KARANGAN_STORIES =
  KARANGAN_STORIES;

window.stories =
  KARANGAN_STORIES;

window.STORIES =
  KARANGAN_STORIES;

window.storyData =
  KARANGAN_STORIES;

console.log(
  "✅ Story database connected to app.js:",
  KARANGAN_STORIES.length,
  "stories"
);
);
/* =====================================================
   FORCE EXPORT STORY DATABASE
===================================================== */

window.KARANGAN_STORIES =
  KARANGAN_STORIES;

window.stories =
  KARANGAN_STORIES;

window.STORIES =
  KARANGAN_STORIES;

window.storyData =
  KARANGAN_STORIES;

window.getAllStories =
  getAllStories;

window.getStoryById =
  getStoryById;

window.setCurrentStory =
  setCurrentStory;

console.log(
  "✅ STORIES EXPORTED:",
  window.KARANGAN_STORIES.length
);
