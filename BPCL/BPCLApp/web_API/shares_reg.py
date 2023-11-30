from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.db import connection

@api_view(['GET', 'POST'])
def shares_reg(request, member_id):
    if not member_id:
        return Response({'error': 'Member ID is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Fetch data from member and member_details tables
    with connection.cursor() as cursor:
        cursor.execute("""
            SELECT
                m.member_id,
                m.first_name,
                m.last_name,
                m.gender,
                m.birth_date,
                m.age,
                m.join_date,
                m.confirmed_on,
                m.email,
                m.pan_no,
                m.mobile_no,
                md.bank_ac_no,
                md.IFSC_code,
                md.bank_name,
                md.branch_name
            FROM
                member m
            INNER JOIN
                member_details md ON m.member_id = md.member_id
            WHERE
                m.member_id = %s
        """, [member_id])

        result = cursor.fetchone()

    if request.method == 'GET':
        if result:
            # Create a dictionary with the fetched data to pre-fill the form
            form_data = {
                'member_id': result[0],
                'first_name': result[1],
                'last_name': result[2],
                'gender': result[3],
                'birth_date': result[4],
                'age': result[5],
                'join_date': result[6],
                'confirmed_on': result[7],
                'email': result[8],
                'pan_no': result[9],
                'mobile_no': result[10],
                'bank_ac_no': result[11],
                'IFSC_code': result[12],
                'bank_name': result[13],
                'branch_name': result[14],
            }

            return Response({'form_data': form_data}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Member data not found'}, status=status.HTTP_404_NOT_FOUND)

    elif request.method == 'POST':
        # Insert data into the shareholders table upon form submission
        NumberOfShares = request.data.get('NumberOfShares')
        SharePrice = request.data.get('SharePrice')
        PurchaseDate = request.data.get('PurchaseDate')

        with connection.cursor() as cursor:
            cursor.execute("""
                INSERT INTO shareholders (member_id, NumberOfShares, SharePrice, PurchaseDate)
                VALUES (%s, %s, %s, %s)
            """, [
                member_id,  # member_id from the query result
                NumberOfShares,
                SharePrice,
                PurchaseDate,
            ])

        return Response({'success': 'Data inserted successfully'}, status=status.HTTP_201_CREATED)
