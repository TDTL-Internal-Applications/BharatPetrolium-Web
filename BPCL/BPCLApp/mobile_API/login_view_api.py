from django.shortcuts import render
from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.template import loader
import json
from django.db import connection


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        email = data.get('email', '')
        password = data.get('password', '')
    
        find_res = {}
        response={}
        
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM admin WHERE email = %s OR mobile_no = %s", [email,email])
        find_member = cursor.fetchone()
        
        if find_member:
            # Assuming find_member[1] is the password field
            if password == find_member[3]:
                if find_member[4] == "N":  # Assuming status is the third field
                    response = "Access Denied"
                else:
                    find_res = {
                        'id': find_member[0],
                        'member_name': find_member[1],
                        'member_email': find_member[2],  # Assuming doc_email is the fourth field
                        # Add other fields as needed
                    }
                    response = {"Login":"Login Successful"}
            else:
                response = {"Login":"Invalid Password"}
        else:
            response = {"Login":"User not found"}


        return JsonResponse({'response': response, 'data': find_res})

    # Handle non-POST requests
    return JsonResponse({'response': 'Invalid Request'})
