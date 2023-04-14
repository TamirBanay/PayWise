from django.shortcuts import render
from rest_framework import status
from rest_framework import generics
from users.models import Wallet
from mysite.models import PayWiseUser, VoucherCategory, StoreType, Store, Vouchers, Alerts
from mysite.serializers import VoucherCategorySerializer, StoreTypeSerializer, StoreSerializer,  AlertsSerializer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from .models import TemporaryVoucher
from .serializers import VoucherSerializer
import jwt
from django.contrib.auth import get_user_model
from django.shortcuts import render, redirect
from .forms import VoucherForm
from rest_framework.views import APIView


class CreateVoucherView(APIView):
    def post(self, request):
        serializer = VoucherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# def add_voucher(request):
#     if request.method == 'POST':
#         form = VoucherForm(request.user, request.POST)
#         if form.is_valid():
#             voucher = form.save(commit=False)
#             voucher.walletID = form.cleaned_data['walletID']
#             voucher.save()
#             return redirect('voucher_list')
#     else:
#         form = VoucherForm(request.user)
#     return render(request, 'add_voucher.html', {'form': form})


# def voucher_view(request):
#     jwt_token = request.COOKIES.get('jwt')
#     if not jwt_token:
#         "expired_token"
#         pass
#     else:
#         try:
#             user_id = jwt_token.get("id")
#         except jwt.exceptions.DecodeError:
#             pass
#         else:
#             User = get_user_model()
#             user = User.objects.get(id=user_id)
#             wallet = Wallet.objects.get(user=user)
#             vouchers = Vouchers.objects.filter(Wallet=Wallet)
#             return render(request, "voucher.html", {"vouchers": vouchers})


# @ api_view(['GET'])
# @ renderer_classes([JSONRenderer])
# def get_Vouchers(_, voucherID, walletID):
#     serializer = VouchersSerializer(Vouchers)
#     return Response(serializer.data, status=status.HTTP_200_OK)


# @ api_view(['POST'])
# def create_temporary_voucher(request):
#     # Parse the request data
#     storeName = request.data.get('storeName')
#     expiration_date = request.data.get('expiration_date')
#     price = request.data.get('price')

#     # Validate the data (you can add custom validation logic here)
#     # ...

#     # Create a new instance of the temporary voucher model
#     voucher = TemporaryVoucher(
#         storeName=storeName,
#         expiration_date=expiration_date,
#         price=price
#         # Add other fields as needed
#     )
#     voucher.save()  # Save the voucher to the database

#     # Serialize the voucher data and return a response
#     serializer = TemporaryVoucherSerializer(voucher)
#     return Response(serializer.data)
