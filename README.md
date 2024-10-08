# Documentation

Thanks for the challenge, it was fun :)

Inside this repository you'll find 3 folders:

<ul>Commentary - Contains my thought process throughout as well as my overview of my tests and the API as a whole</ul>
<ul>tests - The tests that I wrote for each of the CRUD operators<ul>
<ul>OOexperimentation - Tests written with a more emphatic adherance to OO programming. Not typically how I write tests, but it was enjoyable to try a different (and honestly better seeing as how much cleaner it looks) approach<ul>

To run these tests you'll want to start by (assuming you have node) running `npm install` in the terminal to get the playwright dependancies. 

From there, you'll then want to run npx playwright test `GET.test.ts`, replacing `GET` with whatever file and test batch you want to run.

That said, there are 2 tests in POSTDELETE that currently do not pass. This is because of a quirk with the API as it currently exists. I expand upon that in `Commentary/verdict.md`

Thanks again, that was a blast to work on!