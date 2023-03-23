from django.shortcuts import render
from rest_framework.views import APIView
from .serializers import UserSerializers
from rest_framework.response import Response
from rest_framework.exceptions import AuthenticationFailed
from .models import User
import jwt
import datetime

import base64
import hashlib
import hmac
import json
from rest_framework.exceptions import AuthenticationFailed
from rest_framework.views import APIView
from rest_framework.response import Response


# Create your views here.


class RegisterView(APIView):
    def post(self, request):
        serializer = UserSerializers(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data)


class LoginView(APIView):
    def post(self, request):
        email = request.data['email']
        password = request.data['password']

        user = User.objects.filter(email=email).first()
        if user is None:
            raise AuthenticationFailed('User not found!')

        if not user.check_password(password):
            raise AuthenticationFailed('incorrect password!')

        payload = {
            'id': user.id,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(minutes=60),
            'iat': datetime.datetime.utcnow()

        }
        token = jwt.encode(payload, 'secret',
                           algorithm='HS256')

        response = Response()

        response.set_cookie(key='jwt', value=token, httponly=True)

        response.data = {
            'jwt': token}

        return response

# class UserView(APIView):

#     def get(self, request):
#            token= request.COOKIES.get('jwt')

#            if not token:
#                raise AuthenticationFailed('Unauthenticated!')

#            try:
#                payload =jwt.decode(token, 'secret', algorithm=['HS256'])
#            except jwt.ExpiredSignatureError:
#                raise AuthenticationFailed('Unauthenticated!')

#            user = User.objects.filter(id=payload['id']).first()
#            serializer = UserSerializers(user)

#            return Response(serializer.data)


class UserView(APIView):
    def get(self, request):
        token = request.COOKIES.get('jwt')
        if not token:
            raise AuthenticationFailed('Unauthenticated!', code=401)

        try:
            header_b64, payload_b64, signature_b64 = token.split('.')
            header = json.loads(base64.b64decode(
                header_b64 + '==').decode('utf-8'))
            payload = json.loads(base64.b64decode(
                payload_b64 + '==').decode('utf-8'))
            secret = 'secret'
            expected_signature = hmac.new(secret.encode(
                'utf-8'), (header_b64 + '.' + payload_b64).encode('utf-8'), hashlib.sha256).digest()
            signature = base64.b64decode(signature_b64 + '==')
            if not hmac.compare_digest(signature, expected_signature):
                raise AuthenticationFailed('Unauthenticated!', code=401)

            user = User.objects.filter(id=payload['id']).first()
            serializer = UserSerializers(user)
            return Response(serializer.data)

        except (ValueError, KeyError, TypeError, AuthenticationFailed):
            raise AuthenticationFailed('Unauthenticated!', code=401)


class LogoutView(APIView):
     def post(self, request):
        response= Response()
        response.delete_cookie('jwt')
        response.data={
            'message':'success'
            }
        return response        