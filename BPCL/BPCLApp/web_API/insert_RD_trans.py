from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def insert_RD_trans(request):
    if request.method == 'POST':
        try:
            # Get data from the POST request
            data = json.loads(request.body)

            # Extract data fields (modify these based on your actual form fields)
            RDID = data.get('RDID')
            TransactionDate = data.get('TransactionDate')
            TransactionType = data.get('TransactionType')
            Amount = data.get('Amount')

            # Check if RDID exists in the recurringdeposits table
            with connection.cursor() as cursor:
                cursor.execute("SELECT RDID FROM recurringdeposits WHERE RDID = %s", [RDID])
                existing_RDID = cursor.fetchone()

            if not existing_RDID:
                return JsonResponse({'error_message': 'RDID does not exist'}, status=400)

            # RDID exists, proceed with the insertion
            with connection.cursor() as cursor:
                query = "INSERT INTO recurringdeposittransactions (RDID, TransactionDate, TransactionType, Amount) VALUES (%s, %s, %s, %s)"
                cursor.execute(query, [RDID, TransactionDate, TransactionType, Amount])

            return JsonResponse({'message': 'Data inserted successfully'})

        except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=500)

    return JsonResponse({'error_message': 'Invalid request method'}, status=400)
