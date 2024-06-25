const crypto = require("crypto");
const { booking, user, flight } = require("../../models");
const { createNotification } = require("../../usecase/notification/index");

exports.getBookings = async () => {
    const data = await booking.findAll({
        include: [
            {
                model: user,
                attributes: ["id", "name", "email", "image", "phoneNumber"],
            },
            {
                model: flight,
            },
        ],
    });

    return data;
};

exports.getBookingId = async (id) => {
    const data = await booking.findOne({
        where: {
            id,
        },
        include: [
            {
                model: user,
                attributes: ["id", "name", "email", "image", "phoneNumber"],
            },
        ],
    });

    return data;
};

exports.getBookingByUserId = async (userId) => {
    const data = await booking.findAll({
        include: [
            {
                model: user,
                attributes: ["id", "name", "email", "image", "phoneNumber"],
            },
        ],
        where: { userId },
    });

    return data;
};

exports.createBooking = async (payload, t) => {
    const bookingCode = crypto.randomBytes(9).toString("hex");
    const data = await booking.create(
        { ...payload, bookingCode },
        { transaction: t },
    );

    // Kirim notifikasi jika pemesanan berhasil dibuat
    if (data) {
        const notifPayload = {
            userId: payload.userId,
            type: "booking",
            message: `Pesanan dengan kode ${bookingCode} berhasil dibuat! Segera mulai pembayaran untuk menyelesaikan pemesanan Anda.`,
        };
        await createNotification(notifPayload);
    }

    return data;
};

exports.updateBooking = async (id, payload) => {
    const data = await booking.update(payload, {
        where: {
            id,
        },
    });
    return data;
};

exports.deleteBooking = async (id) => {
    const foundBooking = await booking.findOne({
        where: {
            id,
        },
    });

    if (!foundBooking) {
        throw new Error(`Booking With id:${id} is not found`);
    }

    // Delete the airport
    await booking.destroy({
        where: {
            id,
        },
    });

    // Return the data of the deleted airport
    return foundBooking;
};
