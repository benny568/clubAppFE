export /**
 * ServerMode
 */
class ServerMode {
    modes = { LOCAL:0, REMOTE:1};
    currentMode: number;

    constructor() {
        /*if( process.env.NODE_ENV === 'development' )
        {
            this.currentMode = this.modes.REMOTE;
        }
        else
        {*/
            this.currentMode = this.modes.REMOTE;
        /*}*/
    }

    getServerMode()
    {
        return this.currentMode;
    }
}
