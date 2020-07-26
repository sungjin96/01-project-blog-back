import { Container, Inject, Service } from 'typedi';
import { compareBcrypt, setBcrypt } from '../utils/common.utils';
import shortId from 'shortid';
import { Request } from 'express';

import { createConfirmEmailLink, sendEmail } from '../utils/email.util';

@Service()
export default class UserService {
    @Inject('userEntity')
    private userEntity;
    @Inject('logger')
    private logger;
    @Inject('redis')
    private redis;

    constructor() {}

    async SignIn({ email, password, req }: { email: string; password: string; req: Request }): Promise<any> {
        this.logger.silly('로그인 시작...');
        try {
            this.logger.silly('유저 조회 중...');
            const user = await this.userEntity.findOne({ where: { email } });

            if (!user) {
                return {
                    error: '존재하지 않는 이메일 입니다.',
                };
            }

            const passValid = await compareBcrypt({ password, hash: user.password });

            if (!passValid) {
                return {
                    error: '비밀번호가 일치하지 않습니다. 다시 한번 확인해 주세요.',
                };
            }

            req.session!.userId = user.id;
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async SignUp({ email, password, url }): Promise<any> {
        this.logger.silly('회원가입 시작...');
        try {
            this.logger.silly('유저 조회 중...');
            const userId = await this.userEntity.findOne({ where: { email }, select: ['id'] });
            this.logger.silly('Find User result : %o', userId);

            if (userId) {
                return {
                    error: '이미 존재하는 이메일 입니다.',
                };
            }

            this.logger.silly('패스워드 암호화 중...');
            const hashPassword = await setBcrypt({ password });

            this.logger.silly('유저 정보 세팅 중 ..');
            const user = this.userEntity.create({
                email,
                password: hashPassword,
                nickName: shortId.generate(),
            });
            this.logger.silly('유저 정보 저장 중...');
            await user.save();

            // await sendEmail(email, await createConfirmEmailLink({ url, id: resultUser.id, redis: this.redis }));

            return {
                data: user,
            };
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async UserConfirmUpdate({ id }) {
        try {
            this.logger.silly('Redis에서 ID 조회 중...');
            const userId = await this.redis.get(id);
            if (userId) {
                this.logger.silly('Confirmed of user updating...');
                await this.userEntity.update({ id: userId }, { confirmed: true });
                this.logger.silly(`Redis Deleting by ID : ${id}`);
                await this.redis.del(id);
                return 'ok';
            } else {
                return 'invalid';
            }
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
