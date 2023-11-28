from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def member_names(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT CONCAT(first_name, ' ', last_name) as full_name FROM member")
        columns = [col[0] for col in cursor.description]
        members = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return JsonResponse({'members': members})