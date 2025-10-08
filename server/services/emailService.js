import nodemailer from "nodemailer";
import Tenant from "../models/TenantSchema.model.js";
import { sendErrorResponse, sendOkResponse } from "../core/responses.js";
import dotenv from "dotenv";

dotenv.config();

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true = SSL
    auth: {
        user: process.env.GOOGLE_EMAIL,
        pass: process.env.GOOGLE_APP_PASSWORD
    },
});

export const sendEmail = async (req, res) => {
    try {
        const date = new Date();
        const hours17 = 1000 * 60 * 60 * 17;
        const plus17Hours = new Date(date.getTime() + hours17);
        const tenantDatas = await Tenant.find({ "vehicleInformation.rentalEndDate": { $lt: plus17Hours } });

        await Promise.all(
            tenantDatas.map(tenantData => {
                transporter.sendMail({
                    from: `Save Rental Motor Semarang <saverentalsmg@gmail.com>`,
                    to: tenantData.email,
                    subject: "Notifikasi Otomatis: Pengingat habis masa sewa motor kamu yah :)",
                    text: `Halo ${tenantData.name}, masa sewa motor kamu akan berakhir pada ${tenantData.vehicleInformation.rentalEndDate.toLocaleString("id-ID", {
                        timeZone: "Asia/Jakarta",
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit"
                    })}. Jangan lupa untuk mengembalikannya tepat waktu yah :). \n\n\n\nIni adalah pesan otomatis, jangan balas pesan ini. Jika Anda perlu bantuan, silakan hubungi Admin Save Rental.\n\nwa.me/6281227454993\nsaverentalsmg@gmail.com`
                })
            })
        )

        sendOkResponse(res, tenantDatas.email, "Success");
    }
    catch (err) {
        sendErrorResponse(res, { message: "Error while sending automatic notification through email" }, 500)
    }
}