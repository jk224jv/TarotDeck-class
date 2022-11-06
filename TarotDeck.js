/**
 * This is the module for the standard tarotdeck. It deals (returns) tarot cards.
 *
 * @author Jimmy Karlsson <jk224jv@strudent.lnu.se>
 */

// ------------------------------------------------------------------------------
//  Type definitions
// ------------------------------------------------------------------------------
/**
 * Tarot Card.
 *
 * @typedef {object} tarotCard
 * @property {string} cardTitle - IE: 'Nine of Cups', 'The Fool', 'Seven of Staffs'...
 * @property {boolean} upright - True, the card upright. False, the card is reversed.
 * @property {string} symbolism - What is the symbolism of the card?
 * @property {cardTemplate} template - template object.
 */

/**
 * Objects telling how the cards should be displayed. I.e:
 * 7 will have 7 icons 3 top 1 center 3 bottom.
 *
 * @typedef {object} cardTemplate
 * @property {number} top - How many suit icons on the top part?
 * @property {number} center - How many suit icons on the center part?
 * @property {string} center - Dressed cards instead have their title center.
 * @property {number} bottom - How many suit icons on the bottom part?
 */

/**
 * Objects telling the meaning of each card devided by suits. I.e:
 * rods: { // minor arcana = Staffs. Cards 1 - 14
 * 1: {
 * upright: 'Creation, willpower, inspiration, desire',
 * reversed: 'Lack of energy, lack of passion, boredom'
 * }}
 *
 * @typedef {object}  rods || cogs || cups || blades || majorArcana
 * @property {number} 1 .. 14 - the value of the card.
 * - @property {string} upright - What is the significance of the card read upright?
 * - @property {string} reversed - What is the significance of the card read reversed?
 */

/**
 * The standard tarotdeck. It deals (returns) tarot cards.
 */
export class tarotDeck {
  #cardTemplates // see cardTemplate
  #cardMeanings // see rods || cogs || cups || blades || majorArcana
  #cardNames // see cardName
  #cardSuitsNames // names the suits of the minor arcana.
  #usedCards // {Number[]} - keeps track of what cards are handed out so no doubles can occurre.
  #unUsedCards // {Number[]} - keeps track of what cards are still available.

  /**
   * Initiates a new tarot deck.
   *
   * @param {string} suitNameRods - what will the rods suit be named?
   * @param {string} suitNameCoins - what will the coins suit be named?
   * @param {string} suitNameCups - what will the cups suit be named?
   * @param {string} suitNameBlades - what will the blades suit be named?
   */
  constructor (suitNameRods = 'Rods', suitNameCoins = 'Coins', suitNameCups = 'Cups', suitNameBlades = 'Blades') {
    this.#cardTemplates = {
      majorArcana: {
        top: 0,
        center: 1,
        bottom: 0
      },
      1: {
        top: 0,
        center: 1,
        bottom: 0
      },
      2: {
        top: 1,
        center: 0,
        bottom: 1
      },
      3: {
        top: 1,
        center: 1,
        bottom: 1
      },
      4: {
        top: 2,
        center: 0,
        bottom: 2
      },
      5: {
        top: 2,
        center: 1,
        bottom: 2
      },
      6: {
        top: 2,
        center: 2,
        bottom: 2
      },
      7: {
        top: 3,
        center: 1,
        bottom: 3
      },
      8: {
        top: 3,
        center: 2,
        bottom: 3
      },
      9: {
        top: 3,
        center: 3,
        bottom: 3
      },
      10: {
        top: 4,
        center: 2,
        bottom: 4
      },
      11: {
        top: 1,
        center: 'Page',
        bottom: 1
      },
      12: {
        top: 1,
        center: 'Knight',
        bottom: 1
      },
      13: {
        top: 1,
        center: 'Queen',
        bottom: 1
      },
      14: {
        top: 1,
        center: 'King',
        bottom: 1
      }
    }

    this.#cardMeanings = {
      rods: { // minor arcana = Staffs. Cards 1 - 14
        1: {
          upright: 'Creation, willpower, inspiration, desire',
          reversed: 'Lack of energy, lack of passion, boredom'
        },

        2: {
          upright: 'Planning, making decisions, leaving home',
          reversed: 'Fear of change, playing safe, bad planning'
        },

        3: {
          upright: 'Looking ahead, expansion, rapid growth',
          reversed: 'Obstacles, delays, frustration'
        },

        4: {
          upright: 'Community, home, celebration',
          reversed: 'Lack of support, transience, home conflicts'
        },

        5: {
          upright: 'Competition, rivalry, conflict',
          reversed: 'Avoiding conflict, respecting differences'
        },

        6: {
          upright: 'Victory, success, public reward',
          reversed: 'Excess pride, lack of recognition, punishment'
        },

        7: {
          upright: 'Perseverance, defensive, maintaining control',
          reversed: 'Give up, destroyed confidence, overwhelmed'
        },

        8: {
          upright: 'Rapid action, movement, quick decisions',
          reversed: 'Panic, waiting, slowdown'
        },

        9: {
          upright: 'Resilience, grit, last stand',
          reversed: 'Exhaustion, fatigue, questioning motivations'
        },

        10: {
          upright: 'Accomplishment, responsibility, burden',
          reversed: 'Inability to delegate, overstressed, burnt out'
        },

        11: {
          upright: 'Exploration, excitement, freedom',
          reversed: 'Lack of direction, procrastination, creating conflict'
        },

        12: {
          upright: 'Courage, determination, joy',
          reversed: 'Selfishness, jealousy, insecurities'
        },

        13: {
          upright: 'Action, adventure, fearlessness',
          reversed: 'Anger, impulsiveness, recklessness'
        },

        14: {
          upright: 'Big picture, leader, overcoming challenges',
          reversed: 'Impulsive, overbearing, unachievable'
        }
      },

      coins: { // minor arcana = Conins. Cards 15 - 28
        1: {
          upright: 'Opportunity, prosperity, new venture',
          reversed: 'Lost opportunity, missed chance, bad investment '
        },

        2: {
          upright: 'Balancing decisions, priorities, adapting to change',
          reversed: 'Loss of balance, disorganized, overwhelmed'
        },

        3: {
          upright: 'Teamwork, collaboration, building',
          reversed: 'Lack of teamwork, disorganized, group conflict'
        },

        4: {
          upright: 'Conservation, frugality, security',
          reversed: 'Greediness, stinginess, possessiveness'
        },

        5: {
          upright: 'Need, poverty, insecurity',
          reversed: 'Recovery, charity, improvement'
        },

        6: {
          upright: 'Charity, generosity, sharing',
          reversed: 'Strings attached, stinginess, power and domination'
        },

        7: {
          upright: 'Hard work, perseverance, diligence',
          reversed: 'Work without results, distractions, lack of rewards'
        },

        8: {
          upright: 'Apprenticeship, passion, high standards',
          reversed: 'Lack of passion, uninspired, no motivation'
        },

        9: {
          upright: 'Fruits of labor, rewards, luxury',
          reversed: 'Reckless spending, living beyond means, false success'
        },

        10: {
          upright: 'Legacy, culmination, inheritance',
          reversed: 'Fleeting success, lack of stability, lack of resources'
        },

        11: {
          upright: 'Ambition, desire, diligence',
          reversed: 'Lack of commitment, greediness, laziness'
        },

        12: {
          upright: 'Efficiency, hard work, responsibility',
          reversed: 'Laziness, obsessiveness, work without reward'
        },

        13: {
          upright: 'Practicality, creature comforts, financial security',
          reversed: 'Self-centeredness, jealousy, smothering'
        },

        14: {
          upright: 'Abundance, prosperity, security',
          reversed: 'Greed, indulgence, sensuality'
        }

      },

      cups: { // minor arcana = Cups or Containers. Cards 29 - 42
        1: {
          upright: 'New feelings, spirituality, intuition',
          reversed: 'Emotional loss, blocked creativity, emptiness'
        },

        2: {
          upright: 'Unity, partnership, connection',
          reversed: 'Imbalance, broken communication, tension'
        },

        3: {
          upright: 'Friendship, community, happiness',
          reversed: 'Overindulgence, gossip, isolation'
        },

        4: {
          upright: 'Apathy, contemplation, disconnectedness',
          reversed: 'Sudden awareness, choosing happiness, acceptance'
        },

        5: {
          upright: 'Loss, grief, self-pity',
          reversed: 'Acceptance, moving on, finding peace'
        },

        6: {
          upright: 'Familiarity, happy memories, healing',
          reversed: 'Moving forward, leaving home, independence'
        },

        7: {
          upright: 'Searching for purpose, choices, daydreaming',
          reversed: 'Lack of purpose, diversion, confusion'
        },

        8: {
          upright: 'Walking away, disillusionment, leaving behind',
          reversed: 'Avoidance, fear of change, fear of loss'
        },

        9: {
          upright: 'Satisfaction, emotional stability, luxury',
          reversed: 'Lack of inner joy, smugness, dissatisfaction'
        },

        10: {
          upright: 'Inner happiness, fulfillment, dreams coming true',
          reversed: 'Shattered dreams, broken family, domestic'
        },

        11: {
          upright: 'Happy surprise, dreamer, sensitivity',
          reversed: 'Emotional immaturity, insecurity, disappointment'
        },

        12: {
          upright: 'Following the heart, idealist, romantic',
          reversed: 'Moodiness, disappointment'
        },

        13: {
          upright: 'Compassion, calm, comfort',
          reversed: 'Martyrdom, insecurity, dependence'
        },

        14: {
          upright: 'Compassion, control, balance',
          reversed: 'Coldness, moodiness, bad advice'
        }

      },

      blades: { // minor arcana = Swords. Cards 43 - 56
        1: {
          upright: 'Breakthrough, clarity, sharp mind',
          reversed: 'Confusion, brutality, chaos'
        },

        2: {
          upright: 'Difficult choices, indecision, stalemate',
          reversed: 'Lesser of two evils, no right choice, confusion'
        },

        3: {
          upright: 'Heartbreak, suffering, grief',
          reversed: 'Recovery, forgiveness, moving on'
        },

        4: {
          upright: 'Rest, restoration, contemplation',
          reversed: 'Restlessness, burnout, stress'
        },

        5: {
          upright: 'Unbridled ambition, win at all costs, sneakiness',
          reversed: 'Lingering resentment, desire to reconcile, forgiveness'
        },

        6: {
          upright: 'Transition, leaving behind, moving on',
          reversed: 'Emotional baggage, unresolved issues, resisting transition'
        },

        7: {
          upright: 'Deception, trickery, tactics and strategy',
          reversed: 'Coming clean, rethinking approach, deception'
        },

        8: {
          upright: 'Imprisonment, entrapment, self-victimization',
          reversed: 'Self acceptance, new perspective, freedom'
        },

        9: {
          upright: 'Anxiety, hopelessness, trauma',
          reversed: 'Hope, reaching out, despair'
        },

        10: {
          upright: 'Failure, collapse, defeat',
          reversed: 'Can\'t get worse, only upwards, inevitable end'
        },

        11: {
          upright: 'Curiosity, restlessness, mental energy',
          reversed: 'Deception, manipulation, all tall'
        },

        12: {
          upright: 'Complexity, perceptiveness, clear',
          reversed: 'Cold hearted, cruel, bitterness'
        },

        13: {
          upright: 'Action, impulsiveness, defending beliefs',
          reversed: 'No direction, disregard for consequences, unpredictability'
        },

        14: {
          upright: 'Head over heart, discipline, truth',
          reversed: 'Manipulative, cruel, weakness'
        }

      },

      majorArcana: { // major arcana. Cards 57 - 78
        1: {
          name: 'The Fool',
          upright: 'Innocence, new beginnings, free spirit',
          reversed: 'Recklessness, taken advantage of, inconsideration'
        },

        2: {
          name: 'The Magician',
          upright: 'Willpower, desire, creation, manifestation',
          reversed: 'Trickery, illusions, out of touch'
        },

        3: {
          name: 'The Hight Priestess',
          upright: 'Intuitive, unconscious, inner voice',
          reversed: 'Lack of center, lost inner voice, repressed feelings'
        },

        4: {
          name: 'The Empress',
          upright: 'Motherhood, fertility, nature',
          reversed: 'Dependence, smothering, emptiness, nosiness'
        },

        5: {
          name: 'The Emperor',
          upright: 'Authority, structure, control, fatherhood',
          reversed: 'Tyranny, rigidity, coldness'
        },

        6: {
          name: 'The High Priest',
          upright: 'Tradition, conformity, morality, ethics',
          reversed: 'Rebellion, subversiveness, new approache'
        },

        7: {
          name: 'The Lovers',
          upright: 'Partnerships, duality, union',
          reversed: 'Loss of balance, one-sidedness, disharmony'
        },

        8: {
          name: 'The Chariot',
          upright: 'Direction, control, willpower',
          reversed: 'Lack of control, lack of direction, aggression'
        },

        9: {
          name: 'Strength',
          upright: 'Inner strength, bravery, compassion, focus',
          reversed: 'Self doubt, weakness, insecurity'
        },

        10: {
          name: 'The Hermit',
          upright: 'Contemplation, search for truth, inner guidance',
          reversed: 'Loneliness, isolation, lost your way'
        },

        11: {
          name: 'The Wheel of fortune',
          upright: 'Change, cycles, inevitable fate',
          reversed: 'No control, clinging to control, bad luck'
        },

        12: {
          name: 'Justice',
          upright: 'Cause and effect, clarity, truth',
          reversed: 'Dishonesty, unaccountability, unfairness'
        },

        13: {
          name: 'The Hanged Man',
          upright: 'Waiting, sacrifice, release, martyrdom',
          reversed: 'Stalling, needless sacrifice, fear of sacrifice'
        },

        14: {
          name: 'Death',
          upright: 'End of cycle, beginnings, change, metamorphosis',
          reversed: 'Fear of change, holding on, stagnation'
        },

        15: {
          name: 'Temperance',
          upright: 'Middle path, patience, finding meaning',
          reversed: 'Extremes, excess, lack of balance'
        },

        16: {
          name: 'The Devil',
          upright: 'The Unacknowledged, addiction, materialism, playfulness',
          reversed: 'Realisation, freedom, release, restoring control'
        },

        17: {
          name: 'The Tower',
          upright: 'Sudden upheaval, broken pride, disaster',
          reversed: 'Disaster avoided, delayed disaster, fear of suffering'
        },

        18: {
          name: 'The Star',
          upright: 'Hope, guidance, faith, rejuvenation',
          reversed: 'Faithlessness, being lost, discouragement, insecurity'
        },

        19: {
          name: 'The Moon',
          upright: 'Unconsciousness, illusions, intuition',
          reversed: 'Confusion, fear, misinterpretation'
        },

        20: {
          name: 'The Sun',
          upright: 'Joy, success, celebration, positivity',
          reversed: 'Negativity, depression, sadness'
        },

        21: {
          name: 'The Judgement',
          upright: 'Reflection, reckoning, awakening',
          reversed: 'Lack of self awareness, doubt, self loathing'
        },

        22: {
          name: 'The World',
          upright: 'Fulfillment, creation, harmony, completion',
          reversed: 'Incompletion, stagnation, disharmony, no closure'
        }

      }
    }

    this.#cardSuitsNames = {
      rods: suitNameRods, // card 1 - 14
      coins: suitNameCoins, // card 15 - 28
      cups: suitNameCups, // card 29 - 42
      blades: suitNameBlades // 43 - 56
    }

    this.#cardNames = {
      minorNames: {
        1: 'Ace',
        2: 'Two',
        3: 'Three',
        4: 'Four',
        5: 'Five',
        6: 'Six',
        7: 'Seven',
        8: 'Eight',
        9: 'Nine',
        10: 'Ten',
        11: 'Page',
        12: 'Knight',
        13: 'Queen',
        14: 'King'
      },

      majorNames: {
        1: 'The Fool',
        2: 'The Magician',
        3: 'The High Priestess',
        4: 'The Empress',
        5: 'The Emperor',
        6: 'The High Priest',
        7: 'The Lovers',
        8: 'The Chariot',
        9: 'Strength',
        10: 'The Hermit',
        11: 'The Wheel of Fortune',
        12: 'Justice',
        13: 'The Hanged Man',
        14: 'Death',
        15: 'Temperance',
        16: 'The Devil',
        17: 'The Tower',
        18: 'The Star',
        19: 'The Moon',
        20: 'The Sun',
        21: 'Judgement',
        22: 'The Great Work'
      }
    }
    this.#unUsedCards = []
    for (let i = 1; i < 79; i++) {
      this.#unUsedCards.push(i)
    }
    this.#usedCards = []
  }

  /**
   * Creates an array with X number of unique tarotCards.
   *
   * @param {number} cardsToPull - how many cards should be returned?
   * @returns {tarotCard[]} pulledCards - cardsToPull ammount of unique Tarot Card(s). If all cards have been pulled it will return false.
   */
  pullCards (cardsToPull) {
    if ((this.#unUsedCards.length - cardsToPull) < 0) {
      return false
    } else {
      let pulledCards = []
      while (pulledCards.length < cardsToPull) {
        const randomCard = this.#unUsedCards[Math.floor(Math.random() * this.#unUsedCards.length)]

        this.#usedCards.push(randomCard)
        const index = this.#unUsedCards.indexOf(randomCard)
        this.#unUsedCards.splice(index, 1)
        pulledCards.push(randomCard) // and the method
      }
      const tarotCards = []
      for (let cardNr = 0; cardNr < cardsToPull; cardNr++) {
        tarotCards.push(this.#objektifyCard(pulledCards[cardNr]))
      }
      return tarotCards
    }
  }

  /**
   * Factory method - interprests a card number 1 - 78 and returns a TarotCard object.
   *
   * @param {number} cardNumber - the unique numerical card identifer.
   * @returns {tarotCard} - tarotCard object.
   */
  #objektifyCard (cardNumber) {
    /**
     * Find out the suit and rank and name of the cardNumber.
     */
      if (cardNumber >= 1 && cardNumber <= 14) { // is the random card from rods?
        var cardSuit = 'rods'
        var cardRank = cardNumber
      }

      if (cardNumber >= 15 && cardNumber <= 28) { // is the random card from cogs?
        var cardSuit = 'coins'
        var cardRank = cardNumber % 14 + 1
      }

      if (cardNumber >= 29 && cardNumber <= 42) { // is the random card from cups?
        var cardSuit = 'cups'
        var cardRank = cardNumber % 14 + 1
      }

      if (cardNumber >= 43 && cardNumber <= 56) { // is the random card from blades?
        var cardSuit = 'blades'
        var cardRank = cardNumber % 14 + 1
      }

      if (cardNumber > 56) {
        var cardSuit = 'majorArcana'
        var cardRank = cardNumber - 56
        var cardName = this.#cardNames.majorNames[cardRank]
        var cardTemplate = this.#cardTemplates.majorArcana
      } else {
        var cardName = this.#cardNames.minorNames[cardRank] + ' of ' + this.#cardSuitsNames[cardSuit]
        var cardTemplate = this.#cardTemplates[cardRank]
      }

      /**
       * Find out if the card is upright or reverserd.
       */
      let isUpright = null
      let turned = null
      if (Math.random() <= 0.49999999) {
        turned = 'upright'
        isUpright = true
      } else {
        turned = 'reversed'
        isUpright = false
      }

      /**
       * Find out the symbolism of the card.
       */
      const cardSymbolism = this.#cardMeanings[cardSuit][cardRank][turned]

      /**
       * Build and return tarotCard object.
       */
      return {
        cardTitle: cardName,
        upright: isUpright,
        symbolism: cardSymbolism,
        template: cardTemplate
      }
    }

    /**
     * Restores desk to initial state. "Puts back" all the cards.
     */
     resetDeck() {
      this.#unUsedCards = []
      for (let i = 1; i < 79; i++) {
        this.#unUsedCards.push(i)
      }
      this.#usedCards = []
     }
  }
