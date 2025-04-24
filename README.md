# Ticket Reservation API

The **Ticket Reservation API** is a robust system built with JavaScript, designed to handle ticket reservations for train journeys. The API provides endpoints for user registration, login, ticket management, and seat availability queries. 

## Features

- **User Authentication**: Register and log in securely.
- **Ticket Management**: Reserve, view, and cancel reservations.
- **Seat Availability**: Check available seats for specific journeys.

## Endpoints

### User Authentication
- **`POST /register`**  
  Registers a new user.  
  **Payload**:  
  ```json
  {
    "email": "user@example.com",
    "password": "password123",
    "name": "John Doe"
  }
  ```

- **`POST /login`**  
  Logs in an existing user.  
  **Payload**:  
  ```json
  {
    "email": "user@example.com",
    "password": "password123"
  }
  ```

### Ticket Management
- **`POST /ticket/makeReservation`**  
  Makes a new ticket reservation.  
  **Payload**:  
  ```json
  {
    "trainId": "12345",
    "departureTime": "2025-04-24T10:00:00Z",
    "arrivalTime": "2025-04-24T14:00:00Z",
    "from": "City A",
    "to": "City B"
  }
  ```

- **`GET /ticket/getAvailableTickets`**  
  Retrieves available tickets for a specific route.  
  **Payload**:  
  ```json
  {
    "from": "City A",
    "to": "City B"
  }
  ```

- **`DELETE /ticket/cancelReservation/:id`**  
  Cancels a reservation by its ID.  
  **Query Parameter**:  
  - `id`: Reservation ID

### Seat Availability
- **`POST /voyage/availableSeats`**  
  Fetches the available seats for a specific journey.  
  **Payload**:  
  ```json
  {
    "from": "City A",
    "to": "City B"
  }
  ```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/saaya-code/Ticket-Reservation-API.git
   cd Ticket-Reservation-API
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the API server:
   ```bash
   npm start
   ```

## Usage

- Use tools like Postman or cURL to test the endpoints.
- Ensure the server is running before making requests to the API.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork this repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add a meaningful message"
   ```
4. Push your branch:
   ```bash
   git push origin feature-name
   ```
5. Open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Contact

For any questions or feedback, feel free to reach out:

- **GitHub**: [saaya-code](https://github.com/saaya-code)
