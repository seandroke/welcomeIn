from django.http import HttpResponse, FileResponse, QueryDict
from django.core.files import File
from django.core import serializers
from .models import FootageHandler, FriendlyFacesHandler, AccessHistoryHandler, UserSettingsHandler, UserToggleSettings, LoggingUtilities
from django.views.decorators.csrf import csrf_exempt
import os
import json
import face_recognition
import numpy as np
from twilio.rest import Client
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from backend.settings import EMAIL_HOST_USER
from django.conf import settings
from django.template import loader

@csrf_exempt
def FootageHandlerFormView(request):
    #FootageHandler.objects.all().delete()
    if request.method == 'POST':
        
        file_key=None
        for file_key in sorted(request.FILES):
            pass
        '''
        wrapped_file = ImageFile(request.FILES[file_key])
        filename = wrapped_file.name
        '''

        FootageHandlers = FootageHandler()
        FootageHandlers.FileField = request.FILES[file_key]
        FootageHandlers.FileDescriptor = request.POST['FileDescriptor']

        try:
            FootageHandlers.save()
        except:
            print('Error')

        return HttpResponse('Success')
    
    else:
        all_entries = FootageHandler.objects.all()
        #all_entries = FootageHandler.objects.all().delete()
        #print(all_entries)
        '''
        print(os.getcwd())
        image_data = open(os.getcwd() + all_entries[0].FileField.url, "rb").read()
        print(image_data)
        '''

        filesArray = []
        
        for each in all_entries:
            quick = os.getcwd()
            filesArray.append({"url": 'http://10.0.0.142' + quick.replace('/var/www/html', '') + each.FileField.url, "date": str(each.FileDate)})

        asJson = json.dumps(filesArray)

        ##return FileResponse(open(os.getcwd() + all_entries[len(all_entries)-1].FileField.url, "rb"))

        return HttpResponse(asJson)

        #return HttpResponse('Deleted')

@csrf_exempt
def FriendlyFacesHandlerFormView(request):
    if request.method == 'POST':

        FirendlyFacesHandlers = FriendlyFacesHandler()
        FirendlyFacesHandlers.FileField = request.FILES.get("FileField")
        FirendlyFacesHandlers.Name = request.POST.get('Name')

        try:
            FirendlyFacesHandlers.save()
        except:
            print(FirendlyFacesHandlers.FileField)
            print("Error")

        return HttpResponse('Success')

    if request.method == 'GET':

        ##FriendlyFacesHandler.objects.all().delete()

        all_entries = FriendlyFacesHandler.objects.all()

        as_list = all_entries.values()

        image_data = open(all_entries[0].FileField.path, "rb").read()

        return_json = []
        
        for x in all_entries:
            print(all_entries)
            return_json.append({"Image": "http://10.0.0.142" + x.FileField.path.replace('/var/www/html', ''), "Name": x.Name})

        return_obj = json.dumps(return_json)

        return HttpResponse(return_obj)

    if request.method == 'DELETE':
        data = QueryDict(request.body)
        print(data)
        toDelete = FriendlyFacesHandler.objects.get(Name=str(data['Name']))
        toDelete.delete()
        return HttpResponse("SUCCESS")

    

@csrf_exempt
def VerifyAccess(request):
    #AccessHistoryHandler.objects.all().delete()
    if request.method == 'POST':
        picture_to_verify = request.FILES.get('CheckAccessImage')
        friendly_faces_query = FriendlyFacesHandler.objects.all()
        KnownAccessList = []
        for items in friendly_faces_query:
            image_loaded = face_recognition.load_image_file("/var/www/html/facial-recognition-application/sean.droke/FacialRecognitionRepo/backend" + items.FileField.url)
            image_encoded = face_recognition.face_encodings(image_loaded)[0]
            KnownAccessList.append(image_encoded)

        AccessAttempt = AccessHistoryHandler()
        AccessAttempt.FileField = picture_to_verify
        AccessAttempt.save()

        KnownAccessList = np.asarray(KnownAccessList, dtype=np.float32)

        load_attempted = face_recognition.load_image_file("/var/www/html/facial-recognition-application/sean.droke/FacialRecognitionRepo/backend" + AccessAttempt.FileField.url)
        enconded_attempted = face_recognition.face_encodings(load_attempted)
        
        result = face_recognition.compare_faces(KnownAccessList, enconded_attempted)

        currentUserSettings = UserSettingsHandler.objects.get(user="admin")
        toggleSettings = UserToggleSettings.objects.get(user="admin")
        # If a friendly face was recognized
        if(True in result):
            # If they want notifications for friendly faces
            if(toggleSettings.authorizednotifications == True):

                new_obj = LoggingUtilities()
                new_obj.FileField = AccessAttempt.FileField
                new_obj.EventTime = AccessAttempt.UpladTime
                new_obj.AccessType = "Authorized Access Granted"
                new_obj.save()
                # If they want email notifications for friendly faces
                if(toggleSettings.receiveemail == True):

                    html_message = loader.render_to_string(
                        'picture.html',
                        {'face_image': 'http://10.0.0.142/facial-recognition-application/sean.droke/FacialRecognitionRepo/backend' + AccessAttempt.FileField.url,
                        'access_provided': 'Access Granted',
                        'access_description': 'A friendly face has opened the door at ' + str(AccessAttempt.UpladTime)}
                    )
                    print(html_message)
                    send_mail(
                        'Access Granted',
                        'A stranger has tried to access the door at ' + str(AccessAttempt.UpladTime),
                        EMAIL_HOST_USER,
                        [str(currentUserSettings.email)],
                        fail_silently=False,
                        html_message=html_message
                    )
                    # If they want sms notifications for friendly faces
                if(toggleSettings.receivesms == True):
                    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
                    client.messages.create(to=str(currentUserSettings.smsnumber), from_=settings.TWILIO_NUMBER, body="A friendly face has opened the door at " + str(AccessAttempt.UpladTime))

            return HttpResponse(True)
        # A friendly face was not recognized    
        else:
            
            new_obj = LoggingUtilities()
            new_obj.FileField = AccessAttempt.FileField
            new_obj.EventTime = AccessAttempt.UpladTime
            new_obj.AccessType = "Unauthorized Access Denied"
            new_obj.save()
            # If they want notifications for strangers
            if(toggleSettings.strangernotifications == True):
                currentUserSettings = UserSettingsHandler.objects.get(user="admin")
                # If they want email notifications for strangers
                if(toggleSettings.receiveemail == True):

                    html_message = loader.render_to_string(
                        'picture.html',
                        {'face_image': 'http://10.0.0.142/facial-recognition-application/sean.droke/FacialRecognitionRepo/backend' + AccessAttempt.FileField.url,
                        'access_provided': 'Access Denied',
                        'access_description': 'A stranger has tried to access the door at ' + str(AccessAttempt.UpladTime)}
                    )
                    print(html_message)
                    send_mail(
                        'Access Denied',
                        'A stranger has tried to access the door at ' + str(AccessAttempt.UpladTime),
                        EMAIL_HOST_USER,
                        [str(currentUserSettings.email)],
                        fail_silently=False,
                        html_message=html_message
                    )
                # If they want sms notifications for strangers
                if(toggleSettings.receivesms == True):
                    client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)
                    client.messages.create(to=str(currentUserSettings.smsnumber), from_=settings.TWILIO_NUMBER, body="A stranger has tried to access the door at " + str(AccessAttempt.UpladTime))
            # I'm working on this... I need to figure out how to get the filename of the video or picture
            # we want to attach to the email/text. I was thinking about using something like the url on line 124.
            # email = EmailMessage(
            #     'Access Denied',
            #     'A stranger has tried to access the door at ' + str(AccessAttempt.UpladTime),
            #     EMAIL_HOST_USER,
            #     [str(currentUserSettings.email)],
            # )
            # video = 
            # email.attach('design.png', img_data, 'image/png')
            return HttpResponse(False)

@csrf_exempt
def PersonalUserInformation(request):
    #UserSettingsHandler.objects.all().delete()
    if request.method == 'POST':
        
        request_user = request.POST.get("user")
        print(request_user)
        request_email = request.POST.get("email")
        request_name = request.POST.get("name")
        request_smsnumber = request.POST.get("smsnumber")
        request_houseaddress = request.POST.get("houseaddress")

        try:
            toUpdate = UserSettingsHandler.objects.get(user=str(request_user))
            toUpdate.name = str(request_name)
            toUpdate.email = str(request_email)
            toUpdate.smsnumber = str(request_smsnumber)
            toUpdate.houseaddress = str(request_houseaddress)
            toUpdate.save()
        
        except UserSettingsHandler.DoesNotExist:
            newObject = UserSettingsHandler()
            newObject.name = str(request_name)
            newObject.email = str(request_email)
            newObject.smsnumber = str(request_smsnumber)
            newObject.houseaddress = str(request_houseaddress)
            newObject.user = str(request_user)
            newObject.save()
        
        return HttpResponse("POST Succesful")

    if request.method == 'GET':

        request_user = request.GET.get("user")

        obtainSettings = UserSettingsHandler.objects.get(user="admin")
        forjson = {"name": obtainSettings.name, "email": obtainSettings.email, "smsnumber": obtainSettings.smsnumber, "houseaddress": obtainSettings.houseaddress}
        asjson = json.dumps(forjson)
        return HttpResponse(asjson)

@csrf_exempt
def UserToggleInformation(request):
    #UserToggleSettings.objects.all().delete()
    if request.method == 'POST':
        
        request_user = str(request.POST.get("user"))
        request_strangernotifications = str(request.POST.get("strangernotifications"))
        request_authorizednotifications = str(request.POST.get("authorizednotifications"))
        request_receivesms = str(request.POST.get("receivesms"))
        request_receiveemail = str(request.POST.get("receiveemail"))

        if(str(request.POST.get("strangernotifications")) == "true"):
            request_strangernotifications = True
        else:
            request_strangernotifications = False

        if(str(request.POST.get("authorizednotifications")) == "true"):
            request_authorizednotifications = True
        else:
            request_authorizednotifications = False

        if(str(request.POST.get("receivesms")) == "true"):
            request_receivesms = True
        else:
            request_receivesms = False

        if(str(request.POST.get("receiveemail")) == "true"):
            request_receiveemail = True
        else:
            request_receiveemail = False

        try:
            toUpdate = UserToggleSettings.objects.get(user=str(request_user))
            toUpdate.strangernotifications = request_strangernotifications
            toUpdate.authorizednotifications = request_authorizednotifications
            toUpdate.receivesms = request_receivesms
            toUpdate.receiveemail = request_receiveemail
            toUpdate.save()
        
        except UserToggleSettings.DoesNotExist:
            newObject = UserToggleSettings()
            newObject.strangernotifications = request_strangernotifications
            newObject.authorizednotifications = request_authorizednotifications
            newObject.receivesms = request_receivesms
            newObject.receiveemail = request_receiveemail
            newObject.user = request_user
            newObject.save()

        return HttpResponse("POST Succesful")

    else:
        
        request_user = request.GET.get("user")

        obtainSettings = UserToggleSettings.objects.get(user="admin")
        forjson = {"strangernotifications": obtainSettings.strangernotifications, "authorizednotifications": obtainSettings.authorizednotifications, "receivesms": obtainSettings.receivesms, "receiveemail": obtainSettings.receiveemail}
        asjson = json.dumps(forjson)
        return HttpResponse(asjson)

@csrf_exempt
def LoggingUtilityHandler(request):
    #LoggingUtilities.objects.all().delete()
    if request.method == 'POST':
        request_FileField = request.FILES.get('FileField')
        request_EventTime = request.POST.get('EventTime')
        request_AccessType = request.POST.get('AccessType')

        new_object = LoggingUtilities()
        new_object.FileField = request_FileField
        new_object.EventTime = request_EventTime
        new_object.AccessType = request_AccessType

        new_object.save()

        return HttpResponse("Success")

    else:

        return_array = []

        object_list = LoggingUtilities.objects.all()

        for item in object_list:
            quick = os.getcwd()
            return_array.append({'URL': 'http://10.0.0.142' + quick.replace('/var/www/html', '') + item.FileField.url, 'EventTime': str(item.EventTime), 'AccessType': item.AccessType})

        as_json = json.dumps(return_array)

        return HttpResponse(as_json)

@csrf_exempt
def dropdbs(request):
    if request.method == 'GET':
        LoggingUtilities.objects.all().delete()
        UserToggleSettings.objects.all().delete()
        UserSettingsHandler.objects.all().delete()
        AccessHistoryHandler.objects.all().delete()
        FriendlyFacesHandler.objects.all().delete()
        FootageHandler.objects.all().delete()
        return HttpResponse("Succesful Delete All")

