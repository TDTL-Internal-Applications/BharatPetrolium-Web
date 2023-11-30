from django.http import JsonResponse
from django.db import connection

def get_recurring_deposits(request, member_id):
    # This view takes a member_id as a parameter and returns recurring deposits for that member
    if not member_id:
        return JsonResponse({'error': 'Member ID is required'}, status=400)
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM recurringdeposits WHERE member_id = %s", [member_id])
        columns = [col[0] for col in cursor.description]
        RD_details = [dict(zip(columns, row)) for row in cursor.fetchall()]
 
    return JsonResponse({'RD_details': RD_details})