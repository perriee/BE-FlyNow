const paymentUsecase = require('../../usecase/payment')

exports.getPayments = async (req, res, next) => {
    try {
        const data = await paymentUsecase.getPayments()
        res.status(200).json({
            message: 'success',
            data,
        })
    } catch (error) {
        next(error)
    }
}

// exports.getPaymentById = async (req, res, next) => {
//     try {
//         const { id } = req.params

//         if (id) {
//             const data = await paymentUsecase.getPaymentById(id)
//             res.status(200).json({
//                 message: 'success',
//                 data,
//             })
//         }
//     } catch (error) {
//         next(error)
//     }
// }

exports.getPaymentByBookingId = async (req, res, next) => {
    try {
        const { bookingId } = req.params

        if (bookingId) {
            const data = await paymentUsecase.getPaymentByBookingId(bookingId)
            res.status(200).json({
                message: 'success',
                data,
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.createPayment = async (req, res, next) => {
    try {
        const data = await paymentUsecase.createPayment({ ...req.body })

        res.status(200).json({
            message: 'success',
            data,
        })
    } catch (error) {
        next(error)
    }
}

exports.deletePayment = async (req, res, next) => {
    try {
        const { id } = req.params

        if (id) {
            const data = await paymentUsecase.deletePayment(id)

            res.status(200).json({
                message: 'success',
                data,
            })
        }
    } catch (error) {
        next(error)
    }
}

exports.updatePayment = async (req, res, next) => {
    try {
        const data = await paymentUsecase.updatePayment({ ...req.body })

        res.status(200).json({
            message: 'success',
            data,
        })
    } catch (error) {
        next(error)
    }
}
