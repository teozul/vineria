import { WineType } from "@/models/WineTastingSheet";

export const getWineTypeClass = (wineType: WineType): string => {
    switch (wineType) {
        case WineType.RED:
            return 'wine-type-red';
        case WineType.WHITE:
            return 'wine-type-white';
        case WineType.ROSE:
            return 'wine-type-rose';
        default:
            return '';
    }
};