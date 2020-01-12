const cards = Array.from(document.querySelectorAll('.card-trip'));
const jokeParagraph = document.querySelector('#joke-paragraph');

function handleMouseOver(e) {
  // console.log(e)
    const cardSelected = e.currentTarget;
    const imgOnCard = cardSelected.querySelector('img');
    cardSelected.classList.add('hover');
    imgOnCard.classList.add('hover-img')
}

function removeTransition(e) {
    // console.log(e);
    this.classList.remove('hover');
    const imgOnCard = this.querySelector('img');
    imgOnCard.classList.remove('hover-img');
  }

async function fetchDadJoke() {
  const response = await fetch('https://icanhazdadjoke.com', {
    headers: {
      Accept: 'application/json',
    },
  });
  const data = await response.json();
  return data;
}

async function handleClick(e) {
  switch (e.currentTarget.textContent.trim()) {
    case "Dad Jokes": console.log("dad jokes");
      break;
    default: console.log('No click matches');
  }



  // const { joke } = await fetchDadJoke();
  // console.log(joke);
  // jokeHolder.textContent = joke;
  // jokeButton.textContent = randomItemFromArray(buttonText, jokeButton.textContent); // here's where you're passing in the previous one
}

cards.forEach(card => {
  card.addEventListener('mouseover', handleMouseOver);
  card.addEventListener('click', handleClick);
})

cards.forEach(card => {
  card.addEventListener('mouseout', removeTransition);
})

