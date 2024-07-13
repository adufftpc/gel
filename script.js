const lettersMap = {
    'ა': { transcriptions: { english: 'a', russian: 'а' }, correctAnswers: 0, totalAnswers: 1 },
    'ბ': { transcriptions: { english: 'b', russian: 'б' }, correctAnswers: 0, totalAnswers: 1 },
    'გ': { transcriptions: { english: 'g', russian: 'г' }, correctAnswers: 0, totalAnswers: 1 },
    'დ': { transcriptions: { english: 'd', russian: 'д' }, correctAnswers: 0, totalAnswers: 1 },
    'ე': { transcriptions: { english: 'e', russian: 'е' }, correctAnswers: 0, totalAnswers: 1 },
    'ვ': { transcriptions: { english: 'v', russian: 'в' }, correctAnswers: 0, totalAnswers: 1 },
    'ზ': { transcriptions: { english: 'z', russian: 'з' }, correctAnswers: 0, totalAnswers: 1 },
    'თ': { transcriptions: { english: 't', russian: 'т' }, correctAnswers: 0, totalAnswers: 1 },
    'ი': { transcriptions: { english: 'i', russian: 'и' }, correctAnswers: 0, totalAnswers: 1 },
    'კ': { transcriptions: { english: 'k', russian: 'къ' }, correctAnswers: 0, totalAnswers: 1 },
    'ლ': { transcriptions: { english: 'l', russian: 'л' }, correctAnswers: 0, totalAnswers: 1 },
    'მ': { transcriptions: { english: 'm', russian: 'м' }, correctAnswers: 0, totalAnswers: 1 },
    'ნ': { transcriptions: { english: 'n', russian: 'н' }, correctAnswers: 0, totalAnswers: 1 },
    'ო': { transcriptions: { english: 'o', russian: 'о' }, correctAnswers: 0, totalAnswers: 1 },
    'პ': { transcriptions: { english: 'p', russian: 'п' }, correctAnswers: 0, totalAnswers: 1 },
    'ჟ': { transcriptions: { english: 'zh', russian: 'ж' }, correctAnswers: 0, totalAnswers: 1 },
    'რ': { transcriptions: { english: 'r', russian: 'р' }, correctAnswers: 0, totalAnswers: 1 },
    'ს': { transcriptions: { english: 's', russian: 'с' }, correctAnswers: 0, totalAnswers: 1 },
    'ტ': { transcriptions: { english: 't', russian: 'т' }, correctAnswers: 0, totalAnswers: 1 },
    'უ': { transcriptions: { english: 'u', russian: 'у' }, correctAnswers: 0, totalAnswers: 1 },
    'ფ': { transcriptions: { english: 'p', russian: 'п' }, correctAnswers: 0, totalAnswers: 1 },
    'ქ': { transcriptions: { english: 'k', russian: 'к' }, correctAnswers: 0, totalAnswers: 1 },
    'ღ': { transcriptions: { english: 'gh', russian: 'гх' }, correctAnswers: 0, totalAnswers: 1 },
    'ყ': { transcriptions: { english: 'q', russian: 'кх' }, correctAnswers: 0, totalAnswers: 1 },
    'შ': { transcriptions: { english: 'sh', russian: 'ш' }, correctAnswers: 0, totalAnswers: 1 },
    'ჩ': { transcriptions: { english: 'ch', russian: 'ч' }, correctAnswers: 0, totalAnswers: 1 },
    'ც': { transcriptions: { english: 'ts', russian: 'ц' }, correctAnswers: 0, totalAnswers: 1 },
    'ძ': { transcriptions: { english: 'dz', russian: 'дз' }, correctAnswers: 0, totalAnswers: 1 },
    'წ': { transcriptions: { english: 'ts', russian: 'цъ' }, correctAnswers: 0, totalAnswers: 1 },
    'ჭ': { transcriptions: { english: 'ch', russian: 'чъ' }, correctAnswers: 0, totalAnswers: 1 },
    'ხ': { transcriptions: { english: 'kh', russian: 'х' }, correctAnswers: 0, totalAnswers: 1 },
    'ჯ': { transcriptions: { english: 'j', russian: 'дж' }, correctAnswers: 0, totalAnswers: 1 },
    'ჰ': { transcriptions: { english: 'h', russian: 'х' }, correctAnswers: 0, totalAnswers: 1 },
};

let currentLetter = '';
let correctAnswer = '';
let selectedLanguage = 'english';

function checkAnswer(element) {
    const selectedAnswer = element.innerText;
    const isCorrect = selectedAnswer === correctAnswer;
    delay = 430;

    if (isCorrect) {
        element.classList.add('correct');
        lettersMap[currentLetter].correctAnswers++;
    } else {
        delay *= 2.33;
        element.classList.add('incorrect');
        highlightCorrectAnswer();
    }

    lettersMap[currentLetter].totalAnswers++;

    setTimeout(() => {
        element.classList.remove('correct', 'incorrect');
        removeCorrectHighlight();
        nextSet();
    }, delay);
}

function highlightCorrectAnswer() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        if (option.innerText === correctAnswer) {
            option.classList.add('correct-answer');
        }
    });
}

function removeCorrectHighlight() {
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('correct-answer');
    });
}

function nextSet() {
    currentLetter = getNextRandomLetter();
    correctAnswer = lettersMap[currentLetter].transcriptions[selectedLanguage];

    document.getElementById('foreignLetter').innerText = currentLetter;
    const options = document.querySelectorAll('.option');

    // Shuffle options
    const allAnswers = Object.values(lettersMap).map(item => item.transcriptions[selectedLanguage]);
    let shuffledAnswers = shuffleArray(allAnswers).slice(0, options.length);

    if (!shuffledAnswers.includes(correctAnswer)) {
        shuffledAnswers[Math.floor(Math.random() * shuffledAnswers.length)] = correctAnswer;
        shuffledAnswers = shuffleArray(shuffledAnswers);
    }

    options.forEach((option, index) => {
        option.innerText = shuffledAnswers[index];
    });

    updateDebugOutput();
}

function getNextRandomLetter() {
    const letters = Object.keys(lettersMap);
    const neverCheckedLetters = letters.filter(letter => lettersMap[letter].totalAnswers === 1);

    if ((Math.random() * 100) < 34) {
        if (neverCheckedLetters.length > 0) {
            return neverCheckedLetters[Math.floor(Math.random() * neverCheckedLetters.length)];
        }
    }

    const sortedLetters = letters.sort((a, b) => {
        const aPercentage = lettersMap[a].totalAnswers ? lettersMap[a].correctAnswers / lettersMap[a].totalAnswers : 0;
        const bPercentage = lettersMap[b].totalAnswers ? lettersMap[b].correctAnswers / lettersMap[b].totalAnswers : 0;
        return aPercentage - bPercentage;
    });

    const leastGuessedLetters = sortedLetters.slice(0, Math.ceil(sortedLetters.length * 0.6));
    return leastGuessedLetters[Math.floor(Math.random() * leastGuessedLetters.length)];
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function updateDebugOutput() {
    const debugOutput = document.getElementById('debugOutput');
    let output = 'Letter\tCorrect\tTotal\tRate\n';
    if (debugOutput !== null) {
        for (const letter in lettersMap) {
            const { correctAnswers, totalAnswers } = lettersMap[letter];
            const rate = (correctAnswers / totalAnswers * 100).toFixed(2);
            output += `${letter}\t\t${correctAnswers}\t\t${totalAnswers}\t\t${rate}%\n`;
        }
        debugOutput.innerText = output;
    }
}

function changeLanguage() {
    selectedLanguage = document.getElementById('languageSelect').value;
    nextSet();
}

// Initialize with the first set of letters
nextSet();