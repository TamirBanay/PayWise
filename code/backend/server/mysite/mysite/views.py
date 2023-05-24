import json
from venv import logger
from django.forms import ValidationError
from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from rest_framework import status
from users.models import Wallet
from mysite.models import VoucherCategory, StoreType, Store, Vouchers, Alerts, MOCKVouchers
from mysite.serializers import VoucherCategorySerializer, StoreTypeSerializer, StoreSerializer,  AlertsSerializer
from rest_framework.response import Response
from .serializers import VoucherSerializer
import jwt
from .forms import VoucherForm
from rest_framework.views import APIView
from django.core import serializers
from django.http import JsonResponse
from .models import Vouchers
from django.views.decorators.csrf import csrf_exempt


def get_vouchers(request, walletID):
    vouchers = Vouchers.objects.filter(walletID=walletID)
    vouchers_json = serializers.serialize('json', vouchers)
    return JsonResponse({'vouchers': vouchers_json})

def get_all_vouchers(request):
    vouchers = Vouchers.objects.all()
    vouchers_json = serializers.serialize('json', vouchers)
    return JsonResponse({'vouchers': vouchers_json})

def get_MOCK_vouchers(request):
    MOCK_vouchers = MOCKVouchers.objects.all()
    MOCK_vouchers_json = serializers.serialize('json', MOCK_vouchers)
    return JsonResponse({'MOCK_vouchers': MOCK_vouchers_json})



class CreateVoucherView(APIView):
    def post(self, request):
        serializer = VoucherSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    

class ChangeVoucheralert(APIView):
    def post(self,request, voucher_id):
        try: 
             voucher = get_object_or_404(Vouchers, pk=voucher_id)
             new_data = request.data
             daysBeforeAlert = new_data.get('daysBeforeAlert', voucher.daysBeforeAlert)
             
             voucher.daysBeforeAlert = daysBeforeAlert
             voucher.save()
             
             
             logger.info(
                f"Successfully updated user {voucher_id} with new data: {new_data}")
             return JsonResponse({
                "daysBeforeAlert": daysBeforeAlert,
               
            })
             
        except Vouchers.DoesNotExist:
            # Return a 404 error response if the user with the given ID does not exist
            logger.error(f"User with ID {voucher_id} does not exist.")
            return JsonResponse({"message": "User not found."}, status=404)

        except ValidationError as e:
            # Return a 400 error response if there is a validation error
            logger.error(
                f"Validation error while updating user {voucher_id}: {e}")
            return JsonResponse({"message": str(e)}, status=400)

        except Exception as e:
            # Return a 500 error response for any other unexpected errors
            logger.error(f"Error while updating user {voucher_id}: {e}")
            return JsonResponse({"message": "An error occurred while updating user details."}, status=500)
    
            
            
            

@csrf_exempt
def delete_voucher(request, voucher_id):
    if request.method == 'DELETE':
        voucher = get_object_or_404(Vouchers, pk=voucher_id)
        voucher.delete()
        return JsonResponse({'message': 'Voucher deleted successfully'})


@csrf_exempt
def voucher_redeemed(request, voucher_id):
    voucher = get_object_or_404(Vouchers, pk=voucher_id)
    if request.method == 'POST':
        data = json.loads(request.body)
        voucher.redeemed = data.get('redeemed', voucher.redeemed)
        voucher.save()
        return JsonResponse({
            'redeemed': True,
        })
        return JsonResponse({'message': 'Voucher redeemed failed'})
