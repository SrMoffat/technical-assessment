from django.http import JsonResponse


def api_health_check(request, *args, **kwargs):
    return JsonResponse({
        "status": "ok"
    })
