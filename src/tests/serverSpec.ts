import supertest from "supertest";
import app from "../server";

describe('Home URL test', ()=>{
    let originalTimeout: number;

    beforeAll(async () => {
        originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
        jasmine.DEFAULT_TIMEOUT_INTERVAL = 100000;
    });

    afterAll(() => {
        jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });

   

 it('should test the / endpoint', async ()=>{
     const request = supertest(app);
     const response = await request.get('/');
     expect(response.status).toEqual(200);
 })
})