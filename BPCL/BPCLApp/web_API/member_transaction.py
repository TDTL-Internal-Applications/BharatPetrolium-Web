from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt



@csrf_exempt
 
def member_transaction(request,member_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM transaction WHERE account_id = %s", [member_id])
        columns = [col[0] for col in cursor.description]
        member_transaction = [dict(zip(columns, row)) for row in cursor.fetchall()]
 
    return JsonResponse({'member_transaction': member_transaction})
   