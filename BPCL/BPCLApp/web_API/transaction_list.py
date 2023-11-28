
from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt
def transaction_list(request):
    if request.method == 'GET':
        try:
            # Use Django's connection.cursor() to execute raw SQL queries
            with connection.cursor() as cursor:
                # Write your SQL query to fetch data from the transaction table
                cursor.execute("SELECT * FROM transaction")
                
                # Fetch all rows from the cursor
                rows = cursor.fetchall()

                # Get column names from the cursor.description
                columns = [col[0] for col in cursor.description]

                # Create a list of dictionaries representing each row
                result = [dict(zip(columns, row)) for row in rows]

                return JsonResponse({'data': result})

        except Exception as e:
            return JsonResponse({'error_message': str(e)}, status=500)

    return JsonResponse({'error_message': 'Invalid request method'}, status=400)
