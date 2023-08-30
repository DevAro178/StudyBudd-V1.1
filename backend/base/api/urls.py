from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenRefreshView,
)
from .views import MyTokenObtainPairView


urlpatterns = [
    
    path('token/', MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    
    
    path('', views.home,name="HOME"),
    # Rooms Routing
    path('GetRooms/', views.GetRooms,name="GetRooms"),
    path('GetRoomsByUserID/<int:pk>', views.GetRoomsByUserID,name="GetRoomsByUserID"),
    path('GetRoomsByTopicID/<int:pk>', views.GetRoomsByTopicID,name="GetRoomsByTopicID"),
    path('GetRoomsByTitleName/<str:pk>', views.GetRoomsByTitleName,name="GetRoomsByTitleName"),

    path('GetRoom/<str:pk>', views.GetRoom,name="GetRoom"),
    path('CreateRoom/', views.CreateRoom,name="CreateRoom"),
    path('UpdateRoom/<str:pk>', views.UpdateRoom,name="UpdateRoom"),
    path('DeleteRoom/<str:pk>', views.DeleteRoom,name="DeleteRoom"),
    # Topics Routing
    path('GetTopics/', views.Topics,name="GetTopics"),
    path('GetTopic/<int:pk>', views.Topics,name="GetTopic"),
    path('SearchTopics/<str:pk>', views.SearchTopics,name="SearchTopics"),
    path('CreateTopic/', views.CreateTopic,name="CreateTopic"),
    path('UpdateTopic/<str:pk>', views.UpdateTopic,name="UpdateTopic"),
    # Messages Routing
    path('GetMessages/', views.GetMessages,name="GetMessages"),
    path('GetMessages/<str:pk>', views.GetSMessages,name="GetSMessages"),
    path('GetMessageByID/<int:pk>', views.GetMessageByID,name="GetMessageByID"),
    path('GetMessagesByRoomID/<int:pk>', views.GetMessagesByRoomID,name="GetMessagesByRoomID"),
    path('GetMessagesByUserID/<int:pk>', views.GetMessagesByUserID,name="GetMessagesByUserID"),
    path('GetMessagesByTopicID/<int:pk>', views.GetMessagesByTopicID,name="GetMessagesByTopicID"),    
    
    path('CreateMessage/', views.CreateMessage,name="CreateMessage"),
    path('DeleteMessage/<str:pk>', views.DeleteMessage,name="DeleteMessage"),
    # User Routing
    path('GetUserProfile/<str:pk>', views.GetUserProfile,name="GetUserProfile"),
    path('UpdateUserProfile/<int:pk>', views.UpdateUserProfile,name="UpdateUserProfile"),
    path('CreateUserProfilea', views.CreateUserProfile,name="CreateUserProfile"),
    #Activities
    
    

    
    
    
    
]
