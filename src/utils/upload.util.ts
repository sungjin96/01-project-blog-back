import AWS from 'aws-sdk';
import moment from 'moment';
import config from '../config/index';

export async function uploadImage(file: File, fileName: string) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let dataUrl: string = '';
    console.log(process.env.I_DENTITY_POLL_ID);
    //아마존 S3에 저장하려면 먼저 설정을 업데이트합니다.
    AWS.config.update({
        region: config.aws.region,
        credentials: new AWS.CognitoIdentityCredentials({
            IdentityPoolId: config.aws.apiKey,
        }),
    }); // for simplicity. In prod, use loadConfigFromFile, or env variables

    const s3 = new AWS.S3();
    const params = {
        Bucket: 'sungjin-log-file-server',
        Key: `${fileName}`,
        ContentType: 'image/png',
        Body: file,
    };

    const result = await s3.upload(params, (err: any, data: any) => {
        if (err) {
            throw err;
        }
        console.log(data);
        dataUrl = data.Location;
    });

    return result;
}

export const formatFileName = (filename: string) => {
    const date = moment().format('YYYYMMDD');
    const randomString = Math.random().toString(36).substring(2, 7);
    const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newFilename = `images/${date}${randomString}${cleanFileName}`;
    return newFilename.substring(0, 60);
};
