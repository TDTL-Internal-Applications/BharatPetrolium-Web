from django.db import connection
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from rest_framework.decorators import api_view
import json

@api_view(['GET', 'POST'])
@csrf_exempt

def update_member(request, member_id):
    # Validate member_id
    if not member_id:
        return JsonResponse({'error': 'Member ID is required'}, status=400)
 
    # Fetch the existing member data
    with connection.cursor() as cursor:
        cursor.execute("SELECT * FROM member INNER JOIN member_details ON member.member_id = member_details.member_id WHERE member.member_id = %s ", [member_id])
        existing_member = cursor.fetchone()
 
    if not existing_member:
        return JsonResponse({'error': 'Member not found'}, status=404)
    
    if request.method == 'GET':
        # Send the existing member data to the frontend
        response_data = {
            'existing_member': {
                'first_name': existing_member[1],
                'middle_name': existing_member[2],
                'last_name': existing_member[3],
                'gender': existing_member[4],
                'opening_date': existing_member[5],
                'emp_no': existing_member[6],
                'birth_date': existing_member[7],
                'age': existing_member[8],
                'blood_group': existing_member[9],
                'join_date': existing_member[10],
                'confirmed_on': existing_member[11],
                'email': existing_member[12],
                'pan_no': existing_member[13],
                'mobile_no': existing_member[14],
                'marital_status': existing_member[15],
                'photoId' : existing_member[18],
                'photono' : existing_member[19],
                'Issued_at' : existing_member[20],
                'Issued_on' :  existing_member[21],
                'address_proof' : existing_member[22],
                'addressno' : existing_member[23],
                'address_issued_at' : existing_member[24],
                'address_issued_on' : existing_member[25],
                'resident_address' : existing_member[26],
                'nativeplace_address' : existing_member[27],
                'city' : existing_member[28],
                'pincode' : existing_member[29],
                'phoneno' : existing_member[30],
                'nominee_name' : existing_member[31],
                'nominee_birthdate' : existing_member[32],
                'nominee_age' : existing_member[33],
                'relation' : existing_member[34],
                'member_no' : existing_member[35],
                'member_name' : existing_member[36],
                'IFSC_code' :  existing_member[37],
                'bank_ac_no' : existing_member[38],
                'bank_name' : existing_member[39],
                'branch_name' : existing_member[40],
            }
        }
        return JsonResponse(response_data)
    
    if request.method == 'POST':
        data = json.loads(request.body)

        # Get the data to update from the POST data
        first_name = data.get('first_name', existing_member[1])
        middle_name = data.get('middle_name', existing_member[2])
        last_name = data.get('last_name', existing_member[3])
        gender =data.get('gender', existing_member[4])
        opening_date = data.get('opening_date', existing_member[5])
        emp_no = data.get('emp_no', existing_member[6])
        birth_date = data.get('birth_date', existing_member[7])
        age = data.get('age', existing_member[8])
        blood_group =data.get('blood_group', existing_member[9])
        join_date = data.get('join_date', existing_member[10])
        confirmed_on = data.get('confirmed_on', existing_member[11])
        email = data.get('email', existing_member[12])
        pan_no = data.get('pan_no', existing_member[13])
        mobile_no = data.get('mobile_no', existing_member[14])
        marital_status =data.get('marital_status', existing_member[15])
        
        
        photoId = data.get('photoId', existing_member[18])
        photono = data.get('photono', existing_member[19])
        Issued_at = data.get('Issued_at', existing_member[20])
        Issued_on = data.get('Issued_on', existing_member[21])
        address_proof = data.get('address_proof', existing_member[22])
        addressno = data.get('addressno', existing_member[23])
        address_issued_at = data.get('address_issued_at', existing_member[24])
        address_issued_on = data.get('address_issued_on', existing_member[25])
        resident_address = data.get('resident_address', existing_member[26])
        nativeplace_address = data.get('nativeplace_address', existing_member[27])
        city = data.get('city', existing_member[28])
        pincode = data.get('pincode', existing_member[29])
        phoneno = data.get('phoneno', existing_member[30])
        nominee_name = data.get('nominee_name', existing_member[31])
        nominee_birthdate = data.get('nominee_birthdate', existing_member[32])
        nominee_age = data.get('nominee_age', existing_member[33])
        relation = data.get('relation', existing_member[34])
        member_no = data.get('member_no', existing_member[35])
        member_name = data.get('member_name', existing_member[36])
        IFSC_code = data.get('IFSC_code', existing_member[37])
        bank_ac_no = data.get('bank_ac_no', existing_member[38])
        bank_name = data.get('bank_name', existing_member[39])
        branch_name = data.get('branch_name', existing_member[40])
        
        

    # Update the member record
    with connection.cursor() as cursor:
        cursor.execute(
            """UPDATE member
        INNER JOIN member_details ON member.member_id = member_details.member_id
        SET
            member.first_name = %s,
            member.middle_name = %s,
            member.last_name = %s,
            member.gender = %s,
            member.opening_date = %s,
            member.emp_no = %s,
            member.birth_date = %s,
            member.age = %s,
            member.blood_group = %s,
            member.join_date = %s,
            member.confirmed_on = %s,
            member.email = %s,
            member.pan_no = %s,
            member.mobile_no = %s,
            member.marital_status = %s,
            member_details.photoId = %s,
            member_details.photono = %s,
            member_details.Issued_at = %s,
            member_details.Issued_on = %s,
            member_details.address_proof = %s,
            member_details.addressno = %s,
            member_details.address_issued_at = %s,
            member_details.address_issued_on = %s,
            member_details.resident_address = %s,
            member_details.nativeplace_address = %s,
            member_details.city = %s,
            member_details.pincode = %s,
            member_details.phoneno = %s,
            member_details.nominee_name = %s,
            member_details.nominee_birthdate = %s,
            member_details.nominee_age = %s,
            member_details.relation = %s,
            member_details.member_no = %s,
            member_details.member_name = %s,
            member_details.IFSC_code = %s,
            member_details.bank_ac_no = %s,
            member_details.bank_name = %s,
            member_details.branch_name = %s
        WHERE member.member_id = %s""",
            [first_name, middle_name, last_name, gender, opening_date, emp_no, birth_date, age, blood_group,
             join_date, confirmed_on, email, pan_no, mobile_no, marital_status,photoId,photono,Issued_at,Issued_on,address_proof,addressno,address_issued_at,address_issued_on,resident_address,nativeplace_address,city,pincode,phoneno,nominee_name,nominee_birthdate,nominee_age,relation,member_no,member_name,IFSC_code,bank_ac_no,bank_name,branch_name, member_id]
        )
    return JsonResponse({'message': 'Member record updated successfully'})