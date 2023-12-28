STORAGES = {
    'default': {
        'BACKEND': 'application_tracker.project.s3_storage.MediaStorage'
    },
    'staticfiles': {
        'BACKEND': 'whitenoise.storage.CompressedManifestStaticFilesStorage'
    }
}

AWS_S3_ACCESS_KEY_ID = env('AWS_S3_ACCESS_KEY_ID')  # type: ignore # noqa: F821
AWS_S3_SECRET_ACCESS_KEY = env('AWS_S3_SECRET_ACCESS_KEY')  # type: ignore # noqa: F821
AWS_STORAGE_BUCKET_NAME = env('AWS_STORAGE_BUCKET_NAME')  # type: ignore # noqa: F821
AWS_S3_REGION_NAME = env('AWS_S3_REGION_NAME')  # type: ignore # noqa: F821
AWS_S3_SIGNATURE_VERSION = env('AWS_S3_SIGNATURE_VERSION')  # type: ignore # noqa: F821
AWS_S3_FILE_OVERWRITE = False
