export function isCoilRunning(): boolean {
    return document['monetization'] && document['monetization'].state === 'started';
}
