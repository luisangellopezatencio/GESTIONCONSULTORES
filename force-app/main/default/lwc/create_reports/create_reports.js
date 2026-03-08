import { LightningElement, track, wire } from 'lwc';
import getConsultores from '@salesforce/apex/ConsultorController.getConsultores';

export default class Main extends LightningElement {
    @track
    reportes = [
        {
            Id: '0000000001'
        }
    ];


    @wire(getConsultores)
    consultores;

    getOptions(consultores) {

        if (consultores.error) {
            return [{
                label: consultores.error.message,
                value: 'Error'
            }]
        }

        if (consultores.data) {
            return consultores.data.map((consultor) => {
                return {
                    label: consultor.Name,
                    value: consultor.Id
                }
            })
        }

        return [];
    }

   get options() {
        if (!this.consultores) {
            return [];
        }   
        return this.getOptions(this.consultores);
    }

    aggReporte = () => {
        this.reportes.push({
            Id: Date.now()
        });
    };

    borrarPorId = (event) => {
        this.reportes = this.reportes.filter((reporte) => reporte.Id !== event.detail.itemId);
    }

    saveReport() {
        alert('TODO: Save report in DB');
    }
}