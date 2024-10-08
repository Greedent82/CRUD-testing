## Tests

For the most part my tests cover a decent amount of cases for the API. The biggest limitation to them feels to be most prominantly how I did not create a specific test enviroment to test the API; it all has to be done on the API directly. This isn't too bad as it meant that we categorically now know how the API behaves with a given test case. The issue that I ran into though was it made testing UPDATE / DELETE functions impossible to test in isolation without severely bad practice. In future I would definitly prefer setting up an isolated test enviroment.

## API issues

From testing, the API seems to have a few issues:

- **Duplicates** - As found by the duplicate data test in `POSTDELETE.test.ts` it seems that the API allows duplicate objects, which would make filtering extremely difficult if this were a real API

- **Missing Data** - This might be a matter of opinion, but allowing objects with missing data could be an issue. On one hand it can make the actual objects (assuming you're using the data here to be present on a website) very unprofessional. On the other hand, it would be perfectly reasonable to run into a stray that you might not have all the information for. A compromise would be something like having `Unknown` for fields with no data, in which case it'd look better on a website, make the API easier to read, and make the whole thing more testable.

- **Multiple Queries** - The API doesn't support multiple queries, which is an issue seeing as unless a customer has no preference of pet (which is fairly rare), they're always going to search for at least two paramaters. A dog that is availible for purchase is two off the bat for example. Admittadly the upshots that I can think of for that as opposed to some sort of client side filter would be of performance (since the filtering is done with a single call) and security (as you don't give the client a mass of data), but frankly those aren't too big a concern for a pet shop. 