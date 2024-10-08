## Problem

Using your understanding of best practices, create automated tests that follow the CRUD cycle for one of the endpoint groups.

You can select whichever language and toolset you prefer although OO is preferred.

### My understanding

#### "Using your understanding of best practices"
I'm really not sure what any specific best practices are. The best I can do is work backwards from what I think a test *should* be. That is, I want to write them such that:

- The test tests an important facet of the app, and every important facet is tested.
- Negatives of these tests are also important to check for false positives I imagine.
- The test needs to be easy to ascertain what it's actually doing.
- Other generic programming best practices (const over let unless necessary etc.).

I'll have to evaluate my tests to see if it makes that criteria, but I should mostly be fine as long as I explicitly say  what I'm testing, how I'll get there, and what I'm looking for

#### Create automated test that follow the CRUD cycle for one of the endpoint groups
So automated tests for post, patch, get, and delete? And just for one of the endpoint groups, so just pets in this case I suppose.

#### You can select whichever language and toolset you prefer although OO is preferred.
OO? like object oriented? Admittedly I don't programme in that way as much as I should. It probably makes tests a hell of a lot more readable anyway, so it's probably a good idea to go into a bit of depth with it. I'll write in typescript just to get the discipline down. Playwright supports typescript too so that shouldn't be an issue 

## Redefined Problem
Create readable automated tests to verify and falsify each of POST, PATCH, GET, and DELETE for the '/pets' endpoint in Typescript and Playwright 

#### Quick API analysis

Doing a quick Postman call to the `/FindByStatus?status=(sold/availible/pending)` to take a peek at the API, it's obvious I can't test all of the pet ID endpoints; there's 5500 lines in there. What I can do is determine what to test. To take an example:

```json
{
    "id": 9223372036854689165,
    "category": {
        "id": 100,
        "name": "Dinosaur"
    },
    "name": "Tyrannosaurus",
    "photoUrls": [
        "http://en.wikipedia.org/wiki/Tyrannosaurus#/media/File:Tyrannosaurus_rex_mmartyniuk.png"
    ],
    "tags": [
        {
            "id": 100,
            "name": "reptile"
        },
        {
            "id": 101,
            "name": "dinosaur"
        }
    ],
    "status": "available"
}
```

These objects have a specific ID for the object (as is necessary), but also an ID for type of animal (category.id) that it is, some extra keys (such as a name, status, photo etc), and some tags, which, judging by reptile and dinosaur having the same ID number, uses a differnt pool of IDs.

Interestingly it seems the API either bars or simply cannot take more than one filter option.
 Something like`https://petstore.swagger.io/v2/pet/findByStatus?status=available&findByTags?tags=dog` *should* work. Either I'm missing something or filtering for multiple conditions doesn't work

 #### GET

Should probably do a GET request for each filter option such as tag, status etc. It:

<ul>Needs to respond with a status between 200 - 299<ul>
<ul>Needs to be an array (unless I'm looking for a specific object)<ul>
<ul>Needs to be an array / object of what you're actually filtering for<ul>
<ul>Needs future proofing for multiple queries<ul>

^Needs repeating for each category after providing bad data

#### POST

POST tests are a little more taxing without a test enviroment. Without one they almost necessiate a delete function to clean up the API for the next test. POSTs in my mind should:

<ul>Respond with a status between 200 - 299<ul>
<ul>Contain the exact object we just put into the API<ul>
<ul>Not take in an object with bad data<ul>
<ul>Not take in duplicate objects<ul>
<ul>Not have any field missing<ul>

#### PATCH / DELETE

Patch and delete cannot be tested in isolation whatsoever unless you start editing or deleting actual data from your API. I imagine there's some way of creating some sort of testing enviroment, but I'm not aware of how to do that. The best I can do is created a makeshift 'end to end' test of sorts of POST PATCH DELETE. While I'm there I may as well add a GET and just label it an e2e. PATCH functions should:

<ul>Respond with a status code of 200-299<ul>
<ul>Update only the specified key<ul>
<ul>Update only the specified object<ul>
<ul>See if x user has the authority to patch<ul>
<ul>Check that the object did in fact update<ul>
<ul>Throw the correct error if specified object does not exist<ul>

DELETEs should:

<ul>Respond with a status code of 200-299<ul>
<ul>Delete specified object<ul>
<ul>Throw the correct error if specified object does not exist<ul>

