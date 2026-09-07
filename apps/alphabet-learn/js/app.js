(() => {
  const STORAGE_KEY = "alphabet-learned";
  const SCORE_KEY = "alphabet-quiz-score";

  let currentLetterIndex = 0;
  let traceIndex = 0;
  let quizQuestion = null;
  let learned = loadLearned();
  let quizScore = loadScore();

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  const letterGrid = $("#letterGrid");
  const letterDetail = $("#letterDetail");
  const learnedCount = $("#learnedCount");
  const quizScoreEl = $("#quizScore");

  function loadLearned() {
    try {
      return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]"));
    } catch {
      return new Set();
    }
  }

  function saveLearned() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...learned]));
    updateStats();
  }

  function loadScore() {
    return parseInt(localStorage.getItem(SCORE_KEY) || "0", 10);
  }

  function saveScore() {
    localStorage.setItem(SCORE_KEY, String(quizScore));
    updateStats();
  }

  function updateStats() {
    learnedCount.textContent = learned.size;
    quizScoreEl.textContent = quizScore;
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "en-US";
    utterance.rate = 0.85;
    window.speechSynthesis.speak(utterance);
  }

  function getColor(index) {
    const colors = [
      "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FFEAA7",
      "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE", "#85C1E9",
      "#F8B500", "#FF8C94", "#6C5CE7", "#00B894", "#E17055",
      "#74B9FF", "#A29BFE", "#FD79A8", "#55EFC4", "#FAB1A0",
      "#81ECEC", "#FFE066", "#FF9FF3", "#54A0FF", "#5F27CD",
      "#01A3A4",
    ];
    return colors[index % colors.length];
  }

  function renderGrid() {
    letterGrid.innerHTML = ALPHABET.map((item, i) => {
      const isLearned = learned.has(item.letter);
      return `
        <button
          class="letter-card ${isLearned ? "learned" : ""}"
          data-index="${i}"
          style="--card-color: ${getColor(i)}"
          type="button"
          aria-label="Letter ${item.letter} for ${item.word}"
        >
          <span class="letter-card__letter">${item.letter}</span>
          <span class="letter-card__emoji">${item.emoji}</span>
          ${isLearned ? '<span class="letter-card__badge">✓</span>' : ""}
        </button>
      `;
    }).join("");

    letterGrid.querySelectorAll(".letter-card").forEach((card) => {
      card.addEventListener("click", () => showDetail(parseInt(card.dataset.index, 10)));
    });
  }

  function showDetail(index) {
    currentLetterIndex = index;
    const item = ALPHABET[index];

    $("#detailLetter").textContent = item.letter;
    $("#detailEmoji").textContent = item.emoji;
    $("#detailWord").textContent = item.word;
    $("#detailTelugu").textContent = `${item.telugu} — ${item.hint}`;
    $("#detailHint").textContent = `${item.letter} is for ${item.word}`;
    $("#detailHero").style.background = `linear-gradient(135deg, ${getColor(index)}, ${getColor(index + 5)})`;

    const markBtn = $("#markLearnedBtn");
    if (learned.has(item.letter)) {
      markBtn.innerHTML = "<span>✅</span> నేర్చుకున్నాను!";
      markBtn.disabled = true;
    } else {
      markBtn.innerHTML = "<span>✅</span> నేర్చుకున్నాను";
      markBtn.disabled = false;
    }

    letterGrid.hidden = true;
    letterDetail.hidden = false;
    speak(`${item.letter}. ${item.letter} is for ${item.word}. ${item.word}.`);
  }

  function hideDetail() {
    letterDetail.hidden = true;
    letterGrid.hidden = false;
    renderGrid();
  }

  function switchMode(mode) {
    $$(".tab").forEach((tab) => {
      const active = tab.dataset.mode === mode;
      tab.classList.toggle("active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    $$(".panel").forEach((panel) => {
      panel.hidden = true;
      panel.classList.remove("active");
    });

    const panelMap = { learn: "#learnPanel", quiz: "#quizPanel", trace: "#tracePanel" };
    const panel = $(panelMap[mode]);
    panel.hidden = false;
    panel.classList.add("active");

    if (mode === "learn") hideDetail();
    if (mode === "quiz") resetQuizUI();
    if (mode === "trace") renderTrace();
  }

  function resetQuizUI() {
    $("#quizCard").hidden = true;
    $("#quizStart").hidden = false;
    $("#quizFeedback").hidden = true;
    $("#quizNextBtn").hidden = true;
  }

  function startQuiz() {
    $("#quizStart").hidden = true;
    $("#quizCard").hidden = false;
    nextQuizQuestion();
  }

  function nextQuizQuestion() {
    const correctIndex = Math.floor(Math.random() * ALPHABET.length);
    quizQuestion = ALPHABET[correctIndex];

    const wrongLetters = new Set();
    while (wrongLetters.size < 3) {
      const idx = Math.floor(Math.random() * ALPHABET.length);
      if (idx !== correctIndex) wrongLetters.add(ALPHABET[idx].letter);
    }

    const options = [quizQuestion.letter, ...wrongLetters];
    options.sort(() => Math.random() - 0.5);

    $("#quizEmoji").textContent = quizQuestion.emoji;
    $("#quizWord").textContent = quizQuestion.word;
    $("#quizFeedback").hidden = true;
    $("#quizNextBtn").hidden = true;

    const optionsEl = $("#quizOptions");
    optionsEl.innerHTML = options.map((letter) => `
      <button class="quiz-option" data-letter="${letter}" type="button">${letter}</button>
    `).join("");

    optionsEl.querySelectorAll(".quiz-option").forEach((btn) => {
      btn.addEventListener("click", () => handleQuizAnswer(btn, btn.dataset.letter));
    });
  }

  function handleQuizAnswer(btn, selected) {
    const correct = selected === quizQuestion.letter;
    const feedback = $("#quizFeedback");

    $$(".quiz-option").forEach((opt) => {
      opt.disabled = true;
      if (opt.dataset.letter === quizQuestion.letter) opt.classList.add("correct");
      if (opt === btn && !correct) opt.classList.add("wrong");
    });

    if (correct) {
      quizScore += 10;
      saveScore();
      feedback.textContent = "🎉 చాలా బాగుంది! Correct!";
      feedback.className = "quiz-feedback success";
      speak("Correct! Well done!");
    } else {
      feedback.textContent = `❌ తప్పు! సరైన జవాబు: ${quizQuestion.letter}`;
      feedback.className = "quiz-feedback error";
      speak(`The correct answer is ${quizQuestion.letter}`);
    }

    feedback.hidden = false;
    $("#quizNextBtn").hidden = false;
  }

  function renderTrace() {
    const item = ALPHABET[traceIndex];
    $("#traceCurrent").textContent = item.letter;
    $("#traceLetter").textContent = item.letter;
    $("#traceEmoji").textContent = item.emoji;
    $("#traceWord").textContent = `${item.word} — ${item.telugu}`;
    $(".trace-display").style.background = `linear-gradient(135deg, ${getColor(traceIndex)}, ${getColor(traceIndex + 8)})`;
  }

  // Event listeners
  $("#backBtn").addEventListener("click", hideDetail);
  $("#speakBtn").addEventListener("click", () => {
    const item = ALPHABET[currentLetterIndex];
    speak(`${item.letter}. ${item.letter} is for ${item.word}. ${item.word}.`);
  });
  $("#markLearnedBtn").addEventListener("click", () => {
    learned.add(ALPHABET[currentLetterIndex].letter);
    saveLearned();
    showDetail(currentLetterIndex);
    renderGrid();
  });
  $("#nextBtn").addEventListener("click", () => {
    const next = (currentLetterIndex + 1) % ALPHABET.length;
    showDetail(next);
  });

  $$(".tab").forEach((tab) => {
    tab.addEventListener("click", () => switchMode(tab.dataset.mode));
  });

  $("#startQuizBtn").addEventListener("click", startQuiz);
  $("#quizNextBtn").addEventListener("click", nextQuizQuestion);

  $("#tracePrevBtn").addEventListener("click", () => {
    traceIndex = (traceIndex - 1 + ALPHABET.length) % ALPHABET.length;
    renderTrace();
  });
  $("#traceNextBtn").addEventListener("click", () => {
    traceIndex = (traceIndex + 1) % ALPHABET.length;
    renderTrace();
  });
  $("#traceSpeakBtn").addEventListener("click", () => {
    const item = ALPHABET[traceIndex];
    speak(`${item.letter}. ${item.letter} is for ${item.word}.`);
  });

  // Init
  renderGrid();
  updateStats();
})();
