to run use:
    python -m uvicorn main:app --reload

to show bug logs:
    python -m uvicorn main:app --reload --log-level debug

NOTES: (when deploying on production)

auth_services.py
    -update [samesite="strict"]
    -update [secure=True]
    -update [max_age=3600]

main.py
    -update [allow_origins=["paws_domain"]]
