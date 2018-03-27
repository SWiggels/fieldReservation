import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import * as $ from 'jquery'

@Component({
  selector: 'page-calenadr',
  templateUrl: 'calendar.html'
})
export class CalendarPage {
  eventSource = [];
  viewTitle: string;
  selectedDay = new Date();
  trainingSubscriptions = 0;
  currentColor;

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController) {
    this.eventSource = [];
  }

  addEvent() {
    let modal = this.modalCtrl.create('EventModalPage', { selectedDay: this.selectedDay });
    modal.present();
    modal.onDidDismiss(data => {
      if (data) {
        let eventData = data;
        eventData.title = data.title;
        eventData.startTime = new Date(data.startTime);
        eventData.endTime = new Date(data.endTime);
        let events = this.eventSource;
        events.push(eventData);
        this.eventSource = [];
        setTimeout(() => {
          this.eventSource = events;
        });
      }
    });
  }

  onViewTitleChanged(title) {
    this.viewTitle = title;
  }

  onEventSelected(event) {
    let start = moment(event.startTime).format('LLLL');
    let end = moment(event.endTime).format('LLLL');

    let alert = this.alertCtrl.create({
      title: '' + event.title,
      subTitle: 'From: ' + start + '<br>To: ' + end,
      buttons: ['OK']
    })
    alert.present();
  }

  onTimeSelected(ev) {
    this.selectedDay = ev.selectedTime;
  }

  getCounter(date: any) {
    if (date.events) {
      if (date.events.length > 0) {
        date.label = date.events.length;
      }
    }
  }

  changeColor(count: any) {
    switch (count) {
      case 0: {
        $('.monthview-selected').attr('style', 'background-color:black !important');
      }
      case 1: {
        $('.monthview-selected').attr('style', 'background-color:blue !important');
      }
      default: {
        $('.monthview-selected').attr('style', 'background-color:yellow !important');
      }
    }
  }
}
