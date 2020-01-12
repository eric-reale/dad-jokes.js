const cards = Array.from(document.querySelectorAll('.card-trip'));

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

cards.forEach(card => {
  card.addEventListener('mouseover', handleMouseOver);
})

cards.forEach(card => {
  card.addEventListener('mouseout', removeTransition);
})

