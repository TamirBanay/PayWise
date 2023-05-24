from django.db import models
from users.models import Wallet, User
from django.utils import timezone


class VoucherCategory(models.Model):
    categoryID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200,  null=True, blank=True)


class StoreType(models.Model):
    typeID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=200, null=True, blank=True)


class Store(models.Model):
    storeID = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    type = models.ForeignKey(
        StoreType, on_delete=models.SET_DEFAULT, default="undefined", max_length=30)
    city = models.CharField(max_length=30)
    street = models.CharField(max_length=30,  null=True, blank=True)
    houseNumber = models.CharField(max_length=30, null=True, blank=True)


class Vouchers (models.Model):
    voucherID = models.IntegerField(primary_key=True)
    walletID = models.ForeignKey(
        Wallet, on_delete=models.CASCADE, default=User.DEFAULT_WALLET_ID)
    storeName = storeType = models.CharField(max_length=30, default="undefined")
    voucherCategory = models.CharField(max_length=30, default="undefined")
    storeType = models.CharField(max_length=30, default="undefined")
    ammount = models.DecimalField(max_digits=10, decimal_places=2)
    dateOfAcquire = models.DateTimeField(default=timezone.now)
    dateOfExpiry = models.DateTimeField(default=timezone.now)
    redeemed = models.BooleanField(default=False)
    daysBeforeAlert = models.IntegerField(default=7)
    

class MOCKVouchers (models.Model):
    voucherID = models.IntegerField(primary_key=True)
    storeName = storeType = models.CharField(max_length=30, default="undefined")
    voucherCategory = models.CharField(max_length=30, default="undefined")
    storeType = models.CharField(max_length=30, default="undefined")
    ammount = models.DecimalField(max_digits=10, decimal_places=2)
    dateOfAcquire = models.DateTimeField(default=timezone.now)
    dateOfExpiry = models.DateTimeField(default=timezone.now)
    redeemed = models.BooleanField(default=False)


class Alerts (models.Model):
    alertID = models.IntegerField(primary_key=True)
    voucherID = models.ForeignKey(
        Vouchers, on_delete=models.SET_DEFAULT, default="undefined")
    alertDate = models.DateField()
    aletHour = models.TimeField()



