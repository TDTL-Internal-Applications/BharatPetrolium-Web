from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def delete_member(request, member_id):
    if request.method == 'PATCH':
        new_status = 'N'

        # Assuming your database table is named 'member' and has a field 'status'
        query = f"UPDATE member SET status = '{new_status}' WHERE member_id = {member_id};"

        with connection.cursor() as cursor:
            cursor.execute(query)

        return JsonResponse({'message': 'Member status updated successfully.'})

    return JsonResponse({'error': 'Invalid request method.'}, status=400)
