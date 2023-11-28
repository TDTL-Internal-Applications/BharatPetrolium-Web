from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connection
from django.core.mail import send_mail
import json
import requests



@csrf_exempt
def create_member(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        
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
         
        photoId = data.get('photoId', '')
        photono = data.get('photono', '')
        Issued_at = data.get('issuedAt', '')
        Issued_on = data.get('issuedOn', '')
        address_proof = data.get('addressProof', '')
        addressno = data.get('addressno', '')
        address_issued_at = data.get('addressIssuedAt', '')
        address_issued_on = data.get('addressIssuedOn', '')
        resident_address = data.get('residentAddress', '')
        nativeplace_address = data.get('nativePlaceAddress', '')
        city = data.get('city', '')
        pincode = data.get('pinCode', '')
        phoneno = data.get('phoneNo', '')
        nominee_name = data.get('nomineeName', '')
        nominee_birthdate = data.get('nomineeBirthDate', '')
        nominee_age = data.get('nomineeAge', '')
        relation = data.get('nomineeRelation', '')
        member_no = data.get('memberNo', '')
        member_name = data.get('memberName', '')
        IFSC_code = data.get('ifscCode', '')
        bank_ac_no = data.get('bankSavingAcNo', '')
        bank_name = data.get('bankName', '')
        branch_name = data.get('branchName', '')
        
        

        # Check if the PAN number already exists in the database
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM member WHERE pan_no = %s", [pan_no])
            existing_member = cursor.fetchone()

        if existing_member:
            error_message = "Member with PAN number already exists."
            with connection.cursor() as cursor:
                cursor.execute("SELECT * FROM member WHERE pan_no = %s", [pan_no])
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
                INSERT INTO member (first_name, middle_name, last_name, gender, opening_date, 
                    emp_no, birth_date, age, blood_group, join_date, confirmed_on, email, pan_no, 
                    mobile_no, marital_status, password)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, [first_name, middle_name, last_name, gender, opening_date, emp_no, birth_date, 
                  age, blood_group, join_date, confirmed_on, email, pan_no, phoneno, marital_status, "123456"])

            # Get the ID of the newly inserted member
            cursor.execute("SELECT LAST_INSERT_ID()")
            member_id = cursor.fetchone()[0]

            # Insert data into the member_detail table
            cursor.execute("""
                INSERT INTO member_details (member_id, photoId, photono, Issued_at, 
                    Issued_on, address_proof, addressno, address_issued_at, address_issued_on, resident_address, 
                    nativeplace_address, city, pincode, phoneno, nominee_name, nominee_birthdate, nominee_age, 
                    relation, member_no, member_name, IFSC_code, bank_ac_no, bank_name, branch_name)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
            """, [member_id, photoId, 1 , Issued_at, Issued_on, address_proof, 1 ,
                address_issued_at, address_issued_on, resident_address, nativeplace_address, city, pincode, mobile_no,
                nominee_name, nominee_birthdate, nominee_age, relation, member_no, member_name, IFSC_code, bank_ac_no,
                bank_name, branch_name])
            
        
        #text = "Test Message"
        subject = 'Verification Mail'
        message = f"""Dear {first_name},
                Congratulations! You have successfully registered. We are excited to welcome you to our community.
                Here are some key details about your account:
                - Login-id: {email}
                - Password: 123456
                If you have any questions or need assistance, feel free to reach out to our support team.
                Best regards,
                BPCL"""
        from_email = 'pr@tdtl.world'
        to_email = [email]
        
        try:
            send_mail(subject, message, from_email, to_email, fail_silently=False)
        except Exception as e:
            print(f"Error sending email: {e}")
            
        send_whatsapp_message(mobile_no,first_name,email)

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
            'password': password,  
            
            'photoId': photoId,
            'photono': photono,
            'Issued_at': Issued_at,
            'Issued_on': Issued_on,
            'address_proof': address_proof,
            'addressno': addressno,
            'address_issued_at': address_issued_at,
            'address_issued_on': address_issued_on,
            'resident_address': resident_address,
            'nativeplace_address': nativeplace_address,
            'city': city,
            'pincode': pincode,
            'phoneno': phoneno,
            'nominee_name': nominee_name,
            'nominee_birthdate': nominee_birthdate,
            'nominee_age': nominee_age,
            'relation': relation,
            'member_no': member_no,
            'member_name': member_name,
            'IFSC_code': IFSC_code,
            'bank_ac_no': bank_ac_no,
            'bank_name': bank_name,
            'branch_name': branch_name,
        }

        return JsonResponse({'message': 'Member created successfully &Verification Mail sent to your email', 'data': new_member_data})

    # Retrieve all records using a SQL query
    with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM member ")
            data = cursor.fetchall()  # Serialize the data
    

    return JsonResponse({'data': data})




@csrf_exempt
def send_whatsapp_message(mobile_number,first_name,email):
    

    # Set your credentials and parameters
    number = "91" + str(mobile_number)
    type = "image"
    instance_id = "6554758A0B79D"
    access_token = "651d70f986f25"
    whatsapp_message = f"""Dear {first_name},
                Congratulations! You have successfully registered. We are excited to welcome you to our community.
                Here are some key details about your account:
                - Login-id: {email}
                - Password: 123456
                If you have any questions or need assistance, feel free to reach out to our support team.
                Best regards,
                BPCL"""
    # Set the API endpoint
    url = "https://dealsms.in/api/send"

    # Set the payload data
    payload = {
        'number': number,
        'type': type,
        'instance_id': instance_id,
        'access_token': access_token,
        'message': whatsapp_message,
    }

    try:
        # Make a POST request using the requests library
        response = requests.post(url, data=payload)

        # Check the status code of the response
        if response.status_code == 200:
            # Success: You can handle the response data if needed
            return HttpResponse(f"WhatsApp code sent successfully to {mobile_number}")
        else:
            # Handle the error
            return HttpResponse(f"Error: {response.status_code} - {response.text}")
    except Exception as e:
        # Handle exceptions
        return HttpResponse(f"Error: {str(e)}")


