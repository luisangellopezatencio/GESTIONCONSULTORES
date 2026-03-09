import { LightningElement, track, wire } from 'lwc';
import getConsultores from '@salesforce/apex/ConsultorController.getConsultores';
import postReporte from '@salesforce/apex/ConsultorController.postReporte';

export default class Main extends LightningElement {
    // Constantes utiles
    DEFAULT_ID = '00000000001';
    consultor_id;

    @track
    reportes = [
        {
            Id: this.DEFAULT_ID,
            fecha: null,
            horas: null,
            tipoHora: null,
            proyecto: null,
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

    obtIdConsultor(event) {
        this.consultor_id = event.detail.value;
    }

    aggReporte = () => {
        this.reportes.push({
            Id: String(Date.now())
        });
    };

    borrarPorId = (event) => {
        this.reportes = this.reportes.filter((reporte) => reporte.Id !== event.detail.itemId);
    }

    actReporte(event) {
        const itemId = event.detail.itemId;
        this.reportes = this.reportes.map((reporte) => {
            if (reporte.Id === itemId) {
                return {
                    ...reporte,
                    fecha: event.detail.fecha,
                    horas: event.detail.horas,
                    tipoHora: event.detail.tipoHora,
                    proyecto: event.detail.proyecto,
                }
            }
            return reporte;
        });
    }

    get totalHoras() {
        return this.reportes.reduce((total, reporte) => total + Number(reporte.horas), 0);
    }

    obtTotalHorasPorTipo(tipo){
        return this.reportes.reduce((total, reporte) => {
            if (reporte.tipoHora === tipo) {
                return total + Number(reporte.horas);
            }
            return total;
        }, 0);
    }

    get totalHorasLab() {
        return this.obtTotalHorasPorTipo('laboral');
    }

    get totalHorasFab() {
        return this.obtTotalHorasPorTipo('fabrica');
    }

    validateReportes() {
        let isValid = true;
        this.reportes.forEach((reporte) => {
            if (!reporte.fecha || !reporte.horas || !reporte.tipoHora || !reporte.proyecto || !this.consultor_id) {
                isValid = false;
            }
        });
        return isValid;
    }

    saveReport() {
        //const payload = JSON.stringify(this.reportes, null, 2);
        //const payload = JSON.parse(JSON.stringify(this.reportes));

        // console.log('--- CONSULTOR SELECCIONADO ---');
        // console.log(this.consultor_id);
        
        // console.log('--- PAYLOAD FINAL PARA APEX ---');
        // console.log(payload);

        if (this.validateReportes()) {
            postReporte({
            idConsultor: this.consultor_id,
            reportes: this.reportes
                }) .then((result) => {
                alert('Reporte guardado exitosamente: ' + result)
                })
                .catch((error) => {
            // Imprimimos el objeto completo en la consola para espiarlo
            console.error('Objeto de error completo:', JSON.parse(JSON.stringify(error)));
            let mensajeReal = error.body ? error.body.message : 'Error desconocido';
            alert('Falló el guardado en Salesforce. Motivo: ' + mensajeReal);
            });
        }else{
            alert('Por favor complete todos los campos');
        }  
        }
}