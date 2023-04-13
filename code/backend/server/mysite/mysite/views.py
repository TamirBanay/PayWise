from django.shortcuts import render
from rest_framework import status
from rest_framework import generics
from mysite.models import PayWiseUser, VoucherCategory, StoreType, Store, Vouchers, Alerts
from mysite.serializers import VoucherCategorySerializer, StoreTypeSerializer, StoreSerializer, VouchersSerializer, AlertsSerializer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import TemporaryVoucher
from .serializers import TemporaryVoucherSerializer
import jwt
from django.contrib.auth import get_user_model


def voucher_view(request):
    jwt_token = request.COOKIES.get('jwt')
    if not jwt_token:
        "expired_token"
        pass
    else:
        try:
            user_id = jwt_token.get("id")
        except jwt.exceptions.DecodeError:
            pass
        else:
            User = get_user_model()
            user = User.objects.get(id=user_id)
            wallet = Wallet.objects.get(user=user)
            vouchers = Vouchers.objects.filter(Wallet=Wallet)
            return render(request, "voucher.html", {"vouchers": vouchers})


@ api_view(['GET'])
@ renderer_classes([JSONRenderer])
def get_Vouchers(_, voucherID, walletID):
    serializer = VouchersSerializer(Vouchers)
    return Response(serializer.data, status=status.HTTP_200_OK)


@ api_view(['POST'])
def create_temporary_voucher(request):
    # Parse the request data
    storeName = request.data.get('storeName')
    expiration_date = request.data.get('expiration_date')
    price = request.data.get('price')

    # Validate the data (you can add custom validation logic here)
    # ...

    # Create a new instance of the temporary voucher model
    voucher = TemporaryVoucher(
        storeName=storeName,
        expiration_date=expiration_date,
        price=price
        # Add other fields as needed
    )
    voucher.save()  # Save the voucher to the database

    # Serialize the voucher data and return a response
    serializer = TemporaryVoucherSerializer(voucher)
    return Response(serializer.data)
