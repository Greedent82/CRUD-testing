import { test, expect, APIRequestContext } from '@playwright/test';

const baseUrl = 'https://petstore.swagger.io/v2/pet';

const validPet = {
    id: 123456,
    category: { id: 1, name: 'Dog' },
    name: 'Dougal',
    photoUrls: ['http://pretendthisisvalid.com/photo.jpg'],
    tags: [{ id: 1, name: 'test' }],
    status: 'available'
};

const invalidPet = {
    id: 'invalid_id', // Invalid ID type
    category: { id: 1, name: 'Dog' },
    name: 'Dougal',
    photoUrls: ['http://pretendthisisvalid.com/photo.jpg'],
    tags: [{ id: 1, name: 'test' }],
    status: 'available'
};

// Valid Data
test('POST with valid formatting', async ({ request }) => {
    const payload = await request.post(baseUrl, { data: validPet });
    const responsePet = await payload.json();
    // console.log(`API: ${JSON.stringify(responsePet, null, 2)}`);
    expect(payload.ok()).toBe(true);
    expect(responsePet).toHaveProperty('id', validPet.id);
    expect(responsePet).toHaveProperty('name', validPet.name);
    expect(responsePet).toHaveProperty('category', validPet.category);
    expect(responsePet).toHaveProperty('photoUrls', validPet.photoUrls);
    expect(responsePet).toHaveProperty('tags', validPet.tags);
    expect(responsePet).toHaveProperty('status', validPet.status);

    const deletePayload = await request.delete(`${baseUrl}/${validPet.id}`);
    expect(deletePayload.ok()).toBe(true);
});

// Invalid Data
test('POST with a unique id as string (invalid)', async ({ request }) => {
    const payload = await request.post(baseUrl, { data: invalidPet });
    const responseText = await payload.text();
    // console.log(`API response: ${responseText}`);
    expect(payload.ok()).toBe(false);
    expect(payload.status()).toBe(500); //
    expect(responseText).toContain('something bad happened');
});

// Missing Required Fields
test('Create pet with missing required fields', async ({ request }) => {
    const incompletePet = { ...validPet } as Partial<typeof validPet>; 
    delete incompletePet.name; 
    const payload = await request.post(baseUrl, { data: incompletePet });
    const responseText = await payload.text();
    // console.log(`API response: ${responseText}`);
    expect(payload.ok()).toBe(false);
    expect(payload.status()).toBe(400);
    expect(responseText).toContain('Missing required field: name'); 
});

// Duplicate Data
test('Create pet with duplicate data', async ({ request }) => {
    // First request 
    await request.post(baseUrl, { data: validPet });
    // Second request 
    const payload = await request.post(baseUrl, { data: validPet });
    const responseText = await payload.text();
    // console.log(`API response: ${responseText}`);
    expect(payload.ok()).toBe(false);
    expect(payload.status()).toBe(409);
    expect(responseText).toContain('something bad happened'); 

    const deletePayload = await request.delete(`${baseUrl}/${validPet.id}`);
    expect(deletePayload.ok()).toBe(true);
});