import { WvrBaseComponent } from '../../wvr-base-component';

export function QuerySlotChildren(...types: string[]) {
    return function <T extends WvrBaseComponent>(target: T, key: string, ) {
        if (!target.slotValidation) {
            target.slotValidation = new Map<string, string[]>()
        }
        types.forEach(t => {
            if (!target.slotValidation.get(key)) {
                target.slotValidation.set(key, []);
            }
            target.slotValidation.get(key).push(t.toUpperCase())
        });
    }
}