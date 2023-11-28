from django.urls import path
from .web_API import views,login_view,member_registration,member_login,member_reg,member_data,mail_verification,update_member,delete_member,reset_password,emp_reg,emp_data,roles_list,empMember_join,assign_roles,MemberDashboard_data,transaction,member_names,fetch_memberid,total_amt,getDataMember,total_trans_per_month,otp_msg,new_transaction,transaction_list,member_transaction
from .mobile_API import login_view_api


urlpatterns = [
    path('login_view/', login_view.login_view, name='login_view'),
    path('login_view/', login_view_api.login_view, name='login_view'),
    
    
    path('member_registration/', member_registration.create_member, name='create_member'),
    path('member_login/', member_login.member_login, name='member_login'),
    
    path('member_reg/', member_reg.create_member, name='member_reg'),
    path('member_data/', member_data.member_list, name='member_list'),
    path('emp_data/', emp_data.emp_list, name='emp_list'),
    
   
    
    path('mail_verification/', mail_verification.forgot_password, name='forgot_password'),
    
    
    path('update_member/<int:member_id>/', update_member.update_member, name='update_member'),
    path('delete_member/<int:member_id>/', delete_member.delete_member, name='update_member_status'),
    path('reset_password/<int:member_id>/', reset_password.reset_password, name='reset_password'),
    
    path('all_memberdata/<int:member_id>/', getDataMember.member_list, name='member_list'),
    path('emp_reg/', emp_reg.create_emp, name='create_emp'),
    
    path('role_data/', roles_list.role_list, name='role_list'),
    
    path('emp_member/', empMember_join.emp_list, name='emp_list'),
    path('fetch_member/', fetch_memberid.emp_list, name='emp_list'),
    
    path('assign_role/', assign_roles.assign_role, name='assign_role'),
    
    path('Member_dashboard/', MemberDashboard_data.Member_dashboard, name='Member_dashboard'),

    path('empMember_join/', empMember_join.emp_list, name='emp_list'),
    
    path('transaction/', transaction.transaction_view, name='transaction_view'),
    
    path('member_names/', member_names.member_names, name='member_names'),
    
    path('total_amt/<int:member_id>/', total_amt.calculate_total_amount, name='total_amt'),
    path('total_trans_per_month/', total_trans_per_month.calculate_transaction_stats, name='transaction_view'),
    path('sms/<int:member_id>/', otp_msg.send_whatsapp_message, name='sms_integration'),
    path('new_transaction/', new_transaction.new_transaction, name='new_transaction'),
    path('transaction_list/', transaction_list.transaction_list, name='transaction_list'),
    path('member_transaction/<int:member_id>/', member_transaction.member_transaction, name='member_transaction'),
]
