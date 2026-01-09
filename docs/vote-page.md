# Vote Page

Defining specs for the individual vote page.

Expand this document as needed.

--- 

## Inspiration

Tinder style swiping cards

See: https://dribbble.com/shots/11629611-Cards-Swipe-Questionnaire as an example.

We want a dark mode version of this, without questions.

--- 

## Stack & Buffer

The vote page will display 3 cards at a time with the top card in the stack being the active card.

There will then be 7 further cards in a buffer to allow for smooth transitions when swiping.

Achieving a random order and maintaining the buffer is a challege using getRandomOrder, so a order column will be added
to the database to facilitate this.

---

## Card

Contains the title and the details of the relic effect.

Where Question 1 of 10 is currently shown, we will eventually want to show the Nightlord and the hero for this current
question
for the current MVP we are just doing generic questions.

The cards should be vertically stacked, showing a maximum of 3 progressively getting smaller.

The mobile design should be largely the same as the desktop design, just scaled down to fit the smaller screen.

---

## Buttons

Per the link above, as well as swiping left or right we also want a heart and an X button to register a vote.
