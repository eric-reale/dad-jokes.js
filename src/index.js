const cards = Array.from(document.querySelectorAll('.card-trip'));
const jokeParagraph = document.querySelector('#joke-paragraph');
const jokePunchline = document.querySelector('#joke-punchline');
const shareButtons = document.querySelector('.share-buttons');

let executed = false;

const dadJokeEndpoint = 'https://icanhazdadjoke.com';
const generalJokeEndpoing = 'https://official-joke-api.appspot.com/jokes/general/random';
const programmingJokeEndpoint = 'https://official-joke-api.appspot.com/jokes/programming/random';
const knockknockJokeEndpoint = 'https://official-joke-api.appspot.com/jokes/knock-knock/random';

function wait(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function handleMouseOver(e) {
    const cardSelected = e.currentTarget;
    const imgOnCard = cardSelected.querySelector('img');
    cardSelected.classList.add('hover');
    imgOnCard.classList.add('hover-img')
}

function removeTransition(e) {
    this.classList.remove('hover');
    const imgOnCard = this.querySelector('img');
    imgOnCard.classList.remove('hover-img');
  }

async function fetchJoke(endpoint) {
  const response = await fetch(endpoint, {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function buttonClass() {
  if (executed !== true) {
  await wait(2500);
  html = `
        <button class="animate-text icons button button-primary"><i class="icons like-button fas fa-thumbs-up"></i></button>
        <button onclick="location.href='http://facebook.com'" class="animate-text icons button"><i class="fab fa-facebook-f"></i></button>
        <button onclick="location.href='http://twitter.com'"class="animate-text icons button"><i class="fab fa-twitter"></i></button>
        <button onclick="location.href='http://reddit.com'"class="animate-text icons button"><i class="fab fa-reddit"></i></button>
  `
  if (shareButtons.innerHTML === html) return;
  shareButtons.innerHTML = html;

  const likeButton = document.querySelector('.like-button');
  likeButton.addEventListener('click', async function() {
    likeButton.style.fontSize = "22px"
    await wait(200)
    likeButton.style.fontSize = "16px"
  });
}
  executed = true;
}

async function displayJokes(jokeFetched) {
  if (jokeFetched[0].setup) {
  let joke = jokeFetched[0]
  // jokeParagraph.classList.add()
  jokeParagraph.innerHTML = `
       <h5 class="animate-text">${joke.setup}</h5>`
      await wait(2500);
      jokePunchline.innerHTML = `
      <h5 class="animate-text" style="margin-top: 15px;">${joke.punchline}</h5>`
  } else {
    let joke = jokeFetched;
    jokeParagraph.innerHTML = `
       <h5 class="animate-text">${joke[0]}${joke[1] ? "?" : ""}</h5>`
      if (joke[1]) {
      await wait(2500);
      jokePunchline.innerHTML = `
      <h5 class="animate-text" style="margin-top: 15px;">${joke[1]}</h5>`
    }
  }
}

function dadJoke(joke) {
  const splitJoke = joke.split("? ");
  return splitJoke;
}

async function handleClick(e) {
  let jokeFetched;
  jokeParagraph.classList.add('slide-up');
  jokePunchline.classList.add('slide-up');
  jokeParagraph.innerHTML = '';
  jokePunchline.innerHTML = '';
  switch (e.currentTarget.textContent.trim()) {
    case "Dad Jokes": const { joke } = await fetchJoke(dadJokeEndpoint);
      const splitJoke = dadJoke(joke);
      displayJokes(splitJoke);
      break;
    case "General Jokes": jokeFetched = await fetchJoke(generalJokeEndpoing);
      displayJokes(jokeFetched);
      break;
    case "Programming Jokes": jokeFetched = await fetchJoke(programmingJokeEndpoint);
      displayJokes(jokeFetched);
      break;
    case "Knock-Knock Jokes": jokeFetched = await fetchJoke(knockknockJokeEndpoint);
      displayJokes(jokeFetched);
      break;
    default: null;
  }
  buttonClass();
}

cards.forEach(card => {
  card.addEventListener('mouseover', handleMouseOver);
  card.addEventListener('click', handleClick);
})

cards.forEach(card => {
  card.addEventListener('mouseout', removeTransition);
  document.body.addEventListener('click', removeTransition);
})




