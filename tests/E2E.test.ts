import { test, expect, APIRequestContext } from '@playwright/test';

// Valid Data
const baseUrl = 'https://petstore.swagger.io/v2/pet';

const validPet = {
    id: 123456,
    category: { id: 1, name: 'Dog' },
    name: 'Dougal',
    photoUrls: ['http://pretendthisisvalid.com/photo.jpg'],
    tags: [{ id: 1, name: 'test' }],
    status: 'available'
};

//E2E
test('Full CRUD E2E', async ({ request }) => {
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

    // PUT
    const updatedPet = { ...validPet, status: 'sold' };
    const updatePayload = await request.put(baseUrl, { data: updatedPet });
    const updatedResponsePet = await updatePayload.json();
    expect(updatePayload.ok()).toBe(true);
    expect(updatedResponsePet).toHaveProperty('id', validPet.id);
    expect(updatedResponsePet).toHaveProperty('status', 'sold');

    // GET
    const getUpdatedPayload = await request.get(`${baseUrl}/${validPet.id}`);
    const getUpdatedResponsePet = await getUpdatedPayload.json();
    expect(getUpdatedPayload.ok()).toBe(true);
    expect(getUpdatedResponsePet).toHaveProperty('id', validPet.id);
    expect(getUpdatedResponsePet).toHaveProperty('status', 'sold');

    // DELETE
    const deletePayload = await request.delete(`${baseUrl}/${validPet.id}`);
    expect(deletePayload.ok()).toBe(true);

    // GET
    const getDeletedPayload = await request.get(`${baseUrl}/${validPet.id}`);
    expect(getDeletedPayload.status()).toBe(404);
});