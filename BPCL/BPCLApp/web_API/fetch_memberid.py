from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def emp_list(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        member_name = data.get('member_name', '')

        
        with connection.cursor() as cursor:
            cursor.execute("SELECT member_id FROM member  where member_name =%s",[member_name])
            columns = [col[0] for col in cursor.description]
            member_id = [dict(zip(columns, row)) for row in cursor.fetchall()]
            
        return JsonResponse({'member_id': member_id})
