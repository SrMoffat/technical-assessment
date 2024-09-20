import json
from django.http import JsonResponse


def api_health_check(request, *args, **kwargs):
    body = request.body
    data = {}
    try:
        data = json.loads(body)
    except:
        pass

    print("Data", {
        "data": data,
        "params": request.GET
    })

    return JsonResponse(data)
