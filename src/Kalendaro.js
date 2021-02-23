import React, { Component } from 'react'
import moment from 'moment'
import 'moment/locale/tr'

export default class Kalendaro extends Component {

    state = {
        currentMonth: new Date(),
        selectedDate: new Date()
    };

    renderHeader() {
        const dateFormat = "Do MMMM";
        return (
            <div className="header row flex-middle">
                <div className="col col-start">
                    <div className="icon" onClick={this.prevMonth}>
                        chevron_left
                    </div>
                </div>
                <div className="col col-center">
                    <span>
                        {moment(this.state.currentMonth).lang("tr").format(dateFormat)}
                    </span>
                </div>
                <div className="col col-end" onClick={this.nextMonth}>
                    <div className="icon">chevron_right</div>
                </div>
            </div>
        );
    }
    renderDays() { 
        const dateFormat = "dddd";
        const days = [];

        let startDate = moment(this.state.currentMonth).startOf('week');

        for (let i = 0; i < 7; i++) {
            days.push(
              <div className="col col-center" key={i}>
                {(moment(startDate).add(i, 'days')).format(dateFormat)}
              </div>
            );
          }
        return <div className="days row">{days}</div>;
    }
    renderCells() { 
        const { currentMonth, selectedDate } = this.state;
        const monthStart = moment(currentMonth).startOf('month');
        const monthEnd = moment(monthStart).endOf('month');
        const startDate = moment(monthStart).startOf('week');
        const endDate = moment(monthEnd).endOf('week');

        const dateFormat = "D";
        const rows = [];

        let days = [];
        let day = startDate;
        let formattedDate = "";

        while (day <= endDate) {
            for (let i = 0; i < 7; i++) {
              formattedDate = moment(day).format(dateFormat);
              const cloneDay = day;
              days.push(
                <div
                  className={`col cell ${
                    !moment(day).isSame(monthStart, 'month')
                      ? "disabled"
                      : moment(day).isSame(selectedDate, day) ? "selected" : ""
                  }`}
                  key={day}
                  onClick={() => this.onDateClick(alert(day))}
                >
                  <span className="number">{formattedDate}</span>
                  <span className="bg">{formattedDate}</span>
                </div>
              );
              day = moment(day).add(1, 'days');
            }
            rows.push(
              <div className="row" key={day}>
                {days}
              </div>
            );
            days = [];
          }
          return <div className="body">{rows}</div>;
    }

    onDateClick = day => { }
    nextMonth = () => { 
        this.setState({
            currentMonth: moment(this.state.currentMonth).add(1, 'months')
          });
    }
    prevMonth = () => { 
        this.setState({
            currentMonth: moment(this.state.currentMonth).subtract(1, 'months')
          });
    }

    render() {
        return (
            <div className="calendar">
                {this.renderHeader()}
                {this.renderDays()}
                {this.renderCells()}
            </div>
        )
    }
}
