-- Active: 1714132218367@@127.0.0.1@5432@final_project@public
-- Insert dummy data into airlines
INSERT INTO public.airlines ("airlineCode", "airlineName", "image", "createdAt", "updatedAt") VALUES
-- USA
('AA', 'American Airlines', 'image_aa.png', NOW(), NOW()),
('DL', 'Delta Airlines', 'image_dl.png', NOW(), NOW()),
('UA', 'United Airlines', 'image_ua.png', NOW(), NOW()),
-- Indonesia
('GA', 'Garuda Indonesia', 'image_ga.png', NOW(), NOW()),
('SJ', 'Sriwijaya Air', 'image_sj.png', NOW(), NOW()),
('JT', 'Lion Air', 'image_jt.png', NOW(), NOW()),
('ID', 'Batik Air', 'image_id.png', NOW(), NOW()),
('IW', 'Wings Air', 'image_iw.png', NOW(), NOW()),
('QG', 'Citilink', 'image_qg.png', NOW(), NOW()),
('KD', 'Kalstar Aviation', 'image_kd.png', NOW(), NOW()),
('IN', 'Nam Air', 'image_in.png', NOW(), NOW()),
('IP', 'Fly Indonesia', 'image_ip.png', NOW(), NOW()),
('IL', 'Trigana Air', 'image_il.png', NOW(), NOW()),
('MV', 'Pelita Air', 'image_mv.png', NOW(), NOW()),
('KI', 'Kalimantan Air Service', 'image_ki.png', NOW(), NOW()),
('XN', 'Xpress Air', 'image_xn.png', NOW(), NOW()),
('KW', 'Kartika Airlines', 'image_kw.png', NOW(), NOW()),
-- Europe
('BA', 'British Airways', 'image_ba.png', NOW(), NOW()),
('LH', 'Lufthansa', 'image_lh.png', NOW(), NOW()),
('AF', 'Air France', 'image_af.png', NOW(), NOW()),
-- Asia
('CX', 'Cathay Pacific', 'image_cx.png', NOW(), NOW()),
('SQ', 'Singapore Airlines', 'image_sq.png', NOW(), NOW()),
('NH', 'All Nippon Airways', 'image_nh.png', NOW(), NOW()),
('JL', 'Japan Airlines', 'image_jl.png', NOW(), NOW()),
('MU', 'China Eastern Airlines', 'image_mu.png', NOW(), NOW()),
('CA', 'Air China', 'image_ca.png', NOW(), NOW()),
-- Middle East
('EK', 'Emirates', 'image_ek.png', NOW(), NOW()),
('QR', 'Qatar Airways', 'image_qr.png', NOW(), NOW()),
('EY', 'Etihad Airways', 'image_ey.png', NOW(), NOW()),
-- Australia
('QF', 'Qantas', 'image_qf.png', NOW(), NOW()),
-- South America
('LA', 'LATAM Airlines', 'image_la.png', NOW(), NOW()),
('AV', 'Avianca', 'image_av.png', NOW(), NOW());


-- Insert dummy data into airports
INSERT INTO public.airports ("airportCode", "airportName", "city", "country", "createdAt", "updatedAt") VALUES
('CGK', 'Soekarno-Hatta International Airport', 'Jakarta', 'Indonesia', NOW(), NOW()),
('DPS', 'Ngurah Rai International Airport', 'Denpasar', 'Indonesia', NOW(), NOW()),
('SUB', 'Juanda International Airport', 'Surabaya', 'Indonesia', NOW(), NOW()),
('UPG', 'Sultan Hasanuddin International Airport', 'Makassar', 'Indonesia', NOW(), NOW()),
('BPN', 'Sultan Aji Muhammad Sulaiman Sepinggan International Airport', 'Balikpapan', 'Indonesia', NOW(), NOW()),
('YIA', 'Yogyakarta International Airport', 'Yogyakarta', 'Indonesia', NOW(), NOW()),
('BDO', 'Husein Sastranegara International Airport', 'Bandung', 'Indonesia', NOW(), NOW()),
('PKU', 'Sultan Syarif Kasim II International Airport', 'Pekanbaru', 'Indonesia', NOW(), NOW()),
('PLM', 'Sultan Mahmud Badaruddin II International Airport', 'Palembang', 'Indonesia', NOW(), NOW()),
('PNK', 'Supadio International Airport', 'Pontianak', 'Indonesia', NOW(), NOW()),
('BTH', 'Hang Nadim International Airport', 'Batam', 'Indonesia', NOW(), NOW()),
('SOC', 'Adi Soemarmo International Airport', 'Solo', 'Indonesia', NOW(), NOW()),
('SRG', 'Achmad Yani International Airport', 'Semarang', 'Indonesia', NOW(), NOW()),
('BKS', 'Fatmawati Soekarno Airport', 'Bengkulu', 'Indonesia', NOW(), NOW()),
('BTJ', 'Sultan Iskandar Muda International Airport', 'Banda Aceh', 'Indonesia', NOW(), NOW()),
('AMI', 'Lombok International Airport', 'Mataram', 'Indonesia', NOW(), NOW());

-- Insert dummy data into users
INSERT INTO public.users ("name", "email", "password", "image", "phoneNumber", "isVerified", "createdAt", "updatedAt") VALUES
('John Doe', 'john.doe@example.com', 'password1', 'image_john.png', '123-456-7890', true, NOW(), NOW()),
('Jane Smith', 'jane.smith@example.com', 'password2', 'image_jane.png', '987-654-3210', true, NOW(), NOW()),
('Alice Johnson', 'alice.johnson@example.com', 'password3', 'image_alice.png', '456-789-0123', false, NOW(), NOW());

-- Insert dummy data into flights
INSERT INTO public.flights ("flightCode", "terminal", "departureAirportId", "arrivalAirportId", "airlineId", "price", "departureTime", "arrivalTime", "information", "createdAt", "updatedAt") VALUES
('AA100', '1A Domestik', 1, 2, 1, 750000, '2024-06-01 08:00:00+00', '2024-06-01 11:00:00+00', '["Baggage 23kg", "Cabin Baggage 8kg", "In Flight Entertainment", "Wi-Fi"]', NOW(), NOW()),
('DL200', '2B Internasional', 2, 3, 2, 850000, '2024-06-02 09:00:00+00', '2024-06-02 12:00:00+00', '["Baggage 25kg", "Cabin Baggage 10kg", "In Flight Entertainment", "Priority Boarding"]', NOW(), NOW()),
('UA300', '3C Domestik', 3, 1, 3, 950000, '2024-06-03 10:00:00+00', '2024-06-03 13:00:00+00', '["Baggage 20kg", "Cabin Baggage 7kg", "In Flight Entertainment", "Extra Legroom"]', NOW(), NOW()),
('GA400', '1D Domestik', 4, 5, 4, 500000, '2024-06-04 06:00:00+00', '2024-06-04 09:00:00+00', '["Baggage 30kg", "Cabin Baggage 7kg", "In Flight Entertainment", "Meal Included"]', NOW(), NOW()),
('JT500', '2E Domestik', 6, 7, 5, 600000, '2024-06-05 07:00:00+00', '2024-06-05 10:00:00+00', '["Baggage 20kg", "Cabin Baggage 5kg", "Onboard Shop"]', NOW(), NOW()),
('ID600', '3F Internasional', 7, 8, 6, 700000, '2024-06-06 08:00:00+00', '2024-06-06 11:00:00+00', '["Baggage 25kg", "Cabin Baggage 8kg", "In Flight Entertainment", "Wi-Fi", "Meal Included"]', NOW(), NOW()),
('SJ700', '1G Domestik', 8, 9, 7, 550000, '2024-06-07 09:00:00+00', '2024-06-07 12:00:00+00', '["Baggage 22kg", "Cabin Baggage 7kg", "In Flight Entertainment"]', NOW(), NOW()),
('QG800', '2H Domestik', 9, 10, 8, 650000, '2024-06-08 10:00:00+00', '2024-06-08 13:00:00+00', '["Baggage 20kg", "Cabin Baggage 6kg", "In Flight Entertainment", "Wi-Fi"]', NOW(), NOW()),
('EK900', '3I Internasional', 10, 11, 20, 1200000, '2024-06-09 11:00:00+00', '2024-06-09 14:00:00+00', '["Baggage 30kg", "Cabin Baggage 12kg", "In Flight Entertainment", "Wi-Fi", "Lounge Access"]', NOW(), NOW()),
('QR1000', '1J Internasional', 11, 12, 21, 1300000, '2024-06-10 12:00:00+00', '2024-06-10 15:00:00+00', '["Baggage 35kg", "Cabin Baggage 10kg", "In Flight Entertainment", "Wi-Fi", "Meal Included", "Priority Boarding"]', NOW(), NOW()),
('AA101', '1A Domestik', 2, 3, 1, 770000, '2024-06-11 08:30:00+00', '2024-06-11 11:30:00+00', '["Baggage 22kg", "Cabin Baggage 8kg", "In Flight Entertainment"]', NOW(), NOW()),
('DL201', '2B Internasional', 3, 1, 2, 870000, '2024-06-12 09:30:00+00', '2024-06-12 12:30:00+00', '["Baggage 24kg", "Cabin Baggage 9kg", "In Flight Entertainment", "Wi-Fi"]', NOW(), NOW()),
('UA301', '3C Domestik', 1, 2, 3, 970000, '2024-06-13 10:30:00+00', '2024-06-13 13:30:00+00', '["Baggage 21kg", "Cabin Baggage 7kg", "In Flight Entertainment", "Extra Legroom"]', NOW(), NOW()),
('GA401', '1D Domestik', 5, 6, 4, 520000, '2024-06-14 06:30:00+00', '2024-06-14 09:30:00+00', '["Baggage 28kg", "Cabin Baggage 6kg", "In Flight Entertainment", "Meal Included"]', NOW(), NOW()),
('JT501', '2E Domestik', 7, 8, 5, 620000, '2024-06-15 07:30:00+00', '2024-06-15 10:30:00+00', '["Baggage 19kg", "Cabin Baggage 5kg", "Onboard Shop"]', NOW(), NOW()),
('ID601', '3F Internasional', 8, 9, 6, 720000, '2024-06-16 08:30:00+00', '2024-06-16 11:30:00+00', '["Baggage 26kg", "Cabin Baggage 8kg", "In Flight Entertainment", "Wi-Fi", "Meal Included"]', NOW(), NOW()),
('SJ701', '1G Domestik', 9, 10, 7, 570000, '2024-06-17 09:30:00+00', '2024-06-17 12:30:00+00', '["Baggage 23kg", "Cabin Baggage 7kg", "In Flight Entertainment"]', NOW(), NOW()),
('QG801', '2H Domestik', 10, 11, 8, 670000, '2024-06-18 10:30:00+00', '2024-06-18 13:30:00+00', '["Baggage 21kg", "Cabin Baggage 6kg", "In Flight Entertainment", "Wi-Fi"]', NOW(), NOW()),
('EK901', '3I Internasional', 11, 12, 20, 1220000, '2024-06-19 11:30:00+00', '2024-06-19 14:30:00+00', '["Baggage 31kg", "Cabin Baggage 12kg", "In Flight Entertainment", "Wi-Fi", "Lounge Access"]', NOW(), NOW()),
('QR1001', '1J Internasional', 12, 1, 21, 1320000, '2024-06-20 12:30:00+00', '2024-06-20 15:30:00+00', '["Baggage 36kg", "Cabin Baggage 10kg", "In Flight Entertainment", "Wi-Fi", "Meal Included", "Priority Boarding"]', NOW(), NOW()),
('AA102', '1A Domestik', 3, 1, 1, 780000, '2024-06-21 08:45:00+00', '2024-06-21 11:45:00+00', '["Baggage 24kg", "Cabin Baggage 8kg", "In Flight Entertainment", "Wi-Fi"]', NOW(), NOW()),
('DL202', '2B Internasional', 1, 2, 2, 880000, '2024-06-22 09:45:00+00', '2024-06-22 12:45:00+00', '["Baggage 26kg", "Cabin Baggage 9kg", "In Flight Entertainment", "Priority Boarding"]', NOW(), NOW()),
('UA302', '3C Domestik', 2, 3, 3, 980000, '2024-06-23 10:45:00+00', '2024-06-23 13:45:00+00', '["Baggage 22kg", "Cabin Baggage 7kg", "In Flight Entertainment", "Extra Legroom"]', NOW(), NOW()),
('GA402', '1D Domestik', 6, 7, 4, 530000, '2024-06-24 06:45:00+00', '2024-06-24 09:45:00+00', '["Baggage 29kg", "Cabin Baggage 6kg", "In Flight Entertainment", "Meal Included"]', NOW(), NOW()),
('JT502', '2E Domestik', 8, 9, 5, 630000, '2024-06-25 07:45:00+00', '2024-06-25 10:45:00+00', '["Baggage 20kg", "Cabin Baggage 5kg", "Onboard Shop"]', NOW(), NOW()),
('ID602', '3F Internasional', 9, 10, 6, 740000, '2024-06-26 08:45:00+00', '2024-06-26 11:45:00+00', '["Baggage 27kg", "Cabin Baggage 8kg", "In Flight Entertainment", "Wi-Fi", "Meal Included"]', NOW(), NOW()),
('SJ702', '1G Domestik', 10, 11, 7, 580000, '2024-06-27 09:45:00+00', '2024-06-27 12:45:00+00', '["Baggage 24kg", "Cabin Baggage 7kg", "In Flight Entertainment"]', NOW(), NOW()),
('QG802', '2H Domestik', 11, 12, 8, 680000, '2024-06-28 10:45:00+00', '2024-06-28 13:45:00+00', '["Baggage 22kg", "Cabin Baggage 6kg", "In Flight Entertainment", "Wi-Fi"]', NOW(), NOW()),
('EK902', '3I Internasional', 12, 1, 20, 1240000, '2024-06-29 11:45:00+00', '2024-06-29 14:45:00+00', '["Baggage 32kg", "Cabin Baggage 12kg", "In Flight Entertainment", "Wi-Fi", "Lounge Access"]', NOW(), NOW()),
('QR1002', '1J Internasional', 1, 2, 21, 1340000, '2024-06-30 12:45:00+00', '2024-06-30 15:45:00+00', '["Baggage 37kg", "Cabin Baggage 10kg", "In Flight Entertainment", "Wi-Fi", "Meal Included", "Priority Boarding"]', NOW(), NOW());


-- Insert dummy data into bookings
INSERT INTO public.bookings ("bookingCode", "departureFlightId", "returnFlightId", "userId", "numAdults", "numChildren", "numBabies", "createdAt", "updatedAt") VALUES
('BK001', 1, 2, 1, 2, 1, 0, NOW(), NOW()),
('BK002', 2, 1, 2, 1, 0, 1, NOW(), NOW()),
('BK003', 3, 1, 3, 1, 1, 1, NOW(), NOW());

-- Insert dummy data into passengers
INSERT INTO public.passengers ("name", "dateOfBirth", "nationality", "docType", "docNumber", "issuingCountry", "expiryDate", "passengerType", "createdAt", "updatedAt") VALUES
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