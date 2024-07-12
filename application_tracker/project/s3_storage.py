import uuid

from storages.backends.s3boto3 import S3Boto3Storage


class MediaStorage(S3Boto3Storage):
    location = 'media'

    def get_available_name(self, name, max_length=None):
        """Generate unique directory name for each file."""
        directory = str(uuid.uuid4())
        return super().get_available_name(directory + '/' + name, max_length)
