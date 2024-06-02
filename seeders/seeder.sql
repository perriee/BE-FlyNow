-- Active: 1714132218367@@127.0.0.1@5432@final_project@public
-- Insert dummy data into airlines
INSERT INTO public.airlines ("airlineCode", "airlineName", image, "createdAt", "updatedAt") VALUES
('AA', 'American Airlines', 'image_aa.png', NOW(), NOW()),
('DL', 'Delta Airlines', 'image_dl.png', NOW(), NOW()),
('UA', 'United Airlines', 'image_ua.png', NOW(), NOW());

-- Insert dummy data into airports
INSERT INTO public.airports ("airportCode", "airportName", city, country, "createdAt", "updatedAt") VALUES
('JFK', 'John F. Kennedy International Airport', 'New York', 'USA', NOW(), NOW()),
('LAX', 'Los Angeles International Airport', 'Los Angeles', 'USA', NOW(), NOW()),
('ORD', 'Hare International Airport', 'Chicago', 'USA', NOW(), NOW());

-- Insert dummy data into users
INSERT INTO public.users (name, email, password, image, "phoneNumber", "isVerified", "createdAt", "updatedAt") VALUES
('John Doe', 'john.doe@example.com', 'password1', 'image_john.png', '123-456-7890', true, NOW(), NOW()),
('Jane Smith', 'jane.smith@example.com', 'password2', 'image_jane.png', '987-654-3210', true, NOW(), NOW()),
('Alice Johnson', 'alice.johnson@example.com', 'password3', 'image_alice.png', '456-789-0123', false, NOW(), NOW());

-- Insert dummy data into flights
INSERT INTO public.flights ("flightCode", terminal, "departureAirportId", "arrivalAirportId", "airlineId", "price", "departureTime", "arrivalTime", information, "createdAt", "updatedAt") VALUES
('AA100', 'T1', 1, 2, 1, 750000, '2024-06-01 08:00:00+00', '2024-06-01 11:00:00+00', 'Non-stop', NOW(), NOW()),
('DL200', 'T2', 2, 3, 2, 850000, '2024-06-02 09:00:00+00', '2024-06-02 12:00:00+00', 'Non-stop', NOW(), NOW()),
('UA300', 'T3', 3, 1, 3, 950000, '2024-06-03 10:00:00+00', '2024-06-03 13:00:00+00', 'Non-stop', NOW(), NOW());

-- Insert dummy data into bookings
INSERT INTO public.bookings ("bookingCode", "flightId", "userId", "numAdults", "numChildren", "numBabies", "createdAt", "updatedAt") VALUES
('BK001', 1, 1, 2, 1, 0, NOW(), NOW()),
('BK002', 2, 2, 1, 0, 1, NOW(), NOW()),
('BK003', 3, 3, 1, 1, 1, NOW(), NOW());

-- Insert dummy data into passengers
INSERT INTO public.passengers (name, "dateOfBirth", nationality, "docType", "docNumber", "issuingCountry", "expiryDate", "passengerType", "createdAt", "updatedAt") VALUES
('John Doe Jr.', '2010-01-01 00:00:00+00', 'USA', 'paspor', 'P123456', 'USA', '2030-01-01 00:00:00+00', 'adult', NOW(), NOW()),
('Jane Smith Jr.', '2015-01-01 00:00:00+00', 'USA', 'paspor', 'P654321', 'USA', '2035-01-01 00:00:00+00', 'baby', NOW(), NOW()),
('Alice Johnson Jr.', '2012-01-01 00:00:00+00', 'USA', 'paspor', 'P112233', 'USA', '2032-01-01 00:00:00+00', 'children', NOW(), NOW());



-- Insert dummy data into seats
INSERT INTO public.seats ("seatCode", "seatAvailable", "flightId", "createdAt", "updatedAt") VALUES
('1B', true, 1, NOW(), NOW()),
('1A', true, 1, NOW(), NOW()),
('1C', true, 2, NOW(), NOW());

-- Insert dummy data into booking_details
INSERT INTO public.booking_details ("bookingId", "passengerId", "seatId", "createdAt", "updatedAt") VALUES
(1, 1, 1, NOW(), NOW()),
(2, 2, 2, NOW(), NOW()),
(3, 3, 3, NOW(), NOW());

-- Insert dummy data into payments
INSERT INTO public.payments ("bookingId", "paymentAmount", "paymentMethod", "paymentStatus", "createdAt", "updatedAt") VALUES
(1, 400, 'credit card', 'paid', NOW(), NOW()),
(2, 200, 'paypal', 'paid', NOW(), NOW()),
(3, 600, 'credit card', 'pending', NOW(), NOW());