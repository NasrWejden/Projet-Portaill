import { Component, OnInit } from '@angular/core';
import { DatasetService } from "../../services/dataset.service";

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.scss']
})


export class AdminLayoutComponent implements OnInit {
  constructor(private datasetservice : DatasetService) {
    
   }


  ngOnInit() {
    this.datasetservice.sendGetRequest().subscribe(async(data: any[])=> {
      this.datasetservice.setDatajson(data);
      },
      error => {
        if(error.error.error=="FILE_NOT_Found"){
          console.log("error no found file");
        }
        else{
          console.log("other problem");
        }  
      });
    console.log("it work well");  
   }
}
