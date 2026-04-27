import resend
from django.conf import settings

resend.api_key = settings.RESEND_API_KEY


def send_email(to_email, subject, html_content):
    try:
        resend.Emails.send({
            "from": settings.DEFAULT_FROM_EMAIL,
            "to": [to_email],
            "subject": subject,
            "html": html_content,
        })
        return True
    except Exception as e:
        print("Email error:", e)
        return False
