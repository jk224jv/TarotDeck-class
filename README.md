# TarotDeck-class
A javascript-class that makes random tarotcard objects. Complete with card symbolism.

Usage:
'''
import { tarotDeck } from './TarotDeck.js'

const deck = new tarotDeck()
console.log(deck.pullCards(1))
'''

Output:
'''
[
  {
    cardTitle: 'Three of Cups',
    upright: false,
    symbolism: 'Overindulgence, gossip, isolation',
    template: { top: 1, center: 1, bottom: 1 }     
  }
]
'''
