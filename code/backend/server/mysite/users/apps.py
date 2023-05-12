from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    
    def ready(self):
        # Import the necessary modules
        from notifications.scheduler import start
        # Call the start function to activate the scheduler
        start()