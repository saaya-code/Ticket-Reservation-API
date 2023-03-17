# Ticket-Reservation-API
This api consists of many endpoints
/register : payload takes (email, password, name)
/login : payload takes (email, password)

/ticket/makeReservation : payload takes (trainId, departureTime, arrivalTime, from(place), to(place))
/ticket/getAvailableTickets : payload takes (from(place), to(place))
/ticket/cancelReservation/:id : query id(reservation id)


/voyage/availableSeats
