from base.views.baseViews import validationError

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
                                                    
    return None