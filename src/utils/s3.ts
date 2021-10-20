import aws from 'aws-sdk'
import dotenv from 'dotenv'
import fs from "fs"

dotenv.config()

const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY_ID
// const bucketName = process.env.AWS_BUCKET_NAME
const bucketName = "ktmsale"
const secretAccessKey = process.env.AWS_SECRET_KEY_ID

export const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
})

export const UploadImage = async (data: any) => {
  const { createReadStream, filename, mimetype } = await data;
  const s3Location = await new Promise(async (resolve, reject) => {
    if (mimetype == 'image/jpeg' || 'image/jpg' || 'image/png') {
      const stream = createReadStream(
        {
          ContentType: 'image/jpeg',
        }
      )
      const params = {
        Bucket: bucketName,
        Body: stream,
        Key: filename,
        ContentType: mimetype,
        ContentDisposition: "inline"
      }
      const UploadResult = await s3.upload(
        params
      ).promise()

      if (UploadResult.Location) return resolve(UploadResult.Location)
      else reject(`Unable to upload image reason :- ${UploadResult}`)
    }

  })

  return s3Location
}

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

