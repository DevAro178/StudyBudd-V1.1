from django.contrib.auth.middleware import MiddlewareMixin
from django.urls import reverse
from rest_framework.authtoken.models import Token
from rest_framework.exceptions import AuthenticationFailed
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework_simplejwt.exceptions import InvalidToken

class CustomAuthenticationMiddleware(MiddlewareMixin):
    
    def __init__(self, get_response):
        self.get_response = get_response
        self.jwt_authentication = JWTAuthentication()
    
    protected_endpoints = [
        reverse('GetRooms'),
        # Add more endpoints as needed
    ]
    
            
    def process_request(self, request):
        if any(request.path.startswith(endpoint) for endpoint in self.protected_endpoints):
            auth_header = request.META.get('HTTP_AUTHORIZATION')
            if auth_header and auth_header.startswith('Bearer '):
                token_key = auth_header.split(' ')[1]
                print(token_key)
                try:
                    print("Attempting to get token")
                    token = Token.objects.get(key=token_key)
                    print("Token successfully retrieved")
                    request.user = token.user
                except Token.DoesNotExist:
                    print("Invalid token")
                    raise AuthenticationFailed('Invalid token')
                print(Token)
                
            else:
                print('Token not provided')
                raise AuthenticationFailed('Token not provided')
        
