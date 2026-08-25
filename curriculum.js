/* =========================================================
   KARANGAN AI — CURRICULUM ENGINE
   Production Curriculum Database v1
   Tahun 1–6

   Source:
   /data/vocabulary.json
   /data/ayat-cantik.json
   /data/curriculum-index.json
   /data/manifest.json

   IMPORTANT:
   Existing curriculum IDs must never be renumbered.
   ========================================================= */

(function () {
  "use strict";

  const CurriculumDB = {
    version: "1.0.0",

    vocabulary: [],
    ayatCantik: [],
    index: null,
    manifest: null,

    vocabularyMap: new Map(),
    ayatMap: new Map(),

    ready: false,
    loading: false,
    error: null,
    _initPromise: null,

    /* =====================================================
       INITIALISE DATABASE
       ===================================================== */

    async init() {
      if (this.ready) {
        return this;
      }

      if (this._initPromise) {
        return this._initPromise;
      }

      this.loading = true;
      this.error = null;

      this._initPromise = (async () => {
        try {
          const [
            vocabularyResponse,
            ayatResponse,
            indexResponse,
            manifestResponse
          ] = await Promise.all([
            fetch("./data/vocabulary.json", {
              cache: "no-store"
            }),

            fetch("./data/ayat-cantik.json", {
              cache: "no-store"
            }),

            fetch("./data/curriculum-index.json", {
              cache: "no-store"
            }),

            fetch("./data/manifest.json", {
              cache: "no-store"
            })
          ]);

          const responses = [
            ["vocabulary.json", vocabularyResponse],
            ["ayat-cantik.json", ayatResponse],
            ["curriculum-index.json", indexResponse],
            ["manifest.json", manifestResponse]
          ];

          for (const [fileName, response] of responses) {
            if (!response.ok) {
              throw new Error(
                `${fileName} gagal dimuatkan (${response.status})`
              );
            }
          }

          const [
            vocabulary,
            ayatCantik,
            index,
            manifest
          ] = await Promise.all([
            vocabularyResponse.json(),
            ayatResponse.json(),
            indexResponse.json(),
            manifestResponse.json()
          ]);

          if (!Array.isArray(vocabulary)) {
            throw new Error(
              "Format vocabulary.json tidak sah."
            );
          }

          if (!Array.isArray(ayatCantik)) {
            throw new Error(
              "Format ayat-cantik.json tidak sah."
            );
          }

          if (!index || typeof index !== "object") {
            throw new Error(
              "Format curriculum-index.json tidak sah."
            );
          }

          this.vocabulary = vocabulary;
          this.ayatCantik = ayatCantik;
          this.index = index;
          this.manifest = manifest;

          this.buildMaps();

          this.ready = true;
          this.loading = false;

          console.log(
            "%cKarangan AI Curriculum Engine READY",
            "font-weight:bold;color:#16a34a;"
          );

          console.log(
            `Vocabulary: ${this.vocabulary.length}`
          );

          console.log(
            `Ayat Cantik: ${this.ayatCantik.length}`
          );

          window.dispatchEvent(
            new CustomEvent("karangan:curriculum-ready", {
              detail: {
                vocabulary:
                  this.vocabulary.length,

                ayatCantik:
                  this.ayatCantik.length,

                version:
                  this.version
              }
            })
          );

          return this;

        } catch (error) {
          this.ready = false;
          this.loading = false;
          this.error = error;

          console.error(
            "Karangan AI Curriculum Engine gagal:",
            error
          );

          window.dispatchEvent(
            new CustomEvent("karangan:curriculum-error", {
              detail: {
                message:
                  error?.message ||
                  "Curriculum database gagal dimuatkan."
              }
            })
          );

          throw error;
        }
      })();

      return this._initPromise;
    },

    /* =====================================================
       INTERNAL MAPS
       ===================================================== */

    buildMaps() {
      this.vocabularyMap.clear();
      this.ayatMap.clear();

      for (const item of this.vocabulary) {
        if (item?.id) {
          this.vocabularyMap.set(
            String(item.id),
            item
          );
        }
      }

      for (const item of this.ayatCantik) {
        if (item?.id) {
          this.ayatMap.set(
            String(item.id),
            item
          );
        }
      }
    },

    /* =====================================================
       STATUS
       ===================================================== */

    isReady() {
      return this.ready;
    },

    getStatus() {
      return {
        ready: this.ready,
        loading: this.loading,

        vocabulary:
          this.vocabulary.length,

        ayatCantik:
          this.ayatCantik.length,

        version:
          this.version,

        error:
          this.error
            ? this.error.message
            : null
      };
    },

    /* =====================================================
       YEAR
       ===================================================== */

    normalizeYear(year) {
      const number = Number(year);

      if (
        !Number.isInteger(number) ||
        number < 1 ||
        number > 6
      ) {
        return null;
      }

      return number;
    },

    getVocabularyByYear(year) {
      const target =
        this.normalizeYear(year);

      if (!target) {
        return [];
      }

      return this.vocabulary.filter(
        item =>
          Number(item.year) === target
      );
    },

    getAyatByYear(year) {
      const target =
        this.normalizeYear(year);

      if (!target) {
        return [];
      }

      return this.ayatCantik.filter(
        item =>
          Number(item.year) === target
      );
    },

    getYearData(year) {
      const target =
        this.normalizeYear(year);

      if (!target) {
        return {
          year: null,
          vocabulary: [],
          ayatCantik: []
        };
      }

      return {
        year: target,

        vocabulary:
          this.getVocabularyByYear(target),

        ayatCantik:
          this.getAyatByYear(target)
      };
    },

    /* =====================================================
       LOOKUP BY ID
       ===================================================== */

    getVocabularyById(id) {
      if (!id) {
        return null;
      }

      return (
        this.vocabularyMap.get(
          String(id)
        ) || null
      );
    },

    getAyatById(id) {
      if (!id) {
        return null;
      }

      return (
        this.ayatMap.get(
          String(id)
        ) || null
      );
    },

    getItemById(id) {
      return (
        this.getVocabularyById(id) ||
        this.getAyatById(id) ||
        null
      );
    },

    /* =====================================================
       TAXONOMY
       ===================================================== */

    getTaxonomies(year = null) {
      let items =
        year === null
          ? this.vocabulary
          : this.getVocabularyByYear(year);

      return [
        ...new Set(
          items
            .map(item => item.taxonomy)
            .filter(Boolean)
        )
      ].sort((a, b) =>
        a.localeCompare(b, "ms")
      );
    },

    getVocabularyByTaxonomy(
      taxonomy,
      year = null
    ) {
      if (!taxonomy) {
        return [];
      }

      let items =
        year === null
          ? this.vocabulary
          : this.getVocabularyByYear(year);

      return items.filter(
        item =>
          item.taxonomy === taxonomy
      );
    },

    /* =====================================================
       ORIGINAL CATEGORY
       ===================================================== */

    getCategories(year = null) {
      let items =
        year === null
          ? this.vocabulary
          : this.getVocabularyByYear(year);

      return [
        ...new Set(
          items
            .map(item => item.category)
            .filter(Boolean)
        )
      ].sort((a, b) =>
        a.localeCompare(b, "ms")
      );
    },

    getVocabularyByCategory(
      category,
      year = null
    ) {
      if (!category) {
        return [];
      }

      let items =
        year === null
          ? this.vocabulary
          : this.getVocabularyByYear(year);

      return items.filter(
        item =>
          item.category === category
      );
    },

    /* =====================================================
       AYAT CANTIK FUNCTIONS
       ===================================================== */

    getAyatFunctions(year = null) {
      let items =
        year === null
          ? this.ayatCantik
          : this.getAyatByYear(year);

      return [
        ...new Set(
          items
            .map(item => item.function)
            .filter(Boolean)
        )
      ].sort((a, b) =>
        a.localeCompare(b, "ms")
      );
    },

    getAyatByFunction(
      functionName,
      year = null
    ) {
      if (!functionName) {
        return [];
      }

      let items =
        year === null
          ? this.ayatCantik
          : this.getAyatByYear(year);

      return items.filter(
        item =>
          item.function === functionName
      );
    },

    /* =====================================================
       SEARCH
       ===================================================== */

    searchVocabulary(
      query,
      options = {}
    ) {
      const keyword =
        String(query || "")
          .trim()
          .toLowerCase();

      if (!keyword) {
        return [];
      }

      let items =
        options.year
          ? this.getVocabularyByYear(
              options.year
            )
          : this.vocabulary;

      if (options.taxonomy) {
        items = items.filter(
          item =>
            item.taxonomy ===
            options.taxonomy
        );
      }

      if (options.category) {
        items = items.filter(
          item =>
            item.category ===
            options.category
        );
      }

      return items.filter(item => {
        const searchable = [
          item.bm,
          item.zh,
          item.en,
          item.meaningBm,
          item.example,
          item.writingUse,
          item.category,
          item.taxonomy
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(
          keyword
        );
      });
    },

    searchAyat(
      query,
      options = {}
    ) {
      const keyword =
        String(query || "")
          .trim()
          .toLowerCase();

      if (!keyword) {
        return [];
      }

      let items =
        options.year
          ? this.getAyatByYear(
              options.year
            )
          : this.ayatCantik;

      if (options.function) {
        items = items.filter(
          item =>
            item.function ===
            options.function
        );
      }

      return items.filter(item => {
        const searchable = [
          item.text,
          item.function,
          item.purpose
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();

        return searchable.includes(
          keyword
        );
      });
    },

    /* =====================================================
       RANDOM LEARNING
       ===================================================== */

    shuffle(array) {
      const result = [...array];

      for (
        let i = result.length - 1;
        i > 0;
        i--
      ) {
        const j =
          Math.floor(
            Math.random() * (i + 1)
          );

        [
          result[i],
          result[j]
        ] = [
          result[j],
          result[i]
        ];
      }

      return result;
    },

    randomVocabulary(
      year,
      count = 1
    ) {
      const items =
        this.getVocabularyByYear(year);

      const amount =
        Math.max(
          1,
          Math.min(
            Number(count) || 1,
            items.length
          )
        );

      return this
        .shuffle(items)
        .slice(0, amount);
    },

    randomAyat(
      year,
      count = 1
    ) {
      const items =
        this.getAyatByYear(year);

      const amount =
        Math.max(
          1,
          Math.min(
            Number(count) || 1,
            items.length
          )
        );

      return this
        .shuffle(items)
        .slice(0, amount);
    },

    /* =====================================================
       QUIZ HELPERS
       ===================================================== */

    createVocabularyQuiz(
      year,
      count = 10
    ) {
      return this
        .randomVocabulary(
          year,
          count
        )
        .map(item => ({
          id: item.id,
          year: item.year,

          question:
            item.bm,

          answer:
            item.meaningBm,

          chinese:
            item.zh,

          english:
            item.en,

          example:
            item.example,

          taxonomy:
            item.taxonomy,

          category:
            item.category
        }));
    },

    /* =====================================================
       STATS
       ===================================================== */

    getStats() {
      const years = {};

      for (
        let year = 1;
        year <= 6;
        year++
      ) {
        years[year] = {
          vocabulary:
            this
              .getVocabularyByYear(year)
              .length,

          ayatCantik:
            this
              .getAyatByYear(year)
              .length,

          categories:
            this
              .getCategories(year)
              .length,

          taxonomies:
            this
              .getTaxonomies(year)
              .length,

          ayatFunctions:
            this
              .getAyatFunctions(year)
              .length
        };
      }

      return {
        version:
          this.version,

        ready:
          this.ready,

        totalVocabulary:
          this.vocabulary.length,

        totalAyatCantik:
          this.ayatCantik.length,

        years
      };
    }
  };

  /* =======================================================
     GLOBAL ACCESS
     ======================================================= */

  window.CurriculumDB =
    CurriculumDB;

  window.KaranganCurriculum =
    CurriculumDB;

  console.log(
    "Karangan AI Curriculum Engine loaded."
  );

})();
