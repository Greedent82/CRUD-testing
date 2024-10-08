import { test, expect, APIRequestContext } from '@playwright/test';

const baseUrl = 'https://petstore.swagger.io/v2/pet';
const availablePets = '/findByStatus?status=available';
const dogFilter = '/findByTags?tags=dog';
const idFilter = '/9';
const badFilter = '/getByColour?colour=white';
const multipleTagsFilter = '/findByTags?tags=dog,cat';
const nonExistentIdFilter = '/999999999';
const nonExistentStatus = '/findByStatus?status=vibing';

// Read by status
test('Find by status GET request', async ({ request }) => {
    const payload = await request.get(`${baseUrl}${availablePets}`); // API call
    const filteredArray = await payload.json(); // Getting response data in a JSON / constant
    // console.log(`API response: ${JSON.stringify(filteredArray, null, 2)}`); 
    expect(payload.ok()).toBe(true); // Check for response status  
    expect(filteredArray).toBeInstanceOf(Array); // Check that it's in the format we expect (JSON Array)
    filteredArray.forEach((pet: { status: string }) => { // For each loop with some TypeScript typing
        expect(pet).toHaveProperty('status', 'available'); // And the data it produces is correct 
    });
});

// Read by tag
test('Find by tag GET request', async ({ request }) => {
    const payload = await request.get(`${baseUrl}${dogFilter}`); // API call for tag filtering
    const filteredArray = await payload.json();
    //console.log(`API response: ${JSON.stringify(filteredArray, null, 2)}`);
    expect(payload.ok()).toBe(true);                    
    expect(filteredArray).toBeInstanceOf(Array);         
    filteredArray.forEach((pet: { tags: { name: string }[] }) => { // For each loop with some TypeScript typing
        expect(pet.tags.some(tag => tag.name === 'dog')).toBe(true); // Ensure each pet has the correct tag
    });
});

// Read by ID
test('Find by ID GET request', async ({ request }) => {
    const payload = await request.get(`${baseUrl}${idFilter}`); // API call for ID filtering
    const filteredPet = await payload.json();
    // console.log(`API response: ${JSON.stringify(filteredPet, null, 2)}`); 
    expect(payload.ok()).toBe(true);                    
    expect(filteredPet).toBeInstanceOf(Object); // Since there's only one, we're looking for an object
    expect(filteredPet).toHaveProperty('id', 9); // Ensure the pet has the correct ID
});

// Bad request
test('Invalid filter GET request', async ({ request }) => {
    const payload = await request.get(`${baseUrl}${badFilter}`); // API call with invalid filter
    const responseText = await payload.text();
    // console.log(`API response: ${responseText}`); // Log the response for debugging purposes
    expect(payload.ok()).toBe(false); // Expect the response to be unsuccessful
    expect(payload.status()).toBe(404); // Expecting 404 Not Found for invalid filters
    expect(responseText).toContain('NumberFormatException'); 
});

//GET by non-existant status
test('Invalid status GET request', async ({ request }) => {
    const payload = await request.get(`${baseUrl}${nonExistentStatus}`);
    const filteredArray = await payload.json();
    // console.log(`API response: ${JSON.stringify(filteredArray, null, 2)}`);
    expect(payload.ok()).toBe(true);
    expect(filteredArray).toBeInstanceOf(Array);
    expect(filteredArray.length).toBe(0); // Expecting no results
});

test('Find by non-existent ID GET request', async ({ request }) => {
    const payload = await request.get(`${baseUrl}${nonExistentIdFilter}`);
    const responseText = await payload.text();
    // console.log(`API response: ${responseText}`);
    expect(payload.ok()).toBe(false);
    expect(payload.status()).toBe(404); // Expecting 404 Not Found for non-existent ID
    expect(responseText).toContain('Pet not found'); // Assuming the API returns 'Pet not found' message
});

test('Find by multiple tags GET request', async ({ request }) => {
    const payload = await request.get(`${baseUrl}${multipleTagsFilter}`);
    const filteredArray = await payload.json();
    // console.log(`API response: ${JSON.stringify(filteredArray, null, 2)}`);
    expect(payload.ok()).toBe(true);
    expect(filteredArray).toBeInstanceOf(Array);
    filteredArray.forEach((pet: { tags: { name: string }[] }) => {
        expect(pet.tags.some(tag => tag.name === 'dog' || tag.name === 'cat')).toBe(true);
    });
});
