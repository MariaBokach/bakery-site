const questions = [
  {
    q: 'Если человека назвали мордофиля, то это…',
    answers: [
      { text: 'Значит, что он тщеславный', correct: true, explain: 'Ну зачем же вы так... В Этимологическом словаре русского языка Макса Фасмера поясняется, что мордофилей называют чванливого человека. Ну а «чванливый» — это высокомерный, тщеславный.' },
      { text: 'Значит, что у него лицо как у хряка', correct: false, explain: '' },
      { text: 'Значит, что чумазый', correct: false, explain: '' }
    ]
  },
  {
    q: '«Да этот Ярополк — фуфлыга!» Что не так с Ярополком?',
    answers: [
      { text: 'Он маленький и невзрачный', correct: true, explain: 'Точно! Словарь Даля говорит, что фуфлыгой называют невзрачного малорослого человека. А еще так называют прыщи.' },
      { text: 'Он тот еще алкоголик', correct: false, explain: '' },
      { text: 'Он не держит свое слово', correct: false, explain: '' }
    ]
  },
  {
    q: 'Если человека прозвали пятигузом, значит, он...',
    answers: [
      { text: 'Не держит слово', correct: true, explain: 'Может сесть сразу на пять стульев. Согласно Этимологическому словарю русского языка Макса Фасмера, пятигуз — это ненадежный, непостоянный человек.' },
      { text: 'Изменяет жене', correct: false, explain: '' },
      { text: 'Без гроша в кармане', correct: false, explain: '' }
    ]
  },
  {
    q: 'Кто такой шлындра?',
    answers: [
      { text: 'Обманщик', correct: false, explain: '' },
      { text: 'Нытик', correct: false, explain: '' },
      { text: 'Бродяга', correct: true, explain: 'Да! В Словаре русского арго «шлындрать» означает бездельничать, шляться.' }
    ]
  },
  {
    q: 'В каком случае про человека можно сказать, что он охренел (в смысле «обнаглел/перешёл границы»), а не просто удивился?',
    answers: [
      { text: 'Он без спроса берёт твои вещи и делает вид, что так и надо.', correct: true, explain: 'Слово «охренел» многозначно, оно означает «обнаглел, потерял совесть».' },
      { text: 'Он в наглую лезет без очереди и ещё возмущается, что его не пропускают.', correct: true, explain: 'Слово «охренел» многозначно, оно означает «обнаглел, потерял совесть».' },
      { text: 'Он съел много хрена и искренне удивился: «Какой жгучий, вот это да!»', correct: false, explain: '' },
      { text: 'В осеннем лесу наблюдается завихрение листьев.', correct: false, explain: '' }
    ]
  }
];

function rnd(arr) {
  const a = arr.slice();
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const test = document.getElementById('test');
const text = document.getElementById('text');
const restart = document.getElementById('restart');
const res = document.getElementById('res');

let correctCount;
let answeredCount;




function start() {
  const q_blocks = rnd(questions);
  test.innerHTML = '';
  text.textContent = 'Выберите один вариант ответа. Переход к следующему вопросу только после ответа.';

  correctCount = 0;
  answeredCount = 0;
  restart.style.display = 'none';
  res.style.display = 'none';

  q_blocks.forEach((qst, index) => {
    const row = document.createElement('div');
    row.className = 'row';

    const question = document.createElement('div');
    question.className = 'question';
    question.dataset.originalIndex = questions.findIndex(question => question.q === qst.q);
    question.innerHTML = `<span class="marker"></span> <span class="q-num">Вопрос ${index + 1}.</span> ${qst.q}`;

    const answers = document.createElement('div');
    answers.className = 'answers';
    answers.style.display = 'none';

    const a_block = rnd(qst.answers);
    question.rndAnswers = a_block;
    a_block.forEach(ans => {
      const answer = document.createElement('div');
      answer.className = 'a-block';
      answer.textContent = ans.text;
      answer.dataset.correct = ans.correct;
      answer.dataset.explain = ans.explain;

      answer.addEventListener('click', function () {
        if (answers.classList.contains('answered')) return;
        answers.classList.add('answered');
        question.classList.add('q-answered');
        answeredCount++;

        const isCorrect = this.dataset.correct === 'true';
        const explainText = this.dataset.explain;
        const marker = question.querySelector('.marker');

        if (isCorrect) {
          this.classList.add('correct-answer');
          marker.innerHTML = '✔';
          marker.style.color = 'green';
          correctCount++;
        } else {
          this.classList.add('wrong-answer');
          marker.innerHTML = '✘';
          marker.style.color = 'red';
          question.dataset.wrongChoice = ans.text;
        }

        if (explainText) {
          const explain = document.createElement('div');
          explain.className = 'explain-text';
          explain.textContent = explainText;
          this.appendChild(explain);
        }

        setTimeout(() => {
          const allAns = Array.from(answers.querySelectorAll('.a-block'));

          if (isCorrect) {
            const chosen = this;
            chosen.style.transform = 'scale(1.15)';

            const others = allAns.filter(b => b !== chosen);
            others.forEach((block, i) => { setTimeout(() => { block.classList.add('down'); }, i * 200);});

            const timeOthers = (others.length * 200) + 500;
            setTimeout(() => { chosen.classList.add('down');}, timeOthers);

            const timeDown = timeOthers + 500;
            setTimeout(() => { 
              answers.style.display = 'none';
              if (answeredCount === questions.length) finish();
            }, timeDown);

          } else {
            allAns.forEach((block, i) => { setTimeout(() => { block.classList.add('down'); }, i * 200);});

            const timeDown = (allAns.length * 200) + 500;
            setTimeout(() => {
              answers.style.display = 'none';
              if (answeredCount === questions.length) finish();
            }, timeDown);
          }
        }, 1500);
      });

      answers.appendChild(answer);
    });

    row.appendChild(question);
    row.appendChild(answers);

    question.addEventListener('click', () => {
      if (answeredCount === questions.length) return;
      if (answers.classList.contains('answered')) { return; }

      const openA = document.querySelector('.answers[style*="display: flex"]:not(.answered)');
      if (openA && openA !== answers) {
        setTimeout(() => { question.style.animation = ''; }, 400);
        return;
      }
      document.querySelectorAll('.answers').forEach(an => {
        an.style.display = 'none';
      });
      answers.style.display = 'flex';
    });

    test.appendChild(row);
  });
}



function finish() {
  text.innerHTML = 'Вопросы закончились!<br>Можете посмотреть правильные ответы нажав на вопросы снова';
  restart.style.display = 'inline-block';
  res.style.display = 'inline-block';
  res.textContent = `Правильных ответов: ${correctCount} из ${questions.length}`;

  const allQst = test.querySelectorAll('.question');

  allQst.forEach((q) => {
      q.addEventListener('click', function () {
      const knownAns = test.querySelectorAll('.finish-block');
      knownAns.forEach(block => block.remove());

      const finishBlock = document.createElement('div');
      finishBlock.className = 'finish-block';

      const allAns = this.rndAnswers;
      allAns.forEach(ans => {
        const ans_one = document.createElement('div');
        ans_one.className = 'a-block';
        ans_one.textContent = ans.text;

        if (ans.correct) {
          ans_one.classList.add('correct-answer');
          if (ans.explain) {
            const explainDiv = document.createElement('div');
            explainDiv.className = 'explain-text';
            explainDiv.textContent = ans.explain;
            ans_one.appendChild(explainDiv);
          }
        }
        else if (this.dataset.wrongChoice === ans.text) {
          ans_one.classList.add('wrong-answer');
        }

        finishBlock.appendChild(ans_one);
      });

      const row = this.closest('.row');
      row.appendChild(finishBlock);
    });
  });
}



restart.addEventListener('click', start);
start();