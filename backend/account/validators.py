import os


def validate_file_extension(name):
    isValid = True

    ext = os.path.splitext(name)[1]
    valid_extension = ['.pdf']

    if not ext.lower() in valid_extension:
        isValid = False

    return isValid
