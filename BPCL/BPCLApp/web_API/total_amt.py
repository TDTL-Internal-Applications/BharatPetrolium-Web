from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse

@csrf_exempt
def calculate_total_amount(request, member_id):
    # Initialize total_amount to 0
    total_amount = 0

    try:
        # Create a cursor object
        with connection.cursor() as cursor:
            # Query to retrieve transactions for the specified member_id
            query = f"SELECT * FROM transaction WHERE account_id = {member_id}"

            # Execute the query
            cursor.execute(query)

            # Fetch all rows from the result
            transactions = cursor.fetchall()

            # Iterate through transactions and update total_amount based on transaction_type
            for transaction in transactions:
                transaction_type = transaction[4]  # Assuming the transaction_type column is at index 4
                amount = transaction[2]  # Assuming the amount column is at index 2

                if transaction_type == 'Deposit':
                    total_amount += amount
                elif transaction_type in ('Withdrawal', 'Transfer'):
                    total_amount -= amount

            # Ensure total_amount is not below 0
            total_amount = max(total_amount, 0)

            # Create a dictionary with the data
            response_data = {
                'Total_amount': total_amount,
                'success': True
            }

            # Return the JsonResponse with the dictionary
            return JsonResponse(response_data, safe=False)

    except Exception as e:
        # Handle the exception and return an error response
        response_data = {
            'error': f"Error: {e}",
            'success': False
        }
        return JsonResponse(response_data, safe=False)
