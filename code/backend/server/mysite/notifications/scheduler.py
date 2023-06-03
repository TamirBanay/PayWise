from apscheduler.schedulers.background import BackgroundScheduler
from .taskes import schedule_api

def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(schedule_api, 'interval', minutes=2)
    scheduler.start()
    #  python manage.py runserver --noreload
    