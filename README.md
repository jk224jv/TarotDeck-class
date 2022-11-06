# TarotDeck-class
###A javascript-class that makes random tarotcard objects. 
###Complete with card symbolism.
####Methods
```
.pullcards(x)
```
Returns an array with x ammount of tarrrotCard objects.
Returns false if the deck does not have enough cards.
```
.resetDeck()
```
restores the deck to initial state, ie, all cards are "put back" in the deck.

####Usage:
```
import { tarotDeck } from './TarotDeck.js'

const deck = new tarotDeck()
console.log(deck.pullCards(1))
```

####Output:
```
[
  {
    cardTitle: 'Three of Cups',
    upright: false,
    symbolism: 'Overindulgence, gossip, isolation',
    template: { top: 1, center: 1, bottom: 1 }     
  }
]
```

####Usage:
```
import { tarotDeck } from './TarotDeck.js'

const deck = new tarotDeck()
console.log(deck.pullCards(3))
```

####Output:
```
[
  {
    cardTitle: 'Death',
    upright: false,
    symbolism: 'Fear of change, holding on, stagnation',
    template: { top: 0, center: 1, bottom: 0 }
  },
  {
    cardTitle: 'The Emperor',
    upright: true,
    symbolism: 'Authority, structure, control, fatherhood',
    template: { top: 0, center: 1, bottom: 0 }
  },
  {
    cardTitle: 'Seven of Blades',
    upright: true,
    symbolism: 'Deception, trickery, tactics and strategy',
    template: { top: 3, center: 1, bottom: 3 }
  }
]
```

####Usage:
```
import { tarotDeck } from './TarotDeck.js'

const deck = new tarotDeck()
console.log(deck.pullCards(79))
```

####Output:
```
false
```
