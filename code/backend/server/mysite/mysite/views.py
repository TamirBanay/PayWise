from rest_framework import status
from rest_framework import generics
from mysite.models import PayWiseUser, Wallet,VoucherCategory,StoreType,Store,Vouchers,Alerts
from mysite.serializers import WalletSerializer, WalletSerializer,VoucherCategorySerializer,StoreTypeSerializer,StoreSerializer,VouchersSerializer,AlertsSerializer
from rest_framework.decorators import api_view, renderer_classes
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response





@api_view(['GET'])
@renderer_classes([JSONRenderer])
def get_Vouchers(_, voucherID,walletID):
    serializer = VouchersSerializer(Vouchers)
    return Response(serializer.data, status=status.HTTP_200_OK)