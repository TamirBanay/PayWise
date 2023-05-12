from datetime import timedelta
from django.core.mail import send_mail, EmailMessage
from django.utils import timezone
from mysite.models import Vouchers
from django.template.loader import render_to_string


def schedule_api():
    # Calculate the date range for the upcoming week
    today = timezone.now().date()
    next_week = today + timedelta(days=7)

    # Retrieve the vouchers expiring in the upcoming week
    expiring_vouchers = Vouchers.objects.filter(
        dateOfExpiry__range=[today, next_week],
        redeemed = False)

    # Iterate over the expiring vouchers and send email notifications
    for voucher in expiring_vouchers:
        # Calculate the number of days until the voucher expires
        days_until_expiry = (voucher.dateOfExpiry.date() - today).days

        # Check if the voucher's expiry date is within the upcoming week
        if days_until_expiry <= 7:
            # Retrieve the associated user
            user = voucher.walletID.user

            # Get the user's name
            # Adjust this based on your User model structure
            user_name = user.first_name + " " + user.last_name

            subject = 'תזכורת תוקף שובר'
            context = {
                'user_name': user_name,
                'voucher_amount': voucher.ammount,
                'voucher_id': voucher.voucherID,
                'store_name': voucher.storeName,
                'days_until_expiry': days_until_expiry,
            }
            message = render_to_string('email_template.html', context)

            # Create the email
            email = EmailMessage(subject, message, "paywise.reminder@gmail.com", [user.email])

            # Set the content type as HTML
            email.content_subtype = 'html'

            # Send the email
            email.send()
            print(f"message successfully to voucher {voucher.voucherID}")




# def schedule_api():
#     # Calculate the date range for the upcoming week
#     today = timezone.now().date()
#     next_week = today + timedelta(days=7)

#     # Retrieve the vouchers expiring in the upcoming week
#     expiring_vouchers = Vouchers.objects.filter(
#         dateOfExpiry__range=[today, next_week],
#         redeemed = False)

#     # Iterate over the expiring vouchers and send email notifications
#     for voucher in expiring_vouchers:
#         # Calculate the number of days until the voucher expires
#         days_until_expiry = (voucher.dateOfExpiry.date() - today).days

#         # Check if the voucher's expiry date is within the upcoming week
#         if days_until_expiry <= 7:
#             # Retrieve the associated user
#             user = voucher.walletID.user

#             # Get the user's name
#             # Adjust this based on your User model structure
#             user_name = user.first_name + " " + user.last_name

#             # Compose the email message
#             subject = 'Voucher Expiry Reminder'
#             message = f"שלום {user_name}, \n\nזוהי הודעת תזכורת כי שובר ההחזר על סך:{voucher.ammount} (מספר: {voucher.voucherID}) עבור {voucher.storeName} עומד לפוג בעוד כ{days_until_expiry}  ימים\n וודא כי הינך ממש את הושבר טרם תפוגתו.\n\nבתודה מערכת PayWise"

#             # message = f"Hello {user_name},\n\nThis is a reminder that your voucher (ID: {voucher.voucherID}) for:{voucher.storeName} will expire in {days_until_expiry} days.\nPlease make sure to redeem it before the expiry date.\n\nThank you!"
#             from_email = 'sender@example.com'
#             # Change this to the appropriate email field in your User model
#             recipient_list = [user.email]

#             # Send the email notification
#             send_mail(subject, message, from_email, recipient_list)
#             print(f"message successfully to voucher {voucher.voucherID}")
