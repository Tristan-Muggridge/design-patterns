// Emitter
interface IEmitter {
    readonly subscribers: IObserver[]
    
    notify(): void;
    subscribe(observer: IObserver): void;
    unsubscribe(observer: IObserver): void;
}

class Emitter implements IEmitter {
    subscribers: IObserver[] = [];
    
    notify = () => {console.debug("\nFiring event!"); this.subscribers.forEach( subscriber => subscriber.update());}
    subscribe = (observer: IObserver) => {this.subscribers.push(observer);}
    unsubscribe = (observer: IObserver) => {this.subscribers.splice(this.subscribers.indexOf(observer), 1);}
}

// Observer
interface IObserver {
    readonly id: number
    readonly subject: IEmitter

    update(): void;
    subscribe(): void;
    unsubscribe(): void;
}

class Observer implements IObserver {
    private static observerIdTracker = 0;
    id: number;
    subject: IEmitter

    update = () => {console.debug(this.id, "has been triggered!");}
    subscribe = () => {this.subject.subscribe(this);}
    unsubscribe = () => {this.subject.unsubscribe(this);}

    constructor (emitter: IEmitter) {
        this.id = ++Observer.observerIdTracker;
        this.subject = emitter;
        this.subscribe();
    }
}

// Usage

const emitter = new Emitter();

const observer1 = new Observer(emitter);

emitter.notify();

const observer2 = new Observer(emitter);

emitter.notify();

observer1.unsubscribe();

emitter.notify();

/* Output
    Firing event!
    1 has been triggered!

    Firing event!
    1 has been triggered!
    2 has been triggered!

    Firing event!
    2 has been triggered!
*/