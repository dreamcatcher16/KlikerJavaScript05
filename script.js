// za svako pitanje čuvamo
// konkretno pitanje,
// odgovore (četiri odgovora),
// kao i tačan odgovor
quizData = [
    {
        question: "Koji se jezik izvršava u pretraživaču?",
        a: "Java",
        b: "C",
        c: "Python",
        d: "JavaScript",
        correct: "d"
    },
    {
        question: "Od čega je CSS skraćeno?",
        a: "Central Style Sheets",
        b: "Cascading Style Sheets",
        c: "Cascading Simple Sheets",
        d: "Cars SUVs Sailboats",
        correct: "b"
    },
    {
        question: "Od čega je HTML skraćeno?",
        a: "Hypertext Markup Language",
        b: "Hypertext Markdown Language",
        c: "Hyperloop Machine Language",
        d: "Helicopters Terminals Motorboats Lamborginis",
        correct: "a"
    },
    {
        question: "Koje godine je nastao JavaScript?",
        a: "1996",
        b: "1995",
        c: "1994",
        d: "ništa od navedenog",
        correct: "b"
    }
]

quiz = document.getElementById('quiz')

// dohvatamo sve input elemente (querySelectorAll)
answerEls = document.querySelectorAll('input')
questionEl = document.getElementById('question')
a_text = document.getElementById('a_text')
b_text = document.getElementById('b_text')
c_text = document.getElementById('c_text')
d_text = document.getElementById('d_text')
submitBtn = document.getElementById('submit')

// počinjemo od pitanja sa rednim brojem 0
currentQuestion = 0
// rezultat je na samom početku 0
score = 0

// prikazujemo kviz
loadQuiz()

function loadQuiz() {
    // skidamo označeno polje (checked) od prethodnog pitanja
    deselectAnswers()

    currentQuizData = quizData[currentQuestion]

    questionEl.innerText = currentQuizData.question
    a_text.innerText = currentQuizData.a
    b_text.innerText = currentQuizData.b
    c_text.innerText = currentQuizData.c
    d_text.innerText = currentQuizData.d
}

function deselectAnswers() {
    answerEls.forEach(answerEl => answerEl.checked = false)
}

// dohvatamo označeni odgovor (a, b, c, d) ukoliko je neki odgovor označen
function getSelectedAnswer() {
    // ukoliko korisnik nije označio nijedan odgovor vratićemo undefined (nedefinisano)
    answer = undefined

    answerEls.forEach(answerEl => {
        if (answerEl.checked) {
            // ukoliko je odgovor čekiran (označen - checked) sačuvaćemo njegovu oznaku (id - a, b, c ili d)
            answer = answerEl.id
        }
    })

    return answer
}

// definišemo šta se događa klikom na dugme za prelazak na sledeće pitanje
submitBtn.addEventListener('click', () => {
    // dohvatamo označeni odgovor (a, b, c, d ili undefined)
    answer = getSelectedAnswer()

    if (answer != undefined) {
        // ukoliko je korisnik označio neki odgovor
        if (answer == quizData[currentQuestion].correct) {
            // ukoliko je označeni odgovor zapravo i tačan odgovor za trenutno postavljeno pitanje
            score++ // povećaj rezultat
        }

        // nezavisno od tačnog odgovora prelazimo na sledeće pitanje
        currentQuestion++

        // ukoliko ima još pitanja
        if (currentQuestion < quizData.length) {
            // učitaj naredno pitanje (currentQuestion)
            loadQuiz()
        } else {
            // u suprotnom prikazujemo odgovarajuću poruku
            // zajedno sa rezultatom, kao i opcijom da se pokrene igra ponovo
            // location.reload() se ponaša identično kao i osvežavanje u pretraživaču
            quiz.innerHTML =
                `
                    <h2>Odgovorili ste ${score}/${quizData.length} pitanja tačno</h2>
                    <button onclick="location.reload()">Probaj ponovo</button>
                `
        }
    } else {
        alert('Niste označili nijedan odgovor!')
    }
})