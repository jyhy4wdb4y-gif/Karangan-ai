/* =====================================================
   KARANGAN AI — FULL VERSION V1
   MAIN APP LOGIC
===================================================== */


/* =====================================================
   APP STATE
===================================================== */

let currentPageIndex = 0;
let currentPictureIndex = 0;
let currentGrammarFilter = "";
let currentQuizAnswered = {};
let currentQuizCorrectCount = 0;


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function openPage(index) {

  const pages =
    document.querySelectorAll(".page");

  const buttons =
    document.querySelectorAll(".nav-button");

  if (!pages[index]) return;

  pages.forEach(page =>
    page.classList.remove("active")
  );

  buttons.forEach(button =>
    button.classList.remove("active")
  );

  pages[index].classList.add("active");

  if (buttons[index]) {
    buttons[index].classList.add("active");
  }

  currentPageIndex = index;

  updateProgressBar();

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


/* =====================================================
   PROGRESS BAR
===================================================== */

function updateProgressBar() {

  const progress =
    document.getElementById("progressFill");

  const label =
    document.getElementById("progressLabel");

  if (!progress) return;

  const totalPages =
    document.querySelectorAll(".page").length;

  const percentage =
    Math.round(
      ((currentPageIndex + 1) / totalPages)
      * 100
    );

  progress.style.width =
    percentage + "%";

  if (label) {
    label.textContent =
      percentage + "%";
  }

}


/* =====================================================
   HOME DASHBOARD
===================================================== */

function renderDashboard() {

  const progress =
    getStudentProgress();

  const lessons =
    getAllStories();

  const completed =
    progress.completedLessons.length;

  const lessonCount =
    document.getElementById("statLessons");

  const starCount =
    document.getElementById("statStars");

  const essayCount =
    document.getElementById("statEssays");

  if (lessonCount) {
    lessonCount.textContent =
      completed;
  }

  if (starCount) {
    starCount.textContent =
      progress.totalStars;
  }

  if (essayCount) {
    essayCount.textContent =
      progress.essaysWritten;
  }


  const welcome =
    document.getElementById(
      "welcomeProgress"
    );

  if (welcome) {

    welcome.textContent =
      completed +
      " daripada " +
      lessons.length +
      " pelajaran telah selesai.";

  }

}


/* =====================================================
   STORY LIBRARY
===================================================== */

function renderStoryLibrary() {

  const container =
    document.getElementById(
      "storyLibrary"
    );

  if (!container) return;

  const stories =
    getAllStories();

  const progress =
    getStudentProgress();

  container.innerHTML =
    stories.map(story => {

      const completed =
        progress.completedLessons
          .includes(story.id);

      return `
        <article
          class="story-card"
          onclick="selectStory('${story.id}')"
        >

          <div class="story-image">
            ${story.emoji}
          </div>

          <div class="story-content">

            <span class="story-level">
              ${story.level}
            </span>

            <h3>
              ${story.title}
              ${completed ? " ✅" : ""}
            </h3>

            <p>
              ${story.description}
            </p>

          </div>

        </article>
      `;

    }).join("");

}


/* =====================================================
   SELECT LESSON
===================================================== */

function selectStory(id) {

  const success =
    setCurrentStory(id);

  if (!success) return;

  currentPictureIndex = 0;
  currentQuizAnswered = {};
  currentQuizCorrectCount = 0;
  currentGrammarFilter = "";

  renderCurrentLesson();

  openPage(2);

}


/* =====================================================
   RENDER CURRENT LESSON
===================================================== */

function renderCurrentLesson() {

  const story =
    getCurrentStory();

  renderLessonHeader(story);
  renderPictureStory(story);
  renderStoryText(story);
  renderGrammarStory(story);
  renderQuiz(story);
  renderWritingSection(story);

}


/* =====================================================
   LESSON HEADER
===================================================== */

function renderLessonHeader(story) {

  const title =
    document.getElementById(
      "lessonTitle"
    );

  const theme =
    document.getElementById(
      "lessonTheme"
    );

  const level =
    document.getElementById(
      "lessonLevel"
    );

  if (title) {
    title.textContent =
      story.title;
  }

  if (theme) {
    theme.textContent =
      story.theme;
  }

  if (level) {
    level.textContent =
      story.level;
  }

}


/* =====================================================
   PICTURE STORY
===================================================== */

function renderPictureStory(story) {

  const picture =
    story.pictures[
      currentPictureIndex
    ];

  if (!picture) return;


  const stage =
    document.getElementById(
      "pictureStage"
    );

  const number =
    document.getElementById(
      "pictureNumber"
    );

  const caption =
    document.getElementById(
      "pictureCaption"
    );

  const previous =
    document.getElementById(
      "previousPicture"
    );

  const next =
    document.getElementById(
      "nextPicture"
    );


  if (stage) {
    stage.innerHTML =
      `<span>${picture.emoji}</span>`;
  }


  if (number) {

    number.textContent =
      "Gambar " +
      (currentPictureIndex + 1) +
      " / " +
      story.pictures.length;

  }


  if (caption) {
    caption.textContent =
      picture.caption;
  }


  if (previous) {
    previous.disabled =
      currentPictureIndex === 0;
  }


  if (next) {

    next.disabled =
      currentPictureIndex ===
      story.pictures.length - 1;

  }

}


/* =====================================================
   PREVIOUS / NEXT PICTURE
===================================================== */

function previousPicture() {

  const story =
    getCurrentStory();

  if (currentPictureIndex > 0) {

    currentPictureIndex -= 1;

    renderPictureStory(story);

  }

}


function nextPicture() {

  const story =
    getCurrentStory();

  if (
    currentPictureIndex <
    story.pictures.length - 1
  ) {

    currentPictureIndex += 1;

    renderPictureStory(story);

  }

}


/* =====================================================
   WORD CLICKABLE STORY
===================================================== */

function buildClickableStory(
  story,
  grammarMode = false
) {

  const parts =
    story.story.split(/(\s+)/);

  return parts.map(part => {

    if (/^\s+$/.test(part)) {
      return part;
    }


    const clean =
      normalizeMalayWord(part);

    const grammarType =
      getGrammarType(clean);


    const classes = [
      "word"
    ];


    if (grammarType) {
      classes.push(grammarType);
    }


    if (
      grammarMode &&
      currentGrammarFilter &&
      grammarType ===
        currentGrammarFilter
    ) {

      classes.push("highlight");

    }


    const safeWord =
      clean.replace(
        /'/g,
        "\\'"
      );


    return `
      <span
        class="${classes.join(" ")}"
        onclick="translateWord('${safeWord}', this)"
      >${part}</span>
    `;

  }).join("");

}


/* =====================================================
   RENDER STORY TEXT
===================================================== */

function renderStoryText(story) {

  const container =
    document.getElementById(
      "storyText"
    );

  if (!container) return;

  container.innerHTML =
    buildClickableStory(
      story,
      false
    );

}


/* =====================================================
   WORD TRANSLATION
===================================================== */

function translateWord(
  word,
  element
) {

  const clean =
    normalizeMalayWord(word);

  const meaning =
    getTranslation(clean);


  document
    .querySelectorAll(
      ".word.selected"
    )
    .forEach(item =>
      item.classList.remove(
        "selected"
      )
    );


  if (element) {
    element.classList.add(
      "selected"
    );
  }


  const popup =
    document.getElementById(
      "translationPopup"
    );

  const wordLabel =
    document.getElementById(
      "translationWord"
    );

  const chinese =
    document.getElementById(
      "translationChinese"
    );

  const example =
    document.getElementById(
      "translationExample"
    );


  if (!popup) return;


  if (wordLabel) {
    wordLabel.textContent =
      clean;
  }


  if (chinese) {

    chinese.textContent =
      meaning
        ? "中文：" + meaning
        : "中文：暂无内置翻译";

  }


  if (example) {

    if (meaning) {

      example.textContent =
        "Tekan perkataan lain untuk melihat maksudnya.";

    } else {

      example.textContent =
        "Perkataan ini belum dimasukkan ke dalam kamus pelajaran ini.";

    }

  }


  popup.classList.add("show");

}


/* =====================================================
   TEXT TO SPEECH
===================================================== */

function readCurrentStory() {

  const story =
    getCurrentStory();

  if (
    !("speechSynthesis" in window)
  ) {

    alert(
      "Peranti ini tidak menyokong fungsi bacaan."
    );

    return;

  }


  speechSynthesis.cancel();


  const speech =
    new SpeechSynthesisUtterance(
      story.story
    );


  speech.lang = "ms-MY";

  speech.rate = 0.85;

  speech.pitch = 1;


  const voices =
    speechSynthesis.getVoices();


  const malayVoice =
    voices.find(voice =>
      voice.lang &&
      voice.lang
        .toLowerCase()
        .startsWith("ms")
    );


  if (malayVoice) {
    speech.voice =
      malayVoice;
  }


  speechSynthesis.speak(
    speech
  );

}


function stopReading() {

  if (
    "speechSynthesis" in window
  ) {

    speechSynthesis.cancel();

  }

}


/* =====================================================
   GRAMMAR STORY
===================================================== */

function renderGrammarStory(story) {

  const container =
    document.getElementById(
      "grammarStory"
    );

  if (!container) return;


  container.innerHTML =
    buildClickableStory(
      story,
      true
    );

}


/* =====================================================
   GRAMMAR FILTER
===================================================== */

function highlightGrammar(type) {

  currentGrammarFilter =
    type;

  renderGrammarStory(
    getCurrentStory()
  );

}


function clearGrammarHighlight() {

  currentGrammarFilter = "";

  renderGrammarStory(
    getCurrentStory()
  );

}


/* =====================================================
   QUIZ
===================================================== */

function renderQuiz(story) {

  const container =
    document.getElementById(
      "quizContainer"
    );

  if (!container) return;


  currentQuizAnswered = {};
  currentQuizCorrectCount = 0;


  container.innerHTML =
    story.questions.map(
      (question, questionIndex) => {

        const answers =
          question.answers.map(
            (answer, answerIndex) => {

              return `
                <button
                  class="answer-button"
                  onclick="
                    answerQuiz(
                      ${questionIndex},
                      ${answerIndex},
                      this
                    )
                  "
                >
                  ${answer}
                </button>
              `;

            }
          ).join("");


        return `
          <div class="card question-card">

            <div class="question-number">
              Soalan ${questionIndex + 1}
            </div>

            <div class="question">
              ${question.question}
            </div>

            <div
              class="answers"
              id="answers-${questionIndex}"
            >

              ${answers}

            </div>

            <div
              class="quiz-feedback"
              id="feedback-${questionIndex}"
            ></div>

          </div>
        `;

      }
    ).join("");

}


/* =====================================================
   ANSWER QUIZ
===================================================== */

function answerQuiz(
  questionIndex,
  answerIndex,
  button
) {

  if (
    currentQuizAnswered[
      questionIndex
    ]
  ) {

    return;

  }


  const story =
    getCurrentStory();


  const question =
    story.questions[
      questionIndex
    ];


  if (!question) return;


  currentQuizAnswered[
    questionIndex
  ] = true;


  const buttons =
    document.querySelectorAll(
      `#answers-${questionIndex}
      .answer-button`
    );


  buttons.forEach(
    answerButton => {

      answerButton.disabled =
        true;

    }
  );


  const feedback =
    document.getElementById(
      "feedback-" +
      questionIndex
    );


  if (
    answerIndex ===
    question.correct
  ) {

    button.classList.add(
      "correct"
    );


    currentQuizCorrectCount += 1;

    addQuizCorrect();


    if (feedback) {

      feedback.innerHTML =
        "✅ Betul! " +
        question.explanation;

    }

  } else {

    button.classList.add(
      "wrong"
    );


    const correctButton =
      buttons[
        question.correct
      ];


    if (correctButton) {

      correctButton
        .classList.add(
          "correct"
        );

    }


    if (feedback) {

      feedback.innerHTML =
        "❌ Belum tepat. " +
        question.explanation;

    }

  }


  checkQuizCompletion();

}


/* =====================================================
   QUIZ COMPLETION
===================================================== */

function checkQuizCompletion() {

  const story =
    getCurrentStory();


  const answered =
    Object.keys(
      currentQuizAnswered
    ).length;


  if (
    answered !==
    story.questions.length
  ) {

    return;

  }


  const result =
    document.getElementById(
      "quizFinalResult"
    );


  if (!result) return;


  const total =
    story.questions.length;


  const percentage =
    Math.round(
      (
        currentQuizCorrectCount
        / total
      )
      * 100
    );


  let message = "";


  if (percentage === 100) {

    message =
      "🌟 Hebat! Semua jawapan betul!";

  } else if (
    percentage >= 70
  ) {

    message =
      "👏 Bagus! Teruskan usaha.";

  } else {

    message =
      "💪 Cuba baca cerita sekali lagi dan cuba pelajaran seterusnya.";

  }


  result.innerHTML =
    `<strong>
      ${currentQuizCorrectCount}/${total}
      betul (${percentage}%)
    </strong><br>${message}`;

}


/* =====================================================
   WRITING SECTION
===================================================== */

function renderWritingSection(story) {

  const guide =
    document.getElementById(
      "writingGuide"
    );

  const useful =
    document.getElementById(
      "usefulWords"
    );

  const title =
    document.getElementById(
      "writingTitle"
    );

  const target =
    document.getElementById(
      "writingTarget"
    );

  const essay =
    document.getElementById(
      "essay"
    );

  const feedback =
    document.getElementById(
      "aiFeedback"
    );


  if (title) {

    title.textContent =
      "Karangan: " +
      story.title;

  }


  if (target) {

    target.textContent =
      "Sasaran: " +
      story.targetWords;

  }


  if (guide) {

    guide.innerHTML =
      story.writingGuide.map(
        (item, index) =>
          `
            <div>
              ${index + 1}. ${item}
            </div>
          `
      ).join("");

  }


  if (useful) {

    useful.innerHTML =
      story.usefulWords.map(
        word =>
          `
            <span
              class="legend-item"
              style="
                background:#eef2ff;
                color:#4f46e5;
              "
            >
              ${word}
            </span>
          `
      ).join("");

  }


  if (essay) {

    const saved =
      getSavedEssay(
        story.id
      );

    essay.value =
      saved || "";

    updateWordCount();

  }


  if (feedback) {

    feedback.classList.remove(
      "show"
    );

    feedback.innerHTML = "";

  }

}


/* =====================================================
   WORD COUNT
===================================================== */

function updateWordCount() {

  const essay =
    document.getElementById(
      "essay"
    );


  const counter =
    document.getElementById(
      "wordCount"
    );


  if (!essay || !counter) {
    return;
  }


  const text =
    essay.value.trim();


  const words =
    text
      ? text.split(/\s+/).length
      : 0;


  counter.textContent =
    words + " perkataan";


  saveCurrentEssay();

}


/* =====================================================
   SAVE ESSAY LOCALLY
===================================================== */

function getEssayStorageKey(
  storyId
) {

  return (
    "karanganEssay_" +
    storyId
  );

}


function getSavedEssay(
  storyId
) {

  try {

    return (
      localStorage.getItem(
        getEssayStorageKey(
          storyId
        )
      ) || ""
    );

  } catch (error) {

    return "";

  }

}


function saveCurrentEssay() {

  const essay =
    document.getElementById(
      "essay"
    );

  if (!essay) return;


  const story =
    getCurrentStory();


  try {

    localStorage.setItem(
      getEssayStorageKey(
        story.id
      ),
      essay.value
    );

  } catch (error) {

    console.warn(
      "Unable to save essay."
    );

  }

}


/* =====================================================
   CLEAR ESSAY
===================================================== */

function clearEssay() {

  const essay =
    document.getElementById(
      "essay"
    );

  const feedback =
    document.getElementById(
      "aiFeedback"
    );


  if (!essay) return;


  const confirmDelete =
    confirm(
      "Padam karangan ini?"
    );


  if (!confirmDelete) {
    return;
  }


  essay.value = "";

  saveCurrentEssay();

  updateWordCount();


  if (feedback) {

    feedback.classList.remove(
      "show"
    );

    feedback.innerHTML = "";

  }

}


/* =====================================================
   AI ESSAY CHECK
===================================================== */

async function checkEssay() {

  const essay =
    document.getElementById(
      "essay"
    );


  const feedback =
    document.getElementById(
      "aiFeedback"
    );


  const button =
    document.getElementById(
      "aiCheckButton"
    );


  if (
    !essay ||
    !feedback
  ) {

    return;

  }


  const text =
    essay.value.trim();


  const wordCount =
    text
      ? text.split(/\s+/).length
      : 0;


  if (wordCount < 20) {

    feedback.innerHTML =
      `
        ✏️ Tulis sekurang-kurangnya
        20 perkataan sebelum meminta
        AI menyemak karangan.
      `;

    feedback.classList.add(
      "show"
    );

    return;

  }


  saveCurrentEssay();


  if (button) {

    button.classList.add(
      "loading"
    );

    button.textContent =
      "⏳ AI sedang menyemak...";

  }


  feedback.innerHTML =
    "AI sedang membaca karangan kamu...";

  feedback.classList.add(
    "show"
  );


  const story =
    getCurrentStory();


  try {

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
            JSON.stringify({

              essay: text,

              title:
                story.title,

              level:
                story.level,

              targetWords:
                story.targetWords,

              guide:
                story.writingGuide

            })

        }
      );


    if (!response.ok) {

      throw new Error(
        "AI API unavailable"
      );

    }


    const data =
      await response.json();


    const result =
      data.feedback ||
      data.result ||
      data.message ||
      data.text;


    if (!result) {

      throw new Error(
        "Empty AI response"
      );

    }


    renderAIFeedback(
      result
    );


    addEssayWritten();


  } catch (error) {

    renderOfflineFeedback(
      text,
      story
    );

  } finally {

    if (button) {

      button.classList.remove(
        "loading"
      );

      button.textContent =
        "✨ Semak dengan AI";

    }

    renderDashboard();

  }

}


/* =====================================================
   RENDER AI FEEDBACK
===================================================== */

function renderAIFeedback(
  text
) {

  const feedback =
    document.getElementById(
      "aiFeedback"
    );

  if (!feedback) return;


  feedback.innerHTML =
    `
      <div class="ai-score">
        ✨ Semakan AI
      </div>

      ${escapeHTML(text)
        .replace(
          /\n/g,
          "<br>"
        )
      }
    `;


  feedback.classList.add(
    "show"
  );

}


/* =====================================================
   OFFLINE FEEDBACK
===================================================== */

function renderOfflineFeedback(
  essay,
  story
) {

  const feedback =
    document.getElementById(
      "aiFeedback"
    );

  if (!feedback) return;


  const lower =
    essay.toLowerCase();


  const words =
    essay.split(/\s+/).length;


  let score = 55;


  if (words >= 50) {
    score += 8;
  }


  if (words >= 80) {
    score += 8;
  }


  if (
    lower.includes(
      "selepas"
    ) ||
    lower.includes(
      "kemudian"
    ) ||
    lower.includes(
      "seterusnya"
    )
  ) {

    score += 6;

  }


  if (
    lower.includes(
      "selain itu"
    )
  ) {

    score += 5;

  }


  if (
    lower.includes(
      "akhir sekali"
    ) ||
    lower.includes(
      "akhirnya"
    )
  ) {

    score += 5;

  }


  if (
    lower.includes(
      "gembira"
    ) ||
    lower.includes(
      "bangga"
    )
  ) {

    score += 5;

  }


  if (score > 92) {
    score = 92;
  }


  const targetStatus =
    getTargetStatus(
      story.targetWords,
      words
    );


  feedback.innerHTML =
    `
      <div class="ai-score">
        ⭐ ${score}/100
      </div>

      <div class="feedback-section">

        <div class="feedback-title">
          📝 Bilangan perkataan
        </div>

        ${words} perkataan.
        ${targetStatus}

      </div>

      <div class="feedback-section">

        <div class="feedback-title">
          👍 Kekuatan
        </div>

        Kamu telah cuba menulis berdasarkan
        tema cerita dan menggunakan ayat
        Bahasa Melayu yang lengkap.

      </div>

      <div class="feedback-section">

        <div class="feedback-title">
          🔧 Boleh diperbaiki
        </div>

        Gunakan lebih banyak penanda wacana
        seperti “Kemudian”, “Seterusnya”,
        “Selain itu” dan “Akhir sekali”.

      </div>

      <div class="feedback-section">

        <div class="feedback-title">
          💡 Cadangan
        </div>

        Cuba tambahkan penerangan tentang
        perasaan, suasana dan nilai murni
        supaya karangan lebih menarik.

      </div>

      <div class="feedback-section"
           style="
             font-size:12px;
             color:#64748b;
           ">

        Mod semakan asas digunakan kerana
        sambungan AI tidak tersedia.

      </div>
    `;


  feedback.classList.add(
    "show"
  );


  addEssayWritten();

}


/* =====================================================
   TARGET WORD HELP
===================================================== */

function getTargetStatus(
  target,
  wordCount
) {

  const numbers =
    String(target)
      .match(/\d+/g);


  if (!numbers ||
      numbers.length < 2) {

    return "";

  }


  const min =
    Number(numbers[0]);

  const max =
    Number(numbers[1]);


  if (wordCount < min) {

    return (
      "Cuba tambah " +
      (min - wordCount) +
      " perkataan lagi."
    );

  }


  if (wordCount > max) {

    return (
      "Karangan melebihi sasaran sebanyak " +
      (wordCount - max) +
      " perkataan."
    );

  }


  return "✅ Panjang karangan sesuai.";

}


/* =====================================================
   COMPLETE CURRENT LESSON
===================================================== */

function finishLesson() {

  const story =
    getCurrentStory();


  const progress =
    completeLesson(
      story.id
    );


  renderDashboard();
  renderStoryLibrary();


  alert(
    "🎉 Tahniah! Pelajaran selesai. Kamu mendapat 3 ⭐"
  );


  openPage(0);

}


/* =====================================================
   ESCAPE HTML
===================================================== */

function escapeHTML(text) {

  const div =
    document.createElement(
      "div"
    );

  div.textContent =
    String(text || "");

  return div.innerHTML;

}


/* =====================================================
   INITIALISE APP
===================================================== */

function initialiseKaranganAI() {

  renderDashboard();

  renderStoryLibrary();

  renderCurrentLesson();

  updateProgressBar();

}


/* =====================================================
   DOM READY
===================================================== */

document.addEventListener(
  "DOMContentLoaded",
  initialiseKaranganAI
);
