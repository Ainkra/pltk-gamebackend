import { CapacityType, CarType } from '../../../../generated/graphql';
import { itemIdFormulav, itemIdGt, itemIdSpeeder, itemIdTruckster } from '../../data/ItemValuesUtils';

export const carCoefUtils = (carType: CarType, capacityType: CapacityType, level: number) => {
    try {
        switch (carType) {
            case 'GT':
                switch(capacityType) {
                    case CapacityType.Acceleration:
                        switch(level) {
                            case 1:
                                return itemIdGt.ACCELERATION_1;
                            case 2:
                                return itemIdGt.ACCELERATION_2;
                            case 3:
                                return itemIdGt.ACCELERATION_3;
                            case 4:
                                return itemIdGt.ACCELERATION_4;
                            case 5:
                                return itemIdGt.ACCELERATION_5;
                            case 6:
                                return itemIdGt.ACCELERATION_6;
                        } 
                    case CapacityType.TopSpeed:
                        switch(level) {
                            case 1:
                                return itemIdGt.TOPSPEED_1;
                            case 2:
                                return itemIdGt.TOPSPEED_2;
                            case 3:
                                return itemIdGt.TOPSPEED_3;
                            case 4:
                                return itemIdGt.TOPSPEED_4;
                            case 5:
                                return itemIdGt.TOPSPEED_5;
                            case 6:
                                return itemIdGt.TOPSPEED_6;
                        }
                    case CapacityType.Shielding:
                        switch(level) {
                            case 1:
                                return itemIdGt.SHIELDING_1;
                            case 2:
                                return itemIdGt.SHIELDING_2;
                            case 3:
                                return itemIdGt.SHIELDING_3;
                            case 4:
                                return itemIdGt.SHIELDING_4;
                            case 5:
                                return itemIdGt.SHIELDING_5;
                            case 6:
                                return itemIdGt.SHIELDING_6;
                        }
                    case CapacityType.Nitro:
                        switch(level) {
                            case 1:
                                return itemIdGt.NITRO_1;
                            case 2:
                                return itemIdGt.NITRO_2;
                            case 3:
                                return itemIdGt.NITRO_3;
                            case 4:
                                return itemIdGt.NITRO_4;
                            case 5:
                                return itemIdGt.NITRO_5;
                            case 6:
                                return itemIdGt.NITRO_6;
                        }
                }
            case "FORMULAV":
                switch(capacityType) {
                    case CapacityType.Acceleration:
                        switch(level) {
                            case 1:
                                return itemIdFormulav.ACCELERATION_1;
                            case 2:
                                return itemIdFormulav.ACCELERATION_2;
                            case 3:
                                return itemIdFormulav.ACCELERATION_3;
                            case 4:
                                return itemIdFormulav.ACCELERATION_4;
                            case 5:
                                return itemIdFormulav.ACCELERATION_5;
                            case 6:
                                return itemIdFormulav.ACCELERATION_6;
                        } 
                    case CapacityType.TopSpeed:
                        switch(level) {
                            case 1:
                                return itemIdFormulav.TOPSPEED_1;
                            case 2:
                                return itemIdFormulav.TOPSPEED_2;
                            case 3:
                                return itemIdFormulav.TOPSPEED_3;
                            case 4:
                                return itemIdFormulav.TOPSPEED_4;
                            case 5:
                                return itemIdFormulav.TOPSPEED_5;
                            case 6:
                                return itemIdFormulav.TOPSPEED_6;
                        }
                    case CapacityType.Shielding:
                        switch(level) {
                            case 1:
                                return itemIdFormulav.SHIELDING_1;
                            case 2:
                                return itemIdFormulav.SHIELDING_2;
                            case 3:
                                return itemIdFormulav.SHIELDING_3;
                            case 4:
                                return itemIdFormulav.SHIELDING_4;
                            case 5:
                                return itemIdFormulav.SHIELDING_5;
                            case 6:
                                return itemIdFormulav.SHIELDING_6;
                        }
                    case CapacityType.Nitro:
                        switch(level) {
                            case 1:
                                return itemIdFormulav.NITRO_1;
                            case 2:
                                return itemIdFormulav.NITRO_2;
                            case 3:
                                return itemIdFormulav.NITRO_3;
                            case 4:
                                return itemIdFormulav.NITRO_4;
                            case 5:
                                return itemIdFormulav.NITRO_5;
                            case 6:
                                return itemIdFormulav.NITRO_6;
                        }
                }
            case "SPEEDER":
                switch(capacityType) {
                    case CapacityType.Acceleration:
                        switch(level) {
                            case 1:
                                return itemIdSpeeder.ACCELERATION_1;
                            case 2:
                                return itemIdSpeeder.ACCELERATION_2;
                            case 3:
                                return itemIdSpeeder.ACCELERATION_3;
                            case 4:
                                return itemIdSpeeder.ACCELERATION_4;
                            case 5:
                                return itemIdSpeeder.ACCELERATION_5;
                            case 6:
                                return itemIdSpeeder.ACCELERATION_6;
                        } 
                    case CapacityType.TopSpeed:
                        switch(level) {
                            case 1:
                                return itemIdSpeeder.TOPSPEED_2;
                            case 2:
                                return itemIdSpeeder.TOPSPEED_2;
                            case 3:
                                return itemIdSpeeder.TOPSPEED_3;
                            case 4:
                                return itemIdSpeeder.TOPSPEED_4;
                            case 5:
                                return itemIdSpeeder.TOPSPEED_5;
                            case 6:
                                return itemIdSpeeder.TOPSPEED_6;
                        }
                    case CapacityType.Shielding:
                        switch(level) {
                            case 1:
                                return itemIdSpeeder.SHIELDING_1;
                            case 2:
                                return itemIdSpeeder.SHIELDING_2;
                            case 3:
                                return itemIdSpeeder.SHIELDING_3;
                            case 4:
                                return itemIdSpeeder.SHIELDING_4;
                            case 5:
                                return itemIdSpeeder.SHIELDING_5;
                            case 6:
                                return itemIdSpeeder.SHIELDING_6;
                        }
                    case CapacityType.Nitro:
                        switch(level) {
                            case 1:
                                return itemIdSpeeder.NITRO_1;
                            case 2:
                                return itemIdSpeeder.NITRO_2;
                            case 3:
                                return itemIdSpeeder.NITRO_3;
                            case 4:
                                return itemIdSpeeder.NITRO_4;
                            case 5:
                                return itemIdSpeeder.NITRO_5;
                            case 6:
                                return itemIdSpeeder.NITRO_6;
                        }
                }
            case "TRUCKSTER":
                switch(capacityType) {
                    case CapacityType.Acceleration:
                        switch(level) {
                            case 1:
                                return itemIdTruckster.ACCELERATION_1;
                            case 2:
                                return itemIdTruckster.ACCELERATION_2;
                            case 3:
                                return itemIdTruckster.ACCELERATION_3;
                            case 4:
                                return itemIdTruckster.ACCELERATION_4;
                            case 5:
                                return itemIdTruckster.ACCELERATION_5;
                            case 6:
                                return itemIdTruckster.ACCELERATION_6;
                        } 
                    case CapacityType.TopSpeed:
                        switch(level) {
                            case 1:
                                return itemIdTruckster.TOPSPEED_1;
                            case 2:
                                return itemIdTruckster.TOPSPEED_2;
                            case 3:
                                return itemIdTruckster.TOPSPEED_3;
                            case 4:
                                return itemIdTruckster.TOPSPEED_4;
                            case 5:
                                return itemIdTruckster.TOPSPEED_5;
                            case 6:
                                return itemIdTruckster.TOPSPEED_6;
                        }
                    case CapacityType.Shielding:
                        switch(level) {
                            case 1:
                                return itemIdTruckster.SHIELDING_1;
                            case 2:
                                return itemIdTruckster.SHIELDING_2;
                            case 3:
                                return itemIdTruckster.SHIELDING_3;
                            case 4:
                                return itemIdTruckster.SHIELDING_4;
                            case 5:
                                return itemIdTruckster.SHIELDING_5;
                            case 6:
                                return itemIdTruckster.SHIELDING_6;
                        }
                }
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}