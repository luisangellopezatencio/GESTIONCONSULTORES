import { LightningElement, api} from 'lwc';

export default class Reporte_item extends LightningElement {
    fecha;
    horas;
    tipoHora;
    proyecto;

    @api itemId;
    options = [
        { label: 'Escoger tipo de hora...', value: '' },
        { label: 'Laboral', value: 'laboral' },
        { label: 'Fabrica', value: 'fabrica' },
    ]

    borrarReporte() {
        this.dispatchEvent(
            new CustomEvent('borrarreporte', {
                detail: { itemId: this.itemId}
            })
        )
    }

    handleChangeDate(event) {
        this.fecha = event.detail.value;
        this.obtReporte()
    }

    handleChangeNumber(event) {
        this.horas = event.detail.value;
        this.obtReporte()
    }

    handleChangeProyect(event) {
        this.proyecto = event.detail.value;
        this.obtReporte()
    }

    obtTipoHora(event) {
        this.tipoHora = event.detail.value;
        this.obtReporte();
    }


    obtReporte() {
        this.dispatchEvent(
            new CustomEvent('obtreporte', {
                detail: {
                    itemId: this.itemId,
                    fecha: this.fecha ? this.fecha : '',
                    horas: this.horas ? this.horas : '',
                    tipoHora: this.tipoHora ? this.tipoHora : '',
                    proyecto: this.proyecto ? this.proyecto : ''
                }
            })
        )
    }
}