from django.db import connection
from django.http import JsonResponse
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode
from django.core.mail import send_mail
from django.views.decorators.csrf import csrf_exempt
import json

@csrf_exempt
def forgot_password(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        email = data.get('email', '')

        # Validate email
        if not email:
            return JsonResponse({'error': 'Email is required'}, status=400)

        # Check if the email exists in your database
        with connection.cursor() as cursor:
            cursor.execute("SELECT * FROM member WHERE email = %s", [email])
            user = cursor.fetchone()

        if not user:
            return JsonResponse({'error': 'User with this email does not exist'}, status=404)

        user_id = user[0]
        user_email = user[12]
        print(user_email)

        # Generate reset token
        #token_generator = PasswordResetTokenGenerator()
        # uidb64 = urlsafe_base64_encode(force_bytes(user_id))
        # token = token_generator.make_token(user_email)

        # Create reset link
        # reset_link = f"http://yourdomain.com/reset-password/{uidb64}/{token}/"
        text = "Test Message"

        # Send reset link to user's email
        subject = 'Password Reset'
        # message = f'Click the following link to reset your password:\n\n{reset_link}'
        message = f'Click the following link to reset your password:\n\n{text}'
        from_email = 'pr@tdtl.world'
        to_email = [user_email]
        
        print(to_email)
        try:
            send_mail(subject, message, from_email, to_email, fail_silently=False)
        except Exception as e:
            print(f"Error sending email: {e}")

        return JsonResponse({'message': 'Password reset link sent to your email'})

