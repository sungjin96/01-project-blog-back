import { v4 } from 'uuid';
import IORedis from 'ioredis';
import SparkPost from 'sparkpost';
import config from '../config';
import { Container } from 'typedi';

export const createConfirmEmailLink = async ({ url, id, redis }: { url: string; id: string; redis: IORedis.Redis }) => {
    const uuid = v4();
    await redis.set(uuid, id, 'ex', 60 * 60 * 24);
    return `${url}/confirm/${uuid}`;
};

export const sendEmail = async (recipients, url) => {
    const { silly, error } = Container.get('logger');
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
