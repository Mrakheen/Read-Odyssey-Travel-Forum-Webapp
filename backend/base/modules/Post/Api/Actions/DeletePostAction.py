from base.models import Post, UserProfile
from base.serializers import PostSerializer
from base.views.baseViews import error, response
import os  # Import the os module
import time

def checkPostId(id):
    checkPostExist = Post.objects.filter(id=id)

    if len(checkPostExist) > 0:
        return True
    else:
        return False

import psutil

def terminate_process_locking_file(file_path):
    target_processes = []

    for process in psutil.process_iter(attrs=['pid', 'name']):
        try:
            process_files = process.open_files()
            for file in process_files:
                if file.path == file_path:
                    target_processes.append(process)
                    break  # No need to check further for this process
        except (psutil.AccessDenied, psutil.NoSuchProcess):
            pass

    if target_processes:
        for process in target_processes:
            try:
                process.terminate()
            except psutil.NoSuchProcess:
                pass

        gone, alive = psutil.wait_procs(target_processes, timeout=5)
        for process in alive:
            process.kill()

def delete(request, pk):
    data = request.data
    user = request.user

    if not checkPostId(pk):
        return error('Post ID not found')

    post = Post.objects.get(id=pk)

    if user.id != post.user.id:
        return error('Can only delete your own posts')

    # Check if the post has an associated image
    if post.image:
        # Close the file to release any locks
        post.image.close()
        # Introduce a delay (e.g., 2 seconds)
        time.sleep(2)
        
        terminate_process_locking_file(post.image.path)

        # Delete the associated image file
        try:
            os.remove(post.image.path)
        except FileNotFoundError:
            pass

    userProfile = UserProfile.objects.get(userId=user.id)
    userProfile.numPosts -= 1
    userProfile.save()

    post.delete()

    return response('Post deleted.')

