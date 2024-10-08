import { APIRequestContext } from '@playwright/test';

export class Helper {
    private baseUrl: string;
    private request: APIRequestContext;

    constructor(request: APIRequestContext) {
        this.baseUrl = 'https://petstore.swagger.io/v2/pet';
        this.request = request;
    }

    async createPet(pet: object) {
        const response = await this.request.post(this.baseUrl, { data: pet });
        return response;
    }

    async getPetById(id: number) {
        const response = await this.request.get(`${this.baseUrl}/${id}`);
        return response;
    }

    async updatePet(pet: object) {
        const response = await this.request.put(this.baseUrl, { data: pet });
        return response;
    }

    async deletePet(id: number) {
        const response = await this.request.delete(`${this.baseUrl}/${id}`);
        return response;
    }

    async findPetsByStatus(status: string) {
        const response = await this.request.get(`${this.baseUrl}/findByStatus?status=${status}`);
        return response;
    }

    async findPetsByTags(tags: string[]) {
        const tagsQuery = tags.join(',');
        const response = await this.request.get(`${this.baseUrl}/findByTags?tags=${tagsQuery}`);
        return response;
    }
}