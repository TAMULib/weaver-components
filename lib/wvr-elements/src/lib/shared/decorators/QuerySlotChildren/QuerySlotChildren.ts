import { WvrBaseComponent } from '../../wvr-base-component';
import "reflect-metadata";

export function QuerySlotChildren(...types: string[]) {
    return function (target: any, key: string, ) {

        let currentTarget = target.constructor;
        //let parentTarget = Object.getPrototypeOf(target.prototype).constructor;
        //let parentAnnotations = Reflect.getOwnMetadata('annotations', parentTarget);

        //Reflect.defineMetadata('annotations', [Object.create(parentAnnotations[0])], currentTarget);
        let currentAnnotations = Reflect.getOwnMetadata('annotations', currentTarget);
        console.log(Reflect.getPrototypeOf(target));
        //types.forEach(t => target[key].push(t.toUpperCase()));
    }
}