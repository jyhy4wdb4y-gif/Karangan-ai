/* =========================================================
   KARANGAN AI
   STORIES DATABASE v3.0

   PART 1
   TAHUN 3 — 10 STORIES
   ========================================================= */

"use strict";


/* =========================================================
   TAHUN 3 STORIES
   ========================================================= */

const TAHUN3_STORIES = [

  /* =======================================================
     T3 — STORY 1
     ======================================================= */

  {
    id: "t3-berkelah-pantai",

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
        emoji: "🌅😊",
        caption:
          "Mereka pulang dengan gembira."
      }
    ],

    story:
      `Pada hari Ahad, Aina dan keluarganya pergi berkelah di pantai. Cuaca pada pagi itu sangat cerah. Mereka membawa tikar, makanan dan minuman. Aina membina istana pasir yang besar bersama adiknya. Ayah dan ibu menyediakan makanan di bawah pokok yang rendang. Selepas bermain, mereka makan bersama-sama. Sebelum pulang, mereka membersihkan kawasan berkelah. Aina berasa gembira kerana dapat meluangkan masa bersama keluarganya.`,

    dictionary: {
      "ahad": "星期日",
      "berkelah": "野餐",
      "pantai": "海滩",
      "cuaca": "天气",
      "pagi": "早上",
      "cerah": "晴朗",
      "membawa": "携带",
      "tikar": "席子",
      "makanan": "食物",
      "minuman": "饮料",
      "membina": "建造",
      "istana": "城堡",
      "pasir": "沙",
      "besar": "大的",
      "adiknya": "她的弟弟 / 妹妹",
      "menyediakan": "准备",
      "rendang": "茂密 / 阴凉",
      "bermain": "玩",
      "membersihkan": "清理",
      "kawasan": "区域",
      "gembira": "开心",
      "meluangkan": "抽出时间",
      "masa": "时间",
      "keluarganya": "她的家人"
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
          "Istana pasir",
          "Rumah kayu",
          "Jambatan",
          "Pondok"
        ],

        correct: 0,

        explanation:
          "Aina membina istana pasir bersama adiknya."
      },

      {
        question:
          "Bagaimanakah perasaan Aina?",

        answers: [
          "Marah",
          "Sedih",
          "Gembira",
          "Takut"
        ],

        correct: 2,

        explanation:
          "Aina berasa gembira selepas berkelah bersama keluarganya."
      }
    ],

    writingGuide: [
      "Bilakah Aina pergi berkelah?",
      "Dengan siapakah Aina pergi?",
      "Apakah yang mereka bawa?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah yang dilakukan sebelum pulang?",
      "Bagaimanakah perasaan Aina?"
    ],

    usefulWords: [
      "Pada hari Ahad",
      "berkelah",
      "pantai",
      "cuaca cerah",
      "membina istana pasir",
      "Selepas itu",
      "Sebelum pulang",
      "membersihkan",
      "gembira"
    ]
  },


  /* =======================================================
     T3 — STORY 2
     ======================================================= */

  {
    id: "t3-membantu-ibu",

    title: "Membantu Ibu di Rumah",

    year: 3,

    level: "Tahun 3",

    theme: "Keluarga dan Tanggungjawab",

    emoji: "🏠🧹🤝",

    description:
      "Siti membantu ibunya melakukan kerja rumah.",

    targetWords: "60–90 perkataan",

    pictures: [
      {
        emoji: "👧🏻🛏️",
        caption:
          "Siti mengemas biliknya."
      },
      {
        emoji: "👧🏻🧹",
        caption:
          "Siti menyapu lantai."
      },
      {
        emoji: "👩🏻😊",
        caption:
          "Ibu berasa gembira."
      }
    ],

    story:
      `Pada hari Sabtu, Siti bangun awal lalu mengemas biliknya. Selepas itu, dia membantu ibunya di dapur. Siti menyusun pinggan dan menyapu lantai yang kotor. Dia juga membuang sampah ke dalam tong sampah. Ibunya berasa sangat gembira kerana Siti seorang anak yang rajin. Selepas semua kerja selesai, mereka berehat bersama di ruang tamu.`,

    dictionary: {
      "sabtu": "星期六",
      "bangun": "起床",
      "awal": "早",
      "mengemas": "收拾",
      "biliknya": "她的房间",
      "membantu": "帮助",
      "dapur": "厨房",
      "menyusun": "整理",
      "pinggan": "盘子",
      "menyapu": "扫",
      "lantai": "地板",
      "kotor": "肮脏",
      "membuang": "丢弃",
      "sampah": "垃圾",
      "tong": "桶",
      "gembira": "开心",
      "rajin": "勤劳",
      "selesai": "完成",
      "berehat": "休息",
      "ruang": "空间",
      "tamu": "客厅 / 客人"
    },

    grammar: {
      verb: [
        "bangun",
        "mengemas",
        "membantu",
        "menyusun",
        "menyapu",
        "membuang",
        "berasa",
        "berehat"
      ],

      adjective: [
        "awal",
        "kotor",
        "gembira",
        "rajin"
      ],

      number: [],

      noun: [
        "hari",
        "bilik",
        "ibu",
        "dapur",
        "pinggan",
        "lantai",
        "sampah",
        "tong",
        "anak",
        "kerja",
        "ruang",
        "tamu"
      ]
    },

    questions: [
      {
        question:
          "Apakah yang dilakukan oleh Siti selepas bangun?",

        answers: [
          "Bermain",
          "Mengemas bilik",
          "Tidur semula",
          "Pergi ke sekolah"
        ],

        correct: 1,

        explanation:
          "Siti bangun awal lalu mengemas biliknya."
      },

      {
        question:
          "Mengapakah ibu Siti berasa gembira?",

        answers: [
          "Siti membeli hadiah",
          "Siti seorang anak yang rajin",
          "Siti pergi bermain",
          "Siti tidur awal"
        ],

        correct: 1,

        explanation:
          "Ibunya gembira kerana Siti rajin membantu."
      }
    ],

    writingGuide: [
      "Bilakah Siti membantu ibunya?",
      "Apakah kerja yang dilakukan oleh Siti?",
      "Bagaimanakah keadaan lantai?",
      "Apakah perasaan ibu Siti?",
      "Apakah nilai baik yang ditunjukkan oleh Siti?"
    ],

    usefulWords: [
      "Pada hari Sabtu",
      "bangun awal",
      "membantu ibu",
      "menyusun",
      "menyapu",
      "membuang sampah",
      "rajin",
      "gembira"
    ]
  },


  /* =======================================================
     T3 — STORY 3
     ======================================================= */

  {
    id: "t3-hari-pertama-sekolah",

    title: "Hari Pertama di Sekolah",

    year: 3,

    level: "Tahun 3",

    theme: "Sekolah",

    emoji: "🏫🎒😊",

    description:
      "Daniel memulakan hari pertamanya di sekolah baharu.",

    targetWords: "60–100 perkataan",

    pictures: [
      {
        emoji: "👦🏻🎒🏫",
        caption:
          "Daniel tiba di sekolah."
      },
      {
        emoji: "👩🏻‍🏫👦🏻",
        caption:
          "Guru menyambut Daniel."
      },
      {
        emoji: "👦🏻🤝👦🏻",
        caption:
          "Daniel mendapat kawan baharu."
      }
    ],

    story:
      `Pada pagi Isnin, Daniel pergi ke sekolah baharunya dengan perasaan sedikit takut. Apabila tiba di kelas, gurunya menyambut Daniel dengan mesra. Daniel duduk di sebelah seorang murid bernama Kumar. Kumar tersenyum lalu memperkenalkan dirinya. Mereka belajar dan bermain bersama pada waktu rehat. Daniel berasa lega dan gembira kerana mendapat seorang kawan baharu.`,

    dictionary: {
      "isnin": "星期一",
      "sekolah": "学校",
      "baharunya": "他的新……",
      "perasaan": "感觉",
      "sedikit": "一点",
      "takut": "害怕",
      "tiba": "到达",
      "kelas": "课室",
      "gurunya": "他的老师",
      "menyambut": "迎接",
      "mesra": "友善",
      "duduk": "坐",
      "sebelah": "旁边",
      "murid": "学生",
      "tersenyum": "微笑",
      "memperkenalkan": "介绍",
      "dirinya": "自己",
      "rehat": "休息",
      "lega": "放心",
      "gembira": "开心",
      "baharu": "新的"
    },

    grammar: {
      verb: [
        "pergi",
        "tiba",
        "menyambut",
        "duduk",
        "tersenyum",
        "memperkenalkan",
        "belajar",
        "bermain",
        "berasa",
        "mendapat"
      ],

      adjective: [
        "baharu",
        "takut",
        "mesra",
        "lega",
        "gembira"
      ],

      number: [
        "seorang"
      ],

      noun: [
        "pagi",
        "sekolah",
        "perasaan",
        "kelas",
        "guru",
        "murid",
        "waktu",
        "rehat",
        "kawan"
      ]
    },

    questions: [
      {
        question:
          "Bagaimanakah perasaan Daniel pada mulanya?",

        answers: [
          "Gembira",
          "Marah",
          "Sedikit takut",
          "Mengantuk"
        ],

        correct: 2,

        explanation:
          "Daniel berasa sedikit takut apabila pergi ke sekolah baharu."
      },

      {
        question:
          "Siapakah kawan baharu Daniel?",

        answers: [
          "Amir",
          "Kumar",
          "Hakim",
          "Siti"
        ],

        correct: 1,

        explanation:
          "Daniel duduk di sebelah Kumar."
      }
    ],

    writingGuide: [
      "Bilakah Daniel pergi ke sekolah?",
      "Bagaimanakah perasaannya?",
      "Siapakah yang menyambut Daniel?",
      "Siapakah kawan baharunya?",
      "Bagaimanakah perasaan Daniel pada akhirnya?"
    ],

    usefulWords: [
      "Pada pagi Isnin",
      "sekolah baharu",
      "berasa takut",
      "menyambut dengan mesra",
      "kawan baharu",
      "waktu rehat",
      "lega",
      "gembira"
    ]
  },


  /* =======================================================
     T3 — STORY 4
     ======================================================= */

  {
    id: "t3-kucing-hilang",

    title: "Kucing yang Hilang",

    year: 3,

    level: "Tahun 3",

    theme: "Haiwan dan Kasih Sayang",

    emoji: "🐱🔍❤️",

    description:
      "Mei Ling mencari kucing kesayangannya yang hilang.",

    targetWords: "60–100 perkataan",

    pictures: [
      {
        emoji: "👧🏻🐱",
        caption:
          "Mei Ling bermain dengan Mimi."
      },
      {
        emoji: "👧🏻🔍",
        caption:
          "Mei Ling mencari kucingnya."
      },
      {
        emoji: "🌳🐱",
        caption:
          "Mimi ditemui di bawah pokok."
      }
    ],

    story:
      `Mei Ling mempunyai seekor kucing putih bernama Mimi. Pada suatu petang, Mimi tiba-tiba hilang dari rumah. Mei Ling berasa sangat risau. Dia mencari Mimi di dapur, bilik dan halaman rumah. Kemudian, Mei Ling terdengar bunyi kucing dari bawah sebuah pokok. Dia segera berlari ke sana dan menemui Mimi. Mei Ling memeluk kucingnya dengan gembira.`,

    dictionary: {
      "mempunyai": "拥有",
      "seekor": "一只",
      "kucing": "猫",
      "putih": "白色",
      "bernama": "名叫",
      "petang": "下午",
      "tiba-tiba": "突然",
      "hilang": "失踪",
      "risau": "担心",
      "mencari": "寻找",
      "halaman": "院子",
      "kemudian": "然后",
      "terdengar": "听到",
      "bunyi": "声音",
      "bawah": "下面",
      "pokok": "树",
      "segera": "立刻",
      "berlari": "跑",
      "menemui": "找到",
      "memeluk": "拥抱"
    },

    grammar: {
      verb: [
        "mempunyai",
        "hilang",
        "berasa",
        "mencari",
        "terdengar",
        "berlari",
        "menemui",
        "memeluk"
      ],

      adjective: [
        "putih",
        "risau",
        "gembira"
      ],

      number: [
        "seekor",
        "sebuah"
      ],

      noun: [
        "kucing",
        "petang",
        "rumah",
        "dapur",
        "bilik",
        "halaman",
        "bunyi",
        "pokok"
      ]
    },

    questions: [
      {
        question:
          "Apakah nama kucing Mei Ling?",

        answers: [
          "Mimi",
          "Momo",
          "Kiki",
          "Lulu"
        ],

        correct: 0,

        explanation:
          "Kucing Mei Ling bernama Mimi."
      },

      {
        question:
          "Di manakah Mimi ditemui?",

        answers: [
          "Di dapur",
          "Di bawah pokok",
          "Di sekolah",
          "Di dalam kereta"
        ],

        correct: 1,

        explanation:
          "Mei Ling menemui Mimi di bawah sebuah pokok."
      }
    ],

    writingGuide: [
      "Apakah nama haiwan peliharaan itu?",
      "Apakah yang berlaku kepadanya?",
      "Bagaimanakah perasaan Mei Ling?",
      "Di manakah dia mencari?",
      "Di manakah Mimi ditemui?"
    ],

    usefulWords: [
      "seekor kucing",
      "tiba-tiba hilang",
      "berasa risau",
      "mencari",
      "Kemudian",
      "segera",
      "menemui",
      "memeluk",
      "gembira"
    ]
  },


  /* =======================================================
     T3 — STORY 5
     ======================================================= */

  {
    id: "t3-menjaga-kebersihan-kelas",

    title: "Kelas Kami Bersih",

    year: 3,

    level: "Tahun 3",

    theme: "Kebersihan",

    emoji: "🏫🧹✨",

    description:
      "Murid-murid bekerjasama membersihkan kelas.",

    targetWords: "60–90 perkataan",

    story:
      `Pada hari Jumaat, murid-murid Tahun Tiga membersihkan kelas mereka. Farah menyapu lantai manakala Jason mengelap meja. Kumar menyusun buku di sudut bacaan. Siti pula membuang sampah ke dalam tong. Semua murid bekerja dengan rajin. Selepas selesai, kelas mereka kelihatan bersih dan kemas. Guru memuji mereka kerana bekerjasama menjaga kebersihan kelas.`,

    dictionary: {
      "jumaat": "星期五",
      "murid-murid": "学生们",
      "membersihkan": "清洁",
      "menyapu": "扫",
      "lantai": "地板",
      "manakala": "而",
      "mengelap": "擦",
      "meja": "桌子",
      "menyusun": "整理",
      "sudut": "角落",
      "bacaan": "阅读",
      "membuang": "丢",
      "sampah": "垃圾",
      "tong": "垃圾桶",
      "rajin": "勤劳",
      "kelihatan": "看起来",
      "bersih": "干净",
      "kemas": "整齐",
      "memuji": "称赞",
      "bekerjasama": "合作",
      "kebersihan": "清洁"
    },

    grammar: {
      verb: [
        "membersihkan",
        "menyapu",
        "mengelap",
        "menyusun",
        "membuang",
        "bekerja",
        "kelihatan",
        "memuji",
        "bekerjasama",
        "menjaga"
      ],

      adjective: [
        "rajin",
        "bersih",
        "kemas"
      ],

      number: [],

      noun: [
        "hari",
        "murid-murid",
        "kelas",
        "lantai",
        "meja",
        "buku",
        "sudut",
        "bacaan",
        "sampah",
        "tong",
        "guru",
        "kebersihan"
      ]
    },

    questions: [
      {
        question:
          "Siapakah yang mengelap meja?",

        answers: [
          "Farah",
          "Jason",
          "Kumar",
          "Siti"
        ],

        correct: 1,

        explanation:
          "Jason mengelap meja."
      },

      {
        question:
          "Bagaimanakah keadaan kelas selepas dibersihkan?",

        answers: [
          "Gelap",
          "Kotor",
          "Bersih dan kemas",
          "Bising"
        ],

        correct: 2,

        explanation:
          "Kelas kelihatan bersih dan kemas."
      }
    ],

    writingGuide: [
      "Bilakah murid membersihkan kelas?",
      "Apakah tugas Farah?",
      "Apakah tugas Jason?",
      "Apakah yang dilakukan oleh Kumar?",
      "Bagaimanakah keadaan kelas selepas itu?"
    ],

    usefulWords: [
      "membersihkan kelas",
      "menyapu lantai",
      "mengelap meja",
      "menyusun buku",
      "membuang sampah",
      "bekerjasama",
      "bersih",
      "kemas"
    ]
  },


  /* =======================================================
     T3 — STORY 6
     ======================================================= */

  {
    id: "t3-hari-jadi-nenek",

    title: "Hari Jadi Nenek",

    year: 3,

    level: "Tahun 3",

    theme: "Keluarga dan Kasih Sayang",

    emoji: "🎂👵🎁",

    description:
      "Keluarga Arif membuat kejutan untuk hari jadi nenek.",

    targetWords: "60–100 perkataan",

    story:
      `Pada hari Ahad, keluarga Arif berkumpul di rumah nenek. Hari itu ialah hari jadi nenek yang ketujuh puluh. Ibu membawa sebuah kek coklat yang cantik. Arif dan kakaknya menghias ruang tamu dengan belon berwarna-warni. Apabila nenek masuk, semua orang menyanyikan lagu hari jadi. Nenek tersenyum gembira dan mengucapkan terima kasih kepada mereka.`,

    dictionary: {
      "berkumpul": "聚集",
      "nenek": "祖母",
      "ketujuh": "第七",
      "puluh": "十",
      "kek": "蛋糕",
      "coklat": "巧克力",
      "cantik": "漂亮",
      "menghias": "装饰",
      "belon": "气球",
      "berwarna-warni": "五颜六色",
      "masuk": "进入",
      "menyanyikan": "唱",
      "lagu": "歌曲",
      "tersenyum": "微笑",
      "mengucapkan": "表达 / 说",
      "terima": "接受",
      "kasih": "感谢 / 爱"
    },

    grammar: {
      verb: [
        "berkumpul",
        "membawa",
        "menghias",
        "masuk",
        "menyanyikan",
        "tersenyum",
        "mengucapkan"
      ],

      adjective: [
        "cantik",
        "berwarna-warni",
        "gembira"
      ],

      number: [
        "ketujuh",
        "puluh",
        "sebuah"
      ],

      noun: [
        "hari",
        "keluarga",
        "rumah",
        "nenek",
        "ibu",
        "kek",
        "coklat",
        "ruang",
        "tamu",
        "belon",
        "lagu"
      ]
    },

    questions: [
      {
        question:
          "Di manakah keluarga Arif berkumpul?",

        answers: [
          "Di sekolah",
          "Di rumah nenek",
          "Di taman",
          "Di restoran"
        ],

        correct: 1,

        explanation:
          "Mereka berkumpul di rumah nenek."
      },

      {
        question:
          "Apakah yang dibawa oleh ibu?",

        answers: [
          "Bunga",
          "Buku",
          "Kek coklat",
          "Beg"
        ],

        correct: 2,

        explanation:
          "Ibu membawa sebuah kek coklat."
      }
    ],

    writingGuide: [
      "Hari jadi siapakah yang diraikan?",
      "Di manakah mereka berkumpul?",
      "Apakah yang dibawa oleh ibu?",
      "Bagaimanakah ruang tamu dihias?",
      "Bagaimanakah perasaan nenek?"
    ],

    usefulWords: [
      "hari jadi",
      "berkumpul",
      "membawa kek",
      "menghias",
      "belon berwarna-warni",
      "menyanyikan lagu",
      "tersenyum gembira"
    ]
  },


  /* =======================================================
     T3 — STORY 7
     ======================================================= */

  {
    id: "t3-menanam-pokok",

    title: "Menanam Pokok Bunga",

    year: 3,

    level: "Tahun 3",

    theme: "Alam Sekitar",

    emoji: "🌱🌷🌞",

    description:
      "Murid-murid menanam pokok bunga di taman sekolah.",

    targetWords: "60–100 perkataan",

    story:
      `Pada pagi Sabtu, beberapa orang murid datang ke sekolah untuk menanam pokok bunga. Cikgu Aina menunjukkan cara menggali tanah dengan betul. Amir menggali sebuah lubang kecil manakala Mei Ling memasukkan anak pokok ke dalam lubang itu. Selepas itu, mereka menutup lubang dengan tanah dan menyiram pokok. Taman sekolah kelihatan lebih cantik dan ceria.`,

    dictionary: {
      "beberapa": "一些",
      "menanam": "种植",
      "menunjukkan": "展示",
      "cara": "方法",
      "menggali": "挖",
      "tanah": "泥土",
      "betul": "正确",
      "lubang": "洞",
      "kecil": "小",
      "memasukkan": "放入",
      "anak": "幼小",
      "menutup": "盖上",
      "menyiram": "浇水",
      "kelihatan": "看起来",
      "cantik": "漂亮",
      "ceria": "明亮 / 快乐"
    },

    grammar: {
      verb: [
        "datang",
        "menanam",
        "menunjukkan",
        "menggali",
        "memasukkan",
        "menutup",
        "menyiram",
        "kelihatan"
      ],

      adjective: [
        "betul",
        "kecil",
        "cantik",
        "ceria"
      ],

      number: [
        "beberapa",
        "sebuah"
      ],

      noun: [
        "pagi",
        "murid",
        "sekolah",
        "pokok",
        "bunga",
        "tanah",
        "lubang",
        "taman"
      ]
    },

    questions: [
      {
        question:
          "Apakah yang ditanam oleh murid-murid?",

        answers: [
          "Pokok bunga",
          "Pokok kelapa",
          "Padi",
          "Rumput"
        ],

        correct: 0,

        explanation:
          "Murid-murid menanam pokok bunga."
      },

      {
        question:
          "Apakah yang dilakukan selepas menutup lubang?",

        answers: [
          "Bermain",
          "Menyiram pokok",
          "Pulang",
          "Makan"
        ],

        correct: 1,

        explanation:
          "Mereka menyiram pokok selepas menutup lubang."
      }
    ],

    writingGuide: [
      "Bilakah aktiviti dijalankan?",
      "Siapakah yang menyertai aktiviti?",
      "Apakah yang ditunjukkan oleh cikgu?",
      "Apakah tugas Amir?",
      "Bagaimanakah keadaan taman selepas itu?"
    ],

    usefulWords: [
      "menanam pokok bunga",
      "menggali tanah",
      "lubang kecil",
      "anak pokok",
      "menyiram",
      "cantik",
      "ceria"
    ]
  },


  /* =======================================================
     T3 — STORY 8
     ======================================================= */

  {
    id: "t3-pergi-perpustakaan",

    title: "Di Perpustakaan",

    year: 3,

    level: "Tahun 3",

    theme: "Membaca dan Ilmu",

    emoji: "📚🏫🤫",

    description:
      "Arun dan kawannya membaca buku di perpustakaan.",

    targetWords: "60–90 perkataan",

    story:
      `Pada waktu rehat, Arun dan kawannya pergi ke perpustakaan sekolah. Mereka berjalan dengan senyap supaya tidak mengganggu murid lain. Arun memilih sebuah buku tentang haiwan liar. Kawannya pula membaca buku cerita yang menarik. Selepas membaca, mereka meletakkan buku kembali di rak dengan kemas. Arun suka pergi ke perpustakaan kerana dia dapat belajar banyak perkara baharu.`,

    dictionary: {
      "rehat": "休息",
      "perpustakaan": "图书馆",
      "berjalan": "走",
      "senyap": "安静",
      "supaya": "以便",
      "mengganggu": "打扰",
      "memilih": "选择",
      "haiwan": "动物",
      "liar": "野生",
      "menarik": "有趣",
      "meletakkan": "放置",
      "kembali": "回去 / 放回",
      "rak": "书架",
      "kemas": "整齐",
      "perkara": "事情",
      "baharu": "新的"
    },

    grammar: {
      verb: [
        "pergi",
        "berjalan",
        "mengganggu",
        "memilih",
        "membaca",
        "meletakkan",
        "suka",
        "belajar"
      ],

      adjective: [
        "senyap",
        "liar",
        "menarik",
        "kemas",
        "baharu"
      ],

      number: [
        "sebuah"
      ],

      noun: [
        "waktu",
        "rehat",
        "perpustakaan",
        "sekolah",
        "murid",
        "buku",
        "haiwan",
        "cerita",
        "rak",
        "perkara"
      ]
    },

    questions: [
      {
        question:
          "Apakah buku yang dipilih oleh Arun?",

        answers: [
          "Buku tentang haiwan liar",
          "Buku matematik",
          "Buku masakan",
          "Buku muzik"
        ],

        correct: 0,

        explanation:
          "Arun memilih buku tentang haiwan liar."
      },

      {
        question:
          "Mengapakah mereka berjalan dengan senyap?",

        answers: [
          "Kerana takut",
          "Supaya tidak mengganggu murid lain",
          "Kerana cikgu marah",
          "Kerana perpustakaan gelap"
        ],

        correct: 1,

        explanation:
          "Mereka tidak mahu mengganggu murid lain."
      }
    ],

    writingGuide: [
      "Bilakah Arun pergi ke perpustakaan?",
      "Dengan siapakah dia pergi?",
      "Apakah buku yang dipilih?",
      "Bagaimanakah mereka menjaga buku?",
      "Mengapakah Arun suka perpustakaan?"
    ],

    usefulWords: [
      "waktu rehat",
      "perpustakaan",
      "berjalan dengan senyap",
      "memilih buku",
      "menarik",
      "rak buku",
      "belajar perkara baharu"
    ]
  },


  /* =======================================================
     T3 — STORY 9
     ======================================================= */

  {
    id: "t3-melawat-zoo",

    title: "Lawatan ke Zoo",

    year: 3,

    level: "Tahun 3",

    theme: "Haiwan dan Lawatan",

    emoji: "🦁🐘🦒",

    description:
      "Murid-murid melawat zoo bersama guru mereka.",

    targetWords: "70–100 perkataan",

    story:
      `Pada hari Rabu, murid-murid Tahun Tiga pergi melawat zoo bersama guru mereka. Mereka menaiki sebuah bas dari sekolah. Di zoo, mereka melihat gajah yang besar, zirafah yang tinggi dan monyet yang aktif. Cikgu menerangkan tentang makanan dan habitat haiwan tersebut. Murid-murid mendengar dengan teliti. Sebelum pulang, mereka mengambil gambar bersama-sama. Semua murid berasa seronok kerana mendapat banyak pengetahuan baharu.`,

    dictionary: {
      "rabu": "星期三",
      "melawat": "参观",
      "zoo": "动物园",
      "menaiki": "乘坐",
      "bas": "巴士",
      "melihat": "看见",
      "gajah": "大象",
      "zirafah": "长颈鹿",
      "tinggi": "高",
      "monyet": "猴子",
      "aktif": "活跃",
      "menerangkan": "解释",
      "habitat": "栖息地",
      "haiwan": "动物",
      "tersebut": "该 / 那些",
      "mendengar": "听",
      "teliti": "仔细",
      "mengambil": "拍 / 拿",
      "gambar": "照片",
      "seronok": "开心 / 有趣",
      "pengetahuan": "知识"
    },

    grammar: {
      verb: [
        "pergi",
        "melawat",
        "menaiki",
        "melihat",
        "menerangkan",
        "mendengar",
        "pulang",
        "mengambil",
        "berasa",
        "mendapat"
      ],

      adjective: [
        "besar",
        "tinggi",
        "aktif",
        "teliti",
        "seronok",
        "baharu"
      ],

      number: [
        "sebuah"
      ],

      noun: [
        "hari",
        "murid-murid",
        "zoo",
        "guru",
        "bas",
        "sekolah",
        "gajah",
        "zirafah",
        "monyet",
        "makanan",
        "habitat",
        "haiwan",
        "gambar",
        "pengetahuan"
      ]
    },

    questions: [
      {
        question:
          "Bagaimanakah murid-murid pergi ke zoo?",

        answers: [
          "Dengan bas",
          "Dengan kereta api",
          "Dengan berjalan kaki",
          "Dengan motosikal"
        ],

        correct: 0,

        explanation:
          "Mereka menaiki sebuah bas."
      },

      {
        question:
          "Apakah haiwan yang tinggi?",

        answers: [
          "Gajah",
          "Monyet",
          "Zirafah",
          "Kucing"
        ],

        correct: 2,

        explanation:
          "Zirafah ialah haiwan yang tinggi."
      }
    ],

    writingGuide: [
      "Bilakah lawatan diadakan?",
      "Bagaimanakah mereka pergi ke zoo?",
      "Apakah haiwan yang dilihat?",
      "Apakah yang diterangkan oleh cikgu?",
      "Bagaimanakah perasaan murid-murid?"
    ],

    usefulWords: [
      "lawatan ke zoo",
      "menaiki bas",
      "melihat haiwan",
      "gajah besar",
      "zirafah tinggi",
      "mendengar dengan teliti",
      "mengambil gambar",
      "seronok"
    ]
  },


  /* =======================================================
     T3 — STORY 10
     ======================================================= */

  {
    id: "t3-menolong-kawan",

    title: "Menolong Kawan",

    year: 3,

    level: "Tahun 3",

    theme: "Persahabatan dan Nilai Murni",

    emoji: "🤝🎒😊",

    description:
      "Aiman membantu rakannya yang terjatuh di sekolah.",

    targetWords: "60–100 perkataan",

    story:
      `Pada waktu rehat, Aiman dan Ravi berjalan menuju ke kantin. Tiba-tiba, Ravi tersandung lalu terjatuh. Buku dan botol airnya jatuh ke lantai. Aiman segera membantu Ravi bangun. Dia mengutip buku dan botol air rakannya. Kemudian, Aiman membawa Ravi ke bilik rawatan kerana lututnya sedikit luka. Ravi mengucapkan terima kasih. Aiman berasa gembira kerana dapat membantu kawannya.`,

    dictionary: {
      "menuju": "朝向",
      "kantin": "食堂",
      "tiba-tiba": "突然",
      "tersandung": "绊倒",
      "terjatuh": "跌倒",
      "botol": "瓶子",
      "airnya": "他的水",
      "jatuh": "掉落",
      "lantai": "地板",
      "segera": "立即",
      "mengutip": "捡起",
      "rakannya": "他的朋友",
      "kemudian": "然后",
      "membawa": "带",
      "rawatan": "治疗",
      "lututnya": "他的膝盖",
      "sedikit": "一点",
      "luka": "受伤",
      "mengucapkan": "说 / 表达",
      "gembira": "开心"
    },

    grammar: {
      verb: [
        "berjalan",
        "tersandung",
        "terjatuh",
        "jatuh",
        "membantu",
        "bangun",
        "mengutip",
        "membawa",
        "mengucapkan",
        "berasa"
      ],

      adjective: [
        "luka",
        "gembira"
      ],

      number: [],

      noun: [
        "waktu",
        "rehat",
        "kantin",
        "buku",
        "botol",
        "air",
        "lantai",
        "bilik",
        "rawatan",
        "lutut",
        "kawan"
      ]
    },

    questions: [
      {
        question:
          "Apakah yang berlaku kepada Ravi?",

        answers: [
          "Ravi tidur",
          "Ravi terjatuh",
          "Ravi pulang",
          "Ravi menang pertandingan"
        ],

        correct: 1,

        explanation:
          "Ravi tersandung lalu terjatuh."
      },

      {
        question:
          "Apakah yang dilakukan oleh Aiman?",

        answers: [
          "Ketawa",
          "Meninggalkan Ravi",
          "Membantu Ravi",
          "Pergi ke kelas"
        ],

        correct: 2,

        explanation:
          "Aiman membantu Ravi bangun dan membawanya ke bilik rawatan."
      },

      {
        question:
          "Apakah nilai murni yang ditunjukkan oleh Aiman?",

        answers: [
          "Malas",
          "Suka membantu",
          "Sombong",
          "Marah"
        ],

        correct: 1,

        explanation:
          "Aiman menunjukkan sikap suka membantu kawan."
      }
    ],

    writingGuide: [
      "Di manakah Aiman dan Ravi berada?",
      "Apakah yang berlaku kepada Ravi?",
      "Apakah yang dilakukan oleh Aiman?",
      "Mengapakah Ravi dibawa ke bilik rawatan?",
      "Apakah nilai murni yang ditunjukkan?"
    ],

    usefulWords: [
      "waktu rehat",
      "Tiba-tiba",
      "terjatuh",
      "segera membantu",
      "mengutip",
      "Kemudian",
      "bilik rawatan",
      "mengucapkan terima kasih",
      "gembira"
    ]
  }

];


/* =========================================================
   END PART 1 — TAHUN 3
   DO NOT CREATE KARANGAN_STORIES YET.
   PART 2 WILL ADD TAHUN 4.
   ========================================================= */
/* =========================================================
   STORIES DATABASE v3.0
   PART 2
   TAHUN 4 — 10 STORIES
   ========================================================= */

const TAHUN4_STORIES = [

  /* =======================================================
     T4 — STORY 1
     ======================================================= */

  {
    id: "t4-gotong-royong-taman",

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
        image:
          "images/2411F84C-22BF-4BE2-848E-BE95A12D02A9.png",
        caption:
          "Amir dan keluarganya tiba di taman rekreasi."
      }
    ],

    story:
      `Pada hari Sabtu, Amir dan keluarganya pergi ke taman rekreasi untuk menyertai aktiviti gotong-royong. Ramai penduduk turut hadir sejak awal pagi. Amir menyapu daun-daun kering manakala kakaknya mengutip sampah. Ayah memotong dahan pokok yang panjang sementara ibu menanam beberapa pokok bunga yang cantik. Selepas hampir dua jam bekerja, taman itu menjadi bersih, kemas dan indah. Amir berasa gembira kerana semua penduduk bekerjasama menjaga kebersihan kawasan mereka.`,

    dictionary: {
      "rekreasi": "休闲 / 康乐",
      "menyertai": "参加",
      "gotong-royong": "集体劳动 / 大扫除",
      "penduduk": "居民",
      "hadir": "出席",
      "menyapu": "扫",
      "daun-daun": "树叶",
      "kering": "干的",
      "manakala": "而 / 与此同时",
      "mengutip": "捡拾",
      "sampah": "垃圾",
      "memotong": "剪 / 切",
      "dahan": "树枝",
      "panjang": "长的",
      "sementara": "同时",
      "menanam": "种植",
      "beberapa": "一些",
      "cantik": "漂亮",
      "hampir": "接近",
      "bersih": "干净",
      "kemas": "整齐",
      "indah": "美丽",
      "bekerjasama": "合作",
      "kebersihan": "清洁"
    },

    grammar: {
      verb: [
        "pergi",
        "menyertai",
        "hadir",
        "menyapu",
        "mengutip",
        "memotong",
        "menanam",
        "bekerja",
        "menjadi",
        "berasa",
        "bekerjasama",
        "menjaga"
      ],

      adjective: [
        "awal",
        "kering",
        "panjang",
        "cantik",
        "bersih",
        "kemas",
        "indah",
        "gembira"
      ],

      number: [
        "beberapa",
        "dua"
      ],

      noun: [
        "hari",
        "keluarga",
        "taman",
        "aktiviti",
        "penduduk",
        "pagi",
        "daun-daun",
        "sampah",
        "dahan",
        "pokok",
        "bunga",
        "jam",
        "kebersihan",
        "kawasan"
      ]
    },

    questions: [
      {
        question:
          "Apakah aktiviti yang disertai oleh keluarga Amir?",

        answers: [
          "Hari Sukan",
          "Gotong-royong",
          "Perkelahan",
          "Lawatan"
        ],

        correct: 1,

        explanation:
          "Keluarga Amir menyertai aktiviti gotong-royong."
      },

      {
        question:
          "Apakah yang dilakukan oleh kakak Amir?",

        answers: [
          "Menanam bunga",
          "Memotong dahan",
          "Mengutip sampah",
          "Menyiram pokok"
        ],

        correct: 2,

        explanation:
          "Kakak Amir mengutip sampah."
      },

      {
        question:
          "Bagaimanakah keadaan taman selepas aktiviti?",

        answers: [
          "Kotor dan gelap",
          "Bersih, kemas dan indah",
          "Rosak",
          "Kosong"
        ],

        correct: 1,

        explanation:
          "Taman menjadi bersih, kemas dan indah."
      }
    ],

    writingGuide: [
      "Bilakah gotong-royong diadakan?",
      "Siapakah yang terlibat?",
      "Apakah tugas Amir?",
      "Apakah tugas ahli keluarganya?",
      "Bagaimanakah keadaan taman selepas aktiviti?",
      "Apakah nilai murni yang dipelajari?"
    ],

    usefulWords: [
      "Pada hari Sabtu",
      "menyertai gotong-royong",
      "sejak awal pagi",
      "manakala",
      "sementara itu",
      "bekerjasama",
      "bersih",
      "kemas",
      "indah"
    ]
  },


  /* =======================================================
     T4 — STORY 2
     ======================================================= */

  {
    id: "t4-pertandingan-melukis",

    title: "Pertandingan Melukis",

    year: 4,

    level: "Tahun 4",

    theme: "Sekolah dan Kreativiti",

    emoji: "🎨🖌️🏆",

    description:
      "Nadia menyertai pertandingan melukis sempena Minggu Bahasa.",

    targetWords: "80–120 perkataan",

    story:
      `Sekolah Nadia mengadakan pertandingan melukis sempena Minggu Bahasa. Nadia sangat berminat lalu mendaftarkan diri. Tajuk pertandingan ialah “Sekolah Impianku”. Nadia melukis sebuah sekolah yang cantik, bersih dan dikelilingi pokok-pokok hijau. Dia mewarnakan lukisannya dengan teliti supaya kelihatan menarik. Selepas semua peserta selesai, guru-guru menilai hasil mereka. Nadia berasa terkejut apabila namanya diumumkan sebagai pemenang tempat kedua. Dia menerima sebuah hamper dan sijil penghargaan.`,

    dictionary: {
      "pertandingan": "比赛",
      "melukis": "绘画",
      "sempena": "配合 / 庆祝",
      "minggu": "星期 / 周",
      "bahasa": "语言",
      "berminat": "有兴趣",
      "mendaftarkan": "报名",
      "tajuk": "题目",
      "impianku": "我的梦想",
      "dikelilingi": "被围绕",
      "hijau": "绿色",
      "mewarnakan": "上色",
      "teliti": "仔细",
      "peserta": "参赛者",
      "menilai": "评估",
      "hasil": "作品 / 成果",
      "terkejut": "惊讶",
      "diumumkan": "被宣布",
      "pemenang": "获胜者",
      "kedua": "第二",
      "hamper": "礼篮",
      "sijil": "证书",
      "penghargaan": "表扬 / 嘉奖"
    },

    grammar: {
      verb: [
        "mengadakan",
        "melukis",
        "mendaftarkan",
        "mewarnakan",
        "kelihatan",
        "selesai",
        "menilai",
        "berasa",
        "diumumkan",
        "menerima"
      ],

      adjective: [
        "berminat",
        "cantik",
        "bersih",
        "hijau",
        "teliti",
        "menarik",
        "terkejut"
      ],

      number: [
        "sebuah",
        "kedua"
      ],

      noun: [
        "sekolah",
        "pertandingan",
        "minggu",
        "bahasa",
        "tajuk",
        "pokok-pokok",
        "lukisan",
        "peserta",
        "guru-guru",
        "pemenang",
        "tempat",
        "hamper",
        "sijil",
        "penghargaan"
      ]
    },

    questions: [
      {
        question:
          "Apakah tajuk pertandingan melukis?",

        answers: [
          "Keluargaku",
          "Sekolah Impianku",
          "Taman Indah",
          "Haiwan Kesayanganku"
        ],

        correct: 1,

        explanation:
          "Tajuk pertandingan ialah “Sekolah Impianku”."
      },

      {
        question:
          "Apakah tempat yang dimenangi oleh Nadia?",

        answers: [
          "Pertama",
          "Kedua",
          "Ketiga",
          "Keempat"
        ],

        correct: 1,

        explanation:
          "Nadia memenangi tempat kedua."
      }
    ],

    writingGuide: [
      "Apakah pertandingan yang diadakan?",
      "Apakah tajuk pertandingan?",
      "Apakah yang dilukis oleh Nadia?",
      "Bagaimanakah Nadia menyiapkan lukisannya?",
      "Apakah keputusan pertandingan?"
    ],

    usefulWords: [
      "mengadakan pertandingan",
      "sangat berminat",
      "mendaftarkan diri",
      "melukis",
      "dengan teliti",
      "Selepas itu",
      "diumumkan",
      "menerima hadiah"
    ]
  },


  /* =======================================================
     T4 — STORY 3
     ======================================================= */

  {
    id: "t4-melawat-rumah-orang-tua",

    title: "Lawatan ke Rumah Warga Emas",

    year: 4,

    level: "Tahun 4",

    theme: "Masyarakat dan Kasih Sayang",

    emoji: "👵🤝❤️",

    description:
      "Murid-murid melawat rumah warga emas dan menghiburkan penghuninya.",

    targetWords: "80–120 perkataan",

    story:
      `Pada hari Sabtu, sekumpulan murid Tahun Empat melawat sebuah rumah warga emas bersama guru mereka. Mereka membawa buah-buahan, makanan dan beberapa hadiah. Setibanya di sana, murid-murid bersalaman dengan penghuni rumah tersebut. Ada yang berbual, membaca surat khabar dan menyanyikan lagu bersama warga emas. Beberapa orang murid turut membantu menyusun barang di ruang tamu. Sebelum pulang, semua murid mengucapkan selamat tinggal. Mereka berasa terharu kerana dapat menggembirakan warga emas.`,

    dictionary: {
      "sekumpulan": "一群",
      "melawat": "探访",
      "warga": "居民 / 人士",
      "emas": "年长 / 黄金",
      "buah-buahan": "水果",
      "hadiah": "礼物",
      "setibanya": "到达后",
      "bersalaman": "握手",
      "penghuni": "住户",
      "berbual": "聊天",
      "surat": "报纸 / 信",
      "khabar": "消息",
      "menyanyikan": "唱",
      "turut": "也",
      "menyusun": "整理",
      "mengucapkan": "说 / 表达",
      "terharu": "感动",
      "menggembirakan": "使开心"
    },

    grammar: {
      verb: [
        "melawat",
        "membawa",
        "bersalaman",
        "berbual",
        "membaca",
        "menyanyikan",
        "membantu",
        "menyusun",
        "pulang",
        "mengucapkan",
        "berasa",
        "menggembirakan"
      ],

      adjective: [
        "terharu",
        "gembira"
      ],

      number: [
        "sekumpulan",
        "sebuah",
        "beberapa"
      ],

      noun: [
        "hari",
        "murid",
        "rumah",
        "warga",
        "guru",
        "buah-buahan",
        "makanan",
        "hadiah",
        "penghuni",
        "surat",
        "khabar",
        "lagu",
        "barang",
        "ruang",
        "tamu"
      ]
    },

    questions: [
      {
        question:
          "Ke manakah murid-murid pergi?",

        answers: [
          "Ke zoo",
          "Ke rumah warga emas",
          "Ke pantai",
          "Ke stadium"
        ],

        correct: 1,

        explanation:
          "Mereka melawat rumah warga emas."
      },

      {
        question:
          "Bagaimanakah perasaan murid-murid selepas lawatan?",

        answers: [
          "Terharu",
          "Marah",
          "Bosan",
          "Takut"
        ],

        correct: 0,

        explanation:
          "Mereka berasa terharu kerana dapat menggembirakan warga emas."
      }
    ],

    writingGuide: [
      "Siapakah yang menyertai lawatan?",
      "Apakah yang mereka bawa?",
      "Apakah aktiviti yang dilakukan?",
      "Bagaimanakah mereka membantu?",
      "Apakah perasaan mereka selepas lawatan?"
    ],

    usefulWords: [
      "melawat",
      "membawa hadiah",
      "Setibanya di sana",
      "bersalaman",
      "berbual",
      "menyanyikan lagu",
      "membantu",
      "berasa terharu"
    ]
  },


  /* =======================================================
     T4 — STORY 4
     ======================================================= */

  {
    id: "t4-berkebun-sekolah",

    title: "Kebun Mini Sekolah",

    year: 4,

    level: "Tahun 4",

    theme: "Alam Sekitar dan Pertanian",

    emoji: "🥬🌱🏫",

    description:
      "Murid-murid mengusahakan kebun mini di sekolah.",

    targetWords: "80–120 perkataan",

    story:
      `Sekolah Kumar mempunyai sebuah kebun mini di belakang makmal sains. Setiap minggu, murid-murid bergilir-gilir menjaga kebun tersebut. Kumar dan kumpulannya menanam sayur sawi, cili dan tomato. Mereka menggemburkan tanah, membuang rumpai serta menyiram tanaman setiap pagi. Cikgu mengajar mereka cara menggunakan baja dengan betul. Selepas beberapa minggu, sayur-sayuran tumbuh dengan subur. Murid-murid berasa bangga kerana usaha mereka berjaya menghasilkan tanaman yang segar.`,

    dictionary: {
      "kebun": "菜园 / 农园",
      "mini": "小型",
      "belakang": "后面",
      "makmal": "实验室",
      "sains": "科学",
      "bergilir-gilir": "轮流",
      "kumpulan": "小组",
      "sawi": "芥菜",
      "cili": "辣椒",
      "tomato": "番茄",
      "menggemburkan": "松土",
      "rumpai": "杂草",
      "tanaman": "植物 / 作物",
      "baja": "肥料",
      "beberapa": "一些",
      "tumbuh": "生长",
      "subur": "茂盛",
      "bangga": "自豪",
      "usaha": "努力",
      "menghasilkan": "生产",
      "segar": "新鲜"
    },

    grammar: {
      verb: [
        "mempunyai",
        "bergilir-gilir",
        "menjaga",
        "menanam",
        "menggemburkan",
        "membuang",
        "menyiram",
        "mengajar",
        "menggunakan",
        "tumbuh",
        "berasa",
        "berjaya",
        "menghasilkan"
      ],

      adjective: [
        "mini",
        "betul",
        "subur",
        "bangga",
        "segar"
      ],

      number: [
        "sebuah",
        "beberapa"
      ],

      noun: [
        "sekolah",
        "kebun",
        "makmal",
        "sains",
        "minggu",
        "murid-murid",
        "sayur",
        "sawi",
        "cili",
        "tomato",
        "tanah",
        "rumpai",
        "tanaman",
        "pagi",
        "baja",
        "usaha"
      ]
    },

    questions: [
      {
        question:
          "Apakah tanaman yang ditanam oleh Kumar dan kumpulannya?",

        answers: [
          "Padi sahaja",
          "Sawi, cili dan tomato",
          "Pokok kelapa",
          "Bunga sahaja"
        ],

        correct: 1,

        explanation:
          "Mereka menanam sawi, cili dan tomato."
      },

      {
        question:
          "Bagaimanakah keadaan sayur-sayuran selepas beberapa minggu?",

        answers: [
          "Layu",
          "Rosak",
          "Tumbuh subur",
          "Kering"
        ],

        correct: 2,

        explanation:
          "Sayur-sayuran tumbuh dengan subur."
      }
    ],

    writingGuide: [
      "Di manakah kebun mini terletak?",
      "Apakah tanaman yang ditanam?",
      "Apakah kerja yang dilakukan oleh murid?",
      "Apakah yang diajar oleh cikgu?",
      "Bagaimanakah hasil tanaman?"
    ],

    usefulWords: [
      "kebun mini",
      "bergilir-gilir",
      "menanam",
      "menggemburkan tanah",
      "membuang rumpai",
      "menyiram tanaman",
      "tumbuh subur",
      "segar"
    ]
  },


  /* =======================================================
     T4 — STORY 5
     ======================================================= */

  {
    id: "t4-berbasikal-taman",

    title: "Berbasikal di Taman",

    year: 4,

    level: "Tahun 4",

    theme: "Kesihatan dan Keselamatan",

    emoji: "🚲🌳⛑️",

    description:
      "Farid berbasikal bersama bapanya sambil mengutamakan keselamatan.",

    targetWords: "80–120 perkataan",

    story:
      `Pada petang Ahad, Farid dan bapanya pergi berbasikal di taman rekreasi. Sebelum bertolak, mereka memakai topi keledar dan memeriksa brek basikal. Farid menunggang dengan berhati-hati di laluan khas basikal. Dia tidak berlumba dengan penunggang lain dan sentiasa mematuhi papan tanda. Selepas beberapa pusingan, mereka berhenti untuk minum air. Farid berasa penat tetapi gembira. Bapanya memuji Farid kerana mengutamakan keselamatan semasa berbasikal.`,

    dictionary: {
      "berbasikal": "骑自行车",
      "bertolak": "出发",
      "memakai": "穿戴",
      "topi": "帽子",
      "keledar": "头盔",
      "memeriksa": "检查",
      "brek": "刹车",
      "menunggang": "骑",
      "berhati-hati": "小心",
      "laluan": "路线",
      "khas": "专用",
      "berlumba": "比赛",
      "penunggang": "骑士",
      "mematuhi": "遵守",
      "papan": "牌子",
      "tanda": "标志",
      "pusingan": "圈",
      "berhenti": "停止",
      "penat": "疲累",
      "mengutamakan": "优先考虑",
      "keselamatan": "安全"
    },

    grammar: {
      verb: [
        "pergi",
        "berbasikal",
        "bertolak",
        "memakai",
        "memeriksa",
        "menunggang",
        "berlumba",
        "mematuhi",
        "berhenti",
        "minum",
        "berasa",
        "memuji",
        "mengutamakan"
      ],

      adjective: [
        "berhati-hati",
        "khas",
        "penat",
        "gembira"
      ],

      number: [
        "beberapa"
      ],

      noun: [
        "petang",
        "bapa",
        "taman",
        "topi",
        "keledar",
        "brek",
        "basikal",
        "laluan",
        "penunggang",
        "papan",
        "tanda",
        "pusingan",
        "air",
        "keselamatan"
      ]
    },

    questions: [
      {
        question:
          "Apakah yang dipakai oleh Farid sebelum berbasikal?",

        answers: [
          "Topi keledar",
          "Topi sekolah",
          "Sarung tangan sahaja",
          "Jaket hujan"
        ],

        correct: 0,

        explanation:
          "Farid memakai topi keledar."
      },

      {
        question:
          "Mengapakah bapa Farid memujinya?",

        answers: [
          "Kerana berlumba",
          "Kerana mengutamakan keselamatan",
          "Kerana membeli basikal",
          "Kerana pulang lewat"
        ],

        correct: 1,

        explanation:
          "Farid sentiasa mengutamakan keselamatan."
      }
    ],

    writingGuide: [
      "Bilakah Farid pergi berbasikal?",
      "Apakah persediaan sebelum bertolak?",
      "Bagaimanakah Farid menunggang basikal?",
      "Apakah peraturan yang dipatuhi?",
      "Bagaimanakah perasaan Farid?"
    ],

    usefulWords: [
      "berbasikal",
      "topi keledar",
      "memeriksa brek",
      "berhati-hati",
      "laluan khas",
      "mematuhi papan tanda",
      "keselamatan"
    ]
  },


  /* =======================================================
     T4 — STORY 6
     ======================================================= */

  {
    id: "t4-banjir-kampung",

    title: "Membantu Mangsa Banjir",

    year: 4,

    level: "Tahun 4",

    theme: "Masyarakat dan Prihatin",

    emoji: "🌧️📦🤝",

    description:
      "Penduduk bekerjasama mengumpulkan bantuan untuk mangsa banjir.",

    targetWords: "80–120 perkataan",

    story:
      `Hujan lebat selama beberapa hari menyebabkan sebuah kampung berhampiran dilanda banjir. Banyak keluarga terpaksa berpindah ke pusat pemindahan sementara. Sekolah Mei Ling mengadakan kutipan barangan untuk membantu mangsa banjir. Murid-murid membawa pakaian, makanan kering, air mineral dan selimut. Guru membantu menyusun barangan ke dalam kotak sebelum dihantar. Mei Ling berasa sedih melihat keadaan mangsa tetapi bangga kerana dapat membantu mereka. Dia belajar bahawa sikap prihatin sangat penting dalam masyarakat.`,

    dictionary: {
      "lebat": "大 / 猛烈",
      "menyebabkan": "导致",
      "berhampiran": "附近",
      "dilanda": "遭受",
      "banjir": "水灾",
      "terpaksa": "被迫",
      "berpindah": "搬迁",
      "pusat": "中心",
      "pemindahan": "疏散",
      "sementara": "临时",
      "kutipan": "募集",
      "barangan": "物品",
      "mangsa": "灾民 / 受害者",
      "kering": "干的",
      "mineral": "矿泉",
      "selimut": "毯子",
      "kotak": "箱子",
      "dihantar": "被送去",
      "keadaan": "情况",
      "prihatin": "关怀",
      "masyarakat": "社会"
    },

    grammar: {
      verb: [
        "menyebabkan",
        "dilanda",
        "berpindah",
        "mengadakan",
        "membantu",
        "membawa",
        "menyusun",
        "dihantar",
        "berasa",
        "melihat",
        "belajar"
      ],

      adjective: [
        "lebat",
        "kering",
        "sedih",
        "bangga",
        "prihatin",
        "penting"
      ],

      number: [
        "beberapa",
        "sebuah",
        "banyak"
      ],

      noun: [
        "hujan",
        "hari",
        "kampung",
        "banjir",
        "keluarga",
        "pusat",
        "pemindahan",
        "sekolah",
        "kutipan",
        "barangan",
        "mangsa",
        "pakaian",
        "makanan",
        "air",
        "selimut",
        "guru",
        "kotak",
        "masyarakat"
      ]
    },

    questions: [
      {
        question:
          "Mengapakah keluarga di kampung perlu berpindah?",

        answers: [
          "Kerana banjir",
          "Kerana bercuti",
          "Kerana berpindah sekolah",
          "Kerana pesta"
        ],

        correct: 0,

        explanation:
          "Kampung mereka dilanda banjir."
      },

      {
        question:
          "Apakah nilai yang dipelajari oleh Mei Ling?",

        answers: [
          "Sombong",
          "Prihatin",
          "Malas",
          "Boros"
        ],

        correct: 1,

        explanation:
          "Mei Ling belajar pentingnya sikap prihatin."
      }
    ],

    writingGuide: [
      "Apakah yang menyebabkan banjir?",
      "Ke manakah mangsa berpindah?",
      "Apakah bantuan yang dikumpulkan?",
      "Apakah yang dilakukan oleh guru?",
      "Apakah nilai yang dipelajari?"
    ],

    usefulWords: [
      "hujan lebat",
      "dilanda banjir",
      "pusat pemindahan",
      "mengadakan kutipan",
      "membantu mangsa",
      "berasa prihatin",
      "bekerjasama"
    ]
  },


  /* =======================================================
     T4 — STORY 7
     ======================================================= */

  {
    id: "t4-pasar-malam",

    title: "Ke Pasar Malam",

    year: 4,

    level: "Tahun 4",

    theme: "Keluarga dan Masyarakat",

    emoji: "🌙🛍️🍜",

    description:
      "Alya mengikut keluarganya membeli keperluan di pasar malam.",

    targetWords: "80–120 perkataan",

    story:
      `Pada petang Rabu, Alya mengikut ibu bapanya ke pasar malam berhampiran rumah. Pasar itu sangat meriah dan dipenuhi pengunjung. Mereka berjalan dari satu gerai ke gerai yang lain. Ibu membeli sayur-sayuran segar manakala ayah membeli ikan dan buah-buahan. Alya tertarik melihat pelbagai jenis kuih tradisional yang tersusun kemas. Dia memilih dua ketul kuih kegemarannya. Sebelum pulang, keluarga Alya menikmati mi goreng bersama-sama. Alya berasa seronok kerana dapat meluangkan masa dengan keluarganya.`,

    dictionary: {
      "mengikut": "跟随",
      "pasar": "市场",
      "malam": "夜晚",
      "meriah": "热闹",
      "dipenuhi": "充满",
      "pengunjung": "访客",
      "gerai": "摊位",
      "sayur-sayuran": "蔬菜",
      "segar": "新鲜",
      "ikan": "鱼",
      "buah-buahan": "水果",
      "tertarik": "被吸引",
      "pelbagai": "各种",
      "jenis": "种类",
      "kuih": "糕点",
      "tradisional": "传统",
      "tersusun": "排列整齐",
      "ketul": "块",
      "kegemarannya": "她喜爱的",
      "menikmati": "享用",
      "seronok": "开心"
    },

    grammar: {
      verb: [
        "mengikut",
        "berjalan",
        "membeli",
        "tertarik",
        "melihat",
        "memilih",
        "pulang",
        "menikmati",
        "berasa",
        "meluangkan"
      ],

      adjective: [
        "meriah",
        "segar",
        "tradisional",
        "kemas",
        "seronok"
      ],

      number: [
        "satu",
        "dua"
      ],

      noun: [
        "petang",
        "ibu",
        "bapa",
        "pasar",
        "rumah",
        "pengunjung",
        "gerai",
        "sayur-sayuran",
        "ayah",
        "ikan",
        "buah-buahan",
        "kuih",
        "mi",
        "keluarga"
      ]
    },

    questions: [
      {
        question:
          "Apakah yang dibeli oleh ibu Alya?",

        answers: [
          "Sayur-sayuran",
          "Mainan",
          "Buku",
          "Kasut"
        ],

        correct: 0,

        explanation:
          "Ibu membeli sayur-sayuran segar."
      },

      {
        question:
          "Berapakah kuih yang dipilih oleh Alya?",

        answers: [
          "Satu",
          "Dua",
          "Tiga",
          "Empat"
        ],

        correct: 1,

        explanation:
          "Alya memilih dua ketul kuih."
      }
    ],

    writingGuide: [
      "Bilakah Alya pergi ke pasar malam?",
      "Dengan siapakah dia pergi?",
      "Bagaimanakah suasana pasar?",
      "Apakah yang dibeli oleh keluarganya?",
      "Apakah makanan yang dinikmati sebelum pulang?"
    ],

    usefulWords: [
      "pasar malam",
      "sangat meriah",
      "dipenuhi pengunjung",
      "sayur-sayuran segar",
      "pelbagai jenis",
      "tersusun kemas",
      "menikmati makanan"
    ]
  },


  /* =======================================================
     T4 — STORY 8
     ======================================================= */

  {
    id: "t4-kempen-kitar-semula",

    title: "Kempen Kitar Semula",

    year: 4,

    level: "Tahun 4",

    theme: "Alam Sekitar",

    emoji: "♻️📦🌍",

    description:
      "Sekolah mengadakan kempen kitar semula untuk menjaga alam sekitar.",

    targetWords: "80–120 perkataan",

    story:
      `Kelab Alam Sekitar sekolah Haris menganjurkan Kempen Kitar Semula selama seminggu. Murid-murid diminta membawa kertas lama, botol plastik dan tin minuman dari rumah. Semua bahan dikumpulkan mengikut kategori di sudut khas. Haris membantu menimbang dan mencatat jumlah bahan yang dikumpulkan. Pada akhir kempen, kelas Haris berjaya mengumpulkan bahan paling banyak. Cikgu menerangkan bahawa amalan kitar semula dapat mengurangkan sampah dan melindungi alam sekitar.`,

    dictionary: {
      "kelab": "社团",
      "menganjurkan": "举办",
      "kempen": "运动 / 活动",
      "kitar": "循环",
      "semula": "再次",
      "seminggu": "一个星期",
      "diminta": "被要求",
      "kertas": "纸",
      "lama": "旧",
      "botol": "瓶子",
      "tin": "罐",
      "bahan": "材料",
      "dikumpulkan": "被收集",
      "kategori": "类别",
      "menimbang": "称重",
      "mencatat": "记录",
      "jumlah": "数量",
      "akhir": "最后",
      "amalan": "习惯 / 实践",
      "mengurangkan": "减少",
      "melindungi": "保护"
    },

    grammar: {
      verb: [
        "menganjurkan",
        "diminta",
        "membawa",
        "dikumpulkan",
        "membantu",
        "menimbang",
        "mencatat",
        "mengumpulkan",
        "menerangkan",
        "mengurangkan",
        "melindungi"
      ],

      adjective: [
        "lama",
        "khas",
        "banyak"
      ],

      number: [
        "seminggu"
      ],

      noun: [
        "kelab",
        "alam",
        "sekolah",
        "kempen",
        "murid-murid",
        "kertas",
        "botol",
        "plastik",
        "tin",
        "minuman",
        "rumah",
        "bahan",
        "kategori",
        "sudut",
        "jumlah",
        "kelas",
        "sampah"
      ]
    },

    questions: [
      {
        question:
          "Apakah bahan yang dibawa oleh murid-murid?",

        answers: [
          "Kertas, botol plastik dan tin",
          "Makanan sahaja",
          "Buku baharu",
          "Pakaian sekolah"
        ],

        correct: 0,

        explanation:
          "Murid membawa bahan yang boleh dikitar semula."
      },

      {
        question:
          "Apakah manfaat kitar semula?",

        answers: [
          "Menambah sampah",
          "Mengurangkan sampah dan melindungi alam",
          "Mengotorkan sekolah",
          "Membazir bahan"
        ],

        correct: 1,

        explanation:
          "Kitar semula membantu mengurangkan sampah."
      }
    ],

    writingGuide: [
      "Siapakah yang menganjurkan kempen?",
      "Berapa lama kempen dijalankan?",
      "Apakah bahan yang dikumpulkan?",
      "Apakah tugas Haris?",
      "Apakah faedah kitar semula?"
    ],

    usefulWords: [
      "Kempen Kitar Semula",
      "selama seminggu",
      "mengikut kategori",
      "menimbang",
      "mencatat jumlah",
      "mengurangkan sampah",
      "melindungi alam"
    ]
  },


  /* =======================================================
     T4 — STORY 9
     ======================================================= */

  {
    id: "t4-membuat-sandwic",

    title: "Membuat Sandwic",

    year: 4,

    level: "Tahun 4",

    theme: "Kemahiran Hidup",

    emoji: "🥪🥬🍅",

    description:
      "Sara belajar menyediakan sandwic yang mudah dan sihat.",

    targetWords: "80–120 perkataan",

    story:
      `Pada hujung minggu, Sara belajar membuat sandwic bersama ibunya. Mula-mula, mereka mencuci tangan sehingga bersih. Ibu menyediakan roti, telur rebus, salad, tomato dan keju. Sara menyusun bahan-bahan tersebut di atas roti dengan kemas. Kemudian, dia meletakkan sekeping roti lagi di atasnya lalu memotong sandwic kepada dua bahagian. Sara berasa bangga kerana berjaya menyediakan makanan sendiri. Mereka menikmati sandwic itu bersama-sama pada waktu petang.`,

    dictionary: {
      "hujung": "末端",
      "minggu": "星期",
      "membuat": "制作",
      "sandwic": "三明治",
      "mencuci": "清洗",
      "tangan": "手",
      "menyediakan": "准备",
      "roti": "面包",
      "telur": "鸡蛋",
      "rebus": "水煮",
      "salad": "沙拉菜",
      "tomato": "番茄",
      "keju": "芝士",
      "bahan-bahan": "材料",
      "meletakkan": "放置",
      "sekeping": "一片",
      "memotong": "切",
      "bahagian": "部分",
      "sendiri": "自己",
      "menikmati": "享用"
    },

    grammar: {
      verb: [
        "belajar",
        "membuat",
        "mencuci",
        "menyediakan",
        "menyusun",
        "meletakkan",
        "memotong",
        "berasa",
        "berjaya",
        "menikmati"
      ],

      adjective: [
        "bersih",
        "kemas",
        "bangga"
      ],

      number: [
        "sekeping",
        "dua"
      ],

      noun: [
        "minggu",
        "sandwic",
        "ibu",
        "tangan",
        "roti",
        "telur",
        "salad",
        "tomato",
        "keju",
        "bahan-bahan",
        "bahagian",
        "makanan",
        "petang"
      ]
    },

    questions: [
      {
        question:
          "Apakah yang dilakukan sebelum menyediakan makanan?",

        answers: [
          "Bermain",
          "Mencuci tangan",
          "Tidur",
          "Membaca"
        ],

        correct: 1,

        explanation:
          "Sara dan ibunya mencuci tangan dahulu."
      },

      {
        question:
          "Sandwic dipotong kepada berapa bahagian?",

        answers: [
          "Satu",
          "Dua",
          "Tiga",
          "Empat"
        ],

        correct: 1,

        explanation:
          "Sandwic dipotong kepada dua bahagian."
      }
    ],

    writingGuide: [
      "Bilakah Sara membuat sandwic?",
      "Apakah yang dilakukan terlebih dahulu?",
      "Apakah bahan yang digunakan?",
      "Bagaimanakah sandwic disediakan?",
      "Apakah perasaan Sara?"
    ],

    usefulWords: [
      "Mula-mula",
      "mencuci tangan",
      "menyediakan bahan",
      "Kemudian",
      "menyusun",
      "memotong",
      "berjaya",
      "menikmati"
    ]
  },


  /* =======================================================
     T4 — STORY 10
     ======================================================= */

  {
    id: "t4-menyelamatkan-anak-burung",

    title: "Anak Burung yang Terjatuh",

    year: 4,

    level: "Tahun 4",

    theme: "Haiwan dan Prihatin",

    emoji: "🐦🌳🤲",

    description:
      "Imran membantu seekor anak burung yang terjatuh dari sarangnya.",

    targetWords: "80–120 perkataan",

    story:
      `Ketika berjalan pulang dari sekolah, Imran ternampak seekor anak burung di tepi jalan. Burung itu kelihatan lemah dan tidak dapat terbang. Imran melihat sebuah sarang di atas pokok berhampiran. Dia tidak terus memegang burung itu kerana bimbang mencederakannya. Sebaliknya, Imran meminta bantuan seorang jiran dewasa. Mereka menggunakan tangga untuk meletakkan anak burung kembali ke dalam sarang dengan berhati-hati. Imran berasa lega kerana haiwan kecil itu selamat.`,

    dictionary: {
      "ketika": "当……时",
      "ternampak": "看见",
      "seekor": "一只",
      "burung": "鸟",
      "tepi": "旁边",
      "lemah": "虚弱",
      "terbang": "飞",
      "sarang": "鸟巢",
      "berhampiran": "附近",
      "memegang": "拿 / 抓",
      "bimbang": "担心",
      "mencederakannya": "弄伤它",
      "sebaliknya": "相反地",
      "meminta": "请求",
      "jiran": "邻居",
      "dewasa": "成年人",
      "tangga": "梯子",
      "meletakkan": "放置",
      "berhati-hati": "小心",
      "lega": "放心",
      "selamat": "安全"
    },

    grammar: {
      verb: [
        "berjalan",
        "pulang",
        "ternampak",
        "terbang",
        "melihat",
        "memegang",
        "mencederakannya",
        "meminta",
        "menggunakan",
        "meletakkan",
        "berasa"
      ],

      adjective: [
        "lemah",
        "bimbang",
        "dewasa",
        "berhati-hati",
        "lega",
        "kecil",
        "selamat"
      ],

      number: [
        "seekor",
        "sebuah",
        "seorang"
      ],

      noun: [
        "sekolah",
        "burung",
        "jalan",
        "sarang",
        "pokok",
        "bantuan",
        "jiran",
        "tangga",
        "haiwan"
      ]
    },

    questions: [
      {
        question:
          "Apakah yang ditemui oleh Imran?",

        answers: [
          "Seekor anak burung",
          "Seekor kucing",
          "Sebuah buku",
          "Sebuah beg"
        ],

        correct: 0,

        explanation:
          "Imran ternampak seekor anak burung."
      },

      {
        question:
          "Mengapakah Imran meminta bantuan orang dewasa?",

        answers: [
          "Dia mahu pulang cepat",
          "Dia bimbang mencederakan burung",
          "Dia takut kepada pokok",
          "Dia mahu bermain"
        ],

        correct: 1,

        explanation:
          "Imran mahu membantu burung dengan selamat."
      }
    ],

    writingGuide: [
      "Di manakah Imran menemui anak burung?",
      "Bagaimanakah keadaan burung itu?",
      "Apakah yang dilihat oleh Imran?",
      "Mengapakah dia meminta bantuan?",
      "Bagaimanakah burung diselamatkan?"
    ],

    usefulWords: [
      "Ketika",
      "ternampak",
      "kelihatan lemah",
      "berasa bimbang",
      "meminta bantuan",
      "Sebaliknya",
      "dengan berhati-hati",
      "selamat"
    ]
  }

];


/* =========================================================
   END PART 2 — TAHUN 4

   DO NOT CREATE KARANGAN_STORIES YET.
   PART 3 WILL ADD:
   - TAHUN 5 — 10 STORIES
   - DATABASE MERGE
   - HELPER FUNCTIONS
   - APP.JS EXPORTS
   ========================================================= */
/* =========================================================
   STORIES DATABASE v3.0
   PART 3
   TAHUN 5 — 10 STORIES
   + DATABASE MERGE
   + HELPERS
   + APP EXPORTS
   ========================================================= */

const TAHUN5_STORIES = [

  /* =======================================================
     T5 — STORY 1
     ======================================================= */

  {
    id: "t5-hari-sukan-sekolah",

    title: "Hari Sukan Sekolah",

    year: 5,

    level: "Tahun 5",

    theme: "Sekolah dan Sukan",

    emoji: "🏃‍♂️🏅🏫",

    description:
      "Hakim mengambil bahagian dalam acara larian semasa Hari Sukan sekolah.",

    targetWords: "100–150 perkataan",

    story:
      `Pada hari Jumaat yang lalu, sekolah Hakim mengadakan Hari Sukan tahunan. Sejak awal pagi, padang sekolah dipenuhi oleh murid, guru dan ibu bapa. Hakim mengambil bahagian dalam acara larian seratus meter. Apabila wisel dibunyikan, dia berlari dengan pantas menuju ke garisan penamat. Rakan-rakannya bersorak dengan penuh semangat. Hakim berjaya mendapat tempat pertama dalam pertandingan itu. Guru menghadiahkannya sebuah pingat emas. Ibu bapanya berasa sangat bangga dengan kejayaan Hakim. Hakim berjanji akan terus berusaha untuk mencapai kejayaan pada masa hadapan.`,

    dictionary: {
      "jumaat": "星期五",
      "tahunan": "年度",
      "dipenuhi": "充满",
      "mengambil": "参加 / 拿",
      "bahagian": "部分 / 参与",
      "acara": "项目",
      "larian": "赛跑",
      "seratus": "一百",
      "meter": "米",
      "wisel": "哨子",
      "dibunyikan": "被吹响",
      "pantas": "快速",
      "menuju": "朝向",
      "garisan": "线",
      "penamat": "终点",
      "bersorak": "欢呼",
      "semangat": "精神 / 热情",
      "berjaya": "成功",
      "pertama": "第一",
      "pertandingan": "比赛",
      "pingat": "奖牌",
      "emas": "金",
      "bangga": "自豪",
      "kejayaan": "成就",
      "berusaha": "努力",
      "mencapai": "达到",
      "hadapan": "未来"
    },

    grammar: {
      verb: [
        "mengadakan",
        "mengambil",
        "dibunyikan",
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
        "ibu",
        "bapa",
        "acara",
        "larian",
        "meter",
        "wisel",
        "garisan",
        "penamat",
        "semangat",
        "pertandingan",
        "pingat",
        "kejayaan",
        "masa"
      ]
    },

    questions: [
      {
        question:
          "Apakah acara yang disertai Hakim?",

        answers: [
          "Lompat jauh",
          "Larian seratus meter",
          "Bola sepak",
          "Badminton"
        ],

        correct: 1,

        explanation:
          "Hakim menyertai acara larian seratus meter."
      },

      {
        question:
          "Apakah hadiah yang diterima Hakim?",

        answers: [
          "Sebuah buku",
          "Pingat emas",
          "Sebuah beg",
          "Wang tunai"
        ],

        correct: 1,

        explanation:
          "Guru menghadiahkan Hakim sebuah pingat emas."
      }
    ],

    writingGuide: [
      "Bilakah Hari Sukan diadakan?",
      "Bagaimanakah suasana di sekolah?",
      "Apakah acara yang disertai Hakim?",
      "Apakah yang berlaku selepas wisel dibunyikan?",
      "Apakah keputusan pertandingan?",
      "Bagaimanakah perasaan ibu bapanya?"
    ],

    usefulWords: [
      "Hari Sukan",
      "sejak awal pagi",
      "mengambil bahagian",
      "apabila",
      "berlari dengan pantas",
      "bersorak",
      "berjaya",
      "pingat emas",
      "bangga",
      "berusaha"
    ]
  },


  /* =======================================================
     T5 — STORY 2
     ======================================================= */

  {
    id: "t5-lawatan-muzium",

    title: "Lawatan ke Muzium Negara",

    year: 5,

    level: "Tahun 5",

    theme: "Sejarah dan Pengetahuan",

    emoji: "🏛️🚌📜",

    description:
      "Murid-murid belajar tentang sejarah negara semasa lawatan ke muzium.",

    targetWords: "100–150 perkataan",

    story:
      `Pada cuti sekolah yang lalu, murid-murid Tahun Lima menyertai lawatan sambil belajar ke Muzium Negara. Mereka bertolak dari sekolah pada pukul lapan pagi dengan menaiki bas. Setibanya di muzium, seorang pegawai menerangkan sejarah beberapa artifak lama. Murid-murid melihat senjata tradisional, pakaian zaman dahulu dan pelbagai bahan bersejarah. Mereka mencatat maklumat penting dalam buku nota. Selepas itu, rombongan menonton tayangan pendek tentang perkembangan negara. Lawatan tersebut sangat menarik dan memberi banyak pengetahuan baharu kepada murid-murid.`,

    dictionary: {
      "cuti": "假期",
      "menyertai": "参加",
      "lawatan": "参观",
      "muzium": "博物馆",
      "bertolak": "出发",
      "menaiki": "乘坐",
      "setibanya": "到达后",
      "pegawai": "官员",
      "menerangkan": "讲解",
      "sejarah": "历史",
      "artifak": "文物",
      "senjata": "武器",
      "tradisional": "传统",
      "zaman": "时代",
      "bersejarah": "有历史意义",
      "mencatat": "记录",
      "maklumat": "信息",
      "rombongan": "旅行团",
      "tayangan": "放映",
      "perkembangan": "发展",
      "pengetahuan": "知识"
    },

    grammar: {
      verb: [
        "menyertai",
        "bertolak",
        "menaiki",
        "menerangkan",
        "melihat",
        "mencatat",
        "menonton",
        "memberi"
      ],

      adjective: [
        "lama",
        "tradisional",
        "bersejarah",
        "penting",
        "pendek",
        "menarik",
        "baharu"
      ],

      number: [
        "beberapa",
        "seorang"
      ],

      noun: [
        "cuti",
        "sekolah",
        "murid-murid",
        "lawatan",
        "muzium",
        "bas",
        "pegawai",
        "sejarah",
        "artifak",
        "senjata",
        "pakaian",
        "zaman",
        "bahan",
        "maklumat",
        "buku",
        "nota",
        "rombongan",
        "tayangan",
        "negara",
        "pengetahuan"
      ]
    },

    questions: [
      {
        question:
          "Apakah yang diterangkan oleh pegawai muzium?",

        answers: [
          "Cara bermain bola",
          "Sejarah artifak lama",
          "Cara memasak",
          "Jadual sekolah"
        ],

        correct: 1,

        explanation:
          "Pegawai menerangkan sejarah beberapa artifak lama."
      },

      {
        question:
          "Apakah yang dilakukan oleh murid-murid semasa lawatan?",

        answers: [
          "Mencatat maklumat",
          "Tidur",
          "Bermain bola",
          "Berenang"
        ],

        correct: 0,

        explanation:
          "Mereka mencatat maklumat penting dalam buku nota."
      }
    ],

    writingGuide: [
      "Bilakah lawatan diadakan?",
      "Ke manakah murid-murid pergi?",
      "Bagaimanakah mereka pergi?",
      "Apakah yang diterangkan oleh pegawai?",
      "Apakah bahan yang dilihat?",
      "Apakah manfaat lawatan?"
    ],

    usefulWords: [
      "lawatan sambil belajar",
      "bertolak",
      "Setibanya di sana",
      "menerangkan sejarah",
      "artifak lama",
      "mencatat maklumat",
      "menonton tayangan",
      "pengetahuan baharu"
    ]
  },


  /* =======================================================
     T5 — STORY 3
     ======================================================= */

  {
    id: "t5-kempen-keselamatan-jalan-raya",

    title: "Kempen Keselamatan Jalan Raya",

    year: 5,

    level: "Tahun 5",

    theme: "Keselamatan",

    emoji: "🚦🚸🦺",

    description:
      "Sekolah mengadakan kempen untuk meningkatkan kesedaran tentang keselamatan jalan raya.",

    targetWords: "100–150 perkataan",

    story:
      `Sekolah Priya mengadakan Kempen Keselamatan Jalan Raya pada minggu lalu. Seorang pegawai polis trafik dijemput untuk memberikan ceramah kepada murid-murid. Beliau menerangkan cara melintas jalan dengan selamat, kepentingan memakai tali pinggang keledar dan bahaya menggunakan telefon ketika berjalan di jalan raya. Murid-murid turut belajar maksud beberapa papan tanda trafik. Selepas ceramah, mereka menyertai kuiz keselamatan. Priya berjaya menjawab semua soalan dengan betul. Dia sedar bahawa setiap pengguna jalan raya perlu sentiasa berhati-hati.`,

    dictionary: {
      "kempen": "宣传活动",
      "keselamatan": "安全",
      "jalan": "道路",
      "pegawai": "官员",
      "polis": "警察",
      "trafik": "交通",
      "dijemput": "被邀请",
      "ceramah": "讲座",
      "melintas": "过马路",
      "kepentingan": "重要性",
      "tali": "带",
      "pinggang": "腰",
      "keledar": "安全带 / 头盔",
      "bahaya": "危险",
      "telefon": "电话",
      "papan": "牌子",
      "tanda": "标志",
      "kuiz": "测验",
      "sedar": "意识到",
      "pengguna": "使用者",
      "berhati-hati": "小心"
    },

    grammar: {
      verb: [
        "mengadakan",
        "dijemput",
        "memberikan",
        "menerangkan",
        "melintas",
        "memakai",
        "menggunakan",
        "berjalan",
        "belajar",
        "menyertai",
        "berjaya",
        "menjawab",
        "sedar"
      ],

      adjective: [
        "selamat",
        "bahaya",
        "betul",
        "berhati-hati"
      ],

      number: [
        "seorang",
        "beberapa",
        "semua",
        "setiap"
      ],

      noun: [
        "sekolah",
        "kempen",
        "keselamatan",
        "jalan",
        "pegawai",
        "polis",
        "trafik",
        "ceramah",
        "murid-murid",
        "tali",
        "pinggang",
        "telefon",
        "papan",
        "tanda",
        "kuiz",
        "soalan",
        "pengguna"
      ]
    },

    questions: [
      {
        question:
          "Siapakah yang memberikan ceramah?",

        answers: [
          "Doktor",
          "Pegawai polis trafik",
          "Peniaga",
          "Jurulatih"
        ],

        correct: 1,

        explanation:
          "Seorang pegawai polis trafik memberikan ceramah."
      },

      {
        question:
          "Apakah yang dipelajari oleh murid-murid?",

        answers: [
          "Cara memasak",
          "Keselamatan jalan raya",
          "Cara berenang",
          "Cara melukis"
        ],

        correct: 1,

        explanation:
          "Murid belajar tentang keselamatan jalan raya."
      }
    ],

    writingGuide: [
      "Apakah kempen yang diadakan?",
      "Siapakah yang dijemput?",
      "Apakah perkara yang diterangkan?",
      "Apakah aktiviti selepas ceramah?",
      "Apakah yang dipelajari oleh Priya?"
    ],

    usefulWords: [
      "Kempen Keselamatan Jalan Raya",
      "pegawai polis trafik",
      "memberikan ceramah",
      "melintas jalan",
      "papan tanda",
      "menyertai kuiz",
      "sentiasa berhati-hati"
    ]
  },


  /* =======================================================
     T5 — STORY 4
     ======================================================= */

  {
    id: "t5-menjaga-sungai",

    title: "Menjaga Kebersihan Sungai",

    year: 5,

    level: "Tahun 5",

    theme: "Alam Sekitar",

    emoji: "🏞️♻️🐟",

    description:
      "Penduduk kampung bekerjasama membersihkan sungai.",

    targetWords: "100–150 perkataan",

    story:
      `Sungai berhampiran kampung Ravi semakin kotor kerana sesetengah orang membuang sampah ke dalam air. Ketua kampung lalu mengadakan program membersihkan sungai pada hujung minggu. Penduduk mengutip botol plastik, tin dan sampah lain di sepanjang tebing. Beberapa orang menggunakan jaring untuk mengeluarkan sampah yang terapung. Mereka turut memasang papan tanda supaya orang ramai tidak membuang sampah sesuka hati. Selepas program selesai, kawasan sungai kelihatan jauh lebih bersih. Ravi berharap semua penduduk akan terus menjaga sungai kerana sungai yang bersih penting untuk manusia dan haiwan.`,

    dictionary: {
      "sungai": "河流",
      "semakin": "越来越",
      "sesetengah": "某些",
      "ketua": "领袖",
      "program": "活动",
      "tebing": "河岸",
      "jaring": "网",
      "mengeluarkan": "取出",
      "terapung": "漂浮",
      "memasang": "安装",
      "orang ramai": "大众",
      "sesuka hati": "随意",
      "jauh": "远 / 更加",
      "berharap": "希望",
      "manusia": "人类",
      "haiwan": "动物"
    },

    grammar: {
      verb: [
        "membuang",
        "mengadakan",
        "membersihkan",
        "mengutip",
        "menggunakan",
        "mengeluarkan",
        "memasang",
        "kelihatan",
        "berharap",
        "menjaga"
      ],

      adjective: [
        "kotor",
        "bersih",
        "penting"
      ],

      number: [
        "sesetengah",
        "beberapa",
        "semua"
      ],

      noun: [
        "sungai",
        "kampung",
        "orang",
        "sampah",
        "air",
        "ketua",
        "program",
        "penduduk",
        "botol",
        "plastik",
        "tin",
        "tebing",
        "jaring",
        "papan",
        "tanda",
        "manusia",
        "haiwan"
      ]
    },

    questions: [
      {
        question:
          "Mengapakah sungai menjadi kotor?",

        answers: [
          "Kerana hujan",
          "Kerana sampah dibuang ke sungai",
          "Kerana tiada ikan",
          "Kerana air terlalu jernih"
        ],

        correct: 1,

        explanation:
          "Sesetengah orang membuang sampah ke dalam sungai."
      },

      {
        question:
          "Apakah tujuan papan tanda dipasang?",

        answers: [
          "Untuk hiasan",
          "Supaya orang tidak membuang sampah",
          "Untuk menjual barang",
          "Untuk pertandingan"
        ],

        correct: 1,

        explanation:
          "Papan tanda mengingatkan orang ramai supaya tidak membuang sampah."
      }
    ],

    writingGuide: [
      "Mengapakah sungai menjadi kotor?",
      "Siapakah yang menganjurkan program?",
      "Apakah aktiviti yang dilakukan?",
      "Mengapakah papan tanda dipasang?",
      "Bagaimanakah keadaan sungai selepas program?"
    ],

    usefulWords: [
      "semakin kotor",
      "mengadakan program",
      "sepanjang tebing",
      "mengeluarkan sampah",
      "memasang papan tanda",
      "Selepas itu",
      "menjaga kebersihan"
    ]
  },


  /* =======================================================
     T5 — STORY 5
     ======================================================= */

  {
    id: "t5-memasak-bersama-keluarga",

    title: "Memasak Bersama Keluarga",

    year: 5,

    level: "Tahun 5",

    theme: "Keluarga dan Kemahiran Hidup",

    emoji: "🍳👨‍👩‍👧‍👦🥘",

    description:
      "Aqil membantu keluarganya menyediakan makan malam.",

    targetWords: "100–150 perkataan",

    story:
      `Pada petang Sabtu, keluarga Aqil bercadang memasak makan malam bersama-sama. Ayah menyediakan ayam manakala ibu memotong sayur-sayuran. Aqil diberi tugas mencuci beras dan memasukkannya ke dalam periuk nasi. Kakaknya pula menyediakan jus buah. Mereka bekerja dengan teliti supaya makanan dapat disiapkan tepat pada waktunya. Setelah semua hidangan siap, keluarga Aqil makan bersama di meja makan. Aqil berasa puas kerana dapat membantu. Dia juga sedar bahawa memasak bersama-sama dapat mengeratkan hubungan antara ahli keluarga.`,

    dictionary: {
      "bercadang": "计划",
      "memasak": "烹饪",
      "menyediakan": "准备",
      "ayam": "鸡肉",
      "memotong": "切",
      "sayur-sayuran": "蔬菜",
      "diberi": "被给予",
      "tugas": "任务",
      "mencuci": "清洗",
      "beras": "米",
      "periuk": "锅",
      "nasi": "饭",
      "jus": "果汁",
      "teliti": "仔细",
      "disiapkan": "被完成",
      "tepat": "准时 / 正确",
      "hidangan": "菜肴",
      "puas": "满足",
      "mengeratkan": "加强",
      "hubungan": "关系",
      "ahli": "成员"
    },

    grammar: {
      verb: [
        "bercadang",
        "memasak",
        "menyediakan",
        "memotong",
        "diberi",
        "mencuci",
        "memasukkannya",
        "bekerja",
        "disiapkan",
        "makan",
        "berasa",
        "membantu",
        "sedar",
        "mengeratkan"
      ],

      adjective: [
        "teliti",
        "tepat",
        "puas"
      ],

      number: [],

      noun: [
        "petang",
        "keluarga",
        "makan",
        "malam",
        "ayah",
        "ayam",
        "ibu",
        "sayur-sayuran",
        "tugas",
        "beras",
        "periuk",
        "nasi",
        "jus",
        "buah",
        "makanan",
        "hidangan",
        "meja",
        "hubungan"
      ]
    },

    questions: [
      {
        question:
          "Apakah tugas Aqil?",

        answers: [
          "Memotong sayur",
          "Mencuci beras",
          "Membeli makanan",
          "Membuat kek"
        ],

        correct: 1,

        explanation:
          "Aqil mencuci beras dan memasukkannya ke dalam periuk nasi."
      },

      {
        question:
          "Apakah manfaat memasak bersama keluarga?",

        answers: [
          "Mengeratkan hubungan",
          "Membazir masa",
          "Menjadikan rumah kotor",
          "Membuat semua orang marah"
        ],

        correct: 0,

        explanation:
          "Memasak bersama dapat mengeratkan hubungan keluarga."
      }
    ],

    writingGuide: [
      "Bilakah keluarga Aqil memasak bersama?",
      "Apakah tugas setiap ahli keluarga?",
      "Apakah tugas Aqil?",
      "Bagaimanakah mereka bekerja?",
      "Apakah manfaat aktiviti tersebut?"
    ],

    usefulWords: [
      "bercadang",
      "menyediakan",
      "diberi tugas",
      "dengan teliti",
      "setelah selesai",
      "berasa puas",
      "mengeratkan hubungan"
    ]
  },


  /* =======================================================
     T5 — STORY 6
     ======================================================= */

  {
    id: "t5-pertandingan-bercerita",

    title: "Pertandingan Bercerita",

    year: 5,

    level: "Tahun 5",

    theme: "Bahasa dan Keyakinan Diri",

    emoji: "🎤📖🏆",

    description:
      "Sofia mengatasi rasa gugup semasa pertandingan bercerita.",

    targetWords: "100–150 perkataan",

    story:
      `Sofia dipilih untuk mewakili kelasnya dalam pertandingan bercerita. Pada mulanya, dia berasa gugup kerana perlu bercakap di hadapan ramai orang. Setiap petang, Sofia berlatih membaca cerita dengan sebutan yang jelas dan intonasi yang sesuai. Ibunya turut membantu memberikan cadangan. Pada hari pertandingan, Sofia menarik nafas panjang sebelum naik ke pentas. Dia berjaya menyampaikan cerita dengan yakin. Walaupun tidak mendapat tempat pertama, Sofia menerima anugerah persembahan terbaik. Dia berasa bangga kerana berjaya mengatasi rasa takutnya.`,

    dictionary: {
      "dipilih": "被选中",
      "mewakili": "代表",
      "gugup": "紧张",
      "bercakap": "说话",
      "hadapan": "前面",
      "berlatih": "练习",
      "sebutan": "发音",
      "jelas": "清楚",
      "intonasi": "语调",
      "sesuai": "合适",
      "cadangan": "建议",
      "menarik": "吸",
      "nafas": "呼吸",
      "pentas": "舞台",
      "menyampaikan": "呈现",
      "yakin": "自信",
      "walaupun": "虽然",
      "anugerah": "奖项",
      "persembahan": "表演",
      "terbaik": "最佳",
      "mengatasi": "克服"
    },

    grammar: {
      verb: [
        "dipilih",
        "mewakili",
        "berasa",
        "bercakap",
        "berlatih",
        "membaca",
        "membantu",
        "memberikan",
        "menarik",
        "naik",
        "berjaya",
        "menyampaikan",
        "mendapat",
        "menerima",
        "mengatasi"
      ],

      adjective: [
        "gugup",
        "jelas",
        "sesuai",
        "panjang",
        "yakin",
        "terbaik",
        "bangga"
      ],

      number: [
        "pertama"
      ],

      noun: [
        "kelas",
        "pertandingan",
        "orang",
        "petang",
        "cerita",
        "sebutan",
        "intonasi",
        "ibu",
        "cadangan",
        "hari",
        "nafas",
        "pentas",
        "tempat",
        "anugerah",
        "persembahan"
      ]
    },

    questions: [
      {
        question:
          "Mengapakah Sofia berasa gugup?",

        answers: [
          "Dia perlu bercakap di hadapan ramai orang",
          "Dia terlupa membawa buku",
          "Dia tidak mahu ke sekolah",
          "Dia kehilangan hadiah"
        ],

        correct: 0,

        explanation:
          "Sofia gugup kerana perlu bercakap di hadapan ramai orang."
      },

      {
        question:
          "Apakah anugerah yang diterima Sofia?",

        answers: [
          "Tempat pertama",
          "Persembahan terbaik",
          "Murid terbaik",
          "Pembaca terpantas"
        ],

        correct: 1,

        explanation:
          "Sofia menerima anugerah persembahan terbaik."
      }
    ],

    writingGuide: [
      "Mengapakah Sofia dipilih?",
      "Apakah perasaannya pada mulanya?",
      "Bagaimanakah dia membuat persediaan?",
      "Apakah yang dilakukan sebelum naik pentas?",
      "Apakah keputusan pertandingan?",
      "Apakah yang dipelajari Sofia?"
    ],

    usefulWords: [
      "dipilih mewakili",
      "berasa gugup",
      "berlatih",
      "sebutan yang jelas",
      "menarik nafas",
      "dengan yakin",
      "Walaupun",
      "mengatasi rasa takut"
    ]
  },


  /* =======================================================
     T5 — STORY 7
     ======================================================= */

  {
    id: "t5-menyertai-kem-cuti",

    title: "Kem Cuti Sekolah",

    year: 5,

    level: "Tahun 5",

    theme: "Pengalaman dan Kepimpinan",

    emoji: "⛺🔥🧭",

    description:
      "Irfan menyertai kem dan belajar bekerjasama dalam kumpulan.",

    targetWords: "100–150 perkataan",

    story:
      `Semasa cuti sekolah, Irfan menyertai kem selama tiga hari dua malam bersama beberapa orang rakan. Mereka mendirikan khemah, memasak makanan ringkas dan mengikuti aktiviti mencari arah menggunakan kompas. Pada waktu malam, peserta berkumpul di sekitar unggun api sambil menyanyikan lagu. Pada hari kedua, kumpulan Irfan perlu menyeberangi halangan dengan bekerjasama. Walaupun aktiviti itu mencabar, mereka berjaya menyelesaikannya. Irfan belajar bahawa komunikasi, keberanian dan kerjasama amat penting apabila bekerja dalam satu pasukan.`,

    dictionary: {
      "kem": "营地",
      "mendirikan": "搭建",
      "khemah": "帐篷",
      "ringkas": "简单",
      "mengikuti": "参加",
      "arah": "方向",
      "kompas": "指南针",
      "peserta": "参与者",
      "unggun": "篝火",
      "menyeberangi": "跨越",
      "halangan": "障碍",
      "mencabar": "有挑战性",
      "menyelesaikannya": "完成它",
      "komunikasi": "沟通",
      "keberanian": "勇气",
      "kerjasama": "合作",
      "pasukan": "团队"
    },

    grammar: {
      verb: [
        "menyertai",
        "mendirikan",
        "memasak",
        "mengikuti",
        "mencari",
        "menggunakan",
        "berkumpul",
        "menyanyikan",
        "menyeberangi",
        "bekerjasama",
        "berjaya",
        "menyelesaikannya",
        "belajar",
        "bekerja"
      ],

      adjective: [
        "ringkas",
        "mencabar",
        "penting"
      ],

      number: [
        "tiga",
        "dua",
        "beberapa",
        "kedua",
        "satu"
      ],

      noun: [
        "cuti",
        "sekolah",
        "kem",
        "hari",
        "malam",
        "rakan",
        "khemah",
        "makanan",
        "aktiviti",
        "arah",
        "kompas",
        "peserta",
        "unggun",
        "api",
        "kumpulan",
        "halangan",
        "komunikasi",
        "keberanian",
        "kerjasama",
        "pasukan"
      ]
    },

    questions: [
      {
        question:
          "Berapa lamakah kem tersebut berlangsung?",

        answers: [
          "Satu hari",
          "Dua hari",
          "Tiga hari dua malam",
          "Seminggu"
        ],

        correct: 2,

        explanation:
          "Kem berlangsung selama tiga hari dua malam."
      },

      {
        question:
          "Apakah nilai yang dipelajari oleh Irfan?",

        answers: [
          "Kerjasama dan keberanian",
          "Kemalasan",
          "Sikap mementingkan diri",
          "Membazir masa"
        ],

        correct: 0,

        explanation:
          "Irfan belajar pentingnya komunikasi, keberanian dan kerjasama."
      }
    ],

    writingGuide: [
      "Bilakah Irfan menyertai kem?",
      "Berapa lama kem itu berlangsung?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah cabaran yang dihadapi?",
      "Bagaimanakah kumpulannya menyelesaikan cabaran?",
      "Apakah nilai yang dipelajari?"
    ],

    usefulWords: [
      "semasa cuti sekolah",
      "mendirikan khemah",
      "menggunakan kompas",
      "unggun api",
      "bekerjasama",
      "Walaupun",
      "aktiviti mencabar",
      "satu pasukan"
    ]
  },


  /* =======================================================
     T5 — STORY 8
     ======================================================= */

  {
    id: "t5-pameran-sains",

    title: "Pameran Sains Sekolah",

    year: 5,

    level: "Tahun 5",

    theme: "Sains dan Teknologi",

    emoji: "🔬🧪🤖",

    description:
      "Murid-murid mempamerkan projek sains mereka kepada pengunjung.",

    targetWords: "100–150 perkataan",

    story:
      `Sekolah Jason mengadakan Pameran Sains di dewan utama. Setiap kelas menyediakan beberapa projek untuk dipamerkan. Kumpulan Jason membina model sistem suria menggunakan bola berwarna dan bahan terpakai. Mereka menerangkan kedudukan planet kepada para pengunjung. Kumpulan lain menghasilkan gunung berapi mini dan model robot mudah. Ramai ibu bapa datang melihat hasil kerja murid-murid. Jason berasa gembira kerana dapat berkongsi pengetahuan dengan orang lain. Dia juga semakin berminat untuk mempelajari bidang sains dan teknologi.`,

    dictionary: {
      "pameran": "展览",
      "dewan": "礼堂",
      "utama": "主要",
      "projek": "项目",
      "dipamerkan": "被展示",
      "model": "模型",
      "sistem": "系统",
      "suria": "太阳系",
      "terpakai": "用过的 / 再利用",
      "kedudukan": "位置",
      "planet": "行星",
      "pengunjung": "访客",
      "menghasilkan": "制作 / 产生",
      "gunung": "山",
      "berapi": "火山",
      "robot": "机器人",
      "mudah": "简单",
      "berkongsi": "分享",
      "bidang": "领域",
      "teknologi": "科技"
    },

    grammar: {
      verb: [
        "mengadakan",
        "menyediakan",
        "dipamerkan",
        "membina",
        "menggunakan",
        "menerangkan",
        "menghasilkan",
        "datang",
        "melihat",
        "berasa",
        "berkongsi",
        "mempelajari"
      ],

      adjective: [
        "utama",
        "terpakai",
        "mudah",
        "gembira",
        "berminat"
      ],

      number: [
        "setiap",
        "beberapa",
        "ramai"
      ],

      noun: [
        "sekolah",
        "pameran",
        "sains",
        "dewan",
        "kelas",
        "projek",
        "kumpulan",
        "model",
        "sistem",
        "bola",
        "bahan",
        "planet",
        "pengunjung",
        "gunung",
        "robot",
        "ibu",
        "bapa",
        "pengetahuan",
        "bidang",
        "teknologi"
      ]
    },

    questions: [
      {
        question:
          "Apakah projek kumpulan Jason?",

        answers: [
          "Model sistem suria",
          "Model rumah",
          "Model jambatan",
          "Model kereta"
        ],

        correct: 0,

        explanation:
          "Kumpulan Jason membina model sistem suria."
      },

      {
        question:
          "Apakah yang berlaku kepada minat Jason selepas pameran?",

        answers: [
          "Dia semakin berminat dalam sains",
          "Dia tidak suka sains",
          "Dia mahu berhenti sekolah",
          "Dia hanya mahu bermain"
        ],

        correct: 0,

        explanation:
          "Jason semakin berminat mempelajari sains dan teknologi."
      }
    ],

    writingGuide: [
      "Di manakah pameran diadakan?",
      "Apakah projek kumpulan Jason?",
      "Bagaimanakah projek itu dibuat?",
      "Apakah projek kumpulan lain?",
      "Bagaimanakah perasaan Jason?"
    ],

    usefulWords: [
      "Pameran Sains",
      "menyediakan projek",
      "membina model",
      "bahan terpakai",
      "menerangkan",
      "para pengunjung",
      "berkongsi pengetahuan",
      "semakin berminat"
    ]
  },


  /* =======================================================
     T5 — STORY 9
     ======================================================= */

  {
    id: "t5-derma-buku",

    title: "Program Derma Buku",

    year: 5,

    level: "Tahun 5",

    theme: "Masyarakat dan Pendidikan",

    emoji: "📚🎁🤝",

    description:
      "Murid-murid mengumpulkan buku untuk disumbangkan kepada sekolah yang memerlukan.",

    targetWords: "100–150 perkataan",

    story:
      `Kelab Bahasa sekolah Aisyah menganjurkan Program Derma Buku. Tujuan program itu adalah untuk mengumpulkan buku bacaan yang masih berada dalam keadaan baik. Buku-buku tersebut akan disumbangkan kepada sebuah sekolah di kawasan pedalaman. Aisyah membawa beberapa buku cerita yang telah dibacanya. Bersama rakan-rakan, dia memeriksa buku, menyusunnya mengikut kategori dan memasukkannya ke dalam kotak. Dalam masa seminggu, mereka berjaya mengumpulkan ratusan buah buku. Aisyah berasa bangga kerana sumbangan kecil mereka dapat membantu murid lain menikmati bahan bacaan.`,

    dictionary: {
      "derma": "捐赠",
      "tujuan": "目的",
      "mengumpulkan": "收集",
      "bacaan": "读物",
      "keadaan": "状况",
      "disumbangkan": "被捐赠",
      "pedalaman": "偏远地区",
      "memeriksa": "检查",
      "menyusunnya": "整理它们",
      "kategori": "类别",
      "ratusan": "数百",
      "sumbangan": "捐献",
      "menikmati": "享受",
      "bahan": "材料 / 读物"
    },

    grammar: {
      verb: [
        "menganjurkan",
        "mengumpulkan",
        "disumbangkan",
        "membawa",
        "dibacanya",
        "memeriksa",
        "menyusunnya",
        "memasukkannya",
        "berjaya",
        "berasa",
        "membantu",
        "menikmati"
      ],

      adjective: [
        "baik",
        "bangga",
        "kecil"
      ],

      number: [
        "beberapa",
        "sebuah",
        "ratusan"
      ],

      noun: [
        "kelab",
        "bahasa",
        "sekolah",
        "program",
        "tujuan",
        "buku",
        "bacaan",
        "keadaan",
        "kawasan",
        "pedalaman",
        "rakan-rakan",
        "kategori",
        "kotak",
        "sumbangan",
        "murid",
        "bahan"
      ]
    },

    questions: [
      {
        question:
          "Ke manakah buku-buku akan disumbangkan?",

        answers: [
          "Ke kedai buku",
          "Ke sekolah di kawasan pedalaman",
          "Ke pasar",
          "Ke rumah Aisyah"
        ],

        correct: 1,

        explanation:
          "Buku akan disumbangkan kepada sekolah di kawasan pedalaman."
      },

      {
        question:
          "Apakah yang dilakukan sebelum buku dimasukkan ke dalam kotak?",

        answers: [
          "Buku dibuang",
          "Buku diperiksa dan disusun",
          "Buku dibasahkan",
          "Buku dikoyakkan"
        ],

        correct: 1,

        explanation:
          "Murid memeriksa dan menyusun buku terlebih dahulu."
      }
    ],

    writingGuide: [
      "Siapakah yang menganjurkan program?",
      "Apakah tujuan program?",
      "Ke manakah buku disumbangkan?",
      "Apakah tugas Aisyah dan rakannya?",
      "Berapa banyak buku dikumpulkan?",
      "Bagaimanakah perasaan Aisyah?"
    ],

    usefulWords: [
      "Program Derma Buku",
      "tujuan program",
      "berada dalam keadaan baik",
      "disumbangkan",
      "kawasan pedalaman",
      "mengikut kategori",
      "berjaya mengumpulkan",
      "membantu murid lain"
    ]
  },


  /* =======================================================
     T5 — STORY 10
     ======================================================= */

  {
    id: "t5-menjimatkan-elektrik",

    title: "Amalan Menjimatkan Elektrik",

    year: 5,

    level: "Tahun 5",

    theme: "Alam Sekitar dan Tanggungjawab",

    emoji: "💡🔌🌍",

    description:
      "Keluarga Hana mengamalkan langkah mudah untuk mengurangkan penggunaan elektrik.",

    targetWords: "100–150 perkataan",

    story:
      `Hana menyedari bil elektrik keluarganya semakin meningkat. Ayah lalu mengajak semua ahli keluarga mengamalkan beberapa langkah penjimatan. Mereka mematikan lampu dan kipas apabila tidak digunakan. Pada waktu siang, tingkap dibuka supaya cahaya matahari dapat menerangi rumah. Mereka juga mencabut plag pengecas selepas digunakan dan menggunakan penghawa dingin hanya apabila perlu. Selepas beberapa bulan, penggunaan elektrik mereka berkurangan. Hana gembira kerana keluarganya bukan sahaja dapat menjimatkan wang, malah turut membantu memelihara alam sekitar.`,

    dictionary: {
      "menyedari": "意识到",
      "bil": "账单",
      "meningkat": "增加",
      "mengajak": "邀请",
      "mengamalkan": "实行",
      "penjimatan": "节省",
      "mematikan": "关闭",
      "kipas": "风扇",
      "digunakan": "被使用",
      "siang": "白天",
      "tingkap": "窗户",
      "cahaya": "光",
      "menerangi": "照亮",
      "mencabut": "拔掉",
      "plag": "插头",
      "pengecas": "充电器",
      "penghawa": "冷气",
      "dingin": "冷",
      "berkurangan": "减少",
      "menjimatkan": "节省",
      "malah": "而且",
      "memelihara": "保护"
    },

    grammar: {
      verb: [
        "menyedari",
        "meningkat",
        "mengajak",
        "mengamalkan",
        "mematikan",
        "digunakan",
        "dibuka",
        "menerangi",
        "mencabut",
        "menggunakan",
        "berkurangan",
        "menjimatkan",
        "membantu",
        "memelihara"
      ],

      adjective: [
        "dingin",
        "gembira"
      ],

      number: [
        "semua",
        "beberapa"
      ],

      noun: [
        "bil",
        "elektrik",
        "keluarga",
        "ayah",
        "ahli",
        "langkah",
        "penjimatan",
        "lampu",
        "kipas",
        "waktu",
        "siang",
        "tingkap",
        "cahaya",
        "matahari",
        "rumah",
        "plag",
        "pengecas",
        "bulan",
        "wang",
        "alam"
      ]
    },

    questions: [
      {
        question:
          "Mengapakah keluarga Hana mula berjimat elektrik?",

        answers: [
          "Bil elektrik semakin meningkat",
          "Rumah terlalu kecil",
          "Lampu rosak",
          "Mereka mahu berpindah"
        ],

        correct: 0,

        explanation:
          "Bil elektrik keluarga Hana semakin meningkat."
      },

      {
        question:
          "Apakah manfaat menjimatkan elektrik?",

        answers: [
          "Menambah bil",
          "Menjimatkan wang dan membantu alam sekitar",
          "Menjadikan rumah lebih kotor",
          "Merosakkan peralatan"
        ],

        correct: 1,

        explanation:
          "Penjimatan elektrik mengurangkan kos dan membantu alam sekitar."
      }
    ],

    writingGuide: [
      "Apakah masalah yang disedari oleh Hana?",
      "Apakah cadangan ayah?",
      "Apakah langkah penjimatan yang dilakukan?",
      "Apakah perubahan selepas beberapa bulan?",
      "Apakah manfaat menjimatkan elektrik?"
    ],

    usefulWords: [
      "semakin meningkat",
      "mengamalkan langkah",
      "mematikan lampu",
      "cahaya matahari",
      "mencabut plag",
      "apabila perlu",
      "berkurangan",
      "bukan sahaja",
      "malah"
    ]
  }

];


/* =========================================================
   4. MASTER STORY DATABASE
   ========================================================= */

const KARANGAN_STORIES = [
  ...TAHUN3_STORIES,
  ...TAHUN4_STORIES,
  ...TAHUN5_STORIES
];


/* =========================================================
   5. DATABASE HELPERS
   ========================================================= */

function getAllStories() {

  return [
    ...KARANGAN_STORIES
  ];

}


function getStoryById(
  id
) {

  return (
    KARANGAN_STORIES.find(
      story =>
        String(
          story.id
        ) ===
        String(id)
    ) ||
    null
  );

}


function getStoriesByYear(
  year
) {

  return KARANGAN_STORIES.filter(
    story =>
      Number(
        story.year
      ) ===
      Number(year)
  );

}


function getStoriesByTheme(
  theme
) {

  const query =
    String(
      theme || ""
    )
      .trim()
      .toLowerCase();


  if (!query) {

    return getAllStories();

  }


  return KARANGAN_STORIES.filter(
    story =>
      String(
        story.theme || ""
      )
        .toLowerCase()
        .includes(query)
  );

}


function getStoryCount() {

  return KARANGAN_STORIES.length;

}


/* =========================================================
   6. CURRENT LESSON
   ========================================================= */

let currentStoryId =
  "t3-berkelah-pantai";


function getCurrentStory() {

  return (
    getStoryById(
      currentStoryId
    ) ||
    KARANGAN_STORIES[0] ||
    null
  );

}


function setCurrentStory(
  id
) {

  const story =
    getStoryById(id);


  if (!story) {

    console.warn(
      "Story not found:",
      id
    );

    return false;

  }


  currentStoryId =
    story.id;


  try {

    localStorage.setItem(
      "karanganCurrentStory",
      story.id
    );

  } catch (error) {

    console.warn(
      "Unable to save current story.",
      error
    );

  }


  return true;

}


/* =========================================================
   7. RESTORE LAST STORY
   ========================================================= */

try {

  const savedStory =
    localStorage.getItem(
      "karanganCurrentStory"
    );


  if (
    savedStory &&
    getStoryById(
      savedStory
    )
  ) {

    currentStoryId =
      savedStory;

  }

} catch (error) {

  console.warn(
    "Unable to restore lesson.",
    error
  );

}


/* =========================================================
   8. STUDENT PROGRESS
   ========================================================= */

function getDefaultStoryProgress() {

  return {

    completedLessons: [],

    totalStars: 0,

    essaysWritten: 0,

    quizCorrect: 0

  };

}


function getStudentProgress() {

  try {

    const saved =
      localStorage.getItem(
        "karanganProgress"
      );


    if (!saved) {

      return getDefaultStoryProgress();

    }


    const parsed =
      JSON.parse(
        saved
      );


    return {

      ...getDefaultStoryProgress(),

      ...parsed,

      completedLessons:
        Array.isArray(
          parsed.completedLessons
        )
          ? parsed.completedLessons
          : []

    };

  } catch (error) {

    return getDefaultStoryProgress();

  }

}


function saveStudentProgress(
  progress
) {

  try {

    localStorage.setItem(
      "karanganProgress",
      JSON.stringify(
        progress
      )
    );

  } catch (error) {

    console.warn(
      "Unable to save student progress.",
      error
    );

  }

}


/* =========================================================
   9. COMPLETE LESSON
   ========================================================= */

function completeLesson(
  storyId
) {

  const progress =
    getStudentProgress();


  if (
    !progress
      .completedLessons
      .includes(
        storyId
      )
  ) {

    progress
      .completedLessons
      .push(
        storyId
      );


    progress.totalStars =
      Number(
        progress.totalStars ||
        0
      ) + 3;

  }


  saveStudentProgress(
    progress
  );


  return progress;

}


/* =========================================================
   10. QUIZ / ESSAY STATS
   ========================================================= */

function addQuizCorrect() {

  const progress =
    getStudentProgress();


  progress.quizCorrect =
    Number(
      progress.quizCorrect ||
      0
    ) + 1;


  saveStudentProgress(
    progress
  );


  return progress;

}


function addEssayWritten() {

  const progress =
    getStudentProgress();


  progress.essaysWritten =
    Number(
      progress.essaysWritten ||
      0
    ) + 1;


  saveStudentProgress(
    progress
  );


  return progress;

}


/* =========================================================
   11. WORD NORMALISATION
   ========================================================= */

function normalizeMalayWord(
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


/* =========================================================
   12. TRANSLATION LOOKUP

   Search current story first.
   Then search all stories.
   ========================================================= */

function getTranslation(
  word
) {

  const clean =
    normalizeMalayWord(
      word
    );


  if (!clean) {

    return null;

  }


  const current =
    getCurrentStory();


  if (
    current?.dictionary &&
    current.dictionary[
      clean
    ]
  ) {

    return current.dictionary[
      clean
    ];

  }


  for (
    const story of
    KARANGAN_STORIES
  ) {

    if (
      story.dictionary &&
      story.dictionary[
        clean
      ]
    ) {

      return story.dictionary[
        clean
      ];

    }

  }


  return null;

}


/* =========================================================
   13. GRAMMAR LOOKUP
   ========================================================= */

function getGrammarType(
  word,
  storyId = null
) {

  const story =
    storyId
      ? getStoryById(
          storyId
        )
      : getCurrentStory();


  if (!story) {

    return "";

  }


  const clean =
    normalizeMalayWord(
      word
    );


  const grammar =
    story.grammar ||
    {};


  if (
    grammar.verb &&
    grammar.verb.includes(
      clean
    )
  ) {

    return "verb";

  }


  if (
    grammar.adjective &&
    grammar.adjective.includes(
      clean
    )
  ) {

    return "adjective";

  }


  if (
    grammar.number &&
    grammar.number.includes(
      clean
    )
  ) {

    return "number";

  }


  if (
    grammar.noun &&
    grammar.noun.includes(
      clean
    )
  ) {

    return "noun";

  }


  return "";

}


/* =========================================================
   14. STORY QUESTIONS
   ========================================================= */

function getStoryQuestions(
  storyId
) {

  const story =
    getStoryById(
      storyId
    );


  return Array.isArray(
    story?.questions
  )
    ? story.questions
    : [];

}


/* =========================================================
   15. STORY WRITING GUIDE
   ========================================================= */

function getStoryWritingGuide(
  storyId
) {

  const story =
    getStoryById(
      storyId
    );


  return Array.isArray(
    story?.writingGuide
  )
    ? story.writingGuide
    : [];

}


/* =========================================================
   16. USEFUL WORDS
   ========================================================= */

function getStoryUsefulWords(
  storyId
) {

  const story =
    getStoryById(
      storyId
    );


  return Array.isArray(
    story?.usefulWords
  )
    ? story.usefulWords
    : [];

}


/* =========================================================
   17. APP.JS COMPATIBILITY EXPORTS
   ========================================================= */

window.KARANGAN_STORIES =
  KARANGAN_STORIES;

window.stories =
  KARANGAN_STORIES;

window.STORIES =
  KARANGAN_STORIES;

window.storyData =
  KARANGAN_STORIES;


/* =========================================================
   18. PUBLIC STORY HELPERS
   ========================================================= */

window.getAllStories =
  getAllStories;

window.getStoryById =
  getStoryById;

window.getStoriesByYear =
  getStoriesByYear;

window.getStoriesByTheme =
  getStoriesByTheme;

window.getStoryCount =
  getStoryCount;

window.getCurrentStory =
  getCurrentStory;

window.setCurrentStory =
  setCurrentStory;

window.getStudentProgress =
  getStudentProgress;

window.saveStudentProgress =
  saveStudentProgress;

window.completeLesson =
  completeLesson;

window.addQuizCorrect =
  addQuizCorrect;

window.addEssayWritten =
  addEssayWritten;

window.normalizeMalayWord =
  normalizeMalayWord;

window.getTranslation =
  getTranslation;

window.getGrammarType =
  getGrammarType;

window.getStoryQuestions =
  getStoryQuestions;

window.getStoryWritingGuide =
  getStoryWritingGuide;

window.getStoryUsefulWords =
  getStoryUsefulWords;


/* =========================================================
   19. DATABASE CHECK
   ========================================================= */

console.log(
  "✅ Karangan AI Stories Database v3.0 loaded:",
  getStoryCount(),
  "stories"
);


console.log(
  "✅ Tahun 3:",
  getStoriesByYear(3).length,
  "stories"
);


console.log(
  "✅ Tahun 4:",
  getStoriesByYear(4).length,
  "stories"
);


console.log(
  "✅ Tahun 5:",
  getStoriesByYear(5).length,
  "stories"
);


/* =========================================================
   END
   KARANGAN AI STORIES DATABASE v3.0

   TOTAL:
   Tahun 3 = 10
   Tahun 4 = 10
   Tahun 5 = 10
   TOTAL = 30 STORIES
   ========================================================= */


/* =========================================================
   PHASE 1 CONTENT EXPANSION — 60 ADDITIONAL COMPLETE LESSONS
   Total target: 30 stories per year / 90 stories
   ========================================================= */
const KARANGAN_PHASE1_EXTRA_STORIES = [
  {
    "id": "lawatan-ke-zoo",
    "title": "Lawatan ke Zoo",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Haiwan",
    "emoji": "📖✨",
    "description": "Cerita bertema haiwan untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Lawatan ke Zoo"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti lawatan ke zoo. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "membantu-ibu-di-dapur",
    "title": "Membantu Ibu di Dapur",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Keluarga",
    "emoji": "📖✨",
    "description": "Cerita bertema keluarga untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Membantu Ibu di Dapur"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti membantu ibu di dapur. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "hari-jadi-saya",
    "title": "Hari Jadi Saya",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Keluarga",
    "emoji": "📖✨",
    "description": "Cerita bertema keluarga untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Hari Jadi Saya"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti hari jadi saya. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menanam-pokok-bunga",
    "title": "Menanam Pokok Bunga",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Alam Sekitar",
    "emoji": "📖✨",
    "description": "Cerita bertema alam sekitar untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menanam Pokok Bunga"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti menanam pokok bunga. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "pergi-ke-perpustakaan",
    "title": "Pergi ke Perpustakaan",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Sekolah",
    "emoji": "📖✨",
    "description": "Cerita bertema sekolah untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Pergi ke Perpustakaan"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti pergi ke perpustakaan. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "bermain-di-taman",
    "title": "Bermain di Taman",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Rekreasi",
    "emoji": "📖✨",
    "description": "Cerita bertema rekreasi untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Bermain di Taman"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti bermain di taman. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "kucing-kesayangan-saya",
    "title": "Kucing Kesayangan Saya",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Haiwan",
    "emoji": "📖✨",
    "description": "Cerita bertema haiwan untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Kucing Kesayangan Saya"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti kucing kesayangan saya. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "membeli-belah-di-pasar",
    "title": "Membeli-belah di Pasar",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Kehidupan Harian",
    "emoji": "📖✨",
    "description": "Cerita bertema kehidupan harian untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Membeli-belah di Pasar"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti membeli-belah di pasar. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "majlis-hari-raya",
    "title": "Majlis Hari Raya",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Perayaan",
    "emoji": "📖✨",
    "description": "Cerita bertema perayaan untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Majlis Hari Raya"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti majlis hari raya. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menjaga-kebersihan-kelas",
    "title": "Menjaga Kebersihan Kelas",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Sekolah",
    "emoji": "📖✨",
    "description": "Cerita bertema sekolah untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menjaga Kebersihan Kelas"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti menjaga kebersihan kelas. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "belajar-menunggang-basikal",
    "title": "Belajar Menunggang Basikal",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Pengalaman",
    "emoji": "📖✨",
    "description": "Cerita bertema pengalaman untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Belajar Menunggang Basikal"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti belajar menunggang basikal. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "lawatan-ke-ladang",
    "title": "Lawatan ke Ladang",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Alam",
    "emoji": "📖✨",
    "description": "Cerita bertema alam untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Lawatan ke Ladang"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti lawatan ke ladang. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "membantu-jiran",
    "title": "Membantu Jiran",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Kemasyarakatan",
    "emoji": "📖✨",
    "description": "Cerita bertema kemasyarakatan untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Membantu Jiran"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti membantu jiran. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "hari-pertama-di-sekolah",
    "title": "Hari Pertama di Sekolah",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Sekolah",
    "emoji": "📖✨",
    "description": "Cerita bertema sekolah untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Hari Pertama di Sekolah"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti hari pertama di sekolah. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "berkunjung-ke-rumah-nenek",
    "title": "Berkunjung ke Rumah Nenek",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Keluarga",
    "emoji": "📖✨",
    "description": "Cerita bertema keluarga untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Berkunjung ke Rumah Nenek"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti berkunjung ke rumah nenek. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "pertandingan-mewarna",
    "title": "Pertandingan Mewarna",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Sekolah",
    "emoji": "📖✨",
    "description": "Cerita bertema sekolah untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Pertandingan Mewarna"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti pertandingan mewarna. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "bermain-layang-layang",
    "title": "Bermain Layang-layang",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Rekreasi",
    "emoji": "📖✨",
    "description": "Cerita bertema rekreasi untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Bermain Layang-layang"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti bermain layang-layang. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "sarapan-bersama-keluarga",
    "title": "Sarapan Bersama Keluarga",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Keluarga",
    "emoji": "📖✨",
    "description": "Cerita bertema keluarga untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Sarapan Bersama Keluarga"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti sarapan bersama keluarga. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menjaga-haiwan-peliharaan",
    "title": "Menjaga Haiwan Peliharaan",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Tanggungjawab",
    "emoji": "📖✨",
    "description": "Cerita bertema tanggungjawab untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menjaga Haiwan Peliharaan"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti menjaga haiwan peliharaan. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "hujan-pada-petang-hari",
    "title": "Hujan pada Petang Hari",
    "year": 3,
    "level": "Tahun 3",
    "theme": "Cuaca",
    "emoji": "📖✨",
    "description": "Cerita bertema cuaca untuk murid Tahun 3.",
    "targetWords": "70–100 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Hujan pada Petang Hari"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hari Sabtu, saya bersama keluarga dan rakan menyertai aktiviti hujan pada petang hari. Cuaca pada pagi itu cerah dan nyaman. Kami membuat persediaan dengan teratur sebelum memulakan aktiviti. Saya mendengar arahan dengan teliti dan membantu orang di sekeliling saya. Kami bekerjasama dengan gembira sehingga semua tugas selesai. Kawasan itu kelihatan bersih dan indah. Saya berasa gembira kerana mendapat pengalaman baharu yang bermakna.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "lawatan-ke-muzium",
    "title": "Lawatan ke Muzium",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Ilmu",
    "emoji": "📖✨",
    "description": "Cerita bertema ilmu untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Lawatan ke Muzium"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti lawatan ke muzium. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "kempen-kitar-semula",
    "title": "Kempen Kitar Semula",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Alam Sekitar",
    "emoji": "📖✨",
    "description": "Cerita bertema alam sekitar untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Kempen Kitar Semula"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti kempen kitar semula. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "pertandingan-bercerita",
    "title": "Pertandingan Bercerita",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Sekolah",
    "emoji": "📖✨",
    "description": "Cerita bertema sekolah untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Pertandingan Bercerita"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti pertandingan bercerita. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "membantu-mangsa-banjir",
    "title": "Membantu Mangsa Banjir",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Kemasyarakatan",
    "emoji": "📖✨",
    "description": "Cerita bertema kemasyarakatan untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Membantu Mangsa Banjir"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti membantu mangsa banjir. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "berkebun-bersama-ayah",
    "title": "Berkebun Bersama Ayah",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Keluarga",
    "emoji": "📖✨",
    "description": "Cerita bertema keluarga untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Berkebun Bersama Ayah"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti berkebun bersama ayah. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "hari-kantin-sekolah",
    "title": "Hari Kantin Sekolah",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Sekolah",
    "emoji": "📖✨",
    "description": "Cerita bertema sekolah untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Hari Kantin Sekolah"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti hari kantin sekolah. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "perkhemahan-pengakap",
    "title": "Perkhemahan Pengakap",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Kokurikulum",
    "emoji": "📖✨",
    "description": "Cerita bertema kokurikulum untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Perkhemahan Pengakap"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti perkhemahan pengakap. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menjaga-keselamatan-jalan-raya",
    "title": "Menjaga Keselamatan Jalan Raya",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Keselamatan",
    "emoji": "📖✨",
    "description": "Cerita bertema keselamatan untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menjaga Keselamatan Jalan Raya"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti menjaga keselamatan jalan raya. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "lawatan-ke-balai-bomba",
    "title": "Lawatan ke Balai Bomba",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Keselamatan",
    "emoji": "📖✨",
    "description": "Cerita bertema keselamatan untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Lawatan ke Balai Bomba"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti lawatan ke balai bomba. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "pertandingan-bola-sepak",
    "title": "Pertandingan Bola Sepak",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Sukan",
    "emoji": "📖✨",
    "description": "Cerita bertema sukan untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Pertandingan Bola Sepak"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti pertandingan bola sepak. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "membaca-membuka-minda",
    "title": "Membaca Membuka Minda",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Ilmu",
    "emoji": "📖✨",
    "description": "Cerita bertema ilmu untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Membaca Membuka Minda"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti membaca membuka minda. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "sambutan-hari-guru",
    "title": "Sambutan Hari Guru",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Sekolah",
    "emoji": "📖✨",
    "description": "Cerita bertema sekolah untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Sambutan Hari Guru"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti sambutan hari guru. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "membersihkan-pantai",
    "title": "Membersihkan Pantai",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Alam Sekitar",
    "emoji": "📖✨",
    "description": "Cerita bertema alam sekitar untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Membersihkan Pantai"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti membersihkan pantai. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "bercuti-di-kampung",
    "title": "Bercuti di Kampung",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Keluarga",
    "emoji": "📖✨",
    "description": "Cerita bertema keluarga untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Bercuti di Kampung"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti bercuti di kampung. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menyertai-larian-amal",
    "title": "Menyertai Larian Amal",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Kemasyarakatan",
    "emoji": "📖✨",
    "description": "Cerita bertema kemasyarakatan untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menyertai Larian Amal"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti menyertai larian amal. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "membantu-rakan-yang-cedera",
    "title": "Membantu Rakan yang Cedera",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Persahabatan",
    "emoji": "📖✨",
    "description": "Cerita bertema persahabatan untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Membantu Rakan yang Cedera"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti membantu rakan yang cedera. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "pameran-sains-sekolah",
    "title": "Pameran Sains Sekolah",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Sains",
    "emoji": "📖✨",
    "description": "Cerita bertema sains untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Pameran Sains Sekolah"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti pameran sains sekolah. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "berjimat-cermat",
    "title": "Berjimat Cermat",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Nilai Murni",
    "emoji": "📖✨",
    "description": "Cerita bertema nilai murni untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Berjimat Cermat"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti berjimat cermat. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menjaga-kesihatan-diri",
    "title": "Menjaga Kesihatan Diri",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Kesihatan",
    "emoji": "📖✨",
    "description": "Cerita bertema kesihatan untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menjaga Kesihatan Diri"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti menjaga kesihatan diri. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "lawatan-ke-akuarium",
    "title": "Lawatan ke Akuarium",
    "year": 4,
    "level": "Tahun 4",
    "theme": "Haiwan",
    "emoji": "📖✨",
    "description": "Cerita bertema haiwan untuk murid Tahun 4.",
    "targetWords": "90–120 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Lawatan ke Akuarium"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada hujung minggu yang lalu, sekolah saya menganjurkan aktiviti lawatan ke akuarium. Sejak awal pagi, para peserta berkumpul dengan penuh semangat. Guru menerangkan langkah-langkah yang perlu dilakukan supaya aktiviti berjalan dengan lancar dan selamat. Saya dan rakan-rakan membahagikan tugas lalu bekerjasama dengan bersungguh-sungguh. Kami saling membantu apabila menghadapi kesukaran. Selepas beberapa jam, aktiviti itu berjaya diselesaikan. Saya berasa bangga kerana dapat mempelajari perkara baharu serta mengamalkan sikap bertanggungjawab.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "program-cintai-alam",
    "title": "Program Cintai Alam",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Alam Sekitar",
    "emoji": "📖✨",
    "description": "Cerita bertema alam sekitar untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Program Cintai Alam"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai program cintai alam yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "lawatan-sambil-belajar-ke-melaka",
    "title": "Lawatan Sambil Belajar ke Melaka",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Sejarah",
    "emoji": "📖✨",
    "description": "Cerita bertema sejarah untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Lawatan Sambil Belajar ke Melaka"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai lawatan sambil belajar ke melaka yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "pertandingan-pidato",
    "title": "Pertandingan Pidato",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Sekolah",
    "emoji": "📖✨",
    "description": "Cerita bertema sekolah untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Pertandingan Pidato"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai pertandingan pidato yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "kempen-gaya-hidup-sihat",
    "title": "Kempen Gaya Hidup Sihat",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Kesihatan",
    "emoji": "📖✨",
    "description": "Cerita bertema kesihatan untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Kempen Gaya Hidup Sihat"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai kempen gaya hidup sihat yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menjadi-ketua-kelas-yang-bertanggungjawab",
    "title": "Menjadi Ketua Kelas yang Bertanggungjawab",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Kepimpinan",
    "emoji": "📖✨",
    "description": "Cerita bertema kepimpinan untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menjadi Ketua Kelas yang Bertanggungjawab"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai menjadi ketua kelas yang bertanggungjawab yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "hari-keusahawanan-sekolah",
    "title": "Hari Keusahawanan Sekolah",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Keusahawanan",
    "emoji": "📖✨",
    "description": "Cerita bertema keusahawanan untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Hari Keusahawanan Sekolah"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai hari keusahawanan sekolah yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "misi-menyelamatkan-anak-kucing",
    "title": "Misi Menyelamatkan Anak Kucing",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Prihatin",
    "emoji": "📖✨",
    "description": "Cerita bertema prihatin untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Misi Menyelamatkan Anak Kucing"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai misi menyelamatkan anak kucing yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "pengalaman-menaiki-kereta-api",
    "title": "Pengalaman Menaiki Kereta Api",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Pengalaman",
    "emoji": "📖✨",
    "description": "Cerita bertema pengalaman untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Pengalaman Menaiki Kereta Api"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai pengalaman menaiki kereta api yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "gotong-royong-perdana-sekolah",
    "title": "Gotong-royong Perdana Sekolah",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Kemasyarakatan",
    "emoji": "📖✨",
    "description": "Cerita bertema kemasyarakatan untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Gotong-royong Perdana Sekolah"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai gotong-royong perdana sekolah yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "pertandingan-reka-cipta",
    "title": "Pertandingan Reka Cipta",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Sains dan Teknologi",
    "emoji": "📖✨",
    "description": "Cerita bertema sains dan teknologi untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Pertandingan Reka Cipta"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai pertandingan reka cipta yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menghargai-jasa-ibu-bapa",
    "title": "Menghargai Jasa Ibu Bapa",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Keluarga",
    "emoji": "📖✨",
    "description": "Cerita bertema keluarga untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menghargai Jasa Ibu Bapa"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai menghargai jasa ibu bapa yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "berkunjung-ke-pusat-sains",
    "title": "Berkunjung ke Pusat Sains",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Sains",
    "emoji": "📖✨",
    "description": "Cerita bertema sains untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Berkunjung ke Pusat Sains"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai berkunjung ke pusat sains yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menangani-buli-di-sekolah",
    "title": "Menangani Buli di Sekolah",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Sahsiah",
    "emoji": "📖✨",
    "description": "Cerita bertema sahsiah untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menangani Buli di Sekolah"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai menangani buli di sekolah yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "kempen-kurangkan-plastik",
    "title": "Kempen Kurangkan Plastik",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Alam Sekitar",
    "emoji": "📖✨",
    "description": "Cerita bertema alam sekitar untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Kempen Kurangkan Plastik"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai kempen kurangkan plastik yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "menyertai-pertandingan-badminton",
    "title": "Menyertai Pertandingan Badminton",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Sukan",
    "emoji": "📖✨",
    "description": "Cerita bertema sukan untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Menyertai Pertandingan Badminton"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai menyertai pertandingan badminton yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "pengalaman-menjadi-pengacara-majlis",
    "title": "Pengalaman Menjadi Pengacara Majlis",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Keyakinan",
    "emoji": "📖✨",
    "description": "Cerita bertema keyakinan untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Pengalaman Menjadi Pengacara Majlis"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai pengalaman menjadi pengacara majlis yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "bencana-banjir-di-kampung",
    "title": "Bencana Banjir di Kampung",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Kemasyarakatan",
    "emoji": "📖✨",
    "description": "Cerita bertema kemasyarakatan untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Bencana Banjir di Kampung"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai bencana banjir di kampung yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "belajar-mengurus-masa",
    "title": "Belajar Mengurus Masa",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Disiplin",
    "emoji": "📖✨",
    "description": "Cerita bertema disiplin untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Belajar Mengurus Masa"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai belajar mengurus masa yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "persahabatan-yang-bermakna",
    "title": "Persahabatan yang Bermakna",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Persahabatan",
    "emoji": "📖✨",
    "description": "Cerita bertema persahabatan untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Persahabatan yang Bermakna"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai persahabatan yang bermakna yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  },
  {
    "id": "cita-cita-saya",
    "title": "Cita-cita Saya",
    "year": 5,
    "level": "Tahun 5",
    "theme": "Masa Hadapan",
    "emoji": "📖✨",
    "description": "Cerita bertema masa hadapan untuk murid Tahun 5.",
    "targetWords": "110–150 perkataan",
    "pictures": [
      {
        "emoji": "📖",
        "caption": "Cita-cita Saya"
      },
      {
        "emoji": "👧🏻👦🏻",
        "caption": "Murid menjalankan aktiviti bersama-sama."
      },
      {
        "emoji": "✨😊",
        "caption": "Aktiviti selesai dengan gembira."
      }
    ],
    "story": "Pada minggu lalu, saya berpeluang menyertai cita-cita saya yang dianjurkan oleh pihak sekolah. Program itu bertujuan menambah pengetahuan serta membentuk sikap bertanggungjawab dalam kalangan murid. Sebelum aktiviti bermula, guru memberikan penerangan yang jelas tentang tugasan dan aspek keselamatan. Saya dan rakan-rakan bekerjasama, berbincang dan menyelesaikan setiap tugasan dengan tekun. Walaupun kami menghadapi beberapa cabaran, kami tidak mudah berputus asa. Akhirnya, program tersebut berjalan dengan lancar dan mencapai matlamatnya. Pengalaman itu menyedarkan saya bahawa usaha, disiplin dan kerjasama amat penting untuk mencapai kejayaan.",
    "dictionary": {
      "pada": "在 / on",
      "hari": "天 / day",
      "kami": "我们 / we",
      "saya": "我 / I",
      "sekolah": "学校 / school",
      "bersama": "一起 / together",
      "aktiviti": "活动 / activity",
      "gembira": "开心 / happy",
      "membantu": "帮助 / help",
      "menjaga": "照顾 / take care",
      "bersih": "干净 / clean",
      "indah": "美丽 / beautiful",
      "rajin": "勤奋 / diligent",
      "selamat": "安全 / safe",
      "akhirnya": "最后 / finally",
      "pengalaman": "经历 / experience",
      "bermakna": "有意义 / meaningful"
    },
    "grammar": {
      "verb": [
        "menyertai",
        "membantu",
        "menjaga",
        "bekerjasama"
      ],
      "adjective": [
        "cerah",
        "nyaman",
        "bersih",
        "indah",
        "gembira",
        "bermakna"
      ],
      "number": [],
      "noun": [
        "hari",
        "sekolah",
        "aktiviti",
        "pengalaman"
      ]
    },
    "questions": [
      {
        "question": "Apakah nilai penting dalam cerita ini?",
        "answers": [
          "Malas",
          "Kerjasama",
          "Marah",
          "Takut"
        ],
        "correct": 1,
        "explanation": "Watak-watak bekerjasama untuk menyelesaikan aktiviti."
      },
      {
        "question": "Bagaimanakah perasaan penulis pada akhir cerita?",
        "answers": [
          "Gembira",
          "Marah",
          "Takut",
          "Kecewa"
        ],
        "correct": 0,
        "explanation": "Penulis berasa gembira dan memperoleh pengalaman bermakna."
      }
    ],
    "writingGuide": [
      "Bilakah aktiviti berlaku?",
      "Siapakah yang terlibat?",
      "Apakah persediaan yang dibuat?",
      "Apakah aktiviti yang dilakukan?",
      "Apakah nilai yang dipelajari?",
      "Bagaimanakah perasaan kamu?"
    ],
    "usefulWords": [
      "Pada minggu lalu",
      "Selepas itu",
      "Selain itu",
      "bekerjasama",
      "bertanggungjawab",
      "Akhirnya",
      "pengalaman bermakna"
    ]
  }
];
KARANGAN_STORIES.push(...KARANGAN_PHASE1_EXTRA_STORIES);
console.log("✅ Phase 1 story expansion loaded:", KARANGAN_STORIES.length, "stories");

