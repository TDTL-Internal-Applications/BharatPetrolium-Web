from django.http import JsonResponse
from django.db import connection
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json

@api_view(['GET', 'POST'])
@csrf_exempt


def member_list(request,member_id):
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM member INNER JOIN member_details ON member.member_id = member_details.member_id WHERE member.member_id = %s ", [member_id])
        columns = [col[0] for col in cursor.description]
        members = [dict(zip(columns, row)) for row in cursor.fetchall()]

    return JsonResponse({'members': members})