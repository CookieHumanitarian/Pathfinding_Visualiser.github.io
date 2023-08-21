# pathfinding.github.io


Felt inspired by Clement's pathfiding visualiser and decided to try to emulate it and do everything on my own.

Challenges faced:

1. When i first started, i knew i had to create a grid for the nodes. I started copy pasting and then had a bit of a code smell and realised that it was not the best idea. I then took many hours to implement a loop that would print the number of grids for me and adjusted that in CSS. Took a bit of a while as javascript is quite a verbose and the documentation was quite hard to fully grasp on its own

2. Implementing djikstra through javascript was really difficult for me as i grasped the basic logic but did not know how to fully implement it. I finally found a solution after many hours which involved creating a class with different properties to keep track of neighbours and all. Then i had the headache of animating each node as it is being calculated in real time

3. Implementing the reset button. Boy this was a doozy and i almost gave up. I first considered just reloading the page whenever the reset button was hit but i realised it was not the best user experience. Then i had to figure out how to reset each state properly without overriding anything or any animations. I had a lot of failed attempts but after many hard hours, i finally managed to find a solution

4. I also struggled a lot and eventually failed implementing one of the most basic maze algorithms i could find which was the backtracking recursion. I spent many hours and could not wrap my head around why my code wouldnt behave how i wanted it to. decided to drop it for the time being and focus on moving forward and actually properly learning DSA. I am sure i can look back at this after a year and laugh at how i failed at something basic
