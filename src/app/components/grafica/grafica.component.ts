import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-grafica',
  templateUrl: './grafica.component.html',
  styleUrls: ['./grafica.component.css']
})
export class GraficaComponent implements OnInit {

public lineChartData: Array<any> = [
  {data: [0,0,0,0], label: 'Ventas'}
];

public lineChartLabels:Array<any> = [ 'January', 'February', 'March', 'April'];


  constructor(private http: HttpClient,
            public wsService: WebsocketService ) { 
    
  }

  ngOnInit(): void {
    this.getData();
    this.escucharSocket();
  }


  getData(){
    this.http.get("http://localhost:5000/grafica")
    .subscribe( (data : any) => {
        console.log(data);
        this.lineChartData = data;
    });

  }


  escucharSocket(){
    this.wsService.listen('cambio-grafica')
    .subscribe( (data:any)=>{

      console.log(data);
      this.lineChartData = data;

    })
  }



}
