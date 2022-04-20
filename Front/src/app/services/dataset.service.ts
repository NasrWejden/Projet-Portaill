import { Injectable } from '@angular/core';
import { Observable , of} from 'rxjs';
import regression from 'regression';
import { map } from 'rxjs/operators';
import {HttpResponse} from '@angular/common/http';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})  
export class DatasetService {

  next_year : number;
  prediction_vector : number[]; 
  features_vector : String[];
  ready_dataset : boolean;   
  datajson : any[] ;

  constructor(private http : HttpClient) { 
    this.next_year = (new Date()).getFullYear()+1;
    this.features_vector = ["annee","nb_employee","salaires","cnss","impots","serveurs","comptable","auditeur","sous_traitances","location","eau_et_internet","bureautiques","totale_bon_livraison","autres_charge","totale_factures","projets_universitaires","UMS","maintenance_mise_a_jours","revenu_facture","revenu_sans_facture","total_revenu"];
    this.prediction_vector = [];
    this.datajson = [];

  }

  setDatajson(data){
    this.datajson = data;
    this.train();
  }



  getDatajson() : Observable<any[]>{
    return of(this.datajson);
  }

  train() {
    let dataset = this.datajson;
    let ann_array = dataset.map(x => x["annee"]);
    for ( let  feature of (this.features_vector)){
        let feature_array = dataset.map(x => x[""+feature+""]);
        let train_array=[]; let i=-1;
        while ( ann_array[++i] ) { 
            train_array.push( [ ann_array[i], feature_array[i] ]);
          }
          const result = regression.linear(train_array);
          let value = result.equation[0]*this.next_year+result.equation[1]
          this.prediction_vector.push(value);  

    }
    
  }

  getPrediction() :Observable<number[]>{
    const pred = of(this.prediction_vector);
    return pred;
  }
  
  public sendGetRequest(){
    return this.http.get('http://localhost:3000/file/download_datafile');
  }

  /** POST: add a new hero to the database */
  loadjson(body: any): Observable<any> {
    const headers = { 'content-type': 'application/json'}  ;
    console.log("we are sending data");
    return this.http.post<any>("http://localhost:3000/file/fileUpload", body ,{'headers':headers});
}
  
  



}
