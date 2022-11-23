# URL shortening API Landing Page

This is a solution to the [URL shortening API landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/art-gallery-website-yVdrZlxyA). Frontend Mentor challenges are designed to help developers improve their coding skills by building realistic projects. Assets are provided, but no guidance, and developers are free to choose any approach to solving the challenge.

This single page gave me practice with integrating with the shrtcode URL shortening API and use with browser local storage in a fun design. I also added some CSS animations and transitions to help users feel engaged with the page (both in the case of API errors and when adding responses to the document).

![Design preview for the Shortly URL shortening API coding challenge](./design/desktop-preview.jpg)

## Overview

### The challenge

Your users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message the `input` field is empty

### The solution

- [Live Site URL](https://frontendmentor-url-shortner.vercel.app/)

### Built with

- HTML, SCSS and vanilla JavaScript
- [The shrtcode API ](https://shrtco.de/)
- [Gulp](https://gulpjs.com/) - to optimise and compile the page and assets

### What I learned

- The validation on this API was really interesting and not like anything I'd dealt with before. There's three levels of validation going on:

  1. Check the url matches a regex and the input is not empty
  2. Check the API reaches the endpoint
  3. Check the url is not blacklisted

  The last one was the most tricky as the the API returned data, but the `response.ok` was `false`, but rather then rejecting the response there was still data to handle. This took me a while to work out.

  You can test this will the url: https://shrtco.de/ - but beware the API is very slow to respond.

- This is the first time using a 'build step' that I created myself. This also took a long time for me to get my head around. Gulp seems fine and I like that it's in JS but I already ran into NPM version issues so I am a little afraid of the complexity it brings.
- I have worked on applying some animations and transitions throughout the page, but this was an after thought. I need to plan these from the outset as they can influence each others working and making them work can impact the HTML structure.

### Where I got stuck

- I have failed get the final of the three svg icons working properly. I spent a long time on this and still failed. I need to have an approach to standardize icons of different sizes.
- I have struggled to off-set the introduction section banner image. I tried `translate` and positioning, but it always resulted in horizontal scrolling. I have not yet got an approach to deal with this kind of issue.

### Future learning

- 🙇‍♂️ Get comfortable with svgs and how to manipulate their sizes.
- 🙇‍♂️ Continue to explore Gulp and build steps.
- 🙇‍♂️ Keep learning animations.

## Resources

- 🔗 I used Andy Bell's totally full on [fully responsive progressively enhanced burger menu ](https://piccalil.li/tutorial/build-a-fully-responsive-progressively-enhanced-burger-menu/) which is excellent.
- 🔗 This article is a great, concise explanation of [how to copy to the clipboard using JavaScript](https://flaviocopes.com/clipboard-api/).
