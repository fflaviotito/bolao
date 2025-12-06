import nodemailer from 'nodemailer';

interface EnviarEmailDTO {
    para: string;
    assunto: string;
    corpoHtml: string;
}

export const enviarEmail = async ({ para, assunto, corpoHtml }: EnviarEmailDTO) => {
    let transportador;

    if (process.env.SMTP_HOST) {
        transportador = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT) || 587,
            secure: false,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    } else {
        const contaTeste = await nodemailer.createTestAccount();

        transportador = nodemailer.createTransport({
            host: contaTeste.smtp.host,
            port: contaTeste.smtp.port,
            secure: contaTeste.smtp.secure,
            auth: {
                user: contaTeste.user,
                pass: contaTeste.pass
            }
        });
    }

    const informacoes = await transportador.sendMail({
        from: '"Francisco Flávio" <fflavio.tito@gmail.com>',
        to: para,
        subject: assunto,
        html: corpoHtml
    });

    if (!process.env.SMTP_HOST) {
        console.log(
            '📨 Preview do E-mail (Clique para ver):',
            nodemailer.getTestMessageUrl(informacoes)
        );
    }
};
