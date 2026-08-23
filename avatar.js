// ======================================
// Karangan AI - Avatar Tutor
// ======================================

const AvatarTutor = {
  name: "Cikgu Aira",
  mood: "happy",

  messages: {
    welcome: "Hai! Saya Cikgu Aira 👋 Saya akan belajar Bahasa Melayu bersama kamu hari ini!",
    story: "Mari kita baca cerita ini bersama-sama. Tekan mana-mana perkataan jika kamu mahu melihat terjemahannya.",
    grammar: "Hebat! Sekarang mari kita cari kata kerja, kata adjektif dan kata bilangan dalam cerita.",
    game: "Masa untuk bermain! Cuba jawab soalan ini dan kumpulkan bintang ⭐",
    writing: "Sekarang giliran kamu menulis. Jangan risau, Cikgu Aira akan membantu kamu.",
    success: "Tahniah! Jawapan kamu betul! 🌟",
    retry: "Hampir betul. Cuba sekali lagi, kamu boleh!",
    excellent: "Hebat sekali! Karangan kamu semakin baik! 🏆"
  },

  speak(message) {
    const speech = new SpeechSynthesisUtterance(message);
    speech.lang = "ms-MY";
    speech.rate = 0.9;
    speech.pitch = 1.05;

    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
  },

  show(message, mood = "happy") {
    this.mood = mood;

    let tutor = document.getElementById("aiTutor");

    if (!tutor) {
      tutor = document.createElement("div");
      tutor.id = "aiTutor";
      tutor.className = "ai-tutor";

      tutor.innerHTML = `
        <div class="avatar-character">
          <div class="avatar-face">
  <img
    src="cikgu-aira.png"
    alt="Cikgu Aira"
    class="avatar-image"
  >
</div>
          <div class="avatar-status"></div>
        </div>

        <div class="avatar-dialog">
          <div class="avatar-name">${this.name}</div>
          <div id="avatarMessage" class="avatar-message"></div>

          <div class="avatar-actions">
            <button id="avatarSpeakBtn" class="avatar-btn">
              🔊 Dengar
            </button>

            <button id="avatarCloseBtn" class="avatar-btn secondary">
              ✕
            </button>
          </div>
        </div>
      `;

      document.body.appendChild(tutor);

      document
        .getElementById("avatarSpeakBtn")
        .addEventListener("click", () => {
          const text =
            document.getElementById("avatarMessage").textContent;

          this.speak(text);
        });

      document
        .getElementById("avatarCloseBtn")
        .addEventListener("click", () => {
          tutor.classList.remove("show");
        });
    }

    document.getElementById("avatarMessage").textContent = message;

    tutor.classList.add("show");
  },

  welcome() {
    this.show(this.messages.welcome, "happy");
  },

  storyHelp() {
    this.show(this.messages.story, "happy");
  },

  grammarHelp() {
    this.show(this.messages.grammar, "thinking");
  },

  gameHelp() {
    this.show(this.messages.game, "excited");
  },

  writingHelp() {
    this.show(this.messages.writing, "thinking");
  },

  correct() {
    this.show(this.messages.success, "excited");
  },

  retry() {
    this.show(this.messages.retry, "encourage");
  },

  excellent() {
    this.show(this.messages.excellent, "excited");
  }
};

window.AvatarTutor = AvatarTutor;
