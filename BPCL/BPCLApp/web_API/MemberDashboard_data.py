from django.http import JsonResponse, HttpResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def Member_dashboard(request):
    if request.method == 'POST':

        with connection.cursor() as cursor:
            cursor.execute("SELECT count(member_id) FROM member")
            columns = [col[0] for col in cursor.description]
            countMembers = [dict(zip(columns, row)) for row in cursor.fetchall()]
        with connection.cursor() as cursor:
            cursor.execute("SELECT count(transaction_id) FROM transaction WHERE transaction_type = 'Deposit' ")
            columns = [col[0] for col in cursor.description]
            DepositCount = [dict(zip(columns, row)) for row in cursor.fetchall()]
        with connection.cursor() as cursor:
            cursor.execute("SELECT count(transaction_id) FROM transaction WHERE transaction_type = 'Withdrawal' ")
            columns = [col[0] for col in cursor.description]
            WithdrawalCount = [dict(zip(columns, row)) for row in cursor.fetchall()]
            
        return JsonResponse({'countMembers': countMembers,'DepositCount':DepositCount,'WithdrawalCount':WithdrawalCount})