from apscheduler.schedulers.background import BackgroundScheduler
from .taskes import schedule_api

def start():
    scheduler = BackgroundScheduler()
    # scheduler.add_job(schedule_api, 'interval', seconds=10)
    # scheduler.add_job(schedule_api, 'interval', days=1)
    scheduler.start()
    