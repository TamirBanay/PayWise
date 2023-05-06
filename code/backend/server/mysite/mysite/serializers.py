from rest_framework import serializers
from mysite.models import VoucherCategory, StoreType, Store, Vouchers, Alerts
from .models import TemporaryVoucher
from mysite.models import Vouchers





class VoucherCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = VoucherCategory
        fields = ['categoryID', 'name', 'description']


class StoreTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = StoreType
        fields = ['typeID', 'name', 'city', 'description']


class StoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Store
        fields = ['storeID', 'name', 'type', 'city', 'street', 'houseNumber']


class AlertsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Alerts
        fields = ['alertID', 'voucherID', 'walletID', 'alertDate', 'aletHour']


class TemporaryVoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = TemporaryVoucher
        fields = '__all__'


class VoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vouchers
        fields = '__all__'
        # fields = ['voucherID', 'walletID', 'voucherCategory', 'storeType',
        #           'ammount', 'dateOfAcquire', 'dateOfExpiry', 'redeemed']
