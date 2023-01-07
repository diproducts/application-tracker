import smtplib
import yaml
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

def send_validation_link(recipient, token):
    
    with open('server/credentials.yaml', 'r') as f:
        credentials = yaml.safe_load(f)

    link = credentials['validation_url_base'] + token

    sender = credentials['login']
    msg = MIMEMultipart('alternative')
    msg['Subject'] = 'Email Verification'
    msg['From'] = sender
    msg['To'] = recipient

    with open('server/email_confirmation.html', 'r') as f:
        html = f.read()
    html = html.replace('INSERT_LINK_HERE', link)

    # add the text variant of the mail here
    part2 = MIMEText(html, 'html')
    msg.attach(part2)
    server = smtplib.SMTP(credentials['smtp'], credentials['smtp_port'])
    server.starttls()
    server.login(credentials['login'], credentials['password'])
    server.sendmail(sender, recipient, msg.as_string())
    server.quit()

