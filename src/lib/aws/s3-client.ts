import { db } from "@/prisma";
import AWS from "aws-sdk";

const configureAWS = () => {
    AWS.config.update({
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_KEY,
    });
    return new AWS.S3({
        params: {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
        },
        region: process.env.NEXT_PUBLIC_S3_REGION,
    });
};

const getUploadParams = (file: File, fileId: string) => ({
    Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
    Key: fileId,
    Body: file,
});

export async function uploadToS3(file: File) {
    try {
        const s3 = configureAWS();

        const fileId =
            "uploads/" + Date.now().toString() + file.name.replace("", "-");
        const currentDate = new Date().toISOString();
        const params = getUploadParams(file, fileId);

        const upload = s3
            .putObject(params)
            .on("httpUploadProgress", (evt) => {
                console.log(evt);
                console.log(
                    "Uploading file to S3..",
                    parseInt(((evt.loaded * 100) / evt.total).toString()) + "%"
                );
            })
            .promise();

        await upload.then((data) => {
            console.log("File successfully uploaded to S3", fileId);
        });

        return Promise.resolve({
            fileId,
            fileName: file.name,
            createdAt: currentDate,
        });
    } catch (error) {
        console.error("Error uploading to S3:", error);
        throw error;
    }
}

export function getS3Url(fileId: string) {
    const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${fileId}`;
    return url;
}

export async function deleteFromS3(fileId: string) {
    try {
        const s3 = configureAWS();

        const params = {
            Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
            Key: fileId,
        };

        const deleteObject = s3.deleteObject(params).promise();

        await deleteObject.then(() => {
            console.log("File successfully deleted from S3", fileId);
        });

        return Promise.resolve();
    } catch (error) {
        console.error("Error deleting from S3:", error);
        throw error;
    }
}
