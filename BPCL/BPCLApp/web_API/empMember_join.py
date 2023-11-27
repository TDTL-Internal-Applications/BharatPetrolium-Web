from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def emp_list(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        emp_no = data.get('emp_no', '')
        
        
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM employee  where emp_no =%s",[emp_no])
            columns = [col[0] for col in cursor.description]
            employee = [dict(zip(columns, row)) for row in cursor.fetchall()]
            
        return JsonResponse({'employee': employee})
