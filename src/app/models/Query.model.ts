export default class AdzQuery {
    lang: string = localStorage.getItem('lang');
    startIndex: number = 0;
    maxResults: number = 40;
    constructor(public request: string = '', public totalItems: number = null) {
    }


}