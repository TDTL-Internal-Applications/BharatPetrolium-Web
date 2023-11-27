import requests
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import connections
import random

@csrf_exempt
def send_whatsapp_message(request, member_id):
    # Generate a random 6-digit OTP
    otp = f"{random.randint(100, 999)}-{random.randint(100, 999)}"

    # Fetch the mobile number from the database using the provided member_id
    with connections['default'].cursor() as cursor:
        try:
            cursor.execute("SELECT mobile_no FROM member WHERE member_id = %s", [member_id])
            result = cursor.fetchone()
            if result:
                mobile_number = result[0]
            else:
                return HttpResponse(f"Error: Member with member_id {member_id} does not exist")
        except Exception as e:
            return HttpResponse(f"Error: {str(e)}")

    # Set your credentials and parameters
    number = "91" + str(mobile_number)
    type = "image"
    instance_id = "6554758A0B79D"
    access_token = "651d70f986f25"
    message = f"Your WhatsApp code: {otp}\nDon't share this code with others."

    # Set the API endpoint
    url = "https://dealsms.in/api/send"

    # Set the payload data
    payload = {
        'number': number,
        'type': type,
        'instance_id': instance_id,
        'access_token': access_token,
        'message': message,
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
