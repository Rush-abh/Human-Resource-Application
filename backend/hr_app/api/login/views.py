import json
import random
import string

from django.contrib import messages
from django.contrib.auth.tokens import default_token_generator

from django.core.exceptions import ObjectDoesNotExist
from django.core.mail import send_mail
from django.db import IntegrityError, transaction
from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.template.loader import render_to_string
from django.utils.encoding import force_bytes, force_text
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

from django.contrib.auth import authenticate, logout, login

from hr_app import settings
from .serializers import LoginSerializer
from rest_framework import viewsets, status
from .models import Login
from django.views.decorators.csrf import csrf_exempt


# CRUD operations for login details
class LoginViewSet(viewsets.ModelViewSet):
    serializer_class = LoginSerializer
    queryset = Login.objects.all()

    # http_method_names = ['get']

    def generate_password(self):
        return "".join(random.choice(string.ascii_letters + string.digits) for i in range(10))

    def create(self, request, *args, **kwargs):
        if request.method == "POST":
            raw_pass = self.generate_password()
            try:
                user = Login.objects.create(email=request.POST.get('email'), password=raw_pass, is_active=False)
            except IntegrityError:
                return HttpResponse("User with the provided email ID already exists.",
                                    status=status.HTTP_400_BAD_REQUEST)
            context = {
                'request': request,
                'protocol': request.scheme,
                'email': request.POST.get('email'),
                'password': raw_pass,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'domain': request.META['HTTP_HOST'],
                'token': default_token_generator.make_token(user),

            }
            subject = "Account Confirmation"
            email = render_to_string('acc_activation.html', context)

            send_mail(subject, email, settings.EMAIL_HOST_USER, [user.email])

            return HttpResponse("User created successfully. Activation link has been sent in the email.", status=status.HTTP_201_CREATED)


def activate_account(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Login.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, Login.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        user.is_active = True
        user.save()
        # login(request, user)
        # return redirect('home')
        return HttpResponse('Thank you for your email confirmation. Now you can login your account.')
    else:
        return HttpResponse('Activation link is invalid!')


def reset_password(request, uidb64, token):
    try:
        uid = force_text(urlsafe_base64_decode(uidb64))
        user = Login.objects.get(pk=uid)
    except(TypeError, ValueError, OverflowError, Login.DoesNotExist):
        user = None
    if user is not None and default_token_generator.check_token(user, token):
        # with transaction.atomic:
        # user.is_active = True
        if request.method == "POST":
            password_one = request.POST.get('password')
            password_two = request.POST.get('confirm-password')
            if password_one == password_two:
                with transaction.atomic():
                    user.is_active = True
                    user.set_password(request.POST.get('password'))
                    user.save()
                    return redirect('/portal-login', status=status.HTTP_200_OK)
            else:
                messages.error(request, "Password does not match")
                return redirect('reset-password', uidb64=uidb64, token=token)

        return render(request, 'password_reset.html')


@csrf_exempt
def user_login(request):
    if request.method == 'POST':
        error = {}
        email = request.POST.get('email', None)
        if not email:
            error.update({'email': "EmailID not provided."})
        password = request.POST.get('password', None)
        if not password:
            error.update({'password': "Password not provided."})
        if not error:
            user = authenticate(request, email=email, password=password)
            if user is not None:
                # user_login(request, user)
                if user.is_active:
                    login(request, user)
                    # user_data = {
                    #     "email": user.email,
                    #     "id": user.LoginID,
                    #     "is_authenticated": user.is_authenticated,
                    #     "is_active": user.is_active,
                    #     "is_staff": user.is_staff
                    # }
                    # data = json.dumps(user_data, indent=4, sort_keys=True, default=str)
                    return HttpResponse(status=status.HTTP_200_OK)
                else:
                    return HttpResponse(status=status.HTTP_404_NOT_FOUND)
            else:
                error.update({'mismatch': "Provided credentials does not match data in system."})
                data = json.dumps(error, indent=4, sort_keys=True, default=str)
                return HttpResponse(data, status=status.HTTP_404_NOT_FOUND)
        else:
            data = json.dumps(error, indent=4, sort_keys=True, default=str)
            return HttpResponse(data, status=status.HTTP_400_BAD_REQUEST)


# @csrf_exempt
def user_logout(request):
    logout(request)
    return HttpResponse(status=status.HTTP_200_OK)


def password_reset_request(request):
    if request.method == "POST":
        email = request.POST.get("email", None)
        if not email:
            return HttpResponse("Email ID required", status=status.HTTP_400_BAD_REQUEST)
        try:
            user = Login.objects.get(email=email)
        except ObjectDoesNotExist:
            return HttpResponse("No record found with provided email.", status=status.HTTP_404_NOT_FOUND)
        else:
            context = {
                'request': request,
                'protocol': request.scheme,
                'email': email,
                'uid': urlsafe_base64_encode(force_bytes(user.pk)),
                'domain': request.META['HTTP_HOST'],
                'token': default_token_generator.make_token(user),

            }
            subject = "Request for Password Reset"
            email = render_to_string('acc_activation.html', context)

            send_mail(subject, email, settings.EMAIL_HOST_USER, [user.email])

            return HttpResponse("An email with a link to reset you password has been sent to the provided email "
                                "address. Please check your email to reset your password",
                                status=status.HTTP_201_CREATED)
