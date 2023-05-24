"""mysite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from mysite.views import CreateVoucherView, voucher_redeemed,ChangeVoucheralert
from mysite.models import Vouchers
from . import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('users.urls')),
    path('api/createVoucher/', CreateVoucherView.as_view()),
    path('api/getVouchers/<int:walletID>', views.get_vouchers),
    path('api/getVouchers/', views.get_all_vouchers),
    path('api/getAllVouchers/', views.get_MOCK_vouchers),
    path('api/deletVouchers/<int:voucher_id>', views.delete_voucher),
    path('api/voucher_redeemed/', views.voucher_redeemed),
    path('api/change_days_before_alert/<int:voucher_id>', ChangeVoucheralert.as_view()),

]
