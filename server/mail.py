import smtplib
from dotenv import dotenv_values
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def validation_mail(recipient, token):

    credentials = dotenv_values('.env')

    link = credentials['VALIDATION_URL_BASE'] + token

    sender = credentials['MAIL_LOGIN']
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Email Verification'
    msg['From'] = sender
    msg['To'] = recipient

    with open('server/static/email_confirmation.html', 'r') as f:
        html = f.read()
    html = html.replace('INSERT_LINK_HERE', link)

    # add the text variant of the mail here
    part2 = MIMEText(html, 'html')
    msg.attach(part2)
    server = smtplib.SMTP(credentials['MAIL_SMTP'], credentials['MAIL_SMTP_PORT'])
    server.starttls()
    server.login(credentials['MAIL_LOGIN'], credentials['MAIL_PASSWORD'])
    server.sendmail(sender, recipient, msg.as_string())
    server.quit()
