import { Container, Inject, Service } from 'typedi';
import { compareBcrypt, setBcrypt } from '../utils/common.utils';
import shortId from 'shortid';
import { createConfirmEmailLink } from '../utils/email.util';

@Service()
export default class UserService {
    @Inject('userEntity')
    private userEntity;
    @Inject('logger')
    private logger;
    @Inject('redis')
    private redis;

    constructor() {}

    async SignUp({ email, password, url }): Promise<any> {
        this.logger.silly('SignUp Stating');
        this.logger.silly('this value : %o', { email, password });
        try {
            this.logger.silly('유저 조회중 ...');
            const user = await this.userEntity.findOne({ where: { email }, select: ['id'] });
            this.logger.silly('Find User result : %o', user);

            if (user) {
                return {
                    error: '이미 존재하는 이메일 입니다.',
                };
            }

            this.logger.silly('패스워드 암호화 중...');
            const hashPassword = await setBcrypt({ password });

            this.logger.silly('유저 정보 세팅 중 ..');
            const resultUser = this.userEntity.create({
                email,
                password: hashPassword,
                nickName: shortId.generate(),
            });
            this.logger.silly('유저 정보 저장 중...');
            await resultUser.save();

            await createConfirmEmailLink({ url, id: resultUser.id, redis: this.redis });

            return {
                data: 'true',
            };
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    async UserConfirmUpdate({ id }) {
        try {
            await this.userEntity.update({ id }, { confirmed: true });
            await this.redis.del(id);
            return 'ok';
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}
