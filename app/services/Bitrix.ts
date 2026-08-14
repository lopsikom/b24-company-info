import type { B24Frame } from '@bitrix24/b24jssdk'

export class BitrixHandler {
    constructor(private readonly _frame : B24Frame) {}

    get frame() : B24Frame {
        return this.frame 
    }
}