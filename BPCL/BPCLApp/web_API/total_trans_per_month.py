from django.http import JsonResponse
import json
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json


@csrf_exempt
def calculate_transaction_stats(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            member_id = data['member_id']
            month = data['month']
            #month=str(month)
            year = data['year']
            #year=str(year)

            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM transaction WHERE account_id = %s  AND YEAR(transaction_date) = %s  AND MONTH(transaction_date) = %s",[member_id,year,month])
                columns = [col[0] for col in cursor.description]
                output = [dict(zip(columns, row)) for row in cursor.fetchall()]

            return JsonResponse({'output': output})
            
        except json.JSONDecodeError as e:
            return JsonResponse({'error': f"JSON decoding error: {str(e)}"})
        except KeyError as e:
            return JsonResponse({'error': f"Missing key in request data: {str(e)}"})

    return JsonResponse({'error': 'Invalid request method'})