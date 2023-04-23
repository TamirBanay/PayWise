from rest_framework import status
from users.models import Wallet
from mysite.models import PayWiseUser, VoucherCategory, StoreType, Store, Vouchers, Alerts
from mysite.serializers import VoucherCategorySerializer, StoreTypeSerializer, StoreSerializer,  AlertsSerializer
from rest_framework.response import Response
from .models import TemporaryVoucher
from .serializers import VoucherSerializer
import jwt
from .forms import VoucherForm
from rest_framework.views import APIView
from django.core import serializers
from django.http import JsonResponse
from django.shortcuts import get_object_or_404
from .models import Vouchers
from django.views.decorators.csrf import csrf_exempt



def get_vouchers(request, walletID):
    vouchers = Vouchers.objects.filter(walletID=walletID)
    vouchers_json = serializers.serialize('json', vouchers)
    return JsonResponse({'vouchers': vouchers_json})


class CreateVoucherView(APIView):
    def post(self, request):
        serializer = VoucherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@csrf_exempt
def delete_voucher(request, voucher_id):
    if request.method == 'DELETE':
        voucher = get_object_or_404(Vouchers, pk=voucher_id)
        voucher.delete()
        return JsonResponse({'message': 'Voucher deleted successfully'})

