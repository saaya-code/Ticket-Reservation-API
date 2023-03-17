const request = require('supertest');
const app = require('../app');

describe('Ticket Reservation API authentication', () => {
  test('Post /login should start a new session', async () => {
    const response = await request(app).post('/Login').send({email: 'b@gmail.com', password: 'bbbbbb'});
    expect(response.status).toBe(200);   
  });
  test('Post /ticket/makeReservation should make a new reservation', async () => {
    const response = await request(app).post('/ticket/makeReservation').send({train: '64143b9e1ddef23699ad05f0', from: 'London', to: 'Tokyo', arrival: "2023-04-17T00:41:21.074+00:00", departure: "2023-03-17T00:41:21.074+00:00"});
    expect(response.body).toHaveProperty('message');
})
})
 
