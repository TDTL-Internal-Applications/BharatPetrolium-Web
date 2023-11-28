from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def reset_password(request, member_id):
    if request.method == 'POST':
        data = json.loads(request.body)

        # Get the data to update from the POST data
        new_password = data.get('new_password')
        confirm_password = data.get('confirm_password')

        if new_password == confirm_password:
            with connection.cursor() as cursor:
                # Fetch the member by member_id
                cursor.execute("SELECT * FROM member WHERE member_id = %s", [member_id])
                member_data = cursor.fetchone()

                if member_data:
                    # Update the password
                    cursor.execute("UPDATE member SET password = %s WHERE member_id = %s", [new_password, member_id])

                    return JsonResponse({'message': 'Password updated successfully'})
                else:
                    return JsonResponse({'error': 'Member not found'}, status=404)
        else:
            return JsonResponse({'error': 'New password and confirm password do not match'}, status=400)
    else:
        return JsonResponse({'error': 'Invalid request method'}, status=400)
