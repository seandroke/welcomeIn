from django.db import models

# Create your models here.

class FootageHandler(models.Model):
    FileField = models.FileField(upload_to='mediaLib/')
    FileDate = models.DateTimeField(auto_now_add=True)
    FileDescriptor = models.CharField(max_length=100, blank=True)

class FriendlyFacesHandler(models.Model):
    FileField = models.FileField(upload_to='FriendlyFaces/')
    Name = models.CharField(max_length=100, blank=True)

class AccessHistoryHandler(models.Model):
    FileField = models.FileField(upload_to='AccessFaces/')
    UpladTime = models.DateTimeField(auto_now_add=True)

class UserSettingsHandler(models.Model):
    name = models.TextField()
    email = models.TextField()
    smsnumber = models.TextField()
    houseaddress = models.TextField()
    user = models.TextField()

class UserToggleSettings(models.Model):
    strangernotifications = models.BooleanField()
    authorizednotifications = models.BooleanField()
    receivesms = models.BooleanField()
    receiveemail = models.BooleanField()
    user = models.TextField()

class LoggingUtilities(models.Model):
    FileField = models.FileField(upload_to='LoggingUtilities/')
    EventTime = models.DateTimeField()
    AccessType = models.TextField()