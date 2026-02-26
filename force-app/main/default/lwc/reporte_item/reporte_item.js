import { LightningElement, api } from 'lwc';

export default class Reporte_item extends LightningElement {
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
}