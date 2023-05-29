from django.conf import settings
from django.contrib import admin
from django.urls import path, include
from .views import CreateVoucherView, ChangeVoucheralert

from . import views

api_prefix = settings.API_PREFIX

urlpatterns = [
    path('admin/', admin.site.urls),
    path(f'{api_prefix}', include('users.urls')),
    path(f'{api_prefix}createVoucher/', CreateVoucherView.as_view()),
    path(f'{api_prefix}getVouchers/<int:walletID>', views.get_vouchers),
    path(f'{api_prefix}getVouchers/', views.get_all_vouchers),
    path(f'{api_prefix}getAllVouchers/', views.get_MOCK_vouchers),
    path(f'{api_prefix}deletVouchers/<int:voucher_id>', views.delete_voucher),
    path(f'{api_prefix}voucher_redeemed/<int:voucher_id>/', views.voucher_redeemed),
    path(f'{api_prefix}change_days_before_alert/<int:voucher_id>', ChangeVoucheralert.as_view()),

]
