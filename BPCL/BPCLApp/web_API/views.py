from django.shortcuts import render
from django.shortcuts import render,redirect
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse
from django.template import loader
import json
from django.db import connection

# Create your views here.

@csrf_exempt  # Disabling CSRF protection (only if necessary)
def create(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        name = data.get('name', '')
        email = data.get('email', '')
        roll = data.get('roll', '')
        section = data.get('section', '')

        # Check if the email already exists in the database
        if Student.objects.filter(email=email).exists():
            error_message = "Email already exists."
            data = list(Student.objects.values())  # Serialize the data
            return JsonResponse({'error_message': error_message, 'data': data}, status=400)

        # If email doesn't exist, create a new Student instance and save it to the database
        student = Student(name=name, email=email, roll_number=roll, section=section)
        student.save()

        # Serialize the data for the newly created student and return it in the JSON response
        new_student_data = {
            'name': student.name,
            'email': student.email,
            'roll_number': student.roll_number,
            'section': student.section,
        }

        return JsonResponse({'message': 'Student created successfully', 'data': new_student_data})

    data = list(Student.objects.values())  # Serialize the data
    return JsonResponse({'data': data})


@csrf_exempt
def login_view(request):
    if request.method == 'POST':
        data = json.loads(request.body)
        
        email = data.get('email', '')
        password = data.get('password', '')
    
        find_res = {}
        response={}
        
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM admin WHERE email = %s", [email])
        find_member = cursor.fetchone()
        
        if find_member:
            # Assuming find_member[1] is the password field
            if password == find_member[3]:
                if find_member[4] == "N":  # Assuming status is the third field
                    response = "Access Denied"
                else:
                    find_res = {
                        'id': find_member[0],
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



def delete(request, id):
    student = Student.objects.get(id=id)
    student.delete()
    return redirect('create')


def edit(request, id):
    dataget = Student.objects.get(id=id)
    data = Student.objects.all()

    if request.method == "POST":
        name = request.POST['name']
        email = request.POST['email']
        roll = request.POST['roll']
        section = request.POST['section']

        dataget.name = name
        dataget.email = email
        dataget.roll_number = roll
        dataget.section = section
        dataget.save()

        return redirect('create')

    return render(request, 'edit.html', {'data': data, 'dataget': dataget})
