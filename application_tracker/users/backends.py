import json
import smtplib

from django.conf import settings
from django.core.mail.backends.smtp import EmailBackend
from django.core.mail.message import sanitize_address

from .tasks import async_send_messages_with_smtp


class AsyncSmtpEmailBackend(EmailBackend):

    def serialize_message(self, email_message):
        if not email_message.recipients():
            return False
        encoding = email_message.encoding or settings.DEFAULT_CHARSET
        from_email = sanitize_address(email_message.from_email, encoding)
        recipients = [sanitize_address(addr, encoding) for addr in email_message.recipients()]
        msg = email_message.message()
        msg_data = msg.as_bytes(linesep='\r\n')
        charset = (msg.get_charset().get_output_charset() if msg.get_charset() else 'utf-8')
        msg_data = msg_data.decode(charset)
        serialized_data = {
            'from_email': from_email,
            'recipients': recipients,
            'message': msg_data,
        }
        return json.dumps(serialized_data)

    def send_messages(self, email_messages):
        msgs = [self.serialize_message(msg) for msg in email_messages]
        async_send_messages_with_smtp.delay(msgs)
        return len(email_messages)  # type: ignore

    def _send(self, email_message):
        email_message = json.loads(email_message)
        from_email = email_message['from_email']
        recipients = email_message['recipients']
        message = email_message['message']
        try:
            self.connection.sendmail(  # type: ignore
                from_email, recipients, message.encode('utf-8')
            )
        except smtplib.SMTPException:
            if not self.fail_silently:  # type: ignore
                raise
            return False
        return True
