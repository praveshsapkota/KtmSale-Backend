import aws from 'aws-sdk'
import dotenv from 'dotenv'

dotenv.config()

const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
const bucketName = process.env.AWS_BUCKET_NAME
const secretAccessKey = process.env.AWS_SECRET_KEY_ID

export const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
})

export const generateUploadUrl = async (imgname: string) => {
  const params = {
    Bucket: bucketName,
    Key: imgname,
    Expires: 200,
    ContentType: 'image/jpeg',
    // ACL: 'public-read',
  }

  const uploadurl = await s3.getSignedUrlPromise('putObject', params)
  return uploadurl
}
