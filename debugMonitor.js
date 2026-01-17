export default function debugMonitor(object, property) {
    const descriptor = Object.getOwnPropertyDescriptor(
    HTMLInputElement.prototype,
    property
);
Object.defineProperty(object, property, {
    
    get() {
        
        return descriptor.get.call(this);
    },
    set(newValue) {
        console.trace(`${object.className || object.id}.value cambiado a:`, newValue);
        descriptor.set.call(this, newValue);
    }
});
}
