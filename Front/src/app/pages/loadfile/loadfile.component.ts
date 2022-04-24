import { Component, OnInit } from '@angular/core';
import * as XLSX from "xlsx";
import { DatasetService } from "../../services/dataset.service";
import { saveAs } from 'file-saver';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import {Router} from '@angular/router';
import { BooleanLiteral } from 'typescript';
import { SpinnersAngularModule } from 'spinners-angular';


@Component({
  selector: 'app-loadfile',
  templateUrl: './loadfile.component.html',
  styleUrls: ['./loadfile.component.css']
})
export class LoadfileComponent implements OnInit {

  dataJson : any;
  prediction : number[];
  fs: any;
  spinner = false ;
  no_spinner = true ;

  constructor(private datasetservice : DatasetService,private http: HttpClient , private router:Router) { }

  ngOnInit(): void {
    this.dataJson = [];
    //this.datasetservice.getPrediction().subscribe (prediction => this.prediction = prediction);
  }

  fileUpload(event:any){
    this.spinner = true ;
    this.no_spinner = false ;
    const selectedFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectedFile);
    fileReader.onload = (event) => {
      let binarydata = event.target.result;
      let workbook = XLSX.read(binarydata , {type : 'binary'});
      workbook.SheetNames.forEach(sheet => {
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.dataJson = data; 
        const body=JSON.stringify(data);
        const headers = { 'content-type': 'application/json'} 
        console.log(body);
        this.datasetservice.loadjson(body).subscribe(msg => console.log(msg),error => console.log(error));
        this.datasetservice.setDatajson(this.dataJson);
        this.datasetservice.train();
        this.router.navigate(['/datatable']);

      })
      
    } 
  }

}
