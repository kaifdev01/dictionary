const url = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

const result = document.getElementById('result');
const sound = document.getElementById('sound');

const btn = document.getElementById('search-btn');

btn.addEventListener('click', () => {
    let inpWord = document.getElementById("inp-word").value;

    fetch(`${url}${inpWord}`)
        .then((res) => res.json())
        .then((data) => {
            console.log(data)
            result.innerHTML = `
            <div class="word">
            <h3>${inpWord}</h3>
            <button onClick="playSound()">
                <i class="fas fa-thin fa-volume-high"></i>
            </button>
        </div>
        <div class="details">
            <p>${data[0].meanings[0].partOfSpeech}</p>
            <p>/${data[0].phonetic}/</p>
        </div>
        <p class="word-meaning">
           ${data[0].meanings[0].definitions[0].definition}
        </p>
        <p class="word-examplr">
        ${data[0].meanings[0].definitions[0].example || ""}
        </p>
            `
            // sound.setAttribute('src', `${data[0].phonetics[0].audio}`)
            // console.log(sound)
            if (data[0].phonetics && data[0].phonetics.length > 0 && data[0].phonetics[0].audio) {
                sound.setAttribute('src', data[0].phonetics[1].audio);
                sound.load();
                sound.play();
            } else {
                sound.innerHTML = '<p>Sound not available</p>';
            }

        })
        .catch(() => {
            result.innerHTML = "<h4 class='error'>Can't Find Word. Sorry!</h4>"
        })
})

function playSound() {
    sound.play()
}