import { PartType } from "./global";

export const ACTIONS = {
    ORDER_STORE: {
        PRODUCTION: 'order_store_production',
        DELIVER: 'order_store_deliver'
    },
    PART_STORE: {
        RECEIVE: 'part_store_receive',
    },
    ORDER_FABRICATION: {
        DELIVER: 'order_fabrication_deliver'
    },
    SHOP_FLOOR_FABRICATION: {
        START: 'shop_floor_fabrication_start',
        FINISH: 'shop_floor_fabrication_finish'
    }
}

export const PARTS: PartType[] = [
    {
        partNumber: 'V5745094220001',
        partName: 'STIFFENER',
        quantity: 1
    },
    {
        partNumber: 'V5745094320001',
        partName: 'STIFFENER',
        quantity: 1
    },
    {
        partNumber: 'V5745236520001',
        partName: 'STIFFENER C SECTION',
        quantity: 2
    },
    {
        partNumber: 'V5745094420101',
        partName: 'ANGLE',
        quantity: 2
    },
    {
        partNumber: 'V5745236820301',
        partName: 'HINGE FWD',
        quantity: 3
    },
    {
        partNumber: 'V5745236920001',
        partName: 'HINGE AFT',
        quantity: 3
    },
    {
        partNumber: 'V5745062720301',
        partName: 'PNL 3 FUEL LWR',
        quantity: 1
    }
]