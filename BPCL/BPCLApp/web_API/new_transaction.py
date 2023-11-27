from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def new_transaction(request):
    if request.method == 'POST':
        try:
            # Get data from the POST request
            data = json.loads(request.body)

            # Extract data fields (modify these based on your actual form fields)
            account_id = data.get('account_id')
            amount = data.get('amount')
            transaction_date = data.get('transaction_date')
            transaction_type = data.get('transaction_type')
            Status = data.get('Status')
        

            # Use Django's connection.cursor() to execute raw SQL queries
            with connection.cursor() as cursor:
               
                query = "INSERT INTO transaction (account_id, amount, transaction_date, transaction_type, Status ) VALUES (%s, %s, %s, %s, %s)"
                cursor.execute(query, [account_id, amount,transaction_date, transaction_type, Status ])

            return JsonResponse({'message': 'Data inserted successfully'})

        except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=500)

    return JsonResponse({'error_message': 'Invalid request method'}, status=400)
