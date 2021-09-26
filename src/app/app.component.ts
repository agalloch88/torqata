import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'torqata-chart-proj'; //can clear this or reset it

  result: any;
  coinPrice: any;
  coinName: any;
  chart: any = []


  constructor(private service: AuthService) { 
    Chart.register(...registerables)
  }

  ngOnInit() {
    this.service.cryptoData().then((res) => {
      this.result = res
      console.log(res)

      this.coinPrice = this.result.data.coins.map((coin: any) => coin.price)
      this.coinName = this.result.data.coins.map((coin: any) => coin.name)

      console.log(this.coinPrice, this.coinName)

      //show Chart data
      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
            labels: this.coinName,
            datasets: [{
                label: 'Coin Price',
                data: this.coinPrice,
                borderWidth: 3,
                fill: false,
                backgroundColor: 'rgba(93, 176, 89, 0.1)',
                borderColor: '#3e95cd',
            }]
        },
    })
      this.chart = new Chart('canvas2', {
        type: 'bar',
        data: {
            labels: this.coinName,
            datasets: [{
                indexAxis: 'y',
                label: 'Coin Price',
                data: this.coinPrice,
                borderWidth: 3,
                backgroundColor: 'rgba(93, 176, 89, 0.1)',
                borderColor: '#3e95cd',
            }]
        },
    })
    })
  }
}
