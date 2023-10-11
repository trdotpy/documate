// Function to download PDF from our S3 bucket locally
import AWS from "aws-sdk";
import fs from "fs";

export async function downloadFileFromS3(fileId: string) {
    try {
        const bucketName = process.env.NEXT_PUBLIC_S3_BUCKET_NAME;
        if (!bucketName) {
            throw new Error("S3 bucket name is not defined.");
        }

        AWS.config.update({
            accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
            secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
        });
        const s3 = new AWS.S3({
            params: {
                Bucket: bucketName,
            },
            region: process.env.NEXT_PUBLIC_S3_REGION,
        });
        const params = {
            Bucket: bucketName,
            Key: fileId,
        };

        const obj = await s3.getObject(params).promise();
        const fileName = `/tmp/pdf-${Date.now()}.pdf`;
        fs.writeFileSync(fileName, obj.Body as Buffer);
        return fileName;
    } catch (error) {
        console.error(error);
        return null;
    }
}
