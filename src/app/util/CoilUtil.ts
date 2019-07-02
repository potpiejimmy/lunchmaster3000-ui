export class CoilUtil {
    isCoilRunning(): boolean {
        return document['monetization'] && document['monetization'].state === 'started';
    }
}