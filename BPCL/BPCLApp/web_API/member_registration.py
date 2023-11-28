
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
import json

@csrf_exempt  # Disabling CSRF protection (only if necessary)
def create_member(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        first_name = data.get('first_name', '')
        middle_name = data.get('middle_name', '')
        last_name = data.get('last_name', '')
        gender = data.get('gender', '')
        opening_date = data.get('opening_date', '')
        emp_no = data.get('emp_no', '')
        birth_date = data.get('birth_date', '')
        age = data.get('age', '')
        blood_group = data.get('blood_group', '')
        join_date = data.get('join_date', '')
        confirmed_on = data.get('confirmed_on', '')
        email = data.get('email', '')
        pan_no = data.get('pan_no', '')
        mobile_no = data.get('mobile_no', '')
        marital_status = data.get('marital_status', '')
        password = data.get('password', '')
        confirm_password = data.get('confirm_password', '')


        # Check if the email or PAN number already exists in the database
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM member WHERE  pan_no = %s", [pan_no])
            existing_member = cursor.fetchone()

        if existing_member:
            error_message = "Member with PAN number already exists."
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM member")
                data = cursor.fetchall()  # Serialize the data
            return JsonResponse({'error_message': error_message, 'data': data}, status=400)
        
        
        # Validations
        if not str(age).isdigit() or int(age) < 0 or int(age) > 150:
            return JsonResponse({'error_message': 'Invalid age value.'}, status=400)

        if not pan_no.isalnum() or len(pan_no) != 10:
            return JsonResponse({'error_message': 'Invalid PAN number.'}, status=400)

        if not mobile_no.isdigit() or len(mobile_no) != 10:
            return JsonResponse({'error_message': 'Invalid mobile number.'}, status=400)

        if password != confirm_password:
            return JsonResponse({'error_message': 'Passwords do not match.'}, status=400)

        # If validations pass and email and PAN number don't exist, insert a new record using a SQL query
        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO member (first_name, middle_name, last_name, gender, opening_date, 
                    emp_no, birth_date, age, blood_group, join_date, confirmed_on, email, pan_no, 
                    mobile_no, marital_status, password)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, [first_name, middle_name, last_name, gender, opening_date, emp_no, birth_date, 
                  age, blood_group, join_date, confirmed_on, email, pan_no, mobile_no, marital_status, password])

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

        return JsonResponse({'message': 'Member created successfully', 'data': new_member_data})

    # Retrieve all records using a SQL query
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM member")
        data = cursor.fetchall()  # Serialize the data

    return JsonResponse({'data': data})

