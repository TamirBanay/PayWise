from django import forms
from .models import Vouchers
from .models import Wallet


class VoucherForm(forms.ModelForm):
    wallet = forms.ModelChoiceField(
        queryset=Wallet.objects.all(), to_field_name="walletID")

    class Meta:
        model = Vouchers
        fields = ["wallet", "voucherCategory", "storeType",
                  "ammount", "dateOfAcquire", "dateOfExpiry", "redeemed"]

    def _init_(self, user, *args, **kwargs):
        super()._init_(*args, **kwargs)
        self.fields['walletID'].queryset = user.wallet_set.all()
