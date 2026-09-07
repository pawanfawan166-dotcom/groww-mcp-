(() => {
  const PROGRESS_KEY = "fno-course-progress";
  const QUIZ_KEY = "fno-course-quiz-scores";

  let currentModule = null;
  let currentLessonIndex = 0;
  let progress = loadProgress();
  let quizScores = loadQuizScores();

  const $ = (sel) => document.querySelector(sel);
  const $$ = (sel) => document.querySelectorAll(sel);

  function loadProgress() {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveProgress() {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
    updateOverallProgress();
  }

  function loadQuizScores() {
    try {
      return JSON.parse(localStorage.getItem(QUIZ_KEY) || "{}");
    } catch {
      return {};
    }
  }

  function saveQuizScores() {
    localStorage.setItem(QUIZ_KEY, JSON.stringify(quizScores));
  }

  function getTotalLessons() {
    return COURSE.modules.reduce((sum, m) => sum + m.lessons.length, 0);
  }

  function getCompletedCount() {
    return Object.keys(progress).filter((k) => progress[k]).length;
  }

  function updateOverallProgress() {
    const total = getTotalLessons();
    const done = getCompletedCount();
    const pct = total ? Math.round((done / total) * 100) : 0;
    $("#overallProgress").style.width = `${pct}%`;
    $("#progressText").textContent = UI.progress(pct);
  }

  function isLessonDone(id) {
    return !!progress[id];
  }

  function isModuleComplete(mod) {
    return mod.lessons.every((l) => isLessonDone(l.id));
  }

  function renderSidebar() {
    const list = $("#moduleList");
    list.innerHTML = COURSE.modules.map((mod, i) => {
      const done = mod.lessons.filter((l) => isLessonDone(l.id)).length;
      const total = mod.lessons.length;
      const complete = done === total;
      return `
        <button class="module-item ${complete ? "complete" : ""}" data-module="${i}" type="button">
          <span class="module-item__icon">${mod.icon}</span>
          <div class="module-item__info">
            <span class="module-item__title">${mod.titleTe}</span>
            <span class="module-item__progress">${done}/${total} lessons</span>
          </div>
          ${complete ? '<span class="module-item__check">✓</span>' : ""}
        </button>
      `;
    }).join("");

    list.querySelectorAll(".module-item").forEach((btn) => {
      btn.addEventListener("click", () => openModule(parseInt(btn.dataset.module, 10)));
    });
  }

  function renderModuleGrid() {
    const grid = $("#moduleGrid");
    grid.innerHTML = COURSE.modules.map((mod, i) => {
      const done = mod.lessons.filter((l) => isLessonDone(l.id)).length;
      const total = mod.lessons.length;
      const pct = Math.round((done / total) * 100);
      return `
        <div class="module-card" data-module="${i}" style="--mod-color: ${mod.color}">
          <div class="module-card__icon">${mod.icon}</div>
          <h3>${mod.title}</h3>
          <p class="module-card__te">${mod.titleTe}</p>
          <div class="module-card__meta">
            <span>${total} lessons</span>
            <span>${mod.quiz?.length || 0} quiz</span>
          </div>
          <div class="module-card__bar">
            <div class="module-card__fill" style="width: ${pct}%"></div>
          </div>
          <span class="module-card__pct">${pct}%</span>
        </div>
      `;
    }).join("");

    grid.querySelectorAll(".module-card").forEach((card) => {
      card.addEventListener("click", () => openModule(parseInt(card.dataset.module, 10)));
    });
  }

  function showView(viewId) {
    $$(".view").forEach((v) => {
      v.hidden = true;
      v.classList.remove("active");
    });
    const view = $(`#${viewId}View`);
    if (view) {
      view.hidden = false;
      view.classList.add("active");
    }

    $$(".bottom-nav__item").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === viewId.replace("View", "").replace("dashboard", "dashboard"));
    });
  }

  function openModule(index) {
    currentModule = COURSE.modules[index];
    currentLessonIndex = currentModule.lessons.findIndex((l) => !isLessonDone(l.id));
    if (currentLessonIndex < 0) currentLessonIndex = 0;

    $("#moduleTitle").textContent = currentModule.title;
    $("#moduleSubtitle").textContent = currentModule.titleTe;
    $("#lessonBadge").textContent = `Module ${index + 1}/${COURSE.modules.length}`;

    renderLessonTabs();
    renderLesson();
    showView("lesson");
    $("#sidebar").classList.remove("open");
  }

  function renderLessonTabs() {
    const tabs = $("#lessonTabs");
    tabs.innerHTML = currentModule.lessons.map((l, i) => `
      <button class="lesson-tab ${i === currentLessonIndex ? "active" : ""} ${isLessonDone(l.id) ? "done" : ""}"
        data-index="${i}" type="button">${i + 1}</button>
    `).join("");

    tabs.querySelectorAll(".lesson-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        currentLessonIndex = parseInt(tab.dataset.index, 10);
        renderLessonTabs();
        renderLesson();
      });
    });
  }

  function renderLesson() {
    const lesson = currentModule.lessons[currentLessonIndex];
    const modIndex = COURSE.modules.indexOf(currentModule);

    $("#lessonModuleLabel").textContent = `Module ${modIndex + 1}: ${currentModule.title}`;
    $("#lessonTitle").textContent = `${lesson.title} — ${lesson.titleTe}`;
    $("#lessonBody").innerHTML = `<span class="lesson-card__roman-badge">📖 Roman Telugu lo</span>${lesson.content}`;

    const kp = $("#lessonKeypoints");
    kp.innerHTML = `
      <h4>${UI.keyPoints}</h4>
      <ul>${lesson.keyPoints.map((p) => `<li>${p}</li>`).join("")}</ul>
    `;

    const ex = $("#lessonExample");
    if (lesson.example) {
      ex.hidden = false;
      ex.innerHTML = `<h4>${UI.example}</h4><p>${lesson.example}</p>`;
    } else {
      ex.hidden = true;
    }

    const completeBtn = $("#completeLessonBtn");
    if (isLessonDone(lesson.id)) {
      completeBtn.textContent = UI.completeLessonDone;
      completeBtn.disabled = true;
    } else {
      completeBtn.textContent = UI.completeLesson;
      completeBtn.disabled = false;
    }

    $("#prevLessonBtn").disabled = currentLessonIndex === 0;
    const isLast = currentLessonIndex === currentModule.lessons.length - 1;
    $("#nextLessonBtn").textContent = isLast ? "Quiz →" : UI.nextLesson;
  }

  function completeLesson() {
    const lesson = currentModule.lessons[currentLessonIndex];
    progress[lesson.id] = true;
    saveProgress();
    renderSidebar();
    renderModuleGrid();
    renderLessonTabs();
    renderLesson();
  }

  function nextLesson() {
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      currentLessonIndex++;
      renderLessonTabs();
      renderLesson();
    } else if (currentModule.quiz) {
      startQuiz();
    }
  }

  function prevLesson() {
    if (currentLessonIndex > 0) {
      currentLessonIndex--;
      renderLessonTabs();
      renderLesson();
    }
  }

  function startQuiz() {
    const quiz = currentModule.quiz;
    if (!quiz) return;

    $("#quizTitle").textContent = `${currentModule.title} — Quiz`;
    showView("quiz");

    let currentQ = 0;
    let score = 0;
    const container = $("#quizContainer");

    function renderQuestion() {
      if (currentQ >= quiz.length) {
        const pct = Math.round((score / quiz.length) * 100);
        quizScores[currentModule.id] = pct;
        saveQuizScores();
        container.innerHTML = `
          <div class="quiz-result">
            <div class="quiz-result__score">${pct}%</div>
            <h3>${pct >= 75 ? UI.quizExcellent : pct >= 50 ? UI.quizGood : UI.quizReview}</h3>
            <p>${score}/${quiz.length} correct answers</p>
            <button class="btn btn--primary" id="quizDoneBtn" type="button">${UI.quizContinue}</button>
          </div>
        `;
        $("#quizDoneBtn").addEventListener("click", () => {
          const nextMod = COURSE.modules.indexOf(currentModule) + 1;
          if (nextMod < COURSE.modules.length) {
            openModule(nextMod);
          } else {
            showView("dashboard");
          }
        });
        return;
      }

      const q = quiz[currentQ];
      container.innerHTML = `
        <div class="quiz-q">
          <span class="quiz-q__num">${UI.question(currentQ + 1, quiz.length)}</span>
          <h4>${q.q}</h4>
          <div class="quiz-q__options">
            ${q.options.map((opt, i) => `
              <button class="quiz-q__option" data-index="${i}" type="button">${opt}</button>
            `).join("")}
          </div>
          <p class="quiz-q__feedback" id="quizFeedback" hidden></p>
        </div>
      `;

      container.querySelectorAll(".quiz-q__option").forEach((btn) => {
        btn.addEventListener("click", () => {
          const selected = parseInt(btn.dataset.index, 10);
          const correct = selected === q.answer;
          if (correct) score++;

          container.querySelectorAll(".quiz-q__option").forEach((opt) => {
            opt.disabled = true;
            const idx = parseInt(opt.dataset.index, 10);
            if (idx === q.answer) opt.classList.add("correct");
            if (idx === selected && !correct) opt.classList.add("wrong");
          });

          const fb = $("#quizFeedback");
          fb.hidden = false;
          fb.textContent = correct ? UI.quizCorrect : UI.quizWrong(q.options[q.answer]);
          fb.className = `quiz-q__feedback ${correct ? "success" : "error"}`;

          setTimeout(() => {
            currentQ++;
            renderQuestion();
          }, 1500);
        });
      });
    }

    renderQuestion();
  }

  function renderGlossary(filter = "") {
    const list = $("#glossaryList");
    const term = filter.toLowerCase();
    const items = GLOSSARY.filter(
      (g) =>
        g.term.toLowerCase().includes(term) ||
        g.full.toLowerCase().includes(term) ||
        g.te.includes(filter) ||
        g.def.toLowerCase().includes(term)
    );

    list.innerHTML = items.map((g) => `
      <div class="glossary-item">
        <div class="glossary-item__term">
          <strong>${g.term}</strong>
          <span>${g.full}</span>
        </div>
        <p class="glossary-item__te">${g.te}</p>
        <p class="glossary-item__def">${g.def}</p>
      </div>
    `).join("") || `<p class="empty">${UI.noTerms}</p>`;
  }

  // Event listeners
  $("#startCourseBtn").addEventListener("click", () => openModule(0));
  $("#backToModules").addEventListener("click", () => showView("dashboard"));
  $("#completeLessonBtn").addEventListener("click", completeLesson);
  $("#nextLessonBtn").addEventListener("click", nextLesson);
  $("#prevLessonBtn").addEventListener("click", prevLesson);
  $("#backFromQuiz").addEventListener("click", () => showView("lesson"));
  $("#menuBtn").addEventListener("click", () => $("#sidebar").classList.toggle("open"));
  $("#glossarySearch").addEventListener("input", (e) => renderGlossary(e.target.value));

  $$(".bottom-nav__item").forEach((btn) => {
    btn.addEventListener("click", () => {
      const view = btn.dataset.view;
      if (view === "dashboard") showView("dashboard");
      else if (view === "lesson") {
        if (!currentModule) openModule(0);
        else showView("lesson");
      } else if (view === "glossary") {
        renderGlossary();
        showView("glossary");
      }
    });
  });

  // Init
  renderSidebar();
  renderModuleGrid();
  updateOverallProgress();
})();
