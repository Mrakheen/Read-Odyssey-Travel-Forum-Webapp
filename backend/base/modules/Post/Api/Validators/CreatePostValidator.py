from base.views.baseViews import validationError

ALLOWED_IMAGE_EXTENSIONS = ['jpg', 'jpeg', 'png', 'gif']
ALLOWED_VIDEO_EXTENSIONS = ['mp4', 'avi', 'mkv']

def validate(request):
    data = request.data

    # Check if 'title' and 'content' fields are empty or contain only whitespace
    if not data.get('title') or not data['title'].strip():
        return validationError('Title is required')

    if not data.get('content') or not data['content'].strip():
        return validationError('Content is required')

    # Check if 'nsfw' is provided and is either 'y' or 'n'
    nsfw = data.get('nsfw')
    if nsfw is not None and nsfw not in ['y', 'n']:
        return validationError('Please enter y/n for nsfw')

    # Check if 'image' is present and handle validation for images or videos
    image = request.FILES.get('image')
    if image:
        # Get the file extension
        file_extension = image.name.split('.')[-1].lower()

        # Check if the file extension is allowed for both images and videos
        if file_extension not in ALLOWED_IMAGE_EXTENSIONS and file_extension not in ALLOWED_VIDEO_EXTENSIONS:
            return validationError('Invalid file format. Please upload a valid image or video.')

        # Optionally, you can also check the file size here

    return None
