import { Component, OnInit } from '@angular/core';
import { DatasetService } from "../../services/dataset.service";
import Chart from 'chart.js';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dataanalysis',
  templateUrl: './dataanalysis.component.html',
  styleUrls: ['./dataanalysis.component.css']
})
export class DataanalysisComponent implements OnInit {
  dataset : any;
  prediction : number[];
  last_3 : any[];
  last_year : any[];
  chiffre_af_pre : number;
  chiffre_af_this : number;
  nbr_emp : number;
  emp_sal : number ;
  pourc : number ;
  total_charge : number ; 
  beni : number;
  develop : number ;
  next_year : number;
  public canvas : any;
  total_fac_3year : any[];
  public chartColor;




  constructor(private datasetservice : DatasetService,private router:Router) {
    this.next_year = (new Date()).getFullYear()+1;
   }

  ngOnInit() {
    
    console.log("test data download from server");
    this.datasetservice.sendGetRequest().subscribe((data: any[])=>{
    this.datasetservice.setDatajson(data);
    console.log("test the data :");
    console.log(data);
    this.dataset = data ;
    console.log(this.dataset[2]["annee"]);
    this.datasetservice.getDatajson().subscribe(dataset => this.dataset = dataset);
    },
    error => {
      if(error.error.error=="FILE_NOT_Found"){
        console.log("error no found file");
        this.router.navigate(['/loadfile']);
      }
      else{
        console.log("other problem");
      }  
    });
  
    this.datasetservice.getPrediction().subscribe(prediction => this.prediction = prediction); 
    console.log(this.dataset); 
    console.log(this.prediction);
    this.initialisation();
    
    console.log("after to methode");
    console.log(this.total_fac_3year);
    
    /*
    this.datasetservice.getDatajson().subscribe(dataset => this.dataset = dataset);
    console.log(this.dataset);  
    this.datasetservice.getPrediction().subscribe(prediction => this.prediction = prediction); 
    console.log(this.prediction); */


    //this.initialisation();
    /*this.datasetservice.sendGetRequest().subscribe(async(data: any[])=>{
      await this.datasetservice.setDatajson(data);
      await this.datasetservice.getDatajson().subscribe(dataset => this.dataset = dataset);
      },
      error => {
        if(error.error.error=="FILE_NOT_Found"){
          console.log("error no found file");
        }
        else{
          console.log("other problem");
        }  
      });*/
    //this.datasetservice.getDatajson().subscribe(dataset => this.dataset = dataset);
    //this.datasetservice.getPrediction().subscribe(prediction => this.prediction = prediction);
    //console.log(this.dataset);
    //console.log("----------------------------");
    //console.log(this.prediction);
    /*console.log(this.total_fac_3year);
    var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: this.total_fac_3year,
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };



      var speedData = {
        labels: ["2019","2020","2021","2022"],
        datasets: [dataFirst]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
  */


  /*public initialisation = async function test() {
    this.datasetservice.sendGetRequest().subscribe(async(data: any[])=> {
      this.datasetservice.setDatajson(data);
      this.datasetservice.getDatajson().subscribe(dataset => this.dataset = dataset);
      this.datasetservice.getPrediction().subscribe(prediction => this.prediction = prediction);
      await this.prepare_parametres();
      },
      error => {
        if(error.error.error=="FILE_NOT_Found"){
          console.log("error no found file");
        }
        else{
          console.log("other problem");
        }  
      }); 
  }

  public prepare_parametres(){
    this.last_3 = this.dataset.filter(row => (this.next_year-row.annee <= 3));
    this.last_3 = this.last_3.sort(this.compare);
    this.total_fac_3year = this.last_3.map(x => x.total_revenu);
    this.total_fac_3year.push(this.prediction[20]);
    //console.log(this.total_fac_3year);

    
  }

  compare(a, b) {
    if (a.annee > b.annee) return 1;
    if (b.annee > a.annee) return -1;
  
    return 0;
  }*/



      



      

      
}

public initialisation = async function test() {
  this.datasetservice.sendGetRequest().subscribe(async(data: any[])=> {
    this.datasetservice.setDatajson(data);
    this.datasetservice.getDatajson().subscribe(dataset => this.dataset = dataset);
    this.datasetservice.getPrediction().subscribe(prediction => this.prediction = prediction);
    await this.prepare_parametres();
    console.log("In initialisation ");
    },
    error => {
      if(error.error.error=="FILE_NOT_Found"){
        console.log("error no found file");
      }
      else{
        console.log("other problem");
      }  
    }); 
}

public prepare_parametres(){
  this.last_3 = this.dataset.filter(row => (this.next_year-row.annee <= 3));
  this.last_3 = this.last_3.sort(this.compare);
  this.total_fac_3year = this.last_3.map(x => x.total_revenu);
  this.total_fac_3year.push(this.prediction[20]);
  console.log(this.total_fac_3year);
  this.prepare_canvas();
  this.chiffre_af_pre = this.prediction[20];
  this.chiffre_af_this = this.total_fac_3year[2];
  this.nbr_emp = Math.ceil(this.prediction[1]);
  this.emp_sal = this.prediction[2]/this.nbr_emp ;
  this.total_charge = Math.ceil(this.prediction[14]);
  this.pourc = Math.ceil(((this.chiffre_af_pre/this.chiffre_af_this - 1)*100));
  this.beni = this.chiffre_af_pre - this.total_charge ;


  console.log(this.chiffre_af_pre);
  console.log(this.chiffre_af_this);
  console.log(this.nbr_emp);
  console.log(this.emp_sal);
  console.log(this.total_charge);
  console.log(this.pourc);


  
}

compare(a, b) {
  if (a.annee > b.annee) return 1;
  if (b.annee > a.annee) return -1;

  return 0;
}

public prepare_canvas(){

  var speedCanvas = document.getElementById("speedChart");

      var dataFirst = {
        data: this.total_fac_3year,
        fill: false,
        borderColor: '#fbc658',
        backgroundColor: 'transparent',
        pointBorderColor: '#fbc658',
        pointRadius: 4,
        pointHoverRadius: 4,
        pointBorderWidth: 8,
      };

      

      var speedData = {
        labels: [this.next_year-3, this.next_year-2, this.next_year-1, this.next_year],
        datasets: [dataFirst]
      };

      var chartOptions = {
        legend: {
          display: false,
          position: 'top'
        }
      };

      var lineChart = new Chart(speedCanvas, {
        type: 'line',
        hover: false,
        data: speedData,
        options: chartOptions
      });
      console.log("In prepare canvas ");

}

}


