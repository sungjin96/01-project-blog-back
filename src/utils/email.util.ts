import { v4 } from 'uuid';
import IORedis from 'ioredis';
import SparkPost from 'sparkpost';
import config from '../config';
import { Container } from 'typedi';
import nodemailer from 'nodemailer';

export const createConfirmEmailLink = async ({ url, id, redis }: { url: string; id: string; redis: IORedis.Redis }) => {
    const uuid = v4();
    await redis.set(uuid, id, 'ex', 60 * 60 * 24);
    return `${url}/confirm/${uuid}`;
};

export const sendEmail = async (recipients, url) => {
    const { error } = Container.get('logger');
    try {
        const client = new SparkPost(config.sparkpost.apiKey);
        const data = await client.transmissions.send({
            options: {
                sandbox: true,
            },
            content: {
                from: 'sungjin-log-admin@sparkpostbox.com',
                subject: 'Confirm email',
                html: `
                <html>
                    <body>
                        <p>Testing SparkPost - the world's most awesomest email service!</p>
                        <a href="${url}">confirm email</a>
                    </body>
                </html>
            `,
            },
            recipients: [{ address: recipients }],
        });
    } catch (e) {
        error('🔥 error: %o', e);
        throw e;
    }
};

export const snedNodeMailer = async ({ toEmails, url }: { toEmails: string[]; url: string }) => {
    const { error } = Container.get('logger');
    try {
        let testAccount = await nodemailer.createTestAccount();

        let transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: testAccount.user, // generated ethereal user
                pass: testAccount.pass, // generated ethereal password
            },
        });

        let info = await transporter.sendMail({
            from: '"Fred Foo 👻" <foo@example.com>', // sender address
            to: toEmails.join(','), // list of receivers
            subject: '이메일 인증 | dev-log ✔', // Subject line
            text: 'Hello world?', // plain text body
            html: `
                <html>
                    <body>
                        <p>회원가입을 위해서 이메일 인증이 필요합니다.</p>
                        <a href="${url}">인증하기</a>
                    </body>
                </html>
            `,
        });

        console.log('Message sent: %s', info.messageId);

        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    } catch (e) {
        error('🔥 error: %o', e);
        throw e;
    }
};
