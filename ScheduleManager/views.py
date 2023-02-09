from django.shortcuts import render


def frontEnd(request):
    return render(request, 'index.html')
