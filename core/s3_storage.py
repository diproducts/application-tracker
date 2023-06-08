from storages.backends.s3boto3 import S3Boto3Storage


class MediaStorage(S3Boto3Storage):
    bucket_name = 'application-tracker-bucket'
    location = 'media'
    file_overwrite = False
