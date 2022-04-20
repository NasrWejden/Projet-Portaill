
import regression from 'regression';

export class Prediction {

    next_year : number;
    prediction_vector : number[]; 
    features_vector : String[]   
    constructor(){
        this.next_year = (new Date()).getFullYear()+1;
        this.features_vector = ["annee","nb_employee","salaires","cnss","impots","serveurs","comptable","auditeur","sous_traitances","location","eau_et_internet","bureautiques","totale_bon_livraison","autres_charge","totale_factures","projets_universitaires","UMS","maintenance_mise_a_jours","revenu_facture","revenu_sans_facture","total_revenu"];
        this.prediction_vector = []
    }

    train(dataset) {
        console.log(dataset);
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
        console.log(this.prediction_vector);
    }
    

}