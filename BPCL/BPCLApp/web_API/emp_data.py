from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt

def emp_list(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM employee ")
        columns = [col[0] for col in cursor.description]
        emps = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return JsonResponse({'employes': emps})