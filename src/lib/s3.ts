import AWS from "aws-sdk";

export async function uploadToS3(file: File) {
  try {
    AWS.config.update({
      accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID,
      secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY,
    });

    const s3 = new AWS.S3({
      params: {
        Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME,
      },
      region: "ap-southeast-1",
    });

    const fileKey =
      "upload/" + Date.now().toString() + file.name.replaceAll(" ", "-");
    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: fileKey,
      Body: file,
    };
    const upload = await s3
      .putObject(params)
      .on("httpUploadProgress", (evt) => {
        console.log(`uploading to s3... ${(evt.loaded * 100) / evt.total}%`);
      })
      .promise();

    console.log("successfully upload to s3!!!", fileKey);
    console.log(upload);
    return Promise.resolve({
      fileKey,
      fileName: file.name,
    });
  } catch (error) {}
}

export function getS3Url(fileKey: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.ap-southeast-1.amazonaws.com/${fileKey}`;
  return url;
}
