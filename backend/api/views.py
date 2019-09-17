from django.contrib.auth.decorators import login_required
from django.http import HttpResponse
from django.shortcuts import render


@login_required
def index(request):
    if request.is_ajax() or not request.user.is_staff:
        return HttpResponse(status=405)

    return render(request, 'index.html')
