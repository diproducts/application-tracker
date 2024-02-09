from .file_validator import FileValidator

pdf_or_word_file_validator = FileValidator(
    max_size=1024 * 10**4,
    content_types=(
        'application/pdf', 'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    )
)
