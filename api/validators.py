from django.utils.deconstruct import deconstructible
from django.template.defaultfilters import filesizeformat
from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile


@deconstructible
class FileValidator(object):
    error_messages = {
        'max_size': ("Ensure this file size is not greater than %(max_size)s. "
                     "Your file size is %(size)s."),
        'min_size': ("Ensure this file size is not less than %(min_size)s. "
                     "Your file size is %(size)s."),
        'content_type': "Files of type %(content_type)s are not supported.",
    }

    def __init__(self, max_size=None, min_size=None, content_types=()):
        self.max_size = max_size
        self.min_size = min_size
        self.content_types = content_types

    def __call__(self, data):
        if self.max_size is not None and data.size > self.max_size:
            params = {
                'max_size': filesizeformat(self.max_size),
                'size': filesizeformat(data.size),
            }
            raise ValidationError(self.error_messages['max_size'], 'max_size', params)

        if self.min_size is not None and data.size < self.min_size:
            params = {
                'min_size': filesizeformat(self.min_size),
                'size': filesizeformat(data.size),
            }
            raise ValidationError(self.error_messages['min_size'], 'min_size', params)

        if self.content_types:
            file_extension = self.get_file_extension(data)
            if file_extension not in self.content_types:
                params = {'content_type': file_extension}
                raise ValidationError(self.error_messages['content_type'], 'content_type', params)

    def get_file_extension(self, data):
        if isinstance(data, UploadedFile):
            file_name = data.name
        else:
            file_name = data.file.name
        return file_name.split('.')[-1]

    def __eq__(self, other):
        return (
            isinstance(other, FileValidator) and
            self.max_size == other.max_size and
            self.min_size == other.min_size and
            self.content_types == other.content_types
        )
    
    
pdf_or_word_file_validator = FileValidator(
    max_size=1024 * 10**4,
    content_types=('application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document')
)
