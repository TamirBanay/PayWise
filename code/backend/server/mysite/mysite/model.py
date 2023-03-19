from django.db import models

class PayWiseUser (models.Model):
    userID= models.AutoField(primary_key=True) 
    gender = models.CharField(max_length = 30)
    city = models.CharField(max_length=30)       
    street = models.CharField(max_length=30,  null=True, blank=True)
    houseNumber = models.CharField(max_length=30, null=True, blank=True)
    dateOfBirth = models.DateField() 
    
class Wallet(models.Model):
    walletID = models.IntegerField(primary_key=True)
    userID= models.IntegerField(PayWiseUser.userID,on_delete=models.SET_DEFAULT,default="undefined")
    
class VoucherCategory(models.Model):
    categoryID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200,  null=True, blank=True)
    
    
    
class StoreType(models.Model):
    typeID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200, null=True, blank=True)
    
class Store(models.Model):
    storeID  = models.AutoField(primary_key=True)       
    name = models.CharField(max_length=30)
    type = models.CharField(StoreType.typeID,on_delete=models.SET_DEFAULT,default="undefined",max_length=30)
    city = models.CharField(max_length=30)       
    street = models.CharField(max_length=30,  null=True, blank=True)
    houseNumber = models.CharField(max_length=30, null=True, blank=True)

class Vouchers (models.Model):
    voucherID = models.IntegerField(primary_key=True)       
    walletID = models.IntegerField(Wallet.walletID,on_delete=models.SET_DEFAULT,default="undefined",primary_key=True,)
    voucherCategory = models.ForeignKey(VoucherCategory.categoryID,on_delete=models.SET_DEFAULT, default="undefined")
    storeType = models.ForeignKey(StoreType.typeID,on_delete=models.SET_DEFAULT,default="undefined")
    ammount = models.IntegerField()
    dateOfAcquire = models.DateField()    
    dateOfExpiry = models.DateField()    
    redeemed = models.BooleanField(default=False)
    
class Alerts (models.Model):
   alertID = models.IntegerField(primary_key=True)
   voucherID = models.IntegerField(Vouchers.voucherID,on_delete=models.SET_DEFAULT,default="undefined",primary_key=True,) 
   walletID = models.IntegerField(Vouchers.walletID,on_delete=models.SET_DEFAULT,default="undefined",primary_key=True,)    
   alertDate = models.DateField()
   aletHour  = models.TimeField()
   
