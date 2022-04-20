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


  constructor() { }

  ngOnInit(): void {

  }

  
}
