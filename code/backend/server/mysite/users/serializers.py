from rest_framework import serializers
from .models import User, PayWiseUser

class PayWiseUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = PayWiseUser
        fields = ['user', 'gender', 'city',
                  'street', 'houseNumber', 'dateOfBirth']
class UserSerializers(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','last_name', 'email', 'password']
        extra_Kwargs = {
            'password': {'wirte_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        if password is not None:
            instance.set_password(password)
        instance.save()
        return instance
    
