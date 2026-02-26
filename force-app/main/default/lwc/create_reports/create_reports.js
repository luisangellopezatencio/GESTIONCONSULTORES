import { LightningElement, track} from 'lwc';

export default class Main extends LightningElement {
    @track
    reportes = [
        {
            Id: '0000000001'
        }
    ];

    options = [
        { label: 'Escoger consultor...', value: '' },
        { label: 'Luis', value: 'Luis' },
        { label: 'Sergio', value: 'Sergio' },
    ]

    aggReporte = () => {
        this.reportes.push({
            Id: Date.now()
        });
    };

    borrarPorId = (event) => {
        this.reportes = this.reportes.filter((reporte) => reporte.Id !== event.detail.itemId);
    }

    saveReport() {
        alert('TODO: Save report in DB')
    }
}