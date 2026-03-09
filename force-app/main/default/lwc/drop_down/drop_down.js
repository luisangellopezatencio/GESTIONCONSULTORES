import { LightningElement, api } from 'lwc';

export default class SelectBasic extends LightningElement {
    @api label;
    @api option;
    value = '';

    get options() {
        return this.option;
    }

    handleChange(event) {
        this.value = event.detail.value;
        this.dispatchEvent(
            new CustomEvent('obtvalue', {
            detail: {
                value: this.value
            }
        }))
    }
}