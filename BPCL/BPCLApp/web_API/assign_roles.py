from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.core.mail import send_mail
import json
import requests

@csrf_exempt
def assign_role(request):
    if request.method == 'POST':
        data = json.loads(request.body)

        emp_id = data.get('emp_id', '')
        role_id = data.get('role_id', '')
        
        with connection.cursor() as cursor:
            cursor.execute("INSERT INTO user_role (emp_id, role_id) VALUES (%s, %s)",[emp_id,role_id])
            # columns = [col[0] for col in cursor.description]
            # assign_role = [dict(zip(columns, row)) for row in cursor.fetchall()]
            
        new_assign_data = {
            'emp_id': emp_id,
            'role_id': role_id,
            
        }
            
        return JsonResponse({'assign_role': new_assign_data})