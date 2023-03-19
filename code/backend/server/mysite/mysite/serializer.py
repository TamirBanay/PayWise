from rest_framework import serializers
from mysite.models import PayWiseUser, Wallet,VoucherCategory,StoreType,Store,Vouchers,Alerts
 
 
class PayWiseUserSerializer(serializers.ModelSerializer):
     class Meta:
          model = PayWiseUser
          fields = ['userID','gender','city','street','houseNumber','dateOfBirth']
          
          
class WalletSerializer(serializers.ModelSerializer):
     class Meta:
          model = Wallet
          fields = ['walletID','userID']
          
          
class VoucherCategorySerializer(serializers.ModelSerializer):
     class Meta:
          model = VoucherCategory
          fields = ['categoryID','name','description']              
          
          
class StoreTypeSerializer(serializers.ModelSerializer):
     class Meta:
          model = StoreType
          fields = ['typeID','name','city','description']
          
          
class StoreSerializer(serializers.ModelSerializer):
     class Meta:
          model = Store
          fields = ['storeID','name','type','city','street','houseNumber']     
          
class VouchersSerializer(serializers.ModelSerializer):
     class Meta:
          model = Vouchers
          fields = ['voucherID','walletID','voucherCategory','storeType','ammount','dateOfAcquire','dateOfExpiry','redeemed']
                    
          
class AlertsSerializer(serializers.ModelSerializer):
     class Meta:
          model = Alerts
          fields = ['alertID','voucherID','walletID','alertDate','aletHour']                         