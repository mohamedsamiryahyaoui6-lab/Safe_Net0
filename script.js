document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  if (toggle && nav) toggle.addEventListener("click", () => nav.classList.toggle("open"));

  // Petite histoire animée interactive
  const story = [
    {label:"Scène 1 — Une nouvelle rencontre", bubble:"Salut Sami ! Tu joues souvent à ce jeu ?", character:"🧑🏻‍💻", text:"Sami joue en ligne après ses devoirs. Un nouveau joueur lui envoie un message."},
    {label:"Scène 2 — Une demande étrange", bubble:"Envoie-moi ton adresse et une photo !", character:"🧑🏻‍💻", text:"L’inconnu demande des informations personnelles. Sami comprend que cette demande est risquée."},
    {label:"Scène 3 — Sami réfléchit", bubble:"Je ne te connais pas. Je ne partagerai pas mes infos.", character:"🧑🏻‍💻", text:"Sami ne donne aucune information. Il arrête la conversation et ne clique sur aucun lien."},
    {label:"Scène 4 — Il demande de l’aide", bubble:"Un compte m’a demandé mon adresse.", character:"🧑🏻‍💻", text:"Sami en parle à un parent. Ensemble, ils bloquent le compte et signalent le message."},
    {label:"Scène 5 — Le bon réflexe !", bubble:"Merci de m’avoir prévenu. Tu as bien réagi !", character:"🧑🏻‍💻", text:"Sami a appris la leçon : protéger ses informations, bloquer les comptes suspects et parler à un adulte."}
  ];
  const scene = document.getElementById("scene");
  if (scene) {
    let index = 0;
    const bubble = document.getElementById("chatBubble");
    const dialogue = document.getElementById("dialogue");
    const label = document.getElementById("sceneLabel");
    const progress = document.getElementById("progressBar");
    const next = document.getElementById("nextScene");
    const restart = document.getElementById("restartStory");
    function renderStory() {
      const item = story[index];
      bubble.textContent = item.bubble;
      dialogue.textContent = item.text;
      label.textContent = item.label;
      progress.style.width = ((index + 1) / story.length * 100) + "%";
      bubble.style.animation = "none";
      void bubble.offsetWidth;
      bubble.style.animation = "pop .35s ease-out";
      next.textContent = index === story.length - 1 ? "Revoir l’histoire ↺" : "Scène suivante →";
    }
    next.addEventListener("click", () => { index = index === story.length - 1 ? 0 : index + 1; renderStory(); });
    restart.addEventListener("click", () => { index = 0; renderStory(); });
    renderStory();
  }

  // Quiz interactif
  const quiz = [
    {q:"Un inconnu te demande ton mot de passe. Que fais-tu ?", a:["Je le lui donne","Je refuse et j’en parle à un adulte","Je le publie dans le chat"], correct:1, why:"Exact ! Un mot de passe doit rester secret."},
    {q:"Tu reçois un lien étrange qui promet un cadeau. Que fais-tu ?", a:["Je clique vite","Je le partage à mes amis","Je ne clique pas et je vérifie la source"], correct:2, why:"Bien joué ! Les fausses offres peuvent être des arnaques."},
    {q:"Quelqu’un se moque de toi en ligne à répétition. Que fais-tu ?", a:["Je garde les preuves et j’en parle à un adulte","Je réponds par des insultes","Je ne le dis à personne"], correct:0, why:"Oui ! Garde les preuves, bloque et signale le compte, puis demande de l’aide."},
    {q:"Que faut-il partager avec un inconnu en ligne ?", a:["Mon adresse","Aucune information personnelle","Mon numéro de téléphone"], correct:1, why:"Correct ! Garde tes informations personnelles privées."},
    {q:"Comment utiliser Internet de façon équilibrée ?", a:["Sans jamais faire de pause","En arrêtant de dormir pour jouer","En faisant des pauses et en gardant du temps pour d’autres activités"], correct:2, why:"Exact ! Le sommeil, les loisirs et les proches sont importants."}
  ];
  const qText = document.getElementById("questionText");
  if (qText) {
    let idx = 0, score = 0, answered = false;
    const answers = document.getElementById("answers"), feedback = document.getElementById("feedback");
    const count = document.getElementById("questionCount"), bar = document.getElementById("quizProgress");
    const scoreLabel = document.getElementById("scoreLabel"), next = document.getElementById("quizNext");
    function renderQuiz() {
      answered = false;
      const item = quiz[idx];
      count.textContent = `Question ${idx + 1} / ${quiz.length}`;
      bar.style.width = (idx / quiz.length * 100) + "%";
      qText.textContent = item.q; feedback.textContent = ""; answers.innerHTML = "";
      next.disabled = true; next.textContent = idx === quiz.length - 1 ? "Voir le résultat →" : "Suivant →";
      item.a.forEach((answer, n) => {
        const button = document.createElement("button");
        button.className = "answer"; button.textContent = answer;
        button.addEventListener("click", () => {
          if (answered) return;
          answered = true;
          [...answers.children].forEach((b, j) => { b.disabled = true; if (j === item.correct) b.classList.add("correct"); });
          if (n === item.correct) { score++; feedback.textContent = item.why; }
          else { button.classList.add("wrong"); feedback.textContent = "Pas tout à fait. " + item.why; }
          scoreLabel.textContent = "Score : " + score;
          bar.style.width = ((idx + 1) / quiz.length * 100) + "%";
          next.disabled = false;
        });
        answers.appendChild(button);
      });
    }
    next.addEventListener("click", () => {
      if (!answered) return;
      if (idx < quiz.length - 1) { idx++; renderQuiz(); }
      else {
        qText.textContent = `Tu as obtenu ${score} / ${quiz.length} !`;
        answers.innerHTML = "";
        feedback.textContent = score === quiz.length ? "Excellent ! Tu connais les bons réflexes de sécurité." : "Bravo d’avoir participé ! Relis les conseils et essaie encore.";
        next.textContent = "Recommencer le quiz";
        next.disabled = false;
        next.onclick = () => { idx = 0; score = 0; scoreLabel.textContent = "Score : 0"; next.onclick = null; renderQuiz(); };
      }
    });
    renderQuiz();
  }
});