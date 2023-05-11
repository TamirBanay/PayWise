from django.apps import AppConfig


class UsersConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'users'
    
    def ready(self):
        if not getattr(self, 'scheduler_started', False):
            from notifications import scheduler
            scheduler.start()
            self.scheduler_started = True
