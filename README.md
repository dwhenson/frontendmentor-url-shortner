# Frontend Mentor - Shortly URL shortening API Challenge

![Design preview for the Shortly URL shortening API coding challenge](./design/desktop-preview.jpg)

## The challenge

Your users should be able to:

- View the optimal layout for the site depending on their device's screen size
- Shorten any valid URL
- See a list of their shortened links, even after refreshing the browser
- Copy the shortened link to their clipboard in a single click
- Receive an error message the `input` field is empty

## Lessons learnt

- 💡 The validation on this API was really interesting and not like anything I'd dealt with before. There's three levels of validation going on:

  1. Check the url matches a regex and the input is not empty, and render error if not
  2. Check the api reaches the endpoint, and render an error if not
  3. Check the url is not blacklisted, and render an error if it is

  The last one was the most tricky as the the api returned data, but the `response.ok` was `false`, but rather then rejecting the response there was still data to handle. This took me a while to work out.

  You can text this will the url: https://shrtco.de/ - but beware the api is very slow to response

- 💡 I ran into a couple of specificity issues for the first time in a long while on this one. I think this could be avoided if I pay more attention to how I scope and next selectors.
- 💡 This is the first time using a 'build step' that I created myself. This also took a long time for me to get my head around. Gulp seems fine and I like that it's in JS but I already ran into npm version issues so I am a little afraid of the complexity it brings.

## Problems

I would very much welcome advice on the following issues:

- ⚠️ I have failed get the final of the three svg icons working properly. I spent a long time on this and still failed. I need to have an approach to standardize icons of different sizes.
- ⚠️ I have failed to off-set the introduction section banner image. I tried `translate` and positioning, but it always resulted in horizontal scrolling. I have not got an approach to deal with this kind of issue that I can fall back to. Any suggestions would be very much appreciated. 
- ⚠️ There's an issue with the outline styles on the links inside the main element. Again, I haven't been able to identify the problem here. I have some standard code that usually works fine. I can't workout why it is not working this time around. Suggestions here would be gratefully received! 

## Future learning

- 🙇‍♂️ Get comfortable with svgs and how to manipulate their sizes.
- 🙇‍♂️ Continue to explore Gulp and build steps.

## Resources

- 🔗 I used Andy Bell's totally full on [fully respnsive progressively enhacned burget menu ](https://piccalil.li/tutorial/build-a-fully-responsive-progressively-enhanced-burger-menu/) which is excellent.
- 🔗 This article is a great, concise explanation of [how to copy to the clipboard using JavaScript](https://flaviocopes.com/clipboard-api/).
