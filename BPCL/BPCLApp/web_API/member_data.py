from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt

@csrf_exempt

def member_list(request):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM member INNER JOIN member_details on member.member_id =member_details.member_id")
        columns = [col[0] for col in cursor.description]
        members = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return JsonResponse({'members': members})
