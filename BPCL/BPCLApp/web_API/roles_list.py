from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt

def role_list(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM role ")
        columns = [col[0] for col in cursor.description]
        roles = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return JsonResponse({'roles': roles})