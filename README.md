# fieldReservation

Simple App for club internal beachvolley ball field reservations. It uses a calendar
with special events and colors to mark the reservation status achieved.

#### Usage
You choose a day for training, click it to open the event window and enter your name.
When clicking a day that has reservations you will see a list of names that are registered already.
The day's background-color changes according to:
- Grey if there are not enough players.
- Green when at least 4 players participate.
- Orange when the reservations exceed 10.
- Red when there are more than 12 reservations.

#### Featuring:
- Ionic
- ionic-calendar-2

#### Prerequisites:
```
npm install -g ionic
```

#### Dependencies:
```
npm install ionic2-calendar --save
```

#### Start with:
```
ionic serve
```
