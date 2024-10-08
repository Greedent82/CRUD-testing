import { test, expect } from '@playwright/test';
import { Helper } from './Helpers';

const validPet = {
    id: 123456,
    category: { id: 1, name: 'Dog' },
    name: 'Dougal',
    photoUrls: ['http://pretendthisisvalid.com/photo.jpg'],
    tags: [{ id: 1, name: 'test' }],
    status: 'available'
};

const updatedPet = {
    ...validPet,
    status: 'sold'
};

test.describe('helper injection', () => {
    let helper: Helper;

    test.beforeEach(async ({ request }) => {
        helper = new Helper(request);
    });

    test('E2E but with more OO', async () => {
        // POST
        const createResponse = await helper.createPet(validPet);
        const createdPet = await createResponse.json();
        expect(createResponse.ok()).toBe(true);
        expect(createdPet).toHaveProperty('id', validPet.id);

        // GET posted object
        const getResponse = await helper.getPetById(validPet.id);
        const retrievedPet = await getResponse.json();
        expect(getResponse.ok()).toBe(true);
        expect(retrievedPet).toHaveProperty('id', validPet.id);

        // Update
        const updateResponse = await helper.updatePet(updatedPet);
        const updatedPetResponse = await updateResponse.json();
        expect(updateResponse.ok()).toBe(true);
        expect(updatedPetResponse).toHaveProperty('status', 'sold');

        // GET Updated object
        const getUpdatedResponse = await helper.getPetById(validPet.id);
        const getUpdatedPet = await getUpdatedResponse.json();
        expect(getUpdatedResponse.ok()).toBe(true);
        expect(getUpdatedPet).toHaveProperty('status', 'sold');

        // Delete
        const deleteResponse = await helper.deletePet(validPet.id);
        expect(deleteResponse.ok()).toBe(true);

        // GET Deleted
        const getDeletedResponse = await helper.getPetById(validPet.id);
        expect(getDeletedResponse.status()).toBe(404);
    });
});