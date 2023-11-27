import json
from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def transaction_view(request):
    if request.method == 'POST':
        # Assuming the data is passed in the request body as JSON
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON data'}, status=400)

        with connection.cursor() as cursor:
            # Insert data into the transaction table
            cursor.execute(
                "INSERT INTO transaction (account_id, amount, transaction_date, transaction_type, status) "
                "VALUES (%s, %s, %s, %s, %s);",
                [data.get('account_id', ''), data.get('amount', ''), data.get('transaction_date', ''),
                 data.get('transaction_type', ''), data.get('status', '')]
            )

        return JsonResponse({'message': 'Transaction data inserted successfully'}, status=201)

    return HttpResponse('Method not allowed', status=405)
