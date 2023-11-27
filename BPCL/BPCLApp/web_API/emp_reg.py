from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.core.mail import send_mail
import json
import requests

@csrf_exempt
def create_emp(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        # ... (existing code for extracting member data)
        
        first_name = data.get('firstName', '')
        middle_name = data.get('middleName', '')
        last_name = data.get('lastName', '')
        gender = data.get('gender', '')
        opening_date = data.get('openingDate', '')
        emp_no = data.get('employeeNo', '')
        birth_date = data.get('birthDate', '')
        age = data.get('age', '')
        blood_group = data.get('bloodGroup', '')
        join_date = data.get('joinDate', '')
        confirmed_on = data.get('confirmDate', '')
        email = data.get('email', '')
        pan_no = data.get('panNo', '')
        mobile_no = data.get('mobileNumber', '')
        marital_status = data.get('maritalStatus', '')
        password = data.get('password', '')
         
        # Check if the PAN number already exists in the database
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM employee  WHERE pan_no = %s", [pan_no])
            existing_member = cursor.fetchone()

        if existing_member:
            error_message = "Member with PAN number already exists."
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM employee  WHERE pan_no = %s", [pan_no])
                data = cursor.fetchall()  # Serialize the data
            return JsonResponse({'error_message': error_message, 'data': data}, status=400)
        
          # Validations
        # if not str(age).isdigit() or int(age) < 0 or int(age) > 150:
        #     return JsonResponse({'error_message': 'Invalid age value.'}, status=400)

        # if not pan_no.isalnum() or len(pan_no) != 10:
        #     return JsonResponse({'error_message': 'Invalid PAN number.'}, status=400)

        # if not mobile_no or not str(mobile_no).isdigit() or len(str(mobile_no)) != 10:
        #     return JsonResponse({'error_message': 'Invalid mobile number.'}, status=400)

        # if password != confirm_password:
        #     return JsonResponse({'error_message': 'Passwords do not match.'}, status=400)

        # If validations pass and email and PAN number don't exist, insert a new record using a SQL query
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO employee (first_name, middle_name, last_name, gender, opening_date, 
                    emp_no, birth_date, age, blood_group, join_date, confirmed_on, email, pan_no, 
                    mobile_no, marital_status, password)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, [first_name, middle_name, last_name, gender, opening_date, emp_no, birth_date, 
                  age, blood_group, join_date, confirmed_on, email, pan_no, mobile_no, marital_status, "123456"])

     

        # Serialize the data for the newly created member and return it in the JSON response
        new_member_data = {
            'first_name': first_name,
            'middle_name': middle_name,
            'last_name': last_name,
            'gender': gender,
            'opening_date': opening_date,
            'emp_no': emp_no,
            'birth_date': birth_date,
            'age': age,
            'blood_group': blood_group,
            'join_date': join_date,
            'confirmed_on': confirmed_on,
            'email': email,
            'pan_no': pan_no,
            'mobile_no': mobile_no,
            'marital_status': marital_status,
            'password': password,  # Note: In production, it's better not to return sensitive information like passwords
            
        }

        return JsonResponse({'message': 'Employee created successfully ', 'data': new_member_data})

    # Retrieve all records using a SQL query
    with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM employee ")
            data = cursor.fetchall()  # Serialize the data
    

    return JsonResponse({'data': data})









