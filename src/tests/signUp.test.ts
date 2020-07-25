import {request} from "graphql-request";
import config from "../config";

const email = "sungjin5891@gmail.com";
const password = "password";

const mutation = `
    mutation {
        signUp(email: ${email}, password: ${password})
    } 
`

test('회원가입 테스트', async () => {
    const response = await request(config.host, mutation);
    expect(response).toEqual({});
})