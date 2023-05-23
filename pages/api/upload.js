import multiparty from 'multiparty';
import fs from 'fs';
import mine from 'mime-types';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { mongooseConnect } from '@/lib/mongoose';
import { isAdminRequest } from './auth/[...nextauth]';

const BucketName = 'prado-next-ecommerce';

export default async function handle(req, res) {
    await mongooseConnect();
    await isAdminRequest(req, res)

    const form = new multiparty.Form();
    const { fields, files } = await new Promise((resolve, reject) => {
        form.parse(req, (err, fields, files) => {
            if (err) reject(err);
            resolve({ fields, files });
        });
    });
    console.log('length:', files.file.length);
    const client = new S3Client({
        region: 'sa-east-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    const links = [];
    for (const file of files.file) {
        const ext = file.originalFilename.split('.').pop();
        const newFilename = Date.now() + '.' + ext;
        await client.send(new PutObjectCommand({
            Bucket: BucketName,
            Key: newFilename,
            Body: fs.readFileSync(file.path),
            ACL: 'public-read',
            ContentType: mine.lookup(file.path),
        }));
        const link = `https://${BucketName}.s3.amazonaws.com/${newFilename}`;
        links.push(link);
    }
    return res.json({links});
}

export const config = {
    api: { bodyParser: false },
};