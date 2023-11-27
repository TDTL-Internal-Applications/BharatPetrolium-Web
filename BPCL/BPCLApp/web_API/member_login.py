from django.shortcuts import render
from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.template import loader
import json
from django.db import connection


@csrf_exempt
def member_login(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        email = data.get('email', '')
        password = data.get('password', '')
    
        find_res = {}
        response={}
        
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM member WHERE email = %s", [email])
        find_member = cursor.fetchone()
        
        if find_member:
            # Assuming find_member[1] is the password field
            if password == find_member[16]:
                if find_member[18] == "N":  # Assuming status is the third field
                    response = "Access Denied"
                else:
                    find_res = {
                        'id': find_member[0],
                        'first_name': find_member[1],
                        'last_name': find_member[3],
                        'birth_date': find_member[7],
                        'blood_group': find_member[9],
                        'join_date': find_member[10],
                        'member_email': find_member[12],
                        'pan_number': find_member[13],
                        'mobile_number': find_member[14]
                        
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
