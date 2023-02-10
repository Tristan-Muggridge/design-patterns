class Singleton {
    private static instance: Singleton;
    private static instancesQty: number = 0;

    public static getInstance = (): Singleton => {
        if (!Singleton.instance) {console.debug("Creating Singleton instance."); Singleton.instance = new Singleton();}
        return Singleton.instance;
    } 

    // make constructor private so that it can't be invoked elsewhere.
    private constructor() { Singleton.instancesQty++ }

    getInstances = ():number => {return Singleton.instancesQty;}
}

// Usage


const instance = Singleton.getInstance();
const instance2 = Singleton.getInstance();
const instance3 = Singleton.getInstance();
const instance4 = Singleton.getInstance();

console.debug(instance4.getInstances());

/* Output:

    Creating Singleton instance.
    1

*/