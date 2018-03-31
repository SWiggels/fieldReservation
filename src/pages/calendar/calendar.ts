import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import * as moment from 'moment';
import * as $ from 'jquery'
import { AuthService } from '../../providers/auth-service/auth-service';

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
  username = '';
  email = '';

  calendar = {
    mode: 'month',
    currentDate: new Date()
  };

  constructor(public navCtrl: NavController, private modalCtrl: ModalController, private alertCtrl: AlertController, private auth: AuthService) {
    this.eventSource = [];
    let info = this.auth.getUserInfo();
    this.username = info['name'];
    this.email = info['email'];
  }

  public logout() {
    this.auth.logout().subscribe(succ => {
      this.navCtrl.setRoot('LoginPage')
    });
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

  onCurrentDateChanged(event) {
    this.updateColor();
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

  updateColor() {
    $("td").find(".reservationsCount").each(function () {
      if ($(this).text() < 3 && $(this).text() > 0) {
        $(this).parents("td").css("background-color", "#EAFAF1", "!important");
        $(this).parents("td").css("color", "black", "!important");
      }
      if ($(this).text() < 9 && $(this).text() > 3) {
        $(this).parents("td").css("background-color", "#82E0AA", "!important");
      }
      if ($(this).text() < 11 && $(this).text() > 9) {
        $(this).parents("td").css("background-color", "#F0B27A", "!important");
      }
      if ($(this).text() > 12) {
        $(this).parents("td").css("background-color", "#E74C3C", "!important");
      }
    });
  }
}