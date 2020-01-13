const cards = Array.from(document.querySelectorAll('.card-trip'));
const jokeParagraph = document.querySelector('#joke-paragraph');
const jokePunchline = document.querySelector('#joke-punchline');
const shareButtons = document.querySelector('.share-buttons');

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
  await wait(500);
  shareButtons.innerHTML = `
        <button class="animate-text button button-primary">TH</button>
        <button class="animate-text button">FB</button>
        <button class="animate-text button">TW</button>
        <button class="animate-text button">RD</button>
  `}

async function handleClick(e) {
  let jokeFetched;
  jokeParagraph.innerHTML = '&nbsp;'
  jokePunchline.innerHTML = '&nbsp;';
  switch (e.currentTarget.textContent.trim()) {
    case "Dad Jokes": const { joke } = await fetchJoke(dadJokeEndpoint);
      jokeParagraph.textContent = joke;
      break;
    case "General Jokes": jokeFetched = await fetchJoke(generalJokeEndpoing);
      jokeFetched = jokeFetched[0];
      jokeParagraph.innerHTML = `
       <h5 class="animate-text">${jokeFetched.setup}</h5>`
      await wait(2500);
      jokePunchline.innerHTML = `
      <h5 class="animate-text" style="margin-top: 15px;">${jokeFetched.punchline}</h5>`
      break;
    case "Programming Jokes": jokeFetched = await fetchJoke(programmingJokeEndpoint);
      jokeFetched = jokeFetched[0];
      jokeParagraph.textContent = jokeFetched.setup
      await wait(2500);
      jokePunchline.textContent = jokeFetched.punchline
      break;
    case "Knock-Knock Jokes": jokeFetched = await fetchJoke(knockknockJokeEndpoint);
      jokeFetched = jokeFetched[0];
      jokeParagraph.textContent = jokeFetched.setup
      await wait(2500);
      jokePunchline.textContent = jokeFetched.punchline
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
})

