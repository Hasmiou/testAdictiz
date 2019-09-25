export default class AdzQuery {
    lang: string = localStorage.getItem('lang');
    constructor(public request: string = '', public totalItems: number = null) {
        //console.log(this.lang);
    }


}