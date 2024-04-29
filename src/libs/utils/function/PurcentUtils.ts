import { CapacityType, CarType } from "../../../generated/graphql";
import { PurcentFormulav, PurcentGt, PurcentSpeeder, PurcentTruckster } from "../data/capacityPurcentData";

export const giveCapacityPurcent = (carType: CarType, capacityType: CapacityType, level: number) => {
    switch (carType) {
        case 'GT':
            switch(capacityType) {
                case CapacityType.Acceleration:
                    switch(level) {
                        case 1:
                            return PurcentGt.ACCELERATION_1;
                        case 2:
                            return PurcentGt.ACCELERATION_2;
                        case 3:
                            return PurcentGt.ACCELERATION_3;
                        case 4:
                            return PurcentGt.ACCELERATION_4;
                        case 5:
                            return PurcentGt.ACCELERATION_5;
                        case 6:
                            return PurcentGt.ACCELERATION_6;
                    } 
                case CapacityType.TopSpeed:
                    switch(level) {
                        case 1:
                            return PurcentGt.TOPSPEED_1;
                        case 2:
                            return PurcentGt.TOPSPEED_2;
                        case 3:
                            return PurcentGt.TOPSPEED_3;
                        case 4:
                            return PurcentGt.TOPSPEED_4;
                        case 5:
                            return PurcentGt.TOPSPEED_5;
                        case 6:
                            return PurcentGt.TOPSPEED_6;
                    }
                case CapacityType.Shielding:
                    switch(level) {
                        case 1:
                            return PurcentGt.SHIELDING_1;
                        case 2:
                            return PurcentGt.SHIELDING_2;
                        case 3:
                            return PurcentGt.SHIELDING_3;
                        case 4:
                            return PurcentGt.SHIELDING_4;
                        case 5:
                            return PurcentGt.SHIELDING_5;
                        case 6:
                            return PurcentGt.SHIELDING_6;
                    }
                case CapacityType.Nitro:
                    switch(level) {
                        case 1:
                            return PurcentGt.NITRO_1;
                        case 2:
                            return PurcentGt.NITRO_2;
                        case 3:
                            return PurcentGt.NITRO_3;
                        case 4:
                            return PurcentGt.NITRO_4;
                        case 5:
                            return PurcentGt.NITRO_5;
                        case 6:
                            return PurcentGt.NITRO_6;
                    }
            }
        case "FORMULAV":
            switch(capacityType) {
                case CapacityType.Acceleration:
                    switch(level) {
                        case 1:
                            return PurcentFormulav.ACCELERATION_1;
                        case 2:
                            return PurcentFormulav.ACCELERATION_2;
                        case 3:
                            return PurcentFormulav.ACCELERATION_3;
                        case 4:
                            return PurcentFormulav.ACCELERATION_4;
                        case 5:
                            return PurcentFormulav.ACCELERATION_5;
                        case 6:
                            return PurcentFormulav.ACCELERATION_6;
                    } 
                case CapacityType.TopSpeed:
                    switch(level) {
                        case 1:
                            return PurcentFormulav.TOPSPEED_1;
                        case 2:
                            return PurcentFormulav.TOPSPEED_2;
                        case 3:
                            return PurcentFormulav.TOPSPEED_3;
                        case 4:
                            return PurcentFormulav.TOPSPEED_4;
                        case 5:
                            return PurcentFormulav.TOPSPEED_5;
                        case 6:
                            return PurcentFormulav.TOPSPEED_6;
                    }
                case CapacityType.Shielding:
                    switch(level) {
                        case 1:
                            return PurcentFormulav.SHIELDING_1;
                        case 2:
                            return PurcentFormulav.SHIELDING_2;
                        case 3:
                            return PurcentFormulav.SHIELDING_3;
                        case 4:
                            return PurcentFormulav.SHIELDING_4;
                        case 5:
                            return PurcentFormulav.SHIELDING_5;
                        case 6:
                            return PurcentFormulav.SHIELDING_6;
                    }
                case CapacityType.Nitro:
                    switch(level) {
                        case 1:
                            return PurcentFormulav.NITRO_1;
                        case 2:
                            return PurcentFormulav.NITRO_2;
                        case 3:
                            return PurcentFormulav.NITRO_3;
                        case 4:
                            return PurcentFormulav.NITRO_4;
                        case 5:
                            return PurcentFormulav.NITRO_5;
                        case 6:
                            return PurcentFormulav.NITRO_6;
                    }
            }
        case "SPEEDER":
            switch(capacityType) {
                case CapacityType.Acceleration:
                    switch(level) {
                        case 1:
                            return PurcentSpeeder.ACCELERATION_1;
                        case 2:
                            return PurcentSpeeder.ACCELERATION_2;
                        case 3:
                            return PurcentSpeeder.ACCELERATION_3;
                        case 4:
                            return PurcentSpeeder.ACCELERATION_4;
                        case 5:
                            return PurcentSpeeder.ACCELERATION_5;
                        case 6:
                            return PurcentSpeeder.ACCELERATION_6;
                    } 
                case CapacityType.TopSpeed:
                    switch(level) {
                        case 1:
                            return PurcentSpeeder.TOPSPEED_1;
                        case 2:
                            return PurcentSpeeder.TOPSPEED_2;
                        case 3:
                            return PurcentSpeeder.TOPSPEED_3;
                        case 4:
                            return PurcentSpeeder.TOPSPEED_4;
                        case 5:
                            return PurcentSpeeder.TOPSPEED_5;
                        case 6:
                            return PurcentSpeeder.TOPSPEED_6;
                    }
                case CapacityType.Shielding:
                    switch(level) {
                        case 1:
                            return PurcentSpeeder.SHIELDING_1;
                        case 2:
                            return PurcentSpeeder.SHIELDING_2;
                        case 3:
                            return PurcentSpeeder.SHIELDING_3;
                        case 4:
                            return PurcentSpeeder.SHIELDING_4;
                        case 5:
                            return PurcentSpeeder.SHIELDING_5;
                        case 6:
                            return PurcentSpeeder.SHIELDING_6;
                    }
                case CapacityType.Nitro:
                    switch(level) {
                        case 1:
                            return PurcentSpeeder.NITRO_1;
                        case 2:
                            return PurcentSpeeder.NITRO_2;
                        case 3:
                            return PurcentSpeeder.NITRO_3;
                        case 4:
                            return PurcentSpeeder.NITRO_4;
                        case 5:
                            return PurcentSpeeder.NITRO_5;
                        case 6:
                            return PurcentSpeeder.NITRO_6;
                    }
            }
        case "TRUCKSTER":
            switch(capacityType) {
                case CapacityType.Acceleration:
                    switch(level) {
                        case 1:
                            return PurcentTruckster.ACCELERATION_1;
                        case 2:
                            return PurcentTruckster.ACCELERATION_2;
                        case 3:
                            return PurcentTruckster.ACCELERATION_3;
                        case 4:
                            return PurcentTruckster.ACCELERATION_4;
                        case 5:
                            return PurcentTruckster.ACCELERATION_5;
                        case 6:
                            return PurcentTruckster.ACCELERATION_6;
                    } 
                case CapacityType.TopSpeed:
                    switch(level) {
                        case 1:
                            return PurcentTruckster.TOPSPEED_1;
                        case 2:
                            return PurcentTruckster.TOPSPEED_2;
                        case 3:
                            return PurcentTruckster.TOPSPEED_3;
                        case 4:
                            return PurcentTruckster.TOPSPEED_4;
                        case 5:
                            return PurcentTruckster.TOPSPEED_5;
                        case 6:
                            return PurcentTruckster.TOPSPEED_6;
                    }
                case CapacityType.Shielding:
                    switch(level) {
                        case 2:
                            return PurcentTruckster.SHIELDING_2;
                        case 3:
                            return PurcentTruckster.SHIELDING_3;
                        case 4:
                            return PurcentTruckster.SHIELDING_4;
                        case 5:
                            return PurcentTruckster.SHIELDING_5;
                        case 6:
                            return PurcentTruckster.SHIELDING_6;
                    }
                case CapacityType.Shielding:
                    return console.log("This capacity doesn't exist on Truckster !")
            }
    }
}